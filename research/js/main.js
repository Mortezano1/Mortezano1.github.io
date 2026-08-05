document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.querySelector(".image-lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".image-lightbox-trigger");

  if (!lightbox || !lightboxImage || !lightboxClose) return;

  const openLightbox = (trigger) => {
    const fullImage = trigger.dataset.fullImage;
    const imageAlt = trigger.dataset.imageAlt || "";
    const title = trigger.dataset.lightboxTitle || "";
    const caption = trigger.dataset.lightboxCaption || "";

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
    trigger.addEventListener("click", () => {
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
