// Ждём, пока HTML полностью загрузится.
document.addEventListener("DOMContentLoaded", function () {
  setupSmoothScroll();
  setupRevealOnScroll();
  setupMediaPlaceholders();
});

// Плавный скролл для кнопок с атрибутом data-scroll-to.
function setupSmoothScroll() {
  var scrollButtons = document.querySelectorAll("[data-scroll-to]");

  scrollButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var targetSelector = button.getAttribute("data-scroll-to");

      if (targetSelector === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      var target = document.querySelector(targetSelector);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Красивое появление секций при скролле.
function setupRevealOnScroll() {
  var revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
}

// Если картинка или gif ещё не добавлены в папку assets, скрываем сломанную иконку.
// Сам блок останется видимым как понятный placeholder.
function setupMediaPlaceholders() {
  var images = document.querySelectorAll("img");
  var videos = document.querySelectorAll("video");

  images.forEach(function (image) {
    image.addEventListener("load", function () {
      var wrapper = image.closest(".image-shell, .gif-shell");
      if (wrapper) {
        wrapper.classList.add("is-loaded");
      }
    });

    image.addEventListener("error", function () {
      var wrapper = image.closest(".image-shell, .gif-shell");
      if (wrapper) {
        wrapper.classList.add("is-missing");
      }
      image.hidden = true;
    });
  });

  videos.forEach(function (video) {
    video.addEventListener("loadedmetadata", function () {
      var wrapper = video.closest(".video-frame");
      if (wrapper) {
        wrapper.classList.add("is-loaded");
      }
    });
  });
}
