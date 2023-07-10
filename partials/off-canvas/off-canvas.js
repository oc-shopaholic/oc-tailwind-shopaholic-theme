import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export default class offCanvas {
  constructor(app) {
    this.obNav = app;
    this.obShow = this.obNav.querySelectorAll("._show");
    this.obContainer = null;
    this.obTemplateNav = null;
    this.obTemplate = null;
    this.obOffCanvasRemove = null;
    this.obDialog = null;
    this.sScrollWidth = null;
    this.obBackdrop = null;
    this.obFocus = null;
    this.obContainerRend = null;
    this.sNewRend = false;
    this.obEvents = [];
  }

  onNewRend(){
    this.sNewRend = this.obNav.querySelectorAll('._offCanvasContainer')[0].dataset.type;
  }

  initOffCanvas(){
    if(this.sNewRend !== 'detach'){
      this.obTemplateNav = this.obNav.querySelectorAll("._offCanvasTemplate");
      this.obTemplate = this.obTemplateNav[0].content.cloneNode(true);
      this.obNav.appendChild(this.obTemplate);
      this.onNewRend();
    }else{
      if(this.obContainerRend){
        this.obNav.appendChild(this.obContainerRend);
      }
    }
    this.obDialog = document.querySelectorAll('._offCanvasContainer')[0];
    dialogPolyfill.registerDialog(this.obDialog);

    setTimeout(()=>{
      if(!this.obShow[0].dataset.tags){
        this.obDialog.showModal();

        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = this.sScrollWidth + 'px';
      }
    }, 10)

    this.obContainer = this.obNav.querySelectorAll("._nav");
  }

  initFocus() {
    if(!this.obShow[0].dataset.tags){
      this.obFocus = focusTrap.createFocusTrap('._offCanvasContainer');

      this.obFocus.activate()
    }
  }

  initScrollWidth() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    
    document.body.appendChild(div)

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    this.sScrollWidth = scrollWidth;
  }

  initBackdrop() {
    this.obBackdrop = this.obNav.querySelectorAll(".backdrop");
    if(this.obBackdrop[0]){
      this.obBackdrop.classList.add('fixed top-0 right-0 bg-gray-400')
      this.obBackdrop.style.left = '0';
      this.obBackdrop.style.bottom = '0';
      this.obBackdrop.style.opacity = '0.6';
      this.obDialog.style.minHeight = '100vh';
      this.obDialog.style.top = '0';
      this.obDialog.style.right = '0';
      this.obDialog.style.left = '0';
      this.obDialog.style.bottom = '0';
      this.obDialog.style.position = 'fixed';
    }
  }

  initEvents(){
    const app = this;

    this.obEvents[0] = (function(e) {
      if (e.keyCode === 27) {
        app.clearEvents();
      }   
    });
    
    this.obEvents[1] = (function (e){ 
      if(!app.obContainer[0].contains(e.target)){
        app.clearEvents();
      }
    });

    this.obEvents[2] = (function(event){ 
      if(event.target.closest('button') && event.target.closest('button').classList.contains('_hide')){
        app.clearEvents();
      }
    });

    document.addEventListener('keydown', this.obEvents[0]);
    this.obNav.addEventListener('mouseup', this.obEvents[1]);
    this.obNav.addEventListener('click', this.obEvents[2]);
  }

  initAnimOpen(){
    if(this.obContainer[0].dataset.position === 'bottom'){
      this.obContainer[0].style.top = '100%';
      this.obContainer[0].style.width = '100%';
    }else{
      this.obContainer[0].setAttribute('style', this.obContainer[0].dataset.position + ':-100%');
    }
    this.obContainer[0].style.display = 'block';
    this.initBackdrop();
    this.animOpen();
  }

  initAnimClose(){
    if(this.obContainer[0].dataset.position === 'bottom'){
      this.obContainer[0].classList.add('block w-full h-full');
      this.obContainer[0].style.top = '150%';
    }else{
      this.obContainer[0].setAttribute('style', this.obContainer[0].dataset.position + ':-100%')
      this.obContainer[0].style.display = 'block';
    }
  }

  animOpen(){
    setTimeout(() => {
      if(this.obContainer[0].dataset.position === 'bottom'){
        this.obContainer.style.top = '50%';
      }else{
        this.obContainer[0].setAttribute('style', this.obContainer[0].dataset.position + ':0px');
        this.obContainer[0].style.display = 'block';
      }
      this.initFocus()
    }, 100);
  }

  animClose(){
    setTimeout(() => {
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0px';
      this.obFocus.deactivate();
      this.obOffCanvasRemove = this.obNav.querySelectorAll('._offCanvasContainer');
      if(this.obShow[0].dataset.show){
        this.obOffCanvasRemove[0].removeAttribute('open');
        this.obOffCanvasRemove[0].classList.add('hidden');
      }
      else if(this.sNewRend === 'detach'){
        this.obOffCanvasRemove[0].removeAttribute('open');
        this.obContainerRend = this.obNav.removeChild(this.obOffCanvasRemove[0]);
      }else{
        this.obOffCanvasRemove[0].remove();
      }
    }, 400);
  }

  clearEvents(){
    document.removeEventListener('keydown', this.obEvents[0]);
    this.obNav.removeEventListener('mouseup', this.obEvents[1]);
    this.obNav.removeEventListener('click', this.obEvents[2]);
    this.clear();
  }

  clear(){
    this.initAnimClose();
    this.animClose();
  }

  activeOffCanvas(){
    this.initOffCanvas();
    this.initScrollWidth();
    this.initAnimOpen();
  }

  showMethod(){
    this.obShow[0].addEventListener("click", () => {
      this.activeOffCanvas();    
      setTimeout(()=>{
        if(!this.obShow[0].dataset.tags){
          this.initEvents();
        }
      }, 10)
    })
  }

  static make(container) {
    const obContainer = document.getElementsByClassName(`${container}`);
    Array.from(obContainer).forEach(function(e) {
      const containerNav = new offCanvas(e);
      containerNav.showMethod();
    });
  }
}
offCanvas.make('_off-canvas')
