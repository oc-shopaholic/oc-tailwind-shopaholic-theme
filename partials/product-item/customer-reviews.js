export default new class Description {
  constructor() {
    $("#show-more-reviews").click(() => {
      $event.preventDefault()
    });
    $("#show-less-reviews").click(() => {
      $event.preventDefault()
    });
  }
}();
