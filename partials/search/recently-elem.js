export default class RecentlyElem {
    constructor(app) {
        this.obNav = app;
        this.obClear = this.obNav.querySelectorAll('._clear-recently');
        this.obText = this.obNav.querySelectorAll('._recently-text');

        this.obHeader = document.querySelectorAll('._recently-container ._recently-header');
        this.obInput = document.getElementsByClassName('_shopaholic-search-input');
        this.obClearAll = document.getElementsByClassName('_clear-recently-all');
    }

    clear() {
        this.obClear[0].addEventListener("click", (event) => {
            event.stopPropagation();
            let history = JSON.parse(localStorage.searchHistory);
            history = history.filter((item) => {
                return item !== this.obText[0].innerText;
            })
            if (!history.length) {
                this.obHeader[0].style.display = 'none';
            } else if (history.length <= 1) {
                this.obClearAll[0].style.display = 'none';
            }
            const finalHistory = JSON.stringify(history);
            localStorage.searchHistory = finalHistory;
            this.obNav.remove();
        })
    }

    trigger() {
        this.obNav.addEventListener("click", () => {
            this.obInput[0].value = (this.obText[0].innerText);
            this.obInput[0].dispatchEvent(
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
                app.obClear[0].dispatchEvent(
                new Event('click', {
                    bubbles: true,
                    cancelable: true,
                }));;
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
