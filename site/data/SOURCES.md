# Sources des données de « Mon assiette »

| Fichier | Source | Licence | Remarque |
| --- | --- | --- | --- |
| `ciqual-2020.js` | Table de composition nutritionnelle des aliments Ciqual 2020, Anses (https://ciqual.anses.fr) | Licence Ouverte Etalab 2.0 : réutilisation libre en citant la source | Généré par `tools/build-ciqual.py`. Le 2026-11-22 le site de l'Anses était en maintenance : fichier Excel officiel « Table Ciqual 2020_xls.xls » repris d'une copie sur GitHub (`OlivierFitter/ciqual_2025_complete`), structure (3 186 aliments, 76 colonnes) et valeurs contrôlées sur des aliments courants. À régénérer depuis le site de l'Anses, avec la version la plus récente de la table. |

Les produits scannés viennent d'Open Food Facts (https://world.openfoodfacts.org), base sous licence ODbL, interrogée à la demande depuis le navigateur ; rien n'est copié dans ce dépôt.
