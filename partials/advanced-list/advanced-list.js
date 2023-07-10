export default new class AdvancedList {
  constructor() {
    this.obAdvancedListWrapperClass = null;
    this.obAdvancedListButtonShowMoreClass = null;
    this.obAdvancedListButtonShowMoreClassHidden = null;

    this.obButton = null;

    this.init();
  }

  /**
   * @description Show all list.
   */

  initVariables(){
    this.obAdvancedListWrapperClass = document.getElementsByClassName('_advanced-list')[0];
    this.obAdvancedListButtonShowMoreClass = document.getElementsByClassName('_advanced-list-button-show-all')[0];
    this.obAdvancedListButtonShowMoreClassHidden = document.getElementsByClassName('_advanced-list-button-show-all-hidden')[0];
  }

  init(){
    if(!document.getElementsByClassName('_advanced-list')[0]) return;
    
    this.initVariables();
    this.showAllList();
    
    if(this.obAdvancedListWrapperClass.querySelectorAll('li')[0].dataset.take){
      for(let i = 0; i < this.obAdvancedListWrapperClass.querySelectorAll('li')[0].dataset.take; i++){
        this.obAdvancedListWrapperClass.querySelectorAll('li')[i].removeAttribute('aria-hidden');
        this.obAdvancedListWrapperClass.querySelectorAll('li')[i].classList.remove('hidden');
      }
    }
  }

  showAllList() {
    this.obAdvancedListButtonShowMoreClass.addEventListener('click', ()=> {
      this.obAdvancedListButtonShowMoreClass.classList.add('hidden');
      this.obAdvancedListButtonShowMoreClassHidden.classList.remove('hidden');
      setTimeout(()=>{
        for(let i = 0; i < this.obAdvancedListWrapperClass.querySelectorAll('li').length; i++){
          this.obAdvancedListWrapperClass.querySelectorAll('li')[i].removeAttribute('aria-hidden');
          this.obAdvancedListWrapperClass.querySelectorAll('li')[i].classList.remove('hidden');
        }
        this.obAdvancedListButtonShowMoreClassHidden.classList.add('hidden');
      },300)
    });
  }
}();
