export default new class productReviewRating {
    constructor(){
        this.obContainerStarReview = null;
        this.obContainerReview = null;

        this.obShow = $('._off-canvas._write-review ._show');
        this.obShowParents = $('._review-list-container ._show');
        this.obShowImitation = null;
        this.nActive = null;

        this.obListWrapper = '_review-list-update';
        this.sActiveStar = '#F59E0B';
        this.sDefaultStar = '#D1D5DB';
        this.init();
    }

    sendReview(){
        this.obContainerReview = $('._review-container button');
        $(this.obContainerReview).on('click', (event) => {
            event.preventDefault();

            const form = document.querySelector('._review-container');
  
            $(form).request('MakeReview::onCreate', {
                update: {
                    'review-list/review-list-ajax': `.${this.obListWrapper}`
                },
                complete: ()=> {
                    location.reload(true);
                }
            });
        });
    }

    starState(state, count){
       if(state){
            for(let i = 0; count > i; i++){
                this.obContainerStarReview[i].querySelectorAll('path')[0].style.fill = this.sActiveStar;
            }
       }else{
            for(let i = 0; count > i; i++){
                this.obContainerStarReview[i].querySelectorAll('path')[0].style.fill = this.sDefaultStar;
            }
       }
    }

    starSelect(){
        const app = this;
        this.obContainerStarReview.on('click', function(){
            let active = Number($(this).attr('data-rating'));
            if(active < app.nActive){
                app.starState(false, app.nActive);
                app.starState(true, active);
            }else{
                app.starState(true, active);
            }
            app.nActive = active;
        })
    }

    windowHover(){
        const app = this;
        $(window).hover(function(e){
            if(!app.obContainerStarReview.is(e.target) && app.obContainerStarReview.has(e.target).length === 0){
                if(app.nActive){
                    app.starState(false, 5);
                    app.starState(true, app.nActive);
                }else{
                    app.starState(false, 5);
                }
            }
        })
    }

    starHover(){
        const app = this;
        this.obContainerStarReview.hover(function(){
            let active = Number($(this).attr('data-rating'));
            app.starState(true, active);
        })
    }

    initEvents(){
        this.windowHover();
        this.starHover();
        this.starSelect();
        this.sendReview();
    }

    init(){
        this.obShowParents.on('click', ()=>{
            this.obShowImitation = $('._review-list-container ._write-review');
            this.obShowImitation.on('click', ()=>{
                $('._review-list-container ._hide').trigger('click');
                setTimeout(()=>{
                    this.obShow.trigger('click');
                }, 400)
            })           
        })
        this.obShow.on('click', ()=>{
            this.obContainerStarReview = $('._container-star-review label');
            this.starState(true, 5);
            this.nActive = 5;
            this.initEvents();
        })
    }
}
