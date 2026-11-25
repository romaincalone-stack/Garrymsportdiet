// Mesure la mémoire réellement utilisée par l'espace (application construite, mode production), au repos et sous charge,
// pour choisir la taille de l'ordinateur chez l'hébergeur (Clever Cloud : pico 256 Mo, nano 512 Mo, XS 1 Go).
// Prérequis : PostgreSQL local, espace/.env.local, `cd espace && npx next build`. La base de développement est remise à zéro.
// Usage : node tools/mesure-memoire.mjs [connexions simultanées=30] [durée en s=60] [limite de tas Node en Mo, facultatif]
import { spawn, execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "espace");
const pg = createRequire(path.join(app, "package.json"))("pg");
const [CONC = 30, SECONDS = 60, HEAP] = process.argv.slice(2).map(Number);
const env = { ...process.env, ...Object.fromEntries(fs.readFileSync(path.join(app, ".env.local"), "utf8").split("\n").filter(l => l.includes("=") && !l.startsWith("#")).map(l => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)])) };
const PORT = 3197, BASE = `http://localhost:${PORT}`;

// ---------- Base de démonstration et sessions de test (insérées directement, sans passer par la connexion) ----------
execFileSync(path.join(app, "scripts", "reset-dev.sh"), { env, cwd: app, stdio: "ignore" });
const db = new pg.Client({ connectionString: env.DATABASE_URL }); await db.connect();
const session = async (where, extra = "") => {
  const token = crypto.randomBytes(32).toString("base64url");
  const { rows: [u] } = await db.query(`select id from profiles where ${where} limit 1`);
  if (extra) await db.query(extra, [u.id]);
  await db.query("insert into sessions (token_hash, user_id, second_factor_ok, expires_at) values ($1, $2, true, now() + interval '1 day')", [crypto.createHash("sha256").update(token).digest("hex"), u.id]);
  return `gm_session=${token}`;
};
const patient = await session("role = 'patient' and exists (select 1 from subscriptions s where s.patient_id = profiles.id and s.plan_code = 'f2')");
const admin = await session("role = 'admin'", "update profiles set totp_enabled = true where id = $1");
const slugs = (await db.query("select slug from recipes where status = 'published' limit 8")).rows.map(r => r.slug);
const arts = (await db.query("select slug from articles where status = 'published' limit 4")).rows.map(r => r.slug);
await db.end();

// ---------- Serveur ----------
const nodeArgs = HEAP ? [`--max-old-space-size=${HEAP}`] : [];
const server = spawn(process.execPath, [...nodeArgs, path.join(app, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: app, env: { ...env, NODE_ENV: "production" }, stdio: ["ignore", "ignore", "pipe"] });
let stderr = ""; server.stderr.on("data", d => (stderr += d));
for (let i = 0; i < 80; i++) { try { if ((await fetch(BASE + "/connexion")).ok) break; } catch {} await new Promise(r => setTimeout(r, 250)); }

// Mémoire résidente (RSS) du serveur et de tous ses processus enfants, en Mo.
const tree = pid => { const kids = (() => { try { return fs.readFileSync(`/proc/${pid}/task/${pid}/children`, "utf8").trim().split(/\s+/).filter(Boolean).map(Number); } catch { return []; } })(); return [pid, ...kids.flatMap(tree)]; };
const rss = () => tree(server.pid).reduce((s, p) => { try { return s + Number(fs.readFileSync(`/proc/${p}/status`, "utf8").match(/VmRSS:\s+(\d+)/)[1]) / 1024; } catch { return s; } }, 0);
const fmt = n => `${Math.round(n)} Mo`;

await new Promise(r => setTimeout(r, 2000));
const idle = rss();
console.log(`au démarrage, au repos : ${fmt(idle)}`);

// ---------- Charge : chaque « utilisatrice » enchaîne des pages ----------
const pages = [
  ...["/espace", "/espace/recettes", "/espace/courses", "/espace/ressources", "/espace/offres", "/espace/profil"].map(p => [p, patient]),
  ...slugs.map(s => [`/espace/recettes/${s}?portions=3`, patient]), ...arts.map(s => [`/espace/ressources/${s}`, patient]),
  ...["/admin", "/admin/patientes", "/admin/recettes", "/admin/ressources", "/admin/parametres", "/admin/journal"].map(p => [p, admin]),
  ["/conditions", ""], ["/confidentialite", ""], ["/connexion", ""]
];
let done = 0, errors = 0, peak = idle, i = 0; const lat = [];
const sampler = setInterval(() => { peak = Math.max(peak, rss()); }, 200);
const until = Date.now() + SECONDS * 1000;
await Promise.all(Array.from({ length: CONC }, async () => {
  while (Date.now() < until) {
    const [p, cookie] = pages[i++ % pages.length], t = Date.now();
    try {
      const res = await fetch(BASE + p, { headers: cookie ? { cookie } : {}, redirect: "manual" });
      await res.arrayBuffer();
      if (res.status !== 200) errors++;
    } catch { errors++; }
    lat.push(Date.now() - t); done++;
  }
}));
clearInterval(sampler);
await new Promise(r => setTimeout(r, 3000));
const after = rss();
lat.sort((a, b) => a - b);
console.log(`charge : ${CONC} connexions simultanées pendant ${SECONDS} s, ${done} pages (${(done / SECONDS).toFixed(0)} par seconde), ${errors} erreur(s)`);
console.log(`temps de réponse : médiane ${lat[lat.length >> 1]} ms, 95 % sous ${lat[Math.floor(lat.length * 0.95)]} ms`);
console.log(`mémoire : pic ${fmt(peak)}, 3 s après la charge ${fmt(after)}${HEAP ? ` (tas limité à ${HEAP} Mo)` : ""}`);
server.kill();
if (/out of memory|heap limit/i.test(stderr)) console.log("MANQUE DE MÉMOIRE :", stderr.split("\n").find(l => /memory|heap/i.test(l)));
process.exit(0);
