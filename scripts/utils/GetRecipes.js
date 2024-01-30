import recipes from "../../data/recipes.js";

// récupère les recettes du fichier recipes.js
class GetRecipes {
  constructor() {
    this.recipes = recipes;
    return this.recipes;
  }
}

export default GetRecipes;
