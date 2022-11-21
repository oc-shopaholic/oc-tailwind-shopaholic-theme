export default new class accountDetails{
  constructor(){
    this.test = null;
    this.testtwo = $('._very-test-button');
    this.init();
  }



  qq(){
    $('._very-test-link').on('click', ()=>{
      $.request('onAjax', {
        update: { 'account-details/user-info': '._test-container' },
        complete: () => {
          this.testtwo = $('._very-test-button');
          this.init();
        },
      });
    })
  }

  init(){
    let $this = this;
    this.testtwo.on('click', ()=>{
      let formDataUnindexed = $this.testtwo.parents('form').serializeArray();
      let formData = {};
      $.map(formDataUnindexed, function(n, i){
        formData[n['name']] = n['value'];
      });

      $.request('onAjax', {
        data: formData,
        // update: { 'account-details/contact-information': '._test-container' },
        // complete: () => {
        //     this.test = $('._very-test-link');
        //     this.qq();
        // },
      });

      let address = {
        'country': formData.country,
        'city': formData.city,
        'address1': formData['postal-address'],
        'postcode': formData['zip-code'],
        'id': formData['address_id'],
        'type': 'shipping',
      };

      let requestHandler = (address.id) ? 'onUpdate' : onAdd;

      $.request('UserAddress::' + requestHandler, {
        data: address
      });
    });
  }
}();
