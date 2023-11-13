class FilterModel {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("dropdown");
    this.dropBtn = document.createElement("button");
    this.dropBtn.classList.add("dropdown-toggle");
    this.tagList = {};
    this.listenDropBtn();
  }
  render() {
    this.dropBtn.innerHTML += `
      <span class="dropdown-title">Title</span>
      <span class="dropdown-chevron"></span>`;
    this.compEl.appendChild(this.dropBtn);
    return this.compEl;
  }

  renderTags() {
    const container = document.createElement("div");
    container.classList.add("tag-container");

    return container;
  }

  renderMenu() {
    const menu = document.createElement("div");
    menu.classList.add("dropdown-menu");
    const search = document.createElement("input");
    search.setAttribute("type", "search");
    search.setAttribute("class", "filter-search");
    search.setAttribute("aria-label", "Search");
    menu.appendChild(search);
    menu.appendChild(this.renderTags());
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

  listenForChoice() {}

  listenDropBtn() {
    let isOpen = false;
    this.dropBtn.addEventListener("click", () => {
      if (isOpen === false) {
        this.renderMenu();
        this.listenForChoice();
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
/*
    <ul class="ingredient-list">
      <li>Ingredient 1</li>
      <li>Ingredient 2</li>
      <li>Ingredient 3</li>
      <!-- More list items -->
    </ul>
  </div>
  }*/
