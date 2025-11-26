// ------------------------------------------------
// Sanitizador
// ------------------------------------------------
function sanitizeId(id) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "");
}

// ------------------------------------------------
// Lista blanca
// ------------------------------------------------
const IDS_VALIDOS = [
  "mecanica",
  "electricidad",
  "diagnostico"
];

// ------------------------------------------------
// Obtener y sanitizar
// ------------------------------------------------
const params = new URLSearchParams(window.location.search);
let serviceId = params.get("id");

// Sanitizarlo primero
serviceId = sanitizeId(serviceId || "");

// Validarlo
if (!IDS_VALIDOS.includes(serviceId)) {
  document.body.innerHTML = `
    <div style="
        width:100%;
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        padding:20px;
        font-family:Arial;
    ">
        <div>
            <h1 style="color:#ff5500;">⚠️ Servicio no encontrado</h1>
            <p>El servicio solicitado no existe o no es válido.</p>
            <a href="services.html" style="
                padding:10px 20px;
                background:#ff5500;
                color:white;
                border-radius:6px;
                text-decoration:none;
                font-weight:bold;
                display:inline-block;
                margin-top:10px;
            ">Volver a la página de servicios</a>
        </div>
    </div>
  `;
  throw new Error("ID inválido. Ejecución detenida.");
}

// ------------------------------------------------
//Si es válido, cargar JSON
// ------------------------------------------------
fetch("assets/json/services.json")
  .then(res => res.json())
  .then(data => {

    const service = data[serviceId];
    if (!service) {
      console.error("Servicio no encontrado en el JSON:", serviceId);
      return;
    }

    // Rellenar datos
    document.querySelector(".service-title").textContent = service.title;
    document.querySelector(".service-subtitle").textContent = service.subtitle;
    document.querySelector(".service-category").textContent = service.category;
    document.querySelector(".service-image").src = service.image;
    document.querySelector(".service-description").textContent = service.description;

    // Beneficios
    document.querySelector(".service-benefits").innerHTML =
      service.benefits.map(item => `<li>${item}</li>`).join("");

    // Incluye
    document.querySelector(".service-includes").innerHTML =
      service.includes.map(item => `<li>${item}</li>`).join("");

    // ------------------------------------------------
    // Sanitizar IDs relacionados antes de usarlos
    // ------------------------------------------------
    const relatedList = document.querySelector(".service-related");

    relatedList.innerHTML = service.related
      .map(rawId => {
        const id = sanitizeId(rawId);
        const relatedData = data[id];

        if (!relatedData) return ""; // evitar romper diseño

        return `
          <a href="single-service.html?id=${id}" class="related-item">
            <div class="related-img">
              <img src="${relatedData.image}" alt="${relatedData.title}">
            </div>
            <div class="related-info">
              <h4>${relatedData.title}</h4>
              <p>${relatedData.subtitle || ""}</p>
            </div>
          </a>
        `;
      })
      .join("");
  })
  .catch(error => console.error("Error al cargar JSON:", error));
