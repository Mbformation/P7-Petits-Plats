import FilterAppliance from "../../../components/filters/FilterAppliance.js";
import FilterUstensils from "../../../components/filters/FilterUstensils.js";
import FilterIngredients from "../../../components/filters/FilterIngredients.js";
import TotalRecipes from "../../../components/TotalRecipes.js";
import GridCards from "../../../components/GridCards.js";

class MidSection {
  constructor(recipesState) {
    this.recipesState = recipesState;
    this.allRecipes = this.recipesState.recipes;
    this.currentRecipes = null;
    this.compEl = document.createElement("section");
    this.compEl.classList.add("mid-content");
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.filters = document.createElement("div");
    this.filters.classList.add("filters-container");
    this.filterIngredients = new FilterIngredients(this).render();
    this.filterAppliance = new FilterAppliance(this).render();
    this.filterUstensils = new FilterUstensils(this).render();
    this.totalRecipes = new TotalRecipes().render(this.allRecipes.length);
    this.gridCards = new GridCards(this.currentRecipes).render(this.allRecipes);
  }
  render() {
    this.filters.appendChild(this.filterIngredients);
    this.filters.appendChild(this.filterAppliance);
    this.filters.appendChild(this.filterUstensils);
    this.container.appendChild(this.filters);
    this.container.appendChild(this.totalRecipes);
    this.compEl.appendChild(this.container);
    this.compEl.appendChild(this.gridCards);
    return this.compEl;
  }

  append() {
    //this.compEl.appendChild(this.filterIngredients.append());
    //this.compEl.appendChild(this.filterAppliance.append());
    //this.compEl.appendChild(this.filterUstensils.append());
    //this.compEl.appendChild(this.totalRecipes.append(this.currentRecipes.length));
  }
}

export default MidSection;
