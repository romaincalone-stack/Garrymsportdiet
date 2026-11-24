// Données de base de l'espace : formules, fonctionnalités, matrice d'accès, réglages, compte de Manon.
// Usage :
//   DATABASE_URL=… ADMIN_EMAIL=… npm run db:seed            → production : rien de fictif, invitation de Manon
//   DATABASE_URL=… npm run db:seed -- --demo                 → développement : + recettes, articles, fiches et patientes fictives
// Idempotent : relancer le script met à jour les formules et la matrice sans toucher aux comptes existants.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const DEMO = process.argv.includes("--demo");
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
const q = (sql, params = []) => db.query(sql, params);

// ---------- Formules (APP_SPEC.md §3, brief du 2026-10-30, retours du 2026-11-04) ----------
const PLANS = [
  { code: "suivi", name: "Consultation à l'unité", price: 5000, unit: "consultation", sort: 1, highlights: ["Une consultation au cabinet de La Garde ou en visio", "Sans l'application"] },
  { code: "decouverte", name: "Mois offert après le bilan", price: 0, unit: "offert", sort: 2, public: false, highlights: ["30 jours d'accès à l'application après votre bilan"] },
  { code: "f1", name: "Offre Nutrition", price: 6000, unit: "mois", commit: 3, upfront: 18000, upfrontMonths: 3, sort: 3,
    highlights: ["Le bilan, puis 1 suivi par mois (cabinet ou visio)", "Banque de recettes et liste de courses", "Contact WhatsApp avec Manon", "Engagement 3 mois : 180 € en une fois ou chaque mois"] },
  { code: "f2", name: "Offre All in", price: 9000, unit: "mois", commit: 3, upfront: 27000, upfrontMonths: 3, sort: 4,
    highlights: ["Tout le contenu de l'offre Nutrition", "Vidéos de 10 à 30 min : cardio, renforcement, étirements", "2 séances collectives par mois en visio", "Engagement 3 mois : 270 € en une fois ou chaque mois"] },
  { code: "f3", name: "Recettes + sport", price: 2000, unit: "mois", upfront: 9000, upfrontMonths: 6, sort: 5,
    highlights: ["Pour garder le rythme une fois votre suivi terminé", "Toutes les recettes et la liste de courses", "Les vidéos de 10 à 30 min, sans séance en direct", "Sans engagement, ou 90 € pour 6 mois"] }
];
// Fonctionnalités : la liste complète du prototype, pour que la matrice ne change pas de forme d'une étape à l'autre.
// Celles des étapes suivantes existent dans la matrice mais n'ont pas encore d'écran.
const FEATURES = [
  ["docs", "Profil et fiches conseils"], ["rdv", "Bouton « Reprendre rendez-vous » (Doctolib)"], ["articles", "Articles réservés aux membres"],
  ["recettes", "Bibliothèque de recettes complète"], ["contact", "Contact WhatsApp avec Manon"], ["visio", "Suivi nutritionnel 1 fois par mois"],
  ["nutri", "Programme nutritionnel et semainier (étape 2)"], ["journal", "Semainier partagé (étape 2, données de santé)"],
  ["evolution", "Suivi de l'évolution (étape 2, données de santé)"], ["cycle", "Suivi du cycle (étape 2, données de santé)"],
  ["videos", "Bibliothèque de vidéos de sport (étape 3)"], ["sport", "Programme sportif (étape 3)"],
  ["collectives", "Séances collectives en visio (étape 3)"], ["individuelle", "Séance individuelle en supplément (étape 3)"]
];
const ACCESS = {
  docs: ["suivi", "decouverte", "f1", "f2", "f3"], rdv: ["suivi", "decouverte", "f1", "f2", "f3"], articles: ["suivi", "decouverte", "f1", "f2", "f3"],
  recettes: ["decouverte", "f1", "f2", "f3"], contact: ["f1", "f2"], visio: ["f1", "f2"],
  nutri: ["decouverte", "f1", "f2"], journal: ["decouverte", "f1", "f2"], evolution: ["suivi", "decouverte", "f1", "f2", "f3"], cycle: ["suivi", "decouverte", "f1", "f2", "f3"],
  videos: ["f2", "f3"], sport: ["f2", "f3"], collectives: ["f2"], individuelle: ["f2"]
};
const SETTINGS = {
  doctolib_url: "https://www.doctolib.fr/dieteticien/toulon/manon-garrione",
  whatsapp_url: "",                                  // lien wa.me à fournir par Manon ; vide = consigne affichée sans lien
  practitioner: { name: "Manon Garrione", title: "Diététicienne-nutritionniste", registration: "[numéro ADELI ou RPPS à compléter]" },
  extra_offers: [{ code: "coaching", name: "Coaching individuel", price_label: "20 € la séance en visio, 35 € au cabinet ou chez vous",
    highlights: ["Une séance d'une heure avec Manon : échauffement, renforcement, cardio", "À la séance, sans engagement"] }]
};

await q("begin");
for (const [i, p] of PLANS.entries()) {
  await q(`insert into plans (code, name, price_cents, billing_unit, commitment_months, upfront_price_cents, upfront_months, public, sort_order, highlights)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
           on conflict (code) do update set name = excluded.name, billing_unit = excluded.billing_unit, public = excluded.public, sort_order = excluded.sort_order`,
    [p.code, p.name, p.price, p.unit, p.commit ?? null, p.upfront ?? null, p.upfrontMonths ?? null, p.public ?? true, p.sort ?? i, p.highlights]);
}
for (const [i, [key, label]] of FEATURES.entries()) {
  await q("insert into features (key, label, sort_order) values ($1,$2,$3) on conflict (key) do update set label = excluded.label, sort_order = excluded.sort_order", [key, label, i]);
}
// La matrice n'est écrite qu'à la première installation : ensuite, c'est Manon qui la règle (Paramètres).
for (const p of PLANS) for (const [key] of FEATURES) {
  await q("insert into plan_features (plan_code, feature_key, enabled) values ($1,$2,$3) on conflict do nothing", [p.code, key, ACCESS[key].includes(p.code)]);
}
for (const [k, v] of Object.entries(SETTINGS)) await q("insert into settings (key, value) values ($1,$2) on conflict do nothing", [k, JSON.stringify(v)]);
await q("commit");
console.log("formules, fonctionnalités, matrice et réglages : ok");

// ---------- Compte de Manon ----------
const sha256 = s => crypto.createHash("sha256").update(s).digest("hex");
const token = () => crypto.randomBytes(32).toString("base64url");
const appUrl = (process.env.APP_URL ?? "http://localhost:3100").replace(/\/$/, "");
const adminEmail = process.env.ADMIN_EMAIL ?? (DEMO ? "manon@exemple.fr" : null);
if (adminEmail) {
  const found = await q("select id, password_hash from profiles where lower(email) = lower($1)", [adminEmail]);
  if (!found.rows.length) {
    const { rows: [a] } = await q("insert into profiles (role, first_name, last_name, email) values ('admin','Manon','Garrione',$1) returning id", [adminEmail]);
    const t = token();
    await q("insert into auth_tokens (token_hash, user_id, kind, expires_at) values ($1,$2,'invitation', now() + interval '7 days')", [sha256(t), a.id]);
    // Le lien n'apparaît qu'ici, dans le terminal de la personne qui installe : à transmettre à Manon par un canal sûr.
    console.log(`compte de Manon créé ; lien d'activation (7 jours) :\n${appUrl}/invitation/${t}`);
  } else console.log("compte de Manon : déjà présent");
} else console.log("ADMIN_EMAIL absent : aucun compte administrateur créé");

// ---------- Contenu fictif (développement seulement) ----------
if (DEMO) {
  if (process.env.NODE_ENV === "production") throw new Error("--demo refusé en production.");
  const proto = fs.readFileSync(path.join(root, "..", "prototype", "index.html"), "utf8");
  // Reprend un tableau littéral du prototype (const NOM = [ … ];) sans l'exécuter dans la page.
  const take = name => {
    const start = proto.indexOf(`const ${name} = [`), from = proto.indexOf("[", start);
    let depth = 0, i = from, str = null;
    for (; i < proto.length; i++) {
      const c = proto[i];
      if (str) { if (c === "\\") i++; else if (c === str) str = null; continue; }
      if (c === '"' || c === "'" || c === "`") str = c;
      else if (c === "[") depth++;
      else if (c === "]" && --depth === 0) break;
    }
    return Function(`"use strict"; return (${proto.slice(from, i + 1)});`)();
  };
  const MEAL = { "Petit-déjeuner": "petit_dejeuner", "Déjeuner": "dejeuner", "Dîner": "diner", "Collation": "collation", "Dessert": "dessert" };
  const DIFF = { Facile: "facile", Moyen: "moyen", "Avancé": "avance" };
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

  for (const r of take("RECIPES")) {
    const { rows: [row] } = await q(`insert into recipes (slug, title, meal_type, prep_min, cook_min, difficulty, base_portions, kcal, protein_g, carbs_g, fat_g, fiber_g, themes, tip, status, publish_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) on conflict (slug) do nothing returning id`,
      [slug(r.title), r.title, MEAL[r.meal] ?? "dejeuner", r.prep ?? 0, r.cook ?? 0, DIFF[r.diff] ?? "facile", r.portions ?? 1,
       r.macro?.kcal ?? null, r.macro?.p ?? null, r.macro?.g ?? null, r.macro?.l ?? null, r.macro?.f ?? null,
       r.themes ?? [], r.tip ?? null, r.status === "brouillon" ? "draft" : "published", r.date ?? new Date().toISOString()]);
    if (!row) continue;
    for (const [i, [qty, unit, name]] of (r.ingr ?? []).entries()) await q("insert into recipe_ingredients values ($1,$2,$3,$4,$5)", [row.id, i, qty, unit ?? "", name]);
    for (const [i, s] of (r.steps ?? []).entries()) await q("insert into recipe_steps values ($1,$2,$3)", [row.id, i, s]);
  }
  for (const a of take("ARTICLES")) {
    await q(`insert into articles (slug, title, body, visibility, status, published_at) values ($1,$2,$3,$4,'published',$5) on conflict (slug) do nothing`,
      [slug(a.title), a.title, (a.body ?? []).join("\n\n"), a.vis === "public" ? "public" : "members", a.date]);
  }
  const { rows: [{ n }] } = await q("select count(*)::int n from documents");
  if (!n) for (const d of take("DOCUMENTS")) {
    const pdf = demoPdf(`${d.title} - fiche de demonstration`);
    await q("insert into documents (title, mime, size_bytes, data) values ($1,'application/pdf',$2,$3)", [d.title, pdf.length, pdf]);
  }
  // Patientes fictives, sans mot de passe : elles s'activent par le lien d'invitation (visible sur /dev/emails une fois renvoyé).
  const { rows: [admin] } = await q("select id from profiles where role = 'admin' order by created_at limit 1");
  for (const p of take("PATIENTS").slice(0, 6)) {
    const plan = PLANS.some(x => x.code === p.plan) ? p.plan : "f1";
    const ins = await q(`insert into profiles (role, first_name, last_name, email, phone, created_by) values ('patient',$1,$2,$3,$4,$5)
      on conflict ((lower(email))) do nothing returning id`, [p.first, p.last, p.email, p.phone ?? null, admin?.id ?? null]);
    if (!ins.rows.length) continue;
    await q("insert into subscriptions (patient_id, plan_code, start_date, end_date, created_by) values ($1,$2,$3,$4,$5)", [ins.rows[0].id, plan, p.start || new Date().toISOString().slice(0, 10), p.end || null, admin?.id ?? null]);
  }
  console.log("contenu fictif : ok (recettes, articles, fiches, patientes)");
}
await db.end();

/** PDF d'une page avec une ligne de texte (ASCII), pour les fiches fictives. */
function demoPdf(text) {
  const safe = text.normalize("NFD").replace(/[^\x20-\x7e]/g, "").replace(/[()\\]/g, "");
  const stream = `BT /F1 18 Tf 60 760 Td (${safe}) Tj ET`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  ];
  let out = "%PDF-1.4\n";
  const offsets = objs.map((o, i) => { const at = out.length; out += `${i + 1} 0 obj\n${o}\nendobj\n`; return at; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map(o => String(o).padStart(10, "0") + " 00000 n \n").join("")}`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, "latin1");
}
