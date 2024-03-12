import ShopaholicAddWishList from '@oc-shopaholic/shopaholic-wish-list/shopaholic-add-wish-list';
import ShopaholicRemoveWishList from '@oc-shopaholic/shopaholic-wish-list/shopaholic-remove-wish-list';

export default new class ButtonWishList {
  constructor() {
    this.addButtonClass = 'text-white';
    this.addSvgClass = 'group-hover:fill-current';
    this.removeButtonClass = 'text-red-500';
    this.removeSvgClass = 'fill-current';
    this.buttonNode = null;

    this.typeAdd = 'add';
    this.typeRemove = 'remove';

    this.obAddHelper = new ShopaholicAddWishList();
    this.obRemoveHelper = new ShopaholicRemoveWishList();

    this.initAddHandler();
    this.initRemoveHandler();
  }

  /**
   * @description Init add handler.
   */
  initAddHandler() {
    const obThis = this;
    this.obAddHelper.setAjaxRequestCallback((obRequestData, buttonNode) => {
      obThis.buttonNode = buttonNode;
      obThis.buttonNode.setAttribute('disabled', 'disabled');
      this.changeButtonView(obThis.buttonNode, obThis.typeRemove);
      obRequestData.complete = () => {
        obThis.buttonNode.classList.remove(obThis.obAddHelper.defaultButtonClass);
        obThis.buttonNode.classList.add(obThis.obRemoveHelper.defaultButtonClass);

        obThis.buttonNode.removeAttribute('disabled');

        oc.flashMsg({
          message: obThis.buttonNode.dataset.addSuccess,
          type: 'success'
        });
      };

      return obRequestData;
    }).init();
  }

  /**
   * @description Init remove handler.
   */
  initRemoveHandler() {
    const obThis = this;
    this.obRemoveHelper.setAjaxRequestCallback((obRequestData, buttonNode) => {
      obThis.buttonNode = buttonNode;
      obThis.buttonNode.setAttribute('disabled', 'disabled');
      this.changeButtonView(obThis.buttonNode, obThis.typeAdd);
      obRequestData.complete = () => {
        obThis.buttonNode.classList.remove(obThis.obRemoveHelper.defaultButtonClass);
        obThis.buttonNode.classList.add(obThis.obAddHelper.defaultButtonClass);

        obThis.buttonNode.removeAttribute('disabled');

        oc.flashMsg({
          message: obThis.buttonNode.dataset.removeSuccess,
          type: 'success'
        });
      };

      return obRequestData;
    }).init();
  }
  /* eslint-enable */

  /**
   * @description Change button view..
   * @param {object} buttonNode
   * @param {string} sType
   */
  changeButtonView(buttonNode, sType) {
    const svgNode = buttonNode.querySelector('svg');

    if (sType === this.typeAdd) {
      if (svgNode.classList.contains('_cart-list-checkout')) {
        this.addButtonClass = 'text-gray-600';
      }else{
        svgNode.classList.add(this.addSvgClass);
      }
      svgNode.classList.remove(this.removeSvgClass);
      buttonNode.classList.remove(this.removeButtonClass);
      buttonNode.classList.add(this.addButtonClass);
    } else {
      if(svgNode.classList.contains('_cart-list-checkout')){
        this.addButtonClass = 'text-gray-600';
      }else{
        svgNode.classList.remove(this.addSvgClass);
      }
      svgNode.classList.add(this.removeSvgClass);
      buttonNode.classList.remove(this.addButtonClass);
      buttonNode.classList.add(this.removeButtonClass);
    }
  }
}();