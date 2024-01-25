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


  setTemplateValue(id, text) {
    let clone = document.querySelector('#tag-template-container').content.cloneNode(true);
    clone.querySelector('li').dataset.name = id
    clone.querySelector('span').innerText = text
    this.obTagsContainer.appendChild(clone)
  }
  createTagsPrice (props) {
    let id = props.id
    let section = document.getElementById(id).querySelector('summary').innerText.trim()
    if (!props.value.join('')) return false
    const text = this.getTextTagsPrice(props.value)
    const textTemplateValue = section + ': ' + text
    this.setTemplateValue(id, textTemplateValue)
  }

  createTagsFiltres (props) {
    let id = props.id
    const elemsDetails = document.getElementById(id)
    if(!elemsDetails) return false
    console.log("props")
    console.log(props)
    let section =  props.id == 'sale' ?  document.querySelector('label[for="sale"]') : elemsDetails.querySelector('summary')
    const sectionText = section.innerText.trim()
    props.value.forEach(prop => {
      let text = document.querySelector(`[for="${prop}"]`)
      const textTemplateValue =  `${text ? sectionText + ': ' : sectionText } ${text ? text.innerText : ''}`
      this.setTemplateValue(id, textTemplateValue)
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
          const tagElementId =  document.getElementById(`${elem.target.closest('._delete-tag').dataset.name}`)
          tagElementId.checked = false
          tagElementId.dispatchEvent(
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
