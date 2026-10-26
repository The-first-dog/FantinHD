# FantinHD

Site officiel de **FantinHD**, développeur indépendant de jeux vidéo sur PC et mobile.

**Site public (si GitHub Pages est activé) :** https://the-first-dog.github.io/FantinHD/

## Les jeux présentés

| Jeu | Plateforme | État | Lien |
| --- | --- | --- | --- |
| Farkle — Medieval Dice Game | Android | Disponible | [Google Play](https://play.google.com/store/apps/details?id=com.FantinHD.Farkle) |
| Clean Glass | Android | Disponible | [Google Play](https://play.google.com/store/apps/details?id=com.FantinHD.CleanGlass) |
| 3.2M (3 200 000) | Mobile | En développement | À venir |
| 2:00:00 | PC | En développement | À venir |
| Projet non annoncé | — | Confidentiel | À venir |

## Site / direction artistique

Une identité éditoriale originale pour FantinHD, inspirée de l'approche **sobre, immersive et centrée sur les jeux** d'[Embark Studios](https://www.embark-studios.com/). Les illustrations du site sont créées spécialement pour FantinHD : elles sont **conceptuelles et provisoires**, et ne prétendent pas représenter de vraies captures des jeux. Aucun média ni code d'Embark Studios n'est utilisé.

## Structure

- `index.html` : page d'accueil et sections des jeux, présentation, actualités.
- `styles.css` : mise en page, couleurs, typographie, animations et responsive.
- `app.js` : filtres, menu mobile et fenêtres de présentation des jeux.
- `assets/*.svg` : visuels vectoriels originaux (aucune dépendance réseau).

HTML5, CSS3 et JavaScript natif. Aucun framework, aucune clé API, aucun cookie de suivi.

## Voir le site en local

Télécharge ce dépôt en ZIP (Code → Download ZIP), décompresse-le, puis ouvre `index.html` dans ton navigateur. Les liens et les images fonctionnent sans serveur.

## Publication avec GitHub Pages

1. GitHub → **Settings** → **Pages**.
2. Dans **Build and deployment**, sélectionner **Deploy from a branch**.
3. Choisir `main` et `/(root)`, puis enregistrer.
4. Ouvrir https://the-first-dog.github.io/FantinHD/

## Modifier les projets

Les cartes des jeux sont dans `index.html` et les contenus des fenêtres de détails dans l'objet `games` en haut de `app.js`. Les visuels peuvent être remplacés en conservant les chemins d'images ou en modifiant les attributs `src`.

Les vrais liens de téléchargement sont volontairement absents pour les jeux non publiés. Ne pas ajouter d'informations privées, de clés d'API ni de ressources internes à ce dépôt public.

---

© FantinHD. Tous droits réservés.