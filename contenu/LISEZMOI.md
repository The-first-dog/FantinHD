# Gérer le contenu du site Fantin HD

Tout le contenu du site est dans ce dossier `contenu/`. Tu n'as **jamais besoin de toucher au code**.

**Règle simple :** ne modifie jamais un fichier qui porte « (ne pas toucher) » dans son nom, ni `index.html`, `_config.yml` et le dossier `.github` à la racine du dépôt.

Dès que tu enregistres un changement ici sur GitHub, le site se met à jour tout seul en 1 à 2 minutes. Tu peux suivre ça dans l'onglet **Actions** du dépôt : la ligne « Mettre à jour le contenu du site » doit être verte.

Si elle est rouge, ouvre-la : le message dit exactement quel fichier corriger et pourquoi. Dans ce cas, le site garde son contenu précédent, rien n'est cassé.

## Ce qu'il y a dans ce dossier

| Où | Ce que c'est |
| --- | --- |
| `site.json` | Les textes généraux : la phrase d'accueil, les titres des sections, le bloc « À propos », les mentions en bas de page. |
| `liens/` | **Un fichier par lien** (Google Play, GitHub, Steam…). |
| `jeux/` | **Un dossier par jeu**, avec sa fiche `jeu.json` et son affiche. |
| `annonces/` | **Un dossier par annonce**, avec sa fiche `annonce.json` et son image. |
| `_modeles/` | Des fichiers d'exemple à copier. Ils ne s'affichent jamais sur le site. |
| `contenu (ne pas toucher).js` | Fichier fabriqué automatiquement à partir des autres. |

Pour mettre un texte en **gras**, entoure-le de deux étoiles : `**comme ça**`. Pour aller à la ligne dans un texte, écris `\n`.

---

## Ajouter une annonce

1. Sur GitHub, ouvre le dossier `contenu/annonces/`.
2. Clique sur **Add file → Create new file**.
3. Dans le nom du fichier, tape le nom du dossier, une barre `/`, puis `annonce.json`. Par exemple :
   `2026-11-15_1800_farkle-nouveaux-des/annonce.json`
   
   Le nom du dossier n'apparaît pas sur le site, il sert juste à t'y retrouver. Le plus simple est de commencer par la date et l'heure, puis quelques mots.
4. Colle ce modèle et remplis-le :

```json
{
  "titre": "Farkle : de nouveaux dés",
  "date": "2026-11-15 18:00",
  "afficher": "jour",
  "etiquette": "",
  "texte": "Trois nouveaux skins de dés arrivent dans la boutique.",
  "image": "image.jpg",
  "lien": { "texte": "Voir sur Google Play", "url": "https://play.google.com/store/apps/details?id=com.FantinHD.Farkle" },
  "publie": true
}
```

5. Clique sur **Commit changes**.
6. Ouvre le dossier que tu viens de créer, puis **Add file → Upload files**, et dépose ton image en la nommant `image.jpg`. Elle se fabrique avec l'outil Voxel Type (voir plus bas).

### Les champs d'une annonce

| Champ | Rôle |
| --- | --- |
| `titre` | Le titre affiché. Obligatoire. |
| `date` | Date **et heure**, sous la forme `AAAA-MM-JJ HH:MM`. Obligatoire. Elle sert à ranger les annonces : **la plus récente à gauche, la plus ancienne à droite**. L'heure départage deux annonces du même jour ; elle ne s'affiche jamais. |
| `afficher` | Ce qu'on montre de la date : `"jour"` → « 15 novembre 2026 », `"mois"` → « Novembre 2026 », `"annee"` → « 2026 ». |
| `etiquette` | Facultatif. Remplace la date affichée par un texte, par exemple `"À venir"`. Laisse `""` pour afficher la date. |
| `texte` | Une ou deux phrases. |
| `image` | Le nom de l'image dans le même dossier (`image.jpg`). Format conseillé : 16:9, 1600 × 900 px. Mets `""` s'il n'y a pas d'image. |
| `lien` | Facultatif. Un bouton sous l'annonce. Mets `null` pour ne pas en avoir. |
| `publie` | `true` pour l'afficher, `false` pour la cacher sans la supprimer (brouillon). |

**Modifier une annonce** : ouvre son `annonce.json`, clique sur le crayon ✏️, change le texte, puis **Commit changes**.

**Supprimer une annonce** : mets `"publie": false`, ou supprime son dossier.

---

## Ajouter un lien (Steam, YouTube, Discord…)

1. Ouvre `contenu/liens/`, puis **Add file → Create new file**.
2. Nomme le fichier, par exemple `steam.json`, et colle :

```json
{
  "url": "https://store.steampowered.com/developer/FantinHD",
  "ordre": 20,
  "en_haut": "Steam",
  "en_bas": "Steam",
  "menu_mobile": "Steam"
}
```

| Champ | Rôle |
| --- | --- |
| `url` | L'adresse du lien (commence par `https://` ou `mailto:`). |
| `ordre` | Position : le plus petit nombre passe en premier. Google Play = 10, GitHub = 90. |
| `en_haut` | Nom affiché en haut à droite. `""` pour ne pas l'y mettre. |
| `en_bas` | Nom affiché en bas de page. `""` pour ne pas l'y mettre. |
| `menu_mobile` | Nom affiché dans le menu sur téléphone. `""` pour ne pas l'y mettre. |

Le lien apparaît aux endroits où tu as mis un nom : **tu ne le saisis qu'une seule fois**.

---

## Ajouter ou modifier un jeu

Chaque jeu a son dossier dans `contenu/jeux/` (par exemple `01-farkle/`), avec :

- `jeu.json` : la fiche ;
- `affiche.jpg` : l'affiche verticale, **2:3, 800 × 1200 px**.

```json
{
  "titre": "Nom du jeu",
  "sous_titre": "",
  "statut": "Android · En développement",
  "ordre": 5,
  "texte": [
    "Premier paragraphe, avec un **passage en gras**.",
    "Deuxième paragraphe."
  ],
  "affiche": "affiche.jpg",
  "lien": { "texte": "Voir sur Google Play", "url": "https://play.google.com/store/apps/details?id=..." }
}
```

- `ordre` règle la place du jeu dans la liste (1 = en premier).
- `lien` peut valoir `null` tant que le jeu n'est pas sorti.
- `"publie": false` cache le jeu sans le supprimer.

Pour remplacer une affiche par une vraie image, dépose ton fichier sous le même nom (`affiche.jpg`) dans le dossier du jeu.

---

## Fabriquer les images (outil Voxel Type)

L'outil est dans `outils/voxel-type/` du dépôt. Il n'est **pas publié sur le site**.

1. Télécharge `outils/voxel-type/index.html` (bouton **Download raw file** sur GitHub) et ouvre-le dans Chrome ou Edge. Il faut une connexion internet.
2. **Réglages → Modèle → Partir de** : choisis un modèle (« Annonce — Farkle », « Affiche — Clean Glass », « Annonce — texte libre »…).
3. Change le texte en bas. Le caractère `|` passe à la ligne : `Clean|Glass`.
4. **Réglages → Export → Image PNG** (ou le bouton **PNG ↓** en haut à droite).
5. Dépose l'image dans le dossier de l'annonce ou du jeu.

Les réglages de chaque modèle sont aussi sauvegardés dans `outils/voxel-type/reglages/`. Tu peux les recharger avec **Réglages → Export → Importer réglages**.

## Vérifier sur ton PC avant de publier (facultatif)

Si Node.js est installé, lance `node "outils/construire-contenu (ne pas toucher).mjs"` à la racine du dépôt, puis ouvre `index.html`. Sinon, publie directement : GitHub vérifie tout et t'indique les erreurs éventuelles.
