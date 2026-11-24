import "server-only";
import { q, one } from "./db";

// Recettes publiées : statut « published » et date de publication passée. Les 3 plus récentes sont visibles de toutes (aperçu).
export const PREVIEW = 3;
const PUBLISHED = "status = 'published' and publish_at <= now()";

export type RecipeCard = { id: string; slug: string; title: string; meal_type: string; prep_min: number; cook_min: number; themes: string[]; preview: boolean; favorite: boolean };

export function listRecipes(patientId: string, meal?: string, favoritesOnly = false) {
  return q<RecipeCard>(
    `with pub as (select *, row_number() over (order by publish_at desc, title) rn from recipes where ${PUBLISHED})
     select id, slug, title, meal_type, prep_min, cook_min, themes, rn <= ${PREVIEW} preview,
            exists (select 1 from favorites f where f.recipe_id = pub.id and f.patient_id = $1) favorite
       from pub
      where ($2::text is null or meal_type = $2) and (not $3 or exists (select 1 from favorites f where f.recipe_id = pub.id and f.patient_id = $1))
      order by publish_at desc, title`, [patientId, meal ?? null, favoritesOnly]);
}

export type Recipe = RecipeCard & {
  difficulty: string; base_portions: number; kcal: string | null; protein_g: string | null; carbs_g: string | null; fat_g: string | null; fiber_g: string | null; tip: string | null;
  ingredients: { quantity: string | null; unit: string; name: string }[]; steps: string[]; in_list: number | null;
};

export async function getRecipe(slug: string, patientId: string): Promise<Recipe | null> {
  const r = await one<Recipe>(
    `with pub as (select *, row_number() over (order by publish_at desc, title) rn from recipes where ${PUBLISHED})
     select pub.*, rn <= ${PREVIEW} preview,
            exists (select 1 from favorites f where f.recipe_id = pub.id and f.patient_id = $2) favorite,
            (select portions from shopping_list_items s where s.recipe_id = pub.id and s.patient_id = $2) in_list
       from pub where slug = $1`, [slug, patientId]);
  if (!r) return null;
  const [ingredients, steps] = await Promise.all([
    q<{ quantity: string | null; unit: string; name: string }>("select quantity, unit, name from recipe_ingredients where recipe_id = $1 order by position", [r.id]),
    q<{ text: string }>("select text from recipe_steps where recipe_id = $1 order by position", [r.id])
  ]);
  return { ...r, ingredients, steps: steps.map(s => s.text) };
}
