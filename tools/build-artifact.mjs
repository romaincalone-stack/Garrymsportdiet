// Construit une version du prototype publiable en page claude.ai (Artifact) :
// sans doctype / html / head / body (ajoutés à la publication), titre court.
// Usage : node tools/build-artifact.mjs  →  dist/prototype-garrym.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
let s = readFileSync("prototype/index.html", "utf8");
s = s.replace(/<!doctype html>\s*/i, "").replace(/<html[^>]*>\s*/i, "").replace(/<\/html>\s*$/i, "")
  .replace(/<head>\s*/i, "").replace(/<\/head>\s*/i, "").replace(/<body>\s*/i, "").replace(/<\/body>\s*/i, "")
  .replace(/<meta charset="utf-8">\s*/i, "").replace(/<meta name="viewport"[^>]*>\s*/i, "")
  .replace(/<title>[^<]*<\/title>/i, "<title>Prototype Garrym</title>");
mkdirSync("dist", { recursive: true });
writeFileSync("dist/prototype-garrym.html", s);
console.log("dist/prototype-garrym.html", s.length, "octets");
