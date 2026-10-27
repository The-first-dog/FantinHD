"use strict";
/*
 * FantinHD — contenu des jeux et petites interactions.
 * Affiches : assets/images/visuels/affiche-*.jpg (format 2:3).
 * Pour une vraie affiche, dépose-la dans assets/images/ avec le nom de `photo` :
 * elle remplace l'affiche automatiquement.
 */
const games = [
  {
    name:"Farkle", sub:"Medieval Dice Game", state:"Disponible sur Google Play",
    intro:["Farkle est un ", "jeu de dés médiéval", " : lance les dés, garde les combinaisons qui rapportent des points, puis choisis entre sécuriser ton score ou tenter un lancer de plus."],
    more:"Des parties courtes, une ambiance médiévale et une boutique de skins purement cosmétiques, sans avantage de jeu.",
    poster:"assets/images/visuels/affiche-farkle.jpg", photo:"assets/images/affiche-farkle.jpg",
    link:"https://play.google.com/store/apps/details?id=com.FantinHD.Farkle"
  },
  {
    name:"Clean Glass", sub:"", state:"Disponible sur Google Play",
    intro:["Clean Glass est un ", "jeu de nettoyage relaxant", " : éponge, raclette et chiffon font disparaître la saleté petit à petit."],
    more:"Une ambiance ASMR, des gestes simples et une prise en main immédiate, pour une vraie pause.",
    poster:"assets/images/visuels/affiche-clean-glass.jpg", photo:"assets/images/affiche-clean-glass.jpg",
    link:"https://play.google.com/store/apps/details?id=com.FantinHD.CleanGlass"
  },
  {
    name:"3.2M", sub:"", state:"Android · En développement",
    intro:["Un seul objectif : ", "détruire 3 200 000 blocs", ". Pour y arriver, il faudra faire progresser ses billes et leurs effets."],
    more:"Billes spéciales, fusions, améliorations et missions quotidiennes sont en cours de préparation.",
    poster:"assets/images/visuels/affiche-3-2m.jpg", photo:"assets/images/affiche-3-2m.jpg", link:""
  },
  {
    name:"2:00:00", sub:"", state:"PC · En développement",
    intro:["2:00:00 est une ", "expérience minimaliste", " : une salle blanche, une roue et un bouton SPIN."],
    more:"Un projet autour de l'attente et du hasard. Plus de détails bientôt.",
    poster:"assets/images/visuels/affiche-2-00-00.jpg", photo:"assets/images/affiche-2-00-00.jpg", link:""
  }
];

/* Actualités : uniquement des informations publiques (mises à jour visibles sur Google Play)
   et l'état des projets en cours. Pas de date inventée. */
const news = [
  { date:"Septembre 2026", title:"Clean Glass mis à jour", text:"Une nouvelle mise à jour de Clean Glass est disponible sur Google Play.", img:"assets/images/visuels/clean-glass.jpg" },
  { date:"Septembre 2026", title:"Farkle : dés et classement améliorés", text:"Les dés et leur sélection ont été retravaillés, et le classement a été renforcé.", img:"assets/images/visuels/farkle.jpg" },
  { date:"Août 2026", title:"Farkle : boutique et nouveau look", text:"Une boutique de skins cosmétiques arrive, avec une refonte visuelle du jeu.", img:"assets/images/visuels/farkle.jpg" },
  { date:"En développement", title:"3.2M", text:"3 200 000 blocs à détruire. Le projet avance sur Android.", img:"assets/images/visuels/3-2m.jpg" },
  { date:"En développement", title:"2:00:00", text:"Une nouvelle expérience sur PC est en préparation.", img:"assets/images/visuels/2-00-00.jpg" }
];

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };

function poster(img, g){
  img.src = g.poster;
  if (!g.photo) return;
  const probe = new Image();
  probe.onload = () => { if (probe.naturalWidth > 0) img.src = g.photo; };
  probe.src = g.photo;
}

/* ---------- Jeux ---------- */
const projects = document.getElementById("projects");
for (const g of games){
  const art = el("article", "project");
  const wrap = g.link ? el("a", "project__poster") : el("div", "project__poster");
  if (g.link){ wrap.href = g.link; wrap.target = "_blank"; wrap.rel = "noopener noreferrer"; wrap.setAttribute("aria-label", g.name + " sur Google Play"); }
  const img = el("img"); img.alt = "Affiche de " + g.name; img.loading = "lazy"; img.width = 800; img.height = 1200;
  poster(img, g); wrap.append(img);

  const body = el("div", "project__body");
  const h = el("h3", "project__name", g.name);
  if (g.sub) h.append(el("span", "project__sub", g.sub));
  body.append(h, el("p", "project__state", g.state));
  const p1 = el("p"); p1.append(g.intro[0], el("strong", "", g.intro[1]), g.intro[2]);
  body.append(p1, el("p", "", g.more));
  if (g.link){ const a = el("a", "project__link", "Voir sur Google Play"); a.href = g.link; a.target = "_blank"; a.rel = "noopener noreferrer"; body.append(a); }
  art.append(wrap, body);
  projects.append(art);
}

/* ---------- Actualités ---------- */
const track = document.getElementById("news-track");
for (const n of news){
  const li = el("li", "news__item");
  const fig = el("div", "news__img"); const img = el("img"); img.src = n.img; img.alt = ""; img.loading = "lazy"; img.width = 1600; img.height = 900; fig.append(img);
  li.append(fig, el("p", "news__date", n.date), el("h3", "", n.title), el("p", "", n.text));
  track.append(li);
}
const prev = document.getElementById("news-prev"), next = document.getElementById("news-next");
const step = () => { const it = track.querySelector(".news__item"); return it ? it.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24) : 300; };
prev.addEventListener("click", () => track.scrollBy({ left:-step(), behavior:"smooth" }));
next.addEventListener("click", () => track.scrollBy({ left:step(), behavior:"smooth" }));
function arrows(){ prev.disabled = track.scrollLeft < 4; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
track.addEventListener("scroll", arrows, { passive:true }); addEventListener("resize", arrows); arrows();

/* ---------- En-tête, menu, lien actif ---------- */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-solid", scrollY > 16);
addEventListener("scroll", onScroll, { passive:true }); onScroll();

const btn = document.getElementById("menu-btn"), menu = document.getElementById("menu");
function setMenu(open){
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  document.body.style.overflow = open ? "hidden" : "";
  header.classList.toggle("is-solid", open || scrollY > 16);
}
btn.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

const links = [...document.querySelectorAll(".nav a")];
const spy = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting){
    links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }
}, { rootMargin:"-45% 0px -50% 0px" });
["accueil", "jeux", "actualites", "apropos"].forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });

document.getElementById("year").textContent = new Date().getFullYear();
