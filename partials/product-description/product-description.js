export default new class ProductDescription {
  constructor() {
    this.obDescription = $("._description");
    this.obButton = $("._description-toggle");
    this.obSvg = this.obButton.find("._arrow");
    this.obSpan = this.obButton.find("._status");
    this.obDescriptionText = this.obDescription.find("._description-text");

    this.sMinHeight = '';
    this.sMaxHeight = '';

    this.animInit();
    this.btnInit();
    this.changeVisiblyDescription();
  }

  animInit(){
    this.sMinHeight = this.obDescriptionText.css('height');
    this.obDescription.addClass('line-clamp-none');
    this.sMaxHeight = this.obDescriptionText.css('height');
    this.obDescription.removeClass('line-clamp-none');

    this.obDescriptionText.css('--description-text-max-height', this.sMinHeight);
  }

  btnInit(){
    if(this.sMaxHeight){
      let sMaxHeight = this.sMaxHeight.slice(0, -2);
      if(sMaxHeight && Number(sMaxHeight) < 90){
        this.obButton.addClass('hidden');
      }
    }
  }

  changeVisibly(text){
    this.obButton.addClass('opacity-0');
    setTimeout(()=>{
      this.obSpan.text(text);
      this.obButton.removeClass('opacity-0');
    },200)
  }

  animClose(){
    this.obDescriptionText.css('--description-text-max-height', this.sMinHeight);
    setTimeout(()=>{
      this.obDescription.removeClass('line-clamp-none');
    },600)
  }

  changeVisiblyDescription(){
    this.obButton.on('click', ()=>{
      if(this.obButton.attr('aria-expanded') !== 'false'){
        this.obSvg.removeClass('rotate-180');
        this.animClose();
        this.changeVisibly(window.stateButton.show);
        this.obButton.attr('aria-expanded', 'false');
      }else {
        this.changeVisibly(window.stateButton.hide);
        this.obDescription.addClass('line-clamp-none');
        this.obSvg.addClass('rotate-180');
        this.obButton.attr('aria-expanded', 'true');
        this.obDescriptionText.css('--description-text-max-height', this.sMaxHeight);
      }
    })
  }
}();
