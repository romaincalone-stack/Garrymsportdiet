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
await frame.locator("body.ready").waitFor({ state: "attached", timeout: 90000 });
await pg.waitForTimeout(800);
await pg.screenshot({ path: join(out, "1-site.png") });
await frame.locator("#espace").click(); await pg.waitForSelector("form[data-form=login]"); await pg.waitForTimeout(1500);
await pg.screenshot({ path: join(out, "1b-connexion.png") });
await click("form[data-form=login] .btn-olive");
if (!(await pg.$("[data-act=mtab]"))) errors.push("connexion : l'espace patiente ne s'ouvre pas");
await click("[data-act=view][data-v=site]");
if (!(await pg.$("#siteframe"))) errors.push("retour au site : cadre absent");
await click("[data-act=view][data-v=patient]");
await pg.waitForTimeout(900);
await pg.screenshot({ path: join(out, "2-patiente.png"), fullPage: true });
// Nutrition : recettes, portions, liste de courses
await click("[data-act=mtab][data-p=nutrition]");
await click("[data-act=msub][data-s=recettes]");
await pg.fill("#m-rq", "avoine"); await settle(pg);
await click("[data-act=recipe][data-id=r1]");
await click('[data-act=portions][data-d="1"]');
await click("[data-act=addshop]");
await click("[data-act=close]");
await click("[data-act=shopping]"); await click("[data-act=close]");
// Semainier partagé : noter un repas, proposer sa semaine
await click("[data-act=mtab][data-p=nutrition]");
await click("[data-act=meal][data-d='3'][data-s='1']");
await pg.check("input[name=status][value=autre]");
await pg.fill("#meal-text", "Salade de lentilles et une pomme");
await click("form[data-form=meal] .m-foot .btn-olive");
if (!(await pg.$("text=Salade de lentilles et une pomme"))) errors.push("semainier : le repas noté n'apparaît pas");
await click("[data-act=msub][data-s=semainier]");
await pg.screenshot({ path: join(out, "2b-semainier.png"), fullPage: true });
await click("[data-act=mback]");
await click("[data-act=msub][data-s=proposer]");
await pg.fill("#prop-1-0", "Tartines de pain complet et fromage blanc");
await click("form[data-form=proposal] button[value=send]");
if (!(await pg.$("text=En attente de Manon"))) errors.push("proposition : statut « En attente de Manon » absent");
// Training : durée, vidéo faite, séance collective
await click("[data-act=mtab][data-p=training]");
await pg.screenshot({ path: join(out, "2c-training.png"), fullPage: true });
await click("[data-act=vpick][data-k=max][data-v='20']");
await click("#v-results [data-act=video]");
await click(".m-foot [data-act=vdone]");
await click("[data-act=close]");
await click("[data-act=mtab][data-p=training]");
await click("[data-act=join][data-id=s1]");
// Évolution : nouvelle mesure
await click("[data-act=mtab][data-p=evolution]");
await click("[data-act=progress]");
await pg.fill("#pg-poids", "69.8");
await click("form[data-form=progress] .m-foot .btn-olive");
await click("[data-act=metric][data-k=energie]");
await pg.screenshot({ path: join(out, "2d-evolution.png"), fullPage: true });
// Formule F1 : vidéos verrouillées
await pg.selectOption("#pb-plan", "f1"); await settle(pg);
await click("[data-act=mtab][data-p=training]");
if (!(await pg.$(".mlocked"))) errors.push("F1 : la rubrique Training devrait être verrouillée");
await click("[data-act=mtab][data-p=nutrition]");
await pg.screenshot({ path: join(out, "3-f1-nutrition.png"), fullPage: true });

await click("[data-act=view][data-v=admin]");
await pg.screenshot({ path: join(out, "4-admin.png") });
await click("[data-act=ad][data-p=suivi]");
await click("[data-act=suivi][data-id=p1]");
await click(".scell.sc-note");
await pg.fill("#rv-text", "Bonne idée, pensez aux légumes au dîner.");
await click("form[data-form=review] .m-foot .btn-olive");
await click("[data-act=close]");
await click("[data-act=suivi][data-id=p3]");
await click("[data-act=suivitab][data-t=propose]");
await pg.fill("#pr-2-3", "Plutôt une pizza maison avec des légumes");
await click("form[data-form=propreview] .btn-olive");
await click("[data-act=suivitab][data-t=evolution]"); await pg.waitForTimeout(900);
await pg.screenshot({ path: join(out, "4b-suivi.png") });
await click("[data-act=close]");
await click("[data-act=ad][data-p=patientes]");
await click("[data-act=newpatient]");
await pg.fill("#np-first", "Test"); await pg.fill("#np-last", "Patiente"); await pg.fill("#np-mail", "test@exemple.fr");
await click("form[data-form=newpatient] .m-foot .btn-olive");
await click("[data-act=openpatient][data-id=p1]");
await pg.selectOption("#ep-plan", "f2");
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
await pg.uncheck("#m-videos-f2"); await settle(pg);
await click("[data-act=ad][data-p=seances]");
await click("[data-act=newsession]");
await click("form[data-form=session] .m-foot .btn-olive");
await click("[data-act=ad][data-p=rdv]");

const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
watch(m, "mobile");
await m.goto(url); await m.waitForTimeout(1000);
await m.screenshot({ path: join(out, "5-mobile-site.png") });
await m.click("[data-act=view][data-v=patient]"); await m.waitForSelector("[data-act=mtab]", { state: "attached" }); await m.waitForTimeout(1500);
await m.screenshot({ path: join(out, "6-mobile-patiente.png") });
// Mois offert après le bilan, page « Mes offres », lexique
await m.selectOption("#pb-plan", "decouverte"); await m.waitForTimeout(1000);
if (!(await m.$(".mnotice.gift"))) errors.push("mois offert : bandeau absent sur l'accueil");
await m.click(".mnotice.gift"); await m.waitForSelector(".offer"); await m.waitForTimeout(1200);
await m.click("[data-act=offer][data-o=f1]"); await m.waitForTimeout(600);
if (!(await m.$("[data-act=offer][data-o=f1][disabled]"))) errors.push("offres : la demande n'est pas enregistrée");
await m.screenshot({ path: join(out, "6b-mobile-offres.png"), fullPage: true });
await m.evaluate(() => { S.ptSub = "lexique"; render(); }); await m.waitForTimeout(800);
await m.click(".mlx summary"); await m.waitForTimeout(300);
await m.screenshot({ path: join(out, "6c-mobile-lexique.png") });
// Semainier libre : patiente sans programme (Pauline, mois offert) qui note son repas
await m.evaluate(() => { S.patientId = "p9"; S.ptSub = null; S.ptPage = "nutrition"; render(); }); await m.waitForTimeout(1000);
await m.click(".mcard.suivi .prow[data-act=meal]"); await m.waitForSelector("#meal-text");
await m.fill("#meal-text", "Tartine complète, œuf, kiwi"); await m.click("form[data-form=meal] .m-foot .btn-olive"); await m.waitForTimeout(800);
if (!(await m.evaluate(() => Object.entries(MEALLOG).some(([k, l]) => k.startsWith("p9|") && l.text === "Tartine complète, œuf, kiwi")))) errors.push("semainier libre : le repas n'est pas enregistré");
await m.screenshot({ path: join(out, "6d-mobile-semainier-libre.png") });
await m.evaluate(() => { S.patientId = "p1"; render(); });
// Back-office sur téléphone : onglets en bas, panneau « Plus », tableaux en cartes
await m.click("[data-act=view][data-v=admin]"); await m.waitForSelector(".adtab"); await m.waitForTimeout(1500);
await m.screenshot({ path: join(out, "9-mobile-admin.png") });
await m.click(".adtab [data-p=patientes]"); await m.waitForTimeout(1500);
await m.screenshot({ path: join(out, "9b-mobile-admin-patientes.png") });
await m.click(".adtab [data-act=admore]"); await m.waitForSelector(".admore"); await m.waitForTimeout(700);
await m.screenshot({ path: join(out, "9c-mobile-admin-plus.png") });
await m.click(".admore [data-p=recettes]"); await m.waitForTimeout(1200);
if (await m.$(".admore")) errors.push("back-office mobile : le panneau « Plus » reste ouvert");
if (!(await m.$(".adtab button.on[data-act=admore]"))) errors.push("back-office mobile : l'onglet « Plus » devrait être actif sur Recettes");
await m.click(".adtab [data-p=suivi]"); await m.waitForTimeout(800);
await m.click("[data-act=suivi][data-id=p1]"); await m.waitForTimeout(1200);
await m.screenshot({ path: join(out, "9d-mobile-admin-suivi.png") });
await m.click("[data-act=close]"); await m.waitForTimeout(400);
const width = await m.evaluate(() => document.documentElement.scrollWidth);
console.log("mobile scrollWidth", width);
if (width > 390) errors.push(`mobile : débordement horizontal (${width}px)`);

// Bandeau « Affichage » : version téléphone sur ordinateur, version ordinateur sur téléphone (cadre #devframe)
for (const [vw, vh, dev, tag] of [[1280, 900, "mobile", "7-pc-apercu-tel"], [390, 844, "desktop", "8-tel-apercu-pc"]]) {
  const d = await browser.newPage({ viewport: { width: vw, height: vh } });
  watch(d, tag);
  await d.goto(url); await d.waitForTimeout(800);
  await d.click(`[data-act=device][data-d=${dev}]`); await d.waitForTimeout(600);
  if (!(await d.$("#devframe"))) { errors.push(`${tag} : cadre d'aperçu absent`); await d.close(); continue; }
  const dv = d.frameLocator("#devframe");
  await dv.frameLocator("#siteframe").locator("body.ready").waitFor({ state: "attached", timeout: 120000 });
  await d.waitForTimeout(1500);
  await d.screenshot({ path: join(out, `${tag}-site.png`) });
  await d.click("[data-act=view][data-v=patient]"); await d.waitForTimeout(600);
  await d.frameLocator("#devframe").locator("[data-act=mtab]").first().waitFor({ state: "attached", timeout: 20000 });
  await d.waitForTimeout(1800);
  await d.screenshot({ path: join(out, `${tag}-patiente.png`) });
  await d.frameLocator("#devframe").locator(".mtab [data-p=evolution]").click(); await d.waitForTimeout(1200);
  if (!(await d.$("#pb-plan"))) errors.push(`${tag} : bandeau non synchronisé avec l'aperçu`);
  await d.click("[data-act=view][data-v=admin]"); await d.waitForTimeout(600);
  await d.frameLocator("#devframe").locator("#main, .app").first().waitFor({ state: "attached", timeout: 20000 });
  await d.waitForTimeout(1800);
  await d.screenshot({ path: join(out, `${tag}-admin.png`) });
  const w = await d.evaluate(() => document.documentElement.scrollWidth);
  if (w > vw) errors.push(`${tag} : débordement horizontal (${w}px)`);
  await d.close();
}

console.log(errors.length ? errors.join("\n") : "NO ERRORS");
await browser.close();
process.exit(errors.length ? 1 : 0);
