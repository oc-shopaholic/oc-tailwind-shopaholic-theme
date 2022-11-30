export default new class Tags{
    constructor(){
        this.obTags = $('._tags');
        this.obTagsContainer = this.obTags.find('._tags-container');
        this.obFilterDetails = $('._filter-details');
        this.obResetAll = this.obTags.find('._reset-all');
        this.obFilter = $('._filter');
        this.obFilterButton = this.obFilter.find('._show');
        this.obFilterButtonHide = null;

        this.sUrl = null;
        this.nAmountProperties = null;
        this.bRepetition = false;
        this.obFilterProperties = [];
        this.init();
    }

    propertyСount(){
        this.nAmountProperties = null;
        this.obFilterProperties = [];
        for (let i = 0; i < this.sUrl.length; i++){
            let searchSeparator = this.sUrl[i].indexOf('=');
            if(searchSeparator === 0){
                this.nAmountProperties++;
            }
        }
    }

    linkSorting(){
        let exceptions = 'property';
        let regProp = new RegExp(exceptions, "g");

        if(!this.sUrl) return
        this.sUrl = this.sUrl.split('?')[1]
        for (let i = 0; i < this.nAmountProperties; i++){
            let properties = this.sUrl.replace(regProp, '').split('&')[i];
            let propertiesId = properties.split('=')[0];
            let propertiesValues = properties.split('=')[1];
            if(propertiesId !== '' && propertiesId !== 'sort'){
                propertiesId = propertiesId.replace('[', '').replace(']', '');
                propertiesValues = propertiesValues.split('|');
                this.obFilterProperties.push({id: propertiesId, value: [propertiesValues]});
            }
        }
    }

    createTags(){
        this.obTags = $('._tags');
        this.obTagsContainer = this.obTags.find('._tags-container');
        this.obTagsContainer.find('li').remove();
        for(let i = 0; i < this.nAmountProperties; i++){
            for(let j = 0; j < this.obFilterDetails.length; j++){
                if(this.obFilterProperties[i] && (this.obFilterProperties[i].id === '2' || this.obFilterProperties[i].id === '9') && this.obFilterDetails[j].id === this.obFilterProperties[i].id){
                    let id = this.obFilterDetails[j].id;
                    let section = $(`#${id} summary`).text().trim();

                    for(let g = 0; g < this.obFilterProperties[i].value[0].length; g++){
                        let text = this.obFilterProperties[i].value[0][g];
                        let tag = $('<li class="whitespace-nowrap capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm">' + section + ': ' + text + ' <button class="_delete text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + this.obFilterProperties[i].value[0][g] + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button></li>');
                        this.obTagsContainer.append(tag);
                    }
                }
            }
        }
        if(this.obTagsContainer[0].childElementCount > 0){
            this.obTags.removeClass('hidden');
        }
    }

    removeTag(){
        this.obTags.find('._delete').on('click', (elem)=>{
            this.obFilterDetails = $('._filter-details');
            this.obFilterDetails.find(`#${elem.target.closest('._delete').dataset.id}`).attr('checked', false).trigger('change');
            if(this.obTagsContainer[0].childElementCount <= 1){
                this.obTags.addClass('hidden');
            }
        })
    }

    removeAllTags(){
        this.obResetAll = this.obTags.find('._reset-all');
        this.obResetAll.on('click', ()=>{
            let url = window.location.href.split('?')[0];
            window.location.href = url;
        })
    }

    initTags(){
        this.sUrl = location.search;
        this.propertyСount();
        this.linkSorting();
        this.createTags();
        this.removeTag();
        this.removeAllTags();
    }

    watchCatalog(){
        let app = this;
        var target = $('._sorting')[0];

        const config = {
            childList: true,
        };

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    app.initTags();
                    if(app.obTagsContainer[0].childElementCount < 1){
                        app.obTags.addClass('hidden');
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }

    initFilter(){
        this.obFilterButton.on('click', ()=>{
            this.mobile();
            this.initTags();
            if(this.bRepetition){
                this.obFilterButton.attr('data-tags', null);
                $('._offCanvasContainer').removeClass('hidden');
            }
        })
    }

    mobile(){
        this.obTags = $('._tags');
        this.obTagsContainer = this.obTags.find('._tags-container');
        this.obFilterDetails = $('._filter-details');
        this.obResetAll = this.obTags.find('._reset-all');
        this.obFilter = $('._filter');
        this.obFilterButton = this.obFilter.find('._show');

        this.nAmountProperties = null;
        this.obFilterProperties = [];
    }

    init(){
        this.initTags();
        this.watchCatalog();
        this.initFilter();
        if(($(document).width() + 7) <= '768'){
            this.obFilterButton.trigger('click');
            this.bRepetition = true;
            this.obFilterButton.attr('data-tags', true);
            this.obFilterButton.attr('data-show', true);
            $('._offCanvasContainer').addClass('hidden');
        }
    }
}
