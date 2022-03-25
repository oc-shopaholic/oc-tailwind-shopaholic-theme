export default new class Filter{
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = this.$vContainer.find("._filterTemplate");
        this.$vFilterRange = null;

        this.sUrl = null;
        this.nAmountProperties = null;
        this.vContainer = null;
        this.show = $('._show');
        this.vFilterProperties = [];

        this.adaptation();
        this.variationInit();
    }

    adaptation(){   
        if($(window).width() >= '768' && this.$vContainer.length){
            this.vContainer = this.$vTemplate;
            let container = this.vContainer[0].content.cloneNode(true);
            $(container).appendTo(this.$vContainer);
        }
    }

    variationInit(){
        if($(window).width() <= '768' && this.$vContainer.length){
            this.show.on('click', () => {
                this.initAutocompleteFilters();
            })
        }else{
            this.initAutocompleteFilters();
        }
    }

    propertyСount(){
        for (let i = 0; i < this.sUrl.length; i++){
            let searchSeparator = this.sUrl[i].indexOf('=');
            if(searchSeparator === 0){
                this.nAmountProperties++;
            }
        }
    }

    linkSorting(){
        let exceptions = ['property', 'price'];
        let regProp = new RegExp(exceptions[0], "g");
        let regPrice = new RegExp(exceptions[1], "g");

        if(!this.sUrl) return
        
        this.sUrl = this.sUrl.split('?')[1]

        for (let i = 0; i < this.nAmountProperties; i++){
            let properties = this.sUrl.replace(regProp, '').replace(regPrice, '').split('&')[i];
            let propertiesId = properties.split('=')[0];
            let propertiesValues = properties.split('=')[1];
            let min = propertiesValues.split('|')[0];
            let max = propertiesValues.split('|')[1];
            if(propertiesId !== ''){
                propertiesId = propertiesId.replace('[', '').replace(']', '')
                this.vFilterProperties.push({id: propertiesId, min: min, max: max})
            }
        }
    }

    autocompleteFilters(){
        for (let i = 0; i < this.vFilterProperties.length; i++){
            let app = this;
            $(this.$vFilterRange).each(function () {
                let filterId = $(this).attr('data-filter-id')
                if(filterId === app.vFilterProperties[i].id){
                    $(this).find('._min').val(app.vFilterProperties[i].min)
                    $(this).find('._max').val(app.vFilterProperties[i].max)
                }
            });
        }
    }

    initAutocompleteFilters(){
        this.sUrl = location.search;
        this.nAmountProperties = 0;
        this.$vFilterRange = this.$vContainer.find('._filter-range');
        this.propertyСount();
        this.linkSorting();
        this.autocompleteFilters();
    }
}();

