import Swiper from 'swiper';

export default new class MainCarousel {
  constructor() {
    this.sliderContainerSelector = 'main-carousel';
    this.paginationSelector = 'slider__pagination';
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
        bulletActiveClass: this.nextBulletActiveSelector,
        bulletClass: this.nextBulletSelector,
        lockClass: this.uselessPaginationSelector,
        clickable: true,
      }
    });
  }
}();
