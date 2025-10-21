(() => {
  const root = document.documentElement;
  const speedEl = document.getElementById("speedValue");
  const gearBtn = document.querySelector(".gear-indicator");

  if (!speedEl || !gearBtn) {
    console.warn("Faltan #speedValue o .gear-indicator en el HTML.");
    return;
  }

  const MAX_SPEED = 220;
  const ACCEL_PER_S = 80;
  const DECEL_PER_S = 50;

  let speed = 0;
  let accelerating = false;
  let last = performance.now();

  function applySpeed(s) {
    const angle = (s / MAX_SPEED) * 360;
    root.style.setProperty("--angle", angle.toFixed(2) + "deg");
    speedEl.textContent = Math.round(s);

    // Intensidad del glow interno (0.8 → 1.4 aprox)
    const glow = 0.35 + 0.65 * (s / MAX_SPEED);
    root.style.setProperty("--glow-intensity", glow.toFixed(2));
  }

  function tick(now) {
    const dt = (now - last) / 1000;
    last = now;

    if (accelerating) {
      speed += ACCEL_PER_S * dt;
    } else {
      speed -= DECEL_PER_S * dt;
    }
    if (speed < 0) speed = 0;
    if (speed > MAX_SPEED) speed = MAX_SPEED;

    applySpeed(speed);
    requestAnimationFrame(tick);
  }

  // Controles (pointer = mouse + touch)
  const setPress = (on, e) => {
    accelerating = on;
    gearBtn.classList.toggle("is-active", on);
    gearBtn.setAttribute("aria-pressed", on ? "true" : "false");
    if (e && e.pointerId !== undefined && on) {
      try {
        gearBtn.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  gearBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    setPress(true, e);
  });
  gearBtn.addEventListener("pointerup", () => setPress(false));
  gearBtn.addEventListener("pointerleave", () => setPress(false));
  gearBtn.addEventListener("pointercancel", () => setPress(false));

  // Teclado opcional (Espacio / Flecha Arriba)
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") setPress(true);
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") setPress(false);
  });

  // Init
  applySpeed(0);
  requestAnimationFrame(tick);
})();
