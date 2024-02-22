export class FlashMessage {
  constructor(message, type, interval) {
    this.mainNode = document.querySelector('._flash');
    this.clearAllButtonNode = this.mainNode.querySelector('._clear-all');

    this.message = message;
    this.type = type;
    this.interval = interval;
    this.maxLimit = 5;
    this.messageNode = null;
    this.timer = null;
  }

  setMessageNode(node) {
    this.messageNode = node;
  }

  show() {
    const obThis = this;
    this.createNewNode();
    if (!this.messageNode) {
      return;
    }

    this.removeOldMessages();

    this.timer = setTimeout(() => {
      obThis.close();
    }, this.maxLimit * 1000);
  }

  close() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (!this.messageNode) {
      return;
    }

    const obThis = this;
    this.messageNode.classList.add('opacity-0');

    setTimeout(() => {
      obThis.messageNode.remove();
      obThis.checkRemoveAllButton();
    }, 500)
  }

  createNewNode() {
    const obThis = this;
    const messageTemplateNode = document.querySelector('._flash-template');
    if (!messageTemplateNode) {
      return;
    }

    const messageNodeTemplate = messageTemplateNode.content.cloneNode(true);

    // Append new message to lit
    const listNode = this.mainNode.querySelector('ul');
    listNode.prepend(messageNodeTemplate);

    this.messageNode = listNode.querySelector('li');
    this.messageNode.classList.add(this.type);
    this.messageNode.classList.add(...this.getColor().split(' '));
    const messageContentNode = this.messageNode.querySelector('._flash-message-content');
    messageContentNode.innerHTML = this.message;

    setTimeout(() => {
      obThis.messageNode.classList.remove('opacity-0');
      this.checkRemoveAllButton();
    }, 50);
  }

  checkRemoveAllButton() {
    const obThis = this;
    setTimeout(() => {
      const  messageNodeList = this.mainNode.querySelectorAll('.flash-message');
      if (messageNodeList.length < this.maxLimit) {
        obThis.clearAllButtonNode.classList.add('hidden');
      } else {
        obThis.clearAllButtonNode.classList.remove('hidden');
      }
    }, 200);
  }

  removeOldMessages() {
    const messageNodeList = this.mainNode.querySelectorAll('.flash-message');

    // Remove messages, if count of messages is greater than this.maxLimit
    if (messageNodeList.length > this.maxLimit) {
      for (let i = this.maxLimit; i < messageNodeList.length; i++)
        messageNodeList[i].remove();
    }
  }

  getColor() {
    switch(this.type) {
      case 'success':
        return 'text-green-900 bg-green-100';
      case 'error':
        return 'text-red-900 bg-red-100';
      case 'warning':
        return 'text-blue-900 bg-blue-100';
      case 'info':
      default:
        return 'text-gray-900 bg-gray-100';
    }
  }
}

export class FlashMessageController {
  constructor() {
    this.mainNode = document.querySelector('._flash');
    this.clearAllButtonNode = this.mainNode.querySelector('._clear-all');
  }

  init() {
    addEventListener('ajax:setup', function(event) {
      const { options } = event.detail.context;

      // Enable AJAX handling of Flash messages on all AJAX requests
      options.flash = true;

      // Handle Flash Messages by triggering a flashMsg of the message type
      options.handleFlashMessage = function(message, type) {
        const flashMessage = new FlashMessage(message, type);
        flashMessage.show();
      }
    });

    const obThis = this;
    this.clearAllButtonNode.addEventListener('click', () => {
      obThis.clearAll();
    })

    this.mainNode.addEventListener('click', (event) => {
      const eventNode = event.target;
      if (!eventNode.closest('._flash-message-close')) {
        return;
      }

      const messageNode = eventNode.closest('.flash-message');
      const flashMessage = new FlashMessage();
      flashMessage.setMessageNode(messageNode);
      flashMessage.close();
    });
  }

  clearAll() {
    this.clearAllButtonNode.classList.add('hidden');
    let messageNodeList = this.mainNode.querySelectorAll('.flash-message');
    if (!messageNodeList || messageNodeList.length === 0) {
      return;
    }

    messageNodeList.forEach((messageNode) => {
      messageNode.classList.add('opacity-0');
      setTimeout(() => {
        messageNode.remove();
      }, 250)
    });
  }
}

oc.pageReady().then(() => {
  const flashMessageList = new FlashMessageController();
  flashMessageList.init();
});
