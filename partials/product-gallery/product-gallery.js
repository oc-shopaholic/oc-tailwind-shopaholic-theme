import Swiper from 'swiper/bundle';

export default new class ProductGallery {
  constructor() {
    this.sGallerySelector = 'gallery-top';
    this.sPaginationSelector = 'gallery-thumbs';
    this.obSwiperContainer = $('._swiper-container');
    this.obSlide = this.obSwiperContainer.find('.swiper-slide');

    this.handler();
  }

  handler() {
    const slider = document.querySelector(`.${this.sGallerySelector}`);

    if (!slider) {
      return;
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    const galleryThumbs = new Swiper(`.${this.sPaginationSelector}`, {
      spaceBetween: 2,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      a11y:{
        enabled: false
      },
      breakpoints: {
        768: {
          spaceBetween: 8,
        },
      },
    });
    
    const galleryTop = new Swiper(`.${this.sGallerySelector}`, {
      spaceBetween: 0,
      allowSlidePrev: true,
      thumbs: {
        slideThumbActiveClass: "outline outline-2 outline-blue-800",
        swiper: galleryThumbs,
        autoScrollOffset: 1,
      },
    });
  
    this.activeSlide(galleryThumbs);
  }

  activeSlide(slider){
    let oldSliderIndex = null;
    let oldSliderText = null;

    if(!slider.clickedIndex){
      oldSliderIndex = 0;
      oldSliderText = this.obSlide[0].ariaLabel;
      this.obSlide[0].ariaLabel = window.slider.active + ' ' + this.obSlide[0].ariaLabel;
    }
    this.obSlide.on('click', ()=>{
      this.obSlide[oldSliderIndex].ariaLabel = oldSliderText;
      oldSliderText = this.obSlide[slider.clickedIndex].ariaLabel;
      this.obSlide[slider.clickedIndex].ariaLabel = window.slider.active + ' ' + this.obSlide[slider.clickedIndex].ariaLabel;
      oldSliderIndex = slider.clickedIndex;
    })
  }
}();
