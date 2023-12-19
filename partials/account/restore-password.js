import request from 'oc-request';

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
    const obButton = document.getElementsByClassName(this.sButtonRestorePasswordClass)

    if(!obButton[0]) return

    obButton[0].addEventListener('click', (obEvent)=>{
      // TODO: Understand why we use setTimeout ()
      setTimeout(() => {
        this.sendRequest(obEvent);
      }, 0);
    })
  }

  /**
   * @description Send request.
   * @param {object} obEvent
   */
  sendRequest(obEvent) {
    this.obButton = obEvent.target;
    const obForm = this.obButton.closest('form');

    if (obForm.classList.contains(this.sInvalidClass)) {
      return;
    }

    this.obButton.setAttribute('disabled', 'disabled');
    const self = this;
    request.sendForm(obForm, 'RestorePassword::onAjax', {
      complete: function(data, responseCode, xhr) {
        self.obButton.removeAttribute('disabled');
      },
      error: function(data, responseCode, xhr) {
        // TODO: Replace alert.
        alert(data.message);
      },
    });
  }
}();
