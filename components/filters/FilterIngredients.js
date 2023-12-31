import FilterModel from "./FilterModel.js";

class FilterIngredients extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId, addTag) {
    super();
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    this.addTag = addTag;
    super.listenForToggle(this.listIngredients);
  }

  listIngredients(recipes) {
    const ingredients = recipes
      .flatMap((recipe) =>
        recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        )
      )
      .filter((ingredient, index, array) => array.indexOf(ingredient) === index)
      .map(
        (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
      )
      .sort();
    return ingredients;
  }
  update(recipes) {
    super.updateMenu(this.listIngredients, recipes);
  }
}

export default FilterIngredients;
