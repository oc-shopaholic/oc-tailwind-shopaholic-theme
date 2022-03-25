export default new class ProductDescription {
  constructor() {
    let hide = false,
      description = $("#description"),
      button = $("#description-toggle"),
      span = button.children("span"),
      svg = button.children("svg")
    ;

    button.click((event) => {
      event.preventDefault();
      if (hide) {
        description
          .animate({
            "max-height": "7.5rem",
          }, 700, () => {
            description
              .css("-webkit-line-clamp", "3")
              .css("display", "-webkit-box");
            span.html("Read full description");
            svg.attr("style", "")
          });
      } else {
        description
          .css("-webkit-line-clamp", "none")
          .animate({
            "max-height": "100rem",
          }, 700, () => {
            description.css("display", "block");
            span.html("Hide full description");
            svg
              .css("--tw-rotate", "180deg")
              .css("-moz-transform", "rotate180deg")
              .css("transform", "rotate(180deg)");
          });
      }
      hide = !hide;
    });
  }
}();
