import ShopaholicSearch from "@lovata/shopaholic-search";

export default new class Search {
  constructor() {
    this.initialization();
  }

  initialization() {
    $("._container-nav").each(function () {
      let $vNav = $(this);
      let $vShow = $vNav.find("._show");

      function initEvents() {
        $vNav.on('click', '._clear', function () {
          const searchResultWrapper = $($vNav.find(".search-result-wrapper"));
          const childrenNode = searchResultWrapper.children();
          $($vNav.find("._shopaholic-search-input")).val('');
          childrenNode.remove();
        })
      }

      function initSearch() {
        const obHelper = new ShopaholicSearch();
        obHelper.setAjaxRequestCallback(function (obRequestData) {
          obRequestData.update = { 'search/search-result': '.search-result-wrapper' };

          return obRequestData;
        }).init();
      }

      $vShow.on("click", () => {
        initSearch()
        initEvents()
      })
    });
  }
}
