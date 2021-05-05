export default new class SignIn {
  constructor() {
    this.sButtonSignInClass = '_button-sign-in';
    this.obButton = null;
    this.sInvalidClass = '_invalid';

    document.addEventListener('bouncerFormValid', () => {
      this.initLoginHandler();
    });
  }

  /**
   * @description Init login handler.
   */
  initLoginHandler() {
    $(document).on('click', `.${this.sButtonSignInClass}`, (obEvent) => {
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
    });
  }
}();
