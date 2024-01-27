import FilterModel from "./FilterModel.js";

class FilterAppliance extends FilterModel {
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
    const appliances = this.filteredRecipes.flatMap(
      (recipe) => recipe.appliance
    );
    const uniqueAppliances = Array.from(new Set(appliances))
      .map(
        (appliance) => appliance.charAt(0).toUpperCase() + appliance.slice(1)
      )
      .sort();

    return uniqueAppliances;
  }
  update(recipes) {
    this.filteredRecipes = recipes;
    super.updateTags();
  }
}

export default FilterAppliance;
