export default new class InputQuantity {
    constructor() {
      this.sInputQuantityDecrementCount = '_decrement';
      this.sInputQuantityIncrementCount = '_increment';
      this.sInputQuantityCount = '_count';
      this.sQuantityCount = $(`.${this.sInputQuantityCount}`).attr('value');
      
      this.decrement();
      this.increment();
    }
    
    getInput(){
       return $(`.${this.sInputQuantityCount}`)
    }
  
    getValue(){
       return this.getInput().val()
    }
  
    setValue(value){
       this.getInput().attr('value', value);
    }
  
    getMax(){
       return this.getInput().attr('max')
    }
  
    getMin(){
       return this.getInput().attr('min')
    }
  
    isMin(){
       return this.getValue() === this.getMin()
    }
  
    isMax(){
       return this.getValue() === this.getMax()
    }
    
    stateButton(button, state){
      $(`.${button}`).prop('disabled', state);
    }
    
    decrement(){
      $(document).on('click', `.${this.sInputQuantityDecrementCount}`, () => {
        if(!this.isMin()){
          this.sQuantityCount--;
          this.setValue(this.sQuantityCount);
          this.stateButton(this.sInputQuantityDecrementCount, false);
        }
        
        if(this.isMin()){
          this.stateButton(this.sInputQuantityDecrementCount, true);
        }
        
        if(!this.isMax()){
          this.stateButton(this.sInputQuantityIncrementCount, false);
        }
      });
    }
    
    increment(){
      $(document).on('click', `.${this.sInputQuantityIncrementCount}`, () => {
        if(!this.isMax()){
          this.sQuantityCount++;
          this.setValue(this.sQuantityCount);
          this.stateButton(this.sInputQuantityIncrementCount, false);
        }
        if(this.isMax()){
          this.stateButton(this.sInputQuantityIncrementCount, true);
        }
        if(!this.isMin()){
          this.stateButton(this.sInputQuantityDecrementCount, false);
        }
      })
    }
  }();
