import '/js/vendor/validation';

class ChangePassword {
  constructor() {
    this.buttonNode = document.querySelector('._button-account-change-password');
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

    oc.request('#change-password', 'ChangePassword::onAjax', {
      complete: (response) => {
        obThis.buttonNode.removeAttribute('disabled');
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obChangePassword = new ChangePassword();
  obChangePassword.initHandler();
});
