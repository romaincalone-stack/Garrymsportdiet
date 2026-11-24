import { StateForm } from "./state-form";
import { Field, Select, Area, Check } from "./ui";
import { Submit } from "./submit";
import { saveArticle } from "@/app/admin/actions";

export type ArticleValues = { id?: string; title?: string; body?: string; visibility?: string; status?: string; published_at?: Date };

export function ArticleForm({ a = {} }: { a?: ArticleValues }) {
  return (
    <StateForm action={saveArticle}>
      <input type="hidden" name="id" value={a.id ?? ""} />
      <Field id="title" label="Titre" defaultValue={a.title} required />
      <Area id="body" label="Texte" defaultValue={a.body} required rows={14} hint="Séparez les paragraphes par une ligne vide. Phrases courtes, vouvoiement, aucune allégation de soin." />
      <div className="formgrid">
        <Select id="visibility" label="Qui peut le lire" defaultValue={a.visibility ?? "members"}>
          <option value="members">Membres (selon l&apos;offre)</option>
          <option value="public">Toutes les patientes connectées</option>
        </Select>
        <Field id="published_at" label="Date de publication" type="date" defaultValue={(a.published_at ? new Date(a.published_at) : new Date()).toISOString().slice(0, 10)} />
      </div>
      <Check id="published" label="Publié (sinon brouillon)" defaultChecked={a.status === "published"} />
      <Submit className="btn">Enregistrer</Submit>
    </StateForm>
  );
}
