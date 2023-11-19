import SearchBar from "../../../components/SearchBar.js";

class TopSection {
  constructor(filterCriteria, update) {
    this.filterCriteria = filterCriteria;
    this.update = update;
    this.searchBar = new SearchBar(this.filterCriteria, this.update);
  }

  render() {
    const compEl = document.createElement("section");
    compEl.classList.add("top-content");
    compEl.appendChild(this.searchBar.render());

    return compEl;
  }
}

export default TopSection;
