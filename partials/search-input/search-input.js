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
    this.$vTagText = null;
    this.$vRecentlyText = null;
  }

  initVariables(){
    this.$vPlaceholder = this.$vNav.find("._placeholder");
    this.$sInput = this.$vNav.find("._shopaholic-search-input");
    this.$sClear = this.$vNav.find("._clear");
  }

  initOthersVariables(){
    this.$vRecently = this.$vNav.find("._recently");
    this.$vTag = this.$vNav.find("._tag");
    this.$vProductTitle = this.$vNav.find("._product-name");
    this.$vTagText = this.$vNav.find("._tag-text");
    this.$vRecentlyText = this.$vNav.find("._recently-text");
  }

  initEvents() {
    let app = this;
    this.$vNav.on('click', '._clear', function () {
      const searchResultWrapper = $(app.$vNav.find(".search-result-wrapper"));
      const childrenNode = searchResultWrapper.children();
      app.hiddenTags();
      app.$sClear.css('display', 'none');
      $(app.$sInput.val(''));
      childrenNode.remove();
    })
    $(document).ready(function() {
      $('._shopaholic-search-input').keydown(function(e) {
        if(e.keyCode === 13 && app.$vProductTitle && app.$vProductTitle.length > 0 ) {
          app.useHint();
        }
      });
    });
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
      }else{
        this.$sClear.css('display', 'none');
      }
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
        if (mutation.type === 'childList') {
          app.initOthersVariables();
          app.hints();
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(target, config);
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
    this.$vTagText.text(this.$sInput.val());
    this.$vRecentlyText.val(this.$sInput.val());
    this.$vProductTitle.css('display', 'block');
    this.$vRecently.css('display', 'flex');
    this.highlightMatches();
    this.whitewashPlaceholder();
  }

  changeTags(){
    if(this.$sInput.val()){
      this.$vTagText.text(this.$sInput.val());
      this.$vRecentlyText.val(this.$sInput.val());
      this.$vTag.css('display', 'block');
      this.$vRecently.css('display', 'flex');
    }
  }

  hiddenTags() {
    this.$vRecently.css('display', 'none');
    this.$vTag.css('display', 'none');
  }

  hints(){
    if (this.$vProductTitle.length) {
      this.$vPlaceholder.css('display', 'block');
      this.$vPlaceholder.text(this.$vProductTitle[0].innerText);
      this.changeTags();
      this.whitewashPlaceholder();
    } else if(this.$sInput.val() === ''){
      this.$vPlaceholder.text('Search');
      this.$vPlaceholder.css('display', 'block');
      this.hiddenTags();
    }else {
      this.$vPlaceholder.css('display', 'none');
      this.hiddenTags();
    }
    this.highlightMatches();
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

  static make(container) {
    $(container).each(function(e) {
      const containerNav = new Search($(this));
      containerNav.show();
    });
  }
}
Search.make('._off-canvas');
