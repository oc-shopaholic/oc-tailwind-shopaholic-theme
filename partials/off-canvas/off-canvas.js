import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export class OffCanvasContainer {
  constructor() {
    this.dialogList = {};
  }

  init() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const openNode = eventNode.closest(`._offCanvasOpen`);
      const dialogID = openNode ? openNode.getAttribute('data-for') : null;
      if (!dialogID) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      this.open(dialogID);
    })
  }

  open(dialogID) {
    if (!dialogID) {
      return;
    }

    const offCanvas = this.dialogList[dialogID] ?? new OffCanvas(dialogID);
    offCanvas.open();

    this.dialogList[dialogID] = offCanvas;
  }

  close(dialogID) {
    if (!dialogID || !this.dialogList[dialogID]) {
      return;
    }

    /** @type OffCanvas */
    const offCanvas = this.dialogList[dialogID];
    offCanvas.close();

    this.dialogList[dialogID] = null;
  }

  find(dialogID) {
    return  this.dialogList[dialogID] ?? null;
  }

  /**
   * @return {OffCanvasContainer}
   */
  static instance() {
    if (window.canvasContainer === undefined) {
      window.canvasContainer = new OffCanvasContainer();
    }

    return window.canvasContainer;
  }
}

class OffCanvas {
  constructor(dialogID) {
    this.id = dialogID;
    this.templateNode = document.querySelector(`#${dialogID}_template`);
    console.log(this.templateNode);
    this.parentNode = this.templateNode ? this.templateNode.parentElement : null;

    this.dialogTemplate = null;
    this.dialogNode = null;
    this.dialogContentNode = null;

    this.obFocusTrap = null;
    this.obBackdropNode = null;
  }

  open() {
    if (!this.templateNode) {
      return;
    }

    this.initOffCanvas();
    this.initScrollWidth();
    this.initAnimationOpen();
    this.initEvents();
  }

  initOffCanvas() {
    this.dialogTemplate = this.templateNode.content.cloneNode(true);
    this.parentNode.appendChild(this.dialogTemplate);
    this.dialogNode = this.parentNode.querySelector('._offCanvasContainer');
    dialogPolyfill.registerDialog(this.dialogNode);

    setTimeout(() => {
      this.dialogNode.showModal();

      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = this.sScrollWidth + 'px';
    }, 10);

    this.dialogContentNode = this.dialogNode.querySelector('._offCanvasContent');
  }

  initFocus() {
    this.obFocusTrap = focusTrap.createFocusTrap(this.dialogNode);
    this.obFocusTrap.activate();
  }

  initScrollWidth() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.appendChild(div)

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    this.sScrollWidth = scrollWidth;
  }

  initBackdrop() {
    this.obBackdropNode = this.parentNode.querySelector('.backdrop');
    if (!this.obBackdropNode) {
      return;
    }

    this.obBackdropNode.classList.add('fixed top-0 right-0 bg-gray-400')
    this.obBackdropNode.style.left = '0';
    this.obBackdropNode.style.bottom = '0';
    this.obBackdropNode.style.opacity = '0.6';
    this.obBackdropNode.style.minHeight = '100vh';
    this.obBackdropNode.style.top = '0';
    this.obBackdropNode.style.right = '0';
    this.obBackdropNode.style.left = '0';
    this.obBackdropNode.style.bottom = '0';
    this.obBackdropNode.style.position = 'fixed';
  }

  initEvents() {
    const dialogID = this.id;
    const offCanvas = this;

    this.eventKeyDown = (event) => {
      if (event.keyCode === 27) {
        OffCanvasContainer.instance().close(dialogID);
      }
    };
    this.eventMouseUp = (event) => {
      if (!offCanvas.dialogContentNode.contains(event.target)) {
        OffCanvasContainer.instance().close(dialogID);
      }
    };
    this.eventClick = (event) => {
      const hideButton = event.target.closest('button');
      if (hideButton && hideButton.classList.contains('_hide')) {
        OffCanvasContainer.instance().close(dialogID);
      }
    };

    document.addEventListener('keydown', this.eventKeyDown);
    document.addEventListener('mouseup', this.eventMouseUp);
    this.dialogContentNode.addEventListener('click', this.eventClick);
  }

  initAnimationOpen() {
    if (this.dialogContentNode.dataset.position === 'bottom') {
      this.dialogContentNode.style.top = '100%';
      this.dialogContentNode.style.width = '100%';
    } else {
      this.dialogContentNode.setAttribute('style', this.dialogContentNode.dataset.position + ':-100%');
    }

    this.dialogContentNode.style.display = 'block';

    this.initBackdrop();
    this.animationOpen();
  }

  initAnimationClose() {
    if (this.dialogContentNode.dataset.position === 'bottom') {
      this.dialogContentNode.classList.add('block w-full h-full');
      this.dialogContentNode.style.top = '150%';
    } else {
      this.dialogContentNode.setAttribute('style', this.dialogContentNode.dataset.position + ':-100%')
      this.dialogContentNode.style.display = 'block';
    }
  }

  animationOpen() {
    setTimeout(() => {
      if (this.dialogContentNode.dataset.position === 'bottom') {
        this.dialogContentNode.style.top = '50%';
      } else {
        this.dialogContentNode.setAttribute('style', this.dialogContentNode.dataset.position + ':0px');
        this.dialogContentNode.style.display = 'block';
      }

      this.initFocus()
    }, 100);
  }

  animationClose() {
    setTimeout(() => {
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0px';

      this.obFocusTrap.deactivate();
      this.dialogNode.remove();
    }, 400);
  }

  clearEvents() {
    document.removeEventListener('keydown', this.eventKeyDown);
    document.removeEventListener('mouseup', this.eventMouseUp);
    this.dialogContentNode.removeEventListener('click', this.eventClick);
  }

  close() {
    this.clearEvents();
    this.initAnimationClose();
    this.animationClose();
  }
}

oc.pageReady().then(() => {
  OffCanvasContainer.instance().init();
});
