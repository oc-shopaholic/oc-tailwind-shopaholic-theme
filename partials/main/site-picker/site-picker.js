class SitePicker {
  initHandler () {
    document.addEventListener('submit', (event) => {
      const eventNode = event.target;
      const formNode = eventNode.closest('.js-site-picker');
      if (!formNode) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const langNode = formNode.querySelector('.js-language-picker');
      if (langNode) {
        window.location.href = langNode.value;
      }
    });
  }

  initCountryPicker() {
    document.addEventListener('change', (event) => {
      const eventNode = event.target;
      const selectNode = eventNode.closest('.js-country-picker');
      if (!selectNode) {
        return;
      }

      const formNode = selectNode.closest('.js-site-picker');
      const buttonNode = formNode ? formNode.querySelector('button[type="submit"]') : null;
      if (buttonNode) {
        buttonNode.setAttribute('disabled', 'disabled');
      }

      oc.ajax('onAjax', {
        data: { site_group_id: selectNode.value },
        update: {
          'main/site-picker/site-picker': `._site_picker`
        },
      }).done(() => {
        if (buttonNode) {
          buttonNode.removeAttribute('disabled', 'disabled');
        }
      })
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obSitePicker = new SitePicker();
  obSitePicker.initHandler();
  obSitePicker.initCountryPicker();
});
