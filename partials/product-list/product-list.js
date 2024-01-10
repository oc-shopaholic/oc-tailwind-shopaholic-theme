import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";
import Filter from "../filter/filter";

export default new class ProductList {
    constructor(){
        this.obContainer = document.getElementsByClassName('_filter')[0];
        this.obProductCount = null;
        this.obButtonLoading = null;
        this.obResult = null;
        this.obClear = null;
        this.obShow = null;

        this.adaptation();
    }
    
    adaptation(){
        if(!this.obContainer) return
        if(window.innerWidth <= '768' && this.obContainer){
            this.obShow = this.obContainer.querySelectorAll('._show');
            this.obShow[0].addEventListener('click', () => {
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
        this.obProductCount = this.obContainer.querySelectorAll('._product-count');
        if(!this.obProductCount.length) return;
        const seeAll = this.obProductCount[0].innerHTML.split('(')[0];
        const product = document.getElementsByClassName('_shopaholic-product-wrapper');
        this.obProductCount[0].innerHTML = seeAll + ' (' + product.length +')';
    }

    showLoading(){
        if(!this.obProductCount.length) return;
        this.obProductCount[0].style.display = 'none';
        this.obButtonLoading = this.obContainer.querySelectorAll('._show-more-hidden');
        this.obButtonLoading[0].style.display = 'block';
        setTimeout(() => {
            this.obProductCount[0].style.display = 'block';
            this.obButtonLoading[0].style.display = 'none';
        }, 400);
    }

    watchResult(){
        const app = this;
        const target = document.getElementsByClassName('_sorting')[0];
    
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
        const container = document.getElementsByClassName('_shopaholic-product-wrapper');
        if(!container.length){
            this.obResult.style.display = 'flex';
        }else{
            this.obResult.style.display = 'grid';
        }
        this.obResult.style.justifyContent = 'center';
    }

    clear(){
        this.obResult = document.getElementsByClassName('catalog_wrapper')[0];
        this.obClear = this.obResult.querySelectorAll("._clearFilter");
        if(!this.obClear.length) return;
        this.obClear[0].addEventListener('click', () => {
            const url = window.location.href.split('?')[0];
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
