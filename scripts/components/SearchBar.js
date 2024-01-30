import { sanitise } from "../utils/Sanitise.js";

// Composant de la recherche principale
class SearchBar {
  constructor(filterCriteria, update, addTag, showError) {
    this.filterCriteria = filterCriteria;
    this.update = update;
    this.addTag = addTag;
    this.showError = showError;
    this.compEl = document.createElement("div");
    this.compEl.classList.add("search-bar-container");
    this.searchBtn = document.createElement("button");
    this.label = document.createElement("label");
    this.label.setAttribute("for", "search-bar");
    this.input = document.createElement("input");
    this.input.setAttribute("type", "search");
    this.input.setAttribute("id", "search-bar");
    this.input.setAttribute(
      "placeholder",
      "Rechercher une recette, un ingrédient, ..."
    );
    this.input.setAttribute("aria-label", "Search");
    this.searchBtn = document.createElement("button");
    this.searchBtn.classList.add("search-btn");
    this.searchBtn.disabled = true;
    this.searchIcon = `<svg class="search-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="currentColor"/>
    <line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="currentColor"/>
    </svg>`;
    this.searchBtn.innerHTML = this.searchIcon;
    this.compEl.appendChild(this.label);
    this.compEl.appendChild(this.input);
    this.compEl.appendChild(this.searchBtn);
    this.listenForInput();
    this.listenForClick();
    // On désactive le bouton de recherche par défaut
    this.searchBtn.disabled = true;
    this.searchBtn.style.opacity = 0.5;
  }

  render() {
    return this.compEl;
  }

  // listener pour chaque input de l'utilisateur
  // proposer d'afficher les recettes et de créer un tag uniquement à partir de 3 caractères
  listenForInput() {
    this.compEl.addEventListener("input", (event) => {
      if (event.target.value.trim().length < 3) {
        this.searchBtn.disabled = true;
        this.searchBtn.style.opacity = 0.5;
      } else {
        this.searchBtn.disabled = false;
        this.searchBtn.style.opacity = 1;
      }
      if (
        event.target.value.trim().length < 3 &&
        event.target.value.trim().length > 0
      ) {
        this.showError();
        const exists = this.filterCriteria.find(
          (a) => a.value === "do-not-search" // valeur servant à afficher 0 recettes
        );
        if (!exists) {
          this.filterCriteria.push({
            value: "do-not-search",
            type: "search",
          });
        }
        const searchCriteriaIndex = this.filterCriteria.findIndex(
          (criteria) =>
            criteria.type === "search" && criteria.value !== "do-not-search"
        );
        // on supprime le critère do-not-search à partir de trois caractères
        if (searchCriteriaIndex !== -1) {
          this.filterCriteria.splice(searchCriteriaIndex, 1);
        }
        this.update(this.filterCriteria);

        return;
      }
      // on retire le message d'erreur
      const prevEl = document.querySelector(".error");
      if (prevEl) {
        prevEl.remove();
      }

      const doNotDisplayIndex = this.filterCriteria.findIndex(
        (criteria) => criteria.type === "do-not-search"
      );
      if (doNotDisplayIndex !== -1) {
        this.filterCriteria.splice(doNotDisplayIndex, 1);
      }

      const searchCriteriaIndex = this.filterCriteria.findIndex(
        (criteria) => criteria.type === "search"
      );
      if (searchCriteriaIndex !== -1) {
        this.filterCriteria.splice(searchCriteriaIndex, 1);
      }

      this.filterCriteria.push({
        value: sanitise(event.target.value), // on sécurise la saisie de données
        type: "search",
      });
      this.update(this.filterCriteria);
    });
  }

  // création d'un tag en cliquant sur le bouton de recherche
  listenForClick() {
    this.searchBtn.addEventListener("click", () => {
      this.addTag(this.input.value, "search-tag"); // exécute l'ajout d'un tag en dessous des filtres
      const searchCriteriaIndex = this.filterCriteria.findIndex(
        (criteria) => criteria.type === "search"
      );
      if (searchCriteriaIndex !== -1) {
        this.filterCriteria.splice(searchCriteriaIndex, 1);
      }
      this.filterCriteria.push({
        value: sanitise(this.input.value), // ici aussi on sécurise l'ajout de données
        type: "searched",
      });
      this.input.value = "";
    });
  }
}

export default SearchBar;
