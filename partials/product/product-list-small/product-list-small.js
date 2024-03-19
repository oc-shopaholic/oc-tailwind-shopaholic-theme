class ProductListSmall {
  constructor() {
    this.wrapperClass = '_product-list-small';
    this.buttonWrapperClass = '_product-list-small-button';
    this.buttonNode = document.querySelector('._product-list-small-button-more');
  }

  init() {
    if (!this.buttonNode) {
      return
    }

    const obThis = this;
    this.buttonNode.addEventListener('click', (event) => {
      obThis.buttonNode.setAttribute('disabled', 'disabled');

      const type = obThis.buttonNode.dataset.type;
      const iPage = obThis.buttonNode.dataset.page;
      const iTake = obThis.buttonNode.dataset.take;
      const iProductID = obThis.buttonNode.dataset.productId;
      const buttonName = obThis.buttonNode.innerHTML;
      oc.ajax('onInit', {
        data: {
          'type': type,
          'page': iPage,
          'take': iTake,
          'product_id': iProductID,
          'button_name': buttonName
        },
        update: {
          'product/product-list-small/product-list-small-ajax': `@.${this.wrapperClass}`,
          'product/product-list-small/product-list-small-button-ajax': `.${this.buttonWrapperClass}`
        },
        complete: function () {
          obThis.buttonNode = document.querySelector('._product-list-small-button-more');
          obThis.init();
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obProductListSmall = new ProductListSmall();
  obProductListSmall.init();
});
