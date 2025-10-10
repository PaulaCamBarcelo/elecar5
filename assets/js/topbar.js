// --- Toggle menú móvil ---
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// --- Ocultar / mostrar topbar ---
let lastScrollTop = 0;
const topbar = document.getElementById("topbar");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    // Bajando → ocultar topbar
    topbar.classList.add("topbar-hidden");
    navbar.style.top = "0";
  } else {
    // Subiendo → mostrar topbar
    topbar.classList.remove("topbar-hidden");
    navbar.style.top = topbar.offsetHeight + "px";
  }
  lastScrollTop = scrollTop;
});

// --- Scroll suave ---
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// --- Scrollspy para activar sección ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    const sectionHeight = sec.offsetHeight;
    const sectionId = sec.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
});
