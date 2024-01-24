import TopSection from "./TopSection.js";
import MidSection from "./MidSection.js";
import GetRecipes from "../../../utils/GetRecipes.js";
import { norm } from "../../../utils/normalise.js";

class Page {
  constructor() {
    this.recipes = new GetRecipes();
    this.filterCriteria = [];
    this.filteredRecipes = [];
    this.topSection = new TopSection(
      this.filterCriteria,
      this.updatePage.bind(this),
      this.addTag.bind(this)
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
            return true;
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
        const ing = item.map((i) => norm(i.ingredient));
        const normalizedIngredient = norm(value);
        return ing.some((i) => i === normalizedIngredient);
      case "appliance":
        const appliance = norm(item[property]);
        const normalizedValue = norm(value);
        return appliance === normalizedValue;
      case "ustensils":
        const ustensils = item[property].map((ustensil) => norm(ustensil));
        const normalizedUstensil = norm(value);
        return ustensils.some((ustensil) => ustensil === normalizedUstensil);
      default:
        return false;
    }
  }
  addTag(tagName) {
    this.midSection.addTag(tagName);
  }
}

const page = new Page();
page.render();
