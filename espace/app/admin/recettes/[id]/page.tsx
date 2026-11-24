import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { one, q } from "@/lib/db";
import { RecipeForm, type RecipeValues } from "@/components/recipe-form";
import { Submit } from "@/components/submit";
import { Check } from "@/components/ui";
import { deleteRecipe } from "../../actions";

export const metadata: Metadata = { title: "Recette" };

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ cree?: string }> }) {
  await requireAdmin();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const r = await one<RecipeValues & { slug: string }>("select * from recipes where id = $1", [id]);
  if (!r) notFound();
  const [ingr, steps] = await Promise.all([
    q<{ quantity: string | null; unit: string; name: string }>("select quantity, unit, name from recipe_ingredients where recipe_id = $1 order by position", [id]),
    q<{ text: string }>("select text from recipe_steps where recipe_id = $1 order by position", [id])
  ]);
  const ingredients = ingr.map(i => i.quantity == null ? i.name : `${Number(i.quantity)} ; ${i.unit} ; ${i.name}`).join("\n");
  return (
    <>
      <p><Link href="/admin/recettes">← Recettes</Link></p>
      <h1>{r.title}</h1>
      {sp.cree && <p className="ok" role="status">Recette créée.</p>}
      <div className="card"><RecipeForm r={{ ...r, ingredients, steps: steps.map(s => s.text).join("\n") }} /></div>
      <form action={deleteRecipe} className="card"><input type="hidden" name="id" value={id} /><Check id="confirm" label="Je confirme la suppression définitive" required /><Submit className="btn line">Supprimer la recette</Submit></form>
    </>
  );
}
