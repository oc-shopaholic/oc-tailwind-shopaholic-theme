export default new class Switch{
    constructor(){
        this.init();
    }

    init() {
      const switchNode = document.querySelector('._switch-radio input:checked');
      if (!switchNode) {
        return;
      }

      let active = switchNode.getAttribute('data-switch');

      document.addEventListener('click', (event) => {
        const eventNode = event.target;
        const radioInputNode = eventNode.closest('._switch-radio');
        const inputNode = radioInputNode ? radioInputNode.querySelector('input') : null;
        if (!radioInputNode || !inputNode) {
          return;
        }

        const oldActive = document.querySelector('.' + active + '-container');
        if (oldActive) {
          oldActive.classList.add('hidden');
          oldActive.setAttribute('aria-hidden', true);
          const oldActiveInput = oldActive.querySelector('input');
          if (oldActiveInput) {
            oldActiveInput.removeAttribute('required');
          }
        }

        active = eventNode.getAttribute('data-switch');
        const newActive = document.querySelector('.' + active + '-container');
        if (newActive) {
          newActive.classList.remove('hidden');
          newActive.removeAttribute('aria-hidden');
          const newActiveInput = newActive.querySelector('input');
          if (newActiveInput) {
            newActiveInput.setAttribute('required', 'required');
          }
        }
      });
    }
}
