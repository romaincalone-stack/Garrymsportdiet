# Banc d'essai de l'analyse photo de « Mon assiette »

But : mesurer la précision de l'estimation des calories sur des repas **réellement pesés**, avant d'annoncer quoi que ce soit.

Données : [Nutrition5k](https://github.com/google-research-datasets/Nutrition5k) (Google, licence CC BY 4.0) : plats de cafétéria photographiés du dessus, chaque ingrédient pesé, calories calculées. Les photos et le fichier de métadonnées sont téléchargés à la demande dans un dossier de travail (jamais copiés dans le dépôt).

Chaîne évaluée, la même que sur le site : le modèle reconnaît les aliments et estime les grammes, avec les consignes de `functions/api/analyse.js` ; les calories sont calculées par `search()` de `site/assiette.html` dans la table Ciqual de l'Anses.

```bash
# 1. Tirer 12 plats au hasard (graine 2026) dans le lot de test officiel et télécharger leurs photos
python3 tools/eval-assiette/select.py /chemin/travail 12

# 2a. Modèle ouvert sur processeur (gratuit, sans clé) : pip install torch transformers accelerate pillow
python3 tools/eval-assiette/run_local.py qwen /chemin/travail      # Qwen2.5-VL-3B-Instruct, ~1 min par photo sur 4 cœurs
python3 tools/eval-assiette/run_local.py smol /chemin/travail      # SmolVLM-500M-Instruct

# 2b. Toute autre source (API Claude, API gratuite, estimation à la main) : écrire /chemin/travail/pred-<nom>.json
#     { "modele": "…", "plats": { "dish_…": [["nom", "mots-clés Ciqual", grammes, visible], …] } }

# 3. Noter : écart en kcal et en grammes, part des plats à ± 20 %, comparaison avec « sans IA » (toujours la moyenne)
node tools/eval-assiette/score.mjs /chemin/travail pred-qwen.json pred-claude.json
```

Résultats du 2026-11-22 : voir `resultats-2026-11-22.md`.
