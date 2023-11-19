import FilterModel from "./FilterModel.js";

class FilterAppliance extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId) {
    super();
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    super.listenForToggle(this.listAppliances);
  }

  listAppliances(recipes) {
    const appliances = recipes.flatMap((recipe) => recipe.appliance);
    const uniqueAppliances = Array.from(new Set(appliances))
      .map(
        (appliance) => appliance.charAt(0).toUpperCase() + appliance.slice(1)
      )
      .sort();

    return uniqueAppliances;
  }
  update(recipes) {
    super.updateMenu(this.listAppliances, recipes);
  }
}

export default FilterAppliance;
