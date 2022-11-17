export default new class AdvancedList {
  constructor() {
    this.sAdvancedListWrapperClass = $('._advanced-list');
    this.sAdvancedListButtonShowMoreClass = $('._advanced-list-button-show-all');
    this.sAdvancedListButtonShowMoreClassHidden = $('._advanced-list-button-show-all-hidden');

    this.obButton = null;

    this.init();
    this.showAllList();
  }

  /**
   * @description Show all list.
   */

  init(){
    if(this.sAdvancedListWrapperClass.find('li').data('take')){
      for(let i = 0; i !== this.sAdvancedListWrapperClass.find('li').data('take'); i++){
        this.sAdvancedListWrapperClass.find('li')[i].removeAttribute('aria-hidden');
        this.sAdvancedListWrapperClass.find('li')[i].classList.remove('hidden');
      }
    }
  }

  showAllList() {
    this.sAdvancedListButtonShowMoreClass.on('click', ()=> {
      this.sAdvancedListButtonShowMoreClass.addClass('hidden');
      this.sAdvancedListButtonShowMoreClassHidden.removeClass('hidden');
      setTimeout(()=>{
        this.sAdvancedListWrapperClass.find('li').removeAttr('aria-hidden', null);
        this.sAdvancedListWrapperClass.find('li').removeClass('hidden');
        this.sAdvancedListButtonShowMoreClassHidden.addClass('hidden');
      },300)
    });
  }
}();
