# Garrym · Sport Diet

Plateforme de Manon Garrione, diététicienne-nutritionniste et coach sportive (La Garde, visio) : site public, espace patiente selon la formule, back-office.

**Statut** : phase 1, prototype cliquable en validation auprès de Manon. Aucune donnée réelle.

## Voir le site public (v4)

Ouvrir `site/index.html` dans un navigateur récent, connecté à Internet (polices et bibliothèques chargées par CDN). Aperçu en ligne privé : https://claude.ai/artifact/GaowBpyDd9xSvNujvoimSo

## Voir le prototype de l'application

Ouvrir `prototype/index.html` dans un navigateur (double-clic). Le bandeau du haut bascule entre :
- **Site public** ;
- **Espace patiente**, avec un menu pour changer la formule de la patiente démo (Suivi, F1, F2, F3) ;
- **Back-office Manon**.

La case « Notes CDC » affiche ou masque les hypothèses encore à valider.

## Documentation

| Fichier | Contenu |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Règles permanentes, architecture, commandes, pièges connus |
| [`APP_SPEC.md`](APP_SPEC.md) | Vision, cibles, parcours, écrans, règles métier, critères d'acceptation |
| [`BRAND_BRIEF.md`](BRAND_BRIEF.md) | Nom, promesse, ton, logo, couleurs, typographies, composants, SEO |
| [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) | Tables, champs, sensibilité RGPD, conservation, RLS |
| [`FEATURE_BACKLOG.md`](FEATURE_BACKLOG.md) | Livré, en cours, à faire, idées |
| [`INTEGRATIONS.md`](INTEGRATIONS.md) | Services externes, variables d'environnement (noms seulement), coûts |
| [`JOURNAL_ERREURS.md`](JOURNAL_ERREURS.md) | Incidents et règles tirées |
| [`references/DESIGN_REFERENCES.md`](references/DESIGN_REFERENCES.md) | Ce qui a été retenu des ressources design |

Règle : une livraison n'est terminée que lorsque la documentation concernée est à jour.

## Vérifier

```bash
npm install
npm run check        # application : "mobile scrollWidth 390" puis "NO ERRORS"
npm run check:site   # site v4 : "NO ERRORS"
```
