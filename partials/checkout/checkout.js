import ShopaholicCartShippingType from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-shipping-type';

export default new class Checkout {
   constructor(){
       this.sDeliveryInfo = "._delivery-info";
       this.sDeliveryToggle = "._delivery-toggle";
       this.sCash = "._cash";
       this.sCard = "._card";
       this.sPaymentCard = "._payment-card";

       this.init();
       this.deliveryTerms();
       this.paymentMethod();
   }

   init(){
        setTimeout(()=>{
          const arShippingTypeInputList = document.querySelector('input[name=shipping_type_id]')
          const obFirstShippingTypeInput = arShippingTypeInputList ? arShippingTypeInputList[0] : null;
          if (!obFirstShippingTypeInput) {
            return;
          }

          obFirstShippingTypeInput.dispatchEvent(
            new InputEvent('change', {
                bubbles: true,
                cancelable: true,
            }));
        }, 10)
        const obShopaholicCartShippingType = new ShopaholicCartShippingType();
        obShopaholicCartShippingType.setAjaxRequestCallback((obRequestData, obButton) => {
            obRequestData.update = {
                'checkout-subtotal/checkout-subtotal-ajax': `._checkout-subtotal`,
            }
            return obRequestData;
        }).init();
   }

    deliveryTerms(){
        document.querySelector('._delivery-terms').addEventListener('click', () => {
            if(document.querySelector(this.sDeliveryInfo).classList.contains('hidden')){
                document.querySelector(this.sDeliveryInfo).classList.remove('hidden');
                document.querySelector(this.sDeliveryToggle).classList.remove('rotate-180');
                document.querySelector('._delivery-terms').setAttribute('aria-expanded', true);
            }else {
                document.querySelector(this.sDeliveryInfo).classList.add('hidden');
                document.querySelector(this.sDeliveryToggle).classList.add('rotate-180');
                document.querySelector('._delivery-terms').setAttribute('aria-expanded', false);

            }
        })
    }

    paymentMethod(){
        document.querySelector('._payment-method').addEventListener('click', (event) => {
            if(event.target.tagName === 'INPUT'){
                if(document.querySelector(this.sCash).checked){
                    document.querySelector(this.sPaymentCard).classList.add('hidden');
                    document.querySelector(this.sPaymentCard).setAttribute('aria-hidden', true);
                }
                if(document.querySelector(this.sCard).checked){
                    document.querySelector(this.sPaymentCard).classList.remove('hidden');
                    document.querySelector(this.sPaymentCard).removeAttribute('aria-hidden');
                }
            }
        })
    }
}()
