# Vérifications 2.1 — 16 octobre 2026

- Installation npm ci, build et tests DOM réussis depuis une extraction neuve du ZIP.
- CV téléchargeable : identité binaire confirmée avec le nouveau PDF fourni (comparaison SHA-256).
- Stages : mai–juillet 2025 pour BNETD DevSecOps ; juillet–septembre 2024 pour BNETD/PADA. Vérifiés dans les données et les tests DOM.
- Technologies : 27 outils et technologies, tous présents dans les compétences ou stacks de projets du CV ; 24 disposent d’un logo. Aucun outil absent du CV ajouté. Les niveaux restent non renseignés.
- Tests de géométrie du hero : cover crop dans les limites du portrait, exclusion de la zone centrale du visage, absence de collisions entre pastilles, adaptation au conteneur et limite mobile.
- Médias : portrait sans distorsion dans le hero, portrait dématérialisé dans À propos, deux captures réelles pour VERITAS et les vulnérabilités, logo ELECTROCENTER et logos INSA/HESTIM distincts.
- Contrôles existants conservés : TypeScript strict, build, FR/EN et persistance, thèmes, filtres, terminal local, onglets clavier, lightbox/zoom/fermeture/retour du focus, copie, téléchargements et ancres.
- Contrastes des paires principales et absence de couleurs UI codées hors tokens vérifiés par test:design.
- Les SVG de technologies ont été analysés : aucune balise script ni référence distante de type image/use dans les fichiers locaux.

## Limites

La preview navigateur reste indisponible dans cette session. Les tests DOM et géométriques ne prouvent pas la qualité du rendu final, le FPS du Canvas, l’animation View Transitions ou la mise en page sur un appareil réel. Aucun score Lighthouse ni benchmark matériel n’est annoncé.

Les images fournies et les logos ajoutés ont été inspectés. Les captures ont été conservées telles que fournies, puis optimisées en WebP ; aucun chiffre n’a été recréé. Les méthodes et standards restent distincts des logiciels. Les dates INP-HB du CV restent incohérentes et ne sont pas inventées.
