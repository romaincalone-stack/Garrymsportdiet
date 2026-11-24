import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { q } from "@/lib/db";
import { frDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Journal" };

export default async function Page() {
  await requireAdmin();
  const rows = await q<{ id: string; at: Date; actor: string | null; action: string; entity: string; entity_id: string | null; target: string | null }>(
    `select l.id, l.at, a.first_name || ' ' || a.last_name actor, l.action, l.entity, l.entity_id,
            (select t.first_name || ' ' || t.last_name from profiles t where t.id::text = l.entity_id) target
       from audit_log l left join profiles a on a.id = l.actor_id order by l.at desc limit 200`);
  return (
    <>
      <h1>Journal des actions</h1>
      <p className="muted">Les 200 dernières actions sur les comptes et les contenus. Conservé pour la traçabilité des accès.</p>
      <div className="scroll"><table className="cards">
        <thead><tr><th>Date</th><th>Par</th><th>Action</th><th>Sur</th></tr></thead>
        <tbody>{rows.map(r => (
          <tr key={r.id}><td data-label="Date">{frDateTime(r.at)}</td><td data-label="Par">{r.actor ?? "—"}</td><td data-label="Action">{r.action.replace(/_/g, " ")}</td><td data-label="Sur">{r.entity}{r.target ? ` · ${r.target}` : ""}</td></tr>
        ))}</tbody>
      </table></div>
    </>
  );
}
