// composant comptabilisant le total de recettes correspondantes
class TotalRecipes {
  constructor() {
    this.compEl = document.createElement("h3");
    this.compEl.classList.add("total-recipes");
  }
  render(total) {
    this.compEl.textContent = `${total} recettes`;
    return this.compEl;
  }
}

export default TotalRecipes;
