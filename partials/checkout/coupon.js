import ShopaholicCouponAdd from "@lovata/shopaholic-coupon/shopaholic-coupon-add";
import ShopaholicCouponRemove from '@lovata/shopaholic-coupon/shopaholic-coupon-remove';

export default new class Coupon {
  constructor() {
    this.init();
  }

  init() {
    const obAdd = new ShopaholicCouponAdd();
    obAdd.setAjaxRequestCallback(function (obRequestData, obInput, obButton) {
      obRequestData.update = {'checkout-list/checkout-list-ajax': '._checkout-list'};
      obRequestData.complete = (obResponse) => {
        obAdd.completeCallback(obResponse, obInput, obButton);
        obInput.setAttribute('disabled', 'disabled');
        obButton.classList.add('hidden');

        const obRemoveButtonList = document.getElementsByClassName('_shopaholic-coupon-remove');
        const obRemoveButton = obRemoveButtonList ? obRemoveButtonList[0] : null;
        if (obRemoveButton) {
          obRemoveButton.classList.remove('hidden');
        }
      };

      return obRequestData;
    }).init();
    const obRemove = new ShopaholicCouponRemove();
    obRemove.setAjaxRequestCallback(function (obRequestData, obInput, obButton) {
      obRequestData.complete = (obResponse) => {
        obRequestData.update = {'checkout-list/checkout-list-ajax': '._checkout-list'};
        obAdd.completeCallback(obResponse, obInput, obButton);
        obInput.removeAttribute('disabled', 'disabled');
        obButton.classList.add('hidden');

        const obAddButtonList = document.getElementsByClassName('_shopaholic-coupon-add');
        const obAddButton = obAddButtonList ? obAddButtonList[0] : null;
        if (obAddButton) {
          obAddButton.classList.remove('hidden');
        }
      };

      return obRequestData;
    }).init();
  }
}();
