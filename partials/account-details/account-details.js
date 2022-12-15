import request from 'oc-request';
import Modal from '../modal/modal'

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
      if (document.querySelector('._add-address form').classList.contains('_invalid')) {
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
    setTimeout(()=>{
      this.obShippingRemove = this.obShippingContainer.querySelectorAll('._remove')[0];
      if(!this.obShippingRemove) return;
      this.obShippingRemove.addEventListener('click', (event)=>{
        document.querySelector('dialog ._hide').dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }));
        const data = {
          'id': event.target.closest('button').dataset.id
        }
        request.sendData('UserAddress::onRemove', {
          'data': data,
          update: {'account-details/shipping-address': '._shipping-address-container'},
          complete: ()=>{
            this.init();
          }
        });
      })
    }, 100);
  }

  changeAddress(id){
    console.log("changeAddress")
    this.obChangeAddress.addEventListener('click', ()=>{
      const form = document.querySelector('._add-address form')

      const data = {
        'country': form.querySelector('[name="country"]').value,
        'city': form.querySelector('[name="city"]').value,
        'address1': form.querySelector('[name="postal-address"]').value,
        'postcode': form.querySelector('[name="zip-code"]').value,
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
    if(!this.obChangeShipping || !this.obChangeShipping.length) return;
    for (let address of this.obChangeShipping) {
      address.addEventListener('click', (event)=>{
        const str = event.target.closest('div').querySelectorAll('span._address-info')[0].innerText.trim();
        const arr = str.split(',');
        const id = event.target.dataset.id;

        request.sendData('onAjax', {
          update: { 'account-details/add-address': '._add-address' },
          complete: () => {
            this.init();
            document.getElementsByClassName('_add-address')[0].classList.remove('hidden')
            this.obAddNewAddress.classList.add('hidden');
            this.obChangeAddress.classList.remove('hidden');
            for(let i = 0; i < arr.length; i++){
              document.querySelectorAll('._add-address input')[i].value = arr[i]
            }
            this.changeAddress(id);
          },
        });
      })
    }
  }

  saveUserInfo(){
    const app = this;
    if(!this.obSaveUserInfo) return;
    this.obSaveUserInfo.addEventListener('click', ()=>{
      const formDataUnindexed = app.obSaveUserInfo.closest('form');
      const avatar = document.querySelector("._avatar-input").files[0];
      const formData = {
        'name': formDataUnindexed.querySelector('[name="name"]').value,
        'email': formDataUnindexed.querySelector('[name="email"]').value,
        'phone': formDataUnindexed.querySelector('[name="phone"]').value,
        'country': formDataUnindexed.querySelector('[name="country"]').value,
        'city': formDataUnindexed.querySelector('[name="city"]').value,
        'address1': formDataUnindexed.querySelector('[name="postal-address"]').value,
        'postcode': formDataUnindexed.querySelector('[name="zip-code"]').value,
        'id': formDataUnindexed.querySelector('[name="address_id"]').value,
        'avatar': avatar
      };
      //TODO: Add save picture
      request.sendData('onAjax', {
        data: formData,
        files: false
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
    Modal.make('_modal');

    this.initVariables();
    this.changeShipping();
    this.saveNewAddress();
    this.addNewAddress();
    this.avatarRemove();
    this.avatarLoad();
    this.changeInfo();
    this.saveUserInfo();

    for (let modal of document.querySelectorAll('._modal')) {
      modal.addEventListener('click', (event)=>{
        this.shippingRemove();
      })
    }
  }
}();
