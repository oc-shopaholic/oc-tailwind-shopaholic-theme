import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";
import Filter from "../filter/filter";

export default new class ProductList {
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = null;

        this.$vProductCount = null
        this.$vButtonLoading = null;
        this.$vResult = null;
        this.$vClear = null;

        this.show = this.$vContainer.find('._show');
        this.hide = null;
        this.adaptation();
    }
    
    adaptation(){
        if($(window).width() <= '768' && this.$vContainer.length){
            this.show.on('click', () => {
                this.initPlugins();
                this.activeProductUpdate();
                this.updateFilters();
            })
        }else{
            this.initPlugins();
        }
        this.clear();
        this.watchResult();
        this.catalogPosition();
    }

    updateFilters(){
        new Filter();
    }

    activeProductUpdate(){
        this.$vProductCount = this.$vContainer.find('._product-count');
        let seeAll = this.$vProductCount.text().split('(')[0];
        let product = $('.catalog_wrapper ._shopaholic-product-wrapper');
        this.$vProductCount.text(seeAll + ' (' + product.length +')');
    }

    showLoading(){
        this.$vProductCount.css('display', 'none');
        this.$vButtonLoading = this.$vContainer.find('._show-more-hidden');
        this.$vButtonLoading.css('display', 'block');
        setTimeout(() => {
            this.$vProductCount.css('display', 'block');
            this.$vButtonLoading.css('display', 'none');
        }, 400);
    }

    watchResult(){
        let app = this;
        var target = $('._sorting')[0];
    
        const config = {
          childList: true,
        };
    
        const callback = function (mutationsList, observer) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
              app.clear();
              app.catalogPosition();
              app.activeProductUpdate();
              app.updateFilters();
              app.showLoading();
            }
          }
        };

        const observer = new MutationObserver(callback);

        if(target) observer.observe(target, config);
    }

    catalogPosition(){
        let container = $('._shopaholic-product-wrapper');
        if(!container.length){
            this.$vResult.css('display', 'flex');
        }else{
            this.$vResult.css('display', 'grid');
        }
        this.$vResult.css('justify-content', 'center');
    }

    clear(){
        this.$vResult = $(".catalog_wrapper");
        this.$vClear = this.$vResult.find("._clearFilter");
        this.$vClear.on('click', () => {
            let url = window.location.href.split('?')[0];
            window.location.href = url;
        })
    }
    initPlugins(){
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
            obRequestData.update = { 
                'product-list/product-list-ajax': '.catalog_wrapper',
                'filter/filters-desktop-ajax': '._filters-desktop',
                'filter/filters-mobile-ajax': '._filters-mobile',
                'sorting/sorting': `._sorting`,
            };
            return obRequestData;
        });
        
        const obFilterPrice = new ShopaholicFilterPrice(obListHelper);
        obFilterPrice.init();

        const obFilterPanel = new ShopaholicFilterPanel(obListHelper);
        obFilterPanel.init();

        const obFilterPanelDiscount = new ShopaholicFilterPanel(obListHelper);
        obFilterPanelDiscount
            .setWrapperSelector('._shopaholic-sale-filter-wrapper')
            .setFieldName('sale')
            .init();
    }
}();
