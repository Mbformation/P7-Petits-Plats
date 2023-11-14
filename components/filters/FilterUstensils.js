import FilterModel from "./FilterModel.js";

class FilterUstensils extends FilterModel {
  constructor(parent) {
    super();
    this.parent = parent;
    super.listenForToggle(this.listUstensils());
  }

  listUstensils() {
    const ustensils = this.parent.currentRecipes.flatMap(
      (recipe) => recipe.ustensils
    );
    const uniqueUstensils = Array.from(new Set(ustensils))
      .map((ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
      .sort();

    return uniqueUstensils;
  }
}

export default FilterUstensils;
