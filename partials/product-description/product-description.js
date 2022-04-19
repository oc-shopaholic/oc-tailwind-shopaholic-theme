export default new class ProductDescription {
  constructor() {
    this.vDescription = $("._description");
    this.vButton = $("._description-toggle");
    this.vSvg = this.vButton.find("._arrow");
    this.vSpan = this.vButton.find("._status");
    this.vDescriptionText = this.vDescription.find("._description-text");

    this.sMinHeight = '';
    this.sMaxHeight = '';

    this.btnInit();
    this.animInit();
    this.changeVisiblyDescription();
  }

  animInit(){
    this.sMinHeight = this.vDescriptionText.css('height');
    this.vDescription.css('-webkit-line-clamp', 'unset');
    this.sMaxHeight = this.vDescriptionText.css('height');
    this.vDescription.css('-webkit-line-clamp', '3');

    this.vDescriptionText.css('max-height', this.sMinHeight);
  }

  btnInit(){
    if(this.vDescriptionText[0] && this.vDescriptionText[0].childElementCount < 3){
      this.vButton.css('display', 'none');
    }
  }

  changeVisibly(text){
    this.vButton.css('opacity', '0');
    setTimeout(()=>{
      this.vSpan.text(text);
      this.vButton.css('opacity', '1');
    },200)
  }

  animClose(){
    this.vDescriptionText.css('max-height', this.sMinHeight);
    setTimeout(()=>{
      this.vDescription.css('-webkit-line-clamp', '3');
    },600)
  }

  changeVisiblyDescription(){
    this.vButton.on('click', ()=>{
      if(this.vButton.attr('aria-expanded') !== 'false'){
        this.vSvg.css('transform', 'rotate(0deg)');
        this.animClose();
        this.changeVisibly(window.stateButton.show);
        this.vButton.attr('aria-expanded', 'false');
      }else {
        this.changeVisibly(window.stateButton.hide);
        this.vDescription.css('-webkit-line-clamp', 'unset');
        this.vSvg.css('transform', 'rotate(180deg)');
        this.vButton.attr('aria-expanded', 'true');
        this.vDescriptionText.css('max-height', this.sMaxHeight);
      }
    })
  }
}();
