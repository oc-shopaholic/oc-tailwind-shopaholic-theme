import '/partials/review-list/review-list';
import '/partials/product/product-gallery/product-gallery';
import '/partials/product-review-rating/product-review-rating';
import '/partials/product/product-list-small/product-list-small';
import '/partials/product/product-choose/product-choose';
import InputQuantity from '/partials/input-quantity/input-quantity';
import VanillaTabs from '/js/vendor/vanila-tabs/vanilla-tabs';

document.addEventListener('DOMContentLoaded', () => {
  new VanillaTabs({
    'selector': '._tabs-product',
    'type': 'horizontal',
    'responsiveBreak': 840,
    'activeIndex' : 0
  });

  if(document.getElementsByClassName('_counter')[0]){
    InputQuantity.make('_counter');
  }
});

