import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getPlans, getFeatures, getMatrix, getSettings } from "@/lib/data";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { savePlans, saveSettings } from "../actions";

export const metadata: Metadata = { title: "Réglages" };
const euros = (c: number | null) => c == null ? "" : String(c / 100);

export default async function Page() {
  await requireAdmin();
  const [plans, features, matrix, s] = await Promise.all([getPlans(), getFeatures(), getMatrix(), getSettings()]);
  return (
    <>
      <h1>Réglages</h1>
      <p className="row"><Link className="btn ghost small" href="/admin/securite">Sécurité du compte</Link><Link className="btn ghost small" href="/admin/journal">Journal des actions</Link></p>

      <section className="card" aria-labelledby="set-t">
        <h2 id="set-t">Liens et mentions</h2>
        <StateForm action={saveSettings}>
          <div className="formgrid">
            <Field id="doctolib_url" label="Lien Doctolib" type="url" defaultValue={s.doctolib_url} required />
            <Field id="whatsapp_url" label="Lien WhatsApp (facultatif)" type="url" defaultValue={s.whatsapp_url} placeholder="https://wa.me/33612345678" hint="Affiché aux patientes dont l'offre inclut le contact." />
            <Field id="p_name" label="Nom affiché" defaultValue={s.practitioner.name} />
            <Field id="p_title" label="Titre professionnel" defaultValue={s.practitioner.title} />
            <Field id="p_registration" label="Numéro d'enregistrement (ADELI ou RPPS)" defaultValue={s.practitioner.registration} hint="Obligatoire : affiché en bas de l'espace patiente." />
          </div>
          <Submit className="btn">Enregistrer</Submit>
        </StateForm>
      </section>

      <section className="card" aria-labelledby="plans-t">
        <h2 id="plans-t">Offres et accès</h2>
        <p className="muted">Cochez ce que chaque offre débloque. Les lignes marquées « étape 2 » ou « étape 3 » n&apos;ont pas encore d&apos;écran.</p>
        <StateForm action={savePlans}>
          <div className="scroll"><table className="matrix">
            <thead><tr><th scope="col">Fonctionnalité</th>{plans.map(p => <th key={p.code} scope="col">{p.name}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Prix (€)</th>{plans.map(p => <td key={p.code}><label className="sr" htmlFor={`price_${p.code}`}>Prix {p.name}</label><input id={`price_${p.code}`} name={`price_${p.code}`} inputMode="decimal" defaultValue={euros(p.price_cents)} style={{ minWidth: 72 }} /></td>)}</tr>
              <tr><th scope="row">Paiement en une fois (€)</th>{plans.map(p => <td key={p.code}><label className="sr" htmlFor={`upfront_${p.code}`}>Paiement en une fois {p.name}</label><input id={`upfront_${p.code}`} name={`upfront_${p.code}`} inputMode="decimal" defaultValue={euros(p.upfront_price_cents)} style={{ minWidth: 72 }} /></td>)}</tr>
              {features.map(f => (
                <tr key={f.key}><th scope="row" style={{ fontWeight: 400 }}>{f.label}</th>
                  {plans.map(p => <td key={p.code}><label className="sr" htmlFor={`m_${p.code}_${f.key}`}>{f.label} : {p.name}</label><input type="checkbox" id={`m_${p.code}_${f.key}`} name={`m_${p.code}_${f.key}`} defaultChecked={matrix[p.code]?.has(f.key)} /></td>)}
                </tr>
              ))}
            </tbody>
          </table></div>
          <p className="muted" style={{ fontSize: 14 }}>Engagement de 3 mois (Nutrition, All in) : à faire valider par un juriste ou l&apos;AFDN avant la mise en ligne (liberté de la patiente d&apos;arrêter un suivi).</p>
          <Submit className="btn">Enregistrer les offres</Submit>
        </StateForm>
      </section>
    </>
  );
}
