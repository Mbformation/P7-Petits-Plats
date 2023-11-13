import TopSection from "./TopSection.js";
import MidSection from "./MidSection.js";
import GetRecipes from "../../../utils/GetRecipes.js";
import RecipesState from "../../../utils/RecipesState.js";

class Page {
  constructor() {
    this.recipesState = new RecipesState(new GetRecipes());
  }

  render() {
    const app = document.querySelector(".app");
    app.appendChild(new TopSection(this.recipesState).render());
    app.appendChild(new MidSection(this.recipesState).render());
  }
}

const page = new Page();
page.render();
