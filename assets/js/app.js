const DATA_KEY = "portfolioData";

const state = {
  data: null,
  lang: localStorage.getItem("lang") || "fa",
  theme: localStorage.getItem("theme") || "dark"
};

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeLabel();
}

function updateThemeLabel() {
  const isLight = state.theme === "light";
  const isFa = state.lang === "fa";
  const label = isFa ? (isLight ? "روشن" : "تاریک") : (isLight ? "Light" : "Dark");
  document.getElementById("themeToggle").textContent = label;
}

function applyLang() {
  document.documentElement.setAttribute("lang", state.lang);
  document.documentElement.setAttribute("dir", state.lang === "fa" ? "rtl" : "ltr");
  const label = state.lang === "fa" ? "EN" : "FA";
  document.getElementById("langToggle").textContent = label;
}

async function loadData() {
  const local = localStorage.getItem(DATA_KEY);
  if (local) return JSON.parse(local);
  const res = await fetch("assets/data/content.json");
  return await res.json();
}

function t(obj) {
  if (typeof obj === "string") return obj;
  return obj[state.lang] || obj.fa || obj.en || "";
}

function renderHeroStats(stats) {
  const wrap = document.getElementById("heroStats");
  wrap.innerHTML = "";
  stats.forEach(s => {
    const div = document.createElement("div");
    div.className = "stat glow-card";
    div.innerHTML = `<strong>${s.value}</strong><div>${t(s.label)}</div>`;
    wrap.appendChild(div);
  });
}

function renderSkills(skills) {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  skills.forEach(sk => {
    const item = document.createElement("div");
    item.className = "skill glow-card";
    item.innerHTML = `
      <div class="skill-head">
        <span>${sk.name}</span>
        <span>${sk.level}%</span>
      </div>
      <div class="skill-bar"><span style="width:${sk.level}%"></span></div>
    `;
    grid.appendChild(item);
  });
}

function renderSystem(items) {
  const grid = document.getElementById("systemGrid");
  grid.innerHTML = "";
  items.forEach(it => {
    const card = document.createElement("div");
    card.className = "card glow-card";
    card.innerHTML = `
      <div class="icon">⚙️</div>
      <h3>${t(it.title)}</h3>
      <p>${t(it.desc)}</p>
    `;
    grid.appendChild(card);
  });
}

function renderProjectsPreview(projects) {
  const grid = document.getElementById("projectsPreview");
  grid.innerHTML = "";
  projects.slice(0,3).forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card glow-card";
    card.innerHTML = `
      <img class="project-thumb" src="${p.thumbnail}" alt="${t(p.title)}">
      <div class="project-info">
        <h3>${t(p.title)}</h3>
        <p>${t(p.desc)}</p>
        ${(p.tags || []).map(tag => `<span class="chip">${tag}</span>`).join("")}
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderArticles(articles) {
  const grid = document.getElementById("articlesGrid");
  grid.innerHTML = "";
  articles.forEach(a => {
    const card = document.createElement("div");
    card.className = "card glow-card";
    card.innerHTML = `
      <h3>${t(a.title)}</h3>
      <p>${t(a.desc)}</p>
      ${a.link ? `<a class="chip" href="${a.link}">Read</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

function renderTimeline(items, id) {
  const wrap = document.getElementById(id);
  wrap.innerHTML = "";
  items.forEach(it => {
    const div = document.createElement("div");
    div.className = "timeline-item glow-card";
    div.innerHTML = `<span class="dot"></span><h3>${t(it.title)}</h3><p>${t(it.desc)}</p>`;
    wrap.appendChild(div);
  });
}

function renderLanguages(items) {
  const grid = document.getElementById("languagesGrid");
  grid.innerHTML = "";
  items.forEach(l => {
    const div = document.createElement("div");
    div.className = "card glow-card";
    div.innerHTML = `<h3>${l.name}</h3><p>${l.level}</p>`;
    grid.appendChild(div);
  });
}

function renderIELTS(scores) {
  const grid = document.getElementById("ieltsGrid");
  grid.innerHTML = "";
  Object.keys(scores).forEach(k => {
    const val = scores[k];
    const percent = Math.min(100, (val / 9) * 100);
    const div = document.createElement("div");
    div.className = "skill glow-card";
    div.innerHTML = `
      <div class="skill-head">
        <span>${k}</span><span>${val}</span>
      </div>
      <div class="skill-bar"><span style="width:${percent}%"></span></div>
    `;
    grid.appendChild(div);
  });
}

function renderSocial(items) {
  const wrap = document.getElementById("socialIcons");
  wrap.innerHTML = "";
  items.forEach(s => {
    const a = document.createElement("a");
    a.href = s.url || "#";
    a.className = `icon ${s.type}`;
    a.title = s.type;
    wrap.appendChild(a);
  });
}

function bindLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.querySelector(".lb-img");
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-thumb")) {
      lbImg.src = e.target.src;
      lightbox.style.display = "flex";
    }
  });
  document.querySelector(".lb-close").addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

function bindReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
  }, { threshold: 0.2 });
  reveals.forEach(r => observer.observe(r));
}

function bindGlow() {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".glow-card").forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });
}

function bindScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / height) * 100 + "%";
  });
}

function bindThemeAndLang() {
  document.getElementById("themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", state.theme);
    applyTheme();
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "fa" ? "en" : "fa";
    localStorage.setItem("lang", state.lang);
    applyLang();
    renderAll();
  });
}

function renderAll() {
  const d = state.data;
  document.getElementById("brandName").textContent = t(d.site.name);
  document.getElementById("brandRole").textContent = t(d.site.role);
  document.getElementById("heroTitle").textContent = t(d.site.name);
  document.getElementById("heroDesc").textContent = t(d.site.tagline);
  document.getElementById("heroEyebrow").textContent = t(d.site.eyebrow);

  document.getElementById("aboutDesc").textContent = t(d.about);

  renderHeroStats(d.stats);
  renderSkills(d.skills);
  renderSystem(d.systemDesign);
  renderProjectsPreview(d.projects);
  renderArticles(d.articles);
  renderTimeline(d.timelineProfessional, "timelineProf");
  renderTimeline(d.timelineEducation, "timelineEdu");
  renderLanguages(d.languages);
  renderIELTS(d.ielts);
  renderSocial(d.social);
}

(async function init() {
  state.data = await loadData();
  applyTheme();
  applyLang();
  bindThemeAndLang();
  bindScrollProgress();
  bindLightbox();
  bindReveal();
  bindGlow();
  renderAll();
})();
