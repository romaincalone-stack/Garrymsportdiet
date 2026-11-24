# Liste de contrôle juridique avant chaque mise en ligne

Version du 2026-11-24 · Étapes : `APP_SPEC.md` §9 · Constats détaillés : `legal/AUDIT.md` (numéros entre parenthèses) · **Rien ici ne garantit l'absence de risque** : chaque étape passe aussi la liste « Profession » de `APP_SPEC.md` §8 et la relecture d'un avocat ou de l'AFDN pour les points marqués ⚖.

Chaque case est obligatoire avant d'ouvrir l'étape, sauf mention « recommandé ».

## Avant tout (une fois)

- [ ] Informations de Manon fournies : adresse du cabinet (S6), SIRET, numéro RPPS (S2), diplôme de diététique, diplôme et carte professionnelle de coach, email et téléphone professionnels, assureur RCP (O3).
- [ ] Régime de TVA tranché avec l'expert-comptable ; mention fiscale choisie (S4) ⚖.
- [ ] Médiateur de la consommation choisi et adhésion faite (S7).
- [ ] Recherche de marque INPI « GM Sport et Nutrition » et « méthode Garry M » (P3, recommandé).
- [ ] Cession écrite des droits du développeur à Manon (P4, recommandé).
- [ ] Comptes des services ouverts au nom de Manon (`INTEGRATIONS.md`).

## Étape 0 : site vitrine et Mon assiette sans photo

- [ ] Pages Mentions légales, Confidentialité, CGV en ligne et liées depuis le pied de page du site et de `assiette.html` (S1) ; textes : `mentions-legales.md`, `confidentialite-site.md`, `cgv.md`.
- [ ] Titre, RPPS, diplôme et carte de coach affichés (S2).
- [ ] Textes des formules limités à ce qui existe (S3) : pas de semainier relu, d'évolution, de vidéos, de séances collectives ni de « mois d'application offert » tant que les étapes 1 à 3 ne sont pas ouvertes.
- [ ] « Tarifs indicatifs, en cours de validation » retiré ; prix fermes avec mention TTC ou TVA ; prix du coaching affiché (S4).
- [ ] Rédaction de l'engagement choisie (option 1 recommandée) et reprise sur le site (O1) ⚖.
- [ ] Photos provisoires remplacées, autorisations écrites des personnes photographiées (S5).
- [ ] Adresse du cabinet confirmée par Manon (S6).
- [ ] Polices et bibliothèques hébergées sur le site, plus aucun appel à Google Fonts ni CDN (S8).
- [ ] Formulations santé corrigées : carte « Santé féminine », Q1, Q2, phrase sur la prescription médicale (S9, S10) ⚖.
- [ ] Bouton « Mon espace » masqué (S14).
- [ ] Mon assiette : photo désactivée ; phrases « les photos ne sont pas conservées » retirées tant que la photo n'est pas ouverte (A1) ; mention « pas un dispositif médical » (A4, recommandé) ; décision de Manon sur l'affichage des calories (A3) ⚖.
- [ ] Table Ciqual régénérée depuis le site officiel de l'Anses, version et date citées (A6).
- [ ] Aucun outil de mesure d'audience avec cookie ; si mesure sans cookie, paragraphe ajouté à la politique.
- [ ] Registre des traitements ouvert (T6) ; DPA Cloudflare accepté.

## Étape 1 : comptes et espace « socle »

- [ ] ⚖ Position de l'avocat sur la qualification « données de santé » et la base légale 9.2.h (V1, V2). Tant qu'elle n'est pas obtenue : hébergement HDS (partie A de l'audit).
- [ ] Contrat signé avec une plateforme **certifiée HDS pour les 6 activités**, au nom de Manon ; certificat vérifié dans la liste de l'Agence du numérique en santé ; stockage en France ou dans l'UE ; contrat conforme à R.1111-11 (décret n° 2026-209) (E5).
- [ ] Contrats de sous-traitance (art. 28) : hébergeur, Brevo, mainteneur ; engagement de confidentialité du développeur (E5, P1).
- [ ] Pages publiques de l'espace : `/conditions` (`cgu-espace.md`), `/confidentialite` (`confidentialite-espace.md`, partie 1), `/mentions-legales`, `/cgv` (E1, E3, E4).
- [ ] Case d'activation liée aux conditions ; version et date d'acceptation enregistrées (E1, E2) ; `DATA_DICTIONARY.md` mis à jour.
- [ ] « Mes offres » : mention fiscale et lien vers les CGV (E6).
- [ ] Profil : adresse email pour exercer ses droits (E7, recommandé).
- [ ] Numéro RPPS saisi dans Réglages (le composant `Legal` l'affiche).
- [ ] Thèmes de recettes sans nom de maladie (E9).
- [ ] Emails : signature sans le titre, liens vers les conditions, journaux Brevo réduits (M1, M2, recommandé).
- [ ] Durées de conservation validées par Manon et purges prévues (comptes, rendez-vous, demandes, jetons, journal) (V7).
- [ ] Registre complété (T1 à T5) ; procédure de violation de données connue de Manon et du mainteneur.
- [ ] Recommandé : règle de mot de passe renforcée (E8).

## Étape 2 : suivi nutritionnel (données de santé)

- [ ] **AIPD terminée** et conservée (logiciel PIA de la CNIL) ⚖.
- [ ] ⚖ Texte de consentement validé (`consentement-sante.md`) ; base légale tranchée (9.2.a ou 9.2.h) et alternative gratuite au semainier en ligne (V2).
- [ ] Consentement par rubrique à la première ouverture, retrait depuis le profil, suppression sous 30 jours, preuve conservée.
- [ ] Partie 2 de `confidentialite-espace.md` publiée.
- [ ] Accès de Manon aux données de santé tracés ; brouillons des semainiers invisibles pour elle.
- [ ] Aucune donnée de santé dans les emails et notifications (vérification des modèles).
- [ ] Restauration de sauvegarde testée chez l'hébergeur ; chiffrement au repos vérifié.
- [ ] Sort des données en fin de suivi décidé (export vers le dossier patient, puis suppression) (V7).
- [ ] Cycle : mentions « pas une méthode de contraception », « ne prédit pas » visibles.
- [ ] Prudence TCA : poids facultatif et masquable, aucun objectif chiffré ⚖ (V9).
- [ ] Site : textes du semainier relu et de l'évolution réactivés seulement maintenant (S3).

## Étape 3 : sport

- [ ] Autorisations écrites des personnes filmées ; musique avec licence commerciale (P5).
- [ ] DPA Bunny Stream ; vidéos non indexées et non partageables publiquement.
- [ ] Consignes de sécurité sous les vidéos et dans les conditions (arrêt en cas de douleur, avis médical) ; question de l'avis médical avant les séances tranchée ⚖.
- [ ] Assurance couvrant les séances collectives en visio et le coaching à domicile (O3).
- [ ] Carte professionnelle valide et affichée ; mentions mises à jour.
- [ ] Site : vidéos et séances collectives réactivées (S3).

## Étape 4 : paiement et factures

- [ ] CGV finales validées ⚖, version datée, acceptées avant chaque paiement (case non pré-cochée).
- [ ] Récapitulatif de commande avec prix TTC, durée, engagement, conditions d'arrêt, avant le bouton « Commande avec obligation de paiement » (ou formule équivalente sans ambiguïté) `[à vérifier : C. conso, art. L.221-14]`.
- [ ] Demande expresse de commencer pendant le délai de rétractation, et formulaire de rétractation envoyé par email (O2).
- [ ] Fonction « Résilier mon offre » dans l'espace, accessible facilement (E12 ; C. conso, art. L.215-1-1 et D.215-1 à D.215-3).
- [ ] Email de fin de période envoyé entre J-60 et J-30 si l'offre continue d'elle-même (E11 ; L.215-1).
- [ ] Remboursement des consultations non réalisées automatisé ou procédure écrite (option 1 de l'article 6).
- [ ] Factures conformes (numérotation continue, mentions de TVA, note d'honoraires pour la mutuelle) ; conservation 10 ans.
- [ ] Mandat SEPA si prélèvement ; DPA du prestataire de paiement ; registre (T13).

## Étape 5 : photo dans Mon assiette

- [ ] Précision mesurée sur 20 à 30 repas pesés (`tools/eval-assiette/`) et annoncée honnêtement (C. conso, art. L.121-2).
- [ ] Conditions commerciales et DPA d'Anthropic acceptés au nom de Manon ; durée de conservation et absence d'entraînement vérifiées le jour même ; conservation nulle demandée si possible (A1).
- [ ] Textes de `assiette.html` corrigés (A1) et section « analyse des photos » de `confidentialite-site.md` publiée.
- [ ] Empreinte d'IP au lieu de l'IP dans la limite d'usage (A2, recommandé).
- [ ] Plafond de dépense mensuel fixé sur la console Anthropic.
- [ ] Registre (T7) mis à jour.
