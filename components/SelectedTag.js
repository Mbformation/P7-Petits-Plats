class SelectedTag {
  constructor(name, filterCriteria, updatePage) {
    this.name = name;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("selected-tag", `${this.name}`);
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

  listenForRemove() {
    this.removeBtn.addEventListener("click", (event) => {
      const indexToRemove = this.filterCriteria.findIndex(
        (obj) => obj.value === this.title.textContent
      );

      if (indexToRemove !== -1) {
        this.filterCriteria.splice(indexToRemove, 1);
      }
      const compEls = document.querySelectorAll(`.${this.name}`);

      for (const el of compEls) {
        el.parentNode.removeChild(el);
      }

      this.updatePage();
    });
  }
}

export default SelectedTag;
