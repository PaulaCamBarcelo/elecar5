/*********************************** */
const container = document.getElementById('container_acordeon');
const list = document.querySelectorAll('.list_acordeon');

// Cargar Calendly según tema
function loadCalendlyWidget() {
  const calendlyContainer = document.getElementById("calendly-container");
  calendlyContainer.innerHTML = ""; // limpiar antes de insertar

  const widget = document.createElement("div");
  widget.className = "calendly-inline-widget";

  // URL según tema
  if (document.body.classList.contains("dark")) {
    widget.setAttribute("data-url", "https://calendly.com/paulacamilabarcelomiranda/30min?primary_color=ff000b&text_color=ffffff&background_color=1a1a1a");
  } else {
    widget.setAttribute("data-url", "https://calendly.com/paulacamilabarcelomiranda/30min?primary_color=ff000b&text_color=333333&background_color=ffffff");
  }

  widget.style.minWidth = "320px";
  widget.style.height = "700px";

  calendlyContainer.appendChild(widget);
}

// Acordeón
container.addEventListener('click', (e) => {
  if (e.target.closest('.link_acordeon')) {
    const link = e.target.closest('.link_acordeon');
    const li = link.parentElement;

    if (li.classList.contains("scale")) {
      // Si ya está abierto, lo cerramos
      li.classList.remove("scale");
      link.querySelector('i').classList.remove('rotate');
    } else {
      // Cerrar todos antes de abrir uno
      RemoveAll();
      link.querySelector('i').classList.add('rotate');
      li.classList.add('scale');
      loadCalendlyWidget(); // cargar widget dinámicamente
      li.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

const RemoveAll = () => {
  for (let index of list) {
    index.classList.remove('scale');
    index.querySelector('i').classList.remove('rotate');
  }
};

// Ejecutar Calendly al cambiar tema
document.getElementById("theme-toggle").addEventListener("click", () => {
  setTimeout(loadCalendlyWidget, 300);
});
