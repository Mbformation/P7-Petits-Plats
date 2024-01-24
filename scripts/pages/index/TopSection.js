import SearchBar from "../../../components/SearchBar.js";

class TopSection {
  constructor(filterCriteria, update, addTag) {
    this.filterCriteria = filterCriteria;
    this.update = update;
    this.addTag = addTag;
    this.searchBar = new SearchBar(
      this.filterCriteria,
      this.update,
      this.addTag,
      this.showError.bind(this)
    );
    this.container = document.createElement("div");
  }

  render() {
    const compEl = document.createElement("section");
    compEl.classList.add("top-content");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    const logoPath = "assets/full-logo.png";
    const fullLogo = document.createElement("img");
    fullLogo.src = logoPath;
    const searchTitle = document.createElement("h1");
    searchTitle.textContent =
      "Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses";
    this.container.classList.add("search-container");
    this.container.appendChild(searchTitle);
    this.container.appendChild(this.searchBar.render());
    wrapper.appendChild(fullLogo);
    wrapper.appendChild(this.container);
    compEl.appendChild(wrapper);
    return compEl;
  }

  showError() {
    const prevEl = document.querySelector(".error");
    if (prevEl) {
      prevEl.remove();
    }
    const el = document.createElement("p");
    el.classList.add("error");
    el.textContent = "Veuillez renseigner au moins 3 caracatères.";
    this.container.appendChild(el);
  }
}

export default TopSection;
