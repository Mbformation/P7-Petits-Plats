import FilterModel from "./FilterModel.js";

class FilterIngredients extends FilterModel {
  constructor() {
    super();
    this.getTags();
  }

  getTags() {
    console.log(this.compEl);
    // dum method that is called by openBtn and that itself calls a parent method that:
    // - gets selected tags and selected recipes
    // - and calculate available ingredient tags
    // - returns the available tags to this method
    // this method then uses this list of available tags and re-renders them
  }

  filterByIngredients() {
    // appeler la méthode d'un parent
  }
}

export default FilterIngredients;
