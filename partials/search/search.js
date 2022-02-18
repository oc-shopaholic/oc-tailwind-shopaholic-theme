import ShopaholicSearch from "@lovata/shopaholic-search";

export default class Search {
  constructor(app) {
    this.$vNav = app;
    this.$vShow = this.$vNav.find("._show");
    this.$vPlaceholder = null;
    this.$vProductTitle = null;
    this.$sInput = null;
    this.$sClear = null;
    this.$vTag = null;
    this.$vRecently = null;
    this.$vRecentlyContainer = null;
    this.$vTagText = null;
    this.$vRecentlyText = null;
    this.$vPreloader = null;
    this.$vResultWrapper = null;
    this.$vNoResult = null;
    this.$vNoResultText = null;
    this.$vRecentlyTemplate = null;
    this.$vTemplate = null;
    this.$vProductContainer = null;
    this.$vShowMore = null;
    this.$vShowMoreHidden = null;
    this.$vHeader = null;
    this.$vClearRecentlyAll = null;
    this.$vSearchIcon = null;
    this.$vCategoryTitle = null;
    this.$vRecentlyList = null;

    this.vPagination = 5;
    this.vPaginationZapas = this.vPagination;
    this.vPaginationContainer = [];
    this.bOpenRecently = false;
    this.aRecentlyTextDefault = [];
    this.sSplitSpaces = null;
  }

  initVariables(){
    this.bOpenRecently = false;
    this.vPagination = 3;
    this.$vPlaceholder = this.$vNav.find("._placeholder");
    this.$sInput = this.$vNav.find("._shopaholic-search-input");
    this.$sClear = this.$vNav.find("._clear");
    this.$vPreloader = this.$vNav.find("._preloader");
    this.$vResultWrapper = this.$vNav.find(".search-result-wrapper");
    this.$vNoResult = this.$vNav.find("._no-result");
    this.$vNoResultText = this.$vNav.find("._no-result-text");
    this.$vRecentlyContainer = this.$vNav.find("._recently-container");
    this.$vRecentlyTemplate = this.$vNav.find("._recently-template");
    this.$vShowMore = this.$vNav.find("._show-more");
    this.$vShowMoreHidden = this.$vNav.find("._show-more-hidden");
    this.$vHeader = this.$vNav.find("._recently-container ._recently-header");
    this.$vClearRecentlyAll = this.$vNav.find("._clear-recently-all");
    this.$vSearchIcon = this.$vNav.find("._search-icon");
    this.$vRecentlyList = this.$vNav.find("._recently-list");
  }

  initOthersVariables(){
    this.$vRecently = this.$vNav.find("._recently");
    this.$vProductTitle = this.$vNav.find("._product-name");
    this.$vCategoryTitle = this.$vNav.find("._category-name");
    this.$vRecentlyText = this.$vNav.find("._recently-text");
  }

  initEvents() {
    this.clearSearchResult();
    this.useHintTipo();
    this.clearRecently();
    this.initSearchResult();
    this.historyResult();
    this.recentlyElem();
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
    this.$sInput.on("input", (ev) => {
      if($(ev.target).val().length > 2){
        this.watchInputActive();
      }else{
        this.watchInputNotActive();
      }
      this.watchInputOther();
    });
  }

  initProductWatch(){
    let app = this;
    var target = $('.search-result-wrapper')[0];

    const config = {
      childList: true,
    };

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && app.$sInput.val()[0] !== ' ') {
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
    let history = JSON.parse(localStorage.searchHistory);
    if(history.length){
      for(let i = 0; i < history.length; i++){
        this.$vTemplate = this.$vRecentlyTemplate[0].content.cloneNode(true);
        let container = this.$vTemplate.querySelectorAll("span");
        container[0].innerText = history[i];
        $(this.$vTemplate).appendTo(this.$vRecentlyList);
      }
      if(history.length > 1){
        this.$vClearRecentlyAll.css('display', 'block');
        this.$vHeader.css('display', 'flex');
      }else{
        this.$vClearRecentlyAll.css('display', 'none');
      }
      this.$vRecentlyContainer.css('display', 'block');
      this.initOthersVariables();
    }
  }

  initPagination(){
    if(this.vPagination !== this.vPaginationZapas){
      this.vPagination = this.vPaginationZapas
    }

    this.$vProductContainer = this.$vNav.find("._product-container li");

    if(this.$vProductContainer.length > this.vPagination){
      let count = this.$vProductContainer.length - this.vPagination
      let finalScore = this.$vProductContainer.length - count
      this.vPaginationContainer = [];

      for(let i = finalScore; i < this.$vProductContainer.length; i++){
        this.vPaginationContainer.push(this.$vProductContainer[i]);
        this.$vProductContainer[i].remove();
      }
    }
  }

  historyResult(){
    if(!localStorage.searchHistory){
      localStorage.searchHistory = JSON.stringify([])
    }
    let history = JSON.parse(localStorage.searchHistory);
    let uniqueness = history.indexOf(this.$sInput.val()) != -1
    let lastSign = this.$sInput.val()[this.$sInput.val().length -1]
    if(history.length >= 5 && !uniqueness){
      history = history.slice(1)
    }
    if(!uniqueness && this.$sInput.val() !== '' && this.$sInput.val()[0] !== ' ' && this.$sInput.val().length > 2 && (this.$vProductTitle.length || this.$vCategoryTitle.length) && lastSign !== ' '){
      history.push(this.$sInput.val());

      let finalHistory = JSON.stringify(history);
      localStorage.searchHistory = finalHistory;
      this.bOpenRecently = true;
      this.$vRecentlyContainer.css('display', 'none');
    }
  }

  highlightMatches(content){
    if(content.length){
      for (let i = 0; i < content.length; i++) {
        let text = content[i].innerText;
        this.workingSpaces(text);
        content[i].innerHTML = text.replace(new RegExp(this.sSplitSpaces, 'gi'), "<b class='font-bold'>$&</b>");
      }
    }
  }

  whitewashPlaceholder(){
    if(this.$vProductTitle.length){
      this.workingSpaces(this.$vProductTitle[0].innerText);
    }
    let enteredText = this.$vProductTitle[0].innerText.substring(this.sSplitSpaces.trim().length, this.$vProductTitle[0].innerText.length);
    let finalText = ('<span class="text-gray-200">' + this.$sInput.val() + '</span>') + enteredText;
    this.$vPlaceholder.html(finalText);
  }

  workingSpaces(content){
    this.sSplitSpaces = this.$sInput.val().replace(/[ ]+/g, '');
    let space = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i] === " ") {
        space.push(i)
      }
    }
    for (let i = 0; i < space.length; i++) {
      if (this.sSplitSpaces.length >= space[i]) {
        this.sSplitSpaces = this.sSplitSpaces.substring(0, space[i]) + ' ' + this.sSplitSpaces.substring(space[i], this.sSplitSpaces.length)
      }
    }
  }

  useHint(){
    this.$sInput.val(this.$vPlaceholder.text()).trigger('input');
    this.$vProductTitle.css('display', 'block');
    this.highlightMatches(this.$vProductTitle);
    this.highlightMatches(this.$vCategoryTitle);
    this.whitewashPlaceholder();
  }

  removalSelection(){
   if(this.aRecentlyTextDefault.length){
    for (let i = 0; i < this.$vRecentlyText.length; i++) {
      this.$vRecently[i].classList.remove('hidden');
      this.$vRecentlyText[i].innerText = this.aRecentlyTextDefault[i].innerText;
    }
   }
  }

  filterRecently(){
    if(this.$sInput.val().length && this.$vRecentlyText){
      for (let i = 0; i < this.$vRecentlyText.length; i++) {
        if(this.aRecentlyTextDefault.length <= this.$vRecentlyText.length) this.aRecentlyTextDefault.push(this.$vRecentlyText[i])
        if(this.$vRecentlyText[i].innerText.toLowerCase().indexOf(this.$sInput.val().toLowerCase()) !== -1) {
          let text = this.$vRecentlyText[i].innerText;
          this.$vRecently[i].classList.remove('hidden');
          this.$vRecentlyText[i].innerHTML = text.replace(new RegExp(this.$sInput.val(), 'gi'), "<b class='font-bold'>$&</b>");
        }else{
          this.$vRecently[i].classList.add('hidden')
        }
      }
    }
  }

  hintsActive(){
    if(this.$vProductTitle.length){
      this.$vPlaceholder.css('display', 'block');
      this.$vPlaceholder.text(this.$vProductTitle[0].innerText);
      this.initPagination();
      this.whitewashPlaceholder();
    }
    this.$vResultWrapper.css('display', 'block');
    this.$vPreloader.css('display', 'none');
    this.$vSearchIcon.css('display', 'block');
    this.$vNoResult.css('display', 'none');
    if(this.$vProductTitle.length && this.$vProductContainer.length > this.vPagination && this.$vProductContainer.length !== this.vPagination) this.$vShowMore.css('display', 'block');
    if (!this.bOpenRecently) this.$vRecentlyContainer.css('display', 'block');
    this.$vRecentlyContainer.css('display', 'block');
    this.$vClearRecentlyAll.css('display', 'none');
    this.filterRecently();
  }

  hintsNotActive(){
    this.$vPlaceholder.text('');
    this.$vPlaceholder.css('display', 'block');
    this.$vNoResult.css('display', 'none');
  }

  hintsOther(){
    this.$vShowMore.css('display', 'none');
    this.$vPlaceholder.css('display', 'none');
    this.$vPreloader.css('display', 'none');
    this.$vSearchIcon.css('display', 'block');
    if(!this.$vCategoryTitle.length && this.$sInput.val().length > 2){
      this.$vNoResult.css('display', 'flex');
      this.$vRecentlyContainer.css('display', 'none');
    }else{
      this.$vRecentlyContainer.css('display', 'block');
    }
    this.$vNoResultText.html(' &nbsp"' + this.$sInput.val() + '". &nbsp');
  }

  hints(){
    if ((this.$vProductTitle.length || this.$vCategoryTitle.length) && this.$sInput.val().length) {
      this.hintsActive();
    } else if(!this.$sInput.val().length){
      this.hintsNotActive();
    }else {
      this.hintsOther();
    }
    this.highlightMatches(this.$vProductTitle);
    this.highlightMatches(this.$vCategoryTitle);
  }

  showMore(){
    let count = this.vPagination;
    this.$vShowMore.on("click", () => {
      let container = this.$vNav.find("._product-container");
      if (this.$vProductContainer.length > this.vPagination && this.$vProductContainer.length !== this.vPagination) {
        this.$vShowMoreHidden.css('display', 'block')
        this.$vShowMore.css('display', 'none');
        setTimeout(() => {
          for (let i = 0; i < this.vPagination; i++) {
            $(this.vPaginationContainer[i]).appendTo(container);
          }
          this.vPagination += 5;
          if (count !== this.vPagination) {
            this.$vShowMoreHidden.css('display', 'none')
            this.$vShowMore.css('display', 'block');
            if(this.$vProductContainer.length <= this.vPagination) this.$vShowMore.css('display', 'none');
          }
        }, 400)
      }
    })
  }

  clearSearchResult(){
    this.$vNav.on('click', '._clear', () => {
      const searchResultWrapper = $(this.$vNav.find(".search-result-wrapper"));
      const childrenNode = searchResultWrapper.children();
      let history = JSON.parse(localStorage.searchHistory);
      this.$sClear.css('display', 'none');
      this.$vShowMore.css('display', 'none');
      this.clearingHints();
      if(this.$vRecently.length && history.length){
        this.$vRecentlyContainer.css('display', 'block');
        this.$vHeader.css('display', 'flex');
      }
      $(this.$sInput.val(''));
      childrenNode.remove();
    })
  }

  useHintTipo(){
    let app = this
    $('._shopaholic-search-input').keydown(function(e) {
      if(e.keyCode === 39 && app.$vProductTitle && app.$vProductTitle.length > 0 ) {
        app.useHint();
      }
    });
  }

  clearRecently(){
    this.$vClearRecentlyAll.on('click', () => {
      localStorage.searchHistory = JSON.stringify([]);
      this.$vRecently.remove();
      this.$vHeader.css('display', 'none');
      this.$vClearRecentlyAll.css('display', 'none');
    })
  }

  watchInputActive(){
    this.$sClear.css('display', 'block');
    this.$vPlaceholder.css('display', 'none');
    this.$vPreloader.css('display', 'flex');
    this.$vSearchIcon.css('display', 'none');
    this.$vShowMore.css('display', 'none');
    this.$vHeader.css('display', 'none');
    this.$vClearRecentlyAll.css('display', 'none');
  }

  watchInputNotActive(){
    let history = JSON.parse(localStorage.searchHistory);
    let rerunRecently = this.$vNav.find("._recently");
    this.$sClear.css('display', 'none');
    this.$vPreloader.css('display', 'none');
    this.$vSearchIcon.css('display', 'block');
    this.$vPlaceholder.text('');
    this.$vResultWrapper.css('display', 'none');
    if(this.$sInput.val().length){
      this.$sClear.css('display', 'block');
    }
    if(this.$vRecently && this.$vRecently.length && this.$sInput.val().length < 1 && history.length){
      this.$vRecentlyContainer.css('display', 'block');
      this.$vHeader.css('display', 'flex');
    }
    if(this.$sInput.val().length < 1 && history.length){
      this.clearingHints();
    }
    if(rerunRecently.length > 1){
      this.$vClearRecentlyAll.css('display', 'block');
    }
    if(this.$sInput.val().length){
      this.$vHeader.css('display', 'none');
      this.$vClearRecentlyAll.css('display', 'none');
    }

    this.removalSelection();
  }

  watchInputOther(){
    this.$vNoResult.css('display', 'none');
    this.$vShowMore.css('display', 'none');
    this.filterRecently();
  }

  show() {
    this.$vShow.on("click", () => {
      this.initVariables();
      this.initSearch();
      this.initEvents();
      this.initProductWatch();
      this.initWatchInput();
    })
  }

  recentlyElem(){
    $('._recently').each(function(e) {
      let $vRecentlyContainer = $(this);
      let $vClear = $vRecentlyContainer.find('._clear-recently');
      let $vText = $vRecentlyContainer.find('._recently-text');

      let vHeader = $("._recently-container ._recently-header");
      let vInput = $("._shopaholic-search-input");
      let vClearAll = $("._clear-recently-all");

      $vClear.on("click", () => {
        let history = JSON.parse(localStorage.searchHistory);
        history = history.filter((item) => {
          return item !== $vText.text()
        })
        if(!history.length){
          vHeader.css('display', 'none');
        }else if(history.length <= 1){
          vClearAll.css('display', 'none');
        }
        let finalHistory = JSON.stringify(history);
        localStorage.searchHistory = finalHistory;
        $vRecentlyContainer.remove();
      })

      $vRecentlyContainer.on("click", () => {
        vInput.val($vText.text()).trigger('input');
      })

      $vRecentlyContainer.on('keypress', function (e) {
        if (e.which === 13 && e.target.classList[0] === '_recently') {
          $vRecentlyContainer.trigger('click');
        } else if (e.which === 13 && e.target.classList[0] === '_clear-recently') {
          $vClear.trigger('click');
        }
      });
    });
  }

  clearingHints(){
    this.bOpenRecently = false;
    this.removalSelection();
    this.aRecentlyTextDefault = [];
    this.$vRecently.remove();
    this.initSearchResult();
    this.recentlyElem();
  }

  static make(container) {
    $(container).each(function(e) {
      const containerNav = new Search($(this));
      containerNav.show();
    });
  }
}
Search.make('._off-canvas');
