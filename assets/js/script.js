/**
 * ANIMACION EN SERVICIOS INDEX
 */
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 200); // retraso en cascada (200ms entre cada card)
          observer.unobserve(entry.target); // se anima solo una vez
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  });


//TOP BOTON
/**
 * BACK TO TOP
 */
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



//ABOUT ANIMATION

// Animación scroll para sección ABOUT
const aboutElements = document.querySelectorAll('.about-banner, .about-content, .about-item');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  aboutElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('about-show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);



// THeME WEB
const toggleBtn = document.getElementById('theme-toggle');

// Aplicar tema guardado al cargar la página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

// Cambiar tema al hacer clic
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Guardar la preferencia en localStorage
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});


//Slider 
// ==============================
// HERO SLIDER
// ==============================
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');

let currentIndex = 0;
const slideInterval = 5000; // 5 segundos

// Función para mostrar slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Avanzar al siguiente slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Activar dot al hacer clic
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
  });
});

// Iniciar slider automático
setInterval(nextSlide, slideInterval);

// Mostrar el primer slide al cargar
showSlide(currentIndex);

//**************************************************** */
// Si quieres forzar cambio de modo oscuro/claro
document.querySelectorAll('.toggle-theme').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});
//**************************************************** */