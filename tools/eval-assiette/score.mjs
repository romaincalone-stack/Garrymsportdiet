// Note chaque estimation : calories calculées comme sur le site (search() de assiette.html, table Ciqual), comparées à Nutrition5k.
// Usage (depuis la racine du dépôt) : node tools/eval-assiette/score.mjs <dossier de travail> pred-qwen.json pred-claude.json …
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { launchOptions } from "../browser.mjs";
const [base, ...files] = process.argv.slice(2);
const ids = fs.readFileSync(`${base}/selection.txt`, "utf8").split("\n").filter(Boolean);
const testIds = new Set(fs.readFileSync(`${base}/rgb_test_ids.txt`, "utf8").split("\n").filter(Boolean));
const truth = {}, allTest = [];
for (const line of fs.readFileSync(`${base}/dish_metadata_cafe1.csv`, "utf8").split("\n")) {
  const c = line.split(","); if (!c[0]) continue;
  const ingr = []; for (let i = 6; i + 6 < c.length; i += 7) ingr.push([c[i + 1], +c[i + 2], +c[i + 3]]);
  truth[c[0]] = { kcal: +c[1], g: +c[2], ingr };
  if (testIds.has(c[0])) allTest.push(+c[1]);
}
const meanTest = allTest.reduce((a, b) => a + b, 0) / allTest.length;
const b = await chromium.launch(launchOptions());
const p = await b.newPage();
await p.goto("file://" + path.resolve("site/assiette.html")); await p.waitForFunction(() => window.CIQUAL);
const stats = (errs) => { const a = errs.map(Math.abs).sort((x, y) => x - y); return { moy: a.reduce((s, x) => s + x, 0) / a.length, med: a[Math.floor(a.length / 2)] }; };
const report = { moyenne_test: Math.round(meanTest), modeles: {} };
const rows = [];
for (const f of files) {
  const pred = JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
  const eK = [], eG = [], pct = []; let lus = 0;
  for (const d of ids) {
    const t = truth[d], items = pred.plats[d];
    if (!items) { rows.push([pred.modele, d, t.kcal, null, t.g, null, "illisible"]); continue; }
    lus++;
    let kcal = 0, g = 0; const det = [];
    for (const [nom, rech, gr] of items) {
      const m = await p.evaluate(([r, n]) => (search(r, 1)[0] || search(n, 1)[0] || null), [rech, nom]);
      if (m) kcal += m[3] * gr / 100; g += gr; det.push(`${nom} ${Math.round(gr)} g → ${m ? m[1] : "introuvable"}`);
    }
    eK.push(kcal - t.kcal); eG.push(g - t.g); pct.push((kcal - t.kcal) / t.kcal * 100);
    rows.push([pred.modele, d, t.kcal, Math.round(kcal), t.g, Math.round(g), det.join(" ; ")]);
  }
  const k = stats(eK), gm = stats(eG), pc = stats(pct);
  report.modeles[pred.modele] = { photos_lues: `${lus}/${ids.length}`, kcal_ecart_moyen: Math.round(k.moy), kcal_ecart_median: Math.round(k.med), kcal_ecart_pct_median: Math.round(pc.med), grammes_ecart_moyen: Math.round(gm.moy), dans_20pct: pct.filter(x => Math.abs(x) <= 20).length + "/" + pct.length };
}
// Référence sans IA : répondre toujours la moyenne des plats du jeu de test
const eB = ids.map(d => meanTest - truth[d].kcal), pB = ids.map(d => (meanTest - truth[d].kcal) / truth[d].kcal * 100);
report.modeles["Sans IA (moyenne des plats)"] = { kcal_ecart_moyen: Math.round(stats(eB).moy), kcal_ecart_median: Math.round(stats(eB).med), kcal_ecart_pct_median: Math.round(stats(pB).med), dans_20pct: pB.filter(x => Math.abs(x) <= 20).length + "/" + pB.length };
await b.close();
fs.writeFileSync(`${base}/resultats.json`, JSON.stringify({ report, rows, verite: Object.fromEntries(ids.map(d => [d, truth[d]])) }, null, 1));
console.log(JSON.stringify(report, null, 1));
