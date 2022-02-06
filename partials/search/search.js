import ShopaholicSearch from "@lovata/shopaholic-search";

export default class Search {
  constructor(app) {
    this.$vNav = app;
    this.$vShow = this.$vNav.find("._show");
    this.$sInput = null;
    this.$sClear = null;
  }

  initEvents() {
    let app = this;
    this.$sInput = this.$vNav.find("._shopaholic-search-input");
    this.$sClear = this.$vNav.find("._clear");
    this.$vNav.on('click', '._clear', function () {
      const searchResultWrapper = $(app.$vNav.find(".search-result-wrapper"));
      const childrenNode = searchResultWrapper.children();
      $(app.$sInput.val(''));
      app.$sClear.css('display', 'none')
      childrenNode.remove();
    })
  }

  initSearch() {
    const obHelper = new ShopaholicSearch();
    obHelper.setAjaxRequestCallback(function (obRequestData) {
      obRequestData.update = { 'search/search-result': '.search-result-wrapper' };
      return obRequestData;
    }).init();
  }

  initButtonClear(){
    this.$sInput.on("input", (ev) => {
      if($(ev.target).val()){
        this.$sClear.css('display', 'block')
      }else{
        this.$sClear.css('display', 'none')
      }
    });
  }

  show() {
    this.$vShow.on("click", () => {
      this.initSearch();
      this.initEvents();
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
Search.make('._off-canvas')
