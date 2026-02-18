const progress = document.getElementById("scrollProgress");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const root = document.documentElement;

const i18n = {
  fa: {
    brand_name: "شروین رستگار",
    brand_tag: "مهندس مکاترونیک | پژوهشگر دیپ‌لرنینگ",
    lang_btn: "EN",
    theme_btn: "تاریک",
    back_home: "بازگشت",
    projects_page_title: "گالری پروژه‌ها و جزئیات فنی",
    projects_page_desc: "در این صفحه می‌توانید تصاویر، ویدیوها و توضیحات کامل پروژه‌ها را مشاهده کنید.",
    proj_detail_title: "بازوی رباتیک هوشمند",
    proj_detail_desc: "این پروژه با ترکیب کنترل تطبیقی، بینایی ماشین و شبکه‌های عصبی عمیق توسعه داده شده است.",
    other_projects_title: "سایر پروژه‌ها",
    other_projects_desc: "نمونه‌های بیشتر با توضیحات مختصر",
    proj2_title: "سیستم تشخیص عیب",
    proj2_desc: "یادگیری عمیق برای تشخیص خودکار خطا",
    proj3_title: "بینایی ماشین صنعتی",
    proj3_desc: "تشخیص کیفیت با پردازش تصویر",
    proj4_title: "پلتفرم داده‌محور",
    proj4_desc: "تحلیل داده برای بهینه‌سازی خطوط تولید",
    articles_title: "مقالات",
    articles_desc: "انتشارهای پژوهشی در حوزه مکاترونیک و یادگیری عمیق",
    art1_title: "کنترل تطبیقی در رباتیک صنعتی",
    art1_desc: "مروری بر روش‌های نوین در کنترل پیشرفته ربات‌ها",
    art2_title: "شبکه‌های عصبی عمیق در تشخیص عیب",
    art2_desc: "تحلیل مدل‌های CNN برای سیستم‌های صنعتی",
    art3_title: "بینایی ماشین بلادرنگ",
    art3_desc: "بهینه‌سازی تشخیص کیفیت با معماری سبک",
    cta_cv: "دانلود رزومه",
    footer_text: "© 2026 تمام حقوق محفوظ است."
  },
  en: {
    brand_name: "Shervin Rastegar",
    brand_tag: "Mechatronics Engineer | Deep Learning Researcher",
    lang_btn: "FA",
    theme_btn: "Dark",
    back_home: "Back",
    projects_page_title: "Project Gallery and Technical Details",
    projects_page_desc: "View images, videos and full project descriptions here.",
    proj_detail_title: "Smart Robotic Arm",
    proj_detail_desc: "Developed using adaptive control, computer vision and deep neural networks.",
    other_projects_title: "Other Projects",
    other_projects_desc: "More samples with short descriptions",
    proj2_title: "Fault Detection System",
    proj2_desc: "Deep learning for automatic fault detection",
    proj3_title: "Industrial Vision",
    proj3_desc: "Quality inspection with image processing",
    proj4_title: "Data‑Driven Platform",
    proj4_desc: "Data analytics for production optimization",
    articles_title: "Articles",
    articles_desc: "Research publications in mechatronics and deep learning",
    art1_title: "Adaptive Control in Industrial Robotics",
    art1_desc: "A review of modern methods for advanced robotic control",
    art2_title: "Deep Neural Networks for Fault Detection",
    art2_desc: "Analyzing CNN models for industrial systems",
    art3_title: "Real‑time Machine Vision",
    art3_desc: "Optimizing quality inspection with lightweight architectures",
    cta_cv: "Download CV",
    footer_text: "© 2026 All rights reserved."
  }
};

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18n[lang][key] || el.textContent;
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  const icon = theme === "dark" ? "ri-moon-clear-line" : "ri-sun-line";
  themeToggle.querySelector("i").className = icon;
}

window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = `${scrolled}%`;
});

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

langToggle.addEventListener("click", () => {
  const current = document.documentElement.lang === "fa" ? "en" : "fa";
  applyLang(current);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const tiltElements = document.querySelectorAll(".tilt");
tiltElements.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

applyLang("fa");
setTheme("dark");
