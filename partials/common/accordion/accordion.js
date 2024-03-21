export default class Accordion {
  constructor (detailNode) {
    this.detailNode = detailNode;
    this.summary = detailNode.querySelector(".js-accordion-summary");
    this.content = detailNode.querySelector(".js-accordion-content");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
  }

  init () {
    if (!this.summary) {
      return;
    }
    const obThis = this;
    this.summary.addEventListener("click", (event) => {
      obThis.onClick(event);
    });
  }

  onClick (event) {
    event.preventDefault();

    this.detailNode.style.overflow = "hidden";
    if (this.isClosing || !this.detailNode.open) {
      this.open();
    } else if (this.isExpanding || this.detailNode.open) {
      this.shrink();
    }
  }

  shrink () {
    this.isClosing = true;
    const startHeight = `${this.detailNode.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.detailNode.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: "linear"
    });

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open () {
    this.detailNode.style.height = `${this.detailNode.offsetHeight}px`;
    this.detailNode.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand () {
    this.isExpanding = true;
    const startHeight = `${this.detailNode.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.detailNode.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: "linear"
    });

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish (open) {
    this.detailNode.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.detailNode.style.height = this.detailNode.style.overflow = "";
  }

  static make () {
    const detailNodeList = document.querySelectorAll(".js-details");
    if (!detailNodeList || detailNodeList.length === 0) {
      return;
    }
    detailNodeList.forEach((detailNode) => {
      const accordion = new Accordion(detailNode);
      accordion.init();
    });
  }
}
