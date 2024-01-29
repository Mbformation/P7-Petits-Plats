import SearchSection from "./pages/SearchSection.js";
import RecipesSection from "./pages/RecipesSection.js";
import GetRecipes from "../utils/GetRecipes.js";
import { norm } from "../utils/normalise.js";

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
    const filteredRecipes = this.filterRecipes(
      this.recipes,
      this.filterCriteria
    );
    this.recipesSection.update(filteredRecipes);
  }

  filterRecipes(recipes, filterCriteria) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      for (let v = 0; v < filterCriteria.length; v++) {
        const { value, type } = filterCriteria[v];
        console.log(value, type);

        switch (type) {
          case "searched":
            if (this.searchFilter(recipe, value)) {
              filteredRecipes.push(recipe);
            }
            break;

          case "search":
            if (this.searchFilter(recipe, value)) {
              filteredRecipes.push(recipe);
            }
            break;

          case "ingredients":
            if (this.propertyFilter(recipe.ingredients, "ingredients", value)) {
              filteredRecipes.push(recipe);
            }
            break;

          case "appliance":
            if (this.propertyFilter(recipe, "appliance", value)) {
              filteredRecipes.push(recipe);
            }
            break;

          case "ustensils":
            if (this.propertyFilter(recipe, "ustensils", value)) {
              filteredRecipes.push(recipe);
            }
            break;

          default:
            console.log("dfault");
        }
      }
    }

    return filteredRecipes;
  }

  searchFilter(recipe, value) {
    const name = recipe.name;
    const ingredients = recipe.ingredients;
    const description = recipe.description;
    const lowerValue = value.toLowerCase();
    let isFound = false;
    for (let i = 0; i < ingredients.length; i++) {
      const ing = ingredients[i].ingredient.toLowerCase();
      if (ing.includes(lowerValue)) {
        isFound = true;
      }
    }

    if (name.toLowerCase().includes(lowerValue)) {
      isFound = true;
    }

    if (description.toLowerCase().includes(lowerValue)) {
      isFound = true;
    }

    return isFound;
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
    this.recipesSection.addTag(tagName);
  }
}

const page = new Page();
page.render();
