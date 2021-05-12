export default new class SignIn {
  constructor() {
    this.sButtonSignInClass = '_button-sign-in';
    this.sInvalidClass = '_invalid';
    this.obButton = null;

    this.initHandler();
  }

  /**
   * @description Init handler.
   */
  initHandler() {
    $(document).on('click', `.${this.sButtonSignInClass}`, (obEvent) => {
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
    $.request('Login::onAjax', {
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
