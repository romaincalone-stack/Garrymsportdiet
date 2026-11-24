// Parcours complet de l'espace (étape 1) sur l'application construite, avec une base de développement remise à zéro.
// Prérequis : PostgreSQL local et espace/.env.local (DATABASE_URL, APP_SECRET), puis `cd espace && npx next build`.
// Usage : npm run check:espace   → attendu « NO ERRORS »
import { spawn, execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { launchOptions } from "./browser.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "espace"), shots = path.join(root, "tools", "shots");
fs.mkdirSync(shots, { recursive: true });
const env = { ...process.env, ...Object.fromEntries(fs.readFileSync(path.join(app, ".env.local"), "utf8").split("\n").filter(l => l.includes("=") && !l.startsWith("#")).map(l => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)])) };
const PORT = 3199, BASE = `http://localhost:${PORT}`;
const errors = [], log = (...a) => console.log(...a);
const fail = m => { errors.push(m); console.log("ERREUR :", m); };
const check = (cond, m) => { if (!cond) fail(m); else log("ok :", m); };

// ---------- Base remise à zéro, lien d'activation de Manon ----------
const seedOut = execFileSync(path.join(app, "scripts", "reset-dev.sh"), { env: { ...env, APP_URL: BASE }, cwd: app, stdio: ["ignore", "pipe", "ignore"] }).toString();
const adminLink = seedOut.match(/http\S+\/invitation\/\S+/)?.[0];
if (!adminLink) throw new Error("lien d'activation de Manon introuvable dans la sortie du seed");

// ---------- Serveur ----------
const server = spawn(path.join(app, "node_modules", ".bin", "next"), ["start", "-p", String(PORT)], { cwd: app, env: { ...env, APP_URL: BASE, EMAIL_DRIVER: "outbox", ALLOW_DEV_OUTBOX: "1" }, stdio: ["ignore", "pipe", "pipe"] });
let serverLog = "";
server.stdout.on("data", d => (serverLog += d)); server.stderr.on("data", d => (serverLog += d));
for (let i = 0; i < 60; i++) { try { if ((await fetch(BASE + "/connexion")).ok) break; } catch {} await new Promise(r => setTimeout(r, 500)); }

// TOTP (RFC 6238), comme dans espace/lib/crypto.ts
const b32 = s => { const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; let bits = 0, v = 0; const out = []; for (const c of s.replace(/=+$/, "")) { v = (v << 5) | A.indexOf(c); bits += 5; if (bits >= 8) { out.push((v >>> (bits - 8)) & 255); bits -= 8; } } return Buffer.from(out); };
const totp = (secret, t = Date.now() / 1000) => { const c = Buffer.alloc(8); c.writeBigUInt64BE(BigInt(Math.floor(t / 30))); const h = crypto.createHmac("sha1", b32(secret)).update(c).digest(); const o = h[19] & 15; return String((((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]) % 1e6).padStart(6, "0"); };

const browser = await chromium.launch(launchOptions());
const watch = (page, who) => {
  page.on("pageerror", e => fail(`${who} : erreur JS ${e.message}`));
  page.on("console", m => { if (m.type() === "error") fail(`${who} : console ${m.text()}`); });
};
const PASS = "Une phrase facile 2026";
try {
  // ---------- Manon : activation, double authentification obligatoire ----------
  const admin = await (await browser.newContext({ viewport: { width: 1280, height: 860 } })).newPage(); watch(admin, "admin");
  await admin.goto(BASE + "/admin");
  check(admin.url().endsWith("/connexion"), "back-office protégé sans session");
  await admin.goto(adminLink);
  await admin.fill("#password", PASS); await admin.fill("#confirm", PASS); await admin.check("#consent");
  await admin.click("button[type=submit]");
  await admin.waitForURL("**/admin/securite");
  await admin.goto(BASE + "/admin/patientes");
  check(admin.url().endsWith("/admin/securite"), "sans double authentification, seul « Sécurité » est accessible");
  await admin.click("text=Afficher le QR code");
  const secret = (await admin.locator("[data-testid=totp-secret]").textContent()).trim();
  check(/^[A-Z2-7]{32}$/.test(secret) && await admin.locator(".qr svg").count() === 1, "QR code et clé affichés");
  const activationStep = Math.floor(Date.now() / 30000);
  await admin.fill("#code", totp(secret)); await admin.click("text=Activer");
  await admin.waitForURL(BASE + "/admin");
  check(await admin.locator("h1").textContent() === "Bonjour Manon", "back-office ouvert après activation");

  // ---------- Création d'une patiente (consultation à l'unité : pas de recettes) ----------
  await admin.goto(BASE + "/admin/patientes/nouvelle");
  await admin.fill("#first_name", "Claire"); await admin.fill("#last_name", "Test"); await admin.fill("#email", "claire.test@exemple.fr");
  await admin.selectOption("#plan", "suivi");
  await admin.click("text=Créer le compte");
  await admin.waitForURL(/\/admin\/patientes\/[0-9a-f-]{36}/);
  const patientUrl = admin.url().split("?")[0];
  await admin.screenshot({ path: path.join(shots, "espace-admin-patiente.png"), fullPage: true });
  await admin.goto(BASE + "/dev/emails");
  const inviteText = await admin.locator("[data-testid=email]").first().textContent();
  const inviteLink = inviteText.match(/http\S+\/invitation\/[A-Za-z0-9_-]+/)?.[0];
  check(!!inviteLink && inviteText.includes("claire.test@exemple.fr"), "email d'invitation envoyé à la patiente");
  check(!/motif|pathologie|poids/i.test(inviteText), "aucune donnée de santé dans l'email");

  // ---------- Patiente, sur téléphone (390 px) ----------
  const pctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const pt = await pctx.newPage(); watch(pt, "patiente");
  await pt.goto(inviteLink);
  await pt.fill("#password", "court"); await pt.fill("#confirm", "court"); await pt.check("#consent"); await pt.click("button[type=submit]");
  check(pt.url() === inviteLink && !(await pt.$eval("#password", e => e.validity.valid)), "mot de passe trop court refusé");
  await pt.fill("#password", PASS); await pt.fill("#confirm", PASS); await pt.click("button[type=submit]");
  await pt.waitForURL(BASE + "/espace");
  check((await pt.locator("h1").textContent()) === "Bonjour Claire", "espace patiente ouvert après activation");
  check(await pt.locator("a[href*='doctolib.fr']").count() === 1, "bouton Doctolib présent");
  check(await pt.locator("text=WhatsApp").count() === 0, "pas de contact WhatsApp avec la consultation à l'unité");
  check(await pt.locator(".legal").textContent().then(t => t.includes("Diététicienne-nutritionniste")), "titre professionnel affiché");
  const widths = {};
  for (const p of ["/espace", "/espace/recettes", "/espace/courses", "/espace/ressources", "/espace/offres", "/espace/profil"]) {
    await pt.goto(BASE + p); widths[p] = await pt.evaluate(() => document.documentElement.scrollWidth);
    await pt.screenshot({ path: path.join(shots, `espace-patiente${p.replace(/\//g, "-")}.png`), fullPage: true });
  }
  check(Object.values(widths).every(w => w <= 390), `largeur mobile ${JSON.stringify(widths)}`);
  for (const p of ["/conditions", "/mentions-legales", "/confidentialite"]) {
    await pt.goto(BASE + p);
    const w = await pt.evaluate(() => document.documentElement.scrollWidth), h = await pt.locator("h1").textContent();
    check(w <= 390 && (await pt.locator(".legaltext h3, .legaltext h4").count()) > 2, `page juridique ${p} (« ${h} », ${w} px)`);
  }
  check(await pt.locator("text=Partie 2").count() === 0, "partie « étape 2 » de la confidentialité non publiée");

  await pt.goto(BASE + "/espace/recettes");
  const previews = await pt.locator("a.rcard").count();
  check(previews === 3 && await pt.locator(".locked").count() === 1, "3 recettes en aperçu, le reste verrouillé avec l'offre qui le débloque");
  check(await pt.locator(".locked").textContent().then(t => t.includes("Mois offert") === false && /Recettes \+ sport|Nutrition/.test(t)), "offre proposée : la moins chère, payante");
  await pt.locator("a.rcard").first().click();
  await pt.waitForURL(/\/espace\/recettes\/[a-z0-9-]+$/);
  const q1 = await pt.locator(".ingr li b").first().textContent();
  await pt.click("a[aria-label='Une portion de plus']"); await pt.waitForURL(/portions=/);
  const q2 = await pt.locator(".ingr li b").first().textContent();
  check(q1 !== q2, `portions recalculées (${q1.trim()} → ${q2.trim()})`);
  await pt.click("text=Ajouter à la liste de courses");
  await pt.locator("text=Dans la liste de courses").waitFor();
  await pt.click("button[aria-label='Ajouter aux favoris']");
  await pt.locator("button[aria-label='Retirer des favoris']").waitFor();
  await pt.screenshot({ path: path.join(shots, "espace-patiente-recette.png"), fullPage: true });
  await pt.goto(BASE + "/espace/courses");
  check(await pt.locator("#items-t ~ ul li").count() > 0, "liste de courses remplie");
  // Fiche conseil
  await pt.goto(BASE + "/espace/ressources");
  const ficheHref = await pt.locator("a[href^='/espace/fiches/']").first().getAttribute("href");
  const dl = await pt.request.get(BASE + ficheHref);
  check(dl.status() === 200 && (await dl.body()).subarray(0, 5).toString() === "%PDF-", "fiche conseil téléchargeable");
  const anon = await fetch(BASE + ficheHref);
  check(anon.status === 401, "fiche refusée sans session");
  // Demande d'offre
  await pt.goto(BASE + "/espace/offres");
  await pt.locator("article").filter({ has: pt.locator("h2", { hasText: /^Offre Nutrition$/ }) }).locator("button").click();
  await pt.locator("text=Demande envoyée").waitFor();
  check(true, "demande d'offre envoyée");
  await pt.goto(BASE + "/admin");
  check(pt.url().endsWith("/espace"), "une patiente ne peut pas ouvrir le back-office");

  // ---------- Manon traite la demande et change l'offre ----------
  await admin.goto(BASE + "/admin");
  check(await admin.locator("text=est intéressée par").count() === 1, "demande visible dans « À traiter »");
  await admin.screenshot({ path: path.join(shots, "espace-admin-accueil.png"), fullPage: true });
  await admin.goto(patientUrl);
  await admin.selectOption("#plan", "f1"); await admin.click("text=Enregistrer l'offre");
  await admin.locator("text=Offre enregistrée").waitFor();
  await admin.fill("#date", "2030-03-12"); await admin.fill("#time", "18:30"); await admin.selectOption("#location", "visio");
  await admin.locator("section", { hasText: "Prochain rendez-vous" }).locator("button[type=submit]").first().click();
  await admin.locator("text=Rendez-vous enregistré").waitFor();
  await pt.goto(BASE + "/espace/recettes");
  check(await pt.locator(".locked").count() === 0 && await pt.locator("a.rcard").count() > 3, "offre Nutrition : toutes les recettes débloquées");
  await pt.goto(BASE + "/espace");
  check(await pt.locator("text=18:30").count() === 1 && await pt.locator("text=Visio").count() === 1, "rendez-vous affiché à l'heure de Paris");
  check(await pt.locator("text=WhatsApp").count() > 0, "contact WhatsApp affiché avec l'offre Nutrition");
  await pt.screenshot({ path: path.join(shots, "espace-patiente-accueil-nutrition.png"), fullPage: true });

  // ---------- Contenu publié par Manon ----------
  await admin.goto(BASE + "/admin/recettes/nouvelle");
  await admin.fill("#title", "Salade test de lentilles");
  await admin.fill("#ingredients", "200 ; g ; lentilles vertes\n1 ; ; oignon rouge\npersil");
  await admin.fill("#steps", "Cuire les lentilles.\nMélanger.");
  await admin.check("#published"); await admin.click("text=Enregistrer");
  await admin.waitForURL(/\/admin\/recettes\/[0-9a-f-]{36}/);
  await pt.goto(BASE + "/espace/recettes");
  check(await pt.locator("text=Salade test de lentilles").count() === 1, "recette publiée visible côté patiente");

  // ---------- Suspension : déconnexion immédiate ----------
  await admin.goto(patientUrl);
  await admin.click("text=Suspendre l'accès");
  await admin.locator("text=Réactiver").waitFor();
  await pt.goto(BASE + "/espace");
  check(pt.url().endsWith("/connexion"), "patiente suspendue déconnectée");

  // ---------- Reconnexion de Manon : code exigé, un même code refusé deux fois ----------
  await admin.click("text=Déconnexion"); await admin.waitForURL("**/connexion");
  await admin.fill("#email", "manon@exemple.fr"); await admin.fill("#password", "mauvais mot de passe"); await admin.click("button[type=submit]");
  check(await admin.locator(".error").textContent().then(t => t.includes("incorrect")), "mauvais mot de passe refusé");
  // Au moins 12 s avant la fin de la période en cours, pour que l'enchaînement reste dans la même période.
  const left = () => 30 - (Math.floor(Date.now() / 1000) % 30);
  if (left() < 12) await new Promise(r => setTimeout(r, (left() + 1) * 1000));
  const relogin = async () => {
    await admin.fill("#email", "manon@exemple.fr"); await admin.fill("#password", PASS); await admin.click("button[type=submit]");
    await admin.waitForURL("**/connexion/verification");
  };
  await admin.fill("#password", PASS); await admin.click("button[type=submit]");
  await admin.waitForURL("**/connexion/verification");
  await admin.goto(BASE + "/admin/patientes");
  check(admin.url().endsWith("/connexion/verification"), "back-office fermé tant que le code n'est pas saisi");
  if (Math.floor(Date.now() / 30000) !== activationStep) {
    // Code de cette période encore jamais utilisé : il passe, puis on se reconnecte pour tenter de le réutiliser.
    await admin.fill("#code", totp(secret)); await admin.click("button[type=submit]");
    await admin.waitForURL(BASE + "/admin");
    await admin.click("text=Déconnexion"); await admin.waitForURL("**/connexion");
    await relogin();
  }
  await admin.fill("#code", totp(secret)); await admin.click("button[type=submit]");
  await admin.locator(".error").waitFor();
  check(true, "code déjà utilisé refusé");
  const wait = left() + 1;
  log(`attente du code suivant (${wait} s)`);
  await new Promise(r => setTimeout(r, wait * 1000));
  await admin.fill("#code", totp(secret)); await admin.click("button[type=submit]");
  await admin.waitForURL(BASE + "/admin");
  check(true, "code suivant accepté");

  // ---------- Back-office sur téléphone ----------
  const actx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, storageState: await admin.context().storageState() });
  const am = await actx.newPage(); watch(am, "admin mobile");
  const aw = {};
  for (const p of ["/admin", "/admin/patientes", "/admin/recettes", "/admin/ressources", "/admin/parametres", "/admin/journal"]) {
    await am.goto(BASE + p); aw[p] = await am.evaluate(() => document.documentElement.scrollWidth);
    await am.screenshot({ path: path.join(shots, `espace-admin-mobile${p.replace(/\//g, "-")}.png`), fullPage: true });
  }
  // La matrice des offres défile dans son cadre : seule la page doit tenir en 390 px.
  check(Object.values(aw).every(w => w <= 390), `back-office largeur mobile ${JSON.stringify(aw)}`);
  check(await am.locator("text=activation 2fa").count() > 0, "journal des actions alimenté");
} catch (e) {
  fail(e.stack || String(e));
} finally {
  await browser.close();
  server.kill();
}
if (/Error|ERR_/.test(serverLog)) fail("journal serveur :\n" + serverLog.split("\n").filter(l => /Error|ERR_/.test(l)).slice(0, 10).join("\n"));
console.log(errors.length ? `${errors.length} ERREUR(S)` : "NO ERRORS");
process.exit(errors.length ? 1 : 0);
