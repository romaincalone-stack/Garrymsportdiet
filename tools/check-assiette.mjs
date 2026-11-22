// Vérifie « Mon assiette » (site/assiette.html) : photo (mode démonstration), correction des grammes, recherche Ciqual,
// code-barres (Open Food Facts simulé), modification, suppression, calories masquables, 390 px, erreurs JS.
// Usage : node tools/check-assiette.mjs   (captures dans tools/shots/assiette-*.png ; attendu « NO ERRORS »)
import { chromium } from "playwright";
import { launchOptions } from "./browser.mjs";
import path from "node:path";
import fs from "node:fs";
const url = "file://" + path.resolve("site/assiette.html");
const out = "tools/shots"; fs.mkdirSync(out, { recursive: true });
const errors = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch(launchOptions());
const OFF = { status: 1, product: { product_name: "Pâte à tartiner", brands: "Exemple", serving_quantity: 15, nutriments: { "energy-kcal_100g": 539, proteins_100g: 6.3, carbohydrates_100g: 57.5, fat_100g: 30.9, sugars_100g: 56.3, fiber_100g: 0, salt_100g: 0.1 } } };

async function run(name, viewport, mobile) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: mobile ? 2 : 1, isMobile: !!mobile, hasTouch: !!mobile });
  page.on("pageerror", e => errors.push(`${name} pageerror: ${e.message}`));
  page.on("console", m => { if (m.type() === "error" && !/fonts\.g/.test(m.text())) errors.push(`${name} console: ${m.text()}`); });
  await page.route("https://world.openfoodfacts.org/**", r => r.fulfill({ contentType: "application/json", body: JSON.stringify(OFF) }));
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window.CIQUAL && window.CIQUAL.aliments.length > 3000);
  const total = () => page.evaluate(() => document.querySelector("#sum .kc b").textContent);

  // 1. Photo : analyse (démonstration en file://), aliments retrouvés dans la table Ciqual
  await page.click(".bar [data-add]"); await wait(300);
  await page.click("[data-go=photo]").catch(() => {});
  await page.setInputFiles("#photo", "site/img/assiette.jpg"); await wait(800);
  await page.click("[data-analyse]"); await page.waitForSelector(".res li"); await wait(300);
  const found = await page.$$eval(".res li .rt b", b => b.map(x => x.textContent));
  const tags = await page.$$eval(".res li .tag:first-child", b => b.map(x => x.textContent));
  if (found.length !== 4) errors.push(`${name} : 4 aliments attendus, ${found.length}`);
  if (tags.filter(t => t === "Table Anses").length < 4) errors.push(`${name} : aliments non retrouvés dans la table : ${found.join(" / ")}`);
  await page.screenshot({ path: `${out}/assiette-${name}-1-photo.png`, fullPage: !mobile });
  // Correction : le riz passe à 200 g
  const rice = page.locator(".res li", { hasText: "Riz" }).first();
  await rice.locator("input[data-g]").fill("200"); await rice.locator("input[data-g]").press("Tab"); await wait(200);
  await page.click("[data-save]"); await wait(400);
  const t1 = await total();
  if (!/\d/.test(t1)) errors.push(`${name} : total du jour vide`);

  // 2. Recherche Ciqual : yaourt nature, 125 g
  await page.click("[data-add=collation]"); await wait(200);
  await page.click("[data-go=search]"); await page.fill("#q", "yaourt nature"); await wait(300);
  const hit = await page.$eval("#hits button", b => b.textContent);
  if (!/yaourt/i.test(hit)) errors.push(`${name} : recherche « yaourt nature » : ${hit}`);
  await page.click("#hits button"); await page.fill("#qg", "125"); await page.click("#qok"); await wait(300);

  // 3. Code-barres saisi à la main (réponse Open Food Facts simulée), 1 portion de 15 g
  await page.click("[data-add=petit]"); await page.click("[data-go=scan]");
  await page.fill("#ean", "3017620422003"); await page.click("#eanGo"); await page.waitForSelector("#qg");
  if ((await page.inputValue("#qg")) !== "15") errors.push(`${name} : portion du produit scanné`);
  await page.click("#qok"); await wait(300);

  // 4. Modifier puis supprimer
  const n0 = await page.$$eval(".items li", l => l.length);
  await page.click(".items [data-edit]"); await page.fill("#qg", "50"); await page.click("#qok"); await wait(300);
  if ((await page.$$eval(".items li", l => l.length)) !== n0) errors.push(`${name} : la modification a dupliqué l'aliment`);
  await page.click(".items [data-del]"); await wait(200);
  if ((await page.$$eval(".items li", l => l.length)) !== n0 - 1) errors.push(`${name} : suppression`);
  await page.screenshot({ path: `${out}/assiette-${name}-2-journal.png`, fullPage: true });

  // 5. Le journal survit au rechargement ; calories masquables
  await page.reload({ waitUntil: "domcontentloaded" }); await wait(400);
  if ((await page.$$eval(".items li", l => l.length)) !== n0 - 1) errors.push(`${name} : journal perdu au rechargement`);
  await page.click("#showKcal", { force: true }); await wait(200);
  if (await page.$(".items .kv")) errors.push(`${name} : calories encore visibles une fois masquées`);
  await page.click("#showKcal", { force: true });

  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`${name} scrollWidth ${sw} · aliments photo : ${found.join(" / ")}`);
  if (mobile && sw > viewport.width) errors.push(`${name} débordement horizontal ${sw}px`);
  await page.close();
}
await run("desktop", { width: 1280, height: 900 });
await run("mobile", { width: 390, height: 844 }, true);
await browser.close();
if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log("NO ERRORS");
