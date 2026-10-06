/* Club Atletismo Chapín Jerez — comportamiento mínimo, sin dependencias */
(() => {
  "use strict";
  const doc = document;
  const body = doc.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: fondo sólido al desplazar */
  const header = doc.querySelector(".site-header");
  const hero = doc.querySelector(".hero__img");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header?.classList.toggle("is-scrolled", y > 24);
      if (hero && !reduceMotion && y < window.innerHeight) {
        hero.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0) scale(1.04)`;
      }
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menú móvil */
  const toggle = doc.querySelector(".nav-toggle");
  const drawer = doc.getElementById("drawer");
  if (toggle && drawer) {
    const focusables = () => [toggle, ...drawer.querySelectorAll("a[href]")];
    const setOpen = (open) => {
      body.classList.toggle("nav-open", open);
      body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      drawer.toggleAttribute("inert", !open);
      if (open) drawer.querySelector("a")?.focus();
    };
    drawer.setAttribute("inert", "");
    toggle.addEventListener("click", () => setOpen(!body.classList.contains("nav-open")));
    drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    doc.addEventListener("keydown", (e) => {
      if (!body.classList.contains("nav-open")) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); }
      if (e.key === "Tab") { // el foco no escapa del menú abierto
        const list = focusables();
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
  }

  /* Aparición al entrar en pantalla + contadores */
  const countUp = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (reduceMotion || Number.isNaN(target)) return;
    const prefix = el.dataset.prefix || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = prefix + "0";
    requestAnimationFrame(step);
  };

  const revealTargets = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-in"));
  }

  /* Galería: visor con <dialog> */
  const items = [...doc.querySelectorAll("[data-lightbox]")];
  const box = doc.getElementById("lightbox");
  if (items.length && box && typeof box.showModal === "function") {
    const img = box.querySelector("img");
    const caption = box.querySelector(".lightbox__caption");
    let index = 0;
    let opener = null;
    const show = (i) => {
      index = (i + items.length) % items.length;
      const el = items[index];
      img.src = el.dataset.full;
      img.alt = el.dataset.alt || "";
      caption.textContent = `${el.dataset.alt || ""} · ${index + 1} / ${items.length}`;
    };
    items.forEach((el, i) => el.addEventListener("click", () => { opener = el; show(i); box.showModal(); }));
    box.querySelector("[data-close]").addEventListener("click", () => box.close());
    box.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
    box.querySelector("[data-next]").addEventListener("click", () => show(index + 1));
    box.addEventListener("click", (e) => { if (e.target === box || e.target.classList.contains("lightbox__inner")) box.close(); });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    box.addEventListener("close", () => { img.removeAttribute("src"); opener?.focus(); });
  }
})();
