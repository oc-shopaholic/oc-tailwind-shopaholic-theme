export default new class Filter {
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = $("._filterTemplate");

        this.vContainer = null;

        this.test();
    }

    test(){
        if($(window).width() >= '768' && this.$vContainer.length){
            console.log('okay')
            this.vContainer = this.$vTemplate;
            let container = this.vContainer[0].content.cloneNode(true);
            $(container).appendTo(this.$vContainer);
        }
    }
}();
