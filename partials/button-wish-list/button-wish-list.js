import ShopaholicAddWishList from '@lovata/shopaholic-wish-list/shopaholic-add-wish-list';
import ShopaholicRemoveWishList from '@lovata/shopaholic-wish-list/shopaholic-remove-wish-list';

export default new class ButtonWishList {
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
      obRequestData.update = {'wish-list/wish-list': '._wish-list-wrapper'};
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
      if(obSvg.hasClass('_card-list-chekout')){
        this.sAddButtonClass = 'text-gray-600';
      }else{
        obSvg.addClass(this.sAddSvgClass);
      }
      obSvg.removeClass(this.sRemoveSvgClass);
      obButton.removeClass(this.obRemoveHelper.sDefaultButtonClass);
      obButton.addClass(this.obAddHelper.sDefaultButtonClass);
      obButton.removeClass(this.sRemoveButtonClass);
      obButton.addClass(this.sAddButtonClass);
    } else {
      if(obSvg.hasClass('_card-list-chekout')){
        this.sAddButtonClass = 'text-gray-600';
      }else{
        obSvg.removeClass(this.sAddSvgClass);
      }
      obSvg.addClass(this.sRemoveSvgClass);
      obButton.removeClass(this.obAddHelper.sDefaultButtonClass);
      obButton.addClass(this.obRemoveHelper.sDefaultButtonClass);
      obButton.removeClass(this.sAddButtonClass);
      obButton.addClass(this.sRemoveButtonClass);
    }

    obButton.removeAttr('disabled');
  }
}();
