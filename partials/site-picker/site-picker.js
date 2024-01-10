export default class Region {
  constructor (app) {
    this.obNav = app
    this.languageForm = null
    this.obShow = this.obNav.querySelector('._show')
  }

  initVariables () {
    this.languageForm = this.obNav.querySelector('.js-picker-submit')
    this.siteNameInput = this.languageForm.querySelector('[name="site-name"]')
  }

  show () {
    this.obShow.addEventListener('click', () => {
      this.initVariables()
      this.initEvents()
    })
  }

  initEvents () {
    this.setRegion()
    this.setCountry()
  }

  setCountry () {
    this.languageInput = this.obNav.querySelector('[name=\'site_group_id\']')
    if (!this.languageInput) return false
    this.languageInput.addEventListener('change', (e) => {
      e.preventDefault()
      oc.ajax('onAjax', {
        data: { site_group_id: e.target.value },
        update: {
          'site-picker/site-picker': `._site_picker`
        },
      }).done(() => {
        this.initVariables()
        this.initEvents()
      })
    })
  }

  setRegion () {
    if (!this.languageForm) return false
    this.languageForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if(window.location.href !== this.languageInput.value) window.location.href = this.languageInput.value;
      return false
    })
  }

  static make (container) {
    const obContainer = document.getElementsByClassName(`${container}`)
    Array.from(obContainer).forEach(function (e) {
      const containerNav = new Region(e)
      containerNav.show()
    })
  }
}
Region.make('_off-canvas')
