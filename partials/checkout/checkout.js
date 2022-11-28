import ShopaholicCartShippingType from '@lovata/shopaholic-cart/shopaholic-cart-shipping-type';

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
            $('#delivery_1').trigger('change')
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
        $('._delivery-terms').on('click', () => {
            if($(this.sDeliveryInfo).hasClass('hidden')){
                $(this.sDeliveryInfo).removeClass('hidden');
                // $(this.sDeliveryInfo).removeAttr('aria-hidden');
                $(this.sDeliveryToggle).removeClass('rotate-180');
                $('._delivery-terms').attr('aria-expanded', true);
            }else {
                $(this.sDeliveryInfo).addClass('hidden');
                // $(this.sDeliveryInfo).attr('aria-hidden', true);
                $(this.sDeliveryToggle).addClass('rotate-180');
                $('._delivery-terms').attr('aria-expanded', false);

            }
        })
    }

    paymentMethod(){
        $('._payment-method').on('click', 'input', () => {
            if($(this.sCash).prop('checked')){
                $(this.sPaymentCard).addClass('hidden');
                $(this.sPaymentCard).attr('aria-hidden', true);
            }
            if($(this.sCard).prop('checked')){
                $(this.sPaymentCard).removeClass('hidden');
                $(this.sPaymentCard).removeAttr('aria-hidden');
            }
        })
    }
}()
