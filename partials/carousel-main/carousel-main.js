import Swiper from 'swiper/bundle';

export default new class MainCarousel {
  constructor() {
    this.sliderContainerSelector = 'carousel-main';
    this.paginationSelector = 'swiper-pagination';
    this.nextBulletSelector = 'slider__bullet';
    this.nextBulletActiveSelector = 'slider__bullet_active';
    this.activeSlideSelector = 'main-slider__item_active';
    this.uselessPaginationSelector = 'slider__pagination-hidden';

    this.handler();
  }

  handler() {
    const slider = document.querySelector(`.${this.sliderContainerSelector}`);

    if (!slider) return;

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    this.MainCarousel = new Swiper(`.${this.sliderContainerSelector}`, {
      slidesPerView: 1,
      spaceBetween: 0,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      observer: true,
      pagination: {
        el: `.${this.paginationSelector}`,
        type: 'bullets',
        clickable: true,
        clickableClass: 'relative mt-5 md:mt-12',
        bulletClass: 'w-2 h-2 rounded-full bg-gray-400 inline-block mx-3',
        bulletActiveClass: '!bg-blue-800',
      }
    });
  }
}();
