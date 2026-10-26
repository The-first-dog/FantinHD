"use strict";
/* FantinHD — lightweight interactions. No cookies, tracking, dependencies or API keys. */
const games = {
  farkle: {
    title: "Farkle — Medieval Dice Game",
    type: "Jeu disponible",
    lead: "Un lancer de plus… ou est-ce qu'on s'arrête là ?",
    description: "Un jeu de dés rapide dans une ambiance médiévale. Faites vos combinaisons, cumulez vos points et choisissez entre assurer votre score ou tenter votre chance une dernière fois.",
    platform: "Android", tags: ["Jeu de dés", "Stratégie", "Disponible sur Google Play"],
    image: "assets/farkle.svg",
    link: "https://play.google.com/store/apps/details?id=com.FantinHD.Farkle",
    label: "Voir sur Google Play"
  },
  clean: {
    title: "Clean Glass",
    type: "Jeu disponible",
    lead: "Des vitres sales. Une raclette. La satisfaction du dernier passage.",
    description: "Un petit jeu mobile de nettoyage relaxant : redonnez aux vitres leur transparence, une surface après l'autre. Une expérience simple, tactile et apaisante.",
    platform: "Android", tags: ["Relaxant", "ASMR", "Disponible sur Google Play"],
    image: "assets/clean-glass.svg",
    link: "https://play.google.com/store/apps/details?id=com.FantinHD.CleanGlass",
    label: "Voir sur Google Play"
  },
  depth: {
    title: "3.2M",
    type: "En développement",
    lead: "3 200 000 blocs entre vous et le fond.",
    description: "Un jeu mobile où des billes autonomes creusent un terrain immense. Découvrez de nouvelles familles de billes, améliorez votre progression et traversez un monde qui se transforme bloc après bloc.",
    platform: "Android", tags: ["Idle", "Physique", "En développement"],
    image: "assets/3200000.svg", link: "", label: ""
  },
  timer: {
    title: "2:00:00",
    type: "En développement",
    lead: "Deux heures. Une roue. Une issue.",
    description: "Une expérience PC expérimentale sur le temps, l'attente et le hasard. Un univers minimaliste où la tension se construit lentement jusqu'au moment décisif.",
    platform: "PC", tags: ["Expérimental", "Temps", "En développement"],
    image: "assets/20000.svg", link: "", label: ""
  },
  secret: {
    title: "Projet non annoncé",
    type: "Confidentiel",
    lead: "Certaines idées méritent de rester secrètes.",
    description: "D'autres projets prennent forme en coulisses. Il est trop tôt pour en révéler le concept, les visuels ou le nom.",
    platform: "PC / Mobile", tags: ["À découvrir", "Non annoncé"],
    image: "assets/secret.svg", link: "", label: ""
  }
};

const modal = document.querySelector("#game-dialog");
const modalTitle = document.querySelector("#modal-title");
const modalType = document.querySelector("#modal-type");
const modalCover = document.querySelector("#modal-cover");
const modalLead = document.querySelector("#modal-lead");
const modalDescription = document.querySelector("#modal-description");
const modalTags = document.querySelector("#modal-tags");
const modalLink = document.querySelector("#modal-link");
const modalNote = document.querySelector("#modal-note");
let lastTrigger = null;

function openGame(id, trigger) {
  const game = games[id];
  if (!game || !modal) return;
  lastTrigger = trigger || document.activeElement;
  modalTitle.textContent = game.title;
  modalType.textContent = game.type + " / " + game.platform;
  modalCover.src = game.image;
  modalCover.alt = "Illustration de présentation provisoire : " + game.title;
  modalLead.textContent = game.lead;
  modalDescription.textContent = game.description;
  modalTags.replaceChildren(...game.tags.map(tag => {
    const element = document.createElement("span");
    element.className = "modal-tag";
    element.textContent = tag;
    return element;
  }));
  modalLink.hidden = !game.link;
  if (game.link) {
    modalLink.href = game.link;
    modalLink.textContent = game.label + " ↗";
  } else {
    modalLink.removeAttribute("href");
  }
  modalNote.textContent = game.link
    ? "Visuel de présentation illustratif. Les captures officielles sont disponibles sur la page du jeu."
    : "Illustration conceptuelle provisoire. Les informations de publication seront ajoutées lorsqu'elles seront confirmées.";
  if (!modal.open) modal.showModal();
  else modal.querySelector(".modal-close").focus();
}
document.querySelectorAll("[data-game]").forEach(button => {
  button.addEventListener("click", () => openGame(button.dataset.game, button));
});

if (modal) {
  const close = modal.querySelector(".modal-close");
  close.addEventListener("click", () => modal.close());
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
  });
}

const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".game-card")];
const count = document.querySelector("#filter-status");
const empty = document.querySelector("#no-results");
filters.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
    let visible = 0;
    cards.forEach(card => {
      const parts = (card.dataset.categories || "").split(" ");
      const match = value === "all" || parts.includes(value);
      card.hidden = !match;
      if (match) visible++;
    });
    if (count) count.textContent = visible + " projets affichés.";
    if (empty) empty.classList.toggle("show", visible === 0);
  });
});

const menuButton = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function setMenu(open) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", String(open));
  mobileNav.classList.toggle("open", open);
  menuButton.textContent = open ? "FERMER ✕" : "MENU ☰";
}
menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenu(false);
});
document.addEventListener("click", event => {
  if (mobileNav?.classList.contains("open") && !event.target.closest(".site-header")) setMenu(false);
});

document.querySelector("#year").textContent = new Date().getFullYear();
const reveal = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: "0px 0px 50px 0px" });
  reveal.forEach(element => observer.observe(element));
} else {
  reveal.forEach(element => element.classList.add("is-visible"));
}

const links = [...document.querySelectorAll(".desktop-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle("active", link.hash === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(section => navObserver.observe(section));
}
