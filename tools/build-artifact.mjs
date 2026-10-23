// Construit une version publiable en page claude.ai (Artifact) :
// sans doctype / html / head / body (ajoutés à la publication), titre court.
// Usage : node tools/build-artifact.mjs                      →  dist/prototype-garrym.html (prototype applicatif)
//         node tools/build-artifact.mjs site                 →  dist/site-garrym.html (site public v4, images dans site/img/)
//         node tools/build-artifact.mjs standalone           →  dist/garrym-trois-espaces.html (trois espaces, site intégré)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const TARGETS = {
  prototype: { src: "prototype/index.html", out: "dist/prototype-garrym.html", title: "Prototype Garrym" },
  site: { src: "site/index.html", out: "dist/site-garrym.html", title: "Garrym Sport Diet" },
  // fichier unique à trois espaces (à construire avant : npm run build:standalone)
  standalone: { src: "dist/garrym-prototype.html", out: "dist/garrym-trois-espaces.html", title: "Garrym Sport Diet" }
};
const t = TARGETS[process.argv[2] || "prototype"];
let s = readFileSync(t.src, "utf8");
s = s.replace(/<!doctype html>\s*/i, "").replace(/<html[^>]*>\s*/i, "").replace(/<\/html>\s*$/i, "")
  .replace(/<head>\s*/i, "").replace(/<\/head>\s*/i, "").replace(/<body>\s*/i, "").replace(/<\/body>\s*/i, "")
  .replace(/<meta charset="utf-8">\s*/i, "").replace(/<meta name="viewport"[^>]*>\s*/i, "")
  .replace(/<title>[^<]*<\/title>/i, `<title>${t.title}</title>`);
mkdirSync("dist", { recursive: true });
writeFileSync(t.out, s);
console.log(t.out, s.length, "octets");
