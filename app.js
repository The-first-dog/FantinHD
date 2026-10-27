"use strict";
/*
 * FantinHD — affiche le contenu du dossier contenu/ et gère les petites interactions.
 * Le contenu (textes, liens, jeux, annonces) vient de contenu/contenu.js, construit
 * automatiquement à partir des fichiers de contenu/ : voir contenu/LISEZMOI.md.
 */
const C = window.FANTINHD_CONTENU || { site:{}, liens:[], jeux:[], annonces:[] };

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };

/* Texte simple : **gras** et retours à la ligne, sans HTML. */
function rich(target, text){
  if (!target || typeof text !== "string") return;
  target.replaceChildren();
  text.split("\n").forEach((line, i) => {
    if (i) target.append(document.createElement("br"));
    line.split(/\*\*(.+?)\*\*/g).forEach((part, j) => { if (part) target.append(j % 2 ? el("strong", "", part) : part); });
  });
}
function anchor(cls, label, l){
  const a = el("a", cls, label); a.href = l.url;
  if (l.nouvel_onglet){ a.target = "_blank"; a.rel = "noopener noreferrer"; }
  return a;
}

/* ---------- Textes du site ---------- */
const S = C.site || {};
rich(document.getElementById("hero-tagline"), S.accroche);
rich(document.getElementById("jeux-title"), S.titre_jeux);
rich(document.getElementById("news-title"), S.titre_actualites);
rich(document.getElementById("quote-text"), S.phrase);
if (S.a_propos){
  rich(document.getElementById("about-title"), S.a_propos.titre);
  const box = document.getElementById("about-text");
  if (Array.isArray(S.a_propos.paragraphes)){ box.replaceChildren(); for (const p of S.a_propos.paragraphes){ const e = el("p"); rich(e, p); box.append(e); } }
  const btn = document.getElementById("about-btn");
  if (S.a_propos.bouton && S.a_propos.bouton.url){ btn.textContent = S.a_propos.bouton.texte; btn.href = S.a_propos.bouton.url; } else btn.hidden = true;
}
if (S.mentions) document.getElementById("footer-legal").textContent = S.mentions.replace("{annee}", new Date().getFullYear());

/* ---------- Liens : en-tête, menu mobile, pied de page ---------- */
const head = document.getElementById("header-links"), menuNav = document.getElementById("menu-nav");
const foot = document.getElementById("footer-links"), topLink = document.getElementById("footer-top");
for (const l of C.liens || []){
  if (l.en_haut) head.append(anchor("header__store", l.en_haut, l));
  if (l.menu_mobile) menuNav.append(anchor("", l.menu_mobile, l));
  if (l.en_bas) foot.insertBefore(anchor("", l.en_bas, l), topLink);
}

/* ---------- Jeux ---------- */
const projects = document.getElementById("projects");
for (const g of C.jeux || []){
  const art = el("article", "project");
  const wrap = g.lien ? anchor("project__poster", "", { url:g.lien.url, nouvel_onglet:true }) : el("div", "project__poster");
  if (g.lien) wrap.setAttribute("aria-label", g.titre + " : " + g.lien.texte);
  const img = el("img"); img.src = g.affiche; img.alt = "Affiche de " + g.titre; img.loading = "lazy"; img.width = 800; img.height = 1200;
  wrap.append(img);

  const body = el("div", "project__body");
  const h = el("h3", "project__name", g.titre);
  if (g.sous_titre) h.append(el("span", "project__sub", g.sous_titre));
  body.append(h);
  if (g.statut) body.append(el("p", "project__state", g.statut));
  for (const t of g.texte || []){ const p = el("p"); rich(p, t); body.append(p); }
  if (g.lien) body.append(anchor("project__link", g.lien.texte, { url:g.lien.url, nouvel_onglet:true }));
  art.append(wrap, body);
  projects.append(art);
}

/* ---------- Actualités (déjà triées : la plus récente à gauche) ---------- */
const track = document.getElementById("news-track");
for (const n of C.annonces || []){
  const li = el("li", "news__item");
  if (n.image){
    const fig = el("div", "news__img"); const img = el("img"); img.src = n.image; img.alt = ""; img.loading = "lazy"; img.width = 1600; img.height = 900;
    fig.append(img); li.append(fig);
  }
  li.append(el("p", "news__date", n.date_affichee), el("h3", "", n.titre));
  if (n.texte){ const p = el("p"); rich(p, n.texte); li.append(p); }
  if (n.lien) li.append(anchor("news__link", n.lien.texte, { url:n.lien.url, nouvel_onglet:true }));
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
