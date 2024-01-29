import FilterModel from "./FilterModel.js";

// Filtre de recettes selon les appareils utilisés
// Class hérite de FilterModel
class FilterAppliance extends FilterModel {
  constructor(recipes, filterCriteria, updatePage, tagId, addTag) {
    super(); // initialise le constructeur de la classe abstraite
    this.filteredRecipes = recipes;
    this.filterCriteria = filterCriteria;
    this.updatePage = updatePage;
    this.tagId = tagId;
    this.addTag = addTag;
    super.listenForToggle(); // exécute la méthode définie dans filterModel pour ouvrir/fermer le menu.
  }

  // Méthode spécifique pour récupérer la liste des appareils utilisés dans la liste de recettes sélectionnées
  getTagNames() {
    const appliances = this.filteredRecipes.flatMap(
      (recipe) => recipe.appliance
    );
    const uniqueAppliances = Array.from(new Set(appliances))
      .map(
        (appliance) => appliance.charAt(0).toUpperCase() + appliance.slice(1)
      )
      .sort();

    return uniqueAppliances;
  }

  // Met à jour la liste filtrée des recettes sélectionnées
  update(recipes) {
    this.filteredRecipes = recipes;
    super.updateTags();
  }
}

export default FilterAppliance;
