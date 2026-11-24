// Recopie dans espace/content/legal/ les textes juridiques de legal/ qui concernent l'espace (source : agent juridique).
// Ne garde que le texte destiné au public (après la première ligne « --- »), sans la partie « étape 2 » de la confidentialité
// ni la partie propre au site public des mentions légales. Usage : npm run sync:legal (depuis espace/).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, "..", "..", "legal"), out = path.join(here, "..", "content", "legal");
const body = text => text.slice(text.indexOf("\n---\n") + 5).trim();
const dropSection = (text, title) => {
  const start = text.indexOf(`\n## ${title}`);
  if (start < 0) return text;
  const next = text.indexOf("\n## ", start + 4);
  return text.slice(0, start) + (next < 0 ? "" : text.slice(next));
};
const links = t => t
  .replace(/`\[lien vers \/conditions\]`/g, "[conditions d'utilisation](/conditions)")
  .replace(/`\[lien \/confidentialite\]`/g, "[politique de confidentialité](/confidentialite)")
  .replace(/la politique de confidentialité du site et celle de l'espace\./, "la [politique de confidentialité de l'espace](/confidentialite).");
const files = {
  "conditions.md": () => body(fs.readFileSync(path.join(src, "cgu-espace.md"), "utf8")),
  "confidentialite.md": () => { const t = body(fs.readFileSync(path.join(src, "confidentialite-espace.md"), "utf8")); return t.slice(0, t.indexOf("\n---\n\n## Partie 2")).trim(); },
  "mentions-legales.md": () => dropSection(body(fs.readFileSync(path.join(src, "mentions-legales.md"), "utf8")), "Partie propre au site public")
};
fs.mkdirSync(out, { recursive: true });
for (const [name, read] of Object.entries(files)) {
  fs.writeFileSync(path.join(out, name), links(read()).replace(/\n---\s*$/, "").trim() + "\n");
  console.log("texte copié :", name);
}
