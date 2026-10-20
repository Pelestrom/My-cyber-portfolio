# Contexte
React 18 + Vite 6 + TS, framer-motion, lucide-react (versions épinglées, aucune nouvelle dépendance sans accord). Thèmes via data-theme (tokens.css), FR/EN via src/data/i18n.ts et refinement.ts. Ordre CSS : tokens, base, layout, components, sections, responsive, refinement, integration. Sélecteurs souvent dupliqués : modifier à la source, supprimer les doublons.
# Règles
- Lis uniquement les fichiers cités, ne parcours pas le repo.
- Pas de captures d'écran, pas de refactor hors sujet.
- Respecte prefers-reduced-motion et le clavier.
- Vérifie avec `npm run typecheck && npm run build` seulement.
- Réponse finale : 3 lignes max (fichiers modifiés + points à vérifier), sans recopier le code.