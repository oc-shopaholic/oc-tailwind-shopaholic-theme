export default new class SignIn {
  constructor() {
    this.sButtonSignInClass = '_button-sign-in';
    this.obButton = null;

    this.initLoginHandler();
  }

  /**
   * @description Init login handler.
   */
  initLoginHandler() {
    $(document).on('click', `.${this.sButtonSignInClass}`, (obEvent) => {
      this.obButton = $(obEvent.target);
      this.obButton.attr('disabled', 'disabled');
      const obForm = this.obButton.closest('form');
      const self = this;
      $.request('Login::onAjax', {
        form: obForm,
        complete: function (obResponse) {
          const obData = obResponse.responseJSON;
          if (obData.status === false) {
            // TODO: Replace alert.
            alert(obData.message);
          }
          self.obButton.removeAttr('disabled');
        }
      });
    });
  }
}();
