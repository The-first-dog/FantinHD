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
   - **Fond** : noir, blanc ou **transparent** ;
   - **Format** : 16:9 (PC, console), 9:16 (téléphone), carré, ou comme l'écran ;
   - **Qualité** : 720p, 1080p (conseillé), 1440p ou 4K ;
   - **Images/s** : 24, 30, 36, 48 ou 60 ;
   - **Pause finale** : temps pendant lequel le logo reste affiché avant la fin ;
   - **Fondu de fin** : le logo s'efface vers la couleur du fond ;
   - **Son**, **Volume**, **Sonorité** (verre, cloche douce, harpe) : chaque cube joue sa note en apparaissant ; comme les cubes arrivent de gauche à droite, ça forme une petite mélodie.
3. **Écouter l'intro** pour l'entendre, puis **Enregistrer la vidéo**.

### Fond transparent

Choisis **Fond → Transparent**, puis le **fichier** :

- **WebM transparent (+ son)** : vidéo VP8 avec transparence et musique. Se lit dans Chrome, Edge, Firefox et OBS, et s'importe dans Unity (cocher la transparence dans l'import du clip vidéo).
- **Séquence PNG + WAV (ZIP)** : une image PNG transparente par image de la vidéo, plus la musique en WAV. C'est le format universel : Godot, Unity, Unreal, After Effects, Premiere, DaVinci.

**Quel fichier pour quel moteur ?**

| Où | Fichier conseillé |
| --- | --- |
| Unity | WebM transparent (importer le clip vidéo en cochant « Keep Alpha ») |
| Jeu web, Phaser, Capacitor (Android) | WebM transparent |
| Godot | Séquence PNG (Godot ne lit pas le WebM) |
| Unreal, After Effects, Premiere, DaVinci | Séquence PNG |

**VLC n'affiche pas la transparence** : il montre le logo sur fond noir. C'est normal, ça ne veut pas dire que le fichier est raté. Pour voir la transparence, ouvre le WebM dans Chrome ou Edge, ou importe-le dans ton moteur de jeu.

La vidéo transparente est **calculée image par image** : aucune saccade, quel que soit le nombre d'images par seconde. Le calcul prend un peu de temps, et l'avancement s'affiche en bas à gauche.

La vidéo contient un court écran vide, l'apparition, la pause finale puis le fondu. Elle sort en **MP4 (H.264 + AAC)** dans Chrome ou Edge récents, sinon en **WebM**. Les deux se lisent dans Unity, Godot et les logiciels de montage. Garde la fenêtre visible pendant l'enregistrement.

## Réglages sauvegardés

Le dossier `reglages/` contient un fichier par modèle. Pour en recharger un : **Réglages → Export → Importer réglages**. Pour garder un nouveau réglage : **Exporter réglages .txt**, puis range le fichier dans `reglages/`.

## Graine

La **graine** fixe la petite variation de couleur de chaque cube et la longueur de chaque rayon : avec la même graine, le logo est exactement le même.

- **Graine d'origine : 7.** C'est celle du logo Fantin HD sur le site et sur toutes les images.
- **Réglages → Couleurs → Graine** : tape un nombre pour choisir une graine précise.
- **Nouvelle graine** en tire une au hasard ; **Graine d'origine (7)** revient à celle du logo.
- La graine est enregistrée avec tes réglages, dans le navigateur et dans le fichier `.txt`.

## Raccourcis utiles

- **À plat** : remet le texte de face.
- **Clic sur un pixel** : il prend la couleur suivante de la palette.
- **Réglages → Vue → Zoom auto** : cadre les lettres seules ou les lettres avec leurs rayons.
- **Réglages → Couleurs → Teinte** : couleur, noir et blanc, blanc pur.
