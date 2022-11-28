import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';
import offCanvas from '../off-canvas/off-canvas';
import InputQuantity from '../input-quantity/input-quantity'

export default new class ProductChoose {
  constructor() {
    this.obShowButton = null;
    
    this.init();
  }

  buttonShow(){
    this.obShowButton = $('._header-purchases').find('._off-canvas ._show');
    this.obShowButton.on('click', ()=>{
      $('._counter').children().off();
      InputQuantity.make('._counter');
    })
  }

  subtotalCount(){
    let count = 0;
    for(let i = 0; $('._card-checkout-list ._shopaholic-product-wrapper').length > i; i++){
      count += new Number($('._card-checkout-list ._shopaholic-product-wrapper')[i].getElementsByClassName('_count')[0].value);
    }
    if($('._card-checkout-list ._subtotal ._item').length){
      $('._card-checkout-list ._subtotal ._item').text('(' + count + ' ' + window.subtotal.item + ')');
    }
    if($('._card-checkout-list ._subtotal ._checkout-button').length){
      $('._card-checkout-list ._subtotal ._checkout-button')[0].innerText = window.subtotal.checkout + ' (' + count + ')';
    }
  }

  init(){
    InputQuantity.make('._counter');
    this.buttonShow();

    const obShopaholicCartAdd = new ShopaholicCartAdd();
    obShopaholicCartAdd.setAjaxRequestCallback((obRequestData, obButton) => {
      obRequestData.complete = ({ responseJSON }) => {
        obShopaholicCartAdd.completeCallback(responseJSON, obButton);
        offCanvas.make('._header-purchases ._off-canvas');
        this.buttonShow();
      };
      obRequestData.update = { 
        'header/header-ajax': `._header-purchases`,
      };
      return obRequestData;
    }).init();

    const obShopaholicCartUpdate = new ShopaholicCartUpdate();
    obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData, obInput) => {
      obRequestData.complete = ({ responseJSON }) => {
        obShopaholicCartUpdate.completeCallback(responseJSON);
        this.subtotalCount();
      };
      return obRequestData;
    }).init();
  }
}();
