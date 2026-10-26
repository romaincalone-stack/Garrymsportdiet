// Génère le brief fonctionnel en PDF depuis references/brief-fonctionnalites.html (polices Google Fonts : connexion requise).
// Usage : node tools/build-brief-pdf.mjs  →  dist/Brief-fonctionnel-Garrym.pdf (ignoré par git)
import { chromium } from "playwright";
import path from "node:path";
import { mkdirSync } from "node:fs";
mkdirSync("dist", { recursive: true });
const out = "dist/Brief-fonctionnel-Garrym.pdf";
const browser = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
const page = await browser.newPage();
await page.goto("file://" + path.resolve("references/brief-fonctionnalites.html"), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: out, format: "A4", printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: '<div style="width:100%;padding:0 16mm;font-family:monospace;font-size:7px;letter-spacing:1.4px;color:#5C6B63;display:flex;justify-content:space-between"><span>GM SPORT ET NUTRITION · BRIEF FONCTIONNEL</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
});
await browser.close();
console.log(out);
