# Fantin HD — Site officiel

Site vitrine de **Fantin HD**, développeur indépendant de jeux Android et PC.

- **Site :** https://the-first-dog.github.io/FantinHD/ (GitHub Pages, branche `main`, dossier `/`)
- **Style :** sobre et centré, inspiré de la mise en page du site d'Embark Studios. Le code, les textes et les visuels sont propres à Fantin HD.

## Modifier le contenu (annonces, liens, jeux, textes)

Tout se passe dans le dossier [`contenu/`](contenu/LISEZMOI.md), sans toucher au code :

- une annonce = un dossier dans `contenu/annonces/` ;
- un lien (Steam, YouTube…) = un fichier dans `contenu/liens/` ;
- un jeu = un dossier dans `contenu/jeux/` ;
- les textes généraux sont dans `contenu/site.json`.

À chaque modification de `contenu/` sur GitHub, l'action « Mettre à jour le contenu du site » reconstruit `contenu/contenu (ne pas toucher).js`, et le site se met à jour en 1 à 2 minutes. Le mode d'emploi complet est dans [`contenu/LISEZMOI.md`](contenu/LISEZMOI.md).

## L'accueil : logo 3D interactif

Le logo est rendu en direct (Three.js, chargé depuis jsDelivr) avec les réglages officiels du logo.

- Les cubes proches de la souris se soulèvent et leurs rayons s'éclairent.
- Le bouton rond en bas à droite coupe ou réactive l'effet. Le choix est mémorisé, et l'effet est coupé par défaut quand « réduire les animations » est activé dans le système.
- Un grain très fin évite les paliers de dégradé sur les écrans qui n'en ajoutent pas.
- Si la 3D ne peut pas se charger, l'image `assets/logo/logo-complet.png` s'affiche à la place.

Réglages de l'effet : constante `AURA` dans le script en bas de `index.html`.

## Fichiers

### Ce que tu peux modifier

| Fichier | Rôle |
| --- | --- |
| `contenu/` | Tout le contenu : annonces, liens, jeux, textes ([mode d'emploi](contenu/LISEZMOI.md)) |
| `assets/logo/` | Logos et image de partage (remplace une image en gardant le même nom) |
| `icones/` | Icône de développeur et image d'en-tête pour Google Play ([détails](icones/LISEZMOI.md)) |
| `outils/voxel-type/reglages/` | Réglages sauvegardés de l'outil d'images |

### À ne pas toucher

Les fichiers qui portent « (ne pas toucher) » dans leur nom font tourner le site. Trois autres doivent garder leur nom exact pour que GitHub les reconnaisse, ils sont donc signalés ici et par un avertissement en haut du fichier :

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et logo 3D (nom imposé par GitHub Pages) |
| `_config.yml` | Dossiers exclus du site publié (nom imposé par GitHub Pages) |
| `.github/workflows/contenu.yml` | Mise à jour automatique du contenu (dossier imposé par GitHub) |
| `styles (ne pas toucher).css` | Mise en page, typographie, responsive |
| `app (ne pas toucher).js` | Affiche le contenu de `contenu/`, menu mobile, actualités |
| `contenu/contenu (ne pas toucher).js` | Fabriqué automatiquement à partir de `contenu/` |
| `outils/construire-contenu (ne pas toucher).mjs` | Fabrique le fichier ci-dessus |
| `outils/voxel-type/index.html` | L'outil d'images : à télécharger et ouvrir, pas à modifier |

© Fantin HD, tous droits réservés.
