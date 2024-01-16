import UrlGeneration from '@lovata/url-generation'
import { AccordionInit } from '../accordion/accordion'
export default new class Tags {
  constructor () {
    this.obTags = document.getElementsByClassName('_tags')
    this.obTagsContainer = this.obTags[0].querySelectorAll('._tags-container')[0]
    this.obFilterDetails = document.getElementsByClassName('_filter-details')[0]
    this.obResetAll = this.obTags[0].querySelectorAll('._reset-all-tags')[0]
    this.obFilter = document.getElementsByClassName('_filter')[0]
    this.obFilterButton = this.obFilter.querySelectorAll('._show')[0]
    this.obFilterButtonHide = null

    this.sUrl = null
    this.nAmountProperties = null
    this.bRepetition = false
    this.obFilterProperties = []
    this.init()
  }

  propertyCount () {
    const params = Object.keys(UrlGeneration.obParamList)
    this.nAmountProperties = params ? params.length : 0
  }

  linkSorting () {
    let exceptions = 'property'
    let regProp = new RegExp(exceptions, 'g')

    if (!this.sUrl) return
    this.sUrl = this.sUrl.split('?')[1]
    for (let i = 0; i < this.nAmountProperties; i++) {
      let properties = this.sUrl.replace(regProp, '').split('&')[i]
      let propertiesId = properties.split('=')[0]
      let propertiesValues = properties.split('=')[1]
      if (propertiesId !== '' && propertiesId !== 'sort') {
        propertiesId = propertiesId.replace('[', '').replace(']', '')
        propertiesValues = propertiesValues.split('|')
        this.obFilterProperties.push({ id: propertiesId, value: [propertiesValues] })
      }
    }
  }

  paramsList () {
    const paramsList = []
    const paramList = UrlGeneration.obParamList
    for (const paramListElement in paramList) {
      let key = paramListElement

      if (key.indexOf('property') >= 0) {
        key = key.replace('property[', '')
        key = key.replace(']', '')
      }
      paramsList.push({
          id: key,
          value: paramList[paramListElement]
        }
      )
    }
    return paramsList
  }

  createTags () {
    this.obTags = document.querySelector('._tags')
    this.obTagsContainer = document.querySelector('._tags-container')
    this.obTagsContainer.innerHTML = ''
    const params = this.paramsList()
    params.forEach((props, key) => {
      if (props.id == 'price') {
        // TODO: rewrite for multiple elements
        this.createTagsPrice(props)
      } else {
        this.createTagsFiltres(props)
      }
    })
    if (this.obTagsContainer.childElementCount > 0) {
      this.obTags.classList.remove('hidden')
    }
  }

  getTextTagsPrice (value) {
    let text
    const elementPrice = document.querySelector('#price')
    if (!value[0] && value[1]) {
      text = elementPrice.dataset.translateTo + ' ' + value[1]
    } else if (value[0] && !value[1]) {
      text = elementPrice.dataset.translateFrom + ' ' + value[0]
    } else {
      text = value[0] + '-' + value[1]
    }
    return text
  }

  createTagsPrice (props) {
    let id = props.id
    let section = document.getElementById(id).querySelector('summary').innerText.trim()
    if (!props.value.join('')) return false
    const text = this.getTextTagsPrice(props.value)
    let tag = document.createElement('li')
    tag.dataset.name = id
    tag.className = 'whitespace-nowrap mr-3 mb-3 capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm'
    tag.innerHTML = '' + section + ': ' + text + ' <button class="_delete-tag text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + id + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>'
    this.obTagsContainer.appendChild(tag)
  }

  createTagsFiltres (props) {
    let id = props.id
    let section = document.getElementById(id).querySelector('summary').innerText.trim()
    props.value.forEach(prop => {
      let text = document.querySelector(`[for="${prop}"]`).innerText
      let tag = document.createElement('li')
      tag.dataset.name = prop
      tag.className = 'whitespace-nowrap mr-3 mb-3 capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm'
      tag.innerHTML = '' + section + ': ' + text + ' <button class="_delete-tag text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + prop + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>'
      // let tag = document.createElement('<li class="whitespace-nowrap capitalize bg-white rounded shadow py-3 pl-3 pr-5 flex items-center justify-between text-gray-600 text-base lg:text-sm">' + section + ': ' + text + ' <button class="_delete-tag text-gray-900 p-2 -m-2 ml-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id=' + prop.value[0][g] + '>' + '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button></li>');
      this.obTagsContainer.appendChild(tag)
    })
  }

  removeTag () {
    const tags = document.querySelectorAll('._delete-tag')
    for (let tag of tags) {
      tag.addEventListener('click', (elem) => {
        if (tag.dataset.id == 'price') {
          // TODO: rewrite for multiple elements
          const inputs = document.querySelectorAll('#price ._shopaholic-price-filter')
          inputs.forEach(input => {
            input.value = ''
            input.dispatchEvent(
              new InputEvent('change', {
                bubbles: true,
                cancelable: true,
              }))
          })
        } else {
          document.getElementById(`${elem.target.closest('._delete-tag').dataset.id}`).removeAttribute('checked')
          document.getElementById(`${elem.target.closest('._delete-tag').dataset.id}`).dispatchEvent(
            new InputEvent('change', {
              bubbles: true,
              cancelable: true,
            }))
        }
        if (this.obTagsContainer.childElementCount <= 1) {
          this.obTags.classList.add('hidden')
        }
      })
    }
  }

  removeAllTags () {
    for (let resetAll of document.querySelectorAll('._reset-all-tags')) {
      resetAll.addEventListener('click', (elem) => {
        let url = window.location.href.split('?')[0]
        window.location.href = url
      })
    }
  }

  initTags () {
    this.sUrl = location.search
    this.propertyCount()
    this.linkSorting()
    this.createTags()
    this.removeTag()
    this.removeAllTags()
    AccordionInit();
  }

  watchCatalog () {
    let app = this
    var target = document.getElementsByClassName('_sorting')[0]

    const config = {
      childList: true,
    }

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          app.initTags()
          if (app.obTagsContainer.childElementCount < 1) {
            app.obTags.classList.add('hidden')
          }
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(target, config)
  }

  initFilter () {
    this.obFilterButton.addEventListener('click', () => {
      this.mobile()
      this.initTags()
      if (this.bRepetition) {
        this.obFilterButton.removeAttribute('data-tags')
        document.getElementsByClassName('_offCanvasContainer')[0].classList.remove('hidden')
      }
    })
  }

  mobile () {
    this.obTags = document.getElementsByClassName('_tags')[0]
    this.obTagsContainer = this.obTags.querySelectorAll('._tags-container')[0]
    this.obResetAll = this.obTags.querySelectorAll('._reset-all-tags')[0]
    this.obFilter = document.getElementsByClassName('_filter')[0]
    this.obFilterButton = this.obFilter.querySelectorAll('._show')[0]

    this.nAmountProperties = null
    this.obFilterProperties = []
  }

  init () {
    if (window.innerWidth <= 768) {
      this.obFilterButton.dispatchEvent(
        new InputEvent('click', {
          bubbles: true,
          cancelable: true,
        }))
      this.bRepetition = true
      this.obFilterButton.setAttribute('data-tags', true)
      this.obFilterButton.setAttribute('data-show', true)
      document.getElementsByClassName('_offCanvasContainer')[0].classList.add('hidden')

      this.initTags()
      this.watchCatalog()
      this.initFilter()
    } else {
      this.obFilterDetails = document.getElementsByClassName('_filter-details')

      this.initTags()
      this.watchCatalog()
      this.initFilter()
    }
  }
}
