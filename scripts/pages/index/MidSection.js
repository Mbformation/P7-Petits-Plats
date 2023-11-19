import FilterAppliance from "../../../components/filters/FilterAppliance.js";
import FilterUstensils from "../../../components/filters/FilterUstensils.js";
import FilterIngredients from "../../../components/filters/FilterIngredients.js";
import TotalRecipes from "../../../components/TotalRecipes.js";
import GridCards from "../../../components/GridCards.js";

class MidSection {
  constructor(recipes, filterCriteria, updatePage) {
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.compEl = document.createElement("section");
    this.compEl.classList.add("mid-content");
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.filters = document.createElement("div");
    this.filters.classList.add("filters-container");
    this.filterIngredients = new FilterIngredients(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "ingredients"
    );
    this.filterAppliance = new FilterAppliance(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "appliance"
    );
    this.filterUstensils = new FilterUstensils(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "ustensils"
    );
    this.totalRecipes = new TotalRecipes();
    this.gridCards = new GridCards();
  }
  render() {
    this.filters.appendChild(this.filterIngredients.render());
    this.filters.appendChild(this.filterAppliance.render());
    this.filters.appendChild(this.filterUstensils.render());
    this.container.appendChild(this.filters);
    this.container.appendChild(
      this.totalRecipes.render(this.filteredRecipes.length)
    );
    this.compEl.appendChild(this.container);
    this.compEl.appendChild(this.gridCards.render(this.filteredRecipes));
    return this.compEl;
  }

  update(updatedRecipes) {
    this.filterIngredients.update(updatedRecipes);
    this.filterAppliance.update(updatedRecipes);
    this.filterUstensils.update(updatedRecipes);
    this.container.appendChild(this.totalRecipes.render(updatedRecipes.length));
    this.compEl.appendChild(this.gridCards.render(updatedRecipes));
  }
}

export default MidSection;
