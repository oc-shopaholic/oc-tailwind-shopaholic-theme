import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';
import { addEventPopup } from '../off-canvas/off-canvas'
import { addEventQuantity } from '../input-quantity/input-quantity'

export default new class ProductChoose {
  constructor() {
    this.init();
    this.cartPopupWrapper = '_shopaholic-cart-add'
  }

  init(){

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {
      requestData.update = {'header/header-ajax': '._header-purchases'};
      requestData.complete = (data) => {
        shopaholicCartAdd.completeCallback(data, button);
        let button = $(`.${this.cartPopupWrapper}`)
        button.disabled = true
        addEventPopup(document.querySelector('._header-purchases-container'))
        addEventQuantity()
      };

      return requestData;
    }).init();
  }
}();
