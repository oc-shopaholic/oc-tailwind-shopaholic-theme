import ShopaholicSearch from "@oc-shopaholic/shopaholic-search";
import RecentlyElem from "./recently-elem";

export default class Search {
  constructor(app) {
    this.obNav = app;
    this.obShow = this.obNav.querySelectorAll("._show");
    this.obPlaceholder = null;
    this.obProductTitle = null;
    this.obInput = null;
    this.obClear = null;
    this.obRecently = null;
    this.obRecentlyContainer = null;
    this.obRecentlyText = null;
    this.obPreloader = null;
    this.obResultWrapper = null;
    this.obNoResult = null;
    this.obNoResultText = null;
    this.obRecentlyTemplate = null;
    this.obTemplate = null;
    this.obProductContainer = null;
    this.obShowMore = null;
    this.obShowMoreHidden = null;
    this.obHeader = null;
    this.obClearRecentlyAll = null;
    this.obSearchIcon = null;
    this.obCategoryTitle = null;
    this.obRecentlyList = null;

    this.nPagination = 5;
    this.nPaginationSpare = this.nPagination;
    this.aPaginationContainer = [];
    this.bOpenRecently = false;
    this.aRecentlyTextDefault = [];
    this.sSplitSpaces = null;
    this.sNoResultSearchText = /:search_query/g;
  }

  initVariables(){
    this.bOpenRecently = false;
    this.sNoResultSearchText = /:search_query/g;
    this.nPagination = 3;
    this.obPlaceholder = this.obNav.querySelectorAll("._placeholder");
    this.obInput = this.obNav.querySelectorAll("._shopaholic-search-input");
    this.obClear = this.obNav.querySelectorAll("._clear");
    this.obPreloader = this.obNav.querySelectorAll("._preloader");
    this.obResultWrapper = this.obNav.querySelectorAll(".search-result-wrapper");
    this.obNoResult = this.obNav.querySelectorAll("._no-result");
    this.obNoResultText = this.obNav.querySelectorAll("._no-result-text");
    this.obRecentlyContainer = this.obNav.querySelectorAll("._recently-container");
    this.obRecentlyTemplate = this.obNav.querySelectorAll("._recently-template");
    this.obShowMore = this.obNav.querySelectorAll("._show-more");
    this.obShowMoreHidden = this.obNav.querySelectorAll("._show-more-hidden");
    this.obHeader = this.obNav.querySelectorAll("._recently-container ._recently-header");
    this.obClearRecentlyAll = this.obNav.querySelectorAll("._clear-recently-all");
    this.obSearchIcon = this.obNav.querySelectorAll("._search-icon");
    this.obRecentlyList = this.obNav.querySelectorAll("._recently-list");
  }

  initOthersVariables(){
    this.obRecently = this.obNav.querySelectorAll("._recently");
    this.obProductTitle = this.obNav.querySelectorAll("._product-name");
    this.obCategoryTitle = this.obNav.querySelectorAll("._category-name");
    this.obRecentlyText = this.obNav.querySelectorAll("._recently-text");
  }

  initEvents() {
    this.clearSearchResult();
    this.useHintEmulation();
    this.clearRecently();
    this.initSearchResult();
    this.historyResult();
    RecentlyElem.make('_recently');
    this.showMore();
  }

  initSearch() {
    const obHelper = new ShopaholicSearch();
    obHelper.setSearchLimit(3).setAjaxRequestCallback(function (obRequestData) {
      obRequestData.update = { 'search/search-result': '.search-result-wrapper' };
      return obRequestData;
    }).init();
  }

  initWatchInput(){
    this.obInput[0].addEventListener("input", (ev) => {
      if(ev.target.value.length > 2){
        this.watchInputActive();
      }else{
        this.watchInputNotActive();
      }
      this.watchInputOther();
    });
  }

  initProductWatch(){
    const app = this;
    const target = document.getElementsByClassName('search-result-wrapper')[0];

    const config = {
      childList: true,
    };

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && app.obInput[0].value[0] !== ' ') {
          app.initOthersVariables();
          app.hints();
          app.historyResult();
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(target, config);
  }

  initSearchResult(){
    if(!localStorage.searchHistory){

      localStorage.searchHistory = JSON.stringify([])
    }
    const history = JSON.parse(localStorage.searchHistory);
    if(history.length){
      this.obRecentlyList[0].innerHTML = '';
      for(let i = 0; i < history.length; i++){
        this.obTemplate = this.obRecentlyTemplate[0].content.cloneNode(true);
        let container = this.obTemplate.querySelectorAll("span");
        container[0].innerText = history[i];
        this.obRecentlyList[0].appendChild(this.obTemplate);
      }
      if(history.length > 1){

        this.obClearRecentlyAll[0].style.display = 'block';
        this.obHeader[0].style.display = 'flex';
      }else{
        this.obClearRecentlyAll[0].style.display = 'none';
      }
      this.obRecentlyContainer[0].style.display = 'block';
      this.initOthersVariables();
    }
  }

  initPagination(){
    if(this.nPagination !== this.nPaginationSpare){
      this.nPagination = this.nPaginationSpare;
    }

    this.obProductContainer = this.obNav.querySelectorAll("._product-container li");

    if(this.obProductContainer.length > this.nPagination){
      const count = this.obProductContainer.length - this.nPagination;
      const finalScore = this.obProductContainer.length - count;
      this.aPaginationContainer = [];

      for(let i = finalScore; i < this.obProductContainer.length; i++){
        this.aPaginationContainer.push(this.obProductContainer[i]);
        this.obProductContainer[i].remove();
      }
    }
  }

  historyResult(){
    if(!localStorage.searchHistory){
      localStorage.searchHistory = JSON.stringify([])
    }
    if(!this.obInput[0].value) return
    let history = JSON.parse(localStorage.searchHistory);
    const uniqueness = history.indexOf(this.obInput[0].value) != -1;
    const lastSign = this.obInput[0].value[this.obInput[0].value.length -1];
    if(history.length >= 5 && !uniqueness){
      history = history.slice(1);
    }
    if(!uniqueness && this.obInput[0].value !== '' && this.obInput[0].value[0] !== ' ' && this.obInput[0].value.length > 2 && (this.obProductTitle.length || this.obCategoryTitle.length) && lastSign !== ' '){
      history.push(this.obInput[0].value);

      let finalHistory = JSON.stringify(history);
      localStorage.searchHistory = finalHistory;
      this.bOpenRecently = true;
      this.obRecentlyContainer[0].style.display = 'none';
    }
  }

  highlightMatches(content){
    if(content.length){
      for (let i = 0; i < content.length; i++) {
        const text = content[i].innerText;
        this.workingSpaces(text);
        content[i].innerHTML = text.replace(new RegExp(this.sSplitSpaces, 'gi'), "<b class='font-bold'>$&</b>");
      }
    }
  }

  whitewashPlaceholder(){
    if(this.obProductTitle.length){
      this.workingSpaces(this.obProductTitle[0].innerText);
    }
    const enteredText = this.obProductTitle[0].innerText.substring(this.sSplitSpaces.trim().length, this.obProductTitle[0].innerText.length);
    const finalText = ('<span class="text-gray-200">' + this.obInput[0].value + '</span>') + enteredText;
    this.obPlaceholder[0].innerHTML = finalText;
  }

  workingSpaces(content){
    this.sSplitSpaces = this.obInput[0].value.replace(/[ ]+/g, '');
    let space = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i] === " ") {
        space.push(i);
      }
    }
    for (let i = 0; i < space.length; i++) {
      if (this.sSplitSpaces.length >= space[i]) {
        this.sSplitSpaces = this.sSplitSpaces.substring(0, space[i]) + ' ' + this.sSplitSpaces.substring(space[i], this.sSplitSpaces.length);
      }
    }
  }

  useHint(){
    this.obInput[0].value = this.obPlaceholder[0].innerText;
    this.obInput[0].dispatchEvent(
      new InputEvent('input', {
          bubbles: true,
          cancelable: true,
    }));
    this.obProductTitle[0].style.display = 'block';
    this.highlightMatches(this.obProductTitle);
    this.highlightMatches(this.obCategoryTitle);
    this.whitewashPlaceholder();
  }

  removalSelection(){
   if(this.aRecentlyTextDefault.length){
    for (let i = 0; i < this.obRecentlyText.length; i++) {
      this.obRecently[i].classList.remove('hidden');
      this.obRecentlyText[i].innerText = this.aRecentlyTextDefault[i].innerText;
    }
   }
  }

  filterRecently(){
    if(this.obInput[0].value.length && this.obRecentlyText){
      for (let i = 0; i < this.obRecentlyText.length; i++) {
        if(this.aRecentlyTextDefault.length <= this.obRecentlyText.length) this.aRecentlyTextDefault.push(this.obRecentlyText[i])
        if(this.obRecentlyText[i].innerText.toLowerCase().indexOf(this.obInput[0].value.toLowerCase()) !== -1) {
          const text = this.obRecentlyText[i].innerText;
          this.obRecently[i].classList.remove('hidden');
          this.obRecentlyText[i].innerHTML = text.replace(new RegExp(this.obInput[0].value, 'gi'), "<b class='font-bold'>$&</b>");
        }else{
          this.obRecently[i].classList.add('hidden');
        }
      }
    }
  }

  hintsActive(){
    if(this.obProductTitle.length){
      this.obPlaceholder[0].style.display = 'block';
      this.obPlaceholder.innerHTML = this.obProductTitle[0].innerText;
      this.initPagination();
      this.whitewashPlaceholder();
    }
    this.obResultWrapper[0].style.display = 'block';
    this.obPreloader[0].style.display = 'none';
    this.obSearchIcon[0].style.display = 'block';
    this.obNoResult[0].style.display = 'none';
    if(this.obProductTitle.length && this.obProductContainer.length > this.nPagination && this.obProductContainer.length !== this.nPagination) this.obShowMore[0].style.display = 'block';
    if (!this.bOpenRecently) this.obRecentlyContainer[0].style.display = 'block';
    this.obRecentlyContainer[0].style.display = 'block';
    this.obClearRecentlyAll[0].style.display = 'none';
    this.filterRecently();
  }

  hintsNotActive(){
    this.obPlaceholder[0].innerHTML = '';
    this.obPlaceholder[0].style.display = 'block';
    this.obNoResult[0].style.display = 'none';
  }

  hintsOther(){
    this.obShowMore[0].style.display = 'none';
    this.obPlaceholder[0].style.display = 'none';
    this.obPreloader[0].style.display = 'none';
    this.obSearchIcon[0].style.display = 'block';
    if(!this.obCategoryTitle.length && this.obInput[0].value.length > 2){
      this.obNoResult[0].style.display = 'flex';
      this.obRecentlyContainer[0].style.display = 'none';
    }else{
      this.obRecentlyContainer[0].style.display = 'block';
    }
    const finnalText = this.obNoResultText[0].innerText.replace(this.sNoResultSearchText, this.obInput[0].value);
    this.obNoResultText[0].innerText = finnalText;
    this.sNoResultSearchText = new RegExp( `${this.obInput[0].value}`, 'g');
  }

  hints(){
    if ((this.obProductTitle.length || this.obCategoryTitle.length) && this.obInput[0].value.length) {
      this.hintsActive();
    } else if(!this.obInput[0].value.length){
      this.hintsNotActive();
    }else {
      this.hintsOther();
    }
    this.highlightMatches(this.obProductTitle);
    this.highlightMatches(this.obCategoryTitle);
  }

  showMore(){
    const count = this.nPagination;
    this.obShowMore[0].addEventListener("click", () => {
      let container = this.obNav.querySelectorAll("._product-container");
      if (this.obProductContainer.length > this.nPagination && this.obProductContainer.length !== this.vPagination) {
        this.obShowMoreHidden[0].style.display = 'block';
        this.obShowMore[0].style.display = 'none';
        setTimeout(() => {
          for (let i = 0; i < this.nPagination; i++) {
            container[0].appendChild(this.aPaginationContainer[i]);
          }
          this.nPagination += 5;
          if (count !== this.nPagination) {
            this.obShowMoreHidden[0].style.display = 'none';
            this.obShowMore[0].style.display = 'block';
            if(this.obProductContainer.length <= this.nPagination) this.obShowMore[0].style.display = 'none';
          }
        }, 400)
      }
    })
  }

  clearSearchResult(){
    this.obClear[0].addEventListener('click', () => {
      const searchResultWrapper = this.obNav.querySelectorAll(".search-result-wrapper");
      const childrenNode = searchResultWrapper;
      const history = JSON.parse(localStorage.searchHistory);
      this.obClear[0].style.display = 'none';
      this.obShowMore[0].style.display = 'none';
      this.clearingHints();
      if(this.obRecently.length && history.length){
        this.obRecentlyContainer[0].style.display = 'block';
        this.obHeader[0].style.display = 'flex';
      }
      this.obInput[0].value = '';
      childrenNode[0].innerHTML = '';
    })
  }

  useHintEmulation(){
    const app = this;
    document.getElementsByClassName('_shopaholic-search-input')[0].addEventListener('keydown', function(e) {
      if(e.keyCode === 39 && app.obProductTitle && app.obProductTitle.length > 0 ) {
        app.useHint();
      }
    });
  }

  clearRecently(){
    this.obClearRecentlyAll[0].addEventListener('click', () => {
      localStorage.searchHistory = JSON.stringify([]);
      this.obRecentlyList[0].innerHTML = '';
      this.obHeader[0].style.display = 'none';
      this.obClearRecentlyAll[0].style.display = 'none';
    })
  }

  watchInputActive(){
    this.obClear[0].style.display = 'block';
    this.obPlaceholder[0].style.display = 'none';
    this.obPreloader[0].style.display = 'flex';
    this.obSearchIcon[0].style.display = 'none';
    this.obShowMore[0].style.display = 'none';
    this.obHeader[0].style.display = 'none';
    this.obClearRecentlyAll[0].style.display = 'none';
  }

  watchInputNotActive(){
    const history = JSON.parse(localStorage.searchHistory);
    const rerunRecently = this.obNav.querySelectorAll("._recently");
    this.obClear[0].style.display = 'none';
    this.obPreloader[0].style.display = 'none';
    this.obSearchIcon[0].style.display = 'block';
    this.obPlaceholder[0].innerHTML = '';
    this.obResultWrapper[0].style.display = 'none';
    if(this.obInput[0].value.length){
      this.obClear[0].style.display = 'block';
    }
    if(this.obRecently && this.obRecently.length && this.obInput[0].value.length < 1 && history.length){
      this.obRecentlyContainer[0].style.display = 'block';
      this.obHeader[0].style.display = 'flex';
    }
    if(this.obInput[0].value.length < 1 && history.length){
      this.clearingHints();
    }
    if(rerunRecently.length > 1){
      this.obClearRecentlyAll[0].style.display = 'block';
    }
    if(this.obInput[0].value.length){
      this.obHeader[0].style.display = 'none';
      this.obClearRecentlyAll[0].style.display = 'none';
    }

    this.removalSelection();
  }

  watchInputOther(){
    this.obNoResult[0].style.display = 'none';
    this.obShowMore[0].style.display = 'none';
    this.filterRecently();
  }

  show() {
    this.obShow[0].addEventListener("click", () => {
      this.initVariables();
      if(this.obResultWrapper.length){
        this.initSearch();
        this.initEvents();
        this.initProductWatch();
        this.initWatchInput();
      }
    })
  }

  clearingHints(){
    this.bOpenRecently = false;
    this.removalSelection();
    this.aRecentlyTextDefault = [];
    if(this.obRecently.length) this.obRecently.innerHTML = '';
    this.initSearchResult();
    RecentlyElem.make('_recently');
  }

  static make(container) {
    const obContainer = document.getElementsByClassName(`${container}`);
    Array.from(obContainer).forEach(function(e) {
      const containerNav = new Search(e);
      containerNav.show();
    });
  }
}

Search.make('_off-canvas');
