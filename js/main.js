(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* Render courses */
  const grid = document.getElementById("courses-grid");

  COURSES.forEach((course, i) => {
    const card = document.createElement("article");
    card.className = "course-card reveal";
    if (i % 3 === 1) card.classList.add("reveal-delay-1");
    if (i % 3 === 2) card.classList.add("reveal-delay-2");
    card.style.setProperty("--accent", course.accent);

    card.innerHTML = `
      <div class="course-thumb">
        <span class="course-lang">${course.language}</span>
      </div>
      <div class="course-body">
        <h3>${course.title}</h3>
        <div class="course-meta">
          <span class="rating">★ ${course.rating}</span>
          <span>${course.reviews} reviews</span>
          <span>${course.duration}</span>
        </div>
        <div class="course-tags">
          ${course.topics.map((t) => `<span class="course-tag">${t}</span>`).join("")}
        </div>
        <a href="${course.url}" class="course-link" target="_blank" rel="noopener noreferrer">
          View on Udemy →
        </a>
      </div>
    `;

    grid.appendChild(card);
    revealObserver.observe(card);
  });

  /* Contact form: mock submit */
  const form = document.getElementById("contact-form");
  const successEl = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll("[required]");
    let valid = true;

    fields.forEach((field) => {
      const group = field.closest(".form-group");
      if (!field.value.trim()) {
        group.classList.add("invalid");
        valid = false;
      } else {
        group.classList.remove("invalid");
      }
    });

    const email = form.querySelector("#email");
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.closest(".form-group").classList.add("invalid");
      valid = false;
    }

    if (!valid) return;

    successEl.hidden = false;
    form.querySelector('button[type="submit"]').disabled = true;
    form.reset();

    setTimeout(() => {
      successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  });

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".form-group")?.classList.remove("invalid");
    });
  });
})();
