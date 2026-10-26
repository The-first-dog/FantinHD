# FantinHD — Site officiel

Site vitrine du développeur indépendant **FantinHD**, inspiré de la sobriété et de la mise en valeur des jeux du site [Embark Studios](https://www.embark-studios.com/). Le code et le contenu de ce site sont propres à FantinHD ; aucune image d'Embark n'est réutilisée.

- **Site :** https://the-first-dog.github.io/FantinHD/ (GitHub Pages doit être activé)
- **Dépôt :** https://github.com/The-first-dog/FantinHD

## Ajouter les images

Tu n'as **rien à modifier dans le code** pour ajouter les photos. Va dans [`assets/images/`](assets/images/README.md), puis **Add file → Upload files** sur GitHub.

| Fichier à déposer | Emplacement | Résolution recommandée |
| --- | --- | --- |
| `hero.jpg` | `assets/images/hero.jpg` | 2560 × 1440 px |
| `farkle.jpg` | `assets/images/farkle.jpg` | 1600 × 1000 px |
| `clean-glass.jpg` | `assets/images/clean-glass.jpg` | 1600 × 1000 px |
| `3-2m.jpg` | `assets/images/3-2m.jpg` | 1600 × 1000 px |
| `2-00-00.jpg` | `assets/images/2-00-00.jpg` | 1600 × 1000 px |

`hero.jpg` est facultatif : sans lui, le grand écran d'accueil est entièrement noir avec le nom FantinHD en blanc. Les jeux confidentiels n'ont pas d'image à uploader.

Utilise de vraies captures d'écran ou des visuels de tes jeux. Pas d'images générées artificiellement, pas de médias du site d'Embark. Le site affiche un emplacement discret tant que les photos ne sont pas présentes. Les noms de fichiers sont sensibles à la casse. Exporte au vrai format **JPEG**, ne renomme pas simplement une image PNG.

## Pages du site

- Accueil noir et typographique
- Catalogue des jeux, filtrable par plateforme ou avancement
- Farkle et Clean Glass (disponibles sur Google Play)
- 3.2M et 2:00:00 (en développement)
- Projets non annoncés
- Présentation FantinHD et actualités de développement
- Fiches détaillées et menu mobile

## Fichiers techniques

- `index.html` — structure des pages
- `styles.css` — typographie, mise en page, animations, responsive
- `app.js` — données des jeux, affichage des images, filtres et fiches
- `assets/images/` — **photos à fournir**

Tout fonctionne en HTML/CSS/JavaScript, sans framework, sans tracking ni API privée. Tu peux télécharger le dépôt puis ouvrir directement `index.html` dans un navigateur.

## Mettre en ligne

Settings → Pages → Build and deployment : **Deploy from a branch** → `main` → `/(root)`.

## Modifier ou ajouter un jeu

Dans `app.js`, modifie le tableau `games` et les chemins définis dans `IMAGE_FILES`.

© FantinHD, tous droits réservés.
