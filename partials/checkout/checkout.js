import ShopaholicCartShippingType from '@lovata/shopaholic-cart/shopaholic-cart-shipping-type';

export default new class Checkout {
   constructor(){
       this.sDeliveryInfo = "_delivery-info";
       this.sDeliveryToggle = "_delivery-toggle";
       this.sCash = "_cash";
       this.sCard = "_card";
       this.sPaymentCard = "_payment-card";

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
        document.getElementsByClassName('_delivery-terms')[0].addEventListener('click', () => {
            if(document.getElementsByClassName(this.sDeliveryInfo)[0].classList.contains('hidden')){
                document.getElementsByClassName(this.sDeliveryInfo)[0].classList.remove('hidden');
                // $(this.sDeliveryInfo).removeAttr('aria-hidden');
                document.getElementsByClassName(this.sDeliveryToggle)[0].classList.remove('rotate-180');
                document.getElementsByClassName('_delivery-terms')[0].setAttribute('aria-expanded', true);
            }else {
                document.getElementsByClassName(this.sDeliveryInfo)[0].classList.add('hidden');
                // $(this.sDeliveryInfo).attr('aria-hidden', true);
                document.getElementsByClassName(this.sDeliveryToggle)[0].classList.add('rotate-180');
                document.getElementsByClassName('_delivery-terms')[0].setAttribute('aria-expanded', false);

            }
        })
    }

    paymentMethod(){
        document.getElementsByClassName('_payment-method')[0].addEventListener('click', (event) => {
            if(event.target.tagName === 'INPUT'){
                if(document.getElementsByClassName(this.sCash)[0].checked){
                    document.getElementsByClassName(this.sPaymentCard)[0].classList.add('hidden');
                    document.getElementsByClassName(this.sPaymentCard)[0].setAttribute('aria-hidden', true);
                }
                if(document.getElementsByClassName(this.sCard)[0].checked){
                    document.getElementsByClassName(this.sPaymentCard)[0].classList.remove('hidden');
                    document.getElementsByClassName(this.sPaymentCard)[0].removeAttribute('aria-hidden');
                }
            }
        })
    }
}()
