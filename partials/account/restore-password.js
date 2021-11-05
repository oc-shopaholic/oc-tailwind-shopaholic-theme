export default new class RestorePassword {
  constructor() {
    this.sButtonRestorePasswordClass = '_button-restore-password';
    this.sInvalidClass = '_invalid';
    this.obButton = null;

    this.initHandler();
  }

  /**
   * @description Init handler.
   */
  initHandler() {
    $(document).on('click', `.${this.sButtonRestorePasswordClass}`, (obEvent) => {
      // TODO: Understand why we use setTimeout ()
      setTimeout(() => {
        this.sendRequest(obEvent);
      }, 0);
    });
  }

  /**
   * @description Send request.
   * @param {object} obEvent
   */
  sendRequest(obEvent) {
    this.obButton = $(obEvent.target);
    const obForm = this.obButton.closest('form');
    if (obForm.hasClass(this.sInvalidClass)) {
      return;
    }
    this.obButton.attr('disabled', 'disabled');
    const self = this;
    $.request('RestorePassword::onAjax', {
      form: obForm,
      complete: (obResponse) => {
        const obData = obResponse.responseJSON;
        if (obData.status === false) {
          // TODO: Replace alert.
          alert(obData.message);
        }
        self.obButton.removeAttr('disabled');
      },
    });
  }
}();
