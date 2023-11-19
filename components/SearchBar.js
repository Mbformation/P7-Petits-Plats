import SelectedTag from "./selectedTag.js";

class SearchBar {
  constructor(filterCriteria, update) {
    this.filterCriteria = filterCriteria;
    this.update = update;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("search-bar-container");
    this.listenForInput();
  }
  render() {
    this.compEl.innerHTML += `<label for="search-bar"></label>
    <input type="search" id="search-bar" placeholder="Rechercher une recette, un ingrédient, ..." aria-label="Search">
    <button type="button"class="search-Btn">Search</button>`;
    return this.compEl;
  }

  listenForInput() {
    this.compEl.addEventListener("input", (event) => {
      if (!this.filterCriteria.some((obj) => obj.type === "search")) {
        this.filterCriteria.push({
          value: event.target.value,
          type: "search",
        });

        this.update();
      } else {
        const searchObj = this.filterCriteria.find(
          (obj) => obj.type === "search"
        );
        searchObj.value = event.target.value;
        this.update();
      }
    });
  }
}

export default SearchBar;
