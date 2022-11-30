import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export default class Modal{
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
      this.obEvents = [];
    }

    initOffCanvas(){
      this.obTemplateNav = this.obNav.querySelectorAll("._modalTemplate");
      this.obTemplate = this.obTemplateNav[0].content.cloneNode(true);
      this.obNav.appendChild(this.obTemplate);
      this.obDialog = document.querySelectorAll('._modalContainer')[0];
      
      dialogPolyfill.registerDialog(this.obDialog);
      this.obDialog.showModal();

      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = this.sScrollWidth + 'px';

  
      this.obContainer = this.obNav.querySelectorAll("._nav");
    }

    initFocus() {
      this.obFocus = focusTrap.createFocusTrap('._modalContainer');

      this.obFocus.activate()
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

    clearEvents(){
      document.removeEventListener('keydown', this.obEvents[0]);
      this.obNav.removeEventListener('mouseup', this.obEvents[1]);
      this.obNav.removeEventListener('click', this.obEvents[2]);
      this.clear();
    }
    
    initAnimOpen(){
      this.initFocus();
    }

    animClose(){
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0px';
      this.obFocus.deactivate();
      this.obOffCanvasRemove = this.obNav.querySelectorAll('._modalContainer');
      this.obOffCanvasRemove[0].remove();
    }

    clear(){
      this.animClose();
    }
    
    activeOffCanvas(){
      this.initScrollWidth();
      this.initOffCanvas();
      this.initAnimOpen();
    }

    showMethod(){
      this.obShow[0].addEventListener("click", () => {
        this.activeOffCanvas();    
        this.initEvents();
      })
    }
    
    static make(container) {
      const obContainer = document.getElementsByClassName(`${container}`);
      Array.from(obContainer).forEach(function(e) {
        const containerNav = new Modal(e);
        containerNav.showMethod();
      });
    }
}
