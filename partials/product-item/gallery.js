// import Swiper from "swiper";

export default new class Gallery {
  constructor() {
    const paginationSelector = "gallery-thumbs";
    const gallerySelector = "gallery-top";
    $(() => {
      const galleryThumbs = new Swiper(`.${paginationSelector}`, {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        loopedSlides: 5, // looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      const galleryTop = new Swiper(`.${gallerySelector}`, {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        thumbs: {
          swiper: galleryThumbs,
        },
      });
    });
  }
}();
