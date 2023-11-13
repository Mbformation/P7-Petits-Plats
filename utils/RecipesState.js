class RecipesState {
  constructor(recipes) {
    this.recipes = recipes;
    this.currentRecipes = [];
  }
  searchBarFilter() {}
  ingredientsFilter() {}
  ustensilsFilter() {}

  appendRecipesCards() {
    // ici, je dois avoir accès à la méthode append du composant GridCards
  }
}

export default RecipesState;
