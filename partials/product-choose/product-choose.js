import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';

export default new class ProductChoose {
  constructor() {
    this.init();
  }

  init(){

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {

      requestData.update = {'header/header-ajax': '._header-purchases'};
      requestData.complete = (data) => {
        shopaholicCartAdd.completeCallback(data, button);
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
