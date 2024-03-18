import '/partials/common/tabs/tabs';

import '/partials/review-list/review-list';
import '/partials/product-gallery/product-gallery';
import '/partials/product-review-rating/product-review-rating';
import '/partials/product/product-list-small/product-list-small';
import '/partials/product-choose/product-choose';
import InputQuantity from '/partials/input-quantity/input-quantity';

export default new class productItem {
  constructor() {
    this.init();
  }
  init(){
    addEventListener("DOMContentLoaded", (event) => {
        if(document.getElementsByClassName('_counter')[0]){
          InputQuantity.make('_counter');
        }
    });

  }
}
