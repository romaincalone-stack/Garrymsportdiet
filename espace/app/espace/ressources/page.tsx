import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { q } from "@/lib/db";
import { frDate } from "@/lib/format";
import { IDoc } from "@/components/icons";
import { Locked } from "@/components/patient";

export const metadata: Metadata = { title: "Ressources" };

export default async function Page() {
  const u = await requirePatient();
  const access = await patientAccess(u.id);
  const members = access.can("articles");
  const [articles, docs] = await Promise.all([
    q<{ slug: string; title: string; visibility: string; published_at: Date }>(
      `select slug, title, visibility, published_at from articles where status = 'published' and published_at <= now() and (visibility = 'public' or $1) order by published_at desc`, [members]),
    access.can("docs") ? q<{ id: string; title: string; size_bytes: number }>("select id, title, size_bytes from documents order by created_at desc") : Promise.resolve([])
  ]);

  return (
    <>
      <h1>Ressources</h1>
      <h2>Articles</h2>
      {articles.map(a => (
        <Link key={a.slug} className="card" href={`/espace/ressources/${a.slug}`}>
          <h3>{a.title}</h3>
          <span className="muted">{frDate(a.published_at)}{a.visibility === "members" ? " · réservé aux membres" : ""}</span>
        </Link>
      ))}
      {!articles.length && <p className="muted">Aucun article pour le moment.</p>}
      {!members && <Locked what="Articles réservés aux membres" plan={access.unlock("articles")} />}

      <h2 style={{ marginTop: 24 }}>Fiches conseils</h2>
      {access.can("docs") ? docs.map(d => (
        <a key={d.id} className="card row" style={{ flexWrap: "nowrap" }} href={`/espace/fiches/${d.id}`}>
          <span style={{ width: 24, flex: "none" }}><IDoc /></span>
          <span style={{ flex: 1 }}>{d.title}<br /><span className="muted">PDF · {Math.max(1, Math.round(d.size_bytes / 1024))} Ko</span></span>
          <span>Télécharger</span>
        </a>
      )) : <Locked what="Fiches conseils à télécharger" plan={access.unlock("docs")} />}
      {access.can("docs") && !docs.length && <p className="muted">Aucune fiche pour le moment.</p>}
    </>
  );
}
