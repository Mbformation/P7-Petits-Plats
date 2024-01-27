import RecipeCard from "./RecipeCard.js";

class GridCards {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("grid-cards");
  }
  render(recipes) {
    while (this.compEl.firstChild) {
      this.compEl.removeChild(this.compEl.firstChild);
    }
    recipes.forEach((recipe) => {
      this.compEl.appendChild(new RecipeCard(recipe).render());
    });
    return this.compEl;
  }
}

export default GridCards;
