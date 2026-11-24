import { connection } from "next/server";
import { notFound } from "next/navigation";
import { q } from "@/lib/db";
import { frDateTime } from "@/lib/format";

// Développement et tests seulement : boîte d'envoi simulée (EMAIL_DRIVER=outbox). Introuvable en production.
export default async function Page() {
  await connection(); // rendu à chaque requête (contenu lu en base)
  if (process.env.NODE_ENV === "production" && process.env.EMAIL_DRIVER !== "outbox") notFound();
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEV_OUTBOX !== "1") notFound();
  const rows = await q<{ id: string; to_email: string; subject: string; body: string; created_at: Date }>("select * from email_outbox order by id desc limit 50");
  return (
    <main className="auth" style={{ placeItems: "start center" }}>
      <div className="card" style={{ maxWidth: 720 }}>
        <h1>Emails envoyés (développement)</h1>
        {rows.map(m => (
          <article key={m.id} className="ok" data-testid="email">
            <p style={{ margin: 0 }}><b>{m.subject}</b> → {m.to_email} · {frDateTime(m.created_at)}</p>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: "8px 0 0" }}>{m.body}</pre>
          </article>
        ))}
        {!rows.length && <p className="muted">Aucun email.</p>}
      </div>
    </main>
  );
}
