import FilterSearch from "./FilterSearch.js";
import Tag from "../Tag.js";
import SelectedTag from "../SelectedTag.js";

class FilterModel {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("dropdown");
    this.dropBtn = document.createElement("button");
    this.dropBtn.classList.add("dropdown-toggle");
    this.menu = document.createElement("div");
    this.menu.classList.add("dropdown-menu", "open");
    this.selectedTagsContainer = document.createElement("div");
    this.selectedTagsContainer.classList.add("selected-tags");
    this.tagOptions = document.createElement("ul");
    this.tagOptions.classList.add("filter-tags");
    this.tagOptions.addEventListener("click", (event) => {
      if (event.target.classList.contains("tag")) {
        this.selectedTagsContainer.appendChild(
          new SelectedTag(
            event.target.textContent,
            this.filterCriteria,
            this.updatePage
          ).render()
        );
        this.addTag(event.target.textContent);
        this.filterCriteria.push({
          value: event.target.textContent,
          type: this.tagId,
        });
        this.updatePage();
      }
    });
    this.selectedTags = [];
    this.filterSearch = new FilterSearch(this, this.selectedTags);
  }

  render() {
    this.dropBtn.innerHTML += `
      <div class="dropdown-title">${this.getFilterTitle()}</div>
      <div class="dropdown-chevron"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
      <path d="M1 1L7.5 7L14 1" stroke="currentColor" stroke-linecap="round"/>
    </svg></div>`;
    this.compEl.appendChild(this.dropBtn);
    return this.compEl;
  }

  renderTags(availableTags) {
    while (this.tagOptions.firstChild) {
      this.tagOptions.removeChild(this.tagOptions.firstChild);
    }
    availableTags.forEach((name) => {
      this.tagOptions.appendChild(new Tag(name).render());
    });
    return this.tagOptions;
  }

  renderMenu(availableTags) {
    this.filterSearch.updateList(availableTags);
    this.menu.appendChild(this.filterSearch.render());
    this.menu.appendChild(this.selectedTagsContainer);
    this.menu.appendChild(this.renderTags(availableTags));
    this.compEl.appendChild(this.menu);
  }

  updateMenu(getTagsList, recipes) {
    this.filteredRecipes = recipes;
    const tagList = getTagsList(this.filteredRecipes);
    this.selectedTags = Array.from(this.selectedTagsContainer.children).map(
      (child) => child.textContent
    );
    const tagsLeft = tagList.filter((tag) => !this.selectedTags.includes(tag));
    this.filterSearch.updateList(tagsLeft);
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

  getRecipes() {
    return this.filteredRecipes;
  }

  getFilterTitle() {
    switch (this.tagId) {
      case "ingredients":
        return "Ingrédients";
      case "appliance":
        return "Appareils";
      case "ustensils":
        return "Ustensiles";
      default:
        console.log(this.filterCriteria);
        return "Lolo";
    }
  }

  listenForToggle(getTagsList) {
    let isOpen = false;
    this.dropBtn.addEventListener("click", () => {
      const chevron = this.dropBtn.querySelector(".dropdown-chevron");
      chevron.classList.toggle("rotate");
      if (isOpen === false) {
        const tagList = getTagsList(this.getRecipes());
        const tagsLeft = tagList.filter(
          (tag) => !this.selectedTags.includes(tag)
        );
        this.renderMenu(tagsLeft);
      } else {
        this.closeMenu();
      }
      isOpen = !isOpen;
    });
  }
}

export default FilterModel;
