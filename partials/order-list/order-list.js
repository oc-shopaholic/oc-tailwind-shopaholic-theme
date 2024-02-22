import request from 'oc-request';
import { AccordionInit } from '../accordion/accordion'

export default new class OrderList {
    constructor() {
      this.obLoadMore = document.getElementsByClassName('_show-more-orders')[0];
      this.obDeleteOrders = document.getElementsByClassName('_delete_all_orders')[0];
      this.obListWrapper = '_orders-list';

      this.init();
    }

    init(){
      AccordionInit()
      if(!this.obLoadMore) return
      this.obLoadMore.addEventListener("click", () => {
        const iPage = parseInt(this.obLoadMore.dataset.page, 10);
        const iNextPage = iPage + 1;
        const iMaxPage = parseInt(this.obLoadMore.dataset.maxPage, 10);

        this.sendAjax(iNextPage);

        if (iNextPage >= iMaxPage) {
          this.obLoadMore.remove();
        } else {
          this.obLoadMore.dataset.page = iNextPage;
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
      request.sendData('ProductData::onAjaxRequest', {
        data: { page: iNextPage },
        update: { 'order-list/order-list-ajax': `@.${this.obListWrapper}` },
        complete: ()=> {
          AccordionInit()
        }
      });
    }
}();
