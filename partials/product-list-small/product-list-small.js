import request from 'oc-request';

export default new class ProductListSmall {
  constructor() {
    this.sProductListSmallWrapperClass = '_product-list-small';
    this.sProductListSmallButtonShowMoreWrapperClass = '_product-list-small-button';
    this.sProductListSmallButtonMoreClass = document.getElementsByClassName('_product-list-small-button-more')[0];

    this.showMoreList();
  }

  /**
   * @description Show more list.
   */
  showMoreList() {
    if(!this.sProductListSmallButtonMoreClass) return
    this.sProductListSmallButtonMoreClass.addEventListener('click', (obEvent) => {
      this.obButton = obEvent.target;
      this.obButton.setAttribute('disabled', 'disabled');

      const app = this;
      const sProductListSmallListType = this.obButton.dataset.productListSmallType;
      const iPage = this.obButton.dataset.page;
      const iTake = this.obButton.dataset.take;
      const iProductId = this.obButton.dataset.productId;
      const sButtonName = this.obButton.innerHTML;
      request.sendData('onInit', {
        data: {
          'product_list_small_list_type': sProductListSmallListType,
          'page': iPage,
          'take': iTake,
          'product_id': iProductId,
          'button_name': sButtonName
        },
        update: {
          'product-list-small/product-list-small-ajax': `@.${this.sProductListSmallWrapperClass}`,
          'product-list-small/product-list-small-button-ajax': `.${this.sProductListSmallButtonShowMoreWrapperClass}`
        },
        complete: function() {
          app.sProductListSmallButtonMoreClass = document.getElementsByClassName('_product-list-small-button-more')[0];
          app.showMoreList();
        }
      });
    });
  }
}();
