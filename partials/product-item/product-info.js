export default new class productInfo {
    constructor(){
        this.obEvaluation = $('._evaluation');
        this.obRatingScroll = this.obEvaluation.find('._rating');
        this.obReviewScroll = this.obEvaluation.find('._review');
        this.obCustomerRatings = $('#_customer-ratings');
        this.obCustomerReviews = $('#_customer-reviews');
        
        this.init();
    }

    init(){
        console.log('Gogo')
        this.ratingScroll();
        this.reviewScroll();
    }

    ratingScroll(){
        this.obRatingScroll.on('click', ()=>{
            console.log('Rating')
            this.obCustomerRatings[0].scrollIntoView({ behavior: "smooth" });
        })
    }

    reviewScroll(){
        this.obReviewScroll.on('click', ()=>{
            console.log('Review')
            this.obCustomerReviews[0].scrollIntoView({ behavior: "smooth" });
        })
    }
}();
