export default class InputQuantity {
  constructor(app) {
    this.obApp = app;
    this.obButtonMinus = this.obApp.find('._decrement');
    this.obButtonPlus = this.obApp.find('._increment');
    this.obCount = this.obApp.find('._count');
    this.nQuantityCount = this.obCount.attr('value');
  }

  counterInitialization(){
    if (!this.isMin()) {
      this.stateButton(this.obButtonMinus, false);
    }
    if (this.isMin()) {
      this.stateButton(this.obButtonMinus, true);
    }

    if (!this.isMax()) {
      this.stateButton(this.obButtonPlus, false);
    }
    if (this.isMax()) {
      this.stateButton(this.obButtonPlus, true);
    }
  }

  getInput() {
    return this.obCount
  }

  getValue() {
    return this.getInput().val()
  }

  setValue(value) {
    this.getInput().attr('value', value);
    this.getInput().val(value);
  }

  getMax() {
    return this.getInput().attr('max')
  }

  getMin() {
    return this.getInput().attr('min')
  }

  isMin() {
    return Number(this.getValue()) <= Number(this.getMin())
  }

  isMax() {
    return Number(this.getValue()) >= Number(this.getMax())
  }

  stateButton(button, state) {
    button.prop('disabled', state);
  
  }

  init() {
    this.counterInitialization();

    this.obCount.on("input", (ev) => {
      if(this.isMin()){
        this.setValue(this.getMin());
        this.nQuantityCount = this.getMin();
      }else if(this.isMax()){
        this.setValue(this.getMax());
        this.nQuantityCount = this.getMax();
      }else {
        this.setValue($(ev.target).val());
        this.nQuantityCount = $(ev.target).val();
      }

      this.counterInitialization();
    });

    this.obButtonMinus.on("click", () => {
      if(this.obApp.attr('data-update')) this.obCount.trigger('input');

      if (!this.isMin()) {
        this.nQuantityCount--;
        this.setValue(this.nQuantityCount);
        this.stateButton(this.obButtonMinus, false);
      }

      if (this.isMin()) {
        this.stateButton(this.obButtonMinus, true);
      }

      if (!this.isMax()) {
        this.stateButton(this.obButtonPlus, false);
      }
    });

    this.obButtonPlus.on("click", () => {
      if(this.obApp.attr('data-update')) this.obCount.trigger('input');

      if (!this.isMax()) {
        this.nQuantityCount++;
        this.setValue(this.nQuantityCount);
        this.stateButton(this.obButtonPlus, false);
      }
      if (this.isMax()) {
        this.stateButton(this.obButtonPlus, true);
      }
      if (!this.isMin()) {
        this.stateButton(this.obButtonMinus, false);
      }
    })
  }

  static make(container) {
    $(container).each(function(e) {
      const containerNav = new InputQuantity($(this));
      containerNav.init();
    });
  }
}
// InputQuantity.make('._counter');
