import dialogPolyfill from 'dialog-polyfill'

export default new class Sidebar {
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
        let $vSidebarRemove = null;
        let sDialog = null;

        function initSidebar(){
          $vTemplateNav = $vNav.find("._sidebarTemplate");
          $vTemplate = $vTemplateNav[0].content.cloneNode(true);
          $($vTemplate).appendTo($vNav);

          sDialog = document.querySelectorAll('._sidebarContainer')[0];
          dialogPolyfill.registerDialog(sDialog);
          sDialog.showModal();

          $('body').css('overflow-y', 'hidden')
          $('body').css('padding-right', '15px')

          $vContainer = $vNav.find("._nav");
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
          if($vContainer.attr('data-side') === 'bottom'){
            $vContainer.css({
              'top': '100%',
              'width': '100%'
            });
          }else{
            $vContainer.css($vContainer.attr('data-side'), '-100%');
          }
          $vContainer.css('display', 'block');
          animOpen();
        }

        function initAnimClose(){
          if($vContainer.attr('data-side') === 'bottom'){
            $vContainer.css({
              'top': '150%',
              'width': '100%',
              'height': '100%',
              'display': 'block'
            });
          }else{
            $vContainer.css($vContainer.attr('data-side'), '-100%');
            $vContainer.css('display', 'block');
          }
        }

        function animOpen(){
          setTimeout(() => {
            if($vContainer.attr('data-side') === 'bottom'){
              $vContainer.css('top', '50%');
            }else{
              $vContainer.css($vContainer.attr('data-side'), '0');
            }
          }, 100);
        }

        function animClose(){
          setTimeout(() => {
            sDialog.close();
            $('body').css('overflow-y', 'auto')
            $('body').css('padding-right', '0')

            $vSidebarRemove = $vNav.find('._sidebarContainer');
            $vSidebarRemove.remove();
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

        function activeSidebar(){
          initSidebar();
          initAnimOpen();
        }

        $vShow.on("click", () => {
          activeSidebar();
          initEvents();
        })
    });
  }
}
