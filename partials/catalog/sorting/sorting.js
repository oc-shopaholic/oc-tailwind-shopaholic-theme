import Choices from 'choices.js';

class Sorting {
  constructor() {
    this.sortingNode = document.querySelector('._sorting-container');
  }

  init() {
    if (!this.sortingNode) {
      return;
    }

    new Choices('.js-choice', {
      searchEnabled: false,
      searchChoices: false,
      allowHTML: false,
      shouldSort: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices w-full md:w-auto',
        containerInner: 'pe-4',
        listDropdown: 'js-choice__dropdown',
        itemChoice: 'choices__item--choice text-gray-700',
      },
      callbackOnCreateTemplates: (template) => {
        return {
          item: ({classNames}, data) => {
            const active = document.querySelector('.js-choice').dataset.activeText;
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
}

document.addEventListener('DOMContentLoaded', () => {
  const obSorting = new Sorting();
  obSorting.init();
});
