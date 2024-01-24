class FilterSearch {
  constructor(parent, list) {
    this.parent = parent;
    this.list = list;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("input-container");
    this.searchInput = document.createElement("input");
    this.searchInput.setAttribute("type", "search");
    this.searchInput.setAttribute("class", "filter-search");
    this.searchInput.setAttribute("aria-label", "Search");
    this.searchInput.classList.add("total-recipes");
    this.searchIcon = `<svg class="search-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="currentColor"/>
    <line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="currentColor"/>
    </svg>`;
    this.listenForInput();
  }
  render() {
    this.compEl.appendChild(this.searchInput);
    this.compEl.innerHTML += this.searchIcon;

    return this.compEl;
  }

  updateList(newlist) {
    this.list = newlist;
    this.filterList(this.searchInput.value);
  }

  filterList(input) {
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredList = this.list.filter((item) =>
      item
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(input)
    );
    this.parent.renderTags(filteredList);
  }

  listenForInput() {
    this.searchInput.addEventListener("input", (event) => {
      this.filterList(event.target.value);
    });
  }
}

export default FilterSearch;
