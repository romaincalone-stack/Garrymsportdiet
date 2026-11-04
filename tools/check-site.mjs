// Vérifie le site public v4 (site/index.html) : erreurs JS, WebGL, débordement mobile, captures.
// Usage : node tools/check-site.mjs   (captures dans tools/shots/site-*.png)
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
const url = "file://" + path.resolve("site/index.html");
const out = "tools/shots"; fs.mkdirSync(out, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ proxy, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const errors = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
async function run(name, viewport, mobile) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: mobile ? 2 : 1, isMobile: !!mobile, hasTouch: !!mobile });
  page.on("pageerror", e => errors.push(`${name} pageerror: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`${name} console: ${m.text()}`); });
  page.on("requestfailed", r => errors.push(`${name} requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  await page.goto(url, { waitUntil: "load", timeout: 90000 });
  await page.waitForFunction(() => document.body.classList.contains("ready"), null, { timeout: 60000 });
  await wait(2600);
  const gl = await page.evaluate(() => !document.getElementById("gl").hidden);
  console.log(`${name} webgl ${gl}`);
  await page.screenshot({ path: `${out}/site-${name}-01-hero.png` });
  const ids = ["manifeste", "univers", "programmes", "bilan", "formules", "cabinets", "journal", "contact"];
  let n = 2;
  for (const id of ids) {
    await page.evaluate(id => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + (id === "manifeste" ? el.offsetHeight * .45 : id === "programmes" ? innerHeight * 0.9 : 0)); }, id);
    await wait(1600);
    await page.screenshot({ path: `${out}/site-${name}-${String(n++).padStart(2, "0")}-${id}.png` });
  }
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`${name} scrollWidth ${sw}`);
  if (mobile && sw > viewport.width) errors.push(`${name} débordement horizontal ${sw}px`);
  // Test « Tester mon alimentation » : 10 questions (Q4 à choix multiples), résultat et bouton de fin selon Q10
  await page.evaluate(() => document.querySelector("[data-quiz]").click()); await wait(400);
  const answers = [0, 1, 1, [0, 1], 2, 1, 1, 3, 2, 1];
  for (const a of answers) {
    if (Array.isArray(a)) { for (const k of a) { await page.click(`#qbody .qo[data-k="${k}"]`); await wait(150); } await page.click("#qbody .qnext"); }
    else await page.click(`#qbody .qo[data-k="${a}"]`);
    await wait(250);
  }
  const res = await page.evaluate(() => ({ h: document.querySelector("#qbody h3")?.textContent, tips: document.querySelectorAll("#qbody .qtips li").length, first: document.querySelector("#qbody .qend .btn")?.textContent.trim() }));
  if (res.h !== "Votre équilibre hormonal" || res.tips !== 4 || !/appel découverte/i.test(res.first || "")) errors.push(`${name} test : résultat inattendu ${JSON.stringify(res)}`);
  await page.screenshot({ path: `${out}/site-${name}-quiz-result.png` });
  await page.close();
}
await run("desktop", { width: 1440, height: 900 });
await run("mobile", { width: 390, height: 844 }, true);
await browser.close();
if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log("NO ERRORS");
