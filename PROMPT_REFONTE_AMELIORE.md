# Refonte du portfolio Pelestrom — brief exécutable

Mise à jour prioritaire du 16 octobre 2026 : utiliser le nouveau CV pour les dates (BNETD DevSecOps mai–juillet 2025 ; BNETD/PADA juillet–septembre 2024). Le portrait cinématographique sans distorsion sert au hero animé, le portrait déjà dématérialisé à À propos. Les deux captures réelles illustrent VERITAS et les vulnérabilités. Utiliser le logo ELECTROCENTER fourni et séparer visuellement INSA / HESTIM. Les technologies doivent toutes provenir du CV, y compris des stacks de projets.

## Mission et périmètre

Tu es directeur artistique et développeur front-end senior. Améliore le projet React existant de **Pélé Abou Ouattara / Pelestrom**. Conserve Vite, React, TypeScript strict, les données dans `src/data`, le bilingue FR/EN, les ancres, les justificatifs et les fonctions utiles.

Le site présente un **étudiant en cyberdéfense et sécurité de l’information recherchant un stage**. Le contenu est centré sur la cybersécurité. Les affiches fournies illustrent certains projets : aucune galerie de création digitale et aucun positionnement commercial de designer. ELECTROCENTER reste une expérience réelle du CV, avec des missions fidèles au document.

Livre un projet autonome dans un ZIP téléchargeable, sans backend, clé API, CDN ou service requis au runtime. Pas de publication publique sans demande explicite. Ne remplace pas le code par une simple image ou une maquette.

## 1. Diagnostic avant modification

1. Lire le code, le README, les tests et `A_COMPLETER.md`.
2. Vérifier les documents et les fichiers disponibles ; ne pas supposer qu’un logo ou un nouveau portrait a été joint.
3. Consulter le répertoire de références fourni et sélectionner 3 à 5 portfolios pertinents. Pour chaque référence, noter une qualité observable, son adaptation à Pelestrom et ce qu’il faut laisser de côté.
4. Distinguer une analyse de contenu HTML d’une inspection visuelle en navigateur. Ne jamais prétendre avoir vu une animation ou un breakpoint sans l’avoir observé.
5. Présenter un plan bref : palette, rôles typographiques, composition, trois priorités et critères de validation. Utiliser une liste ou un schéma rendu si utile ; pas de croquis ASCII.

La référence sert à guider des principes : hiérarchie, espace, rythme, navigation, interactions. Ne pas copier la composition complète, les textes, les chiffres, les assets ou le code d’un autre portfolio.

## 2. Fidélité du parcours

Priorité : instructions explicites de l’utilisateur, CV, certificats, autres preuves documentaires, puis brief.

- Ne rien inventer : dates, mobilité, outils pratiqués, résultats, indicateurs, liens, employeurs ou responsabilités.
- Ne pas ajouter une technologie seulement parce que son logo est disponible ou pour remplir une grille.
- Un outil de laboratoire n’est pas une expérience professionnelle.
- Ne pas déduire un niveau de maîtrise du CV, d’un certificat, d’une capture ou du nombre de logos.
- Conserver les intitulés et la portée des missions BNETD ; distinguer les deux fonctions sans doubler artificiellement les employeurs.
- Présenter HESTIM et INSA dans des cartes distinctes avec des logos indépendants et bien lisibles, tout en expliquant leur double diplomation et en conservant les deux intitulés officiels. Ne pas suggérer un déplacement Casablanca–France ni des diplômes obtenus si cela n’est pas documenté.
- Conserver INP-HB sans afficher les dates et le lieu incohérents du CV tant qu’ils ne sont pas corrigés.
- Distinguer certification, formation terminée et participation. Les attestations Red Hat ne sont pas RHCSA/RHCE.
- Les données manquantes restent nullables, masquées proprement et documentées dans le code. Aucun TODO visible sur la page publique.

Prévoir `level: 'pratique' | 'notions' | null` pour les outils si nécessaire. **Null est la valeur par défaut** ; afficher un niveau uniquement après confirmation.

## 3. Concept : un laboratoire cyber lisible

Créer un environnement d’analyse numérique crédible et mémorable. Le portrait fragmenté constitue la signature ; le reste laisse respirer les contenus.

Trois principes :
1. Une identité immédiatement identifiable.
2. Des projets et des preuves faciles à examiner.
3. Des interactions qui répondent à une action et respectent l’attention.

La lecture du nom, du statut, des projets et des coordonnées doit fonctionner avant toute animation. Éviter les fausses alertes, la télémétrie inventée et les décorations qui ressemblent à des résultats réels.

Le HUD peut afficher l’heure réelle de Casablanca via `Intl.DateTimeFormat` et la progression du scroll. Ne pas présenter de coordonnées géographiques comme celles du visiteur. Pas de géolocalisation demandée pour un effet visuel.

## 4. Système visuel et thèmes

Deux ambiances complètes : **Night Ops** et **Daylight Lab**, avec un choix Système / Sombre / Clair mémorisé.

- Centraliser les couleurs UI dans `tokens.css` : fonds, surfaces, textes, lignes, accents, focus, plaques de logos et ombres.
- Préserver les couleurs des documents, marques et images d’origine. Les métadonnées officielles de marque constituent une exception documentée à la règle des couleurs UI centralisées.
- Les fonds et contrastes du thème clair doivent être conçus, pas obtenus par une simple inversion.
- Calculer les contrastes : 4,5:1 pour les textes ordinaires ; 3:1 pour les éléments d’interface nécessaires et les focus.
- Résoudre le thème avant le premier rendu pour éviter le flash, avec gestion des erreurs de stockage.
- Respecter `color-scheme`, les changements de préférence système et la méta `theme-color`.
- Proposer des contrôles clavier avec des états ARIA correspondant au vrai composant : boutons radio pour un choix exclusif ou `aria-pressed` pour un bouton à bascule.
- Utiliser View Transitions seulement lorsque disponible ; repli immédiat ou fondu discret, sans animation en mode reduced motion.

Typographie : choisir un duo expressif pour les titres et le corps, avec une police mono réservée aux commandes ou aux données techniques. Titres hiérarchisés, corps confortable, textes auxiliaires au moins 11–12 px. Éviter les capitales espacées systématiques et les descriptions techniques en micro-texte.

Répartir les styles dans des fichiers lisibles. Ne pas ajouter indéfiniment des overrides au bas d’un fichier : consolider les règles devenues obsolètes et préserver les composants fonctionnels.

## 5. Logos et images

### Outils

- Préférer les SVG de marque distribués par Simple Icons lorsqu’ils existent, ou les assets du site/dépôt officiel de l’outil.
- Enregistrer source et conditions de licence connues. La présence d’un logo dans un package ne vaut pas autorisation de suggérer une affiliation.
- Ne pas inventer de logo, de monogramme ni utiliser celui d’un autre produit comme substitut.
- Si le logo manque : afficher **le nom de l’outil en texte**, proprement, et documenter l’asset à fournir. Ne pas faire échouer un test uniquement parce qu’un outil réel n’a pas d’illustration.
- Ne placer dans les fragments du hero que des outils disposant d’un visuel fiable.
- Sur chaque thème, vérifier le contraste par rapport au fond réel de la pastille. Utiliser une variante monochrome si la couleur de marque ne passe pas.
- Un script local peut synchroniser les SVG ; aucun téléchargement au runtime.

### Établissements et entreprises

Rogner les marges inutiles sans couper les signes. Utiliser des plaques cohérentes, une taille optique comparable et `object-fit: contain`. ELECTROCENTER peut rester un nom en texte tant que son logo n’a pas été fourni ; ne jamais afficher le nom deux fois pour compenser.

### Portrait

Préserver strictement le visage et l’identité. Corriger le halo du détourage, en protégeant la chemise blanche et les lunettes. Vérifier le résultat sur des fonds sombres et clairs. Un script spécifique à un cadrage doit le préciser.

Ne pas reconstruire silencieusement des épaules absentes du fichier source. Si une source plus large ou plus définie est nécessaire, conserver le meilleur cadrage possible et le signaler.

Optimiser les images, fournir leurs dimensions et garder les PDF originaux. Chargement prioritaire du portrait ; chargement différé des médias non critiques.

## 6. Hero signature

Conserver le nom et le statut en vrai HTML. À gauche : identité, phrase de positionnement, description courte et actions Projets / CV. À droite : portrait avec désintégration partielle progressive.

Effet attendu : tranches horizontales, fragments issus du portrait et léger décalage chromatique. Les fragments réagissent au pointeur et reviennent avec une interpolation ou un ressort stable. Le scroll peut moduler discrètement la recomposition.

**Choisir un moteur principal adapté**. Canvas 2D est acceptable si le rendu répond au besoin. WebGL n’est justifié que par un gain visuel ou technique vérifiable ; ne pas maintenir deux moteurs complexes sans nécessité. Prévoir dans tous les cas une image statique de secours.

- Logos hors de la zone du visage et de la colonne de texte.
- Positions calculées selon le conteneur, peu de logos sur mobile.
- Info-bulles lisibles au survol et au focus.
- Résolution plafonnée, budget de fragments adaptatif, pause hors écran et onglet masqué.
- Aucune mise à jour d’état React à chaque frame de rendu Canvas.
- Aucun mouvement imposé via gyroscope et aucune permission capteur nécessaire.

Le site doit rester convaincant lorsque les animations sont désactivées. Une introduction de boot est optionnelle, courte et désactivable ; elle ne doit pas retarder artificiellement l’accès au contenu.

## 7. Sections et interactions

### Profil

Présentation éditoriale concise, fondée sur le CV. Trois chiffres maximum, calculés depuis les données et correctement nommés. Les centres d’intérêt restent secondaires.

### Compétences

Conserver outils, méthodes et standards distincts. Un domaine avec un seul outil peut être riche en méthodes : aucune quantité minimale de logos. Filtres accessibles et transition sobre. Les liens outils–méthodes doivent être explicites, sans graphe décoratif prétendant montrer une expertise mesurée.

### Projets

Mise en avant de VERITAS, puis des autres projets confirmés. Filtres par domaine si utiles. Chaque projet expose le problème, la contribution, la stack, les preuves et les liens réels.

Les illustrations conceptuelles doivent être identifiées visiblement. Les affiches servent d’illustration, pas de preuve de validation technique. Ne pas convertir une illustration en fausse capture d’application.

Un détail peut s’ouvrir dans la page ou dans un dialogue accessible. Préserver le contexte, les liens et les images ; ne pas sacrifier la lisibilité pour une transition partagée.

### Certifications

Utiliser les documents originaux, dates et identifiants. Conserver filtres, inclinaison et reflet adaptés à la souris ; sur tactile, préserver le scroll naturel. Ajouter un accès direct au PDF. La lightbox doit gérer Échap, focus, retour au déclencheur, zoom et défilement.

### Expérience et formation

Une présentation chronologique compréhensible, des missions courtes et fidèles. Regrouper visuellement les fonctions d’un même employeur sans modifier les intitulés. Conserver les deux établissements dans des cartes distinctes avec leurs logos lisibles ; indiquer le contexte de double diplomation sans fusionner les programmes.

### Contact

Email, copie, LinkedIn, GitHub et CV restent accessibles sans terminal. Un terminal optionnel peut reconnaître une liste fermée de commandes locales : help, contact, cv, github, linkedin, theme, lang, clear.

Aucun `eval`, shell, exécution distante, formulaire d’envoi fictif ni fausse surveillance du visiteur. Les commandes produisent du texte et des liens explicites. Les easter eggs sont secondaires ; pas de glitch maximal ni de clignotements rapides.

## 8. Architecture, SEO et déploiement

Conserver une structure claire et des données éditables. Les URL et textes professionnels restent centralisés. Tous les assets sont locaux. Les liens externes sont des actions du visiteur.

Prévoir la racine du domaine et un sous-répertoire GitHub Pages. Utiliser le `base` Vite pour les médias et les documents.

Le domaine final est une configuration publique optionnelle, sans variable d’environnement obligatoire. Une fois connu : canonical, og:url, og:image absolue, robots, sitemap et carte de partage 1200×630. Ne pas générer d’URL fictive pour satisfaire une checklist.

FR/EN sur une même URL : mise à jour de `lang`, titres et descriptions. Pas de faux `hreflang` vers deux URL qui n’existent pas. Données Person fondées sur l’identité réelle, sans certifications ou rôles ajoutés par inférence.

## 9. Vérification et budgets

Objectifs, à mesurer lorsqu’un navigateur et un protocole de test sont disponibles : LCP < 2,5 s, CLS < 0,05, INP < 200 ms et fluidité du hero. Indiquer les conditions, l’appareil et les limites. Ne jamais annoncer « 60 fps », « Lighthouse 90+ » ou « responsive vérifié » sans mesure ou inspection.

Contrôles indispensables :
- installation propre depuis le ZIP ; typecheck et build ;
- FR/EN et persistance ; trois modes de thème et changements système ;
- filtres, clavier, dialogues, zoom, copie, téléchargements et ancres ;
- références des assets, chemins sous-répertoire et absence de secrets ;
- palette de contraste calculée, intégrité des données et fallback texte des logos ;
- inspection visuelle aux largeurs pertinentes (360/390, 768, 1024, 1440), deux thèmes et reduced motion.

Les tests DOM ne valident ni le rendu Canvas ni la mise en page. Si le navigateur est indisponible, terminer les autres contrôles et l’indiquer précisément, sans fabriquer de captures. Ne pas écrire de tests qui imposent des données ou des logos inventés.

## 10. Livrables

1. ZIP complet : source, lockfile, assets, PDF, documentation et build si utile.
2. README actualisé : lancement, contenu, thèmes, logos, certificats, domaine et déploiement.
3. Changelog distinguant ce qui est fait de ce qui reste à confirmer.
4. Notes de références avec liens et adaptations retenues.
5. Résultats réels des vérifications et limites.

Exclure node_modules, caches, fichiers temporaires et chemins propres à l’environnement. Le projet doit fonctionner après extraction avec `npm ci`, `npm run dev`, `npm run build` et `npm run preview`.

Avancer sur les améliorations autorisées sans attendre les médias optionnels manquants. Les manques empêchent seulement l’affichage de l’information concernée, pas la livraison du reste.
