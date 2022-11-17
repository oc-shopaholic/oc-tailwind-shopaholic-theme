export default new class accountDetails{
    constructor(){
        this.test = null;
        this.testtwo = $('._very-test-button');
        this.init();
    }

    qq(){
        $('._very-test-link').on('click', ()=>{
            $.request('onAjax', {
                update: { 'account-details/user-info': '._test-container' },
                complete: () => {
                    this.testtwo = $('._very-test-button');
                    this.init();
                },
            });
        })
    }

    init(){
        this.testtwo.on('click', ()=>{
            console.log('go')
            $('._qwer').request('UserAddress::onAdd', {
                update: { 'account-details/contact-information': '._test-container' },
                complete: () => {
                    this.test = $('._very-test-link');
                    this.qq();
                },
            })
        })
    }
}
