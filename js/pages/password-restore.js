import '/js/vendor/validation';

class RestorePassword {
  constructor() {
    this.buttonNode = document.querySelector('._button-restore-password');
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

    oc.request('#password-restore', 'RestorePassword::onAjax', {
      complete: (response) => {
        obThis.buttonNode.removeAttribute('disabled');
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obRestorePassword = new RestorePassword();
  obRestorePassword.initHandler();
});
