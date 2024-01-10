import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';
import InputQuantity from '../input-quantity/input-quantity'

export default new class productCardCheckout{
    constructor(){
        this.obCardList = null;
        this.obStateBasket = null;

        this.init();
    }

    changeStateBasket(){
        this.obCardList = document.getElementsByClassName('_card-list')[0];
        this.obStateBasket = document.getElementsByClassName('product-active')[0];
        if(!this.obCardList.querySelectorAll('ul li').length){
            this.obStateBasket.style = "--icon-indicator:hidden";
        }
    }

    init(){
        const obShopaholicCartRemove = new ShopaholicCartRemove();
        obShopaholicCartRemove.setAjaxRequestCallback((obRequestData, obButton) => {
            obRequestData.update = {
                'card-list/card-list-ajax': `._card-list`,
                'checkout-list/checkout-list-ajax': `._checkout-list`,
                'checkout-subtotal/checkout-subtotal-ajax': `._checkout-subtotal`,
            }
            obRequestData.complete = () =>{
                this.changeStateBasket();
                InputQuantity.make('_counter _counter-card');
            }
            return obRequestData;
        }).init();
    }

}();
