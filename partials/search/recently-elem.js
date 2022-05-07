export default class RecentlyElem {
    constructor(app) {
        this.$vNav = app;
        this.$vClear = this.$vNav.find('._clear-recently');
        this.$vText = this.$vNav.find('._recently-text');

        this.vHeader = $("._recently-container ._recently-header");
        this.vInput = $("._shopaholic-search-input");
        this.vClearAll = $("._clear-recently-all");
    }

    clear() {
        this.$vClear.on("click", () => {
            let history = JSON.parse(localStorage.searchHistory);
            history = history.filter((item) => {
                return item !== this.$vText.text()
            })
            if (!history.length) {
                this.vHeader.css('display', 'none');
            } else if (history.length <= 1) {
                this.vClearAll.css('display', 'none');
            }
            let finalHistory = JSON.stringify(history);
            localStorage.searchHistory = finalHistory;
            this.$vNav.remove();
        })
    }

    trigger() {
        this.$vNav.on("click", () => {
            this.vInput.val(this.$vText.text()).trigger('input');
        })
    }

    behaviorEmulation() {
        this.$vNav.on('keypress', function (e) {
            if (e.which === 13 && e.target.classList[0] === '_recently') {
                this.$vNav.trigger('click');
            } else if (e.which === 13 && e.target.classList[0] === '_clear-recently') {
                this.$vClear.trigger('click');
            }
        });
    }

    show() {
        this.clear();
        this.trigger();
        this.behaviorEmulation();
    }

    static make(container) {
        $(container).each(function (e) {
            const containerNav = new RecentlyElem($(this));
            containerNav.show();
        });
    }
}
