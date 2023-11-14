class TotalRecipes {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("total-recipes");
  }
  render(total) {
    this.compEl.textContent = `${total} recettes`;
    return this.compEl;
  }
}

export default TotalRecipes;
