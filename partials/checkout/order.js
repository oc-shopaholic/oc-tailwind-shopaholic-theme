import ShopaholicOrder from '@oc-shopaholic/shopaholic-cart/shopaholic-order';

export default new class Order{
    constructor(){
        this.init();
    }

    init(){
        document.addEventListener('bouncerFormValid', () => {
            const obShopaholicOrder = new ShopaholicOrder().create();
        });
    }
}
