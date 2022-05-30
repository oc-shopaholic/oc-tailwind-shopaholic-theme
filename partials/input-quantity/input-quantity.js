export default new class InputQuantity {
  constructor() {
    this.initialization();
  }

  initialization() {
    $("._counter").each(function () {
      let $counter = $(this);
      let $minus = $counter.find("._decrement");
      let $plus = $counter.find("._increment");
      let $count = $counter.find("._count");
      let sInputQuantityCount = '_count';
      let sQuantityCount = $count.attr('value');

      (function () {
        counterInitialization();
      })()

      $count.on("input", (ev) => {
        setValue($(ev.target).val());
        sQuantityCount = $(ev.target).val()

        counterInitialization();
      });

      function getInput() {
        return $count
      }

      function getValue() {
        return getInput().val()
      }

      function setValue(value) {
        getInput().attr('value', value);
        getInput().val(value);
      }

      function getMax() {
        return getInput().attr('max')
      }

      function getMin() {
        return getInput().attr('min')
      }

      function isMin() {
        return Number(getValue()) <= Number(getMin())
      }

      function isMax() {
        return Number(getValue()) >= Number(getMax())
      }

      function stateButton(button, state) {
        button.prop('disabled', state);
      }

      function counterInitialization() {
        if (!isMin()) {
          stateButton($minus, false);
        }
        if (isMin()) {
          stateButton($minus, true);
        }

        if (!isMax()) {
          stateButton($plus, false);
        }

        if (isMax()) {
          stateButton($plus, true);
        }
      }

      $minus.on("click", () => {
        if (!isMin()) {
          sQuantityCount--;
          setValue(sQuantityCount);
          stateButton($minus, false);
        }

        if (isMin()) {
          stateButton($minus, true);
        }

        if (!isMax()) {
          stateButton($plus, false);
        }
      });

      $plus.on("click", () => {
        if (!isMax()) {
          sQuantityCount++;
          setValue(sQuantityCount);
          stateButton($plus, false);
        }
        if (isMax()) {
          stateButton($plus, true);
        }
        if (!isMin()) {
          stateButton($minus, false);
        }
      })
    });
  }
}
