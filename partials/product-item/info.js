export default new class Info {
  constructor() {
    $(".tab-nav button").click((event) => {
      $(".tab-nav button")
        .removeClass("border-b-4")
        .removeClass("border-blue-800");

      $(event.target)
        .addClass("border-b-4")
        .addClass("border-blue-800");

      const tabId = "tab-" + $(event.target).data("tab");
      $('.tab').addClass("hidden");
      $(`#${tabId}`).removeClass("hidden");
    });
  }
}();
