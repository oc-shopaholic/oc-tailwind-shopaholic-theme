import UrlGeneration from "@oc-shopaholic/url-generation";

export default class Select {
  constructor () {}

  initSummaryEvents () {
    this.initShowClearButton();
    this.clearOptions();
  }

  clearOptions () {
    document.addEventListener("click", (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest(".js-clear-options");
      if (!buttonNode) {
        return;
      }
      this.clearValueOptions(buttonNode);
      buttonNode.classList.add("hidden");
    });
  }

  initShowClearButton () {
    document.addEventListener("change", (event) => {
      const eventNode = event.target;
      const selectNode = eventNode.closest(".js-clear-select");
      if (!selectNode) {
        return;
      }
      const clearButton = selectNode.parentNode.querySelector(".js-clear-options");
      if (!clearButton) {
        return;
      }

      if (selectNode.value) {
        clearButton.classList.remove("hidden");
      } else {
        clearButton.classList.add("hidden");
      }
    });
  }

  clearValueOptions (buttonNode) {
    const select = buttonNode.parentNode.querySelector("select");
    select.value = "";
    select.dispatchEvent(
      new InputEvent("change", {
          bubbles: true,
          cancelable: true
        }
      ));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const select = new Select();
  select.initSummaryEvents();
});
