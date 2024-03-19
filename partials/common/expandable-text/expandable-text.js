export default class ExpandableText {
  constructor () {
    this.duration = 500;
  }

  initSummaryEvents () {
    const buttons = document.querySelectorAll(".js-expandable-button");
    if (!buttons) {
      return;
    }
    this.initButtonVisible(buttons);
  }

  initButtonVisible (buttons) {
    buttons.forEach(button => {
      const text = button.parentNode.querySelector(".js-expandable-text");
      const heightText = text.clientHeight;
      text.style.maxHeight = heightText + "px";
      text.dataset.minHeight = heightText;
      if (text.scrollHeight > heightText) {
        text.classList.add("hide");
        button.classList.add("hide");
        button.classList.remove("hidden");
      }
      this.initEventsButtons(button, text);
    });
  }
  initEventsButtons (button, text) {
    button.addEventListener("click", () => {
      const rows = button.dataset.rows;
      if (text.classList.contains("hide")) {
        this.showText(button, text, rows);
      } else {
        this.hideText(button, text, rows);
      }
    });
  }
  showText (button, text, rows) {
    text.classList.remove(`line-clamp-${rows}`, "hide");
    button.classList.remove("hide");
    text.style.maxHeight = text.scrollHeight + "px";
    this.setTextButton(button);
  }

  hideText (button, text, rows) {
    text.classList.add("hide");
    button.classList.add("hide");
    text.style.maxHeight = text.dataset.minHeight + "px";
    this.setTextButton(button, true);
    setTimeout(() => {
      text.classList.add(`line-clamp-${rows}`);
    }, this.duration);
  }

  setTextButton (button, show = false) {
    button.querySelector(".js-expandable-button-text").innerText = show ? stateButton.show : stateButton.hide;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const expandableText = new ExpandableText();
  expandableText.initSummaryEvents();
});

