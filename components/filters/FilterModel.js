import Tag from "../Tag.js";

class FilterModel {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("dropdown");
    this.dropBtn = document.createElement("button");
    this.dropBtn.classList.add("dropdown-toggle");
    this.selectedTags = document.createElement("div");
    this.selectedTags.classList.add("selected-tags");
    this.tagOptions = document.createElement("ul");
    this.tagOptions.classList.add("filter-tags");
  }
  render() {
    this.dropBtn.innerHTML += `
      <span class="dropdown-title">Title</span>
      <span class="dropdown-chevron"></span>`;
    this.compEl.appendChild(this.dropBtn);
    return this.compEl;
  }

  renderTags(tagList) {
    tagList.forEach((name) => {
      this.tagOptions.appendChild(new Tag(name).render());
    });
    this.tagOptions.addEventListener("click", (event) => {
      if (event.target.classList.contains("tag")) {
        const ingredient = event.target.textContent;
        const filteredRecipes = this.parent.currentRecipes.filter((recipe) =>
          recipe.ingredients.some(
            (ingredientObj) => ingredientObj.ingredient === ingredient
          )
        );
        this.parent.currentRecipes = filteredRecipes;
        console.log(this.parent.currentRecipes);
        this.parent.append();
      }
    });
    return this.tagOptions;
  }

  renderMenu(tagList) {
    const menu = document.createElement("div");
    menu.classList.add("dropdown-menu");
    const search = document.createElement("input");
    search.setAttribute("type", "search");
    search.setAttribute("class", "filter-search");
    search.setAttribute("aria-label", "Search");
    menu.appendChild(search);
    menu.appendChild(this.selectedTags);
    menu.appendChild(this.renderTags(tagList, this.parent.currentRecipes));
    this.compEl.appendChild(menu);
  }

  closeMenu() {
    const menu = this.compEl.querySelector(".dropdown-menu");
    if (menu) {
      while (menu.nextSibling) {
        menu.parentNode.removeChild(menu.nextSibling);
      }
      this.compEl.removeChild(menu);
    }
  }

  listenForToggle(tagList) {
    let isOpen = false;
    this.dropBtn.addEventListener("click", () => {
      if (isOpen === false) {
        this.renderMenu(tagList);
      } else {
        this.closeMenu();
      }
      isOpen = !isOpen;
    });
  }
}

export default FilterModel;

// aura une méthode append et elle doit recevoir en argument une fonction
// cette fonction sera le filtrage spécifique à chaque filtre
