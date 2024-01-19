export default class Filter{
  constructor () {
    this.obContainer = null
    this.obTemplate = null
    this.obLocalContainer = null
    this.obShow = null

    this.init()
  }

  init () {
    if (!document.getElementsByClassName('_filter')[0]) return
    this.obContainer = document.getElementsByClassName('_filter')[0]
    this.obTemplate = this.obContainer.querySelectorAll('._filterTemplate')
    this.obShow = this.obContainer.querySelectorAll('._show')
    this.adaptation()
    this.initAccordionState()
  }

  adaptation () {
    if (window.innerWidth >= '768' && this.obContainer && this.obContainer.childElementCount <= 2) {
      this.obLocalContainer = this.obTemplate
      const obLocalNodeContainer = this.obLocalContainer[0].content.cloneNode(true)
      this.obContainer.appendChild(obLocalNodeContainer)

    }
  }
  initAccordionState () {
    const filterDetails = document.querySelectorAll('._filter-details')
    if (filterDetails) {
      filterDetails.forEach((elem) =>{
        const details = sessionStorage.getItem(`filter-details-${elem.id}`)
        if (details && details == 'open') {
          elem.querySelector('summary').classList.add('after:transition-none');
          document.querySelector(`[data-property="property[${elem.id}]"]`).setAttribute('open', '')
        }
      })
    }
  }
}

export function setAccordionState() {
  const filterDetails = document.querySelectorAll('._filter-details summary')
  if (filterDetails) {
    filterDetails.forEach((elem) => {
      elem.addEventListener('click', () => {
        elem.classList.remove('after:transition-none');
        const { id, open } = elem.closest('details')
        sessionStorage.setItem(`filter-details-${id}`, !open ? 'open' : 'close');
      })
    })
  }
}
