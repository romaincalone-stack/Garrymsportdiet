# Consentement aux rubriques de santé (étape 2)

Texte prêt à intégrer · version `v1` du 2026-11-24 · **prévu pour l'étape 2, ne pas mettre en ligne avant** : hébergement HDS, AIPD terminée, texte validé par l'avocat (`legal/AUDIT.md`, V2 et V8).

Sources : RGPD, art. 4.11 (consentement libre, spécifique, éclairé, univoque), 7 (preuve, retrait aussi simple que l'accord, consentement non conditionné), 9.2.a (consentement explicite) ; lignes directrices 05/2020 du CEPD sur le consentement ; CNIL, données de santé. Table `health_consents` de `DATA_DICTIONARY.md` (`scope` : `journal`, `evolution`, `cycle` ; `text_version` : `v1`).

## Règles de mise en œuvre

1. **Un accord par rubrique** : semainier partagé (`journal`), évolution (`evolution`), cycle (`cycle`). Jamais une seule case pour les trois.
2. Demandé **à la première ouverture** de la rubrique, jamais à l'activation du compte, jamais dans les conditions d'utilisation.
3. **Case non cochée par défaut** ; bouton « J'accepte » actif seulement quand la case est cochée ; bouton « Pas maintenant » aussi visible que « J'accepte ».
4. Enregistrer : patiente, rubrique, date, version du texte. Garder la preuve 5 ans après la fin du compte.
5. **Retrait** depuis le profil, en deux gestes au plus, sans justification. Après le retrait, la rubrique se ferme et ses données sont supprimées sous 30 jours ; la patiente peut d'abord télécharger ses données.
6. **Refuser ne coûte rien** : ni changement de prix, ni perte de consultation. Si le semainier fait partie d'une offre payée, prévoir l'alternative (semainier remis et revu en consultation). Sans cette alternative, le consentement n'est pas libre (RGPD, art. 7.4) et la base légale devra être l'art. 9.2.h : **point à trancher avec l'avocat**.
7. Si le texte change de façon importante, redemander l'accord (nouvelle version).
8. Aucune de ces données dans un email, une notification ou un aperçu d'écran verrouillé.

---

## Texte affiché : semainier partagé (`journal`, v1)

**Votre semainier partagé avec Manon**

Dans cette rubrique, vous notez vos repas (ce que vous avez mangé, la quantité, une remarque) et vous pouvez proposer votre semaine à venir. Manon les lit et vous répond par une validation ou un conseil.

Ces informations concernent votre alimentation et votre santé. Elles sont donc protégées :
- seules vous et Manon y avez accès ; Manon est tenue au secret professionnel et chacun de ses accès est enregistré ;
- elles sont hébergées en France chez un hébergeur certifié pour les données de santé ;
- elles servent uniquement à votre accompagnement ; elles ne sont ni vendues, ni utilisées pour de la publicité ;
- elles sont conservées pendant votre accompagnement, puis supprimées `[sous 3 mois après la fin, à valider]`.

Les réponses de Manon sont des conseils nutritionnels, en complément de votre suivi médical. Elle ne lit pas vos repas en temps réel : elle répond en général sous `[48 h ouvrées]`. En cas d'urgence, appelez le 15 ou le 112.

Votre accord est facultatif. Sans lui, Manon vous remet votre semainier et en parle avec vous en consultation. Vous pouvez retirer votre accord à tout moment dans votre profil : la rubrique se ferme et vos repas notés sont supprimés sous 30 jours.

☐ J'accepte que mes repas notés, mes semainiers proposés et les réponses de Manon soient enregistrés dans mon espace pour mon accompagnement.

[J'accepte] [Pas maintenant] · [Politique de confidentialité]

---

## Texte affiché : évolution (`evolution`, v1)

**Suivre votre évolution**

Ici, vous pouvez noter votre énergie et votre sommeil (de 0 à 10), vos symptômes digestifs et, si vous le souhaitez, votre poids. Vous voyez vos courbes ; Manon les voit aussi pour adapter vos conseils.

- Le poids est **facultatif** : vous pouvez ne jamais le noter, ou le masquer à tout moment.
- Ces informations sont des données de santé : seules vous et Manon y avez accès, chacun de ses accès est enregistré, elles sont hébergées en France chez un hébergeur certifié.
- Elles sont conservées pendant votre accompagnement, puis supprimées `[sous 3 mois après la fin, à valider]`.
- Elles ne posent aucun diagnostic.

Si le fait de suivre votre poids ou vos repas vous inquiète ou prend trop de place, parlez-en à Manon ou à votre médecin.

Votre accord est facultatif et vous pouvez le retirer à tout moment dans votre profil : la rubrique se ferme et vos mesures sont supprimées sous 30 jours.

☐ J'accepte que mes mesures (énergie, sommeil, symptômes digestifs et, si je le note, mon poids) soient enregistrées dans mon espace et vues par Manon pour mon accompagnement.

[J'accepte] [Pas maintenant]

---

## Texte affiché : mon cycle (`cycle`, v1)

**Suivre votre cycle (facultatif)**

Vous pouvez noter vos jours de règles, des signes d'ovulation et des symptômes avant les règles. L'application affiche le jour de votre cycle et la durée moyenne de vos cycles. Manon les voit pour adapter vos repas et vos séances à votre énergie au fil du mois.

- **Ce suivi n'est pas une méthode de contraception.** Il ne prédit ni vos règles ni votre période fertile, et ne pose aucun diagnostic.
- Ces informations sont très personnelles : seules vous et Manon y avez accès, chacun de ses accès est enregistré, elles sont hébergées en France chez un hébergeur certifié pour les données de santé.
- Vous pouvez arrêter le suivi à tout moment : vos données de cycle sont alors supprimées sous 30 jours.

☐ J'accepte que les informations de mon cycle soient enregistrées dans mon espace et vues par Manon pour mon accompagnement.

[J'accepte] [Pas maintenant]

---

## Texte du retrait (profil, « Mes accords »)

**Mes accords**

| Rubrique | État | Action |
| --- | --- | --- |
| Semainier partagé | Accepté le [date] | [Retirer mon accord] |
| Évolution | Accepté le [date] | [Retirer mon accord] |
| Mon cycle | Non activé | [Activer] |

Fenêtre de confirmation : « Retirer votre accord pour [rubrique] ? La rubrique se ferme tout de suite et vos données sont supprimées sous 30 jours. Vous pouvez d'abord [télécharger vos données]. » [Retirer] [Annuler]

Message après retrait : « C'est fait. Manon est prévenue `[sans détail]` et continuera votre suivi en consultation. »
