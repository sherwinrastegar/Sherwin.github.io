const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");
const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");

const dictionary = {
  en: {
    dir: "ltr",
    brand: "My Resume",
    name: "John Doe",
    about: "A creative and detail-oriented software engineer with passion for beautiful UI/UX, scalable systems, and modern web technologies. I build products that are fast, elegant, and delightful.",
    role: "Senior Front-End Developer",
    location: "Tehran, Iran",
    projectsTitle: "Projects",
    skillsTitle: "Skills",
    langsTitle: "Languages",
    contactTitle: "Contact",
    p1t: "Nebula Dashboard",
    p1d: "Analytics platform with interactive charts and real-time data visualization.",
    p2t: "Nova E-Commerce",
    p2d: "High-converting store with modern UI and fast checkout experience.",
    p3t: "Pulse Mobile App",
    p3d: "A sleek app UI for fitness tracking and healthy habits.",
    langs: ["English — Fluent", "Persian — Native"],
    langBtn: "FA",
    themeBtnDark: "Dark",
    themeBtnLight: "Light"
  },
  fa: {
    dir: "rtl",
    brand: "رزومه من",
    name: "محمد رضایی",
    about: "مهندس نرم‌افزار خلاق و دقیق با علاقه به طراحی UI/UX مدرن، سیستم‌های مقیاس‌پذیر و تکنولوژی‌های به‌روز وب. من محصولاتی سریع، زیبا و حرفه‌ای می‌سازم.",
    role: "توسعه‌دهنده ارشد فرانت‌اند",
    location: "تهران، ایران",
    projectsTitle: "پروژه‌ها",
    skillsTitle: "مهارت‌ها",
    langsTitle: "زبان‌ها",
    contactTitle: "ارتباط",
    p1t: "داشبورد نبولا",
    p1d: "پلتفرم تحلیلی با نمودارهای تعاملی و داده‌های آنی.",
    p2t: "فروشگاه نووا",
    p2d: "فروشگاه مدرن با تجربه خرید سریع و نرخ تبدیل بالا.",
    p3t: "اپلیکیشن پالس",
    p3d: "طراحی اپلیکیشن سلامت با رابط کاربری مینیمال و جذاب.",
    langs: ["انگلیسی — حرفه‌ای", "فارسی — زبان مادری"],
    langBtn: "EN",
    themeBtnDark: "تاریک",
    themeBtnLight: "روشن"
  }
};

function setLanguage(lang){
  document.documentElement.lang = lang;
  document.documentElement.dir = dictionary[lang].dir;

  document.getElementById("brandText").textContent = dictionary[lang].brand;
  document.getElementById("name").textContent = dictionary[lang].name;
  document.getElementById("about").textContent = dictionary[lang].about;
  document.getElementById("role").textContent = dictionary[lang].role;
  document.getElementById("location").textContent = dictionary[lang].location;
  document.getElementById("projectsTitle").textContent = dictionary[lang].projectsTitle;
  document.getElementById("skillsTitle").textContent = dictionary[lang].skillsTitle;
  document.getElementById("langsTitle").textContent = dictionary[lang].langsTitle;
  document.getElementById("contactTitle").textContent = dictionary[lang].contactTitle;
  document.getElementById("p1t").textContent = dictionary[lang].p1t;
  document.getElementById("p1d").textContent = dictionary[lang].p1d;
  document.getElementById("p2t").textContent = dictionary[lang].p2t;
  document.getElementById("p2d").textContent = dictionary[lang].p2d;
  document.getElementById("p3t").textContent = dictionary[lang].p3t;
  document.getElementById("p3d").textContent = dictionary[lang].p3d;

  const langList = document.getElementById("langList");
  langList.innerHTML = "";
  dictionary[lang].langs.forEach(l => {
    const span = document.createElement("span");
    span.className = "lang-pill";
    span.textContent = l;
    langList.appendChild(span);
  });

  langBtn.textContent = dictionary[lang].langBtn;

  const theme = document.body.getAttribute("data-theme");
  if(theme === "dark"){
    themeBtn.textContent = dictionary[lang].themeBtnDark;
  } else {
    themeBtn.textContent = dictionary[lang].themeBtnLight;
  }
}

function toggleTheme(){
  const current = document.body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  const lang = document.documentElement.lang;
  themeBtn.textContent = next === "dark" ? dictionary[lang].themeBtnDark : dictionary[lang].themeBtnLight;
  themeToggle.querySelector("i").className = next === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

function init(){
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);

  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);

  themeToggle.addEventListener("click", toggleTheme);
  langToggle.addEventListener("click", () => {
    const current = document.documentElement.lang;
    const next = current === "en" ? "fa" : "en";
    localStorage.setItem("lang", next);
    setLanguage(next);
  });
}

init();

