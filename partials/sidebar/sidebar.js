export default new class Sidebar {
    constructor() {
        this.initialization();
    }
    
    initialization(){
      $("._container-nav").each(function(){
          let $vNav = $(this);
          let $vShow = $vNav.find("._show");
          let $vHide = $vNav.find("._hide");
          let $vContainer = $vNav.find("._nav");
          let $vBackdrop = $vNav.find("._backdrop");

          (function(){
            initSidebar()
          })();
        
          function initSidebar(){
            if($vContainer.attr('data-side') === 'bottom'){
                $vContainer.css({
                    'top': '100%',
                    'width': '100%',
                    'height': '100%',
                    'display': 'block'
                });
            }else {
                $vContainer.css($vContainer.attr('data-side'), '-100%');
                $vContainer.css('display', 'block')
            }
            $vBackdrop.css('display', 'none')
          }

          function activeSidebar(){
            if($vContainer.attr('data-side') === 'bottom'){
                $vContainer.css('top', '50%')
            }else{
                $vContainer.css($vContainer.attr('data-side'), '0')
            }
            $vBackdrop.css('display', 'block')
            $vContainer.css('display', 'block')
          }

          function clearHandlers(){
            $($vNav).off();
            $(document).off();
          }
        
          $vShow.on("click", () => {
            activeSidebar()
            
            clearHandlers()
            
            $(document).keyup(function(e) {
              if (e.keyCode == 27) {
                clearHandlers()
                initSidebar()
              }   
            });
            
            $($vNav).mouseup(function (e){ 
                if (!$vContainer.is(e.target) && $vContainer.has(e.target).length === 0) {
                  clearHandlers()
                  initSidebar()
                }
              });
          })
        
          $vHide.on("click", () => {
             clearHandlers()
             initSidebar()
          })
      });
    }
  }
