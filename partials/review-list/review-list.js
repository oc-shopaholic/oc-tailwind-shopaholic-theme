import Choices from 'choices.js';

export default new class CustomerReviews {
  constructor() {
    this.obLoadMore = null;
    this.obShow = $('._review-list-container ._show');
    this.obListWrapper = '_review-list';
    
    this.init();
  }

  initChoices(){
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
              let active = $('._sorting-reviews').attr('data-active-text');
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
    this.obLoadMore = $('._show-more-reviews');
    this.obLoadMore.on("click", () => {
      const iPage = parseInt(this.obLoadMore.attr('data-page'), 10);
      const iNextPage = iPage + 1;
      const iMaxPage = parseInt(this.obLoadMore.attr('data-max-page'), 10);
      
      this.sendAjax(iNextPage);

      if (iNextPage >= iMaxPage) {
        this.obLoadMore.remove();
      } else {
        this.obLoadMore.attr('data-page', iNextPage);
      }
    });
  }

  init(){
    this.obShow.on('click', ()=>{
      this.initChoices();
      this.initLoadMore();
    })
  }

  sendAjax(iNextPage) {
    $.request('ProductData::onAjaxRequest', {
      data: { page: iNextPage },
      update: { 'review-list/review-list-ajax': `@.${this.obListWrapper}` }
    });
  }
}();
