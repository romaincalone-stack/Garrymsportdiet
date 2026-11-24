import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { q } from "@/lib/db";
import { frDate, MEALS } from "@/lib/format";

export const metadata: Metadata = { title: "Recettes" };

export default async function Page() {
  await requireAdmin();
  const rows = await q<{ id: string; title: string; meal_type: string; status: string; publish_at: Date; favs: number }>(
    "select r.id, r.title, r.meal_type, r.status, r.publish_at, (select count(*)::int from favorites f where f.recipe_id = r.id) favs from recipes r order by r.publish_at desc, r.title");
  return (
    <>
      <div className="row between"><h1>Recettes</h1><Link className="btn" href="/admin/recettes/nouvelle">Nouvelle recette</Link></div>
      <p className="muted">Les 3 recettes publiées les plus récentes sont visibles de toutes les patientes, y compris sans l&apos;offre Recettes.</p>
      <div className="scroll"><table className="cards">
        <thead><tr><th>Titre</th><th>Repas</th><th>Statut</th><th>Favoris</th></tr></thead>
        <tbody>{rows.map(r => (
          <tr key={r.id}>
            <td data-label="Titre"><Link href={`/admin/recettes/${r.id}`}>{r.title}</Link></td>
            <td data-label="Repas">{MEALS[r.meal_type]}</td>
            <td data-label="Statut">{r.status === "published" ? (new Date(r.publish_at) > new Date() ? `Programmée le ${frDate(r.publish_at)}` : "Publiée") : "Brouillon"}</td>
            <td data-label="Favoris">{r.favs}</td>
          </tr>
        ))}</tbody>
      </table></div>
    </>
  );
}
