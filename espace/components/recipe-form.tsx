import { StateForm } from "./state-form";
import { Field, Select, Area, Check } from "./ui";
import { Submit } from "./submit";
import { MEALS, DIFFICULTY } from "@/lib/format";
import { saveRecipe } from "@/app/admin/actions";

export type RecipeValues = {
  id?: string; title?: string; meal_type?: string; prep_min?: number; cook_min?: number; difficulty?: string; base_portions?: number;
  kcal?: string | null; protein_g?: string | null; carbs_g?: string | null; fat_g?: string | null; fiber_g?: string | null;
  themes?: string[]; tip?: string | null; status?: string; publish_at?: Date; ingredients?: string; steps?: string;
};
const n = (v: string | number | null | undefined) => v == null ? "" : String(Number(v));

export function RecipeForm({ r = {} }: { r?: RecipeValues }) {
  return (
    <StateForm action={saveRecipe}>
      <input type="hidden" name="id" value={r.id ?? ""} />
      <Field id="title" label="Titre" defaultValue={r.title} required />
      <div className="formgrid">
        <Select id="meal_type" label="Repas" defaultValue={r.meal_type ?? "dejeuner"}>{Object.entries(MEALS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>
        <Select id="difficulty" label="Difficulté" defaultValue={r.difficulty ?? "facile"}>{Object.entries(DIFFICULTY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>
        <Field id="prep_min" label="Préparation (min)" type="number" min={0} defaultValue={n(r.prep_min ?? 10)} />
        <Field id="cook_min" label="Cuisson (min)" type="number" min={0} defaultValue={n(r.cook_min ?? 0)} />
        <Field id="base_portions" label="Nombre de portions" type="number" min={1} max={12} defaultValue={n(r.base_portions ?? 2)} />
        <Field id="themes" label="Thèmes (séparés par des virgules)" defaultValue={(r.themes ?? []).join(", ")} hint="Des objectifs ou des habitudes (« Petit budget », « Végétarien »), jamais une promesse de soin." />
      </div>
      <Area id="ingredients" label="Ingrédients, un par ligne" defaultValue={r.ingredients} required rows={8}
        hint="Quantité ; unité ; ingrédient. Exemple : 50 ; g ; flocons d'avoine. Sans quantité : juste le nom." />
      <Area id="steps" label="Étapes, une par ligne" defaultValue={r.steps} required rows={6} />
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 500, marginBottom: 8 }}>Repères pour une portion (facultatif)</legend>
        <div className="formgrid">
          <Field id="kcal" label="kcal" inputMode="decimal" defaultValue={n(r.kcal)} />
          <Field id="protein_g" label="Protéines (g)" inputMode="decimal" defaultValue={n(r.protein_g)} />
          <Field id="carbs_g" label="Glucides (g)" inputMode="decimal" defaultValue={n(r.carbs_g)} />
          <Field id="fat_g" label="Lipides (g)" inputMode="decimal" defaultValue={n(r.fat_g)} />
          <Field id="fiber_g" label="Fibres (g)" inputMode="decimal" defaultValue={n(r.fiber_g)} />
        </div>
      </fieldset>
      <Area id="tip" label="Le conseil de Manon (facultatif)" defaultValue={r.tip ?? ""} rows={3} hint="Pas d'allégation : « adapté à », jamais « soigne » ou « brûle-graisse »." />
      <div className="formgrid">
        <Field id="publish_at" label="Date de publication" type="date" defaultValue={r.publish_at ? new Date(r.publish_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)} />
        <Check id="published" label="Publiée (sinon brouillon)" defaultChecked={r.status === "published"} />
      </div>
      <Submit className="btn">Enregistrer</Submit>
    </StateForm>
  );
}
