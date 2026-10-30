# Audit design et interactions · 2026-10-30

Grille : skills `apple-design`, `emil-design-eng`, `review-animations` et `mobile-native` du dépôt [emilkowalski/skills](https://github.com/emilkowalski/skills) (lien seulement, rien n'est copié). Trois vues auditées : site public, espace patiente, back-office de Manon, sur téléphone (390 px) et ordinateur (1 280 px).

## Toutes les vues

| Avant | Après | Pourquoi |
| --- | --- | --- |
| 53 règles `:hover` sans condition | `@media (hover:hover) and (pointer:fine)` | Sur téléphone, le survol reste « collé » après un toucher |
| Pas de `-webkit-tap-highlight-color` ni de `touch-action` | Flash gris supprimé, `touch-action: manipulation` sur les contrôles | Le toucher répond sans délai ni flash |
| Seuls `.btn` et `.mbtn` réagissaient à l'appui | `scale: .97` sur tout bouton, `.985` sur les grandes cartes (propriété `scale`, qui se compose avec les rotations des cartes) | Retour immédiat à l'appui, pas au relâchement |
| Champs du prototype en 15 px | 16 px minimum | iOS zoome sinon dans le champ à la saisie |
| Aucune règle `prefers-reduced-transparency` | Barres et voiles pleins si la transparence est réduite | Lisibilité, réglage d'accessibilité Apple |
| Chiffres en chasse proportionnelle | `tabular-nums` sur prix, compteurs, indicateurs, dates | Les chiffres ne sautent plus quand ils changent |

## Espace patiente et back-office (prototype)

| Avant | Après | Pourquoi |
| --- | --- | --- |
| Rideau 950 ms, titre mot par mot 1,2 s, entrées 1,1 s à chaque changement d'écran | Entrée dans un espace : 0,6 à 0,7 s ; navigation dans l'espace : 240 ms, sans rideau ni titre animé | Une action répétée des dizaines de fois par jour ne doit pas faire attendre |
| Modales : `pop` 350 ms au centre | 220 ms ; sur téléphone, feuille qui monte du bas (courbe de tiroir iOS) et y redescend | Cohérence spatiale : on attrape les feuilles en bas, au pouce |
| Barres d'onglets opaques | Matière translucide (flou 20 px), le contenu passe dessous | Hiérarchie par la matière, comme iOS |
| Bandeau du prototype : 240 px de haut sur téléphone (28 % de l'écran) | Replié en une ligne « Prototype · Espace patiente · Téléphone », ouvrable | Le contenu d'abord |
| Back-office : bandeau de titre de 230 px, titre de 5 rem ; indicateurs empilés un par ligne sur téléphone | Bandeau plus bas, titre 3,8 rem ; indicateurs en deux colonnes sur téléphone | Le contenu utile monte au-dessus de la ligne de flottaison |
| « Tout voir » coupé sur deux lignes, dates de factures coupées | Sur une ligne | Finition |
| Deux `transition: all` | Propriétés listées | Pas d'animation involontaire de la mise en page |
| Photo du programme cadrée sur le buste | Cadrage remonté | Visage visible |

## Site public

| Avant | Après | Pourquoi |
| --- | --- | --- |
| Fenêtre du test sans entrée ; Tab sortait derrière la fenêtre | Fondu et léger zoom (220 ms, jamais depuis zéro), feuille du bas sur téléphone, étapes en cascade 30 ms ; focus gardé dans la fenêtre | Matière qui arrive, accessibilité clavier |
| `100vh` sur des sections plein écran | `100svh` en plus | Pas de saut quand la barre du navigateur mobile se replie |
| `theme-color` vert-noir (ancienne palette) | Blanc | La barre du téléphone suit le site |
| Capsule de navigation translucide sans repli | Pleine si la transparence est réduite | Accessibilité |

## Constaté, non modifié

- Glisser pour fermer les feuilles (geste avec vitesse et projection) : utile, mais demande une bibliothèque de ressorts ; à prévoir en phase 3.
- L'onglet « Mon espace » (repris de TSE) est un libellé générique ; Apple recommande un nom précis (« Aujourd'hui »). Laissé tel quel, choix de Romain.
- Scène 3D du héros : animations continues décoratives, coupées si mouvement réduit ; à mesurer sur un vrai téléphone d'entrée de gamme.
- Tests sur vrai matériel (survol collé, délai de toucher, encoche) : à faire par Romain sur iPhone et Android.
