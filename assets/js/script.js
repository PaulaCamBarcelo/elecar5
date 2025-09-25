'use strict';

/**
 * MOBILE NAVBAR TOGGLE
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

/**
 * HEADER - Efecto de scroll en header
 */
window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

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


/**
 * BTN CALENDAR
 */

document.addEventListener("DOMContentLoaded", () => {
  const bubble = document.getElementById("calendarBubble");
  const closeBtn = document.querySelector(".close-bubble");
  let bubbleShown = false;

  window.addEventListener("scroll", () => {
    if (!bubbleShown && window.scrollY > 200) { 
      bubble.classList.add("show");
      bubbleShown = true;

      // Ocultar automáticamente después de 6 segundos
      setTimeout(() => {
        bubble.classList.remove("show");
      }, 6000);
    }
  });

  // Cerrar al hacer clic en la X
  closeBtn.addEventListener("click", () => {
    bubble.classList.remove("show");
  });
});



/**
 *  PAGE HEADER SECCION HOME
 * * */

  window.addEventListener("scroll", function() {
    const header = document.querySelector(".page-header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

/**
 *  PAGE SOLICITAR PRESUPUESTO
 * * */
        // Carrusel automático
        const slides = document.querySelectorAll(".carousel .slide");
        let current = 0;

        setInterval(() => {
          slides[current].classList.remove("active");
          current = (current + 1) % slides.length;
          slides[current].classList.add("active");
        }, 4000);