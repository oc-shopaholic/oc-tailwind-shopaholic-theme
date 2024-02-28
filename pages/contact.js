import '../assets/src/js/validation';
import {FlashMessage} from '/partials/flash-message/flash-message';

class ContactPage {
  constructor() {
    this.formNode = document.querySelector('#feedback-form');
  }

  init() {
    const obThis = this;
    this.formNode.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();

      obThis.submitForm();
    });
  }

  submitForm() {
    const obThis = this;

    oc.request('#feedback-form', 'genericForm::onFormSubmit', {
      method: 'POST',
      form: this.formNode,
      complete: (response, status) => {
        const responseContent = response['#genericForm_forms_flash'] ?? null;
        obThis.showMessage(responseContent, status === 200 ? 'success' : 'error');
      },
    });
  }

  showMessage(responseContent, type) {
    if (!responseContent) {
      return;
    }

    const templateNode = document.createElement('template');
    templateNode.innerHTML = responseContent;
    const responseNode = templateNode.content.firstChild;

    const messageNode = responseNode.querySelector('p');
    let messageNodeList = [];
    if (messageNode) {
      messageNodeList.push(messageNode);
    }

    messageNodeList = [...messageNodeList, ...responseNode.querySelectorAll('li')];
    if (!messageNodeList || messageNodeList.length === 0) {
      return;
    }

    messageNodeList.forEach((messageNode) => {
      const message = new FlashMessage(messageNode.textContent, type);
      message.show();
    })
  }
}

oc.pageReady().then(() => {
  const formHandler = new ContactPage();
  formHandler.init();
});
