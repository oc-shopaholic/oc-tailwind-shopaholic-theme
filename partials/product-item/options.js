export default new class Options {
  constructor() {
    let val = 1;
    $("#counter").html(val);
    $("#plus-btn").click((event) => {
      event.preventDefault();
      $("#counter").html(++val);
    });
    $("#minus-btn").click((event) => {
      event.preventDefault();
      $("#counter").html(--val);
    });
  }
}();
