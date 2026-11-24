import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { one, q } from "@/lib/db";
import { getPlans, getSettings } from "@/lib/data";
import { frDate, frDateTime, LOCATIONS, STATUS } from "@/lib/format";
import { StateForm } from "@/components/state-form";
import { Field, Select } from "@/components/ui";
import { Submit } from "@/components/submit";
import { PlanOptions } from "@/components/plan-options";
import { updatePatient, changePlan, setAppointment, resendInvitation, setStatus, handleOfferRequest } from "../../actions";

export const metadata: Metadata = { title: "Fiche patiente" };

const paris = (d: Date) => {
  const parts = new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(d);
  const g = (t: string) => parts.find(p => p.type === t)?.value ?? "";
  return { date: `${g("year")}-${g("month")}-${g("day")}`, time: `${g("hour")}:${g("minute")}` };
};
const iso = (d: Date | null) => d ? new Date(d).toISOString().slice(0, 10) : "";

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ cree?: string; invitation?: string }> }) {
  await requireAdmin();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const p = await one<{ id: string; first_name: string; last_name: string; email: string; phone: string | null; status: string; activated: boolean; created_at: Date; last_seen_at: Date | null }>(
    "select id, first_name, last_name, email, phone, status, password_hash is not null activated, created_at, last_seen_at from profiles where id = $1 and role = 'patient'", [id]);
  if (!p) notFound();
  const [plans, s, sub, history, rdv, requests] = await Promise.all([
    getPlans(), getSettings(),
    one<{ plan_code: string; start_date: Date; end_date: Date | null; commitment_end: Date | null }>("select plan_code, start_date, end_date, commitment_end from subscriptions where patient_id = $1 and status = 'active'", [id]),
    q<{ plan_code: string; start_date: Date; end_date: Date | null; status: string }>("select plan_code, start_date, end_date, status from subscriptions where patient_id = $1 order by start_date desc, created_at desc", [id]),
    one<{ starts_at: Date; location: string }>("select starts_at, location from appointments where patient_id = $1", [id]),
    q<{ id: string; offer: string; created_at: Date; handled_at: Date | null }>("select id, offer, created_at, handled_at from offer_requests where patient_id = $1 order by created_at desc", [id])
  ]);
  const name = (c: string) => plans.find(x => x.code === c)?.name ?? s.extra_offers?.find(o => o.code === c)?.name ?? c;
  const r = rdv ? paris(new Date(rdv.starts_at)) : null;

  return (
    <>
      <p><Link href="/admin/patientes">← Patientes</Link></p>
      <h1>{p.first_name} {p.last_name}</h1>
      {sp.cree && <p className="ok" role="status">Compte créé.{p.activated ? "" : " L'invitation part par email si vous l'avez cochée."}</p>}
      {sp.invitation && <p className="ok" role="status">Invitation renvoyée (lien valable 7 jours ; l&apos;ancien lien ne marche plus).</p>}
      <p className="muted">{STATUS[p.status]} · {p.activated ? (p.last_seen_at ? `dernière visite le ${frDate(p.last_seen_at)}` : "espace activé") : "invitation en attente"} · créée le {frDate(p.created_at)}</p>

      {requests.some(x => !x.handled_at) && (
        <section className="card" aria-labelledby="req-t">
          <h2 id="req-t">Demandes</h2>
          {requests.filter(x => !x.handled_at).map(x => (
            <div key={x.id} className="row between"><span>Intéressée par <b>{name(x.offer)}</b> · {frDate(x.created_at)}</span>
              <form action={handleOfferRequest}><input type="hidden" name="id" value={x.id} /><button className="btn ghost small">Marquer comme traitée</button></form></div>
          ))}
        </section>
      )}

      <section className="card" aria-labelledby="plan-t">
        <h2 id="plan-t">Offre</h2>
        <p>{sub ? <>Actuelle : <b>{name(sub.plan_code)}</b> depuis le {frDate(sub.start_date)}{sub.end_date ? `, jusqu'au ${frDate(sub.end_date)}` : ""}{sub.commitment_end ? " (engagement)" : ""}</> : "Aucune offre active."}</p>
        <StateForm action={changePlan}>
          <input type="hidden" name="id" value={p.id} />
          <div className="formgrid">
            <Select id="plan" label="Nouvelle offre" defaultValue={sub?.plan_code ?? "f1"}><PlanOptions plans={plans} /></Select>
            <Field id="start_date" label="À partir du" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
            <Field id="end_date" label="Jusqu'au (facultatif)" type="date" hint="Vide : calculée selon l'offre." />
          </div>
          <Submit className="btn">Enregistrer l&apos;offre</Submit>
        </StateForm>
        {history.length > 1 && <details style={{ marginTop: 12 }}><summary>Historique</summary><ul>{history.map((h, i) => <li key={i}>{name(h.plan_code)} : {frDate(h.start_date)} → {h.end_date ? frDate(h.end_date) : "sans fin"} ({h.status})</li>)}</ul></details>}
      </section>

      <section className="card" aria-labelledby="rdv-t">
        <h2 id="rdv-t">Prochain rendez-vous</h2>
        <p className="muted">Affiché dans l&apos;espace de la patiente. Date et lieu seulement, jamais le motif. Doctolib reste l&apos;agenda de référence.</p>
        {rdv && <p>Actuel : <b>{frDateTime(rdv.starts_at)}</b> · {LOCATIONS[rdv.location]}</p>}
        <StateForm action={setAppointment}>
          <input type="hidden" name="id" value={p.id} />
          <div className="formgrid">
            <Field id="date" label="Date" type="date" defaultValue={r?.date} />
            <Field id="time" label="Heure" type="time" defaultValue={r?.time} />
            <Select id="location" label="Lieu" defaultValue={rdv?.location ?? "la_garde"}>{Object.entries(LOCATIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>
          </div>
          <div className="row">
            <Submit className="btn">Enregistrer</Submit>
            {rdv && <button className="btn ghost" name="clear" value="1">Retirer</button>}
          </div>
        </StateForm>
      </section>

      <section className="card" aria-labelledby="id-t">
        <h2 id="id-t">Coordonnées</h2>
        <StateForm action={updatePatient}>
          <input type="hidden" name="id" value={p.id} />
          <div className="formgrid">
            <Field id="first_name" label="Prénom" defaultValue={p.first_name} required />
            <Field id="last_name" label="Nom" defaultValue={p.last_name} required />
            <Field id="email" label="Email" type="email" defaultValue={p.email} required />
            <Field id="phone" label="Téléphone" type="tel" defaultValue={p.phone ?? ""} />
          </div>
          <Submit className="btn">Enregistrer</Submit>
        </StateForm>
      </section>

      <section className="card" aria-labelledby="acc-t">
        <h2 id="acc-t">Compte</h2>
        <div className="row">
          {p.status === "active" && !p.activated && <form action={resendInvitation}><input type="hidden" name="id" value={p.id} /><Submit className="btn ghost">Renvoyer l&apos;invitation</Submit></form>}
          {p.status === "active"
            ? <form action={setStatus}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="status" value="suspendue" /><Submit className="btn line">Suspendre l&apos;accès</Submit></form>
            : <form action={setStatus}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="status" value="active" /><Submit className="btn">Réactiver</Submit></form>}
          {p.status !== "archivee" && <form action={setStatus}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="status" value="archivee" /><Submit className="btn line">Archiver</Submit></form>}
        </div>
        <p className="muted" style={{ fontSize: 14, marginTop: 10 }}>Mot de passe perdu : la patiente utilise « Mot de passe oublié » sur la page de connexion. Suspendre ou archiver déconnecte la patiente immédiatement. La suppression définitive des données se fera à la demande de la patiente (droit à l&apos;effacement), selon la durée de conservation à valider.</p>
      </section>
    </>
  );
}
