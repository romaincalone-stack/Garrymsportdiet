// Parcours automatisé du prototype : erreurs JavaScript, formulaires des modales, débordement mobile.
// Usage : npm run check            (captures dans tools/shots/, ignoré par git)
//         npm run check:standalone (même parcours sur le fichier unique dist/garrym-prototype.html)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// CHECK_FILE=dist/garrym-prototype.html pour vérifier la version autonome (npm run check:standalone)
const url = pathToFileURL(join(root, process.env.CHECK_FILE || join("prototype", "index.html"))).href;
const out = join(root, "tools", "shots");
mkdirSync(out, { recursive: true });

const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
if (process.env.HTTPS_PROXY) launchOpts.proxy = { server: process.env.HTTPS_PROXY }; // le site public charge ses bibliothèques par CDN
launchOpts.args = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"];
const browser = await chromium.launch(launchOpts);
const errors = [];
const watch = (page, tag) => {
  page.on("pageerror", e => errors.push(`${tag} pageerror: ${e.message}`));
  page.on("console", m => { if (m.type() === "error" && !/fonts\.g/.test(m.text())) errors.push(`${tag} console: ${m.text()}`); });
};
const settle = p => p.waitForTimeout(500); // laisse finir les View Transitions (350 ms)

const pg = await browser.newPage({ viewport: { width: 1280, height: 900 } });
watch(pg, "desktop");
await pg.goto(url); await pg.waitForTimeout(1200);
const click = async s => { await pg.click(s); await settle(pg); };
// Vue « Site public » : site/index.html dans un cadre ; « Mon espace » ouvre la connexion, qui mène à l'espace patiente
const frame = pg.frameLocator("#siteframe");
await frame.locator("#loader").waitFor({ state: "hidden", timeout: 90000 });
await pg.waitForTimeout(800);
await pg.screenshot({ path: join(out, "1-site.png") });
await frame.locator("#espace").click(); await pg.waitForSelector("form[data-form=login]"); await pg.waitForTimeout(1500);
await pg.screenshot({ path: join(out, "1b-connexion.png") });
await click("form[data-form=login] .btn-olive");
if (!(await pg.$("[data-act=pt]"))) errors.push("connexion : l'espace patiente ne s'ouvre pas");
await click("[data-act=view][data-v=site]");
if (!(await pg.$("#siteframe"))) errors.push("retour au site : cadre absent");
await click("[data-act=view][data-v=patient]");
await pg.screenshot({ path: join(out, "2-patiente.png"), fullPage: true });
await click("[data-act=pt][data-p=recettes]");
await pg.fill("#rf-q", "avoine"); await settle(pg);
await click("[data-act=recipe][data-id=r1]");
await click('[data-act=portions][data-d="1"]');
await click("[data-act=addshop]");
await click("[data-act=close]");
await click("[data-act=shopping]"); await click("[data-act=close]");
await click("[data-act=pt][data-p=sport]");
await click("[data-act=done]");
await click("[data-act=sporttab][data-t=videos]");
await pg.selectOption("#vf-theme", "Cardio"); await settle(pg);
await click("[data-act=pt][data-p=seances]");
await click("[data-act=join][data-id=s1]");
await pg.selectOption("#pb-plan", "f1"); await settle(pg);
await click("[data-act=pt][data-p=recettes]");
await pg.screenshot({ path: join(out, "3-f1-recettes.png"), fullPage: true });

await click("[data-act=view][data-v=admin]");
await pg.screenshot({ path: join(out, "4-admin.png") });
await click("[data-act=ad][data-p=patientes]");
await click("[data-act=newpatient]");
await pg.fill("#np-first", "Test"); await pg.fill("#np-last", "Patiente"); await pg.fill("#np-mail", "test@exemple.fr");
await click("form[data-form=newpatient] .m-foot .btn-olive");
await click("[data-act=openpatient][data-id=p1]");
await pg.selectOption("#ep-plan", "f3");
await click("form[data-form=editpatient] .m-foot .btn-olive");
await click("[data-act=ad][data-p=recettes]");
await click("[data-act=newrecipe]");
await pg.fill("#nr-title", "Tartine test"); await pg.fill("#nr-ingr", "1 tranche pain complet\n0.5 avocat"); await pg.fill("#nr-steps", "Griller.");
await pg.check("#nr-th-0");
await click("form[data-form=recipe] .m-foot .btn-olive");
await click("[data-act=ad][data-p=programmes]");
await click("[data-act=edittmpl][data-id=energie]");
await click("form[data-form=tmpl] .m-foot .btn-olive");
await click("[data-act=ad][data-p=parametres]");
await pg.uncheck("#m-videos-f3"); await settle(pg);
await click("[data-act=ad][data-p=seances]");
await click("[data-act=newsession]");
await click("form[data-form=session] .m-foot .btn-olive");
await click("[data-act=ad][data-p=rdv]");

const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
watch(m, "mobile");
await m.goto(url); await m.waitForTimeout(1000);
await m.screenshot({ path: join(out, "5-mobile-site.png") });
await m.click("[data-act=view][data-v=patient]"); await m.waitForSelector("[data-act=pt]", { state: "attached" }); await m.waitForTimeout(1500);
await m.screenshot({ path: join(out, "6-mobile-patiente.png") });
const width = await m.evaluate(() => document.documentElement.scrollWidth);
console.log("mobile scrollWidth", width);
if (width > 390) errors.push(`mobile : débordement horizontal (${width}px)`);

console.log(errors.length ? errors.join("\n") : "NO ERRORS");
await browser.close();
process.exit(errors.length ? 1 : 0);
