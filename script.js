// ---------------------------------------------------------------------------
// AGENDA
// type: "talk" (palestra) ou "break" (intervalo). Para palestras, "speaker"
// deve ser igual ao "name" do palestrante na lista abaixo.
// ---------------------------------------------------------------------------
const schedule = [
  { start: "08:20", end: "08:30", type: "start", title: "Abertura" },
  { start: "08:30", end: "09:20", type: "talk", title: "Linux Sandboxing: Introdução, Técnicas e Escaping", speaker: "Gildásio Jr." },
  { start: "09:30", end: "10:20", type: "talk", title: "Windows Process Injection - DIY", speaker: "Alan Lacerda" },
  { start: "10:30", end: "11:20", type: "talk", title: "Compromentendo a segurança de um ERP utilizado por provedores de Internet", speaker: "Yueslly Lisboa" },
  { start: "11:30", end: "12:50", type: "break", title: "Almoço" },
  { start: "13:00", end: "13:50", type: "talk", title: "Hacking iOS Apps", speaker: "Fernando Pinheiro" },
  { start: "14:00", end: "14:50", type: "talk", title: "Quando o ps mente: detecção de rootkits na camada do kernel", speaker: "Victor Mascarenhas" },
  { start: "14:50", end: "15:05", type: "break", title: "Coffee-Break" },
  { start: "15:10", end: "16:00", type: "talk", title: "O PHP está morto?", speaker: "Adriele (Obtuosa)" },
  { start: "16:10", end: "17:00", type: "talk", title: "Cloud Security Hunting: Misconfigurations, Identities & Attack Paths", speaker: "Alexandro Silva (Alexos)" },
  { start: "17:10", end: "17:40", type: "finish", title: "Encerramento" }
];

// ---------------------------------------------------------------------------
// PALESTRANTES
// photo: coloque a foto em assets/palestrantes/ com o nome indicado abaixo
// (quadrada, mín. 400x400, rosto centralizado). Se o arquivo não existir,
// o card mostra as iniciais automaticamente.
// ---------------------------------------------------------------------------
const speakers = [
  { name: "Gildásio Jr.", initials: "GJ", photo: "assets/palestrantes/1.png" },
  { name: "Alan Lacerda", initials: "AL", photo: "assets/palestrantes/2.png" },
  { name: "Yueslly Lisboa", initials: "YL", photo: "assets/palestrantes/3.png" },
  { name: "Fernando Pinheiro", initials: "FP", photo: "assets/palestrantes/4.png" },
  { name: "Victor Mascarenhas", initials: "VM", photo: "assets/palestrantes/5.png" },
  { name: "Adriele (Obtuosa)", initials: "AO", photo: "assets/palestrantes/6.png" },
  { name: "Alexandro Silva (Alexos)", initials: "AS", photo: "assets/palestrantes/7.png" },
];

// ---------------------------------------------------------------------------
// PATROCINADORES
// Logos em assets/patrocinadores/ (PNG com fundo transparente, de preferência
// em branco/claro ou colorido — o fundo do site é escuro).
// "url" é opcional: se vazio, o logo não é clicável.
// Se o arquivo do logo não existir, aparece o nome do patrocinador no lugar.
// ---------------------------------------------------------------------------
const sponsors = [
  {
    tier: "Prata",
    className: "silver",
    items: [
      { name: "XSITE", url: "https://xsite.com.br/", logo: "assets/patrocinadores/1.png" },
      { name: "Apura", url: "https://apura.io/", logo: "assets/patrocinadores/2.png" },
    ],
  },
  {
    tier: "Bronze",
    className: "bronze",
    items: [
      { name: "IntruderLabs", url: "https://intruderlabs.com.br", logo: "assets/patrocinadores/3.png" },
    ],
  },
];

const supporters = [
  {
    name: "Nullbyte Security Conference",
    url: "https://www.nullbyte-con.org/",
    logo: "assets/apoiadores/1.png",
  },
  {
    name: "CajuSec",
    url: "https://www.cajusec.com.br/",
    logo: "assets/apoiadores/2.png",
  },
  {
    name: "Oxe Hacker Conference",
    url: "https://conference.oxehc.com.br/",
    logo: "assets/apoiadores/3.png",
  },
  {
    name: "Raul Hacker Club",
    url: "https://raulhc.cc/",
    logo: "assets/apoiadores/4.png",
  },
  {
    name: "AxéSec",
    url: "https://axesec.cc/",
    logo: "assets/apoiadores/5.png",
  },
  {
    name: "Donas Security",
    url: "https://www.instagram.com/donasecurity/",
    logo: "assets/apoiadores/6.png",
  },
];

// Se a imagem não carregar, troca pelo texto do atributo alt.
const IMG_FALLBACK = "this.replaceWith(Object.assign(document.createElement('span'),{className:'logo-fallback',textContent:this.alt}))";

function renderSchedule() {
  document.querySelector("#schedule").innerHTML = schedule.map((item) => `
    <article class="schedule-row ${item.type === "break" ? "is-break" : ""}">
      <div class="time">${item.start} – ${item.end}</div>
      <div><span class="schedule-title">${item.title}</span>${item.type === "break" ? '<span class="tag intervalo">[intervalo]</span>' : ""}</div>
      <div class="speaker-meta">${item.speaker || ""}</div>
    </article>
  `).join("");
}

function renderSpeakers() {
  const talkBySpeaker = Object.fromEntries(
    schedule.filter((item) => item.type === "talk").map((item) => [item.speaker, item])
  );

  document.querySelector("#speakers").innerHTML = speakers.map((speaker, index) => {
    const talk = talkBySpeaker[speaker.name];
    return `
    <article class="speaker-card" data-initials="${speaker.initials}">
      <span class="speaker-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="speaker-avatar">
        <span>${speaker.initials}</span>
        ${speaker.photo ? `<img src="${speaker.photo}" alt="${speaker.name}" loading="lazy" onerror="this.remove()">` : ""}
      </div>
      <h3>${speaker.name}</h3>
      ${talk ? `<p>${talk.title}</p><small>${talk.start} – ${talk.end}</small>` : ""}
    </article>`;
  }).join("");
}

function renderSponsors() {
  document.querySelector("#sponsors").innerHTML = sponsors.map((tier) => `
    <div class="sponsor-tier">
      <div class="tier-name ${tier.className}">${tier.tier}</div>
      <div class="sponsor-logos">
        ${tier.items.map((item) => {
          const inner = `<img src="${item.logo}" alt="${item.name}" loading="lazy" onerror="${IMG_FALLBACK}">`;
          return item.url
            ? `<a class="sponsor-logo ${tier.className}" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}">${inner}</a>`
            : `<div class="sponsor-logo ${tier.className}">${inner}</div>`;
        }).join("")}
      </div>
    </div>
  `).join("");

  document.querySelector("#supporters").innerHTML = supporters.map((supporter) => `
    <a class="supporter-card" href="${supporter.url}" target="_blank" rel="noopener noreferrer" aria-label="${supporter.name}">
      <img src="${supporter.logo}" alt="${supporter.name}" loading="lazy">
    </a>
  `).join("");
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const sync = () => header.classList.toggle("scrolled", window.scrollY > 20);
  sync();
  window.addEventListener("scroll", sync, { passive: true });
}

function setupCountdown() {
  const target = new Date("2026-09-26T08:30:00-03:00").getTime();
  const countdown = document.querySelector("#countdown");

  function render() {
    const diff = Math.max(0, target - Date.now());
    const values = [
      { value: Math.floor(diff / 86400000), label: "D" },
      { value: Math.floor((diff % 86400000) / 3600000), label: "H" },
      { value: Math.floor((diff % 3600000) / 60000), label: "M" },
      { value: Math.floor((diff % 60000) / 1000), label: "S" },
    ];

    countdown.innerHTML = values.map((item, index) => `
      <span class="countdown-block">
        <strong>${String(item.value).padStart(2, "0")}</strong><span>${item.label}</span>
      </span>
      ${index < values.length - 1 ? '<span class="countdown-sep">:</span>' : ""}
    `).join("");
  }

  render();
  setInterval(render, 1000);
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

renderSchedule();
renderSpeakers();
renderSponsors();
setupMenu();
setupHeader();
setupCountdown();
setupReveal();
