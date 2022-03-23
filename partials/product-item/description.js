export default new class Description {
  constructor() {
    $("#description-show").click((event) => {
      event.preventDefault()
      $("#description-prew").addClass("hidden");
      $("#description-show").addClass("hidden");
      $("#description-full").removeClass("hidden");
      $("#description-hide").removeClass("hidden");
    });
    $("#description-hide").click((event) => {
      event.preventDefault()
      $("#description-prew").removeClass("hidden");
      $("#description-show").removeClass("hidden");
      $("#description-full").addClass("hidden");
      $("#description-hide").addClass("hidden");
    });
  }
}();
