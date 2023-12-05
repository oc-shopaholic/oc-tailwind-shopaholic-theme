export default class Language {
  constructor(app) {
    this.obNav = app;
    this.languageInput = null;
    this.obShow = this.obNav.querySelectorAll("._show");
  }
  initVariables(){
    this.languageInput = this.obNav.querySelector(".js-language-input");
  }
  show() {
    this.obShow[0].addEventListener("click", () => {
      this.initVariables();
      console.log(1)
      this.initEvents();
    })
  }
  initEvents() {
    console.log(2)
    this.setRegion();
  }
  setRegion() {
    if(!this.languageInput) return false
    this.languageInput.addEventListener("change", (e) => {
      if(window.location.href !== this.languageInput.value) window.location.href = this.languageInput.value
    })
  }
  static make(container) {
    const obContainer = document.getElementsByClassName(`${container}`);
    Array.from(obContainer).forEach(function(e) {
      const containerNav = new Language(e);
      containerNav.show();
    });
  }
}
Language.make('_off-canvas');
