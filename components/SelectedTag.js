class SelectedTag {
  constructor(name, filterCriteria, updatePage) {
    this.name = name;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("selected-tag");
    this.title = document.createElement("span");
    this.title.textContent = `${this.name}`;
    this.removeBtn = document.createElement("button");
    this.removeBtn.classList.add("remove");
    this.listenForRemove();
  }

  render() {
    this.compEl.appendChild(this.title);
    this.compEl.appendChild(this.removeBtn);
    return this.compEl;
  }

  listenForRemove() {
    this.removeBtn.addEventListener("click", (event) => {
      console.log(this.title.textContent);
      const indexToRemove = this.filterCriteria.findIndex(
        (obj) => obj.value === this.title.textContent
      );

      if (indexToRemove !== -1) {
        this.filterCriteria.splice(indexToRemove, 1);
      }
      this.compEl.remove();
      this.updatePage();
    });
  }
}

export default SelectedTag;
