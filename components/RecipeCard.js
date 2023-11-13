class RecipeCard {
  constructor(item) {
    this.item = item;
  }
  render() {
    const compEl = document.createElement("div");
    compEl.classList.add("recipe-card");
    const path = `./assets/recipesPhotos/${this.item.image}`;
    compEl.innerHTML += `<img src="${path}"/> 
    <h2>${this.item.name}</h2>
    <div class="recipe-title">Recette</div>
    <p>${this.item.description}</p>
    <div class="ingredients-title">Ingrédients</div>
    <ul class="ingredients-list">
    `;
    this.item.ingredients.forEach((ingredient) => {
      const { ingredient: name, quantity, unit } = ingredient;
      const ingredientEl = document.createElement("li");
      const ingredientsContainer = document.createElement("div");
      ingredientsContainer.classList.add("ingredients-container");
      if (unit) {
        ingredientsContainer.innerHTML += `<span>${name}</span><div class="measurement"><span>${quantity}</span><span>${unit}</span></div></div>`;
      } else {
        ingredientsContainer.innerHTML += `<span>${name}</span><span>${quantity}</span></div>`;
      }
      ingredientEl.appendChild(ingredientsContainer);
      compEl.querySelector(".ingredients-list").appendChild(ingredientEl);
    });
    return compEl;
  }
}

export default RecipeCard;
