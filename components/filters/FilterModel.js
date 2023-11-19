import FilterSearch from "./FilterSearch.js";
import Tag from "../Tag.js";

class FilterModel {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("dropdown");
    this.dropBtn = document.createElement("button");
    this.dropBtn.classList.add("dropdown-toggle");
    this.menu = document.createElement("div");
    this.menu.classList.add("dropdown-menu");
    this.selectedTagsContainer = document.createElement("ul");
    this.selectedTagsContainer.classList.add("selected-tags");
    this.tagOptions = document.createElement("ul");
    this.tagOptions.classList.add("filter-tags");
    this.tagOptions.addEventListener("click", (event) => {
      if (event.target.classList.contains("tag")) {
        this.selectedTagsContainer.appendChild(
          new Tag(event.target.textContent).render()
        );
        this.filterCriteria.push({
          value: event.target.textContent,
          type: this.tagId,
        });
        this.updatePage();
      }
    });
    this.filterSearch = new FilterSearch(this);
    this.selectedTags = [];
  }

  render() {
    this.dropBtn.innerHTML += `
      <span class="dropdown-title">Title</span>
      <span class="dropdown-chevron"></span>`;
    this.compEl.appendChild(this.dropBtn);
    return this.compEl;
  }

  renderTags(availableTags) {
    while (this.tagOptions.firstChild) {
      this.tagOptions.removeChild(this.tagOptions.firstChild);
    }
    availableTags.forEach((name) => {
      this.tagOptions.appendChild(new Tag(name, this.tagId).render());
    });
    return this.tagOptions;
  }

  renderMenu(availableTags) {
    this.menu.appendChild(this.filterSearch.render());
    this.menu.appendChild(this.selectedTagsContainer);
    this.menu.appendChild(this.renderTags(availableTags));
    this.compEl.appendChild(this.menu);
  }

  updateMenu(getTagsList, recipes) {
    this.filteredRecipes = recipes;
    const tagList = getTagsList(this.filteredRecipes);
    const selectedTags = Array.from(this.selectedTagsContainer.children).map(
      (child) => child.textContent
    );
    const tagsLeft = tagList.filter((tag) => !selectedTags.includes(tag));
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

  listenForToggle(getTagsList) {
    let isOpen = false;
    this.dropBtn.addEventListener("click", () => {
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
