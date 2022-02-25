import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";

export default new class ProductList {
    constructor(){
        this.$vContainer = $("._filter");
        this.show = $('._show');

        this.test();
    }

    test(){
        if($(window).width() <= '768' && this.$vContainer.length){
            this.show.on('click', () => {
                this.initPlugins();
            })
        }
        this.initPlugins();
        console.log('poschlo')
    }

    initPlugins(){
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
            obRequestData.update = { 'product-list/product-list-ajax': '.catalog_wrapper' };
            console.log('gog')
            return obRequestData;
        });

        const obFilterPrice = new ShopaholicFilterPrice(obListHelper);
        obFilterPrice.init();

        const obFilterPanel = new ShopaholicFilterPanel(obListHelper);
        obFilterPanel.init();
    }
}();
