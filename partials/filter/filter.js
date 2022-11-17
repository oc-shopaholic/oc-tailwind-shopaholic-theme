export default class Filter{
    constructor(){
        this.$vContainer = $("._filter");
        this.$vTemplate = this.$vContainer.find("._filterTemplate");
        this.$vFilterRange = null;
        this.$vFilterDetails = null;

        this.sUrl = null;
        this.nAmountProperties = null;
        this.vLocalContainer = null;
        this.show = $('._show');
        this.vFilterProperties = [];

        this.adaptation();
        this.variationInit();
    }

    adaptation(){
        if($(window).width() >= '768' && this.$vContainer.length && this.$vContainer[0].childElementCount <= 2){
            this.vLocalContainer = this.$vTemplate;
            let container = this.vLocalContainer[0].content.cloneNode(true);
            $(container).appendTo(this.$vContainer);
        }
    }

    variationInit(){
        if($(window).width() <= '768' && this.$vContainer.length){
            this.initAutocompleteFilters();
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
                    $(this).find('._min').val(app.vFilterProperties[i].min);
                    $(this).find('._max').val(app.vFilterProperties[i].max);
                }
            });
            $(this.$vFilterDetails).each(function () {
                let filterId = $(this).attr('id');
                if(filterId === app.vFilterProperties[i].id){
                    $(this).find('summary').addClass('after:transition-none');
                    $(this).attr('open', '');
                    setTimeout(()=>{
                        $(this).find('summary').removeClass('after:transition-none');
                    }, 100)
                }
            });
        }
    }

    initAutocompleteFilters(){
        this.sUrl = location.search;
        this.nAmountProperties = 0;
        this.vFilterProperties = [];
        this.$vFilterRange = this.$vContainer.find('._filter-range');
        this.$vFilterDetails = this.$vContainer.find('._filter-details');
        this.propertyСount();
        this.linkSorting();
        this.autocompleteFilters();
    }
}
