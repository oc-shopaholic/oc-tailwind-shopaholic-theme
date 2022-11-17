export default class Toggle{
    constructor(app){
        this.obApp = app;
        this.obToggle = this.obApp.find('._button-toggle');
        this.obContent = this.obApp.find('._toggle-content');
        this.obArrow = this.obApp.find('._arrow');
        this.obStatus = this.obApp.find('._status');

        this.obHideText = null;
        this.obShowText = null;
    }

    changeArrow(state){
        if(state){
            this.obArrow.addClass('rotate-180');
        }else{
            this.obArrow.removeClass('rotate-180');
        }
    }

    changeText(state){
        if(state && $(window).width() > '1024' && this.obApp){
            this.obStatus.text(this.obHideText);
        }else if($(window).width() < '1024' && this.obApp){
            this.changeTextMobail(state)
        }else{
            this.obStatus.text(this.obShowText);
        }
    }

    changeTextMobail(state){
        if(state){ 
            this.obStatus.text(this.obHideText + (this.obContent.find('ul._toggle-list').children().length > 1 ? ' (' + this.obContent.find('ul._toggle-list').children().length + ')' : ''));
        }else{
            this.obStatus.text(this.obHideText + (this.obContent.find('ul._toggle-list').children().length > 1 ? ' (' + this.obContent.find('ul._toggle-list').children().length + ')' : ''));
        }
    }

    changeColorText(state){
        if($(window).width() > '1024' || !this.obApp) return;

        if(state){ 
            this.obStatus.addClass('text-gray-900');
        }else{
            this.obStatus.removeClass('text-gray-900');
        }
    }

    changeExpanded(state){
        if(state){
            this.obToggle.attr('aria-expanded', true);
        }else{
            this.obToggle.attr('aria-expanded', false);
        }
    }

    toggle(){
        this.obToggle.on('click', ()=>{
            if(this.obContent.hasClass('hidden')){
                this.obContent.removeClass('hidden');
                this.changeArrow(true);
                this.changeText(true);
                this.changeExpanded(true);
                this.changeColorText(true);
            }else{
                this.obContent.addClass('hidden');
                this.changeArrow(false);
                this.changeText(false);
                this.changeExpanded(false);
                this.changeColorText(false);
            }
        })
    }

    clearEvents(){
        $(this.obToggle).off(); 
    }

    checkWindow(){
        $(document).ready(() => {
            if($(window).width() < '1024' && this.obApp){
                this.obHideText = window.stateButton.orders_count;
                this.obShowText = window.stateButton.orders_count;
                this.changeTextMobail(true);
            }else{
                this.obHideText = window.stateButton.hide_order;
                this.obShowText = window.stateButton.show_order;
            }
        })
    }

    init(){
        this.clearEvents();
        this.checkWindow();
        this.toggle();
    }

    static make(container) {
        $(container).each(function(e) {
          const containerNav = new Toggle($(this));
          containerNav.init();
        });
    }
}

