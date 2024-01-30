import RecipeCard from "./RecipeCard.js";

// Ajoute les éléments pour la grille de recettes
class GridCards {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("grid-cards");
  }
  render(recipes) {
    // retirer les cards de l'ancienne sélection
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
