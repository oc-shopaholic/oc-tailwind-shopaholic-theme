import ShopaholicAddWishList from '@lovata/shopaholic-wish-list/shopaholic-add-wish-list';
import ShopaholicRemoveWishList from '@lovata/shopaholic-wish-list/shopaholic-remove-wish-list';

export default new class WishList {
  constructor() {
    this.sAddButtonClass = 'text-white';
    this.sAddSvgClass = 'group-hover:fill-current';
    this.sRemoveButtonClass = 'text-red-500';
    this.sRemoveSvgClass = 'fill-current';
    this.obButton = null;

    this.sTypeAdd = 'add';
    this.sTypeRemove = 'remove';

    this.obAddHelper = new ShopaholicAddWishList();
    this.obRemoveHelper = new ShopaholicRemoveWishList();

    this.initAddHandler();
    this.initRemoveHandler();
  }

  /* eslint-disable no-param-reassign */
  /**
   * @description Init add handler.
   */
  initAddHandler() {
    this.obAddHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      this.obButton = $(obButton);
      this.obButton.attr('disabled', 'disabled');
      const self = this;
      obRequestData.complete = () => {
        const obButton = self.obButton;
        const sType = self.sTypeRemove;
        this.changeButtonView(obButton, sType);
      };

      return obRequestData;
    }).init();
  }

  /**
   * @description Init remove handler.
   */
  initRemoveHandler() {
    this.obRemoveHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      this.obButton = $(obButton);
      this.obButton.attr('disabled', 'disabled');
      const self = this;
      obRequestData.complete = () => {
        const obButton = self.obButton;
        const sType = self.sTypeAdd;
        this.changeButtonView(obButton, sType);
      };

      return obRequestData;
    }).init();
  }
  /* eslint-enable */

  /**
   * @description Change button view..
   * @param {object} obButton
   * @param {string} sType
   */
  changeButtonView(obButton, sType) {
    const obSvg = obButton.find('svg');

    if (sType === this.sTypeAdd) {
      obSvg.removeClass(this.sRemoveSvgClass);
      obSvg.addClass(this.sAddSvgClass);
      obButton.removeClass(this.obRemoveHelper.sDefaultButtonClass);
      obButton.addClass(this.obAddHelper.sDefaultButtonClass);
      obButton.removeClass(this.sRemoveButtonClass);
      obButton.addClass(this.sAddButtonClass);
    } else {
      obSvg.removeClass(this.sAddSvgClass);
      obSvg.addClass(this.sRemoveSvgClass);
      obButton.removeClass(this.obAddHelper.sDefaultButtonClass);
      obButton.addClass(this.obRemoveHelper.sDefaultButtonClass);
      obButton.removeClass(this.sAddButtonClass);
      obButton.addClass(this.sRemoveButtonClass);
    }

    obButton.removeAttr('disabled');
  }
}();
