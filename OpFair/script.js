/* ---------- Gallery slider ---------- */
const GALLERY = [
  "f9b959_47be1b3cb8c3446e8cdb7f1c9000d77c",
  "f9b959_bb3202bd6dba473fb63c914ea6e47c27",
  "f9b959_813185af03584e868a38cf3c233cef88",
  "f9b959_c73676a2c9b4478791a04f26aed80232",
  "f9b959_ad6d1e299dfb4ba3bb11b0d2fea0cab2",
  "f9b959_33bd22e20e004c4e9d4701259b229318",
  "f9b959_ab5a3f34b62d4accb1d4626b288e9723",
  "f9b959_35e0fd30835a4be2bb8620540dcd0a38",
].map(id => `https://static.wixstatic.com/media/${id}~mv2.jpg`);
// TODO: download these into /assets/gallery/ and point the list at local files before launch.

(function initSlider() {
  const main = document.getElementById("sliderMain");
  const thumbs = document.getElementById("sliderThumbs");
  if (!main || !thumbs) return;
  let index = 0;
  let timer;

  const buttons = GALLERY.map((src, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show photo ${i + 1}`);
    b.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
    b.addEventListener("click", () => { show(i); restart(); });
    thumbs.appendChild(b);
    return b;
  });

  function show(i) {
    index = (i + GALLERY.length) % GALLERY.length;
    main.src = GALLERY[index];
    main.alt = `OpFair photo ${index + 1} of ${GALLERY.length}`;
    buttons.forEach((b, n) => b.setAttribute("aria-current", n === index ? "true" : "false"));
    // keep the active thumb visible: show a window of 5
    const start = Math.min(Math.max(index - 2, 0), Math.max(GALLERY.length - 5, 0));
    buttons.forEach((b, n) => { b.style.display = n >= start && n < start + 5 ? "" : "none"; });
  }
  function restart() { clearInterval(timer); timer = setInterval(() => show(index + 1), 6000); }

  document.querySelector(".slider__btn--prev").addEventListener("click", () => { show(index - 1); restart(); });
  document.querySelector(".slider__btn--next").addEventListener("click", () => { show(index + 1); restart(); });
  show(0);
  restart();
})();

/* ---------- Contact form (Web3Forms) ---------- */
(function initForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const type = document.getElementById("inquiryType");
  if (!form) return;

  // "Volunteer" nav button preselects the inquiry type
  document.querySelectorAll("[data-prefill]").forEach(a =>
    a.addEventListener("click", () => { type.value = a.dataset.prefill; })
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status";
    status.textContent = "Sending…";
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      status.className = "form__status is-error";
      status.textContent = "Sorry, that didn't send. Please try again or email us directly.";
    } finally {
      btn.disabled = false;
    }
  });
})();

/* ---------- Count-up for impact stats ---------- */
(function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = +el.dataset.count, suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1200;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
})();
