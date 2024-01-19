export default class Toggle{
    constructor(app){
        this.obApp = app;
        this.obToggle = this.obApp.querySelectorAll('._button-toggle')[0];
        this.obContent = this.obApp.querySelectorAll('._toggle-content')[0];
        this.obArrow = this.obApp.querySelectorAll('._arrow')[0];
        this.obStatus = this.obApp.querySelectorAll('._status')[0];
        this.obLoadMore = document.getElementsByClassName('_show-more-orders')[0];

        this.obHideText = null;
        this.obShowText = null;
        this.obEvents = [];
    }

    checkLoad(){
        if(this.obLoadMore){
            this.obLoadMore.addEventListener('click', ()=>{
                this.clearEvents();
            })
        }
    }

    changeArrow(state){
        if(state){
            this.obArrow.classList.add('rotate-180');
        }else{
            this.obArrow.classList.remove('rotate-180');
        }
    }

    changeText(state){
        if(state && window.innerWidth > 1024 && this.obApp){
            this.obStatus.innerText = this.obHideText;
        }else if(window.innerWidth < 1024 && this.obApp){
            this.changeTextMobail(state)
        }else{
            this.obStatus.innerText = this.obShowText;
        }
    }

    changeTextMobail(state){
        if(state){ 
            this.obStatus.innerText = this.obHideText + (this.obContent.querySelectorAll('ul._toggle-list')[0].childElementCount > 1 ? ' (' + this.obContent.querySelectorAll('ul._toggle-list')[0].childElementCount + ')' : '');
        }else{
            this.obStatus.innerText = this.obHideText + (this.obContent.querySelectorAll('ul._toggle-list')[0].childElementCount > 1 ? ' (' + this.obContent.querySelectorAll('ul._toggle-list')[0].childElementCount + ')' : '');
        }
    }

    changeColorText(state){
        if(window.innerWidth > 1024 || !this.obApp) return;

        if(state){ 
            this.obStatus.classList.add('text-gray-900');
        }else{
            this.obStatus.classList.remove('text-gray-900');
        }
    }

    changeExpanded(state){
        if(state){
            this.obToggle.setAttribute('aria-expanded', true);
        }else{
            this.obToggle.setAttribute('aria-expanded', false);
        }
    }

    toggle(){
        let app = this;
        this.obEvents[0] = (function (){
            if(app.obContent.classList.contains('hidden')){
                app.obContent.classList.remove('hidden');
                app.changeArrow(true);
                app.changeText(true);
                app.changeExpanded(true);
                app.changeColorText(true);
            }else{
                app.obContent.classList.add('hidden');
                app.changeArrow(false);
                app.changeText(false);
                app.changeExpanded(false);
                app.changeColorText(false);
            }
        })

        this.obToggle.addEventListener('click', this.obEvents[0])
    }

    clearEvents(){
        this.obToggle.removeEventListener('click', this.obEvents[0])
    }

    checkWindow(){
        if(document.readyState === 'complete'){
            if(window.innerWidth < 1024 && this.obApp){
                this.obHideText = window.stateButton.orders_count;
                this.obShowText = window.stateButton.orders_count;
                this.changeTextMobail(true);
            }else{
                this.obHideText = window.stateButton.hide_order;
                this.obShowText = window.stateButton.show_order;
            }
        };
        document.addEventListener('DOMContentLoaded',  () => {
            if(window.innerWidth < 1024 && this.obApp){
                this.obHideText = window.stateButton.orders_count;
                this.obShowText = window.stateButton.orders_count;
                this.changeTextMobail(true);
            }else{
                this.obHideText = window.stateButton.hide_order;
                this.obShowText = window.stateButton.show_order;
            }
        }, false);
    }

    init(){
        this.checkWindow();
        this.toggle();
        this.checkLoad();
    }

    static make(container) {
        const obContainer = document.getElementsByClassName(`${container}`);
        Array.from(obContainer).forEach(function(e) {
          const containerNav = new Toggle(e);
          containerNav.init();
        });
      }
}

