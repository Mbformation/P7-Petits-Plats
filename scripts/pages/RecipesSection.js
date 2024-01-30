import FilterAppliance from "../components/filters/FilterAppliance.js";
import FilterUstensils from "../components/filters/FilterUstensils.js";
import FilterIngredients from "../components/filters/FilterIngredients.js";
import TotalRecipes from "../components/TotalRecipes.js";
import GridCards from "../components/GridCards.js";
import SelectedTag from "../components/SelectedTag.js";

class RecipesSection {
  constructor(recipes, filterCriteria, updatePage) {
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.compEl = document.createElement("section");
    this.compEl.classList.add("mid-content");
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("wrapper");
    this.searchContainer = document.createElement("div");
    this.searchContainer.classList.add("advanced-search-container");
    this.filters = document.createElement("div");
    this.filters.classList.add("filters-container");
    this.tagsContainer = document.createElement("div");
    this.tagsContainer.classList.add("tags-container");
    this.filterIngredients = new FilterIngredients(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "ingredients",
      this.addTag.bind(this)
    );
    this.filterAppliance = new FilterAppliance(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "appliance",
      this.addTag.bind(this)
    );
    this.filterUstensils = new FilterUstensils(
      this.filteredRecipes,
      this.filterCriteria,
      this.updatePage,
      "ustensils",
      this.addTag.bind(this)
    );
    this.totalRecipes = new TotalRecipes();
    this.gridCards = new GridCards();
  }
  render() {
    this.filters.appendChild(this.filterIngredients.render());
    this.filters.appendChild(this.filterAppliance.render());
    this.filters.appendChild(this.filterUstensils.render());
    this.searchContainer.appendChild(this.filters);
    this.searchContainer.appendChild(
      this.totalRecipes.render(this.filteredRecipes.length)
    );
    this.wrapper.appendChild(this.searchContainer);
    this.wrapper.appendChild(this.tagsContainer);
    this.wrapper.appendChild(this.gridCards.render(this.filteredRecipes));
    this.compEl.appendChild(this.wrapper);
    return this.compEl;
  }

  update(updatedRecipes) {
    this.filterIngredients.update(updatedRecipes);
    this.filterAppliance.update(updatedRecipes);
    this.filterUstensils.update(updatedRecipes);
    this.searchContainer.appendChild(
      this.totalRecipes.render(updatedRecipes.length)
    );
    this.wrapper.appendChild(this.gridCards.render(updatedRecipes));
  }
  addTag(tagName, tagType) {
    const newTag = new SelectedTag(
      tagName,
      this.filterCriteria,
      this.updatePage,
      tagType
    );
    this.tagsContainer.appendChild(newTag.render());
  }
}

export default RecipesSection;
