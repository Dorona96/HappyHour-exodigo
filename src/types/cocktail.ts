export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string; 
  strIngredients: string[],
  strInstructions: string;
  strIBA?: string; 
  strGlass?: string;
  strTags?: string[];
  strCategory?: string;
  strAlcoholic?: string;
  strDrinkAlternate?: string;
}