// Options de lancement communes aux scripts de vérification.
// Si le Chromium attendu par la version de Playwright du projet est absent (session cloud qui fournit un autre Chromium),
// on utilise celui de l'environnement. Sur un poste où `npx playwright install` a été lancé, rien ne change.
import fs from "node:fs";
import { chromium } from "playwright";

const SYSTEM_CHROMIUM = "/opt/pw-browsers/chromium";
export function launchOptions(extra = {}) {
  const own = chromium.executablePath();
  return !fs.existsSync(own) && fs.existsSync(SYSTEM_CHROMIUM) ? { ...extra, executablePath: SYSTEM_CHROMIUM } : extra;
}
