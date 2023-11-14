import FilterModel from "./FilterModel.js";

class FilterIngredients extends FilterModel {
  constructor(parent) {
    super();
    this.parent = parent;
    super.listenForToggle(this.listIngredients(this.parent.currentRecipes));
  }
  listIngredients(recipes) {
    const ingredients = recipes.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    );
    const uniqueIngredients = ingredients
      .filter((ingredient, index) => ingredients.indexOf(ingredient) === index)
      .map(
        (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
      )
      .sort();

    return uniqueIngredients;
  }
  update(recipes) {
    super.renderTags(this.listIngredients(recipes));
  }
}

export default FilterIngredients;

// dum method that is called by openBtn and that itself calls a parent method that:
// - gets selected tags and selected recipes
// - and calculate available ingredient tags
// - returns the available tags to this method
// this method then uses this list of available tags and re-renders them
