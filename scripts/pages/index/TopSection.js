import SearchBar from "../../../components/SearchBar.js";

class TopSection {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const compEl = document.createElement("section");
    compEl.classList.add("top-content");
    compEl.appendChild(new SearchBar(this.parent).render());

    return compEl;
  }
}

export default TopSection;
