import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { getRecipe } from "@/lib/recipes";
import { MEALS, DIFFICULTY, scaleQty } from "@/lib/format";
import { IStar } from "@/components/icons";
import { Locked } from "@/components/patient";
import { Submit } from "@/components/submit";
import { toggleFavorite, addToList } from "../../actions";

export const metadata: Metadata = { title: "Recette" };

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ portions?: string }> }) {
  const u = await requirePatient();
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const [access, r] = await Promise.all([patientAccess(u.id), getRecipe(slug, u.id)]);
  if (!r) notFound();
  if (!access.can("recettes") && !r.preview) return (<><p><Link href="/espace/recettes">← Recettes</Link></p><h1>{r.title}</h1><Locked what="Cette recette" plan={access.unlock("recettes")} /></>);

  const portions = Math.min(12, Math.max(1, Number(sp.portions) || r.in_list || r.base_portions));
  const macro = (label: string, v: string | null, unit: string) => v == null ? null : <div><b>{Math.round(Number(v))}{unit}</b><span className="muted">{label}</span></div>;

  return (
    <article>
      <p><Link href="/espace/recettes">← Recettes</Link></p>
      <div className="row between" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
        <h1>{r.title}</h1>
        <form action={toggleFavorite}>
          <input type="hidden" name="recipe" value={r.id} />
          <button className="btn ghost small" aria-pressed={r.favorite} aria-label={r.favorite ? "Retirer des favoris" : "Ajouter aux favoris"} style={{ color: r.favorite ? "var(--tilleul)" : undefined }}><span style={{ width: 22, display: "inline-flex" }}><IStar on={r.favorite} /></span></button>
        </form>
      </div>
      <div className="meta"><span>{MEALS[r.meal_type]}</span><span>Préparation {r.prep_min} min</span>{r.cook_min > 0 && <span>Cuisson {r.cook_min} min</span>}<span>{DIFFICULTY[r.difficulty]}</span></div>
      {r.themes.length > 0 && <p className="row" style={{ gap: 6, marginTop: 10 }}>{r.themes.map(t => <span key={t} className="tag">{t}</span>)}</p>}

      <section className="card" aria-labelledby="ingr-t">
        <div className="row between">
          <h2 id="ingr-t" style={{ margin: 0 }}>Ingrédients</h2>
          <nav className="row" aria-label="Nombre de portions" style={{ gap: 8 }}>
            <Link className="btn ghost small" href={`?portions=${Math.max(1, portions - 1)}`} aria-label="Une portion de moins" scroll={false}>−</Link>
            <span aria-live="polite"><b>{portions}</b> portion{portions > 1 ? "s" : ""}</span>
            <Link className="btn ghost small" href={`?portions=${Math.min(12, portions + 1)}`} aria-label="Une portion de plus" scroll={false}>+</Link>
          </nav>
        </div>
        <ul className="ingr" style={{ marginTop: 10 }}>
          {r.ingredients.map((i, k) => <li key={k}><b>{i.quantity == null ? "" : `${scaleQty(Number(i.quantity), r.base_portions, portions)} ${i.unit}`.trim()}</b><span>{i.name}</span></li>)}
        </ul>
        <form action={addToList} style={{ marginTop: 14 }}>
          <input type="hidden" name="recipe" value={r.id} />
          <input type="hidden" name="portions" value={portions} />
          <Submit className="btn block">{r.in_list ? (r.in_list === portions ? "Dans la liste de courses ✓" : `Mettre à jour la liste (${portions} portions)`) : "Ajouter à la liste de courses"}</Submit>
        </form>
      </section>

      <section className="card" aria-labelledby="steps-t">
        <h2 id="steps-t">Préparation</h2>
        <ol className="steps">{r.steps.map((s, k) => <li key={k}>{s}</li>)}</ol>
      </section>

      {r.kcal != null && (
        <section className="card" aria-labelledby="macro-t">
          <h2 id="macro-t">Repères pour une portion</h2>
          <div className="macros">{macro("kcal", r.kcal, "")}{macro("protéines", r.protein_g, " g")}{macro("glucides", r.carbs_g, " g")}{macro("lipides", r.fat_g, " g")}{macro("fibres", r.fiber_g, " g")}</div>
          <p className="muted" style={{ margin: "10px 0 0", fontSize: 14 }}>Valeurs indicatives. Vos besoins sont personnels : on en parle en consultation.</p>
        </section>
      )}
      {r.tip && <div className="notice"><span><b>Le conseil de Manon</b><br />{r.tip}</span></div>}
    </article>
  );
}
