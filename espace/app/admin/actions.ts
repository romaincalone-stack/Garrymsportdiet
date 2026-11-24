"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { q, one, tx } from "@/lib/db";
import { requireAdmin, audit, appSecret } from "@/lib/auth";
import { newToken, sha256, newTotpSecret, totpStep, encrypt, decrypt, hashPassword, verifyPassword, passwordProblem } from "@/lib/crypto";
import { markSecondFactor, destroyAllSessions } from "@/lib/session";
import { sendEmail, invitationEmail } from "@/lib/email";
import { slugify, MEALS, DIFFICULTY, LOCATIONS } from "@/lib/format";
import type { FormState } from "@/components/state-form";

// Back-office : chaque action exige Manon connectée avec sa double authentification, et laisse une trace (audit_log).
const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => { const v = str(f, k).replace(",", "."); return v === "" ? null : Number(v); };
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const isUuid = (s: string) => /^[0-9a-f-]{36}$/.test(s);

// ---------- Patientes ----------
async function invite(userId: string, firstName: string, email: string) {
  await q("update auth_tokens set used_at = now() where user_id = $1 and kind = 'invitation' and used_at is null", [userId]);
  const t = newToken();
  await q("insert into auth_tokens (token_hash, user_id, kind, expires_at) values ($1, $2, 'invitation', now() + interval '7 days')", [sha256(t), userId]);
  const m = invitationEmail(firstName, t);
  await sendEmail(email, m.subject, m.body);
}

function defaultEnd(start: string, plan: { billing_unit: string; commitment_months: number | null; upfront_months: number | null }) {
  const d = new Date(start + "T12:00:00Z");
  if (plan.billing_unit === "offert") d.setUTCDate(d.getUTCDate() + 30);
  else if (plan.commitment_months) d.setUTCMonth(d.getUTCMonth() + plan.commitment_months);
  else return null;
  return d.toISOString().slice(0, 10);
}

export async function createPatient(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const first = str(form, "first_name"), last = str(form, "last_name"), email = str(form, "email").toLowerCase(), phone = str(form, "phone");
  const planCode = str(form, "plan"), start = str(form, "start_date") || new Date().toISOString().slice(0, 10);
  if (!first || !last) return { error: "Indiquez le prénom et le nom." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Adresse email invalide." };
  if (!isDate(start)) return { error: "Date de début invalide." };
  const plan = await one<{ code: string; billing_unit: string; commitment_months: number | null; upfront_months: number | null }>("select code, billing_unit, commitment_months, upfront_months from plans where code = $1", [planCode]);
  if (!plan) return { error: "Choisissez une offre." };
  if (await one("select 1 from profiles where lower(email) = $1", [email])) return { error: "Un compte existe déjà avec cette adresse." };
  const end = str(form, "end_date") || defaultEnd(start, plan);
  const id = await tx(async c => {
    const p = (await c.query<{ id: string }>("insert into profiles (role, first_name, last_name, email, phone, created_by) values ('patient',$1,$2,$3,$4,$5) returning id", [first, last, email, phone || null, me.id])).rows[0];
    await c.query("insert into subscriptions (patient_id, plan_code, start_date, end_date, commitment_end, created_by) values ($1,$2,$3,$4,$5,$6)",
      [p.id, plan.code, start, end, plan.commitment_months ? end : null, me.id]);
    return p.id;
  });
  await audit(me.id, "creation", "patiente", id);
  if (form.get("send") === "on") { await invite(id, first, email); await audit(me.id, "invitation", "patiente", id); }
  redirect(`/admin/patientes/${id}?cree=1`);
}

export async function updatePatient(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const id = str(form, "id"), first = str(form, "first_name"), last = str(form, "last_name"), email = str(form, "email").toLowerCase(), phone = str(form, "phone");
  if (!isUuid(id) || !first || !last || !email.includes("@")) return { error: "Vérifiez le prénom, le nom et l'email." };
  if (await one("select 1 from profiles where lower(email) = $1 and id <> $2", [email, id])) return { error: "Cette adresse est déjà utilisée par un autre compte." };
  await q("update profiles set first_name = $2, last_name = $3, email = $4, phone = $5 where id = $1 and role = 'patient'", [id, first, last, email, phone || null]);
  await audit(me.id, "modification", "patiente", id);
  revalidatePath(`/admin/patientes/${id}`);
  return { ok: "Coordonnées enregistrées." };
}

export async function changePlan(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const id = str(form, "id"), planCode = str(form, "plan"), start = str(form, "start_date"), endIn = str(form, "end_date");
  if (!isUuid(id) || !isDate(start) || (endIn && !isDate(endIn))) return { error: "Vérifiez les dates." };
  const plan = await one<{ code: string; billing_unit: string; commitment_months: number | null; upfront_months: number | null }>("select code, billing_unit, commitment_months, upfront_months from plans where code = $1", [planCode]);
  if (!plan) return { error: "Choisissez une offre." };
  const end = endIn || defaultEnd(start, plan);
  if (end && end < start) return { error: "La date de fin précède la date de début." };
  await tx(async c => {
    await c.query("update subscriptions set status = 'terminee', end_date = least(coalesce(end_date, $2::date), $2::date) where patient_id = $1 and status = 'active'", [id, start]);
    await c.query("insert into subscriptions (patient_id, plan_code, start_date, end_date, commitment_end, created_by) values ($1,$2,$3,$4,$5,$6)",
      [id, plan.code, start, end, plan.commitment_months ? end : null, me.id]);
  });
  await audit(me.id, "changement_offre", "patiente", id);
  revalidatePath(`/admin/patientes/${id}`);
  return { ok: "Offre enregistrée." };
}

export async function setAppointment(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const id = str(form, "id"), date = str(form, "date"), time = str(form, "time"), location = str(form, "location");
  if (!isUuid(id)) return { error: "Patiente inconnue." };
  if (form.get("clear") === "1") {
    await q("delete from appointments where patient_id = $1", [id]);
  } else {
    if (!isDate(date) || !/^\d{2}:\d{2}$/.test(time) || !LOCATIONS[location]) return { error: "Indiquez la date, l'heure et le lieu." };
    // Heure saisie par Manon, à Paris : conversion explicite en instant UTC.
    const startsAt = parisToUtc(date, time);
    await q(`insert into appointments (patient_id, starts_at, location) values ($1, $2, $3)
             on conflict (patient_id) do update set starts_at = excluded.starts_at, location = excluded.location`, [id, startsAt, location]);
  }
  await audit(me.id, "rendez_vous", "patiente", id);
  revalidatePath(`/admin/patientes/${id}`);
  return { ok: form.get("clear") === "1" ? "Rendez-vous retiré." : "Rendez-vous enregistré. Pensez à le créer aussi sur Doctolib." };
}

function parisToUtc(date: string, time: string): Date {
  const guess = new Date(`${date}T${time}:00Z`);
  const local = new Date(guess.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const utc = new Date(guess.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(guess.getTime() - (local.getTime() - utc.getTime()));
}

export async function resendInvitation(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id");
  const p = await one<{ first_name: string; email: string }>("select first_name, email from profiles where id = $1 and role = 'patient' and status = 'active'", [id]);
  if (!p) throw new Error("Patiente introuvable ou inactive.");
  await invite(id, p.first_name, p.email);
  await audit(me.id, "invitation", "patiente", id);
  redirect(`/admin/patientes/${id}?invitation=1`);
}

export async function setStatus(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id"), status = str(form, "status");
  if (!isUuid(id) || !["active", "suspendue", "archivee"].includes(status)) throw new Error("Demande invalide.");
  await q("update profiles set status = $2 where id = $1 and role = 'patient'", [id, status]);
  if (status !== "active") await destroyAllSessions(id);
  await audit(me.id, `statut_${status}`, "patiente", id);
  revalidatePath(`/admin/patientes/${id}`);
}

export async function handleOfferRequest(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id");
  if (!isUuid(id)) return;
  await q("update offer_requests set handled_at = now(), handled_by = $2 where id = $1", [id, me.id]);
  await audit(me.id, "demande_traitee", "offre", id);
  revalidatePath("/admin", "layout");
}

// ---------- Recettes ----------
function parseIngredients(text: string) {
  return text.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
    const parts = l.split(";").map(s => s.trim());
    const qty = (s: string) => { const n = Number(s.replace(",", ".")); return s !== "" && Number.isFinite(n) ? n : null; };
    if (parts.length >= 3) return { quantity: qty(parts[0]), unit: parts[1], name: parts.slice(2).join(" ; ") };
    if (parts.length === 2) return { quantity: qty(parts[0]), unit: "", name: parts[1] };
    return { quantity: null, unit: "", name: parts[0] };
  });
}

export async function saveRecipe(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const id = str(form, "id"), title = str(form, "title"), meal = str(form, "meal_type"), diff = str(form, "difficulty");
  if (!title) return { error: "Indiquez un titre." };
  if (!MEALS[meal] || !DIFFICULTY[diff]) return { error: "Choisissez le repas et la difficulté." };
  const ingredients = parseIngredients(str(form, "ingredients")), steps = str(form, "steps").split("\n").map(s => s.trim()).filter(Boolean);
  if (!ingredients.length || !steps.length) return { error: "Ajoutez au moins un ingrédient et une étape." };
  const publishAt = str(form, "publish_at");
  const vals = [title, meal, num(form, "prep_min") ?? 0, num(form, "cook_min") ?? 0, diff, Math.max(1, num(form, "base_portions") ?? 1),
    num(form, "kcal"), num(form, "protein_g"), num(form, "carbs_g"), num(form, "fat_g"), num(form, "fiber_g"),
    str(form, "themes").split(",").map(s => s.trim()).filter(Boolean), str(form, "tip") || null,
    form.get("published") === "on" ? "published" : "draft", isDate(publishAt) ? publishAt : new Date().toISOString().slice(0, 10)];
  if (vals.slice(2, 4).concat(vals.slice(5, 11)).some(v => v !== null && (typeof v === "number" && (!Number.isFinite(v) || v < 0)))) return { error: "Les durées et valeurs nutritionnelles doivent être des nombres positifs." };
  const rid = await tx(async c => {
    let rid = id;
    if (isUuid(id)) {
      await c.query(`update recipes set title=$2, meal_type=$3, prep_min=$4, cook_min=$5, difficulty=$6, base_portions=$7, kcal=$8, protein_g=$9, carbs_g=$10, fat_g=$11, fiber_g=$12,
                     themes=$13, tip=$14, status=$15, publish_at=$16, updated_at=now() where id=$1`, [id, ...vals]);
    } else {
      let slug = slugify(title) || "recette";
      if ((await c.query("select 1 from recipes where slug = $1", [slug])).rowCount) slug = `${slug}-${Date.now().toString(36)}`;
      rid = (await c.query<{ id: string }>(`insert into recipes (slug, title, meal_type, prep_min, cook_min, difficulty, base_portions, kcal, protein_g, carbs_g, fat_g, fiber_g, themes, tip, status, publish_at)
                     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) returning id`, [slug, ...vals])).rows[0].id;
    }
    await c.query("delete from recipe_ingredients where recipe_id = $1", [rid]);
    await c.query("delete from recipe_steps where recipe_id = $1", [rid]);
    for (const [i, g] of ingredients.entries()) await c.query("insert into recipe_ingredients values ($1,$2,$3,$4,$5)", [rid, i, g.quantity, g.unit, g.name]);
    for (const [i, s] of steps.entries()) await c.query("insert into recipe_steps values ($1,$2,$3)", [rid, i, s]);
    return rid;
  });
  await audit(me.id, isUuid(id) ? "modification" : "creation", "recette", rid);
  revalidatePath("/admin/recettes");
  if (!isUuid(id)) redirect(`/admin/recettes/${rid}?cree=1`);
  return { ok: "Recette enregistrée." };
}

export async function deleteRecipe(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id");
  if (!isUuid(id) || form.get("confirm") !== "on") return;
  await q("delete from recipes where id = $1", [id]);
  await audit(me.id, "suppression", "recette", id);
  redirect("/admin/recettes");
}

// ---------- Articles et fiches ----------
export async function saveArticle(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const id = str(form, "id"), title = str(form, "title"), body = String(form.get("body") ?? "").trim(), vis = str(form, "visibility"), date = str(form, "published_at");
  if (!title || !body) return { error: "Indiquez un titre et un texte." };
  if (!["public", "members"].includes(vis)) return { error: "Choisissez qui peut lire l'article." };
  const vals = [title, body, vis, form.get("published") === "on" ? "published" : "draft", isDate(date) ? date : new Date().toISOString().slice(0, 10)];
  let aid = id;
  if (isUuid(id)) await q("update articles set title=$2, body=$3, visibility=$4, status=$5, published_at=$6 where id=$1", [id, ...vals]);
  else {
    let slug = slugify(title) || "article";
    if (await one("select 1 from articles where slug = $1", [slug])) slug = `${slug}-${Date.now().toString(36)}`;
    aid = (await one<{ id: string }>("insert into articles (slug, title, body, visibility, status, published_at) values ($1,$2,$3,$4,$5,$6) returning id", [slug, ...vals]))!.id;
  }
  await audit(me.id, isUuid(id) ? "modification" : "creation", "article", aid);
  revalidatePath("/admin/ressources");
  if (!isUuid(id)) redirect(`/admin/articles/${aid}?cree=1`);
  return { ok: "Article enregistré." };
}

export async function deleteArticle(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id");
  if (!isUuid(id) || form.get("confirm") !== "on") return;
  await q("delete from articles where id = $1", [id]);
  await audit(me.id, "suppression", "article", id);
  redirect("/admin/ressources");
}

const MAX_PDF = 5 * 1024 * 1024;
export async function uploadDocument(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const title = str(form, "title"), file = form.get("file");
  if (!title) return { error: "Indiquez un titre." };
  if (!(file instanceof File) || !file.size) return { error: "Choisissez un fichier PDF." };
  if (file.size > MAX_PDF) return { error: "Fichier trop lourd (5 Mo au plus)." };
  const data = Buffer.from(await file.arrayBuffer());
  if (data.subarray(0, 5).toString("latin1") !== "%PDF-") return { error: "Seuls les fichiers PDF sont acceptés." };
  const d = await one<{ id: string }>("insert into documents (title, mime, size_bytes, data) values ($1, 'application/pdf', $2, $3) returning id", [title, data.length, data]);
  await audit(me.id, "creation", "fiche", d!.id);
  revalidatePath("/admin/ressources");
  return { ok: "Fiche ajoutée. Rappel : uniquement des fiches générales, jamais un document propre à une patiente." };
}

export async function deleteDocument(form: FormData) {
  const me = await requireAdmin();
  const id = str(form, "id");
  if (!isUuid(id)) return;
  await q("delete from documents where id = $1", [id]);
  await audit(me.id, "suppression", "fiche", id);
  revalidatePath("/admin/ressources");
}

// ---------- Paramètres ----------
export async function savePlans(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const plans = await q<{ code: string }>("select code from plans");
  const features = await q<{ key: string }>("select key from features");
  await tx(async c => {
    for (const p of plans) {
      const price = num(form, `price_${p.code}`), upfront = num(form, `upfront_${p.code}`);
      if (price !== null && Number.isFinite(price) && price >= 0) await c.query("update plans set price_cents = $2 where code = $1", [p.code, Math.round(price * 100)]);
      await c.query("update plans set upfront_price_cents = $2 where code = $1", [p.code, upfront !== null && Number.isFinite(upfront) && upfront >= 0 ? Math.round(upfront * 100) : null]);
      for (const f of features) await c.query("update plan_features set enabled = $3 where plan_code = $1 and feature_key = $2", [p.code, f.key, form.get(`m_${p.code}_${f.key}`) === "on"]);
    }
  });
  await audit(me.id, "modification", "formules", null);
  revalidatePath("/", "layout");
  return { ok: "Formules et accès enregistrés." };
}

export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const doctolib = str(form, "doctolib_url"), whatsapp = str(form, "whatsapp_url");
  if (!/^https:\/\/(www\.)?doctolib\.fr\//.test(doctolib)) return { error: "Le lien Doctolib doit commencer par https://www.doctolib.fr/" };
  if (whatsapp && !/^https:\/\/wa\.me\/\d+/.test(whatsapp)) return { error: "Le lien WhatsApp doit avoir la forme https://wa.me/33612345678" };
  const practitioner = { name: str(form, "p_name") || "Manon Garrione", title: str(form, "p_title") || "Diététicienne-nutritionniste", registration: str(form, "p_registration") || "[numéro ADELI ou RPPS à compléter]" };
  for (const [k, v] of Object.entries({ doctolib_url: doctolib, whatsapp_url: whatsapp, practitioner })) {
    await q("insert into settings (key, value) values ($1, $2) on conflict (key) do update set value = excluded.value", [k, JSON.stringify(v)]);
  }
  await audit(me.id, "modification", "reglages", null);
  revalidatePath("/", "layout");
  return { ok: "Réglages enregistrés." };
}

// ---------- Sécurité de Manon ----------
export async function startTotp() {
  const me = await requireAdmin({ setupPage: true });
  if (me.totp_enabled) return;
  await q("update profiles set totp_secret_enc = $2 where id = $1", [me.id, encrypt(newTotpSecret(), appSecret())]);
  revalidatePath("/admin/securite");
}

export async function confirmTotp(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin({ setupPage: true });
  if (me.totp_enabled) return { ok: "La double authentification est déjà active." };
  const row = await one<{ totp_secret_enc: string | null }>("select totp_secret_enc from profiles where id = $1", [me.id]);
  if (!row?.totp_secret_enc) return { error: "Commencez par afficher le QR code." };
  const step = totpStep(decrypt(row.totp_secret_enc, appSecret()), str(form, "code"));
  if (step === null) return { error: "Code incorrect. Vérifiez l'heure du téléphone et saisissez le code affiché." };
  await q("update profiles set totp_enabled = true, totp_last_step = $2 where id = $1", [me.id, step]);
  await markSecondFactor(me.token_hash);
  await audit(me.id, "activation_2fa", "compte", me.id);
  redirect("/admin");
}

export async function changeAdminPassword(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const row = await one<{ password_hash: string }>("select password_hash from profiles where id = $1", [me.id]);
  if (!(await verifyPassword(String(form.get("current") ?? ""), row?.password_hash ?? null))) return { error: "Le mot de passe actuel est incorrect." };
  const next = String(form.get("password") ?? "");
  const problem = passwordProblem(next);
  if (problem) return { error: problem };
  if (next !== String(form.get("confirm") ?? "")) return { error: "Les deux mots de passe ne sont pas identiques." };
  await q("update profiles set password_hash = $2 where id = $1", [me.id, await hashPassword(next)]);
  await destroyAllSessions(me.id, me.token_hash);
  await audit(me.id, "mot_de_passe", "compte", me.id);
  return { ok: "Mot de passe modifié." };
}
