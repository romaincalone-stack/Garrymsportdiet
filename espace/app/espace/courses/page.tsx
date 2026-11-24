import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { q } from "@/lib/db";
import { scaleQty } from "@/lib/format";
import { Submit } from "@/components/submit";
import { removeFromList, clearList } from "../actions";

export const metadata: Metadata = { title: "Liste de courses" };

type Line = { recipe_id: string; slug: string; title: string; portions: number; base_portions: number; quantity: string | null; unit: string; name: string };

export default async function Page() {
  const u = await requirePatient();
  const rows = await q<Line>(
    `select s.recipe_id, r.slug, r.title, s.portions, r.base_portions, i.quantity, i.unit, i.name
       from shopping_list_items s join recipes r on r.id = s.recipe_id left join recipe_ingredients i on i.recipe_id = r.id
      where s.patient_id = $1 order by r.title, i.position`, [u.id]);
  const recipes = [...new Map(rows.map(r => [r.recipe_id, r])).values()];
  // Ingrédients additionnés quand le nom et l'unité sont identiques.
  const agg = new Map<string, { name: string; unit: string; total: number | null }>();
  for (const r of rows) {
    if (!r.name) continue;
    const key = `${r.name.trim().toLowerCase()}|${r.unit}`, cur = agg.get(key) ?? { name: r.name, unit: r.unit, total: null };
    if (r.quantity != null) cur.total = (cur.total ?? 0) + (Number(r.quantity) * r.portions) / r.base_portions;
    agg.set(key, cur);
  }
  const items = [...agg.values()].sort((a, b) => a.name.localeCompare(b.name, "fr"));

  if (!recipes.length) return (
    <>
      <h1>Liste de courses</h1>
      <p className="muted">Votre liste est vide. Ouvrez une recette et touchez « Ajouter à la liste de courses ».</p>
      <Link className="btn" href="/espace/recettes">Voir les recettes</Link>
    </>
  );

  return (
    <>
      <h1>Liste de courses</h1>
      <section className="card" aria-labelledby="items-t">
        <h2 id="items-t">À acheter</h2>
        <ul className="ingr">
          {items.map((i, k) => (
            <li key={k}>
              <input type="checkbox" id={`it${k}`} />
              <label htmlFor={`it${k}`} style={{ display: "flex", gap: 10, flex: 1 }}>
                <b>{i.total == null ? "" : `${scaleQty(i.total, 1, 1)} ${i.unit}`.trim()}</b><span>{i.name}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="muted" style={{ margin: "10px 0 0", fontSize: 14 }}>Les cases cochées ne sont pas enregistrées : elles servent pendant vos courses.</p>
      </section>
      <section className="card" aria-labelledby="rec-t">
        <h2 id="rec-t">Pour ces recettes</h2>
        <ul className="ingr">
          {recipes.map(r => (
            <li key={r.recipe_id} style={{ alignItems: "center", justifyContent: "space-between" }}>
              <Link href={`/espace/recettes/${r.slug}?portions=${r.portions}`}>{r.title}</Link>
              <span className="row" style={{ gap: 8, flexWrap: "nowrap" }}>
                <span className="muted">{r.portions} p.</span>
                <form action={removeFromList}><input type="hidden" name="recipe" value={r.recipe_id} /><button className="btn ghost small" aria-label={`Retirer ${r.title}`}>Retirer</button></form>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <form action={clearList}><Submit className="btn line">Vider la liste</Submit></form>
    </>
  );
}
