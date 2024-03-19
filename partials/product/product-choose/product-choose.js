import ShopaholicCartAdd from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-add';

export default new class ProductChoose {
  constructor() {
    this.init();
  }

  init(){

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {

      requestData.update = {'main/header-ajax': '._header-purchases'};
      requestData.complete = (data) => {
        shopaholicCartAdd.completeCallback(data, button);
        // let content = document.querySelector(`.${this.cartPopupWrapper}`);
        // if (content.classList.contains('hidden')) {
        //   content.classList.remove('hidden')
        //
        //   document.body.classList.add('overflow-hidden')
        // } else {
        //   content.classList.add('hidden');
        //   document.body.classList.remove('overflow-hidden')
        // }
      };

      return requestData;
    }).init();
  }
}();
