export default new class Tags{
    constructor(){
        this.obTags = document.getElementsByClassName('_tags');
        this.obTagsContainer = this.obTags[0].querySelectorAll('._tags-container')[0];
        this.obFilterDetails = document.getElementsByClassName('_filter-details');
        this.obResetAll = this.obTags[0].querySelectorAll('._reset-all-tags')[0];
        this.obFilter = document.getElementsByClassName('_filter')[0];
        this.obFilterButton = this.obFilter.querySelectorAll('._show')[0];
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
        for (let tag of document.getElementsByClassName('_tags')) {
            this.obTags = tag;
            this.obTagsContainer = tag.querySelectorAll('._tags-container')[0];
            this.obTagsContainer.innerHTML = '';
            for(let i = 0; i < this.nAmountProperties; i++){
                for(let j = 0; j < this.obFilterDetails.length; j++){
                    if(this.obFilterProperties[i]  && this.obFilterDetails[j].id === this.obFilterProperties[i].id){

                        let id = this.obFilterDetails[j].id;
                        let section = document.getElementById(id).querySelectorAll('summary')[0].innerText.trim();
                        for(let g = 0; g < this.obFilterProperties[i].value[0].length; g++){

                            let text = this.obFilterProperties[i].value[0][g];
                            let tag = document.createElement('li');
                            tag.className = 'whitespace-nowrap capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
                            tag.innerHTML = '' + section + ': ' + text + ' <button class="_delete-tag text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + this.obFilterProperties[i].value[0][g] + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>'
                            // let tag = document.createElement('<li class="whitespace-nowrap capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm">' + section + ': ' + text + ' <button class="_delete-tag text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + this.obFilterProperties[i].value[0][g] + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button></li>');
                            this.obTagsContainer.appendChild(tag);
                        }
                    }
                }
            }
            if(this.obTagsContainer.childElementCount > 0){
                this.obTags.classList.remove('hidden');
            }
        }
    }

    removeTag(){
        for (let tag of document.querySelectorAll('._delete-tag')) {
            tag.addEventListener('click', (elem)=>{
                this.obFilterDetails = document.getElementsByClassName('_filter-details');
                document.getElementById(`${elem.target.closest('._delete-tag').dataset.id}`).removeAttribute('checked');
                document.getElementById(`${elem.target.closest('._delete-tag').dataset.id}`).dispatchEvent(
                new InputEvent('change', {
                    bubbles: true,
                    cancelable: true,
                }));
                if(this.obTagsContainer.childElementCount <= 1){
                    this.obTags.classList.add('hidden');
                }
            });
        }
    }

    removeAllTags(){
        for (let resetAll of document.querySelectorAll('._reset-all-tags')) {
            resetAll.addEventListener('click', (elem)=>{
                let url = window.location.href.split('?')[0];
                window.location.href = url;
            });
        }
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
        var target = document.getElementsByClassName('_sorting')[0];

        const config = {
            childList: true,
        };

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    app.initTags();
                    if(app.obTagsContainer.childElementCount < 1){
                        app.obTags.classList.add('hidden');
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }

    initFilter(){
        this.obFilterButton.addEventListener('click', ()=>{
            this.mobile();
            this.initTags();
            if(this.bRepetition){
                this.obFilterButton.removeAttribute('data-tags');
                document.getElementsByClassName('_offCanvasContainer')[0].classList.remove('hidden');
            }
        })
    }

    mobile(){
        this.obTags = document.getElementsByClassName('_tags')[0];
        this.obTagsContainer = this.obTags.querySelectorAll('._tags-container')[0];
        this.obFilterDetails = document.getElementsByClassName('_filter-details');
        this.obResetAll = this.obTags.querySelectorAll('._reset-all-tags')[0];
        this.obFilter = document.getElementsByClassName('_filter')[0];
        this.obFilterButton = this.obFilter.querySelectorAll('._show')[0];

        this.nAmountProperties = null;
        this.obFilterProperties = [];
    }

    init(){
        if(window.innerWidth <= 768){
            this.obFilterButton.dispatchEvent(
                new InputEvent('click', {
                  bubbles: true,
                  cancelable: true,
              }));
            this.obFilterDetails = document.getElementsByClassName('_filter-details');
            this.bRepetition = true;
            this.obFilterButton.setAttribute('data-tags', true);
            this.obFilterButton.setAttribute('data-show', true);
            document.getElementsByClassName('_offCanvasContainer')[0].classList.add('hidden');

            this.initTags();
            this.watchCatalog();
            this.initFilter();
        }else{
            this.obFilterDetails = document.getElementsByClassName('_filter-details');

            this.initTags();
            this.watchCatalog();
            this.initFilter();
        }
    }
}
