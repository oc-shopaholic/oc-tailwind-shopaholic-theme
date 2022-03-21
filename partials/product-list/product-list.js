import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";

export default new class ProductList {
    constructor(){
        this.$vContainer = $("._filter");
        this.$vResult = null;
        this.$vClear = null;

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
        this.clear();
        this.watchResult();
        this.catalogCss();
    }

    watchResult(){
        let app = this;
        var target = $('.catalog_wrapper')[0];
    
        const config = {
          childList: true,
        };
    
        const callback = function (mutationsList, observer) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
              console.log('изменилось')
              app.clear();
              app.catalogCss();
            }
          }
        };

        const observer = new MutationObserver(callback);

        if(target) observer.observe(target, config);
    }

    catalogCss(){
        let a = $('._shopaholic-product-wrapper');
        if(!a.length){
            console.log('minus')
            this.$vResult.css('display', 'flex');
            this.$vResult.css('justify-content', 'center');
        }else{
            this.$vResult.css('display', 'grid');
            this.$vResult.css('justify-content', 'center');
        }
    }

    clear(){
        this.$vResult = $(".catalog_wrapper");
        this.$vClear = this.$vResult.find("._clearFilter");
        console.log('Кнопка очистки', this.$vClear)
        this.$vClear.on('click', () => {
            console.log('вызван')
            var b = window.location.href.split('?')[0];
            window.location.href = b;
        })
    }

    initPlugins(){
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
            obRequestData.update = { 'product-list/product-list-ajax': '.catalog_wrapper' };
            console.log('отправка')
            return obRequestData;
        });

        const obFilterPrice = new ShopaholicFilterPrice(obListHelper);
        obFilterPrice.init();

        const obFilterPanel = new ShopaholicFilterPanel(obListHelper);
        obFilterPanel.init();
    }
}();
