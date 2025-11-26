// Modal
const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("gallery-modal-img");
const modalTitle = document.getElementById("gallery-modal-title");
const modalDesc = document.getElementById("gallery-modal-desc");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("img").src;
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent = item.dataset.desc;

    modal.style.display = "flex";
  });
});

// Cerrar modal
document.querySelector(".gallery-close").onclick = () => {
  modal.style.display = "none";
};

// Cerrar clickeando afuera
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
