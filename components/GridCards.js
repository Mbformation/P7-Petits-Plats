import RecipeCard from "./RecipeCard.js";

class GridCards {
  constructor(currentRecipes) {
    this.currentRecipes = currentRecipes;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("grid-cards");
  }
  render(recipes) {
    recipes.forEach((recipe) => {
      this.compEl.appendChild(new RecipeCard(recipe).render());
    });
    this.currentRecipes = recipes;
    return this.compEl;
  }
}

export default GridCards;
