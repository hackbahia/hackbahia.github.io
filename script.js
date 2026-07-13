const schedule = [
  { time: "08:00", title: "Credenciamento", speaker: "Check-in & Coffee", tag: "geral" },
  { time: "09:00", title: "Abertura Oficial", speaker: "Organização HackBahia", tag: "abertura" },
  { time: "09:30", title: "Keynote: 10 Anos de HackBahia", speaker: "Fundadores", tag: "keynote" },
  { time: "10:30", title: "Red Team Operations na Prática", speaker: "Zoziel Freire", tag: "ofensiva" },
  { time: "11:30", title: "Análise de Malware com IA", speaker: "Andrey Glauzer", tag: "defesa" },
  { time: "12:30", title: "Almoço & Networking", speaker: "Intervalo", tag: "geral" },
  { time: "14:00", title: "Hacking em Ambientes Cloud", speaker: "Maicon Christ", tag: "ofensiva" },
  { time: "15:00", title: "Forense Digital: Do Incidente ao Tribunal", speaker: "Gabriel Luiz", tag: "forense" },
  { time: "16:00", title: "Workshop: CTF ao Vivo", speaker: "Comunidade HackBahia", tag: "workshop" },
  { time: "17:30", title: "Encerramento & Premiações", speaker: "Organização", tag: "abertura" },
];

const speakers = [
  { name: "Zoziel Freire", role: "Red Team / Forense Digital", years: "15+ anos", initials: "ZF", featured: true },
  { name: "Andrey Glauzer", role: "Malware Analysis / Threat Intel", years: "10+ anos", initials: "AG" },
  { name: "Maicon Christ", role: "Cloud Security / Pentest", years: "7+ anos", initials: "MC", featured: true },
  { name: "Gabriel Luiz", role: "Forense Digital / IR", years: "8+ anos", initials: "GL" },
  { name: "Fábio Castro", role: "Bug Bounty / AppSec", years: "6+ anos", initials: "FC" },
  { name: "Ricardo Longatto", role: "Engenharia Reversa", years: "12+ anos", initials: "RL", featured: true },
];

const sponsors = [
  // Adicione patrocinadores aqui quando os apoios forem confirmados.
  // { tier: "Ouro", className: "gold", names: ["Nome do patrocinador"] },
  // { tier: "Prata", className: "silver", names: ["Nome do patrocinador"] },
  // { tier: "Bronze", className: "bronze", names: ["Nome do patrocinador"] },
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
];

function renderSchedule() {
  document.querySelector("#schedule").innerHTML = schedule.map((item) => `
    <article class="schedule-row">
      <div class="time">${item.time}</div>
      <div><span class="schedule-title">${item.title}</span><span class="tag ${item.tag}">[${item.tag}]</span></div>
      <div class="speaker-meta">${item.speaker}</div>
    </article>
  `).join("");
}

function renderSpeakers() {
  document.querySelector("#speakers").innerHTML = speakers.map((speaker, index) => `
    <article class="speaker-card ${speaker.featured ? "featured" : ""}" data-initials="${speaker.initials}">
      <span class="speaker-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="speaker-avatar">${speaker.initials}</div>
      <h3>${speaker.name}</h3>
      <p>${speaker.role}</p>
      <small>${speaker.years}</small>
    </article>
  `).join("");
}

function renderSponsors() {
  const sponsorTarget = document.querySelector("#sponsors");

  sponsorTarget.innerHTML = sponsors.length
    ? sponsors.map((tier) => `
      <div class="sponsor-tier">
        <div class="tier-name ${tier.className}">${tier.tier}</div>
        <div class="sponsor-list">${tier.names.map((name) => `<span class="sponsor-pill">${name}</span>`).join("")}</div>
      </div>
    `).join("")
    : `
      <div class="sponsor-callout">
        <span>// cotas abertas</span>
        <h3>Seja um patrocinador</h3>
        <p>Apoie a edição de 10 anos do HackBahia e conecte sua marca à comunidade de segurança da informação.</p>
        <a href="mailto:contato@hackbahia.com.br?subject=Patrocínio%20HackBahia" class="button button-ghost">Falar com a organização</a>
      </div>
    `;

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
  const target = new Date("2026-09-26T09:00:00-03:00").getTime();
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

// renderSchedule();
// renderSpeakers();
renderSponsors();
setupMenu();
setupHeader();
setupCountdown();
setupReveal();
