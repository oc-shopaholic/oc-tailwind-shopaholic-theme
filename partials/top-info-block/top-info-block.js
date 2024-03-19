class TopInfoBlock {
  constructor() {
    this.sTopInfoBlockWrapperClass = '_top-info-block';
    this.sTopInfoBlockButtonClosedClass = '_top-info-block-button-close';

    this.sHashKey = 'top_info_block_hash';
    this.sActiveKey = 'top_info_block_active';

    this.bActive = false;
    this.sNewHash = '';
    this.sOldHash = '';
  }

  /**
   * @description Init data.
   */
  initData() {
    this.bActive = localStorage.getItem(this.sActiveKey);
    this.bActive = this.bActive === 'true';

    const infoBlockNode = document.querySelector(`.${this.sTopInfoBlockWrapperClass}`);
    if (infoBlockNode) {
      this.sNewHash = infoBlockNode.dataset.hash;
      if (this.sNewHash === undefined) {
        this.sNewHash = '';
      }

      this.sOldHash = localStorage.getItem(this.sHashKey);
    }
  }

  /**
   * @description Hide block.
   */
  hide() {
    const closeButtonNode = document.querySelector(`.${this.sTopInfoBlockButtonClosedClass}`);
    if (!closeButtonNode) {
      return;
    }

    const obThis = this;
    closeButtonNode.addEventListener('click', () => {
      const infoBlockNode = document.querySelector(`.${obThis.sTopInfoBlockWrapperClass}`);
      if (!infoBlockNode) {
        return;
      }

      infoBlockNode.classList.add('hidden');

      obThis.updateLocalStorage(false, this.sNewHash);
    })
  }

  /**
   * @description Show block.
   */
  show() {
    if (!this.isActive()) {
      return;
    }

    const obThis = this;

    oc.ajax('onInit', {
      update: {'top-info-block/top-info-block-ajax': `.${this.sTopInfoBlockWrapperClass}`},
      complete: function () {
        obThis.hide();

        const infoBlockNode = document.querySelector(`.${obThis.sTopInfoBlockWrapperClass}`);
        if (!infoBlockNode) {
          return;
        }

        infoBlockNode.classList.remove('hidden');
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
}

document.addEventListener('DOMContentLoaded', () => {
  const obTopInfoBlock = new TopInfoBlock();
  obTopInfoBlock.initData();
  obTopInfoBlock.show();
});
