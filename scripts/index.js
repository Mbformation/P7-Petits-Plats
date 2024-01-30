import SearchSection from "./pages/SearchSection.js";
import RecipesSection from "./pages/RecipesSection.js";
import GetRecipes from "./utils/GetRecipes.js";
import { norm } from "./utils/Normalise.js";

class Page {
  constructor() {
    this.recipes = new GetRecipes();
    this.filterCriteria = [];
    this.filteredRecipes = [];
    this.searchSection = new SearchSection(
      this.filterCriteria,
      this.updatePage.bind(this),
      this.addTag.bind(this)
    );
    this.recipesSection = new RecipesSection(
      this.recipes,
      this.filterCriteria,
      this.updatePage.bind(this)
    );
  }

  render() {
    const app = document.querySelector(".app");
    app.appendChild(this.searchSection.render());
    app.appendChild(this.recipesSection.render());
  }

  updatePage() {
    console.log(this.filterCriteria);
    const filteredRecipes = this.filterRecipes(
      this.recipes,
      this.filterCriteria
    );
    this.recipesSection.update(filteredRecipes);
  }

  filterRecipes(recipes, filterCriteria) {
    return recipes.filter((recipe) => {
      return filterCriteria.every((criteria) => {
        const { value, type } = criteria;

        switch (type) {
          case "searched":
            return this.searchFilter(recipe, value);
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
    let ing,
      normalizedIngredient,
      appliance,
      normalizedValue,
      ustensils,
      normalizedUstensil;
    switch (property) {
      case "ingredients":
        ing = item.map((i) => norm(i.ingredient));
        normalizedIngredient = norm(value);
        return ing.some((i) => i === normalizedIngredient);
      case "appliance":
        appliance = norm(item[property]);
        normalizedValue = norm(value);
        return appliance === normalizedValue;
      case "ustensils":
        ustensils = item[property].map((ustensil) => norm(ustensil));
        normalizedUstensil = norm(value);
        return ustensils.some((ustensil) => ustensil === normalizedUstensil);
      default:
        return false;
    }
  }

  addTag(tagName, tagType) {
    this.recipesSection.addTag(tagName, tagType);
  }
}

const page = new Page();
page.render();
