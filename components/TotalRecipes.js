class TotalRecipes {
  constructor() {
    this.compEl = document.createElement("div");
    this.compEl.classList.add("total-recipes");
  }
  render(total) {
    this.compEl.textContent = `${total} recettes`;
    return this.compEl;
  }

  append(newTotal) {
    const newEl = document.createElement("div");
    newEl.classList.add("total-recipes");
    newEl.textContent = `${newTotal} recettes`;
    this.compEl.replaceWith(newEl);
  }
}

export default TotalRecipes;
