const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navIcon = navToggle.querySelector("i");
const year = document.getElementById("year");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

setTheme(savedTheme || "dark");
year.textContent = new Date().getFullYear();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navIcon.className = "fa-solid fa-bars";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
