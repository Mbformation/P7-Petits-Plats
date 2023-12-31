import FilterModel from "./FilterModel.js";

class FilterUstensils extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId, addTag) {
    super();
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    this.addTag = addTag;
    super.listenForToggle(this.listUstensils);
  }

  listUstensils(recipes) {
    const ustensils = recipes
      .flatMap((recipe) => recipe.ustensils)
      .map((ustensil) => ustensil.toLowerCase());
    const uniqueUstensils = Array.from(new Set(ustensils))
      .map((ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
      .sort();
    return uniqueUstensils;
  }
  update(recipes) {
    super.updateMenu(this.listUstensils, recipes);
  }
}

export default FilterUstensils;
