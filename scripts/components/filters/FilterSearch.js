// cette classe définit la barre de recherche à l'intérieur des filtres
// la liste de tags affichée dans chaque filtre est actualisée en fonction de l'input dans cette barre de recherche
class FilterSearch {
  constructor(filter) {
    this.filter = filter;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("input-container");
    this.searchInput = document.createElement("input");
    this.searchInput.setAttribute("type", "search");
    this.searchInput.setAttribute("aria-label", "Search");
    this.searchInput.classList.add("filter-search");
    this.searchIcon = `<svg class="search-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="currentColor"/>
    <line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="currentColor"/>
    </svg>`;
    this.listenForInput(); // executer la méthode à l'instanciation
  }

  render() {
    this.compEl.appendChild(this.searchInput);
    this.compEl.innerHTML += this.searchIcon;
    return this.compEl;
  }

  // écouter l'input de la barre de recherche et filtrer la liste de tags correspondant
  listenForInput() {
    this.compEl.addEventListener("input", (event) => {
      this.filter(event.target.value);
    });
  }
}

export default FilterSearch;
