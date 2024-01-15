export default class InputQuantity {
  constructor (app) {
    this.obCounter = app
    this.obMinus = this.obCounter.querySelectorAll('._decrement')
    this.obPlus = this.obCounter.querySelectorAll('._increment')
    this.obCount = this.obCounter.querySelectorAll('._count')
    this.sQuantityCount = this.obCount[0].getAttribute('value')

    this.obEvents = []
  }

  stateButton (button, state) {
    if (state) {
      button.setAttribute('disabled', '')
    } else {
      button.removeAttribute('disabled')
    }
  }

  getInput () {
    return this.obCount[0]
  }

  getValue () {
    return this.getInput().value
  }

  setValue (value) {
    this.getInput().setAttribute('value', value)
    this.getInput().value = value
  }

  getMax () {
    return this.getInput().getAttribute('max')
  }

  getMin () {
    return this.getInput().getAttribute('min')
  }

  isMin () {
    return Number(this.getValue()) <= Number(this.getMin())
  }

  isMax () {
    return Number(this.getValue()) >= Number(this.getMax())
  }

  counterInitialization () {
    if (!this.isMin()) {
      this.stateButton(this.obMinus[0], false)
    }

    if (this.isMin()) {
      this.stateButton(this.obMinus[0], true)
    }

    if (!this.isMax()) {
      this.stateButton(this.obPlus[0], false)
    }

    if (this.isMax()) {
      this.stateButton(this.obPlus[0], true)
    }
  }

  addEvents () {
    const app = this

    this.obEvents[0] = (function (ev) {
      if (app.isMin()) {
        app.setValue(app.getMin())
        app.sQuantityCount = app.getMin()
      } else if (app.isMax()) {
        app.setValue(app.getMax())
        app.sQuantityCount = app.getMax()
      } else {
        app.setValue($(ev.target).val())
        app.sQuantityCount = $(ev.target).val()
      }

      app.counterInitialization()
    })

    this.obEvents[1] = (function (e) {
      if (!app.isMin()) {
        app.sQuantityCount--
        app.setValue(app.sQuantityCount)
        app.stateButton(app.obMinus[0], false)
      }

      if (app.isMin()) {
        app.stateButton(app.obMinus[0], true)
      }

      if (!app.isMax()) {
        app.stateButton(app.obPlus[0], false)
      }

      app.obCount[0].dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          cancelable: true,
        }))
    })

    this.obEvents[2] = (function (e) {
      if (!app.isMax()) {
        app.sQuantityCount++
        app.setValue(app.sQuantityCount)
        app.stateButton(app.obPlus[0], false)
      }
      if (app.isMax()) {
        app.stateButton(app.obPlus[0], true)
      }
      if (!app.isMin()) {
        app.stateButton(app.obMinus[0], false)
      }

      app.obCount[0].dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          cancelable: true,
        }))
    })

    this.obCount[0].addEventListener('input', this.obEvents[0])
    this.obMinus[0].addEventListener('click', this.obEvents[1])
    this.obPlus[0].addEventListener('click', this.obEvents[2])
  }

  init () {
    this.counterInitialization()
    this.addEvents()
  }

  static make (container) {
    const obContainer = document.getElementsByClassName(`${container}`)
    Array.from(obContainer).forEach(function (e) {
      const containerNav = new InputQuantity(e)
      containerNav.init()
    })
    addEventQuantity()
  }
}

export function addEventQuantity () {
  document.querySelector('._header-purchases-container button').addEventListener('click', function (event) {
    const elementQuantity = document.querySelector('._header-purchases-container').closest('._header-purchases-container').querySelector('._counter')
    if (!elementQuantity) return false
    const containerNav = new InputQuantity(elementQuantity)
    containerNav.init()
  })
}
