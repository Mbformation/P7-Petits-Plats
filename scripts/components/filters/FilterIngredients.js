import FilterModel from "./FilterModel.js";

class FilterIngredients extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId, addTag) {
    super();
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    this.addTag = addTag;
    super.listenForToggle();
  }

  getTagNames() {
    const ingredients = this.filteredRecipes
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
    this.filteredRecipes = recipes;
    super.updateTags();
  }
}

export default FilterIngredients;
