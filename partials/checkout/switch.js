export default new class Switch{
    constructor(){
        this.init();
    }

    init() {
        let active = $('._switch-radio input:checked').attr('data-switch');
        $('._switch-radio').on('click', 'input', (elem) => {
            let oldActive = $('.' + active + '-container');
            oldActive.addClass('hidden');
            oldActive.attr('aria-hidden', true);
            oldActive.find('input').prop('required', false);

            active = elem.target.getAttribute('data-switch');
            let newActive = $('.' + active + '-container');
            newActive.removeClass('hidden');
            newActive.removeAttr('aria-hidden');
            newActive.find('input').prop('required', true)
        })
    }
}
