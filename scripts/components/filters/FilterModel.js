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
    this.filterSearch = new FilterSearch(this.filterList.bind(this));
  }

  render() {
    this.dropBtn.innerHTML += `
      <div class="dropdown-title">${this.getFilterTitle()}</div>
      <div class="dropdown-chevron"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
      <path d="M1 1L7.5 7L14 1" stroke="currentColor" stroke-linecap="round"/>
    </svg></div>`;
    this.compEl.appendChild(this.dropBtn);
    this.menu.appendChild(this.filterSearch.render());
    this.menu.appendChild(this.selectedTagsContainer);
    this.menu.appendChild(this.renderTags(this.getTagNames()));
    this.compEl.appendChild(this.menu);
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

  updateTags() {
    this.selectedTags = Array.from(this.selectedTagsContainer.children).map(
      (child) => child.textContent.trim()
    );

    for (const tag of this.selectedTags) {
      if (typeof tag !== "string" || !tag) {
        this.selectedTags = this.selectedTags.filter(
          (otherTag) => otherTag !== tag
        );
      }
    }

    const tagsLeft = this.getTagNames().filter(
      (tag) => !this.selectedTags.includes(tag.trim())
    );

    this.renderTags(tagsLeft);
  }

  filterList(input) {
    const lowercaseInput = input.toLowerCase();

    const filteredList = this.getTagNames().filter((item) =>
      item.toLowerCase().includes(lowercaseInput)
    );

    this.renderTags(filteredList);
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
        return "Undefined";
    }
  }

  listenForToggle() {
    this.dropBtn.addEventListener("click", () => {
      const chevron = this.dropBtn.querySelector(".dropdown-chevron");
      chevron.classList.toggle("rotate");
      this.menu.classList.toggle("show");
    });
  }
}

export default FilterModel;
