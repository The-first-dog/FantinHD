"use strict";
/*
 * FantinHD — Tous les chemins des photos se trouvent dans IMAGE_FILES.
 * Pour remplacer les emplacements gris, ajoutez les VRAIES images à ces
 * chemins dans GitHub. Les visuels sont facultatifs : aucun n'est généré.
 */
const IMAGE_FILES = {
  hero: "assets/images/hero.jpg",
  farkle: "assets/images/farkle.jpg",
  clean: "assets/images/clean-glass.jpg",
  depth: "assets/images/3-2m.jpg",
  timer: "assets/images/2-00-00.jpg"
};

const games = [
  {
    id: "farkle",
    name: "Farkle",
    subtitle: "Medieval Dice Game",
    platform: "Mobile", state: "Disponible", categories: ["mobile", "available"],
    description: "Lance les dés, prends des risques et essaie de marquer le plus de points dans une ambiance médiévale.",
    lead: "Un lancer de plus… ou est-ce qu'on s'arrête là ?",
    full: "Farkle est un jeu de dés rapide fondé sur la prise de risque, la stratégie et la recherche du meilleur score. À chaque lancer, décide d'assurer tes points ou de continuer.",
    tags: ["Android", "Jeu de dés", "Stratégie"],
    image: IMAGE_FILES.farkle,
    link: "https://play.google.com/store/apps/details?id=com.FantinHD.Farkle",
    linkText: "Voir sur Google Play"
  },
  {
    id: "clean",
    name: "Clean Glass",
    subtitle: "",
    platform: "Mobile", state: "Disponible", categories: ["mobile", "available"],
    description: "Nettoie des vitres et retrouve le plaisir d'une surface parfaitement propre.",
    lead: "Une petite pause, un geste simple, une vitre impeccable.",
    full: "Clean Glass est un jeu mobile relaxant : éponge, raclette et chiffon permettent de nettoyer progressivement les vitres. Des sons doux et des gestes simples donnent une expérience satisfaisante.",
    tags: ["Android", "Relaxant", "Simulation"],
    image: IMAGE_FILES.clean,
    link: "https://play.google.com/store/apps/details?id=com.FantinHD.CleanGlass",
    linkText: "Voir sur Google Play"
  },
  {
    id: "depth",
    name: "3.2M",
    subtitle: "",
    platform: "Mobile", state: "En développement", categories: ["mobile", "development"],
    description: "3 200 000 blocs à traverser. Des billes, de la physique et une descente qui semble sans fin.",
    lead: "Jusqu'où une simple bille peut-elle descendre ?",
    full: "Dans 3.2M, des billes autonomes creusent un terrain de 3 200 000 blocs. Améliorations, billes spéciales, progression et exploration s'entremêlent dans une descente vers le fond.",
    tags: ["Android", "Idle", "Physique", "En développement"],
    image: IMAGE_FILES.depth, link: "", linkText: ""
  },
  {
    id: "timer",
    name: "2:00:00",
    subtitle: "",
    platform: "PC", state: "En développement", categories: ["pc", "development"],
    description: "Deux heures, une seule issue. Une expérience minimaliste autour du temps et de l'incertitude.",
    lead: "Deux heures. Une roue. Une seule issue.",
    full: "2:00:00 est une expérience PC expérimentale centrée sur le temps et la tension de l'attente. Après un compte à rebours de deux heures, une roue intervient dans l'issue de la partie.",
    tags: ["PC", "Expérimental", "En développement"],
    image: IMAGE_FILES.timer, link: "", linkText: ""
  },
  {
    id: "secret",
    name: "À découvrir",
    subtitle: "",
    platform: "Non annoncé", state: "Confidentiel", categories: ["pc", "mobile", "development"],
    description: "D'autres idées prennent forme en coulisses. Le moment de les présenter viendra plus tard.",
    lead: "Tout n'est pas encore prêt à être révélé.",
    full: "Certains projets sont encore à l'état d'idée ou d'expérimentation. Leur nom, leur univers et leur progression ne sont pas annoncés.",
    tags: ["Non annoncé", "Confidentiel"],
    image: "", link: "", linkText: ""
  }
];
const byId = Object.fromEntries(games.map(game => [game.id, game]));

/* Photos optionnelles. Pas d'image de remplacement fabriquée. */
function setMedia(host, path, label, alt) {
  if (!host) return;
  host.classList.remove("has-image");
  host.replaceChildren();
  if (path) {
    const img = document.createElement("img");
    img.alt = alt || "";
    img.loading = host.classList.contains("hero__visual") ? "eager" : "lazy";
    img.addEventListener("load", () => {
      if (img.naturalWidth > 0) host.classList.add("has-image");
    });
    img.addEventListener("error", () => host.classList.remove("has-image"));
    host.append(img);
    img.src = path;
  }
  if (label) {
    const placeholder = document.createElement("span");
    placeholder.className = "media-placeholder";
    const title = document.createElement("strong");
    title.textContent = label;
    const help = document.createElement("small");
    help.textContent = path || "Projet confidentiel";
    placeholder.append(title, help);
    host.append(placeholder);
  }
}

/* Affiche chaque jeu avec une vraie zone photo à remplir. */
const gamesList = document.querySelector("#games-list");
for (const [index, game] of games.entries()) {
  const article = document.createElement("article");
  article.className = "game reveal";
  article.dataset.categories = game.categories.join(" ");
  const mediaButton = document.createElement("button");
  mediaButton.className = "game__cover media-host" + (game.id === "secret" ? " game__secret" : "");
  mediaButton.type = "button";
  mediaButton.dataset.game = game.id;
  mediaButton.setAttribute("aria-label", "En savoir plus sur " + game.name);
  if (game.id === "secret") {
    const q = document.createElement("span");
    q.className = "question";
    q.textContent = "?";
    const secretLabel = document.createElement("small");
    secretLabel.textContent = "NON ANNONCÉ";
    mediaButton.append(q, secretLabel);
  } else {
    setMedia(mediaButton, game.image, game.name, "Visuel officiel de " + game.name);
  }
  const zoom = document.createElement("span");
  zoom.className = "game__zoom";
  zoom.setAttribute("aria-hidden", "true");
  zoom.textContent = "↗";
  mediaButton.append(zoom);

  const metadata = document.createElement("div");
  metadata.className = "game__status";
  const number = document.createElement("span");
  number.textContent = String(index + 1).padStart(2, "0") + " / " + game.platform;
  const status = document.createElement("span");
  status.textContent = game.state;
  metadata.append(number, status);

  const title = document.createElement("h3");
  title.textContent = game.name;
  if (game.subtitle) {
    const subtitle = document.createElement("span");
    subtitle.className = "subtitle";
    subtitle.textContent = game.subtitle;
    title.append(subtitle);
  }
  const description = document.createElement("p");
  description.textContent = game.description;

  const links = document.createElement("div");
  links.className = "game__links";
  if (game.link) {
    const external = document.createElement("a");
    external.href = game.link;
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = game.linkText + " ↗";
    links.append(external);
  }
  const info = document.createElement("button");
  info.type = "button";
  info.dataset.game = game.id;
  info.textContent = "Découvrir le projet ↗";
  links.append(info);
  article.append(mediaButton, metadata, title, description, links);
  gamesList.append(article);
}

/* L'image d'accueil reste noire tant que hero.jpg n'a pas été ajouté. */
setMedia(document.querySelector(".hero__visual"), IMAGE_FILES.hero, "", "");
const dialog = document.querySelector("#game-dialog");
let trigger = null;
function openGame(id, element) {
  const game = byId[id];
  if (!game) return;
  trigger = element || document.activeElement;
  document.querySelector("#dialog-category").textContent = game.platform + " / " + game.state;
  document.querySelector("#dialog-title").textContent = game.name + (game.subtitle ? " — " + game.subtitle : "");
  document.querySelector("#dialog-lead").textContent = game.lead;
  document.querySelector("#dialog-description").textContent = game.full;
  const picture = document.querySelector("#dialog-picture");
  if (game.id === "secret") setMedia(picture, "", "Projet confidentiel", "");
  else setMedia(picture, game.image, game.name, "Visuel officiel de " + game.name);
  const tags = document.querySelector("#dialog-tags");
  tags.replaceChildren(...game.tags.map(tag => {
    const item = document.createElement("span");
    item.textContent = tag;
    return item;
  }));
  const link = document.querySelector("#dialog-link");
  link.hidden = !game.link;
  if (game.link) {link.href = game.link;link.textContent = game.linkText + " ↗";}
  else link.removeAttribute("href");
  dialog.showModal();
}
document.addEventListener("click", event => {
  const button = event.target.closest("[data-game]");
  if (button) openGame(button.dataset.game, button);
});
dialog.querySelector(".dialog__close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {if (event.target === dialog) dialog.close();});
dialog.addEventListener("close", () => {if (trigger?.isConnected) trigger.focus({preventScroll:true});});

/* Filtres de la grille. */
const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".game")];
filters.forEach(button => button.addEventListener("click", () => {
  const value = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle("active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  let visible = 0;
  cards.forEach(card => {
    const matches = value === "all" || card.dataset.categories.split(" ").includes(value);
    card.hidden = !matches;
    if (matches) visible++;
  });
  document.querySelector("#filter-announcement").textContent = visible + " projets affichés.";
}));

/* Navigation mobile. */
const menu = document.querySelector("#menu-button");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {menu.setAttribute("aria-expanded", "false");mobileNav.hidden = true;}
menu.addEventListener("click", () => {
  const opening = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(opening));
  mobileNav.hidden = !opening;
});
mobileNav.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {if (event.key === "Escape") closeMenu();});
document.addEventListener("click", event => {if (!event.target.closest(".header")) closeMenu();});

/* Apparitions discrètes et respect des préférences d'accessibilité. */
const reveals = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add("visible");observer.unobserve(entry.target);}
    });
  }, {threshold:.05,rootMargin:"0px 0px 70px 0px"});
  reveals.forEach(element => observer.observe(element));
} else reveals.forEach(element => element.classList.add("visible"));
document.querySelector("#year").textContent = new Date().getFullYear();
