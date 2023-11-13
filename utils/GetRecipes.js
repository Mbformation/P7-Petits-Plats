import recipes from "../data/recipes.js";

class GetRecipes {
  constructor() {
    this.recipes = recipes;
    return this.recipes;
  }
}

export default GetRecipes;
