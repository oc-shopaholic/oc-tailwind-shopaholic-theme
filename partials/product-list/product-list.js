import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";

export default new class ProductList {
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = null;

        this.$vProductCount = null
        this.$vResult = null;
        this.$vClear = null;

        this.show = this.$vContainer.find('._show');

        this.adaptation();
    }
    
    adaptation(){
        if($(window).width() <= '768' && this.$vContainer.length){
            this.show.on('click', () => {
                this.initPlugins();
                this.activeProductUpdate();
            })
        }
        this.initPlugins();
        this.clear();
        this.watchResult();
        this.catalogPosition();
    }

    updateFilters(){
        this.$vTemplate = this.$vContainer.find("._filterTemplate");
        this.vContainer = this.$vTemplate;
        let container = this.vContainer[0].content.cloneNode(true);
        $(container).appendTo(this.$vContainer);
    }

    activeProductUpdate(){
        this.$vProductCount = this.$vContainer.find('._product-count');
        let seeAll = this.$vProductCount.text().split('(')[0]
        let product = $('.catalog_wrapper ._shopaholic-product-wrapper')
        this.$vProductCount.text(seeAll + ' (' + product.length +')')
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
              app.clear();
              app.catalogPosition();
              app.activeProductUpdate();
              app.updateFilters();
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
    // попробуй через detach пофиксить закрытие тегов dialog
    initPlugins(){
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
            obRequestData.update = { 
                'product-list/product-list-ajax': '.catalog_wrapper',
                'product-list/filter/filter-ajax': '._filter',
            };
            console.log('product')
            return obRequestData;
        });
        
        const obFilterPrice = new ShopaholicFilterPrice(obListHelper);
        obFilterPrice.init();

        const obFilterPanel = new ShopaholicFilterPanel(obListHelper);
        obFilterPanel.init();
    }
}();
