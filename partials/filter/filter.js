export default class Filter{
    constructor(){
        this.obContainer = null;
        this.obTemplate = null;
        this.obFilterRange = null;
        this.obFilterDetails = null;

        this.sUrl = null;
        this.nAmountProperties = null;
        this.obLocalContainer = null;
        this.obShow = null
        this.obFilterProperties = [];

        this.init();
    }

    init(){
        if(!document.getElementsByClassName('_filter')[0]) return
        this.obContainer = document.getElementsByClassName('_filter')[0];
        this.obTemplate = this.obContainer.querySelectorAll('._filterTemplate');
        this.obShow = this.obContainer.querySelectorAll('._show');

        this.adaptation();
        this.variationInit();
    }

    adaptation(){ 
        if(window.innerWidth >= '768' && this.obContainer && this.obContainer.childElementCount <= 2){
            this.obLocalContainer = this.obTemplate;

            const obLocalNodeContainer = this.obLocalContainer[0].content.cloneNode(true);

            this.obContainer.appendChild(obLocalNodeContainer);
        }
    }

    variationInit(){
        if(window.innerWidth <= '768' && this.obContainer){
            this.initAutocompleteFilters();
            this.obShow[0].addEventListener('click', () => {
                this.initAutocompleteFilters();
            })
        }else{
            this.initAutocompleteFilters();
        }
    }

    propertyСount(){
        for (let i = 0; i < this.sUrl.length; i++){
            const searchSeparator = this.sUrl[i].indexOf('=');
            if(searchSeparator === 0){
                this.nAmountProperties++;
            }
        }
    }

    linkSorting(){
        const exceptions = ['property', 'price'];
        const regProp = new RegExp(exceptions[0], "g");
        const regPrice = new RegExp(exceptions[1], "g");

        if(!this.sUrl) return
        
        this.sUrl = this.sUrl.split('?')[1]

        for (let i = 0; i < this.nAmountProperties; i++){
            const properties = this.sUrl.replace(regProp, '').replace(regPrice, '').split('&')[i];
            let propertiesId = properties.split('=')[0];
            const propertiesValues = properties.split('=')[1];
            const min = propertiesValues.split('|')[0];
            const max = propertiesValues.split('|')[1];
            if(propertiesId !== ''){
                propertiesId = propertiesId.replace('[', '').replace(']', '')
                this.obFilterProperties.push({id: propertiesId, min: min, max: max})
            }
        }
    }

    autocompleteFilters(){
        for (let i = 0; i < this.obFilterProperties.length; i++){
            const app = this;
            this.obFilterRange.forEach(function (elem) {
                const filterId = elem.dataset.filterId;
                if(filterId === app.obFilterProperties[i].id){
                    elem.querySelectorAll('._min')[0].value = app.obFilterProperties[i].min;
                    elem.querySelectorAll('._max')[0].value = app.obFilterProperties[i].max;
                }
            });
            this.obFilterDetails.forEach(function (elem) {
                const filterId = elem.id;
                if(filterId === app.obFilterProperties[i].id){
                    elem.setAttribute('open', '')
                    elem.querySelectorAll('summary')[0].classList.add('after:transition-none');
                    setTimeout(()=>{
                        elem.querySelectorAll('summary')[0].classList.remove('after:transition-none');
                    }, 100)
                }
            });
        }
    }

    initAutocompleteFilters(){
        this.sUrl = location.search;
        this.nAmountProperties = 0;
        this.obFilterProperties = [];
        this.obFilterRange = this.obContainer.querySelectorAll('._filter-range');
        this.obFilterDetails = this.obContainer.querySelectorAll('._filter-details');
        this.propertyСount();
        this.linkSorting();
        this.autocompleteFilters();
    }
}
