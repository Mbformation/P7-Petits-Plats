import FilterModel from "./FilterModel.js";

class FilterIngredients extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId) {
    super();
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    super.listenForToggle(this.listIngredients);
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
    super.updateMenu(this.listIngredients, recipes);
  }
}

export default FilterIngredients;
