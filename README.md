# Pelestrom — Portfolio cybersécurité

Portfolio statique de **Pélé Abou Ouattara**, en React 18, TypeScript et Vite.
Interface FR/EN, Canvas de fragmentation du portrait, projets documentés, certifications inclinables et lightbox accessible. Les affiches illustrent les projets : aucune galerie de création digitale.

## Mise à jour 2.1 : CV et médias

Voir `CHANGELOG_2.1.md` pour les dates corrigées et l’affectation des nouveaux fichiers.

- Hero : `src/assets/hero-source.webp`, photographie sans distorsion fournie, avec animation Canvas. Modifier ensemble portraitWidth / portraitHeight dans profile.ts si la source change.
- À propos : `src/assets/portrait-secondary.webp`, photographie déjà dématérialisée fournie.
- VERITAS : `src/assets/veritas-dashboard.webp` ; Vulnérabilités : `src/assets/vulnerability-dashboard.webp`.
- ELECTROCENTER, INSA et HESTIM : nouveaux fichiers de logos, avec plaques indépendantes.
- `tools.external.json` documente les logos externes officiels ; `tools.generated.json` reste réservé à Simple Icons.
- Chaque technologie ajoutée existe dans le CV ou dans l’une de ses stacks de projets. Les standards et les méthodes ne sont pas transformés en logos de logiciels.
- Les outils de type `image` gardent leur dessin original sur une plaque claire ; les glyphes de Simple Icons utilisent un masque adaptatif.
- Les tailles et positions du hero sont calculées dans `heroGeometry.ts`. Les tests vérifient l’absence de chevauchement et la zone réservée au visage.

## Nouveautés de cette version

Voir `CHANGELOG_V2.md`, `DESIGN_REFERENCES.md` et `PROMPT_REFONTE_AMELIORE.md`.

Choix **Système / Sombre / Clair** dans la navigation. Les outils sans logo officiel disponible restent nommés en texte ; aucun niveau pratique/notions n’est déduit automatiquement.

```bash
npm run test:design
npm run icons:sync
```

Le terminal de contact est entièrement local. Il répond uniquement aux commandes documentées ; aucun accès au système ni envoi de message.

## Démarrer

Installer **Node.js 22.12 ou plus récent** (Node 24 compatible), puis ouvrir un terminal dans ce dossier :

```bash
npm ci
npm run dev
```

Ouvrir l’URL indiquée par Vite. Aucun compte, backend, variable d’environnement ou clé API nécessaire.

```bash
npm run typecheck
npm run test:smoke
npm run build
npm run preview
```

`npm run preview` sert le dossier de production `dist/`. Ne pas ouvrir `dist/index.html` directement avec `file://` : les modules JavaScript doivent être servis en HTTP.

## Modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `src/data/profile.ts` | Nom, statut, email, réseaux, CV, texte de présentation |
| `src/data/tools.ts` | Outils, SVG locaux, monogrammes et fragments du hero |
| `src/data/skills.ts` | Catégories et méthodes |
| `src/data/projects.ts` | Projets, stacks, liens et visuels |
| `src/data/certifications.ts` | Certifications et attestations, dates, identifiants, justificatifs |
| `src/data/experience.ts` | Missions professionnelles fidèles au CV |
| `src/data/education.ts` | Formation et double diplomation |
| `src/data/i18n.ts` | Textes FR/EN de l’interface |
| `src/data/site.ts` | Labels techniques, paramètres et domaine à compléter |
| `src/styles/tokens.css` | Couleurs sémantiques des deux thèmes et polices |

Un texte éditorial bilingue utilise `{ fr: 'Texte français', en: 'English text' }`. Les titres officiels de certificats restent tels qu’imprimés.

Les tableaux de projets, expériences, formations et certifications utilisent `enabled` et `order`. Les projets et certificats disposent aussi de `featured`. Mettre `enabled: false` pour masquer une entrée. Les liens optionnels absents sont masqués ; ne pas utiliser `#` ou une URL fictive.

## Ajouter un projet

1. Ajouter son image locale optimisée dans `src/assets/` si disponible.
2. Ajouter un objet de type `Project` à `projects.ts` avec un identifiant unique.
3. Compléter `title`, `label`, `description`, `contribution`, `stack`, `enabled` et `order`.
4. Renseigner `githubUrl`, `publicationUrl` et/ou `liveUrl` seulement s’ils existent.
5. Utiliser `image: asset('nom.webp')` pour un visuel réel. Adapter `ProjectVisual.tsx` si une nouvelle composition est souhaitée.

VERITAS et Vulnérabilités utilisent les captures réelles fournies, consultables en grand. Android conserve une illustration conceptuelle explicitement légendée. Les chiffres présents dans les captures font partie des écrans sources ; le site n’invente pas de résultats supplémentaires.

## Ajouter un outil ou un logo

1. Placer un SVG fiable dans `src/assets/tools/`.
2. Ajouter l’entrée à `tools.ts` :

```ts
{ id: 'mon-outil', name: 'Mon outil', level: null,
  category: 'defensive', color: '#6ca9ff',
  svg: asset('tools/mon-outil.svg') }
```

3. Ajouter l’identifiant à `toolIds` dans une catégorie de `skills.ts`.
4. Le hero sélectionne explicitement ses fragments dans `heroTools`.

Sans SVG, seul le nom complet est affiché. `level` reste null tant qu’un niveau n’a pas été confirmé. N’ajouter que les outils réellement pratiqués.

## Ajouter un certificat

1. Copier le PDF dans `public/documents/` avec un nom simple.
2. Préparer une première page WebP de ~1 000 px pour la carte et une de ~2 400 px pour le zoom dans `src/assets/certs/`.
3. Ajouter une entrée à `certifications.ts` avec un identifiant unique.
4. Choisir `kind` : `certification`, `completion` (formation terminée), ou `attendance` (participation).
5. Conserver dates et identifiants des justificatifs. Une date ambiguë peut rester imprimée au format original.
6. Ajouter `verifyUrl` uniquement depuis une source confirmée. Sans URL, le bouton est absent.

Les documents Google et Cisco sont présentés comme certificats de formation. Les documents Red Hat sont des attestations de participation, pas RHCSA/RHCE. Les certificats CWL, Fortinet et CORE sont identifiés séparément.

Les couleurs d’accent sont locales à chaque certificat. Le filtre « Systèmes & formations » regroupe Red Hat et NoSQL. HCIA reste hors de la sélection conformément à la demande précédente.

## Remplacer le CV ou les portraits

- Remplacer `public/documents/Pele-Abou-Ouattara-CV.pdf` pour actualiser le CV téléchargé.
- Remplacer `src/assets/hero-source.webp` pour le hero et `src/assets/portrait-secondary.webp` pour À propos. Ces photographies sont conservées avec leur fond ; aucune suppression de fond n’est nécessaire.
- Mettre à jour les textes de données séparément : le site ne relit pas automatiquement un nouveau PDF.
- Le script optionnel `scripts/prepare_assets.py /chemin/des/fichiers` documente le traitement initial. Le détourage historique est conservé pour référence ; il n’est plus utilisé par le hero actuel. Importer les nouveaux médias avec `scripts/import-current-media.py SOURCE_DIRECTORY`. Il attend les noms des sources fournies ; adapter sa liste pour de nouveaux fichiers.
- Ce script requiert Python, Pillow, NumPy, SciPy et PyMuPDF. **Ils ne sont pas nécessaires pour installer ou lancer le site.**

## Animations et accessibilité

- `PortraitCanvas.tsx` : fragments, pause hors écran/onglet masqué, résolution plafonnée à DPR 2, moins de fragments sur petits écrans.
- `useTilt.ts` : inclinaison souris et interpolation ; tactile sans inclinaison imposée pour préserver le scroll.
- `useDecodeText.ts` : résolution brève des titres au survol.
- `tokens.css` et `site.ts` : palette et paramètres communs.
- Le mode système `prefers-reduced-motion` désactive Canvas animé, curseur, flottement et inclinaison.
- La lightbox utilise un dialogue natif, Échap, zoom, retour du focus et blocage du scroll.
- Les onglets se parcourent avec ←/→, Home/End ; le menu se ferme avec Échap.
- La copie utilise l’API Clipboard en contexte sécurisé. Un message de sélection manuelle apparaît si elle est indisponible.

## Déployer

### GitHub Pages

1. Créer un dépôt GitHub et y déposer le contenu de ce dossier.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Le workflow `.github/workflows/pages.yml` installe, vérifie, build et déploie `dist/` après un push sur `main`.
4. Si la branche principale porte un autre nom, modifier `branches` dans ce workflow.

`vite.config.ts` utilise `base: './'`, et les PDF passent par `import.meta.env.BASE_URL`. Les URLs fonctionnent à la racine et sous `/nom-du-depot/`. Un `base: '/nom-du-depot/'` explicite est aussi possible. Ne pas introduire de chemins commençant par `/assets/` ou `/documents/` dans les données.

### Netlify

- Build : `npm run build`.
- Dossier publié : `dist`.
- Version Node : 22.12+ ou 24.
- `netlify.toml` fournit la configuration de base.

### Vercel

- Preset : Vite.
- Build : `npm run build`.
- Output : `dist`.
- Aucun backend ni rewrite SPA nécessaire pour cette page à ancres.

### Partage et référencement

Renseigner `site.config.json` : `siteUrl` = URL publique finale, avec le sous-répertoire éventuel. Le build génère alors canonical, og:url, og:image absolue et sitemap. Laisser null tant que le domaine est inconnu : aucun faux domaine. Le fichier robots est généré même sans domaine. Les données Person côté client utilisent le profil réel. Le toggle traduit lang, le titre et la description ; aucune seconde URL linguistique fictive.

## Vérifications et limites

Voir `VALIDATION.md` pour les contrôles effectués. Les tests DOM ne remplacent pas une inspection visuelle sur desktop/mobile. Lighthouse et la disponibilité réelle des plateformes externes n’ont pas été mesurés dans cette session.

Les données à confirmer sont listées dans `A_COMPLETER.md`. Les TODO sont des commentaires de code, jamais du contenu public.

## Organisation des styles

`global.css` importe les tokens, les bases, la mise en page, les composants, les sections, les adaptations responsive et les ajustements V2. Les couleurs UI passent par les tokens ; les couleurs officielles des marques restent des métadonnées de leur artwork.

Le boot est désactivé par défaut dans `src/data/site.ts` (`bootEnabled`). Les listes de projets et de certificats restent modifiables sans toucher aux composants.
