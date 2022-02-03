import dialogPolyfill from 'dialog-polyfill'
import * as focusTrap from 'focus-trap'

export default new class offCanvas {
  constructor() {
    this.initialization();
  }

  initialization(){
    $("._container-nav").each(function(){
        let $vNav = $(this);
        let $vShow = $vNav.find("._show");
        let $vContainer = null;
        let $vTemplateNav = null;
        let $vTemplate = null;
        let $vOffCanvasRemove = null;
        let $sDialog = null;
        let $sScrollWidth = null;
        let $sBackdrop = null;
        let $sFocus = null;

        function initOffCanvas(){
          $vTemplateNav = $vNav.find("._offCanvasTemplate");
          $vTemplate = $vTemplateNav[0].content.cloneNode(true);
          $($vTemplate).appendTo($vNav);

          $sDialog = document.querySelectorAll('._offCanvasContainer')[0];
          dialogPolyfill.registerDialog($sDialog);
          $sDialog.showModal();

          $('body').css('overflow-y', 'hidden')
          $('body').css('padding-right', $sScrollWidth)

          $vContainer = $vNav.find("._nav");
        }

        function initFocus() {
          $sFocus = focusTrap.createFocusTrap('._offCanvasContainer');

          $sFocus.activate()
        }

        function initScrollWidth() {
          let div = document.createElement('div');

          div.style.overflowY = 'scroll';
          div.style.width = '50px';
          div.style.height = '50px';

          document.body.append(div);

          let scrollWidth = div.offsetWidth - div.clientWidth;

          div.remove();

          $sScrollWidth = scrollWidth;
        }

        function initBackdrop() {
          $sBackdrop = $vNav.find(".backdrop");
          if($sBackdrop[0]){
            $sBackdrop.addClass('fixed top-0 right-0 bg-gray-400')
            $sBackdrop.css({
              "left": "0",
              "bottom": "0",
              "opacity": "0.6"
            })
            $sDialog.style.minHeight = '100vh';
            $sDialog.style.top = '0';
            $sDialog.style.right = '0';
            $sDialog.style.left = '0';
            $sDialog.style.bottom = '0';
            $sDialog.style.position = 'fixed';
          }
        }

        function initEvents(){
          $(document).keyup(function(e) {
            if (e.keyCode == 27) {
              clearEvents();
            }   
          });
          
          $($vNav).mouseup(function (e){ 
            if (!$vContainer.is(e.target) && $vContainer.has(e.target).length === 0) {
              clearEvents();
            }
          });

          $vNav.on('click', '._hide', function(){ 
            clearEvents();
          });
        }

        function initAnimOpen(){
          if($vContainer.attr('data-position') === 'bottom'){
            $vContainer.css(
              {
                'top': '100%',
                'width': '100%'
              }
            )
          }else{
            $vContainer.css($vContainer.attr('data-position'), '-100%');
          }
          $vContainer.css('display', 'block')
          initBackdrop();
          animOpen();
        }

        function initAnimClose(){
          if($vContainer.attr('data-position') === 'bottom'){
            $vContainer.addClass('block w-full h-full')
            $vContainer.css('top', '150%')
          }else{
            $vContainer.css($vContainer.attr('data-position'), '-100%');
            $vContainer.addClass('block')
          }
        }

        function animOpen(){
          setTimeout(() => {
            if($vContainer.attr('data-position') === 'bottom'){
              $vContainer.css('top', '50%');
            }else{
              $vContainer.css($vContainer.attr('data-position'), '0');
            }
            initFocus()
          }, 100);
        }

        function animClose(){
          setTimeout(() => {
            $('body').css('overflow-y', 'auto')
            $('body').css('padding-right', '0')
            $sFocus.deactivate()
            $vOffCanvasRemove = $vNav.find('._offCanvasContainer');
            $vOffCanvasRemove.remove();
          }, 400);
        }

        function clearEvents(){
          $($vNav).off();
          $(document).off();
          clear();
        }
      
        function clear(){
          initAnimClose();
          animClose();
        }

        function activeOffCanvas(){
          initScrollWidth();
          initOffCanvas();
          initAnimOpen();
        }

        $vShow.on("click", () => {
          activeOffCanvas();
          initEvents();
        })
    });
  }
}
