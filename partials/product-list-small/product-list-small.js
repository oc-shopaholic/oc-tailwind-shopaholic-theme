export default new class ProductListSmall {
  constructor() {
    this.sProductListSmallWrapperClass = '_product-list-small';
    this.sProductListSmallButtonShowMoreWrapperClass = '_product-list-small-button';
    this.sProductListSmallButtonMoreClass = '_product-list-small-button-more';

    this.showMoreList();
  }

  /**
   * @description Show more list.
   */
  showMoreList() {
    $(document).on('click', `.${this.sProductListSmallButtonMoreClass}`, (obEvent) => {
      this.obButton = $(obEvent.target);
      this.obButton.attr('disabled', 'disabled');

      const sProductListSmallListType = this.obButton.attr('data-product-list-small-type');
      const iPage = this.obButton.attr('data-page');
      const iTake = this.obButton.attr('data-take');
      const iProductId = this.obButton.attr('data-product_id');
      const sButtonName = this.obButton.html();

      $.request('onInit', {
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
      });
    });
  }
}();
