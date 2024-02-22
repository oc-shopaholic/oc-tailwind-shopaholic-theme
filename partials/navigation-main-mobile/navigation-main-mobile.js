export default class NavigationMobile {
  constructor(app) {
    this.app = app;
    this.btnShow = this.app.querySelector("._show");
    this.classRegion = '.js-show-region';
    this.btnRegion = '.js-btn-region';
  }
  show() {
    this.btnShow.addEventListener("click", () => {
      this.showRegion()
    })
  }
  showRegion() {
   const regionElement =  document.querySelector(`${this.classRegion}`)
    if(regionElement) {
      regionElement.addEventListener('click', () => {
        document.querySelector('._nav ._hide').dispatchEvent(
          new InputEvent('click', {
            bubbles: true,
            cancelable: true,
          }));
        const btnRegion = document.querySelector('.js-btn-region')
        setTimeout(() => {
          btnRegion.dispatchEvent(
            new InputEvent('click', {
              bubbles: true,
              cancelable: true,
            }));
        }, 400)
      })
    }
  }
  static make(container) {
    const obContainer = document.getElementsByClassName(`${container}`);
    Array.from(obContainer).forEach(function(e) {
      const containerNav = new NavigationMobile(e);
      containerNav.show();
    });
  }
}


NavigationMobile.make('_off-canvas');
