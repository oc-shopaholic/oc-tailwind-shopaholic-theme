// import Swiper from "swiper";

export default new class GalleryPopup {
  constructor() {
    const gallerySelector = "gallery-popup";
    $(() => {
      const galleryTop = new Swiper(`.${gallerySelector}`, {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      $(".gallery-top .object-cover").click(() => {
        $(".gallery-overlay").removeClass("hidden");
      });
      $(document).keyup(function(e) {
        if (e.key === "Escape") {
          $(".gallery-overlay").addClass("hidden");
        }
      });
      $(".close-button").click(() => {
        $(".gallery-overlay").addClass("hidden");
      });
      let fullScreen = false;
      $(".full-screen-button").click(() => {
        if (fullScreen) {
          $(".gallery-popup").addClass("h-full");
          $(".gallery-popup .swiper-slide-container")
            .addClass("h-full")
            .addClass("w-full")
            .removeClass("max-w-225")
            .addClass("max-w-full")
          ;
        } else {
          $(".gallery-popup").removeClass("h-full");
          $(".gallery-popup .swiper-slide-container")
            .removeClass("h-full")
            .removeClass("w-full")
            .addClass("max-w-225")
            .removeClass("max-w-full")
          ;
        }

        fullScreen = !fullScreen;
      });
    });
  }
}();
