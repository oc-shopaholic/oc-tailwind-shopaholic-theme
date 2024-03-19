import Swiper from 'swiper';

class MainCarousel {
  constructor() {
    this.sliderContainerSelector = 'carousel-main';
    this.paginationSelector = 'swiper-pagination';
    this.nextBulletSelector = 'slider__bullet';
    this.nextBulletActiveSelector = 'slider__bullet_active';
    this.uselessPaginationSelector = 'slider__pagination-hidden';
  }

  init() {
    const slider = document.querySelector(`.${this.sliderContainerSelector}`);
    if (!slider) {
      return;
    }

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
}

document.addEventListener('DOMContentLoaded', () => {
  const obMainCarousel = new MainCarousel();
  obMainCarousel.init();
});
