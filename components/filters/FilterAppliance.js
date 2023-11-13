import FilterModel from "./FilterModel.js";

class FilterAppliance extends FilterModel {
  constructor(parent) {
    super();
    this.parent = parent;
    this.renderTags();
  }
  renderTags() {
    const appliances = this.parent.allRecipes.flatMap(
      (recipe) => recipe.appliance
    );
    return super.renderTags(appliances);
  }
}

export default FilterAppliance;
