import TopSection from "./TopSection.js";
import MidSection from "./MidSection.js";
import GetRecipes from "../../../utils/GetRecipes.js";

class Page {
  constructor() {
    this.recipes = new GetRecipes();
    this.filterCriteria = [];
    this.filteredRecipes = [];
    this.topSection = new TopSection(
      this.filterCriteria,
      this.updatePage.bind(this)
    );
    this.midSection = new MidSection(
      this.filterRecipes(),
      this.filterCriteria,
      this.updatePage.bind(this)
    );
  }

  render() {
    const app = document.querySelector(".app");
    app.appendChild(this.topSection.render());
    app.appendChild(this.midSection.render());
  }

  updatePage() {
    this.filterRecipes();
    this.midSection.update(this.filteredRecipes);
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes.filter((recipe) => {
      return this.filterCriteria.every((criteria) => {
        const { value, type } = criteria;
        switch (type) {
          case "search":
            return this.searchFilter(recipe, value);
          case "ingredients":
            return this.propertyFilter(
              recipe.ingredients,
              "ingredients",
              value
            );
          case "appliance":
            return this.propertyFilter(recipe, "appliance", value);
          case "ustensils":
            return this.propertyFilter(recipe, "ustensils", value);
          default:
            return true; // return une valeur true ou false ?
        }
      });
    });
    return this.filteredRecipes;
  }

  searchFilter(recipe, value) {
    const { name, ingredients, description } = recipe;
    const lowerValue = value.toLowerCase();
    return (
      name.toLowerCase().includes(lowerValue) ||
      ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerValue)
      ) ||
      description.toLowerCase().includes(lowerValue)
    );
  }

  propertyFilter(item, property, value) {
    switch (property) {
      case "ingredients":
        const ing = item.map((i) =>
          i.ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
        const normalizedIngredient = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return ing.some((i) => i === normalizedIngredient);
      case "appliance":
        const appliance = item[property]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedValue = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return appliance === normalizedValue;
      case "ustensils":
        const ustensils = item[property].map((ustensil) =>
          ustensil
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
        const normalizedUstensil = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return ustensils.some((ustensil) => ustensil === normalizedUstensil);
      default:
        return false;
    }
  }
}

const page = new Page();
page.render();
