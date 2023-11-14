import FilterAppliance from "../../../components/filters/FilterAppliance.js";
import FilterUstensils from "../../../components/filters/FilterUstensils.js";
import FilterIngredients from "../../../components/filters/FilterIngredients.js";
import TotalRecipes from "../../../components/TotalRecipes.js";
import GridCards from "../../../components/GridCards.js";

class MidSection {
  constructor(recipesState) {
    this.recipesState = recipesState;
    this.currentRecipes = this.recipesState.recipes;
    this.compEl = document.createElement("section");
    this.compEl.classList.add("mid-content");
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.filters = document.createElement("div");
    this.filters.classList.add("filters-container");
    this.filterIngredients = new FilterIngredients(this);
    this.filterAppliance = new FilterAppliance(this);
    this.filterUstensils = new FilterUstensils(this);
    this.totalRecipes = new TotalRecipes();
    this.gridCards = new GridCards();
  }
  render() {
    this.filters.appendChild(this.filterIngredients.render());
    this.filters.appendChild(this.filterAppliance.render());
    this.filters.appendChild(this.filterUstensils.render());
    this.container.appendChild(this.filters);
    this.container.appendChild(
      this.totalRecipes.render(this.currentRecipes.length)
    );
    this.compEl.appendChild(this.container);
    this.compEl.appendChild(this.gridCards.render(this.currentRecipes));
    return this.compEl;
  }

  append() {
    this.filterIngredients.update(this.currentRecipes);
    this.filterAppliance.update(this.currentRecipes);
    this.filterUstensils.update(this.currentRecipes);

    this.container.appendChild(
      this.totalRecipes.render(this.currentRecipes.length)
    );
    this.compEl.appendChild(this.gridCards.render(this.currentRecipes));
  }
}

export default MidSection;
