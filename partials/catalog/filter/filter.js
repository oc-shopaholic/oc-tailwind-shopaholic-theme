import {EVENT_OPEN} from '/partials/common/off-canvas/off-canvas';
import {ProductList} from '/partials/product/product-list/product-list';
import UrlGeneration from '@oc-shopaholic/url-generation';
import ShopaholicFilterPrice from '@oc-shopaholic/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicFilterPanel from '@oc-shopaholic/shopaholic-filter-panel/shopaholic-filter-panel';

export default class Filter {
  constructor() {
    this.filterNode = null
    this.templateNode = null

    const obProductList = new ProductList();
    this.obListHelper = obProductList.getListHelper();
  }

  init() {
    this.filterNode = document.querySelector('._filter');
    if (!this.filterNode) {
      return;
    }

    this.templateNode = this.filterNode.querySelector('._filterTemplate');

    this.adaptation();
    this.initAccordionState();
  }

  initHandlers() {
    const obFilterPrice = new ShopaholicFilterPrice(this.obListHelper);
    obFilterPrice.init();

    const obFilterPanel = new ShopaholicFilterPanel(this.obListHelper);
    obFilterPanel.init();

    const obFilterPanelDiscount = new ShopaholicFilterPanel(this.obListHelper);
    obFilterPanelDiscount
      .setWrapperSelector('._shopaholic-sale-filter-wrapper')
      .setFieldName('sale')
      .init();
  }

  /**
   * Copy desktop filter from template
   */
  adaptation() {
    if (window.innerWidth >= '768' && this.filterNode && this.filterNode.childElementCount <= 2 && this.templateNode) {
      const obLocalNodeContainer = this.templateNode.content.cloneNode(true);
      this.filterNode.appendChild(obLocalNodeContainer);
    }
  }

  initClearButton() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest('._clearFilter');
      if (!buttonNode) {
        return;
      }

      UrlGeneration.clear();
      if (this.filterNode) {
        this.clearPriceFilterValue('filter-min-price');
        this.clearPriceFilterValue('filter-max-price');
        this.clearDiscountsFilter();
        this.clearPropertyFilters();
      }

      this.obListHelper.send();
    });
  }

  clearPriceFilterValue(inputName) {
    const inputNode = this.filterNode.querySelector(`input[name="${inputName}"]`);
    if (!inputNode) {
      return;
    }

    inputNode.value = null;
  }

  clearDiscountsFilter() {
    const checkboxNode = this.filterNode.querySelector('._shopaholic-sale-filter-wrapper input[name="sale"]');
    if (!checkboxNode) {
      return;
    }

    checkboxNode.checked = false;
  }

  clearPropertyFilters() {
    const inputNodeList = this.filterNode.querySelectorAll('._shopaholic-filter-wrapper input');
    if (inputNodeList.length === 0) {
      return;
    }

    inputNodeList.forEach((inputNode) => {
      if (inputNode.type === 'checkbox') {
        inputNode.checked = false;
      } else {
        inputNode.value = null;
      }
    });
  }

  /**
   * Get filter state from local storage
   */
  initAccordionState() {
    const filterDetails = document.querySelectorAll('._filter-details');
    if (!filterDetails || filterDetails.length === 0) {
      return;
    }

    filterDetails.forEach((filterDetailNode) => {
      const detailsData = sessionStorage.getItem(`filter-details-${filterDetailNode.id}`);
      if (!detailsData) {
        return;
      }

      const summaryNode = filterDetailNode.querySelector('summary');
      if (summaryNode) {
        summaryNode.classList.remove('after:transition-none');
      }

      const propertyNode = document.querySelector(`[data-property-id="${filterDetailNode.id}"]`);

      if (propertyNode && detailsData === 'open') {
        propertyNode.setAttribute('open', '');
      } else if (propertyNode && detailsData === 'close') {
        propertyNode.removeAttribute('open');
      }

      if (summaryNode && detailsData === 'open') {
        summaryNode.dispatchEvent(new MouseEvent('click'));
      }
    });
  }

  initSummaryEvents() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const summaryNode = eventNode.closest('._filter-details summary');
      if (!summaryNode) {
        return;
      }

      summaryNode.classList.remove('after:transition-none');
      const detailsNode = summaryNode.closest('details');
      if (!detailsNode) {
        return;
      }

      sessionStorage.setItem(`filter-details-${detailsNode.id}`, detailsNode.open ? 'close' : 'open');
    });
  }
}

oc.pageReady().then(() => {
  const obFilter = new Filter();
  obFilter.initSummaryEvents();
  obFilter.initClearButton();

  oc.ajax('onInit', {
    update: {'catalog/filter/filter-ajax': '._filter'},
    complete: (response) => {
      obFilter.init();
      obFilter.initHandlers();

      document.addEventListener(EVENT_OPEN, (event) => {
        if (event.detail.id !== 'filter_panel') {
          return;
        }

        obFilter.initAccordionState();
      });

      document.dispatchEvent(new CustomEvent('product:filter.updated'));
    }
  });

  document.addEventListener('product:list.updated', () => {
    obFilter.init();
  });
});
