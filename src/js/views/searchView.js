import View from './view';
class SearchView {
  #parentContainer = document.querySelector('.search');

  getQuery() {
    const searchWord =
      this.#parentContainer.querySelector('.search__field').value;
    this.#clearSearchField();
    return searchWord;
  }

  addEventListner(callBack) {
    this.#parentContainer.addEventListener('submit', function (eve) {
      eve.preventDefault();
      callBack();
    });
  }

  #clearSearchField() {
    this.#parentContainer.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
