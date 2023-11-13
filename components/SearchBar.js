class SearchBar {
  constructor(parent) {
    this.parent = parent;
  }
  render() {
    const compEl = document.createElement("div");
    compEl.classList.add("search-bar-container");
    compEl.innerHTML += `<label for="search-bar"></label>
    <input type="search" id="search-bar" placeholder="Rechercher une recette, un ingrédient, ..." aria-label="Search">
    <button type="button">Search</button>`;
    return compEl;
  }
}

export default SearchBar;
