export default new class TopInfoBlock {
  constructor() {
    this.sTopInfoBlockWrapperClass = '_top-info-block';
    this.sTopInfoBlockButtonClosedClass = '_top-info-block-button-close';
    this.sHiddenClass = 'hidden';

    this.sHashKey = 'top_info_block_hash';
    this.sActiveKey = 'top_info_block_active';

    this.bActive = false;
    this.sNewHash = '';
    this.sOldHash = '';

    this.initData();
    this.show();
  }

  /**
   * @description Init data.
   */
  initData() {
    this.bActive = localStorage.getItem(this.sActiveKey);
    if (this.bActive === 'true') {
      this.bActive = true;
    } else {
      this.bActive = false;
    }

    this.sNewHash = document.getElementsByClassName(this.sTopInfoBlockWrapperClass)[0].dataset.hash;
    if (this.sNewHash === undefined) {
      this.sNewHash = '';
    }

    this.sOldHash = localStorage.getItem(this.sHashKey);
  }

  /**
   * @description Hide block.
   */
  hide() {
    document.getElementsByClassName(this.sTopInfoBlockButtonClosedClass)[0].addEventListener('click', () => {
      document.getElementsByClassName(this.sTopInfoBlockWrapperClass)[0].classList.add(this.sHiddenClass);

      this.updateLocalStorage(false, this.sNewHash);
    });
  }

  /**
   * @description Show block.
   */
  show() {
    if (!this.isActive()) {
      return;
    }

    const self = this;

    oc.request('onInit', {
      update: {'top-info-block/top-info-block-ajax': `.${this.sTopInfoBlockWrapperClass}`},
      complete: function () {
        self.hide();
        document.getElementsByClassName(self.sTopInfoBlockWrapperClass)[0].classList.remove(self.sHiddenClass);
      },
    });
  }

  /**
   * @description Conditions for displaying a block.
   * @return @return {boolean}
   */
  isActive() {
    if (!this.sNewHash) {
      return false;
    }

    if (this.sNewHash !== this.sOldHash) {
      this.updateLocalStorage(true, this.sNewHash);

      return true;
    }

    return this.bActive;
  }

  /**
   * @description Write data to local storage.
   * @param {boolean} bActive
   * @param {string} sHash
   */
  updateLocalStorage(bActive, sHash) {
    localStorage.setItem(this.sActiveKey, bActive);
    localStorage.setItem(this.sHashKey, sHash);
  }
}();
