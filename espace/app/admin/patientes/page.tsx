import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { q } from "@/lib/db";
import { frDate, STATUS } from "@/lib/format";

export const metadata: Metadata = { title: "Patientes" };

export default async function Page({ searchParams }: { searchParams: Promise<{ statut?: string }> }) {
  await requireAdmin();
  const st = (await searchParams).statut;
  const status = st && STATUS[st] ? st : "active";
  const rows = await q<{ id: string; first_name: string; last_name: string; email: string; plan_name: string | null; end_date: Date | null; activated: boolean; last_seen_at: Date | null }>(
    `select p.id, p.first_name, p.last_name, p.email, pl.name plan_name, s.end_date, p.password_hash is not null activated, p.last_seen_at
       from profiles p left join subscriptions s on s.patient_id = p.id and s.status = 'active' left join plans pl on pl.code = s.plan_code
      where p.role = 'patient' and p.status = $1 order by p.last_name, p.first_name`, [status]);
  return (
    <>
      <div className="row between"><h1>Patientes</h1><Link className="btn" href="/admin/patientes/nouvelle">Nouvelle patiente</Link></div>
      <nav className="row" aria-label="Filtrer par statut" style={{ marginBottom: 12 }}>
        {Object.entries(STATUS).map(([k, v]) => <Link key={k} className={`btn small ${k === status ? "" : "ghost"}`} href={`/admin/patientes?statut=${k}`} aria-current={k === status ? "true" : undefined}>{v}s</Link>)}
      </nav>
      <div className="scroll"><table className="cards">
        <thead><tr><th>Nom</th><th>Offre</th><th>Fin</th><th>Espace</th></tr></thead>
        <tbody>{rows.map(r => (
          <tr key={r.id}>
            <td data-label="Nom"><Link href={`/admin/patientes/${r.id}`}>{r.first_name} {r.last_name}</Link></td>
            <td data-label="Offre">{r.plan_name ?? "Aucune"}</td>
            <td data-label="Fin">{r.end_date ? frDate(r.end_date) : "—"}</td>
            <td data-label="Espace">{r.activated ? (r.last_seen_at ? `Vu le ${frDate(r.last_seen_at)}` : "Activé") : "Invitation en attente"}</td>
          </tr>
        ))}</tbody>
      </table></div>
      {!rows.length && <p className="muted">Aucune patiente dans cette liste.</p>}
    </>
  );
}
