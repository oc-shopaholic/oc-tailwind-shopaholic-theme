import request from 'oc-request';

export default new class SignOut {
    constructor() {
      this.sButtonAccountChangePasswordClass = '_sign-out';
  
      this.initHandler();
    }
  
    /**
     * @description Init handler.
     */
    initHandler() {
      document.getElementsByClassName(this.sButtonAccountChangePasswordClass)[0].addEventListener('click', (obEvent) => {
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
      const self = this;
      request.sendData('Logout::onAjax', {
        complete: (obResponse) => {
          location.href = location.origin
        },
      });
    }
  }();
  