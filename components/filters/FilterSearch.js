class FilterSearch {
  constructor(parent, list) {
    this.parent = parent;
    this.list = list;
    this.compEl = document.createElement("input");
    this.compEl.setAttribute("type", "search");
    this.compEl.setAttribute("class", "filter-search");
    this.compEl.setAttribute("aria-label", "Search");
    this.compEl.classList.add("total-recipes");
    this.listenForInput();
  }
  render() {
    return this.compEl;
  }

  updateList(newlist) {
    this.list = newlist;
    this.filterList(this.compEl.value);
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
    this.compEl.addEventListener("input", (event) => {
      this.filterList(event.target.value);
    });
  }
}

export default FilterSearch;
