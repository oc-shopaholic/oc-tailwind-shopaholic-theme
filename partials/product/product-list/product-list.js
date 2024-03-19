import ShopaholicProductList from "@oc-shopaholic/shopaholic-product-list/shopaholic-product-list";
import ShopaholicSorting from "@oc-shopaholic/shopaholic-product-list/shopaholic-sorting";
import ShopaholicPagination from "@oc-shopaholic/shopaholic-product-list/shopaholic-pagination";

export class ProductList {
  constructor() {
    // this.obContainer = document.getElementsByClassName('_filter')[0];
    // this.obProductCount = null;
    // this.obButtonLoading = null;
    //
    // this.adaptation();

    this.obListHelper = new ShopaholicProductList();
    this.obListHelper.setAjaxRequestCallback((obRequestData) => {
      obRequestData.update = {
        'product/product-list/product-list': '.catalog_wrapper',
        'catalog/filter/filter-ajax': '._filter',
      };
      obRequestData.complete = () => {
        document.dispatchEvent(new CustomEvent('product:list.updated'));
        document.dispatchEvent(new CustomEvent('product:filter.updated'));
      };

      return obRequestData;
    });
  }

  init() {
    const obShopaholicPagination = new ShopaholicPagination(this.obListHelper);
    obShopaholicPagination.init();

    const obShopaholicSorting = new ShopaholicSorting(this.obListHelper);
    obShopaholicSorting.init();
  }

  getListHelper() {
    return this.obListHelper;
  }

  //
  // adaptation() {
  //   if (!this.obContainer) return
  //   if (window.innerWidth <= '768' && this.obContainer) {
  //     // this.obShow = this.obContainer.querySelectorAll('._show');
  //     // this.obShow[0].addEventListener('click', () => {
  //     //     this.activeProductUpdate();
  //     // })
  //   } else {
  //   }
  //   this.watchResult();
  // }
  //
  // activeProductUpdate() {
  //   this.obProductCount = this.obContainer.querySelectorAll('._product-count');
  //   if (!this.obProductCount.length) return;
  //   const seeAll = this.obProductCount[0].innerHTML.split('(')[0];
  //   const product = document.getElementsByClassName('_shopaholic-product-wrapper');
  //   this.obProductCount[0].innerHTML = seeAll + ' (' + product.length + ')';
  // }
  //
  // showLoading() {
  //   if (!this.obProductCount.length) return;
  //   this.obProductCount[0].style.display = 'none';
  //   this.obButtonLoading = this.obContainer.querySelectorAll('._show-more-hidden');
  //   this.obButtonLoading[0].style.display = 'block';
  //   setTimeout(() => {
  //     this.obProductCount[0].style.display = 'block';
  //     this.obButtonLoading[0].style.display = 'none';
  //   }, 400);
  // }
  //
  // watchResult() {
  //   const app = this;
  //   const target = document.getElementsByClassName('_sorting')[0];
  //
  //   const config = {
  //     childList: true,
  //   };
  //
  //   const callback = function (mutationsList, observer) {
  //     for (let mutation of mutationsList) {
  //       if (mutation.type === 'childList') {
  //         app.activeProductUpdate();
  //         app.showLoading();
  //       }
  //     }
  //   };
  //
  //   const observer = new MutationObserver(callback);
  //
  //   if (target) observer.observe(target, config);
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  const obProductList = new ProductList();
  obProductList.init();
});
