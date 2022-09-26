export default new class ProductCardCheckout {
    constructor(){
        this.nQuantity = {
            aInternal: 0,
            aListener: function (val) { },
            set propName(val) {
                this.aInternal = val;
                this.aListener(val);
            },
            get propName() {
                return this.aInternal;
            },
            registerListener: function (listener) {
                this.aListener = listener;
            }
        }
        this.nPrice = {
            aInternal: 0,
            aListener: function (val) { },
            set propName(val) {
                this.aInternal = val;
                this.aListener(val);
            },
            get propName() {
                return this.aInternal;
            },
            registerListener: function (listener) {
                this.aListener = listener;
            }
        }


        this.watchQuantity()
        this.watchPrice()
        this.priceСalculation(this.nQuantity, this.nPrice);
    }

    watchQuantity(){
        let app = this
        this.nQuantity.registerListener(function(val) {
            app.finalScore(app.nQuantity.propName, app.nPrice.propName);
        });
    }

    watchPrice(){
        let app = this
        this.nPrice.registerListener(function(val) {
            app.finalScore(app.nQuantity.propName, app.nPrice.propName);
        });
    }

    finalScore(quantity, price){
        $("._subtotal").each(function () {
            let $subtotal = $(this);
            let $item = $subtotal.find("._item");
            let $price = $subtotal.find("._price");
            
            (function(){
                let a = price + '';
                $(document).ready(() => {
                    $item.text('(' + quantity + ' ' + window.subtotal.item + ')');
                    $price.text(window.subtotal.currency + a.substring(0,6));
                })
            })()
        })
    }

    priceСalculation(quantity, price) {
        $("._product-card").each(function () {
            let $card = $(this);
            let $counter = $card.find("._counter");
            let $cost = $card.find("._cost");
            let $count = $counter.find("._count");
            let $decrement = $counter.find("._decrement");
            let $increment = $counter.find("._increment");
            let previousСount = '';

            (function () {
                previousСount = $count.val()
                quantity.propName = quantity.propName + 1
                price.propName = price.propName + Number($cost.text())
                $decrement.on("click", () => {
                    previousСount = $count.val()
                    quantity.propName = quantity.propName - 1
                    price.propName = price.propName - Number($cost.text())
                });
                $increment.on("click", () => {
                    previousСount = $count.val()
                    quantity.propName = quantity.propName + 1
                    price.propName = price.propName + Number($cost.text())
                });
                $count.on("input", (ev) => {
                    quantity.propName = (Number($(ev.target).val()) - Number(previousСount)) + quantity.propName
                    price.propName = ((Number($(ev.target).val()) - Number(previousСount)) * Number($cost.text())) + price.propName
                    previousСount = $count.val()
                });
            })()
        })
    }
}()
