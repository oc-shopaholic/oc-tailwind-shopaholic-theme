import request from 'oc-request';

export default new class SignUpn {
  constructor() {
    this.sButtonSignUpClass = '_button-sign-up';
    this.sInvalidClass = '_invalid';
    this.obButton = null;

    this.initHandler();
  }

  /**
   * @description Init handler.
   */
  initHandler() {
    let obButton = document.getElementsByClassName(this.sButtonSignUpClass)

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
    request.sendForm(obForm, 'Registration::onAjax', {
      success: (res) => {
        const obData = res;
        if (obData.status === false) {
          // TODO: Replace alert.
          alert(obData.message);
        }
        self.obButton.removeAttribute('disabled');
      },
    });
  }
}();
