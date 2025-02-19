export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string | null; 
  strIngredients: string[],
  strInstructions: string;
}