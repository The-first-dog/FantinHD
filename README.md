# FantinHD — Site officiel

Site vitrine de **FantinHD**, développeur indépendant de jeux PC et mobile.

- **Site :** https://the-first-dog.github.io/FantinHD/ (GitHub Pages, branche `main`, dossier `/`)
- **Style :** noir, typographie massive, grandes images de jeux, lignes fines. Inspiré de la sobriété des sites de studios comme Embark Studios ; tout le code, les textes et les visuels sont propres à FantinHD.

## L'accueil : logo 3D interactif

Le logo de l'accueil est rendu en direct (Three.js, chargé depuis jsDelivr) avec **les réglages officiels** du logo, ceux de [`assets/logo/reglages-fantinhd.txt`](assets/logo/reglages-fantinhd.txt).

- Quand la souris passe sur le logo, les cubes les plus proches se soulèvent dans un rayon autour d'elle et leurs rayons s'éclairent.
- Le bouton carré en bas à droite active ou coupe cet effet. Le choix est mémorisé dans le navigateur. Avec « réduire les animations » activé dans le système, l'effet est coupé par défaut.
- Si la 3D ne peut pas se charger (pas de WebGL, pas d'internet), l'image `assets/logo/logo-complet.png` s'affiche à la place.

Réglages de l'effet : constante `AURA` dans le script en bas de `index.html` (`radius` = rayon en cubes, `lift` = hauteur).

## Fichiers

- `index.html` — structure de la page et logo 3D
- `styles.css` — mise en page, typographie, responsive
- `app.js` — données des jeux, fiches, menu mobile
- `assets/logo/` — logo (lettres, complet, réseaux sociaux) et réglages officiels
- `assets/images/visuels/` — visuels « pixels de verre » des jeux
- `assets/images/` — [tes vraies captures, facultatives](assets/images/README.md)
- `outils/voxel-type/` — l'outil Voxel Type et ses réglages, pour refaire le logo ou de nouveaux visuels

## Modifier un jeu

Dans `app.js`, tableau `games` : nom, statut, textes, lien Google Play.

## Mettre en ligne

Settings → Pages → Build and deployment : **Deploy from a branch** → `main` → `/(root)`.

© FantinHD, tous droits réservés.
