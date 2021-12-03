export default new class InputQuantity {
    constructor() {
      this.sInputQuantityDecrementCount = '_decrement';
      this.sInputQuantityIncrementCount = '_increment';
      this.sInputQuantityCount = '_count';
      this.sQuantityCount = $(`.${this.sInputQuantityCount}`).attr('value');
      
      this.decrement();
      this.increment();
    }
    
    decrement(){
      $(document).on('click', `.${this.sInputQuantityDecrementCount}`, () => {
        if($(`.${this.sInputQuantityCount}`).attr('value') !== $(`.${this.sInputQuantityCount}`).attr('min')){
          this.sQuantityCount--;
          $(`.${this.sInputQuantityCount}`).attr('value', this.sQuantityCount);
          $(`.${this.sInputQuantityDecrementCount}`).prop('disabled', false);
        }
        if($(`.${this.sInputQuantityCount}`).attr('value') === $(`.${this.sInputQuantityCount}`).attr('min')){
          $(`.${this.sInputQuantityDecrementCount}`).prop('disabled', true);
        }
        if($(`.${this.sInputQuantityCount}`).attr('value') !== $(`.${this.sInputQuantityCount}`).attr('max')){
          $(`.${this.sInputQuantityIncrementCount}`).prop('disabled', false);
        }
      });
    }
    
    increment(){
      $(document).on('click', `.${this.sInputQuantityIncrementCount}`, () => {
        if($(`.${this.sInputQuantityCount}`).attr('value') !== $(`.${this.sInputQuantityCount}`).attr('max')){
          this.sQuantityCount++;
          $(`.${this.sInputQuantityCount}`).attr('value', this.sQuantityCount);
          $(`.${this.sInputQuantityIncrementCount}`).prop('disabled', false);
        }
        if($(`.${this.sInputQuantityCount}`).attr('value') === $(`.${this.sInputQuantityCount}`).attr('max')){
          $(`.${this.sInputQuantityIncrementCount}`).prop('disabled', true);
        }
        if($(`.${this.sInputQuantityCount}`).attr('value') !== $(`.${this.sInputQuantityCount}`).attr('min')){
          $(`.${this.sInputQuantityDecrementCount}`).prop('disabled', false);
        }
      });
    }
  }();
