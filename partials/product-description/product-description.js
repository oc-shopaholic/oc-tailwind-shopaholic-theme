export default new class ProductDescription {
  constructor() {
    this.vDescription = $("._description")
    this.vButton = $("._description-toggle")
    this.vSvg = this.vButton.children("svg")
    this.vSpan = this.vButton.children("span"),
    this.changeVisiblyDescription();
  }

  changeVisibly(text){
    this.vButton.addClass('opacity-0');
    setTimeout(()=>{
      this.vSpan.text(text)
      this.vButton.removeClass('opacity-0');
    },600)
  }

  changeVisiblyDescription(){
    this.vButton.on('click', ()=>{
      if(this.vDescription.hasClass('line-clamp-none')){
        this.vDescription.removeClass('line-clamp-none');
        this.vSvg.removeClass('rotate-180');
        this.changeVisibly(window.stateButton.show);
      }else {
        this.changeVisibly(window.stateButton.hide);
        this.vDescription.addClass('line-clamp-none');
        this.vSvg.addClass('rotate-180');
      }
    })
  }
}();
