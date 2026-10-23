// Construit un fichier HTML unique et autonome : prototype à trois vues + site public intégré (photos en data URI).
// Usage : node tools/build-standalone.mjs  →  dist/garrym-prototype.html (ignoré par git)
// Seules les polices (Google Fonts) et les bibliothèques (three.js, GSAP, Lenis) restent chargées par Internet.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
let site = readFileSync("site/index.html", "utf8");
site = site.replace(/"img\/([a-z]+)\.jpg"/g, (_, n) => `"data:image/jpeg;base64,${readFileSync(`site/img/${n}.jpg`).toString("base64")}"`);
// Chaque « < » encodé en \u003c : aucune balise (</script>, <body>, </head>…) n'apparaît en clair dans la chaîne
const json = JSON.stringify(site).replace(/</g, "\\u003c");
let proto = readFileSync("prototype/index.html", "utf8");
if (!proto.includes("</head>")) throw new Error("prototype/index.html : balise </head> introuvable");
// fonction de remplacement : une chaîne interpréterait « $$ » et « $& » du site comme des motifs
proto = proto.replace("</head>", () => `<script>window.SITE_HTML = ${json};</script>\n</head>`);
mkdirSync("dist", { recursive: true });
writeFileSync("dist/garrym-prototype.html", proto);
console.log("dist/garrym-prototype.html", (proto.length / 1048576).toFixed(2), "Mo");
