export default new class ProductDescription {
  constructor() {
    this.vDescription = $("._description");
    this.vButton = $("._description-toggle");
    this.vSvg = this.vButton.find("._arrow");
    this.vSpan = this.vButton.find("._status");
    this.vDescriptionText = this.vDescription.find("._description-text");

    this.sMinHeight = '';
    this.sMaxHeight = '';

    // this.btnInit();
    this.animInit();
    this.changeVisiblyDescription();
  }

  animInit(){
    this.sMinHeight = this.vDescriptionText.css('height');
    this.vDescription.addClass('line-clamp-none');
    this.sMaxHeight = this.vDescriptionText.css('height');
    this.vDescription.removeClass('line-clamp-none');

    this.vDescriptionText.css('max-height', this.sMinHeight);
  }

  // btnInit(){
  //   if(this.vDescriptionText[0] && this.vDescriptionText[0].childElementCount < 3){
  //     this.vButton.addClass('hidden');
  //   }
  // }

  changeVisibly(text){
    this.vButton.addClass('opacity-0');
    setTimeout(()=>{
      this.vSpan.text(text);
      this.vButton.removeClass('opacity-0');
    },200)
  }

  animClose(){
    this.vDescriptionText.css('max-height', this.sMinHeight);
    setTimeout(()=>{
      this.vDescription.removeClass('line-clamp-none');
    },600)
  }

  changeVisiblyDescription(){
    this.vButton.on('click', ()=>{
      if(this.vButton.attr('aria-expanded') !== 'false'){
        this.vSvg.removeClass('rotate-180');
        this.animClose();
        this.changeVisibly(window.stateButton.show);
        this.vButton.attr('aria-expanded', 'false');
      }else {
        this.changeVisibly(window.stateButton.hide);
        this.vDescription.addClass('line-clamp-none');
        this.vSvg.addClass('rotate-180');
        this.vButton.attr('aria-expanded', 'true');
        this.vDescriptionText.css('max-height', this.sMaxHeight);
      }
    })
  }
}();
