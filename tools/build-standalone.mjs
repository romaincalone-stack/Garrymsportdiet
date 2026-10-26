// Construit un fichier HTML unique et autonome : prototype à trois vues + site public intégré (photos en data URI).
// Usage : node tools/build-standalone.mjs  →  dist/garrym-prototype.html (ignoré par git)
// Seules les polices (Google Fonts) et les bibliothèques (three.js, GSAP, Lenis) restent chargées par Internet.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
let site = readFileSync("site/index.html", "utf8");
const dataURI = f => `data:image/${f.endsWith(".png") ? "png" : "jpeg"};base64,${readFileSync(`site/img/${f}`).toString("base64")}`;
site = site.replace(/"img\/([a-z]+\.(?:jpg|png))"/g, (_, f) => `"${dataURI(f)}"`);
// Chaque « < » encodé en \u003c : aucune balise (</script>, <body>, </head>…) n'apparaît en clair dans la chaîne
const json = JSON.stringify(site).replace(/</g, "\\u003c");
let proto = readFileSync("prototype/index.html", "utf8");
if (!proto.includes("</head>")) throw new Error("prototype/index.html : balise </head> introuvable");
// fonction de remplacement : une chaîne interpréterait « $$ » et « $& » du site comme des motifs
// Images de l'espace patiente (logo, vignettes) : lues par ASSET() dans le prototype
const assets = Object.fromEntries(["logo.png", "logoclair.png", "yoga.jpg", "etirement.jpg", "course.jpg", "terrain.jpg", "assiette.jpg", "table.jpg", "citrons.jpg"].map(f => [f, dataURI(f)]));
proto = proto.replace("</head>", () => `<script>window.SITE_HTML = ${json};\nwindow.ASSETS = ${JSON.stringify(assets)};</script>\n</head>`);
mkdirSync("dist", { recursive: true });
writeFileSync("dist/garrym-prototype.html", proto);
console.log("dist/garrym-prototype.html", (proto.length / 1048576).toFixed(2), "Mo");
