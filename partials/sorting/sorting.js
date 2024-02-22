import ShopaholicProductList from '@lovata/shopaholic-product-list/shopaholic-product-list';
import ShopaholicSorting from '@lovata/shopaholic-product-list/shopaholic-sorting';
import ShopaholicPagination from '@lovata/shopaholic-product-list/shopaholic-pagination';
import Choices from 'choices.js';
import Filter, { setAccordionState } from '../filter/filter';


export default new class Sorting{
    constructor() {
        this.obSorting = document.getElementsByClassName('_sorting-container')[0];
        this.obContainer = this.obSorting.querySelectorAll('.catalog_wrapper')[0];
        this.handlers();
    }

    initChoices(){
        const choices = new Choices('.js-choice', {
            searchEnabled: false,
            searchChoices: false,
            allowHTML: false,
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices w-full md:w-auto',
                containerInner: 'pe-4',
                listDropdown: 'js-choice__dropdown',
                itemChoice: 'choices__item--choice text-gray-700',
            },
            callbackOnCreateTemplates: function(template) {
                return {
                  item: ({ classNames }, data) => {
                    let active = document.getElementsByClassName('_sorting-filter')[0].dataset.activeText;
                      return template(`
                        <div class="${classNames.item} ${
                        data.highlighted
                        ? classNames.highlightedState
                        : classNames.itemSelectable
                    } ${
                        data.placeholder ? classNames.placeholder : ''
                    }text-gray-700 text-base" data-item data-id="${data.id}" data-value="${data.value}" ${
                        data.active ? 'aria-selected="true"' : ''
                    } ${data.disabled ? 'aria-disabled="true"' : ''}>
                        <span class="pe-2 text-gray-600">${active}:</span> ${data.label}
                        </div>
                    `);
                  },
                };
              },
        });
    }

    handlers(){
        this.initChoices();
        this.updateFilters()
        this.initContainerWatch();
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
        obRequestData.update = {
            'sorting/sorting': `._sorting`,
        };
        return obRequestData;
        });

        const obPaginationHelper = new ShopaholicPagination(obListHelper);
        obPaginationHelper.init();

        const obSortingHelper = new ShopaholicSorting(obListHelper);
        obSortingHelper.init();
    }
    updateFilters(){
      new Filter();
      setAccordionState()
    }

    initContainerWatch(){
        let app = this;
        var target = this.obSorting;

        const config = {
            childList: true,
            subtree: true,
        };

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if(!document.getElementsByClassName('choices').length){
                        app.initChoices();
                    }
                }
            }
            app.updateFilters()
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }
}();
