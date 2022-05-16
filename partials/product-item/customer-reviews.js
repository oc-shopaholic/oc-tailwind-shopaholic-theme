export default new class CustomerReviews {
  constructor() {
    this.obLoadMore = $('._show-more-reviews');
    this.obListWrapper = '_review-list';
    
    this.init();
  }

  init(){
    this.obLoadMore.on("click", () => {
      const iPage = parseInt(this.obLoadMore.attr('data-page'), 10);
      const iNextPage = iPage + 1;
      const iMaxPage = parseInt(this.obLoadMore.attr('data-max-page'), 10);
      
      this.sendAjax(iNextPage);

      if (iNextPage >= iMaxPage) {
        this.obLoadMore.remove();
      } else {
        this.obLoadMore.attr('data-page', iNextPage);
      }
    });
  }

  sendAjax(iNextPage) {
    $.request('ProductData::onAjaxRequest', {
      data: { page: iNextPage },
      update: { 'product-item/customer-reviews-ajax': `@.${this.obListWrapper}` }
    });
  }
}();
