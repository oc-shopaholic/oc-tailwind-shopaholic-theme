import request from 'oc-request';

export default new class accountDetails{
  constructor(){
    this.obChangeContactInfo = null;
    this.obSaveUserInfo = null;
    this.obAvatarLoad = null;
    this.obAvatarInput = null;
    this.obAvatarRemove = null;
    this.obAddNewAddress = null;
    this.obSaveNewAddress = null;
    this.obChangeAddress = null;
    this.obShippingContainer = null;
    this.obShippingRemove = null;
    this.obChangeShipping = null;
    this.obAvatar = null;

    this.init();
  }

  avatarLoad(){
    if(!this.obAvatarLoad) return
    this.obAvatarLoad.addEventListener('click', ()=>{
      this.obAvatarInput.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    })
  }

  changeInfo(){
    if(!this.obChangeContactInfo) return
    this.obChangeContactInfo.addEventListener('click', ()=>{
      request.sendData('onAjax', {
        update: { 'account-details/user-info': '._account-details-change' },
        complete: () => {
          this.obSaveUserInfo = document.getElementsByClassName('_save-user-info')[0];
          this.init();
        },
      });
    })
  }

  avatarRemove(){
    if(!this.obAvatarRemove) return
    this.obAvatarRemove.addEventListener('click', ()=>{
      this.obAvatar = '';
    })
  }

  initVariables(){
    this.obChangeContactInfo = document.getElementsByClassName('_change-contact-info')[0];
    this.obSaveUserInfo = document.getElementsByClassName('_save-user-info')[0];
    this.obAvatarLoad = document.getElementsByClassName('_avatar-load')[0];
    this.obAvatarInput = document.getElementsByClassName('_avatar-input')[0];
    this.obAvatarRemove = document.getElementsByClassName('_avatar-remove')[0];
    this.obAddNewAddress = document.getElementsByClassName('_add-new-address')[0];
    this.obSaveNewAddress = document.getElementsByClassName('_save-new-address')[0];
    this.obChangeAddress = document.getElementsByClassName('_change-address')[0];
    this.obAvatar = null;
    if(!document.getElementsByClassName('_shipping-container')[0]) return
    this.obShippingContainer = document.getElementsByClassName('_shipping-container')[0];
    this.obShippingRemove = this.obShippingContainer.querySelectorAll('._remove');
    this.obChangeShipping = this.obShippingContainer.querySelectorAll('._change-shipping');
  }

  addNewAddress(){
    if(!this.obAddNewAddress) return
    this.obAddNewAddress.addEventListener('click', ()=>{
      request.sendData('onAjax', {
        update: { 'account-details/add-address': '._add-address' },
        complete: () => {
          this.init();
          document.getElementsByClassName('_add-address')[0].classList.remove('hidden')
          this.obSaveNewAddress.classList.remove('hidden');
          this.obAddNewAddress.classList.add('hidden');
        },
      });
    })
  }

  saveNewAddress(){
    const app = this;
    if(!this.obSaveNewAddress) return
    this.obSaveNewAddress.addEventListener('click', ()=>{
      if (document.getElementsByClassName('_add-address')[0].querySelector('form').classList.contains('_invalid')) {
        return;
      }
      const formDataUnindexed = app.obSaveNewAddress.closest('form');
      const formData = {
        'country': formDataUnindexed.querySelector('[name="country"]').value,
        'city': formDataUnindexed.querySelector('[name="city"]').value,
        'address1': formDataUnindexed.querySelector('[name="postal-address"]').value,
        'postcode': formDataUnindexed.querySelector('[name="zip-code"]').value,
        'id': formDataUnindexed.querySelector('[name="address_id"]').value,
        'type': 'shipping',
      };

      request.sendData('UserAddress::onAdd', {
        data: formData,
        complete: ()=>{
          location.href=location.href;
        }
      });
    })
  }

  shippingRemove(){
    if(!this.obShippingRemove) return
    for (let address of this.obShippingRemove) {
      address.addEventListener('click', (event)=>{   
        const data = {
          'id': event.target.closest('button').dataset.id
        }   
        request.sendData('UserAddress::onRemove', {
          'data': data,
          update: {'account-details/shipping-address': '._shipping-address-container'},
          complete: ()=>{
            this.init();
            if(this.obShippingContainer.childElementCount < 1){
              document.getElementsByClassName('_shipping-address-container')[0].classList.add('hidden')
              location.href=location.href;
            }
          }
        });
      })
    }
  }

  changeAddress(id){
    this.obChangeAddress.addEventListener('click', ()=>{
      const form = $('._add-address').find('form');

      const data = {
        'country': form[0].querySelectorAll('[name="country"]')[0].value,
        'city': form[0].querySelectorAll('[name="city"]')[0].value,
        'address1': form[0].querySelectorAll('[name="postal-address"]')[0].value,
        'postcode': form[0].querySelectorAll('[name="zip-code"]')[0].value,
        'id': id,
        'type': 'shipping',
      }
      request.sendData('UserAddress::onUpdate', {
        data: data,
        update: {'account-details/shipping-address': '._shipping-address-container'},
        complete: ()=>{
          this.init();
        }
      });
    })
  }

  changeShipping(){
    if(!this.obChangeShipping || !this.obChangeShipping.length) return
    for (let address of this.obChangeShipping) {
      address.addEventListener('click', (event)=>{
        const str = event.target.closest('div').querySelectorAll('span._address-info')[0].innerText.trim();
        const arr = str.split(',');
        const id = event.target.closest('div').querySelectorAll('._remove')[0].dataset.id;
  
        request.sendData('onAjax', {
          update: { 'account-details/add-address': '._add-address' },
          complete: () => {
            this.init();
            document.getElementsByClassName('_add-address')[0].classList.remove('hidden')
            this.obAddNewAddress.classList.add('hidden');
            this.obChangeAddress.classList.remove('hidden');
            for(let i = 0; i < arr.length; i++){
              document.getElementsByClassName('_add-address')[0].querySelectorAll('input')[i].value = arr[i]
            }
            this.changeAddress(id)
          },
        });
      })
    }
  }

  saveUserInfo(){
    const app = this;
    if(!this.obSaveUserInfo) return
    this.obSaveUserInfo.addEventListener('click', ()=>{
      const formDataUnindexed = app.obSaveUserInfo.closest('form');
      let avatar = null;
      if(this.obAvatar){
        avatar = this.obAvatar;
      }else{
        avatar = $('._avatar-input').prop('files')[0];
      }
      const formData = {
        'name': formDataUnindexed.querySelector('[name="name"]').value,
        'email': formDataUnindexed.querySelector('[name="email"]').value,
        'phone': formDataUnindexed.querySelector('[name="phone"]').value,
        'country': formDataUnindexed.querySelector('[name="country"]').value,
        'city': formDataUnindexed.querySelector('[name="city"]').value,
        'address1': formDataUnindexed.querySelector('[name="postal-address"]').value,
        'postcode': formDataUnindexed.querySelector('[name="zip-code"]').value,
        'id': formDataUnindexed.querySelector('[name="address_id"]').value,
        avatar: avatar
      };
      //TODO: Исправить что не сохраняется аватар и name если стоит files: true
      request.sendData('onAjax', {
        data: formData,
        files: true,
      });

      const address = {
        'country': formData.country,
        'city': formData.city,
        'address1': formData.address1,
        'postcode': formData.postcode,
        'id': formData.id,
        'type': 'shipping',
      };

      const requestHandler = (address.id) ? 'onUpdate' : 'onAdd';
      request.sendData('UserAddress::' + requestHandler, {
        data: address,
        complete: ()=>{
          location.href=location.href;
        }
      });
    });
  }

  init(){
    this.initVariables();
    this.changeShipping();
    this.shippingRemove();
    this.saveNewAddress();
    this.addNewAddress();
    this.avatarRemove();
    this.avatarLoad();
    this.changeInfo();
    this.saveUserInfo();
  }
}();
