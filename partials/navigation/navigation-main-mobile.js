import {OffCanvasContainer} from '/partials/common/off-canvas/off-canvas.js';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const eventNode = event.target;
    const buttonNode = eventNode.closest('.js-show-region');
    if (!buttonNode) {
      return;
    }

    OffCanvasContainer.instance().close('mobile_menu');
    OffCanvasContainer.instance().open('site_picker');
  });
});
