const dictionary = {
  en: {
    name: "Your Name",
    title: "Full-Stack Developer",
    summary: "Passionate developer with a focus on UI/UX and scalable web apps.",
    skillsTitle: "Skills",
    languagesTitle: "Languages",
    experienceTitle: "Experience",
    educationTitle: "Education",
    expLabel: "Years Experience",
    projectsLabel: "Projects",
    clientsLabel: "Clients",
    footerText: "© 2026 Your Name. All rights reserved.",
    projectsLink: "Projects"
  },
  fa: {
    name: "نام شما",
    title: "توسعه‌دهنده فول‌استک",
    summary: "توسعه‌دهنده‌ای علاقه‌مند به UI/UX و ساخت نرم‌افزارهای مقیاس‌پذیر.",
    skillsTitle: "مهارت‌ها",
    languagesTitle: "زبان‌ها",
    experienceTitle: "سوابق کاری",
    educationTitle: "تحصیلات",
    expLabel: "سال تجربه",
    projectsLabel: "پروژه‌ها",
    clientsLabel: "مشتری‌ها",
    footerText: "© 2026 نام شما. تمامی حقوق محفوظ است.",
    projectsLink: "پروژه‌ها"
  }
};

const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");

function setTheme(theme){
  if(theme === "light"){
    document.body.classList.add("light");
  }else{
    document.body.classList.remove("light");
  }
  localStorage.setItem("theme", theme);
}

function setLanguage(lang){
  const data = dictionary[lang];
  document.getElementById("name").textContent = data.name;
  document.getElementById("title").textContent = data.title;
  document.getElementById("summary").textContent = data.summary;
  document.getElementById("skillsTitle").textContent = data.skillsTitle;
  document.getElementById("languagesTitle").textContent = data.languagesTitle;
  document.getElementById("experienceTitle").textContent = data.experienceTitle;
  document.getElementById("educationTitle").textContent = data.educationTitle;
  document.getElementById("expLabel").textContent = data.expLabel;
  document.getElementById("projectsLabel").textContent = data.projectsLabel;
  document.getElementById("clientsLabel").textContent = data.clientsLabel;
  document.getElementById("footerText").textContent = data.footerText;
  document.getElementById("projectsLink").textContent = data.projectsLink;

  if(lang === "fa"){
    document.body.classList.add("rtl");
    langToggle.textContent = "EN";
  }else{
    document.body.classList.remove("rtl");
    langToggle.textContent = "FA";
  }
  localStorage.setItem("lang", lang);
}

themeToggle.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

langToggle.addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "en";
  setLanguage(current === "en" ? "fa" : "en");
});

const storedTheme = localStorage.getItem("theme") || "dark";
const storedLang = localStorage.getItem("lang") || "en";
setTheme(storedTheme);
setLanguage(storedLang);

const scrollBar = document.getElementById("scrollBar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = percent + "%";
});
