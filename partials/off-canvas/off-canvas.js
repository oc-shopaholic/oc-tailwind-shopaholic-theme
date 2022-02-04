import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export default class offCanvas {
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
  }

  initOffCanvas(){
    this.$vTemplateNav = this.$vNav.find("._offCanvasTemplate");
    this.$vTemplate = this.$vTemplateNav[0].content.cloneNode(true);
    $(this.$vTemplate).appendTo(this.$vNav);

    this.$sDialog = document.querySelectorAll('._offCanvasContainer')[0];
    dialogPolyfill.registerDialog(this.$sDialog);
    this.$sDialog.showModal();

    $('body').css('overflow-y', 'hidden')
    $('body').css('padding-right', this.$sScrollWidth)

    this.$vContainer = this.$vNav.find("._nav");
  }

  initFocus() {
    this.$sFocus = focusTrap.createFocusTrap('._offCanvasContainer');

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
    console.log(scrollWidth)
    console.log(div[0].offsetWidth)
    console.log(div)
    div.remove();

    this.$sScrollWidth = scrollWidth;
  }

  initBackdrop() {
    this.$sBackdrop = this.$vNav.find(".backdrop");
    if(this.$sBackdrop[0]){
      this.$sBackdrop.addClass('fixed top-0 right-0 bg-gray-400')
      this.$sBackdrop.css({
        "left": "0",
        "bottom": "0",
        "opacity": "0.6"
      })
      this.$sDialog.style.minHeight = '100vh';
      this.$sDialog.style.top = '0';
      this.$sDialog.style.right = '0';
      this.$sDialog.style.left = '0';
      this.$sDialog.style.bottom = '0';
      this.$sDialog.style.position = 'fixed';
    }
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

  initAnimOpen(){
    if(this.$vContainer.attr('data-position') === 'bottom'){
      this.$vContainer.css(
        {
          'top': '100%',
          'width': '100%'
        }
      )
    }else{
      this.$vContainer.css(this.$vContainer.attr('data-position'), '-100%');
    }
    this.$vContainer.css('display', 'block')
    this.initBackdrop();
    this.animOpen();
  }

  initAnimClose(){
    if(this.$vContainer.attr('data-position') === 'bottom'){
      this.$vContainer.addClass('block w-full h-full')
      this.$vContainer.css('top', '150%')
    }else{
      this.$vContainer.css(this.$vContainer.attr('data-position'), '-100%');
      this.$vContainer.addClass('block')
    }
  }

  animOpen(){
    setTimeout(() => {
      if(this.$vContainer.attr('data-position') === 'bottom'){
        this.$vContainer.css('top', '50%');
      }else{
        this.$vContainer.css(this.$vContainer.attr('data-position'), '0');
      }
      this.initFocus()
    }, 100);
  }

  animClose(){
    setTimeout(() => {
      $('body').css('overflow-y', 'auto')
      $('body').css('padding-right', '0')
      this.$sFocus.deactivate()
      this.$vOffCanvasRemove = this.$vNav.find('._offCanvasContainer');
      this.$vOffCanvasRemove.remove();
    }, 400);
  }

  clearEvents(){
    $(this.$vNav).off();
    $(document).off();
    this.clear();
  }

  clear(){
    this.initAnimClose();
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
      const containerNav = new offCanvas($(this));
      containerNav.showMethod();
    });
  }
}
offCanvas.make('._off-canavas')
