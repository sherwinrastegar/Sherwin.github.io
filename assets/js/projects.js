// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

function updateThemeLabel() {
  const isLight = htmlEl.getAttribute("data-theme") === "light";
  themeToggle.textContent = isLight ? "Light" : "Dark";
}
themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  htmlEl.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  updateThemeLabel();
});
updateThemeLabel();

// Language Toggle
const langToggle = document.getElementById("langToggle");
langToggle.addEventListener("click", () => {
  langToggle.textContent = langToggle.textContent === "EN" ? "FA" : "EN";
});

// Load All Projects
fetch("assets/data/projects.json")
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById("projectsGallery");
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}" class="proj-thumb">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="media-row">
          ${p.media.map(m => `<img src="${m}" class="proj-thumb" alt="">`).join("")}
        </div>
      `;
      gallery.appendChild(card);
    });
  });

// Lightbox
const lightbox = document.getElementById("lightbox");
const lbImg = document.querySelector(".lb-img");
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("proj-thumb")) {
    lbImg.src = e.target.src;
    lightbox.style.display = "flex";
  }
});
document.querySelector(".lb-close").addEventListener("click", () => {
  lightbox.style.display = "none";
});
