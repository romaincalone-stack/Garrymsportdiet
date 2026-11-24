import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { listRecipes } from "@/lib/recipes";
import { MEALS } from "@/lib/format";
import { IStar } from "@/components/icons";
import { Locked } from "@/components/patient";

export const metadata: Metadata = { title: "Recettes" };

export default async function Page({ searchParams }: { searchParams: Promise<{ repas?: string; favoris?: string }> }) {
  const u = await requirePatient();
  const sp = await searchParams;
  const meal = sp.repas && MEALS[sp.repas] ? sp.repas : undefined, fav = sp.favoris === "1";
  const [access, recipes] = await Promise.all([patientAccess(u.id), listRecipes(u.id, meal, fav)]);
  const full = access.can("recettes");
  const visible = recipes.filter(r => full || r.preview), hidden = recipes.length - visible.length;
  const chip = (href: string, label: string, on: boolean) => <Link key={href} href={href} aria-current={on ? "true" : undefined}>{label}</Link>;

  return (
    <>
      <h1>Recettes</h1>
      <nav className="chips" aria-label="Filtrer les recettes">
        {chip("/espace/recettes", "Toutes", !meal && !fav)}
        {chip("/espace/recettes?favoris=1", "Mes favoris", fav)}
        {Object.entries(MEALS).map(([k, v]) => chip(`/espace/recettes?repas=${k}`, v, meal === k))}
      </nav>
      <div className="grid2" style={{ marginTop: 16 }}>
        {visible.map(r => (
          <Link key={r.id} className="card rcard" href={`/espace/recettes/${r.slug}`}>
            <div>
              <h3>{r.title}</h3>
              <div className="meta"><span>{MEALS[r.meal_type]}</span><span>{r.prep_min + r.cook_min} min</span></div>
            </div>
            {r.favorite && <span aria-label="Favori" style={{ color: "var(--tilleul)", width: 24 }}><IStar on /></span>}
          </Link>
        ))}
      </div>
      {!visible.length && <p className="muted">{fav ? "Aucun favori pour l'instant : touchez l'étoile d'une recette pour la retrouver ici." : "Aucune recette dans cette catégorie pour le moment."}</p>}
      {!full && (hidden > 0 || !recipes.length) && <Locked what={`${hidden} autre${hidden > 1 ? "s" : ""} recette${hidden > 1 ? "s" : ""} et la liste de courses complète`} plan={access.unlock("recettes")} />}
    </>
  );
}
