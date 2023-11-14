import FilterModel from "./FilterModel.js";

class FilterAppliance extends FilterModel {
  constructor(parent) {
    super();
    this.parent = parent;
    super.listenForToggle(this.listAppliances(this.parent.currentRecipes));
  }

  listAppliances() {
    const appliances = this.parent.currentRecipes.flatMap(
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
    super.updateMenu(this.listAppliances(recipes));
  }
}

export default FilterAppliance;
