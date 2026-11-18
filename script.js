/* ==========================================================================
   SCRIPT PRINCIPAL — PORTFOLIO BRAIAN NAHUEL BASUALDO
   JavaScript nativo sin dependencias externas
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav-principal");
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const revealBlocks = Array.from(document.querySelectorAll(".reveal-block"));

  /* ------------------------------------------------------------------------
     1. BARRA DE PROGRESO Y ESTADO DEL HEADER AL HACER SCROLL
     ------------------------------------------------------------------------ */
  let ticking = false;

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 16);
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollUI);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateScrollUI();

  /* ------------------------------------------------------------------------
     2. ANIMACIÓN DE BLOQUES AL ENTRAR EN PANTALLA (IntersectionObserver)
     ------------------------------------------------------------------------ */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    revealBlocks.forEach((block) => revealObserver.observe(block));
  } else {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------------------
     3. INDICADOR ACTIVO EN LA BARRA DE NAVEGACIÓN
     ------------------------------------------------------------------------ */
  if ("IntersectionObserver" in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ------------------------------------------------------------------------
     4. MENÚ MÓVIL RESPONSIVE
     ------------------------------------------------------------------------ */
  function closeMobileMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  /* ------------------------------------------------------------------------
     5. FILTROS INTERACTIVOS DE PROYECTOS
     ------------------------------------------------------------------------ */
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const shouldShow = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
        if (shouldShow) {
          card.classList.add("is-visible");
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. MODAL DE EVIDENCIA VISUAL DE PROYECTOS
     ------------------------------------------------------------------------ */
  const modal = document.getElementById("evidence-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDesc = document.getElementById("modal-desc");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const evidenceButtons = Array.from(document.querySelectorAll(".evidence-btn"));
  let lastFocusedElement = null;

  function openModal(title, imgSrc, desc) {
    if (!modal || !modalTitle || !modalImage || !modalDesc) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = title;
    modalImage.src = imgSrc;
    modalImage.alt = title;
    modalDesc.textContent = desc;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  evidenceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(
        btn.dataset.modalTitle || "Evidencia del proyecto",
        btn.dataset.modalImg || "",
        btn.dataset.modalDesc || ""
      );
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenu();
    }
  });

  /* ------------------------------------------------------------------------
     7. COPIAR DATOS DE CONTACTO Y TOAST
     ------------------------------------------------------------------------ */
  const copyButtons = Array.from(document.querySelectorAll("[data-copy-target]"));
  const toast = document.getElementById("toast");
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetEl = document.getElementById(btn.dataset.copyTarget);
      if (!targetEl) return;
      const value = targetEl.textContent.trim();
      const message = btn.dataset.copyLabel || "Dato copiado al portapapeles";

      try {
        await copyText(value);
        showToast(message);
      } catch (_err) {
        showToast("Copiá manualmente: " + value);
      }
    });
  });
})();
