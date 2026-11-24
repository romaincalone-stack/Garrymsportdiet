import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getPlans } from "@/lib/data";
import { StateForm } from "@/components/state-form";
import { Field, Select, Check } from "@/components/ui";
import { Submit } from "@/components/submit";
import { PlanOptions } from "@/components/plan-options";
import { createPatient } from "../../actions";

export const metadata: Metadata = { title: "Nouvelle patiente" };

export default async function Page() {
  await requireAdmin();
  const plans = await getPlans();
  return (
    <>
      <p><Link href="/admin/patientes">← Patientes</Link></p>
      <h1>Nouvelle patiente</h1>
      <div className="card">
        <StateForm action={createPatient}>
          <div className="formgrid">
            <Field id="first_name" label="Prénom" required autoComplete="off" />
            <Field id="last_name" label="Nom" required autoComplete="off" />
            <Field id="email" label="Email" type="email" required autoComplete="off" />
            <Field id="phone" label="Téléphone (facultatif)" type="tel" autoComplete="off" />
            <Select id="plan" label="Offre" defaultValue="decouverte" required><PlanOptions plans={plans} /></Select>
            <Field id="start_date" label="Début" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
            <Field id="end_date" label="Fin (facultatif)" type="date" hint="Vide : 30 jours pour le mois offert, fin de l'engagement pour Nutrition et All in." />
          </div>
          <Check id="send" label="Envoyer l'email d'invitation maintenant" defaultChecked />
          <p className="muted" style={{ fontSize: 14 }}>Aucune information de santé ici : ni motif, ni pathologie, ni mesure.</p>
          <Submit className="btn">Créer le compte</Submit>
        </StateForm>
      </div>
    </>
  );
}
