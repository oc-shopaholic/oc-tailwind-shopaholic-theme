import Swiper from 'swiper/bundle';

export default new class ProductGallery {
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
      slidesPerView: 8,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    const galleryTop = new Swiper(`.${this.gallerySelector}`, {
      spaceBetween: 0,
      allowSlidePrev: true,
      thumbs: {
        slideThumbActiveClass: "border border-blue-800",
        swiper: galleryThumbs,
      },
    });
  }
}();
