export default class Region {
  constructor (app) {
    this.obNav = app
    this.languageForm = this.obNav.querySelector('.js-picker-submit');
    this.submitButton = this.obNav.querySelector('[type=\'submit\']');
    this.obShow = this.obNav.querySelector('._show')
  }

  initVariables () {
    this.languageForm = this.obNav.querySelector('.js-picker-submit');
    this.submitButton = this.obNav.querySelector('[type=\'submit\']');
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
    this.languageInput = this.obNav.querySelector('[name=\'site_group_id\']');
    if (!this.languageInput) {
      return false;
    }

    this.languageInput.addEventListener('change', (e) => {
      e.preventDefault();
      this.submitButton.setAttribute('disabled', 'disabled');

      oc.ajax('onAjax', {
        data: { site_group_id: e.target.value },
        update: {
          'site-picker/site-picker': `._site_picker`
        },
      }).done(() => {
        this.initVariables();
        this.initEvents();
        this.submitButton.removeAttribute('disabled');
      })
    })
  }

  setRegion () {
    if (!this.languageForm) {
      return;
    }

    this.languageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const languageInput = this.languageForm.querySelector('#site_id');
      if (!languageInput) {
        return;
      }

      window.location.href = languageInput.value;
    });
  }

  static make (container) {
    const obContainer = document.getElementsByClassName(`${container}`)
    Array.from(obContainer).forEach(function (e) {
      const containerNav = new Region(e)
      containerNav.show()
    })
  }
}

Region.make('_off-canvas');
