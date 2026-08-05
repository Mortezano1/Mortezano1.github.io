/* ==========================================================================
   Image Lightbox
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.querySelector(".image-lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".image-lightbox-trigger");

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxClose ||
    !lightboxTriggers.length
  ) {
    return;
  }

  const openLightbox = (trigger) => {
    const fullImage =
      trigger.dataset.fullImage ||
      trigger.getAttribute("href") ||
      trigger.querySelector("img")?.src;

    const imageAlt =
      trigger.dataset.imageAlt || trigger.querySelector("img")?.alt || "";

    const title = trigger.dataset.lightboxTitle || "";
    const caption = trigger.dataset.lightboxCaption || "";

    if (!fullImage) return;

    lightboxImage.src = fullImage;
    lightboxImage.alt = imageAlt;

    if (lightboxTitle) {
      lightboxTitle.textContent = title;
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";
    lightboxImage.alt = "";

    if (lightboxTitle) {
      lightboxTitle.textContent = "";
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = "";
    }

    document.body.classList.remove("no-scroll");
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(trigger);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});

/* ==========================================================================
   Research Page Scroll Spy Navigation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sectionLinks = document.querySelectorAll(".research-section-nav-link");
  const sections = document.querySelectorAll(".section-block[id]");

  if (!sectionLinks.length || !sections.length) return;

  const linkById = new Map();

  sectionLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    const sectionId = href.slice(1);

    if (!sectionId) return;

    linkById.set(sectionId, link);
  });

  const setActiveLink = (sectionId) => {
    sectionLinks.forEach((link) => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });

    const activeLink = linkById.get(sectionId);

    if (activeLink) {
      activeLink.classList.add("is-active");
      activeLink.setAttribute("aria-current", "true");
    }
  };

  // فعال کردن اولین سکشن هنگام باز شدن صفحه
  if (sections[0] && sections[0].id) {
    setActiveLink(sections[0].id);
  }

  // وقتی روی لینک کلیک می‌کنی، همان لحظه active شود
  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const sectionId = href.slice(1);

      if (sectionId) {
        setActiveLink(sectionId);
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
