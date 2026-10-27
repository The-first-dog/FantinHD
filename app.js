"use strict";
/*
 * FantinHD — données des jeux et interactions de la page.
 * Visuels : chaque jeu a un visuel « pixels de verre » (assets/images/visuels/).
 * Pour afficher une vraie capture à la place, dépose-la dans assets/images/ avec
 * le nom indiqué dans `photo` : elle remplace le visuel automatiquement.
 */
const PLAY_DEV = "https://play.google.com/store/apps/dev?id=8088754359282570640";

const games = [
  {
    id:"farkle", name:"Farkle", sub:"Medieval Dice Game",
    platform:"Mobile", state:"Disponible", available:true,
    desc:"Lance les dés, prends des risques et marque le plus de points dans une ambiance médiévale.",
    lead:"Un lancer de plus… ou est-ce qu'on s'arrête là ?",
    text:"Farkle est un jeu de dés rapide fondé sur la prise de risque, la stratégie et la recherche du meilleur score. À chaque lancer, décide d'assurer tes points ou de continuer.",
    tags:["Android", "Jeu de dés", "Stratégie"],
    visual:"assets/images/visuels/farkle.jpg", photo:"assets/images/farkle.jpg",
    link:"https://play.google.com/store/apps/details?id=com.FantinHD.Farkle", linkText:"Voir sur Google Play"
  },
  {
    id:"clean", name:"Clean Glass", sub:"",
    platform:"Mobile", state:"Disponible", available:true,
    desc:"Nettoie des vitres et retrouve le plaisir d'une surface parfaitement propre.",
    lead:"Une petite pause, un geste simple, une vitre impeccable.",
    text:"Clean Glass est un jeu mobile relaxant : éponge, raclette et chiffon permettent de nettoyer progressivement les vitres. Des sons doux et des gestes simples donnent une expérience satisfaisante.",
    tags:["Android", "Relaxant", "Simulation"],
    visual:"assets/images/visuels/clean-glass.jpg", photo:"assets/images/clean-glass.jpg",
    link:"https://play.google.com/store/apps/details?id=com.FantinHD.CleanGlass", linkText:"Voir sur Google Play"
  },
  {
    id:"depth", name:"3.2M", sub:"",
    platform:"Mobile", state:"En développement", available:false,
    desc:"3 200 000 blocs à traverser. Des billes, de la physique et une descente qui semble sans fin.",
    lead:"Jusqu'où une simple bille peut-elle descendre ?",
    text:"Dans 3.2M, des billes autonomes creusent un terrain de 3 200 000 blocs. Améliorations, billes spéciales, progression et exploration s'entremêlent dans une descente vers le fond.",
    tags:["Android", "Idle", "Physique"],
    visual:"assets/images/visuels/3-2m.jpg", photo:"assets/images/3-2m.jpg", link:"", linkText:""
  },
  {
    id:"timer", name:"2:00:00", sub:"",
    platform:"PC", state:"En développement", available:false,
    desc:"Deux heures, une seule issue. Une expérience minimaliste autour du temps et de l'attente.",
    lead:"Deux heures. Une roue. Une seule issue.",
    text:"2:00:00 est une expérience PC expérimentale centrée sur le temps et la tension de l'attente. Après un compte à rebours de deux heures, une roue décide de l'issue de la partie.",
    tags:["PC", "Expérimental"],
    visual:"assets/images/visuels/2-00-00.jpg", photo:"assets/images/2-00-00.jpg", link:"", linkText:""
  },
  {
    id:"secret", name:"Non annoncé", sub:"",
    platform:"PC & mobile", state:"Confidentiel", available:false, wide:true,
    desc:"D'autres projets prennent forme. Leur nom et leur univers seront dévoilés plus tard.",
    lead:"Tout n'est pas encore prêt à être montré.",
    text:"Certains projets sont encore au stade de l'idée ou du prototype. Ils seront présentés ici quand ils seront prêts.",
    tags:["Bientôt"],
    visual:"assets/images/visuels/secret.jpg", photo:"", link:"", linkText:""
  }
];
const byId = Object.fromEntries(games.map(g => [g.id, g]));

/* Visuel par défaut, remplacé par la vraie capture si elle existe. */
function picture(img, game){
  img.src = game.visual;
  if (!game.photo) return;
  const probe = new Image();
  probe.onload = () => { if (probe.naturalWidth > 0) img.src = game.photo; };
  probe.src = game.photo;
}

/* ---------- Grille des jeux ---------- */
const grid = document.getElementById("games-grid");
for (const g of games){
  const art = document.createElement("article");
  art.className = "game" + (g.wide ? " game--wide" : "");
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "game__link"; btn.dataset.game = g.id;
  btn.setAttribute("aria-label", g.name + " : " + g.state + ", voir la fiche");

  const media = document.createElement("div"); media.className = "game__media";
  const img = document.createElement("img"); img.alt = ""; img.loading = "lazy"; img.width = 1600; img.height = 900;
  picture(img, g);
  const badge = document.createElement("span");
  badge.className = "game__badge" + (g.available ? "" : " is-dev"); badge.textContent = g.state;
  const arrow = document.createElement("span"); arrow.className = "game__arrow"; arrow.setAttribute("aria-hidden", "true"); arrow.textContent = "↗";
  media.append(img, badge, arrow);

  const meta = document.createElement("div"); meta.className = "game__meta";
  const m1 = document.createElement("span"); m1.className = "label"; m1.textContent = g.platform;
  const m2 = document.createElement("span"); m2.className = "label"; m2.textContent = g.state;
  meta.append(m1, m2);

  const h = document.createElement("h3"); h.className = "game__title"; h.textContent = g.name;
  if (g.sub){ const s = document.createElement("span"); s.className = "game__sub"; s.textContent = g.sub; h.append(s); }
  const p = document.createElement("p"); p.className = "game__desc"; p.textContent = g.desc;

  btn.append(media, meta, h, p);
  art.append(btn);
  grid.append(art);
}
const released = games.filter(g => g.available).length;
const inDev = games.filter(g => g.state === "En développement").length;
document.getElementById("games-count").textContent = released + " disponibles · " + inDev + " en développement";

/* ---------- Chiffres du studio ---------- */
const facts = [[String(released), "jeux disponibles sur Google Play"], [String(inDev), "jeux en développement"], ["PC + mobile", "deux plateformes"]];
const dl = document.getElementById("facts");
for (const [n, t] of facts){
  const d = document.createElement("div");
  const dt = document.createElement("dt"); dt.textContent = n;
  const dd = document.createElement("dd"); dd.className = "label"; dd.textContent = t;
  d.append(dt, dd); dl.append(d);
}

/* ---------- En ce moment ---------- */
const rows = document.getElementById("rows");
for (const id of ["depth", "timer", "secret"]){
  const g = byId[id];
  const li = document.createElement("li"); li.className = "row";
  const b = document.createElement("button"); b.type = "button"; b.className = "row__btn"; b.dataset.game = id;
  const name = document.createElement("span"); name.className = "row__name"; name.textContent = g.name;
  const text = document.createElement("span"); text.className = "row__text"; text.textContent = g.lead;
  const meta = document.createElement("span"); meta.className = "label"; meta.textContent = g.platform + " · " + g.state;
  const ar = document.createElement("span"); ar.className = "row__arrow"; ar.setAttribute("aria-hidden", "true"); ar.textContent = "↗";
  b.append(name, text, meta, ar); li.append(b); rows.append(li);
}

/* ---------- Fiche ---------- */
const dialog = document.getElementById("game-dialog");
function openGame(id){
  const g = byId[id]; if (!g) return;
  picture(document.getElementById("dialog-img"), g);
  document.getElementById("dialog-img").alt = g.photo ? "Visuel de " + g.name : "";
  document.getElementById("dialog-meta").textContent = g.platform + " · " + g.state;
  document.getElementById("dialog-title").textContent = g.name;
  document.getElementById("dialog-lead").textContent = g.lead;
  document.getElementById("dialog-text").textContent = g.text;
  const tags = document.getElementById("dialog-tags"); tags.replaceChildren();
  for (const t of g.tags){ const li = document.createElement("li"); li.textContent = t; tags.append(li); }
  const link = document.getElementById("dialog-link");
  link.hidden = !g.link;
  if (g.link){ link.href = g.link; link.textContent = g.linkText + " ↗"; }
  if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-game]");
  if (t) openGame(t.dataset.game);
});
dialog.querySelector(".dialog__close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

/* ---------- En-tête et menu mobile ---------- */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-solid", scrollY > 24);
addEventListener("scroll", onScroll, { passive:true }); onScroll();

const menuBtn = document.getElementById("menu-btn"), menu = document.getElementById("menu");
function setMenu(open){
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.querySelector(".menu-btn__label").textContent = open ? "Fermer" : "Menu";
  document.body.style.overflow = open ? "hidden" : "";
  header.classList.toggle("is-solid", open || scrollY > 24);
}
menuBtn.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

document.getElementById("year").textContent = new Date().getFullYear();
