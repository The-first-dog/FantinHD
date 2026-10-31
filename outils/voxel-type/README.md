# Voxel Type

Outil pour fabriquer le logo Fantin HD, les images d'annonce et les affiches de jeu, en pixels de verre avec des rayons de lumière. **Il n'est pas publié sur le site** : il reste dans le dépôt.

## Utilisation

1. Télécharge `index.html` (bouton **Download raw file** sur GitHub) et ouvre-le dans Chrome ou Edge. Il faut une connexion internet pour la 3D.
2. **Réglages → Modèle → Partir de** : choisis un modèle.
   - **Logo Fantin HD**, **Logo blanc sans rayons** (en-tête)
   - **Annonce** (16:9, 1600 px) : Fantin HD, Farkle, Clean Glass, 3 200 000, 2:00:00, texte libre
   - **Affiche de jeu** (2:3, 1800 px) : Farkle, Clean Glass, 3 200 000 (3.2M), 2:00:00
3. Change le texte en bas. Tape `|` pour aller à la ligne (ex. `Clean|Glass`) : chaque ligne est centrée.
4. Exporte avec **PNG ↓** (en haut à droite) ou **Réglages → Export → Image PNG**.

## Vidéo d'intro pour tes jeux

1. **Réglages → Modèle → « Intro de jeu — Fantin HD (vidéo) »**.
2. **Réglages → Vidéo (intro de jeu)** :
   - **Fond** : noir ou blanc ;
   - **Format** : 16:9 (PC, console), 9:16 (téléphone), carré, ou comme l'écran ;
   - **Qualité** : 720p, 1080p (conseillé), 1440p ou 4K ;
   - **Images/s** : 30 ou 60 ;
   - **Pause finale** : temps pendant lequel le logo reste affiché avant la fin ;
   - **Fondu de fin** : le logo s'efface vers la couleur du fond ;
   - **Son**, **Volume**, **Sonorité** (verre, cloche douce, harpe) : chaque cube joue sa note en apparaissant ; comme les cubes arrivent de gauche à droite, ça forme une petite mélodie.
3. **Écouter l'intro** pour l'entendre, puis **Enregistrer la vidéo**.

La vidéo contient un court écran vide, l'apparition, la pause finale puis le fondu. Elle sort en **MP4 (H.264 + AAC)** dans Chrome ou Edge récents, sinon en **WebM**. Les deux se lisent dans Unity, Godot et les logiciels de montage. Garde la fenêtre visible pendant l'enregistrement.

## Réglages sauvegardés

Le dossier `reglages/` contient un fichier par modèle. Pour en recharger un : **Réglages → Export → Importer réglages**. Pour garder un nouveau réglage : **Exporter réglages .txt**, puis range le fichier dans `reglages/`.

## Raccourcis utiles

- **À plat** : remet le texte de face.
- **Clic sur un pixel** : il prend la couleur suivante de la palette.
- **Réglages → Vue → Zoom auto** : cadre les lettres seules ou les lettres avec leurs rayons.
- **Réglages → Couleurs → Teinte** : couleur, noir et blanc, blanc pur.
