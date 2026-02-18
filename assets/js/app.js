const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const percent = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  progress.style.width = percent + "%";
});

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const body = document.body;
    body.setAttribute("data-theme", body.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
}

const upload = document.getElementById("avatar-upload");
const preview = document.getElementById("avatar-preview");
if (upload && preview) {
  upload.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    preview.src = url;
  });
}
