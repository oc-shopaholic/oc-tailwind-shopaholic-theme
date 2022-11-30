import Toggle from '../toggle/toggle';

export default new class OrderList {
    constructor() {
      this.obLoadMore = $('._show-more-orders');
      this.obDeleteOrders = $('._delete_all_orders');
      this.obListWrapper = '_orders-list';
      
      this.init();
    }
  
    init(){
      Toggle.make('._toggle');
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
      // this.obDeleteOrders.on("click", ()=>{
      //   this.deleteAll();
      //   console.log('deleteAll');
      // })
    }
  
    // deleteAll(){
    //     $.request('onAjax', {
    //         data: {delete_all_orders: true},
    //         update: { 'order-list/order-list-ajax': `.${this.obListWrapper}` }
    //     })
    // }

    sendAjax(iNextPage) {
      let app = this;
      $.request('ProductData::onAjaxRequest', {
        data: { page: iNextPage },
        update: { 'order-list/order-list-ajax': `@.${this.obListWrapper}` },
      });
      setTimeout(()=>{
        Toggle.make('._toggle');
      }, 500)
    }
}();
