import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export default class Modal{
    constructor(app) {
        this.$vNav = app;
        this.$vShow = this.$vNav.find("._show");
        this.$vContainer = null;
        this.$vTemplateNav = null;
        this.$vTemplate = null;
        this.$vOffCanvasRemove = null;
        this.$sDialog = null;
        this.$sScrollWidth = null;
        this.$sBackdrop = null;
        this.$sFocus = null;
        this.$sContainerRend = null;
        this.newRend = false;
    }

    initOffCanvas(){
        this.$vTemplateNav = this.$vNav.find("._modalTemplate");
        this.$vTemplate = this.$vTemplateNav[0].content.cloneNode(true);
        $(this.$vTemplate).appendTo(this.$vNav);
        this.$sContainerRend = this.$vNav.find('._modalContainer');
        this.$sDialog = document.querySelectorAll('._modalContainer')[0];
        dialogPolyfill.registerDialog(this.$sDialog);
        this.$sDialog.showModal();
    
        $('body').css('overflow-y', 'hidden')
        $('body').css('padding-right', this.$sScrollWidth)
    
        this.$vContainer = this.$vNav.find("._nav");
    }

    initFocus() {
        this.$sFocus = focusTrap.createFocusTrap('._modalContainer');

        this.$sFocus.activate()
    }

    initScrollWidth() {
        let div = $("<div></div>");
    
        div.css({
         "overflow-y": "scroll",
         "width": "50px",
         "height": "50px"
        })
    
        $('body').append(div)
    
        let scrollWidth = div[0].offsetWidth - div[0].clientWidth;
        div.remove();
    
        this.$sScrollWidth = scrollWidth;
    }

    initEvents(){
        let app = this;
        $(document).keydown(function(e) {
          if (e.keyCode === 27) {
            app.clearEvents();
          }   
        });
        
        $(this.$vNav).mouseup(function (e){ 
          if (!app.$vContainer.is(e.target) && app.$vContainer.has(e.target).length === 0) {
            app.clearEvents();
          }
        });
    
        this.$vNav.on('click', '._hide', function(){ 
          app.clearEvents();
        });
    }

    clearEvents(){
        $(this.$vNav).off();
        $(document).off();
        this.clear();
    }
    
    initAnimOpen(){
        this.initFocus();
    }

    animClose(){
        $('body').css('overflow-y', 'auto');
        $('body').css('padding-right', '0');
        this.$sFocus.deactivate();
        this.$vOffCanvasRemove = this.$vNav.find('._modalContainer');
        this.$vOffCanvasRemove.remove();
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
        this.$vShow.on("click", () => {
          this.activeOffCanvas();
          this.initEvents();
        })
    }
    
    static make(container) {
        $(container).each(function(e) {
          const containerNav = new Modal($(this));
          containerNav.showMethod();
        });
    }
}
Modal.make('._modal')
