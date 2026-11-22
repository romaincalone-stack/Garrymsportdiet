# Banc d'essai du 2026-11-22 : IA gratuites contre Claude, sur 12 repas pesés

Demande de Romain : tester l'analyse photo de « Mon assiette » avec des IA gratuites.

## Protocole

- **Repas** : 12 plats tirés au hasard (graine 2026) dans le lot de test de Nutrition5k (Google, CC BY 4.0). Photo du dessus, chaque ingrédient pesé, calories calculées par les auteurs. Liste : `donnees-2026-11-22/selection.txt`.
- **Chaîne identique au site** : consignes de `functions/api/analyse.js` ; calories calculées par la recherche de `site/assiette.html` dans la table Ciqual de l'Anses.
- **Modèles gratuits**, exécutés sur le processeur du serveur (4 cœurs, sans carte graphique), sans clé :
  - Qwen2.5-VL-3B-Instruct (3 milliards de paramètres) ;
  - SmolVLM-500M-Instruct.
- **Repère Claude** : estimation faite à l'aveugle dans la session de développement, avec les mêmes consignes, enregistrée avant de lire les vraies valeurs. Elle n'est pas passée par l'API (pas de clé) : c'est le même type de modèle que celui prévu pour le site, sans être exactement l'appel de production.
- **Référence « sans IA »** : répondre toujours la moyenne des plats du lot de test (253 kcal).

## Résultats

| Source | Photos exploitables | Écart médian (kcal) | Écart médian (%) | Écart moyen (kcal) | Plats à ± 20 % | Écart moyen sur le poids | Temps par photo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claude (repère) | 12/12 | 98 | **29 %** | 126 | 3/12 | 58 g | — |
| Qwen2.5-VL-3B (gratuit, local) | 12/12 | 72 | 54 % | 165 | 2/12 | 111 g | 8 à 73 s |
| SmolVLM-500M (gratuit, local) | **0/12** | — | — | — | — | — | 4 à 53 s |
| Sans IA (toujours 253 kcal) | — | 210 | 66 % | 258 | 2/12 | — | — |

Plat par plat (kcal) :

| # | Plat (vérité) | Vrai | Claude | Qwen |
| --- | --- | --- | --- | --- |
| 1 | Porc, poisson, melon, riz | 463 | 330 | 452 |
| 2 | Riz sauvage | 223 | 278 | 292 |
| 3 | Œufs brouillés, bacon, ananas, fruits rouges, chia | 441 | 343 | 681 |
| 4 | Pizza, tofu, poulet, millet | 741 | 469 | 465 |
| 5 | Raisin | 51 | 62 | 25 |
| 6 | Blette, chou kale | 19 | 36 | 37 |
| 7 | Poulet, saumon, ananas, brocoli, tomates | 492 | 394 | 221 |
| 8 | Chou-fleur, tomates, poivron, oignon | 69 | 72 | 120 |
| 9 | Épinards, myrtilles, vinaigrette | 72 | 29 | 0 |
| 10 | Pâtes, bœuf en sauce, épinards | 950 | 524 | 155 |
| 11 | Porc, poulet, haricots verts | 278 | 317 | 176 |
| 12 | Amandes | 671 | 360 | 621 |

## Ce qu'on apprend

1. **Les IA gratuites qui tournent sans carte graphique ne conviennent pas.**
   - SmolVLM ne produit jamais de réponse exploitable : des phrases, souvent fausses (« une plate de riz blanc » pour une coupelle de raisin), et des boucles.
   - Qwen2.5-VL-3B répond toujours dans le bon format, mais invente des aliments (du riz blanc et des brocolis dans presque chaque assiette, des tomates cerises à la place du raisin, des noix de cajou à la place des amandes) et ne voit rien sur le plat 9. Son bon score sur les amandes (plat 12) tient au hasard d'une erreur qui se compense.
   - Sur un téléphone, ces modèles seraient encore plus lents.
2. **Avec un modèle du niveau de Claude, la reconnaissance est bonne, mais les quantités restent la faiblesse.** Les aliments denses sont sous-estimés : amandes 60 g estimés pour 116 g réels, bœuf en sauce 90 g pour 239 g. L'écart médian de 29 % correspond à ce que décrit la littérature pour une estimation à partir d'une seule photo (de l'ordre de 20 à 40 %, confiance moyenne). **La correction des grammes par la personne reste indispensable** ; l'interface la met déjà en avant.
3. **Le banc d'essai a révélé un défaut du site, corrigé** (`JOURNAL_ERREURS.md`, incident 38). La recherche dans la table rattachait « poulet rôti » à du poulet **cru**, « porc rôti » au rôti de porc **cru** et « filet de poulet cuit » à du **foie** de poulet. Les modes de cuisson sont maintenant traités comme équivalents, et la forme crue recule quand on demande un aliment cuit. Résultat sur Claude : écart médian de 36 % à 29 %, plats à ± 20 % de 2 à 3.

## Limites

- **12 plats** : l'ordre de grandeur est fiable, les pourcentages exacts ne le sont pas. Pour une conclusion solide, il faut au moins 50 plats.
- **Des plats de cafétéria américaine**, photographiés par une caméra fixe à hauteur constante. Les repas de Manon, photographiés au téléphone, seront différents : c'est pourquoi il faut les 20 à 30 repas pesés de Manon.
- **Deux tables de calories différentes** : les calories de Nutrition5k viennent de la base américaine USDA, les nôtres de la table de l'Anses. Une petite part de l'écart vient de cette différence.
- **Les consignes n'ont pas été ajustées sur ces 12 plats**, pour ne pas fausser la mesure. Les améliorer (compter les unités, signaler les aliments denses) demande un second lot de plats, distinct.
