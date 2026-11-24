import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { getSubscription, getSettings } from "@/lib/data";
import { frDate } from "@/lib/format";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { Legal } from "@/components/patient";
import { changePassword } from "../actions";
import { logout } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Profil" };

export default async function Page() {
  const u = await requirePatient();
  const [sub, s] = await Promise.all([getSubscription(u.id), getSettings()]);
  return (
    <>
      <h1>Profil</h1>
      <section className="card" aria-labelledby="me-t">
        <h2 id="me-t">{u.first_name} {u.last_name}</h2>
        <p className="muted" style={{ margin: 0 }}>{u.email}</p>
        <p style={{ margin: "12px 0 0" }}>
          {sub ? <>Offre : <b>{sub.plan_name}</b>{sub.end_date ? <>, jusqu&apos;au {frDate(sub.end_date)}</> : null}</> : "Aucune offre active."}
        </p>
        <p style={{ margin: "8px 0 0" }}><Link href="/espace/offres">Mes offres</Link></p>
      </section>

      <section className="card" aria-labelledby="pw-t">
        <h2 id="pw-t">Changer de mot de passe</h2>
        <StateForm action={changePassword}>
          <Field id="current" label="Mot de passe actuel" type="password" autoComplete="current-password" required />
          <Field id="password" label="Nouveau mot de passe" type="password" autoComplete="new-password" minLength={10} required hint="10 caractères au moins." />
          <Field id="confirm" label="Confirmez le nouveau mot de passe" type="password" autoComplete="new-password" minLength={10} required />
          <Submit className="btn">Enregistrer</Submit>
        </StateForm>
      </section>

      <section className="card" aria-labelledby="data-t">
        <h2 id="data-t">Mes données</h2>
        <p className="muted">Pour corriger vos informations, obtenir une copie de vos données ou supprimer votre compte, demandez-le à Manon. <Link href="/confidentialite">Confidentialité</Link></p>
      </section>

      <form action={logout}><Submit className="btn line block">Me déconnecter</Submit></form>
      <Legal s={s} />
    </>
  );
}
