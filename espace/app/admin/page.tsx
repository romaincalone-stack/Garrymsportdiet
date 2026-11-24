import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { q } from "@/lib/db";
import { frDate, frDateTime, LOCATIONS } from "@/lib/format";
import { getPlans, getSettings } from "@/lib/data";
import { handleOfferRequest } from "./actions";

export const metadata: Metadata = { title: "Back-office" };

export default async function Page() {
  const me = await requireAdmin();
  const [plans, s, requests, ending, pendingInv, upcoming, [kpi]] = await Promise.all([
    getPlans(), getSettings(),
    q<{ id: string; patient_id: string; first_name: string; last_name: string; offer: string; created_at: Date }>(
      `select r.id, r.patient_id, p.first_name, p.last_name, r.offer, r.created_at from offer_requests r join profiles p on p.id = r.patient_id where r.handled_at is null order by r.created_at`),
    q<{ id: string; first_name: string; last_name: string; plan_code: string; end_date: Date }>(
      `select p.id, p.first_name, p.last_name, s.plan_code, s.end_date from subscriptions s join profiles p on p.id = s.patient_id
        where s.status = 'active' and p.status = 'active' and s.end_date between current_date and current_date + 14 order by s.end_date`),
    q<{ id: string; first_name: string; last_name: string }>(
      `select id, first_name, last_name from profiles where role = 'patient' and status = 'active' and password_hash is null order by created_at`),
    q<{ id: string; first_name: string; last_name: string; starts_at: Date; location: string }>(
      `select p.id, p.first_name, p.last_name, a.starts_at, a.location from appointments a join profiles p on p.id = a.patient_id
        where a.starts_at between now() and now() + interval '7 days' order by a.starts_at`),
    q<{ active: number; invited: number }>(`select count(*) filter (where status = 'active')::int active, count(*) filter (where status = 'active' and password_hash is null)::int invited from profiles where role = 'patient'`)
  ]);
  const offerName = (c: string) => plans.find(p => p.code === c)?.name ?? s.extra_offers?.find(o => o.code === c)?.name ?? c;
  const todo = requests.length + ending.length + pendingInv.length;

  return (
    <>
      <h1>Bonjour {me.first_name}</h1>
      <div className="kpis">
        <div className="card"><b>{kpi.active}</b>patientes actives</div>
        <div className="card"><b>{todo}</b>à traiter</div>
        <div className="card"><b>{upcoming.length}</b>rendez-vous cette semaine</div>
      </div>

      <section className="card" aria-labelledby="todo-t">
        <h2 id="todo-t">À traiter</h2>
        {!todo && <p className="muted">Rien à traiter.</p>}
        {requests.map(r => (
          <div key={r.id} className="row between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span><Link href={`/admin/patientes/${r.patient_id}`}>{r.first_name} {r.last_name}</Link> est intéressée par <b>{offerName(r.offer)}</b> <span className="muted">· {frDate(r.created_at)}</span></span>
            <form action={handleOfferRequest}><input type="hidden" name="id" value={r.id} /><button className="btn ghost small">Marquer comme traitée</button></form>
          </div>
        ))}
        {ending.map(e => (
          <div key={e.id} className="row between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span><Link href={`/admin/patientes/${e.id}`}>{e.first_name} {e.last_name}</Link> : {offerName(e.plan_code)} se termine le {frDate(e.end_date)}</span>
          </div>
        ))}
        {pendingInv.map(p => (
          <div key={p.id} className="row between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span><Link href={`/admin/patientes/${p.id}`}>{p.first_name} {p.last_name}</Link> n&apos;a pas encore activé son espace</span>
          </div>
        ))}
      </section>

      <section className="card" aria-labelledby="rdv-t">
        <h2 id="rdv-t">Rendez-vous des 7 prochains jours</h2>
        {upcoming.length ? upcoming.map(a => <p key={a.id} style={{ margin: "6px 0" }}><b>{frDateTime(a.starts_at)}</b> · <Link href={`/admin/patientes/${a.id}`}>{a.first_name} {a.last_name}</Link> · {LOCATIONS[a.location]}</p>)
          : <p className="muted">Aucun rendez-vous enregistré. Doctolib reste l&apos;agenda de référence.</p>}
      </section>
    </>
  );
}
