import Swiper from 'swiper/bundle';

export default new class Gallery {
  constructor() {
    this.gallerySelector = 'gallery-top';
    this.paginationSelector = 'gallery-thumbs';

    this.handler();
  }

  handler() {
    const slider = document.querySelector(`.${this.gallerySelector}`);

    if (!slider) {
      return;
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    const galleryThumbs = new Swiper(`.${this.paginationSelector}`, {
      spaceBetween: 10,
      slidesPerView: 4,
      loop: true,
      freeMode: true,
      loopedSlides: 5, // looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    const galleryTop = new Swiper(`.${this.gallerySelector}`, {
      spaceBetween: 10,
      loop: true,
      allowSlidePrev: true,
      loopedSlides: 5, // looped slides should be the same
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  }
}();
