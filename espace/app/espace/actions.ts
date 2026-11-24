"use server";
import { revalidatePath } from "next/cache";
import { q, one } from "@/lib/db";
import { requirePatient, audit } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { hashPassword, verifyPassword, passwordProblem } from "@/lib/crypto";
import { destroyAllSessions } from "@/lib/session";
import type { FormState } from "@/components/state-form";

// Chaque action vérifie la session et le droit d'accès : elles sont joignables par une requête directe.

async function recipeFor(patientId: string, recipeId: string) {
  const access = await patientAccess(patientId);
  const r = await one<{ id: string; preview: boolean }>(
    `select r.id, r.id in (select id from recipes where status = 'published' and publish_at <= now() order by publish_at desc limit 3) preview
       from recipes r where r.id = $1 and r.status = 'published' and r.publish_at <= now()`, [recipeId]);
  if (!r || !(access.can("recettes") || r.preview)) throw new Error("Recette non disponible.");
  return r;
}

export async function toggleFavorite(form: FormData) {
  const u = await requirePatient();
  const r = await recipeFor(u.id, String(form.get("recipe")));
  const del = await q("delete from favorites where patient_id = $1 and recipe_id = $2 returning 1", [u.id, r.id]);
  if (!del.length) await q("insert into favorites (patient_id, recipe_id) values ($1, $2)", [u.id, r.id]);
  revalidatePath("/espace/recettes", "layout");
}

export async function addToList(form: FormData) {
  const u = await requirePatient();
  const r = await recipeFor(u.id, String(form.get("recipe")));
  const portions = Math.min(12, Math.max(1, Number(form.get("portions")) || 1));
  await q(`insert into shopping_list_items (patient_id, recipe_id, portions) values ($1, $2, $3)
           on conflict (patient_id, recipe_id) do update set portions = excluded.portions`, [u.id, r.id, portions]);
  revalidatePath("/espace", "layout");
}

export async function removeFromList(form: FormData) {
  const u = await requirePatient();
  await q("delete from shopping_list_items where patient_id = $1 and recipe_id = $2", [u.id, String(form.get("recipe"))]);
  revalidatePath("/espace", "layout");
}

export async function clearList() {
  const u = await requirePatient();
  await q("delete from shopping_list_items where patient_id = $1", [u.id]);
  revalidatePath("/espace", "layout");
}

/** « Je suis intéressée » : Manon voit la demande dans « À traiter » et recontacte la patiente. Aucun paiement ici. */
export async function requestOffer(form: FormData) {
  const u = await requirePatient();
  const offer = String(form.get("offer") ?? "");
  const known = await one("select 1 from plans where code = $1 and public union all select 1 from settings, jsonb_array_elements(value) o where key = 'extra_offers' and o->>'code' = $1", [offer]);
  if (!known) throw new Error("Offre inconnue.");
  const pending = await one("select 1 from offer_requests where patient_id = $1 and offer = $2 and handled_at is null", [u.id, offer]);
  if (!pending) await q("insert into offer_requests (patient_id, offer) values ($1, $2)", [u.id, offer]);
  revalidatePath("/espace/offres");
}

export async function changePassword(_: FormState, form: FormData): Promise<FormState> {
  const u = await requirePatient();
  const current = String(form.get("current") ?? ""), next = String(form.get("password") ?? ""), confirm = String(form.get("confirm") ?? "");
  const row = await one<{ password_hash: string }>("select password_hash from profiles where id = $1", [u.id]);
  if (!(await verifyPassword(current, row?.password_hash ?? null))) return { error: "Le mot de passe actuel est incorrect." };
  const problem = passwordProblem(next);
  if (problem) return { error: problem };
  if (next !== confirm) return { error: "Les deux mots de passe ne sont pas identiques." };
  await q("update profiles set password_hash = $2 where id = $1", [u.id, await hashPassword(next)]);
  await destroyAllSessions(u.id, u.token_hash);
  await audit(u.id, "mot_de_passe", "compte", u.id);
  return { ok: "Mot de passe modifié. Vos autres appareils sont déconnectés." };
}
