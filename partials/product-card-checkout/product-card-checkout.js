import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';
import InputQuantity from '../input-quantity/input-quantity'

export default new class productCardCheckout{
    constructor(){
        this.obCardList = null;
        this.obStateBasket = null;

        this.init();
    }

    changeStateBasket(){
        this.obCardList = $('._card-list');
        this.obStateBasket = $('.product-active');
        if(!this.obCardList.find('ul').length){
            this.obStateBasket.css('--icon-indicator', 'hidden');
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
                $('._counter').children().off();
                InputQuantity.make('._counter');
            }
            return obRequestData;
        }).init();
    }

}();
