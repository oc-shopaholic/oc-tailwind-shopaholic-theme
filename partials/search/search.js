import ShopaholicSearch from "@lovata/shopaholic-search";

export default class Search {
  constructor(app) {
    this.$vNav = app;
    this.$vShow = this.$vNav.find("._show");
  }

  initEvents() {
    let app = this;
    this.$vNav.on('click', '._clear', function () {
      const searchResultWrapper = $(app.$vNav.find(".search-result-wrapper"));
      const childrenNode = searchResultWrapper.children();
      $(app.$vNav.find("._shopaholic-search-input")).val('');
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

  show() {
    this.$vShow.on("click", () => {
      this.initSearch()
      this.initEvents()
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
