export default new class CustomerReviewsAndRatings {
  constructor() {
    let hide = true;
    $("#sort-reviews li").click(() => {
      if (hide) {
        $("#sort-reviews li").removeClass("hidden");
      }
      hide = !hide;
    });
    $("#sort-reviews-desc button").click(() => {
      $("#sort-reviews-asc").addClass("hidden");
    });
    $("#sort-reviews-asc button").click(() => {
      $("#sort-reviews-desc").addClass("hidden");
    });
  }
}();
