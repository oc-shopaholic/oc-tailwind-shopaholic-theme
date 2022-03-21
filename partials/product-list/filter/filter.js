export default new class Filter{
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = this.$vContainer.find("._filterTemplate");

        this.vContainer = null;

        this.testo();
    }

    testo(){   
        if($(window).width() >= '768' && this.$vContainer.length){
            this.vContainer = this.$vTemplate;
            let container = this.vContainer[0].content.cloneNode(true);
            $(container).appendTo(this.$vContainer);
        }
    }
}();

