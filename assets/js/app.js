const DATA_URL = "data/data.json";

const state = {
  data: null,
  lang: localStorage.getItem("lang") || "en",
  theme: localStorage.getItem("theme") || "dark"
};

function getData(){
  return fetch(DATA_URL).then(r => r.json()).then(json => {
    const local = localStorage.getItem("portfolioData");
    if(local){
      try { return JSON.parse(local); } catch { return json; }
    }
    return json;
  });
}

function t(obj){
  if(!obj) return "";
  return obj[state.lang] || obj.en || obj.fa || "";
}

function setTheme(){
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("theme", state.theme);
}

function setLang(){
  document.documentElement.setAttribute("dir", state.lang === "fa" ? "rtl" : "ltr");
  localStorage.setItem("lang", state.lang);
}

function render(){
  const d = state.data;
  document.title = t(d.meta.siteTitle);

  document.getElementById("brandName").textContent = t(d.brand.name);
  document.getElementById("heroName").textContent = t(d.hero.name);
  document.getElementById("heroSubtitle").textContent = t(d.hero.subtitle);

  const badges = document.getElementById("heroBadges");
  badges.innerHTML = "";
  d.hero.badges.forEach(b => {
    const el = document.createElement("div");
    el.className = "badge";
    el.textContent = b;
    badges.appendChild(el);
  });

  const ctaPrimary = document.getElementById("ctaPrimary");
  ctaPrimary.textContent = t(d.hero.cta.primary.label);
  ctaPrimary.href = d.hero.cta.primary.link;

  const ctaSecondary = document.getElementById("ctaSecondary");
  ctaSecondary.textContent = t(d.hero.cta.secondary.label);
  ctaSecondary.href = d.hero.cta.secondary.link;

  document.getElementById("orbitTitle").textContent = t(d.hero.orbit.title);
  document.getElementById("orbitDesc").textContent = t(d.hero.orbit.desc);

  const avatar = document.getElementById("profileAvatar");
  avatar.style.backgroundImage = `url('${d.profile.avatar}')`;

  document.getElementById("profileName").textContent = t(d.hero.name);
  document.getElementById("profileRole").textContent = t(d.profile.role);

  const profileLinks = document.getElementById("profileLinks");
  profileLinks.innerHTML = "";
  if(d.contact.linkedin){
    profileLinks.innerHTML += `<a class="btn" href="${d.contact.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i>LinkedIn</a>`;
  }
  if(d.contact.github){
    profileLinks.innerHTML += `<a class="btn" href="${d.contact.github}" target="_blank"><i class="fa-brands fa-github"></i>GitHub</a>`;
  }

  document.getElementById("aboutTitle").textContent = t(d.about.title);
  document.getElementById("aboutText").textContent = t(d.about.text);

  document.getElementById("statsTitle").textContent = t(d.ui.sections.stats);
  const statsGrid = document.getElementById("statsGrid");
  statsGrid.innerHTML = "";
  d.stats.forEach(s => {
    statsGrid.innerHTML += `
      <div class="card fade-up">
        <h3>${s.value}</h3>
        <p>${t(s.label)}</p>
      </div>
    `;
  });

  document.getElementById("skillsTitle").textContent = t(d.ui.sections.skills);
  const skillsGrid = document.getElementById("skillsGrid");
  skillsGrid.innerHTML = "";
  d.skills.forEach(s => {
    skillsGrid.innerHTML += `
      <div class="card skill fade-up">
        <strong>${t(s.name)}</strong>
        <div class="bar"><span style="--val:${s.level}"></span></div>
      </div>
    `;
  });

  document.getElementById("educationTitle").textContent = t(d.ui.sections.education);
  const eduGrid = document.getElementById("educationGrid");
  eduGrid.innerHTML = "";
  d.education.forEach(e => {
    eduGrid.innerHTML += `
      <div class="card fade-up">
        <h4>${t(e.title)}</h4>
        <p>${t(e.place)} · ${e.period}</p>
        <p>${t(e.desc)}</p>
      </div>
    `;
  });

  document.getElementById("languagesTitle").textContent = t(d.ui.sections.languages);
  const langList = document.getElementById("languagesList");
  langList.innerHTML = "";
  d.languages.forEach(l => {
    const el = document.createElement("div");
    el.className = "lang-pill";
    el.textContent = l.name + (l.score ? ` - ${l.score}` : "");
    langList.appendChild(el);
  });

  document.getElementById("articlesTitle").textContent = t(d.ui.sections.articles);
  const articlesGrid = document.getElementById("articlesGrid");
  articlesGrid.innerHTML = "";
  d.articles.forEach(a => {
    articlesGrid.innerHTML += `
      <div class="card article-card fade-up">
        <img src="${a.image}" alt="">
        <h4>${t(a.title)}</h4>
        <p>${t(a.summary)}</p>
        <a class="btn" href="${a.url}" target="_blank">Read</a>
      </div>
    `;
  });

  document.getElementById("contactTitle").textContent = t(d.ui.sections.contact);
  const contact = document.getElementById("contactList");
  contact.innerHTML = "";
  const c = d.contact;

  if(c.email) contact.innerHTML += `<a href="mailto:${c.email}"><i class="fa-solid fa-envelope"></i>${c.email}</a>`;
  if(c.phone) contact.innerHTML += `<a href="tel:${c.phone}"><i class="fa-solid fa-phone"></i>${c.phone}</a>`;
  if(c.location) contact.innerHTML += `<a href="#"><i class="fa-solid fa-location-dot"></i>${c.location}</a>`;
  if(c.telegram) contact.innerHTML += `<a href="${c.telegram}" target="_blank"><i class="fa-brands fa-telegram"></i>Telegram</a>`;
  if(c.instagram) contact.innerHTML += `<a href="${c.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i>Instagram</a>`;

  const langToggle = document.getElementById("langToggle");
  langToggle.querySelector("span").textContent = state.lang === "fa" ? "EN" : "FA";

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.querySelector("span").textContent = state.theme === "dark" ? d.meta.theme.lightLabel : d.meta.theme.darkLabel;

  document.getElementById("projectsBtn").querySelector("span").textContent = t(d.ui.nav.projects);
}

document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "fa" ? "en" : "fa";
  setLang();
  render();
});

document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  setTheme();
  render();
});

getData().then(data => {
  state.data = data;
  setLang();
  setTheme();
  render();
});
