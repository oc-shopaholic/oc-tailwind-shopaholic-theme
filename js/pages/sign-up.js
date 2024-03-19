import '/js/vendor/validation';

class SignUp {
  constructor() {
    this.buttonNode = document.querySelector('._button-sign-up');
    this.formNode = this.buttonNode ? this.buttonNode.closest('form') : null;
  }

  initHandler() {
    if (!this.buttonNode || !this.formNode) {
      return;
    }

    const obThis = this;
    this.buttonNode.addEventListener('click', (event) => {
      obThis.sendRequest();
    })
  }

  sendRequest() {
    if (this.formNode.classList.contains('_invalid')) {
      return;
    }

    this.buttonNode.setAttribute('disabled', 'disabled');
    const obThis = this;

    oc.request('#sign-up', 'Registration::onAjax', {
      complete: (response) => {
        obThis.buttonNode.removeAttribute('disabled');
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obSignUp = new SignUp();
  obSignUp.initHandler();
});
