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
    this.$vRecentlyTemplate = null;
    this.$vTemplate = null;
    this.$vProductContainer = null;
    this.$vShowMore = null;
    this.$vShowMoreHidden = null;

    this.vPagination = 5;
    this.vPaginationZapas = this.vPagination;
    this.vPaginationContainer = [];
    this.bOpenRecently = false;
  }

  initVariables(){
    this.bOpenRecently = false;
    this.$vPlaceholder = this.$vNav.find("._placeholder");
    this.$sInput = this.$vNav.find("._shopaholic-search-input");
    this.$sClear = this.$vNav.find("._clear");
    this.$vPreloader = this.$vNav.find("._preloader");
    this.$vResultWrapper = this.$vNav.find(".search-result-wrapper");
    this.$vNoResult = this.$vNav.find("._no-result");
    this.$vRecentlyContainer = this.$vNav.find("._recently-container");
    this.$vRecentlyTemplate = this.$vNav.find("._recently-template");
    this.$vShowMore = this.$vNav.find("._show-more");
    this.$vShowMoreHidden = this.$vNav.find("._show-more-hidden");
  }

  initOthersVariables(){
    this.$vRecently = this.$vNav.find("._recently");
    this.$vProductTitle = this.$vNav.find("._product-name");
    this.$vRecentlyText = this.$vNav.find("._recently-text");
  }

  initEvents() {
    let app = this;
    this.$vNav.on('click', '._clear', function () {
      const searchResultWrapper = $(app.$vNav.find(".search-result-wrapper"));
      const childrenNode = searchResultWrapper.children();
      app.$sClear.css('display', 'none');
      app.$vShowMore.css('display', 'none');
      $(app.$sInput.val(''));
      childrenNode.remove();
    })
    $(document).ready(function() {
      $('._shopaholic-search-input').keydown(function(e) {
        if(e.keyCode === 39 && app.$vProductTitle && app.$vProductTitle.length > 0 ) {
          app.useHint();
        }
      });
    });
    this.initSearchResult();
    this.historyResult();
    this.recentlyElem();
    this.showMore();
  }

  initSearch() {
    const obHelper = new ShopaholicSearch();
    obHelper.setSearchLimit(1).setAjaxRequestCallback(function (obRequestData) {
      obRequestData.update = { 'search-input/search-result': '.search-result-wrapper' };

      return obRequestData;
    }).init();
  }

  initButtonClear(){
    this.$sInput.on("input", (ev) => {
      if($(ev.target).val()){
        this.$sClear.css('display', 'block');
        this.$vPlaceholder.css('display', 'none');
        this.$vPreloader.css('display', 'flex');
        this.$vShowMore.css('display', 'none');
        this.$vResultWrapper.css('display', 'none');
        this.$vRecentlyContainer.css('display', 'none');
      }else{
        this.$sClear.css('display', 'none');
        this.$vPreloader.css('display', 'none');
        this.$vPlaceholder.text('');
      }
      this.$vNoResult.css('display', 'none');
      this.$vShowMore.css('display', 'none');
      this.$vResultWrapper.css('display', 'none');
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
        let container = this.$vTemplate.querySelectorAll("input");
        container[0].value = history[i];
        $(this.$vTemplate).appendTo(this.$vRecentlyContainer);
      }
      this.$vRecentlyContainer.css('display', 'block')
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
    if(history.length >= 5){
      history = history.slice(1)
    }
    let uniqueness = history.indexOf(this.$sInput.val()) != -1
    if(!uniqueness && this.$sInput.val() !== '' && this.$sInput.val()[0] !== ' ' && this.$sInput.val().length > 2){
      history.push(this.$sInput.val());
   
      let finalHistory = JSON.stringify(history);
      localStorage.searchHistory = finalHistory;
      this.bOpenRecently = true;
      this.$vRecentlyContainer.css('display', 'none');
    }
  }

  highlightMatches(){
    if(this.$vProductTitle.length){
      for (let i = 0; i < this.$vProductTitle.length; i++) {
        let text = this.$vProductTitle[i].innerText;
        this.$vProductTitle[i].innerHTML = text.replace(new RegExp(this.$sInput.val(), 'gi'), "<span class='font-bold'>$&</span>");
      }
    }
  }

  whitewashPlaceholder(){
    let enteredText = this.$vProductTitle[0].innerText.substring(this.$sInput.val().length, this.$vProductTitle[0].innerText.length);
    let finalText = ('<span class="text-gray-200">' + this.$sInput.val() + '</span>') + enteredText;
    this.$vPlaceholder.html(finalText);
  }

  useHint(){
    this.$sInput.val(this.$vPlaceholder.text());
    this.$vProductTitle.css('display', 'block');
    this.highlightMatches();
    this.whitewashPlaceholder();
  }

  hintsActive(){
    this.$vPlaceholder.css('display', 'block');
    this.$vPlaceholder.text(this.$vProductTitle[0].innerText);
    this.$vResultWrapper.css('display', 'block');
    this.$vPreloader.css('display', 'none');
    this.$vNoResult.css('display', 'none');
    this.initPagination();
    if(this.$vProductContainer.length !== this.vPagination) this.$vShowMore.css('display', 'block');
    if (!this.bOpenRecently) this.$vRecentlyContainer.css('display', 'block');
    this.whitewashPlaceholder();
  }

  hintsActiveNotActive(){
    this.$vPlaceholder.text('');
    this.$vPlaceholder.css('display', 'block');
    this.$vResultWrapper.css('display', 'none');
    this.$vNoResult.css('display', 'none');
  }

  hintsOther(){
    this.$vShowMore.css('display', 'none');
    this.$vPlaceholder.css('display', 'none');
    this.$vPreloader.css('display', 'none');
    this.$vNoResult.css('display', 'flex');
    this.$vRecentlyContainer.css('display', 'none');
  }

  hints(){
    if (this.$vProductTitle.length && this.$sInput.val().length) {
      this.hintsActive();
    } else if(!this.$sInput.val().length){
      this.hintsActiveNotActive();
    }else {
      this.hintsOther();
    }
    this.highlightMatches();
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
            if(this.$vProductContainer.length === this.vPagination) this.$vShowMore.css('display', 'none');
          }
        }, 400)
      }
    })
  }

  show() {
    this.$vShow.on("click", () => {
      this.initVariables();
      this.initSearch();
      this.initEvents();
      this.initProductWatch();
      this.initButtonClear();
    })
  }

  recentlyElem(){
    $('._recently').each(function(e) {
      let $vRecentlyContainer = $(this);
      let $vClear = $vRecentlyContainer.find('._clear-recently');
      let $vText = $vRecentlyContainer.find('._recently-text');
      
      let vHeader = $("._recently-container h1");
      $vClear.on("click", () => {
        let history = JSON.parse(localStorage.searchHistory);
        history = history.filter((item) => {
          return item !== $vText.val()
        })
        if(!history.length){
          vHeader.css('display', 'none');
        }
        let finalHistory = JSON.stringify(history);
        localStorage.searchHistory = finalHistory;
        $vRecentlyContainer.remove();
      })
    });
  }

  static make(container) {
    $(container).each(function(e) {
      const containerNav = new Search($(this));
      containerNav.show();
    });
  }
}
Search.make('._off-canvas');
