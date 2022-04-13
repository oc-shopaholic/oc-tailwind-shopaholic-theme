export default new class ProductDescription {
  constructor() {
    this.vDescription = $("._description")
    this.vButton = $("._description-toggle")
    this.vSvg = this.vButton.children("svg")
    this.vSpan = this.vButton.children("span"),
    this.changeVisiblyDescription();
  }

  changeVisibly(text){
    this.vButton.css('opacity', '0');
    setTimeout(()=>{
      this.vSpan.text(text)
      this.vButton.css('opacity', '1');
    },600)
  }

  changeVisiblyDescription(){
    this.vButton.on('click', ()=>{
      if(this.vDescription.css('-webkit-line-clamp') !== '3'){
        this.vDescription.css('-webkit-line-clamp', '3');
        this.vSvg.css('transform', 'rotate(0deg)');
        this.changeVisibly(window.stateButton.show);
      }else {
        console.log(this.vDescription.css('-webkit-line-clamp'))
        this.changeVisibly(window.stateButton.hide);
        this.vDescription.css('-webkit-line-clamp', 'unset');
        this.vSvg.css('transform', 'rotate(180deg)');
      }
    })
  }
}();
