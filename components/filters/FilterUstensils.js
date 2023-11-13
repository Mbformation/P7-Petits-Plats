import FilterModel from "./FilterModel.js";

class FilterUstensils extends FilterModel {
  constructor(parent) {
    super();
    this.parent = parent;
    this.renderTags();
  }
  renderTags() {
    const ustensils = this.parent.allRecipes.flatMap(
      (recipe) => recipe.ustensils
    );
    return super.renderTags(ustensils);
  }
}

export default FilterUstensils;
