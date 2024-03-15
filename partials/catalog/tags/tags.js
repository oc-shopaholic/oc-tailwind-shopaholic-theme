import UrlGeneration from '@oc-shopaholic/url-generation'
import {EVENT_OPEN} from '/partials/common/off-canvas/off-canvas'
import {ProductList} from '/partials/product/product-list/product-list'

const FILTER_TYPE_CHECKBOX = 'checkbox';
const FILTER_TYPE_SELECT = 'select';
const FILTER_TYPE_RADIO = 'radio';
const FILTER_TYPE_BETWEEN = 'between';
const FILTER_TYPE_PRICE = 'price';
const FILTER_TYPE_SALE = 'sale';

class TagList {
  constructor () {
    this.mainNode = document.querySelector('._tags');
    this.tagListNode = this.mainNode ? this.mainNode.querySelector('._tags-container') : null;
    this.propertyCount = 0;
    this.tagList = [];

    UrlGeneration.init();
  }

  init () {
    this.prepareTagList();
    this.createTags();
  }

  prepareTagList() {
    this.propertyCount = 0;
    this.tagList = [];
    for (const [key, value] of UrlGeneration.obSearchParams.entries()) {
      let tagID = null;
      if (key === FILTER_TYPE_PRICE) {
        tagID = FILTER_TYPE_PRICE;
      } else if (key === FILTER_TYPE_SALE) {
        tagID = FILTER_TYPE_SALE;
      } else if (key.indexOf('property[') === 0) {
        this.propertyCount++;
        tagID = key.replace('property[', '').replace(']', '');
      }

      if (!tagID) {
        continue;
      }

      this.tagList.push({
        id: tagID,
        value: value,
      });
    }
  }

  createTags () {
    this.tagListNode.innerHTML = '';
    if (this.tagList.length === 0) {
      this.mainNode.classList.add('hidden');

      return;
    }

    this.tagList.forEach((tagData) => {
      if (tagData.id === 'price') {
        this.createPriceTag(tagData);
      } else if (tagData.id === 'sale') {
        this.createWithDiscountTag(tagData);
      } else {
        this.createPropertyTag(tagData);
      }
    });

    if (this.tagListNode.childElementCount > 0) {
      this.mainNode.classList.remove('hidden');
    } else {
      this.mainNode.classList.add('hidden');
    }
  }

  createPriceTag (tagData) {
    const priceFilterNode = document.getElementById('price-filter');
    const priceFilterSummaryNode = priceFilterNode ? priceFilterNode.querySelector('summary') : null;
    if (!priceFilterNode || !priceFilterSummaryNode || !tagData.value) {
      return;
    }

    const filterName = priceFilterSummaryNode.innerText.trim();
    const valueList = tagData.value.split('|');
    const minValue = valueList[0];
    const maxValue = minValue.length > 1 ? valueList[1] : null;
    if (!minValue && !maxValue) {
      return;
    }

    const tagText = this.generateBetweenTagText(minValue, maxValue, priceFilterNode.dataset.translateTo, priceFilterNode.dataset.translateFrom);
    const tagHTML = `${filterName}: ${tagText}`;

    this.addTagNode(tagData, tagHTML);
  }

  generateBetweenTagText(minValue, maxValue, minLabel, maxLabel) {
    let tagText = '';
    if (!minValue && maxValue) {
      tagText = `${maxLabel} ${maxValue}`;
    } else if (minValue && (!maxValue || minValue >= maxValue)) {
      tagText = `${minLabel} ${minValue}`;
    } else {
      tagText = `${minValue} - ${maxValue}`;
    }

    return tagText
  }

  createWithDiscountTag(tagData) {
    const discountFilterNode = document.querySelector('._shopaholic-sale-filter-wrapper');
    const discountLabelNode = discountFilterNode ? discountFilterNode.querySelector('label[for="sale"]') : null;
    if (!discountFilterNode || !discountLabelNode) {
      return;
    }

    const filterName = discountLabelNode.innerText.trim();

    this.addTagNode(tagData, filterName);
  }

  createPropertyTag(tagData) {
    const filterNode = document.querySelector(`._shopaholic-filter-wrapper[data-property-id="${tagData.id}"]`);
    const filterType = filterNode ? filterNode.dataset.filterType : null;
    if (!filterNode || !filterType) {
      return;
    }

    if (filterType === FILTER_TYPE_CHECKBOX) {
      this.createCheckboxFilterTag(tagData, filterNode);
    } else if (filterType === FILTER_TYPE_SELECT) {
      this.createSelectFilterTag(tagData, filterNode);
    } else if (filterType === FILTER_TYPE_RADIO) {
      this.createRadioFilterTag(tagData, filterNode);
    } else if (filterType === FILTER_TYPE_BETWEEN) {
      this.createBetweenFilterTag(tagData, filterNode);
    }
  }

  createCheckboxFilterTag(tagData, filterNode) {
    const valueList = tagData.value.split('|');
    valueList.forEach((value) => {
      const labelNode = filterNode.querySelector(`label[for="property-${tagData.id}-${value}"]`);
      if (!labelNode) {
        return;
      }

      const filterName = labelNode.innerText.trim();

      this.addTagNode(tagData, filterName, value);
    });
  }

  createSelectFilterTag(tagData, filterNode) {
    const labelNode = filterNode.querySelector(`option[value="${tagData.value}"]`);
    if (!labelNode) {
      return;
    }

    const filterName = labelNode.innerText.trim();

    this.addTagNode(tagData, filterName, tagData.value);
  }

  createRadioFilterTag(tagData, filterNode) {
    const labelNode = filterNode.querySelector(`label[for="property-${tagData.id}-${tagData.value}"]`);
    if (!labelNode) {
      return;
    }

    const filterName = labelNode.innerText.trim();

    this.addTagNode(tagData, filterName, tagData.value);
  }

  createBetweenFilterTag(tagData, filterNode) {
    const filterSummaryNode = filterNode.parentNode.querySelector('summary');
    const minLabelNode = filterNode.querySelector(`label[for="property-min-${tagData.id}"]`);
    const maxLabelNode = filterNode.querySelector(`label[for="property-max-${tagData.id}"]`);
    if (!filterSummaryNode || !minLabelNode || !maxLabelNode) {
      return;
    }

    const filterName = filterSummaryNode.innerText.trim();
    const valueList = tagData.value.split('|');
    const minValue = valueList[0];
    const maxValue = minValue.length > 1 ? valueList[1] : null;
    if (!minValue && !maxValue) {
      return;
    }

    const minLabel = minLabelNode.innerText.trim();
    const maxLabel = maxLabelNode.innerText.trim();
    const tagText = this.generateBetweenTagText(minValue, maxValue, minLabel, maxLabel);
    const tagHTML = `${filterName}: ${tagText}`;

    this.addTagNode(tagData, tagHTML, tagData.value);
  }

  addTagNode(tagData, tagHTML, value) {
    const tagNode = document.createElement('li');
    tagNode.dataset.propertyId = tagData.id;
    tagNode.dataset.propertyValue = value;
    tagNode.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
    tagNode.innerHTML =  `${tagHTML} <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id="${tagData.id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;
    this.tagListNode.appendChild(tagNode);
  }

  static removeTag () {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      if (!eventNode.closest('._delete-tag')) {
        return;
      }

      const listNode = eventNode.closest('li');
      const propertyId = listNode ? listNode.dataset.propertyId : null;
      const propertyValue = listNode ? listNode.dataset.propertyValue : null;
      if (!propertyId || !propertyValue) {
        return;
      }

      let fieldName = `property[${propertyId}]`;
      if (propertyId === FILTER_TYPE_PRICE) {
        fieldName = FILTER_TYPE_PRICE;
      } else if (propertyId === FILTER_TYPE_SALE) {
        fieldName = FILTER_TYPE_SALE;
      }

      UrlGeneration.init();
      let fieldValue = UrlGeneration.obSearchParams.get(fieldName);
      if (!fieldValue) {
        return;
      }

      if (fieldValue === propertyValue || [FILTER_TYPE_PRICE, FILTER_TYPE_SALE].includes(propertyId)) {
        UrlGeneration.remove(fieldName);
      } else {
        fieldValue = fieldValue.replace(propertyValue, '');
        fieldValue = fieldValue.replace('||', '|');

        UrlGeneration.set(fieldName, fieldValue);
      }

      UrlGeneration.update();
      const obProductList = new ProductList();
      const obListHelper = obProductList.getListHelper();
      obListHelper.send();
    });
  }

  static removeAll () {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest('._reset-all-tags');
      if (!buttonNode) {
        return;
      }

      UrlGeneration.clear();
      UrlGeneration.update();

      const mainNode = document.querySelector('._tags');
      mainNode.classList.add('hidden');

      const obProductList = new ProductList();
      const obListHelper = obProductList.getListHelper();
      obListHelper.send();
    });
  }

  static initHandlers() {
    document.addEventListener('product:filter.updated', () => {
      const obTagList = new TagList();
      obTagList.init();
    });

    document.addEventListener(EVENT_OPEN, (event) => {
      if (event.detail.id !== 'filter_panel') {
        return;
      }

      const obTagList = new TagList();
      obTagList.init();
    });

    TagList.removeTag();
    TagList.removeAll();
  }
}

TagList.initHandlers();
