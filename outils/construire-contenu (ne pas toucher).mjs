#!/usr/bin/env node
/*
 * Construit « contenu/contenu (ne pas toucher).js » à partir des dossiers de contenu/ :
 *   contenu/site.json                 textes généraux du site
 *   contenu/liens/<nom>.json          un fichier par lien (en-tête, menu mobile, pied de page)
 *   contenu/jeux/<dossier>/jeu.json   un dossier par jeu (+ son affiche)
 *   contenu/annonces/<dossier>/annonce.json   un dossier par annonce (+ son image)
 * Les fichiers et dossiers qui commencent par « _ » ou « . » sont ignorés (modèles, brouillons).
 *
 * Lancement : node "outils/construire-contenu (ne pas toucher).mjs"
 * Sur GitHub, c'est automatique à chaque modification de contenu/ (voir .github/workflows/contenu.yml).
 * En cas d'erreur, rien n'est écrit : le site garde son contenu précédent.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENU = path.join(RACINE, "contenu");
const SORTIE = path.join(CONTENU, "contenu (ne pas toucher).js");
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const erreurs = [];
const relatif = p => path.relative(RACINE, p).split(path.sep).join("/");
const visible = nom => !nom.startsWith("_") && !nom.startsWith(".");

function lire(fichier){
  try { return JSON.parse(fs.readFileSync(fichier, "utf8")); }
  catch (e){
    erreurs.push(`${relatif(fichier)} : ${e.code === "ENOENT" ? "fichier introuvable" : "JSON invalide (" + e.message + ")"}`);
    return null;
  }
}
function texte(obj, cle, fichier, obligatoire = true){
  const v = obj[cle];
  if (v === undefined || v === null || v === ""){ if (obligatoire) erreurs.push(`${relatif(fichier)} : le champ « ${cle} » est obligatoire`); return ""; }
  if (typeof v !== "string"){ erreurs.push(`${relatif(fichier)} : « ${cle} » doit être un texte entre guillemets`); return ""; }
  return v.trim();
}
function url(v, fichier, cle){
  if (!v) return "";
  if (typeof v !== "string" || !/^(https?:\/\/|mailto:)/.test(v)){ erreurs.push(`${relatif(fichier)} : « ${cle} » doit commencer par https:// ou mailto:`); return ""; }
  return v;
}
function lien(obj, fichier){
  if (!obj) return null;
  if (typeof obj !== "object"){ erreurs.push(`${relatif(fichier)} : « lien » doit contenir { "texte", "url" } ou null`); return null; }
  const u = url(obj.url, fichier, "lien.url");
  return u ? { texte:(obj.texte || "En savoir plus").trim(), url:u } : null;
}
function image(dossier, nom, fichier, obligatoire){
  if (!nom){ if (obligatoire) erreurs.push(`${relatif(fichier)} : image manquante`); return ""; }
  const p = path.join(dossier, nom);
  if (!fs.existsSync(p)){ erreurs.push(`${relatif(fichier)} : l'image « ${nom} » n'existe pas dans ${relatif(dossier)}/`); return ""; }
  return relatif(p);
}
const dossiers = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes:true }).filter(e => e.isDirectory() && visible(e.name)).map(e => e.name).sort() : [];

/* ---------- Textes du site ---------- */
const siteFichier = path.join(CONTENU, "site.json");
const site = lire(siteFichier) || {};

/* ---------- Liens ---------- */
const liensDossier = path.join(CONTENU, "liens");
const liens = [];
for (const nom of (fs.existsSync(liensDossier) ? fs.readdirSync(liensDossier) : []).sort()){
  if (!visible(nom) || !nom.endsWith(".json")) continue;
  const f = path.join(liensDossier, nom), o = lire(f);
  if (!o) continue;
  const u = url(o.url, f, "url");
  if (!o.url) erreurs.push(`${relatif(f)} : le champ « url » est obligatoire`);
  liens.push({
    id:nom.replace(/\.json$/, ""), url:u, ordre:Number(o.ordre ?? 100),
    en_haut:(o.en_haut || "").trim(), en_bas:(o.en_bas || "").trim(), menu_mobile:(o.menu_mobile || "").trim(),
    nouvel_onglet:o.nouvel_onglet !== false && u.startsWith("http")
  });
}
liens.sort((a, b) => a.ordre - b.ordre || a.id.localeCompare(b.id));

/* ---------- Jeux ---------- */
const jeux = [];
for (const nom of dossiers(path.join(CONTENU, "jeux"))){
  const d = path.join(CONTENU, "jeux", nom), f = path.join(d, "jeu.json"), o = lire(f);
  if (!o || o.publie === false) continue;
  const paragraphes = Array.isArray(o.texte) ? o.texte : (o.texte ? [o.texte] : []);
  jeux.push({
    id:nom, ordre:Number(o.ordre ?? 100),
    titre:texte(o, "titre", f), sous_titre:texte(o, "sous_titre", f, false), statut:texte(o, "statut", f, false),
    texte:paragraphes.map(String), affiche:image(d, o.affiche || "affiche.jpg", f, true), lien:lien(o.lien, f)
  });
}
jeux.sort((a, b) => a.ordre - b.ordre || a.id.localeCompare(b.id));

/* ---------- Annonces ---------- */
const annonces = [];
for (const nom of dossiers(path.join(CONTENU, "annonces"))){
  const d = path.join(CONTENU, "annonces", nom), f = path.join(d, "annonce.json"), o = lire(f);
  if (!o || o.publie === false) continue;
  const brut = texte(o, "date", f);
  const m = brut.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?$/);
  if (brut && !m){ erreurs.push(`${relatif(f)} : « date » doit avoir la forme AAAA-MM-JJ HH:MM (ex. 2026-12-31 18:00)`); continue; }
  if (!m) continue;
  const [, a, mo, j, h = "12", mi = "00"] = m;
  const afficher = o.afficher || "jour";
  if (!["jour", "mois", "annee"].includes(afficher)) erreurs.push(`${relatif(f)} : « afficher » doit valoir "jour", "mois" ou "annee"`);
  const moisNom = MOIS[Number(mo) - 1];
  if (!moisNom) erreurs.push(`${relatif(f)} : mois invalide dans « date »`);
  const date_affichee = (o.etiquette || "").trim() ||
    (afficher === "annee" ? a : afficher === "mois" ? `${moisNom} ${a}` : `${Number(j)} ${moisNom} ${a}`);
  annonces.push({
    id:nom, tri:`${a}-${mo}-${j}T${h}:${mi}`, date_affichee:date_affichee.charAt(0).toUpperCase() + date_affichee.slice(1),
    titre:texte(o, "titre", f), texte:texte(o, "texte", f, false), image:image(d, o.image, f, false), lien:lien(o.lien, f)
  });
}
annonces.sort((x, y) => y.tri.localeCompare(x.tri) || x.id.localeCompare(y.id));

/* ---------- Écriture ---------- */
if (erreurs.length){
  console.error("Le contenu n'a pas été mis à jour. À corriger :");
  for (const e of erreurs) console.error("  - " + e);
  process.exit(1);
}
const donnees = { site, liens, jeux, annonces };
const js = "// Fichier GÉNÉRÉ automatiquement à partir du dossier contenu/ (NE PAS TOUCHER).\n" +
  "// Ne pas le modifier à la main : il est refait automatiquement sur GitHub.\n" +
  "window.FANTINHD_CONTENU = " + JSON.stringify(donnees, null, 1) + ";\n";
fs.writeFileSync(SORTIE, js);

/* ---------- Numéros de version dans index.html ----------
   Chaque fichier reçoit « ?v=<empreinte> ». Quand son contenu change, l'adresse change,
   donc les navigateurs téléchargent la nouvelle version au lieu de garder l'ancienne en mémoire. */
const INDEX = path.join(RACINE, "index.html");
const empreinte = f => crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex").slice(0, 10);
let html = fs.readFileSync(INDEX, "utf8");
for (const [fichier, adresse] of [
  [path.join(RACINE, "styles (ne pas toucher).css"), "styles%20(ne%20pas%20toucher).css"],
  [path.join(RACINE, "app (ne pas toucher).js"), "app%20(ne%20pas%20toucher).js"],
  [SORTIE, "contenu/contenu%20(ne%20pas%20toucher).js"]
]){
  if (!fs.existsSync(fichier)) continue;
  const motif = new RegExp(adresse.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(\\?v=[0-9a-f]+)?\"", "g");
  html = html.replace(motif, adresse + "?v=" + empreinte(fichier) + '"');
}
fs.writeFileSync(INDEX, html);
console.log(`Contenu construit : ${jeux.length} jeux, ${annonces.length} annonces, ${liens.length} liens → ${relatif(SORTIE)}`);
