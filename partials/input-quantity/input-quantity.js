export default class InputQuantity {
  constructor(app) {
    this.obCounter = app;
    this.obMinus = this.obCounter.querySelector("._decrement");
    this.obPlus = this.obCounter.querySelector("._increment");
    this.obCount = this.obCounter.querySelector("._count");
    this.sQuantityCount = this.obCount.getAttribute('value');

    this.obEvents = [];
  }

  stateButton(button, state) {
    if(state){
      button.setAttribute('disabled', '');
    } else {
      button.removeAttribute('disabled');
    }
  }

  getInput() {
    return this.obCount;
  }

  getValue() {
    return this.getInput().value;
  }

  setValue(value) {
    this.getInput().setAttribute('value', value);
    this.getInput().value = value;
  }

  getMax() {
    return this.getInput().getAttribute('max');
  }

  getMin() {
    return this.getInput().getAttribute('min');
  }

  isMin() {
    return Number(this.getValue()) <= Number(this.getMin());
  }

  isMax() {
    return Number(this.getValue()) >= Number(this.getMax());
  }

  counterInitialization() {
    if (!this.isMin()) {
      this.stateButton(this.obMinus, false);
    }

    if (this.isMin()) {
      this.stateButton(this.obMinus, true);
    }

    if (!this.isMax()) {
      this.stateButton(this.obPlus, false);
    }

    if (this.isMax()) {
      this.stateButton(this.obPlus, true);
    }
  }

  addEvents(){
    const app = this;

    this.obEvents[0] = (function(ev) {
      if(app.isMin()){
        app.setValue(app.getMin());
        app.sQuantityCount = app.getMin()
      }else if(app.isMax()){
        app.setValue(app.getMax());
        app.sQuantityCount = app.getMax()
      }else {
        app.setValue(ev.target.value);
        app.sQuantityCount = ev.target.value
      }

      app.counterInitialization();
    });

    this.obEvents[1] = (function(e) {
      if (!app.isMin()) {
        app.sQuantityCount--;
        app.setValue(app.sQuantityCount);
        app.stateButton(app.obMinus, false);
      }

      if (app.isMin()) {
        app.stateButton(app.obMinus, true);
      }

      if (!app.isMax()) {
        app.stateButton(app.obPlus, false);
      }

      app.obCount.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          cancelable: true,
      }));
    });

    this.obEvents[2] = (function(e) {
      if (!app.isMax()) {
        app.sQuantityCount++;
        app.setValue(app.sQuantityCount);
        app.stateButton(app.obPlus, false);
      }
      if (app.isMax()) {
        app.stateButton(app.obPlus, true);
      }
      if (!app.isMin()) {
        app.stateButton(app.obMinus, false);
      }

      app.obCount.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          cancelable: true,
      }));
    });

    this.obCount.addEventListener('input', this.obEvents[0]);
    this.obMinus.addEventListener('click', this.obEvents[1]);
    this.obPlus.addEventListener('click', this.obEvents[2]);
  }

  init() {
    this.counterInitialization();
    this.addEvents();
  }

  static make(container) {
    const obContainer = document.getElementsByClassName(`${container}`);
    Array.from(obContainer).forEach(function(e) {
      const containerNav = new InputQuantity(e);
      containerNav.init();
    });
  }
}

