import FilterModel from "./FilterModel.js";

// Filtre de recettes selon les appareils utilisés
// Class hérite de FilterModel
class FilterIngredients extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId, addTag) {
    super(); // initialise le constructeur de la classe abstraite
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    this.addTag = addTag;
    super.listenForToggle(); // exécute la méthode définie dans filterModel pour ouvrir/fermer le menu.
    this.tagsLeft = this.getTagNames();
  }

  // Méthode spécifique pour récupérer la liste des ingrédients utilisés dans la liste de recettes sélectionnées
  getTagNames() {
    const ingredients = this.filteredRecipes
      .flatMap((recipe) =>
        recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        )
      )
      .filter((ingredient, index, array) => array.indexOf(ingredient) === index)
      .map(
        (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
      )
      .sort();
    return ingredients;
  }

  // Met à jour la liste filtrée des recettes sélectionnées
  update(recipes) {
    this.filteredRecipes = recipes;
    super.updateTags();
  }
}

export default FilterIngredients;
