// composant tag correspondant à un critère de recherche choisi
class SelectedTag {
  constructor(name, filterCriteria, updatePage, type) {
    this.name = name;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.type = type;
    this.compEl = document.createElement("div");
    this.compEl.classList.add(
      "selected-tag",
      `${this.name.toLowerCase().replace(/\W/g, "-")}`,
      this.type
    );
    this.title = document.createElement("span");
    this.title.textContent = `${this.name}`;
    this.removeBtn = document.createElement("button");
    this.removeBtn.classList.add("remove");
    this.removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
    <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    this.removeBtn.innerHTML = this.removeIcon;
    this.listenForRemove();
  }

  render() {
    this.compEl.appendChild(this.title);
    this.compEl.appendChild(this.removeBtn);
    return this.compEl;
  }

  // listener lorsqu'on retire le tag
  listenForRemove() {
    this.removeBtn.addEventListener("click", () => {
      // retirer le critère correspondant au tag du tableau de critères
      this.filterCriteria.forEach((obj, index) => {
        if (
          obj.value.toLowerCase().replace(/\W/g, "-") ===
          this.title.textContent.toLowerCase().replace(/\W/g, "-")
        ) {
          this.filterCriteria.splice(index, 1);
        }
      });
      // retirer le tag avant de chercher son jumeau
      this.compEl.remove();
      // chercher s'il y a un tag jumeau
      const twinTag = document.querySelector(
        `.${this.type}.${this.name.toLowerCase().replace(/\W/g, "-")}`
      );
      // si oui le retirer
      if (twinTag) {
        twinTag.remove();
      }
      this.updatePage();
    });
  }
}

export default SelectedTag;
