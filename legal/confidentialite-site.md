# Politique de confidentialité du site et de « Mon assiette »

Texte prêt à intégrer · version du 2026-11-24 · **à faire relire** (`legal/AUDIT.md`, partie D).

Hypothèses de ce texte (à vérifier avant publication, sinon adapter) :
- polices et bibliothèques hébergées sur le site (plus d'appel à Google Fonts, cdnjs ni jsDelivr) ;
- aucune mesure d'audience, ou une mesure **sans cookie** (Plausible ou Umami) : choisir le paragraphe correspondant ;
- l'analyse photo de « Mon assiette » n'est décrite que si l'étape 5 est ouverte ; avant, garder seulement la recherche et le code-barres.

Sources : RGPD, art. 6, 12 à 14, 28, 44 à 46 ; loi Informatique et Libertés, art. 82 (traceurs) et art. 84 (directives après le décès) ; lignes directrices CNIL sur les cookies et autres traceurs (délibération n° 2020-091).

---

## Qui est responsable de vos données ?

Manon Garrione, diététicienne-nutritionniste et coach sportive, `[à compléter : adresse du cabinet]`, `[à compléter : adresse email de contact]`.

## En bref

- Le site ne vous demande ni nom, ni email, ni compte.
- Le test « Tester mon alimentation » est calculé sur votre appareil : vos réponses ne sont ni enregistrées ni envoyées.
- Dans « Mon assiette », vos repas restent sur votre appareil.
- Le site ne dépose aucun cookie publicitaire ni de mesure d'audience `[à adapter si une mesure d'audience est ajoutée]`.

## Ce que nous traitons, pourquoi et combien de temps

| Situation | Données | Pourquoi | Base légale | Durée |
| --- | --- | --- | --- | --- |
| Vous visitez le site | Adresse IP, type de navigateur, page demandée, date | Afficher le site, le protéger contre les attaques | Intérêt légitime (art. 6.1.f) | Journaux de l'hébergeur : `[à vérifier dans les réglages Cloudflare]` |
| Vous faites le test | Vos réponses, sur votre appareil seulement | Vous montrer un résultat indicatif | Aucune donnée ne nous parvient | Effacées quand vous fermez la page |
| Vous utilisez Mon assiette | Votre journal des repas, sur votre appareil seulement (stockage local du navigateur) | Garder votre journal d'un jour à l'autre | Aucune donnée ne nous parvient | Jusqu'à ce que vous l'effaciez (bouton « Effacer ») ou effaciez les données du site dans votre navigateur |
| Vous scannez un code-barres | Le code-barres et votre adresse IP, envoyés **directement par votre navigateur** à Open Food Facts | Trouver les valeurs nutritionnelles du produit | — (Open Food Facts traite ces données sous sa propre responsabilité) | Voir la politique d'Open Food Facts |
| Vous analysez une photo `[étape 5]` | La photo du repas, vos précisions écrites | Reconnaître les aliments et estimer leurs grammes | Intérêt légitime : fournir le service que vous demandez (art. 6.1.f) | Non conservées par le site ; supprimées par Anthropic sous `[à vérifier : 30 jours]` |
| Vous analysez une photo `[étape 5]` | Empreinte de votre adresse IP (pas l'adresse elle-même) `[si la correction A2 de l'audit est faite]` | Limiter à `[20]` analyses par jour pour éviter les abus | Intérêt légitime (art. 6.1.f) | 26 heures |

Nous ne vendons aucune donnée et ne faisons aucune publicité ciblée.

## Mon assiette et l'analyse des photos `[à publier à l'étape 5]`

Quand vous touchez « Analyser », la photo est réduite sur votre téléphone (ce qui retire ses métadonnées, dont la position GPS), puis envoyée avec vos précisions à **Anthropic PBC**, société américaine qui fournit le modèle d'intelligence artificielle Claude. Anthropic agit comme sous-traitant : elle ne traite la photo que pour nous rendre l'analyse et ne s'en sert pas pour entraîner ses modèles `[à vérifier dans les conditions commerciales d'Anthropic au jour de l'ouverture]`.

- **Transfert hors de l'Union européenne** : les serveurs d'Anthropic sont aux États-Unis. Le transfert est encadré par les clauses contractuelles types de la Commission européenne, intégrées au contrat de traitement des données (DPA) d'Anthropic `[à vérifier ; préciser aussi si Anthropic est certifiée au Data Privacy Framework UE–États-Unis]`.
- **Conservation** : le site ne garde ni la photo ni le résultat. Anthropic supprime les données reçues par son API sous `[à vérifier : 30 jours]`, sauf obligation légale ou contrôle d'un usage interdit.
- **Conseils** : ne photographiez ni visage ni document ; n'écrivez ni votre nom ni d'information sur votre santé dans les précisions.

Mon assiette donne des repères. Ce n'est pas un dispositif médical, il ne pose aucun diagnostic. Si la nourriture devient une source d'inquiétude, parlez-en à un professionnel de santé.

## Cookies et stockage sur votre appareil

Le site n'utilise **aucun cookie**. « Mon assiette » enregistre votre journal et votre choix d'affichage des calories dans le stockage local de votre navigateur (`localStorage`, clé `gm-assiette-v1`). Ce stockage sert uniquement la fonction que vous utilisez ; il est exempté de consentement (loi Informatique et Libertés, art. 82). Il ne nous est jamais transmis.

`[Si une mesure d'audience sans cookie est ajoutée :]` Nous mesurons la fréquentation avec `[Plausible / Umami]`, sans cookie et sans suivi d'une visite à l'autre : nombre de pages vues, pays, type d'appareil. Ces statistiques sont anonymes `[à vérifier selon l'outil et sa configuration]`.

## Liens vers d'autres services

Les boutons « Réserver » ouvrent Doctolib ; le lien Instagram ouvre Instagram (Meta) ; le lien de carte ouvre Google Maps. Ces services ont leurs propres règles de confidentialité et peuvent déposer leurs cookies sur leurs propres pages. Rien n'est échangé entre ce site et eux.

## Qui reçoit vos données ?

| Prestataire | Rôle | Lieu |
| --- | --- | --- |
| Cloudflare, Inc. | Hébergement du site et de la fonction d'analyse | Réseau mondial ; société américaine `[à vérifier : certification Data Privacy Framework, DPA Cloudflare]` |
| Anthropic PBC `[étape 5]` | Analyse des photos de repas | États-Unis (clauses contractuelles types) |
| Open Food Facts (association) | Base de produits interrogée par votre navigateur | `[à vérifier : France]` |

## Vos droits

Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, et vous opposer à un traitement fondé sur l'intérêt légitime. Vous pouvez aussi définir des directives sur le sort de vos données après votre décès. Comme le site ne connaît pas votre identité, il ne conserve presque rien qui puisse vous être rattaché ; votre journal Mon assiette, lui, ne se trouve que sur votre appareil et vous pouvez l'effacer vous-même.

Écrivez à `[à compléter : adresse email de contact]`. Réponse sous un mois.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL : cnil.fr, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 `[adresse à vérifier sur cnil.fr]`.

*Dernière mise à jour : `[à compléter]`.*
