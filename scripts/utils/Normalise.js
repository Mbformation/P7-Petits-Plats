// fonction de normalisation de données pour faciliter les comparaisons
export function norm(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
