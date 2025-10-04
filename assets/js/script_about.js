

const tabs = document.querySelectorAll(".tab-item");
const panels = document.querySelectorAll(".content-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.getAttribute("data-tab");

    // Remove active class from all tabs and panels
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked tab and corresponding panel
    tab.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});
