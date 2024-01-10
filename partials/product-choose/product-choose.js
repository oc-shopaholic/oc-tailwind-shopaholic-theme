import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';
import offCanvas from '../off-canvas/off-canvas';
import InputQuantity from '../input-quantity/input-quantity'

export default new class ProductChoose {
  constructor() {
    this.obShowButton = null;
    this.bActive = false;
    // addEventListener("DOMContentLoaded", (event) => {
      this.init();
    // })

  }

  buttonShow() {
    this.obShowButton = document.getElementsByClassName('_header-purchases')[0].querySelectorAll('._off-canvas ._show')[0];
    if (!this.obShowButton) return
    this.obShowButton.addEventListener('click', () => {
      if (!this.bActive) {
        InputQuantity.make('_counter _counter-card');
        this.bActive = true;
      }
    })
  }

  subtotalCount() {
    let count = 0;
    for (let i = 0; document.querySelectorAll('._card-checkout-list ._shopaholic-product-wrapper').length > i; i++) {
      count += new Number(document.querySelectorAll('._card-checkout-list ._shopaholic-product-wrapper')[i].getElementsByClassName('_count')[0].value);
    }
    if (document.querySelectorAll('._card-checkout-list ._subtotal ._item').length) {
      document.querySelectorAll('._card-checkout-list ._subtotal ._item')[0].innerText = '(' + count + ' ' + window.subtotal.item + ')';
    }
    if (document.querySelectorAll('._card-checkout-list ._subtotal ._checkout-button').length) {
      document.querySelectorAll('._card-checkout-list ._subtotal ._checkout-button')[0].innerText = window.subtotal.checkout + ' (' + count + ')';
    }
  }

  init(){
    // if(document.getElementsByClassName('_counter')[0]){
    //   InputQuantity.make('_counter');
    // }
    // this.buttonShow();

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {


      requestData.complete = (data) => {
        let content = $(`.${this.cartPopupWrapper}`)
        if (content.hasClass('hidden')) {
          content.removeClass('hidden')
          $('body').addClass('overflow-hidden')
        } else {
          content.addClass('hidden');
          $('body').removeClass('overflow-hidden')
        }
      };

      return requestData;
    }).init();
  }
}();
