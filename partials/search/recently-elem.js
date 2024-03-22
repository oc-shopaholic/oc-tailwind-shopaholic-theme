export default class RecentlyElem {
    constructor(app) {
        this.obNav = app;
        this.obClear = this.obNav.querySelector('._clear-recently');
        this.obText = this.obNav.querySelector('._recently-text');

        this.obHeader = document.querySelector('._recently-container ._recently-header');
        this.obInput = document.querySelector('._shopaholic-search-input');
        this.obClearAll = document.querySelector('._clear-recently-all');
    }

    clear() {
        this.obClear.addEventListener("click", (event) => {
            event.stopPropagation();
            let history = JSON.parse(localStorage.searchHistory);
            history = history.filter((item) => {
                return item !== this.obText.innerText;
            })
            if (!history.length) {
                this.obHeader.style.display = 'none';
            } else if (history.length <= 1) {
                this.obClearAll.style.display = 'none';
            }
            const finalHistory = JSON.stringify(history);
            localStorage.searchHistory = finalHistory;
            this.obNav.remove();
        })
    }

    trigger() {
        this.obNav.addEventListener("click", () => {
            this.obInput.value = (this.obText.innerText);
            this.obInput.dispatchEvent(
            new InputEvent('input', {
                bubbles: true,
                cancelable: true,
            }));
        })
    }

    behaviorEmulation() {
        const app = this;
        this.obNav.addEventListener('keypress', function (e) {
            if (e.which === 13 && e.target.classList[0] === '_recently') {
                app.obNav.dispatchEvent(
                new Event('click', {
                    bubbles: true,
                    cancelable: true,
                }));
            } else if (e.which === 13 && e.target.classList[0] === '_clear-recently') {
                app.obClear.dispatchEvent(
                new Event('click', {
                    bubbles: true,
                    cancelable: true,
                }));
            }
        });
    }

    show() {
        this.clear();
        this.trigger();
        this.behaviorEmulation();
    }

    static make(container) {
        const obContainer = document.getElementsByClassName(`${container}`);
        Array.from(obContainer).forEach(function (e) {
            const containerNav = new RecentlyElem(e);
            containerNav.show();
        });
    }
}
