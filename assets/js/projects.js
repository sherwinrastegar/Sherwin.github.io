const DATA_URL = "data/data.json";

const state = {
  data: null,
  lang: localStorage.getItem("lang") || "en",
  theme: localStorage.getItem("theme") || "dark",
  currentGallery: [],
  currentIndex: 0
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
}

function setLang(){
  document.documentElement.setAttribute("dir", state.lang === "fa" ? "rtl" : "ltr");
}

function render(){
  const d = state.data;

  document.getElementById("brandName").textContent = t(d.brand.name);
  document.getElementById("projectsTitle").textContent = t(d.ui.projectsPage.title);
  document.getElementById("projectsSubtitle").textContent = t(d.ui.projectsPage.subtitle);
  document.getElementById("homeBtn").textContent = t(d.ui.nav.home);

  const langToggle = document.getElementById("langToggle");
  langToggle.querySelector("span").textContent = state.lang === "fa" ? "EN" : "FA";

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.querySelector("span").textContent = state.theme === "dark" ? d.meta.theme.lightLabel : d.meta.theme.darkLabel;

  const tags = new Set();
  d.projects.forEach(p => p.tags.forEach(tg => tags.add(tg)));
  const filterBar = document.getElementById("filterBar");
  filterBar.innerHTML = `<div class="filter-pill active" data-tag="all">All</div>`;
  tags.forEach(tag => {
    filterBar.innerHTML += `<div class="filter-pill" data-tag="${tag}">${tag}</div>`;
  });

  filterBar.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      filterBar.querySelectorAll(".filter-pill").forEach(x => x.classList.remove("active"));
      pill.classList.add("active");
      renderProjects(pill.dataset.tag);
    });
  });

  renderProjects("all");
}

function renderProjects(filterTag){
  const d = state.data;
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  d.projects.forEach(project => {
    if(filterTag !== "all" && !project.tags.includes(filterTag)) return;

    const cover = project.gallery[0];
    const thumb = cover.thumb || cover.src;

    grid.innerHTML += `
      <div class="card gallery-card fade-up">
        <img class="gallery-media" src="${thumb}" alt="">
        <div class="gallery-info">
          <h4>${t(project.title)}</h4>
          <p>${t(project.desc)}</p>
          <div class="gallery-tags">${project.tags.map(tg => `<span class="badge">${tg}</span>`).join("")}</div>
          <a class="btn open-gallery" data-project="${t(project.title)}">Open Gallery</a>
        </div>
      </div>
    `;
  });

  grid.querySelectorAll(".open-gallery").forEach(btn => {
    const pTitle = btn.dataset.project;
    btn.addEventListener("click", () => {
      const project = state.data.projects.find(p => t(p.title) === pTitle);
      openGallery(project);
    });
  });
}

function openGallery(project){
  state.currentGallery = project.gallery;
  state.currentIndex = 0;
  showLightbox(project);
}

function showLightbox(project){
  const lb = document.getElementById("lightbox");
  const content = document.getElementById("lbContent");
  const caption = document.getElementById("lbCaption");
  const item = state.currentGallery[state.currentIndex];

  content.innerHTML = "";
  caption.textContent = `${t(project.title)} • ${state.currentIndex + 1}/${state.currentGallery.length}`;

  if(item.type === "image"){
    const img = document.createElement("img");
    img.src = item.src;
    content.appendChild(img);
  } else if(item.type === "video"){
    if(item.provider === "external"){
      const iframe = document.createElement("iframe");
      iframe.src = item.src;
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      content.appendChild(iframe);
    } else {
      const vid = document.createElement("video");
      vid.src = item.src;
      vid.controls = true;
      content.appendChild(vid);
    }
  }

  lb.classList.add("show");
  lb.dataset.currentProject = t(project.title);
}

document.getElementById("lbClose").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("show");
});

document.getElementById("lbPrev").addEventListener("click", () => {
  const d = state.data;
  const title = document.getElementById("lightbox").dataset.currentProject;
  const project = d.projects.find(p => t(p.title) === title);
  state.currentIndex = (state.currentIndex - 1 + state.currentGallery.length) % state.currentGallery.length;
  showLightbox(project);
});

document.getElementById("lbNext").addEventListener("click", () => {
  const d = state.data;
  const title = document.getElementById("lightbox").dataset.currentProject;
  const project = d.projects.find(p => t(p.title) === title);
  state.currentIndex = (state.currentIndex + 1) % state.currentGallery.length;
  showLightbox(project);
});

document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "fa" ? "en" : "fa";
  localStorage.setItem("lang", state.lang);
  setLang();
  render();
});

document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", state.theme);
  setTheme();
  render();
});

getData().then(data => {
  state.data = data;
  setLang();
  setTheme();
  render();
});
