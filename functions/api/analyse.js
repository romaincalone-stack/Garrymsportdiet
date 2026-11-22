// Analyse d'une photo de repas (Cloudflare Pages Function, route POST /api/analyse).
// La photo est envoyée à Claude, qui reconnaît les aliments et estime les grammes ; les calories et nutriments
// sont ensuite calculés dans le navigateur à partir de la table Ciqual de l'Anses, jamais devinés par le modèle.
// Rien n'est enregistré : ni la photo, ni le résultat. Clé d'API : variable secrète ANTHROPIC_API_KEY (INTEGRATIONS.md).
import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-5-5";
const MAX_BYTES = 4_000_000; // photo réduite par le navigateur (1 600 px, JPEG) : quelques centaines de Ko en pratique
const TYPES = ["image/jpeg", "image/png", "image/webp"];

const ALIMENT = {
  type: "object",
  additionalProperties: false,
  required: ["nom", "recherche", "grammes", "grammes_min", "grammes_max", "visible", "confiance", "kcal_estime"],
  properties: {
    nom: { type: "string", description: "Nom court en français, à la manière de la table Ciqual : « Riz blanc, cuit », « Saumon, cuit au four »." },
    recherche: { type: "string", description: "2 à 4 mots-clés pour retrouver l'aliment dans la table Ciqual, avec l'état (cru, cuit, grillé…)." },
    grammes: { type: "number", description: "Poids estimé de la portion telle que servie, en grammes." },
    grammes_min: { type: "number" },
    grammes_max: { type: "number" },
    visible: { type: "boolean", description: "false pour un ingrédient probable mais invisible : huile ou beurre de cuisson, sauce absorbée, sucre ajouté." },
    confiance: { type: "string", enum: ["haute", "moyenne", "faible"] },
    kcal_estime: { type: "number", description: "Estimation de secours, utilisée seulement si l'aliment est introuvable dans la table." }
  }
};
export const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["est_un_repas", "aliments", "remarque"],
  properties: {
    est_un_repas: { type: "boolean" },
    aliments: { type: "array", items: ALIMENT },
    remarque: { type: "string", description: "Une phrase utile pour corriger l'estimation, ou une chaîne vide." }
  }
};

export const SYSTEM = `Tu analyses la photo d'un repas pour un outil de suivi alimentaire en français.
Ton travail : reconnaître chaque aliment et estimer son poids. Les calories sont calculées ensuite à partir de la table Ciqual de l'Anses : sois précis sur l'identité de l'aliment, son mode de cuisson et son poids.

Méthode :
- Une entrée par aliment distinct (riz, saumon, brocolis), pas une seule entrée pour tout le plat. Un plat composé dont la recette se voit mal (lasagnes, quiche, pizza) reste une seule entrée.
- Estime le poids cuit, tel que servi, en t'appuyant sur les repères visibles : assiette plate standard de 26 à 27 cm, assiette creuse de 22 cm, fourchette de 19 cm, cuillère à soupe, verre de 20 à 25 cl, main.
- Donne une fourchette honnête (grammes_min, grammes_max) qui reflète l'incertitude réelle de la photo.
- Ajoute les ingrédients probables mais invisibles quand le plat en contient presque toujours (huile de cuisson d'une poêlée, beurre sur des légumes brillants, vinaigrette d'une salade assaisonnée), avec visible = false et une quantité prudente.
- recherche : les mots qu'un nom de la table Ciqual contiendrait, par exemple « riz blanc cuit », « saumon cuit four », « brocoli cuit ».
- Si la personne a donné des précisions, elles priment sur ce que tu vois.
- Si la photo ne montre pas de nourriture, est_un_repas = false et la liste est vide.
- Reste neutre : aucun jugement sur le repas, aucun conseil de régime ou de perte de poids.`;

// Appel au modèle ; le client est passé en paramètre pour pouvoir le remplacer dans les tests.
export async function analyserPhoto(client, { data, mediaType, precisions }) {
  const texte = precisions
    ? `Précisions de la personne (elles priment sur la photo) : ${precisions}`
    : "Aucune précision donnée.";
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default", // si le modèle refuse, l'API rejoue la demande sur le modèle de repli recommandé
    output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: mediaType, data } },
        { type: "text", text: texte }
      ]
    }]
  });
  if (response.stop_reason === "refusal") return { erreur: "refus", message: "La photo n'a pas pu être analysée. Essayez une autre photo." };
  if (response.stop_reason === "max_tokens") return { erreur: "incomplet", message: "L'analyse est incomplète. Réessayez." };
  const bloc = response.content.find(b => b.type === "text");
  if (!bloc) return { erreur: "vide", message: "Aucun résultat. Réessayez." };
  const resultat = JSON.parse(bloc.text);
  return { ...resultat, modele: response.model };
}

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

export async function onRequestPost({ request, env }) {
  // Même origine seulement : un autre site ne peut pas se servir de cette route (et de la clé) à sa place
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ erreur: "origine", message: "Origine refusée." }, 403);
  if (!env.ANTHROPIC_API_KEY) return json({ erreur: "indisponible", message: "L'analyse photo n'est pas encore activée." }, 503);

  // Limite facultative par adresse IP et par jour, si un espace KV « LIMITES » est relié au projet
  if (env.LIMITES) {
    const ip = request.headers.get("cf-connecting-ip") || "inconnue";
    const cle = `${new Date().toISOString().slice(0, 10)}:${ip}`;
    const n = Number(await env.LIMITES.get(cle)) || 0;
    const max = Number(env.ANALYSES_PAR_JOUR) || 20;
    if (n >= max) return json({ erreur: "limite", message: `Vous avez atteint la limite de ${max} analyses aujourd'hui.` }, 429);
    await env.LIMITES.put(cle, String(n + 1), { expirationTtl: 60 * 60 * 26 });
  }

  let body;
  try { body = await request.json(); } catch { return json({ erreur: "format", message: "Requête illisible." }, 400); }
  const { image, type, precisions } = body || {};
  if (typeof image !== "string" || !TYPES.includes(type)) return json({ erreur: "format", message: "Envoyez une photo JPEG, PNG ou WebP." }, 400);
  if (image.length * 0.75 > MAX_BYTES) return json({ erreur: "taille", message: "Photo trop lourde." }, 413);

  try {
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const r = await analyserPhoto(client, { data: image, mediaType: type, precisions: typeof precisions === "string" ? precisions.slice(0, 300) : "" });
    return json(r, r.erreur ? 422 : 200);
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json({ erreur: "occupe", message: "Le service est très demandé. Réessayez dans une minute." }, 429);
    if (e instanceof Anthropic.APIError) return json({ erreur: "api", message: "L'analyse a échoué. Réessayez." }, 502);
    if (e instanceof SyntaxError) return json({ erreur: "format", message: "Résultat illisible. Réessayez." }, 502);
    throw e;
  }
}
