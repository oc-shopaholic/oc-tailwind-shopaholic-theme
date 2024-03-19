export default new class AdvancedList {
  constructor () {
    this.obAdvancedListWrapperClass = null;
    this.obAdvancedListButtonShowMoreClass = null;
    this.obAdvancedListButtonShowMoreClassHidden = null;
    this.obButton = null;

    this.init();
  }
  initVariables () {
    this.obAdvancedListWrapperClass = document.querySelector("._advanced-list");
    this.obAdvancedListButtonShowMoreClass = document.querySelector("._advanced-list-button-show-all");
    this.obAdvancedListButtonShowMoreClassHidden = document.querySelector("._advanced-list-button-show-all-hidden");
  }

  init () {
    document.addEventListener("DOMContentLoaded", () => {
      if (!document.querySelector("._advanced-list")) return;
      this.initVariables();
      if (this.obAdvancedListButtonShowMoreClass) {
        this.showAllList();
      }
    });
  }
  showAllList () {
    this.obAdvancedListButtonShowMoreClass.addEventListener("click", () => {
      this.obAdvancedListButtonShowMoreClass.classList.add("hidden");
      this.obAdvancedListButtonShowMoreClassHidden.classList.remove("hidden");
      setTimeout(() => {
        const advancedList = this.obAdvancedListWrapperClass.querySelectorAll('li.hidden')
        advancedList.forEach(category => {
          category.removeAttribute("aria-hidden");
          category.classList.remove("hidden");
        })
        this.obAdvancedListButtonShowMoreClassHidden.classList.add("hidden");
      }, 300);
    });
  }
}();
