// Teste la fonction d'analyse photo (functions/api/analyse.js) sans clé ni appel réel : le client Claude est remplacé.
// Usage : node tools/test-analyse.mjs   →  attendu « NO ERRORS »
import { analyserPhoto, onRequestPost, SCHEMA, MODEL } from "../functions/api/analyse.js";

const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };
const RESULT = { est_un_repas: true, remarque: "", aliments: [{ nom: "Riz blanc, cuit", recherche: "riz blanc cuit", grammes: 150, grammes_min: 120, grammes_max: 190, visible: true, confiance: "moyenne", kcal_estime: 210 }] };

// 1. La requête envoyée : modèle, sortie structurée, repli en cas de refus, image et précisions
let sent;
const client = (stop = "end_turn", text = JSON.stringify(RESULT)) => ({ beta: { messages: { create: async p => { sent = p; return { stop_reason: stop, model: MODEL, content: [{ type: "text", text }] }; } } } });
const r = await analyserPhoto(client(), { data: "AAAA", mediaType: "image/jpeg", precisions: "cuit à l'huile" });
check(sent.model === MODEL, "modèle");
check(sent.output_config.format.type === "json_schema" && sent.output_config.format.schema === SCHEMA, "sortie structurée");
check(sent.fallbacks === "default" && sent.betas.includes("server-side-fallback-2026-07-01"), "repli en cas de refus");
check(sent.messages[0].content[0].type === "image" && sent.messages[0].content[0].source.data === "AAAA", "image envoyée");
check(sent.messages[0].content[1].text.includes("cuit à l'huile"), "précisions transmises");
check(r.aliments[0].grammes === 150 && r.modele === MODEL, "résultat lu");

// 2. Refus et réponse tronquée
check((await analyserPhoto(client("refusal", ""), { data: "A", mediaType: "image/jpeg" })).erreur === "refus", "refus géré");
check((await analyserPhoto(client("max_tokens", "{"), { data: "A", mediaType: "image/jpeg" })).erreur === "incomplet", "troncature gérée");

// 3. La route : origine, clé absente, format
const req = (body, origin = "https://site.fr") => new Request("https://site.fr/api/analyse", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body) });
check((await onRequestPost({ request: req({}, "https://autre.fr"), env: { ANTHROPIC_API_KEY: "x" } })).status === 403, "autre origine refusée");
check((await onRequestPost({ request: req({ image: "A", type: "image/jpeg" }), env: {} })).status === 503, "clé absente : 503");
check((await onRequestPost({ request: req({ image: "A", type: "image/gif" }), env: { ANTHROPIC_API_KEY: "x" } })).status === 400, "format refusé");

// 4. Limite quotidienne avec un espace KV simulé
const kv = new Map(), LIMITES = { get: async k => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } };
const env = { LIMITES, ANALYSES_PAR_JOUR: "1", ANTHROPIC_API_KEY: "x" };
await onRequestPost({ request: req({}), env });
check((await onRequestPost({ request: req({}), env })).status === 429, "limite quotidienne");

if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log("NO ERRORS");
