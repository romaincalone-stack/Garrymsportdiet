# Politique de confidentialité de l'espace patiente

Texte prêt à intégrer dans `espace/app/confidentialite/page.tsx` · version du 2026-11-24 · **à faire relire** (`legal/AUDIT.md`, partie D, points V1, V2, V7).

La **partie 1** correspond à l'étape 1 (en ligne dès l'ouverture de l'espace). La **partie 2** est **prévue pour l'étape 2** : ne la publier qu'à l'ouverture du suivi nutritionnel, après l'AIPD et la validation du texte de consentement (`legal/consentement-sante.md`).

Sources : RGPD, art. 5, 6, 9, 12 à 22, 28, 32 à 34 ; loi Informatique et Libertés, art. 82 et 84 ; CSP, art. L.1110-4 (secret professionnel) et L.1111-8 (hébergement de données de santé) ; référentiel CNIL « gestion des cabinets médicaux et paramédicaux » (2020).

---

## Partie 1 : votre espace aujourd'hui

### Qui est responsable de vos données ?

Manon Garrione, diététicienne-nutritionniste (RPPS `[à compléter]`) et coach sportive, `[à compléter : adresse du cabinet]`, `[à compléter : adresse email de contact]`.

Manon est tenue au **secret professionnel**. Elle seule a accès à vos informations dans l'espace.

### Ce que contient votre espace

- Votre prénom, votre nom, votre adresse email et, si vous l'avez donné, votre téléphone.
- Votre offre, ses dates et vos demandes d'offre (« Je suis intéressée »).
- La date et le lieu de votre prochain rendez-vous (cabinet, visio ou domicile), recopiés par Manon depuis Doctolib. Jamais le motif.
- Vos recettes favorites et votre liste de courses.
- Des informations de sécurité : mot de passe chiffré de façon irréversible, date de votre dernière connexion, journal des connexions et des actions importantes.

Aucune information médicale n'y est enregistrée : ni motif de consultation, ni bilan, ni mesure, ni repas. Le fait d'être accompagnée par une diététicienne est toutefois une information protégée. C'est pourquoi votre espace est hébergé chez un hébergeur certifié pour les données de santé.

### Pourquoi et sur quelle base

| Ce que nous faisons | Base légale |
| --- | --- |
| Créer votre compte, vous donner accès aux contenus de votre offre, afficher votre rendez-vous | Exécution de votre accompagnement (RGPD, art. 6.1.b) ; pour les informations liées à votre prise en charge : prise en charge par une professionnelle de santé tenue au secret (art. 9.2.h et 9.3) `[à valider, AUDIT V2]` |
| Vous envoyer les emails nécessaires (invitation, mot de passe oublié) | Exécution de votre accompagnement (art. 6.1.b) |
| Sécuriser l'espace (double authentification de Manon, blocage après plusieurs erreurs, journal des actions) | Obligation de sécurité (art. 32) et intérêt légitime (art. 6.1.f) |
| Garder la preuve de votre acceptation des conditions d'utilisation | Intérêt légitime : pouvoir prouver l'accord en cas de litige (art. 6.1.f) |

Vos données ne sont ni vendues, ni utilisées pour de la publicité, ni utilisées pour vous profiler. Vos favoris ne sont jamais analysés pour en déduire votre état de santé.

### Qui peut les voir

- **Manon**, seule, depuis un accès protégé par une double authentification.
- **Des prestataires techniques**, qui agissent sur ses instructions, sont tenus à la confidentialité et ne peuvent pas utiliser vos données pour eux-mêmes :

| Prestataire | Rôle | Lieu |
| --- | --- | --- |
| `[à compléter : hébergeur certifié HDS]` | Héberge l'application et la base de données, fait les sauvegardes | France `[à compléter : ville]` |
| Brevo (Sendinblue SAS) | Envoie les emails (invitation, mot de passe) ; aucune information de santé dans les emails | Union européenne `[à vérifier]` |
| `[à compléter : personne ou société chargée de la maintenance de l'application]` | Met à jour l'application ; n'accède à la base que pour une intervention demandée par Manon, tracée | France |

Aucune donnée ne quitte l'Union européenne `[à vérifier pour chaque prestataire, y compris leurs propres sous-traitants]`.

### Combien de temps

| Données | Durée `[à valider par Manon, AUDIT V7]` |
| --- | --- |
| Compte, offre, favoris, liste de courses | Pendant votre accompagnement. Après la fin de votre dernière offre, votre espace reste lisible `[3 mois]`, puis votre compte est supprimé `[dans les 3 mois suivants]`, sauf si vous reprenez une offre. |
| Rendez-vous | Supprimé 30 jours après sa date. |
| Demandes d'offre | 1 an. |
| Journal des actions et des connexions | 1 an. |
| Preuve de votre acceptation des conditions d'utilisation | 5 ans après la suppression du compte (délai de prescription). |
| Factures | 10 ans, dans l'outil comptable de Manon (obligation légale), pas dans l'espace. |

Le dossier de consultation tenu par Manon (bilan, notes) n'est pas dans l'espace : il est conservé dans son outil professionnel, selon les règles applicables aux professionnels de santé.

### Cookies

L'espace dépose un seul cookie, `gm_session`, qui vous garde connectée (30 jours au plus ; 12 heures pour Manon). Il est indispensable au service et ne demande pas votre accord (loi Informatique et Libertés, art. 82). Aucun cookie de mesure d'audience ni de publicité.

### WhatsApp

Pour les offres qui l'incluent, vous pouvez écrire à Manon sur WhatsApp. WhatsApp est un service de Meta, chiffré de bout en bout, mais Meta traite des données de connexion. Utilisez-le pour la prise de contact et gardez les détails de santé pour la consultation. En cas d'urgence médicale, appelez le 15 ou le 112.

### Sécurité

Connexion chiffrée (HTTPS), mots de passe jamais stockés en clair, double authentification obligatoire pour Manon, blocage après 5 essais, hébergement certifié, sauvegardes, journal des accès. En cas de violation de données présentant un risque pour vous, Manon prévient la CNIL sous 72 heures et vous informe si le risque est élevé (RGPD, art. 33 et 34).

### Vos droits

Vous pouvez demander à tout moment :
- une copie de vos données (accès) et leur transmission dans un format lisible (portabilité) ;
- leur correction ;
- leur suppression, et la fermeture de votre compte ;
- la limitation d'un traitement, ou vous opposer à un traitement fondé sur l'intérêt légitime ;
- définir des directives sur le sort de vos données après votre décès.

Écrivez à `[à compléter : adresse email de contact]` ou demandez-le à Manon en consultation. Réponse sous un mois. Une pièce d'identité ne vous sera demandée qu'en cas de doute sur votre identité.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr).

---

## Partie 2 : suivi nutritionnel et évolution `[PRÉVUE POUR L'ÉTAPE 2 : NE PAS PUBLIER AVANT L'AIPD ET LA VALIDATION DU CONSENTEMENT]`

### Les rubriques concernées

Avec l'étape 2, votre espace peut contenir des **données de santé** :
- **Semainier partagé** : les repas que vous notez (ce que vous avez mangé, la quantité, vos remarques), vos semainiers proposés, et les réponses de Manon ;
- **Évolution** : votre poids (facultatif), votre énergie et votre sommeil (notés de 0 à 10), vos symptômes digestifs ;
- **Mon cycle** (facultatif) : jours de règles et leur abondance, signes d'ovulation, symptômes prémenstruels.

### Votre accord

Chaque rubrique ne s'ouvre qu'après votre **accord explicite**, donné dans l'application la première fois que vous l'ouvrez (texte : `legal/consentement-sante.md`). Vous pouvez retirer cet accord à tout moment dans votre profil, aussi facilement que vous l'avez donné. Refuser ou retirer votre accord ne change ni le prix de votre offre ni vos consultations : Manon vous remet alors votre semainier en consultation `[à valider, AUDIT V2]`.

Base légale : votre consentement explicite (RGPD, art. 9.2.a) `[ou, pour le semainier inclus dans votre offre, la prise en charge par une professionnelle de santé (art. 9.2.h) ; à trancher avec l'avocat]`.

### Qui voit quoi

- Vous voyez tout ce que vous avez noté et les réponses de Manon.
- Manon voit vos repas notés, vos semainiers **une fois envoyés** (pas vos brouillons), vos mesures, et votre cycle si vous l'avez activé. Chacune de ses consultations de ces données est enregistrée dans un journal.
- Manon peut masquer l'affichage du poids pour vous ; vous pouvez aussi le masquer vous-même.
- Personne d'autre. Les prestataires techniques n'y ont pas accès en clair `[à vérifier : chiffrement au repos chez l'hébergeur]`.
- Aucune de ces informations n'apparaît dans un email ou une notification.

### Où et combien de temps

Chez l'hébergeur certifié HDS indiqué plus haut, en France.

| Données | Durée `[à valider, AUDIT V7]` |
| --- | --- |
| Repas notés, semainiers, réponses de Manon, mesures | Pendant votre accompagnement. À la fin, Manon reporte ce qui est utile dans votre dossier de consultation, puis ces données sont supprimées de l'espace `[sous 3 mois]`. |
| Données d'une rubrique dont vous retirez l'accord | Supprimées sous 30 jours. |
| Données du cycle si vous arrêtez le suivi | Supprimées sous 30 jours. |
| Preuve de vos accords et de leurs retraits | 5 ans après la suppression du compte. |

### Ce que ces rubriques ne font pas

Elles ne posent aucun diagnostic. Le suivi du cycle ne prédit ni les règles ni la période fertile et **n'est pas une méthode de contraception**. Les réponses de Manon sont des conseils nutritionnels, en complément de votre suivi médical.

*Dernière mise à jour : `[à compléter]`.*
