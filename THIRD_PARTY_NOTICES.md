# Assets et dépendances

Les portraits, affiches, logos d’établissements et certificats proviennent des documents fournis par le propriétaire du portfolio. Ils restent associés à leurs titulaires et émetteurs.

Les SVG d’outils disponibles ont été extraits du package `simple-icons`, conservé dans les dépendances de développement. Les autres outils sont affichés par leur nom complet, sans monogramme. La provenance des SVG est enregistrée dans `src/data/tools.generated.json`. Les noms et marques restent la propriété de leurs titulaires.

Les polices Syne, Instrument Sans et JetBrains Mono sont auto-hébergées depuis les packages `@fontsource`. Leurs licences sont jointes dans `licenses/`.

Les icônes d’interface sont fournies par `lucide-react`. Les licences des dépendances restent disponibles dans leurs packages après `npm ci`.

Le script `scripts/sync-icons.mjs` extrait les glyphes de Simple Icons 14.11.0 et conserve leurs sources amont et métadonnées de licence disponibles. Les couleurs de marque peuvent être remplacées à l’affichage par une version monochrome afin de conserver la lisibilité.

## Logos officiels ajoutés avec les technologies du CV

Les fichiers, URL sources et identités sont enregistrés dans `src/data/tools.external.json` : Nmap, PowerShell, Sigma, YARA, Chainsaw et l’organisation officielle Security Onion Solutions. Les dessins n’ont pas été recréés. YARA conserve ses chemins et couleurs ; seul le viewport vide a été rogné. Chainsaw et l’identité de l’éditeur Security Onion ont été convertis en WebP.

- Nmap : https://nmap.org/images/nmap-logo-64px.svg
- PowerShell : https://github.com/PowerShell/PowerShell/tree/master/assets
- Sigma : https://github.com/SigmaHQ/sigmahq.github.io/tree/main/public/images ; logo déclaré public domain dans https://github.com/SigmaHQ/sigma/blob/master/LICENSE
- YARA : https://github.com/VirusTotal/yara/blob/master/extra/logo.svg
- Chainsaw : https://github.com/WithSecureOpenSource/chainsaw/tree/master/images
- Security Onion Solutions : https://github.com/Security-Onion-Solutions (identité officielle de l’éditeur)

Ces marques servent à identifier les technologies pratiquées ; aucune affiliation ni accréditation supplémentaire n’est suggérée. Les conditions et droits amont restent applicables. Kotlin, Jetpack Compose et Streamlit proviennent du package Simple Icons déjà présent.
