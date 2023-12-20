import Choices from 'choices.js';

export default new class CustomerReviews {
  constructor() {
    this.bShow = document.getElementsByClassName('_review-list-container')[0].querySelectorAll('._show')[0];
    this.obLoadMore = null;
    this.sListWrapper = '_review-list';

    this.init();
  }

  init(){
    if(this.bShow){
      this.bShow.addEventListener('click', ()=>{
        this.initChoices();
        this.initLoadMore();
      })
    }
  }

  initChoices(){
    if(!document.querySelector('._sorting-choice')) return false;
    const choices = new Choices('._sorting-choice', {
      searchEnabled: false,
      searchChoices: false,
      allowHTML: false,
      itemSelectText: '',
      classNames: {
          containerOuter: 'choices w-full md:w-auto',
          containerInner: 'pr-4',
          listDropdown: 'js-choice__dropdown',
          itemChoice: 'choices__item--choice text-gray-700 text-sm'
      },
      callbackOnCreateTemplates: function(template) {
          return {
            item: ({ classNames }, data) => {
              let active = document.getElementsByClassName('_sorting-reviews')[0].dataset.activeText;
              return template(`
                  <div class="${classNames.item} ${
                  data.highlighted
                  ? classNames.highlightedState
                  : classNames.itemSelectable
              } ${
                  data.placeholder ? classNames.placeholder : ''
              }text-gray-600 text-base" data-item data-id="${data.id}" data-value="${data.value}" ${
                  data.active ? 'aria-selected="true"' : ''
              } ${data.disabled ? 'aria-disabled="true"' : ''}>
                  <span class="pr-2">${active}:</span> ${data.label}
                  </div>
              `);
            },
          };
        },
    });
  }

  initLoadMore(){
    this.obLoadMore = document.getElementsByClassName('_show-more-reviews')[0];

    if(!this.obLoadMore) {
      return;
    }

    this.obLoadMore.addEventListener("click", () => {
      const iPage = parseInt(this.obLoadMore.dataset.page, 10);
      const iNextPage = iPage + 1;
      const iMaxPage = parseInt(this.obLoadMore.dataset.maxPage, 10);

      this.sendAjax(iNextPage);

      if (iNextPage >= iMaxPage) {
        this.obLoadMore.remove();
      } else {
        this.obLoadMore.setAttribute('data-page', iNextPage);
      }
    });
  }

  sendAjax(iNextPage) {
    oc.ajax('onAjax', {
      data: { page: iNextPage },
      update: { 'review-list/review-list-ajax': `@.${this.sListWrapper}` }
    });
  }
}();
