import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { q } from "@/lib/db";
import { frDate } from "@/lib/format";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { uploadDocument, deleteDocument } from "../actions";

export const metadata: Metadata = { title: "Ressources" };

export default async function Page() {
  await requireAdmin();
  const [articles, docs] = await Promise.all([
    q<{ id: string; title: string; visibility: string; status: string; published_at: Date }>("select id, title, visibility, status, published_at from articles order by published_at desc"),
    q<{ id: string; title: string; size_bytes: number; created_at: Date }>("select id, title, size_bytes, created_at from documents order by created_at desc")
  ]);
  return (
    <>
      <div className="row between"><h1>Articles</h1><Link className="btn" href="/admin/articles/nouveau">Nouvel article</Link></div>
      <div className="scroll"><table className="cards">
        <thead><tr><th>Titre</th><th>Lecture</th><th>Statut</th></tr></thead>
        <tbody>{articles.map(a => (
          <tr key={a.id}>
            <td data-label="Titre"><Link href={`/admin/articles/${a.id}`}>{a.title}</Link></td>
            <td data-label="Lecture">{a.visibility === "public" ? "Toutes les patientes" : "Membres"}</td>
            <td data-label="Statut">{a.status === "published" ? `Publié le ${frDate(a.published_at)}` : "Brouillon"}</td>
          </tr>
        ))}</tbody>
      </table></div>

      <h2 style={{ marginTop: 28 }}>Fiches conseils (PDF)</h2>
      <p className="muted">Fiches générales uniquement. Jamais un document propre à une patiente (bilan, plan personnalisé) : il contiendrait des données de santé.</p>
      {docs.map(d => (
        <div key={d.id} className="card row between">
          <span><a href={`/espace/fiches/${d.id}`}>{d.title}</a> <span className="muted">· {Math.max(1, Math.round(d.size_bytes / 1024))} Ko · {frDate(d.created_at)}</span></span>
          <form action={deleteDocument}><input type="hidden" name="id" value={d.id} /><button className="btn line small">Supprimer</button></form>
        </div>
      ))}
      <div className="card">
        <h3>Ajouter une fiche</h3>
        <StateForm action={uploadDocument}>
          <Field id="doc_title" name="title" label="Titre" required />
          <Field id="file" label="Fichier PDF (5 Mo au plus)" type="file" accept="application/pdf" required />
          <Submit className="btn">Ajouter</Submit>
        </StateForm>
      </div>
    </>
  );
}
