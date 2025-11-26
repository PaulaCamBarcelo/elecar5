/***
* Animation Section about
******************/
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    /**
     * BTN BACK TO TOP y BTN CONTACT WHATSAPP Y TEL
     */
document.addEventListener("DOMContentLoaded", () => {

    /**
     * BTN BACK TO TOP
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
     * Btn Social Redes (WhatsApp + Llamada)
     */
    const toggle = document.getElementById("contactToggle");
    const items = document.getElementById("contactMenu");

    if (toggle && items) {
        toggle.addEventListener("click", () => {
            items.classList.toggle("show");
        });
    }

});