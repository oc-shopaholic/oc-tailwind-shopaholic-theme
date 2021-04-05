import Bouncer from 'formbouncerjs';

export default new class TestValidation {
  constructor() {
    this.formForValidationSelector = '._required';
    this.inValidSelector = '_invalid';

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.validate(this.formForValidationSelector);
    });
  }

  validate(selector) {
    this.validation = new Bouncer(selector, {
      fieldClass: 'validation-error',
      errorClass: 'validation-error__message',
      fieldPrefix: 'validation-error-',
      errorPrefix: 'validation-error-',
      messageAfterField: true,
      messageCustom: 'data-bouncer-message',
      messageTarget: 'data-bouncer-target',
      disableSubmit: true,
    });

    document.addEventListener('bouncerFormValid', ({ target }) => {
      target.classList.remove(this.inValidSelector);
    });

    document.addEventListener('bouncerFormInvalid', ({ target }) => {
      target.classList.add(this.inValidSelector);
    });
  }
}();
