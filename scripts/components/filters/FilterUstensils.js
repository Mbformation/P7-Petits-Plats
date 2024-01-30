import FilterModel from "./FilterModel.js";

// Filtre de recettes selon les appareils utilisés
// Class hérite de FilterModel
class FilterUstensils extends FilterModel {
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

  // Méthode spécifique pour récupérer la liste des ustensiles utilisés dans la liste de recettes sélectionnées
  getTagNames() {
    const ustensils = this.filteredRecipes
      .flatMap((recipe) => recipe.ustensils)
      .map((ustensil) => ustensil.toLowerCase());
    const uniqueUstensils = Array.from(new Set(ustensils))
      .map((ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
      .sort();
    return uniqueUstensils;
  }

  // Met à jour la liste filtrée des recettes sélectionnées
  update(recipes) {
    this.filteredRecipes = recipes;
    super.updateTags();
  }
}

export default FilterUstensils;
