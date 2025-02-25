import axios from "axios";
import { Cocktail } from "types/cocktail";

const BASE_URL = "http://localhost:5000/api";

export const fetchCocktailsByLetter = async (letter: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `${BASE_URL}/cocktails?s=${letter}`
    );

    return response.data.drinks || [];
  } catch (error) {
    console.error("error fetching cocktais by letter", error);
    throw error;
  }
};

export const fetchAllCocktails = async () => {
  try{
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const promises = letters.map((letter)=> fetchCocktailsByLetter(letter));
    const result = await Promise.all(promises);
    const allCoctails = result.flat();

    return allCoctails;
  }catch(error){
    console.error("failed to fetch all cocktails");
    throw error;
  }
}
export const fetchCocktailById = async (
  id: string
): Promise<Cocktail | null> => {
  try {
    const response = await axios.get<{ drinks: any[] }>(
      `${BASE_URL}/cocktail?i=${id}`
    );

    if (!response.data.drinks) return null;

    const rawCocktail = response.data.drinks[0];

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = rawCocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return {
      idDrink: rawCocktail.idDrink,
      strDrink: rawCocktail.strDrink,
      strDrinkThumb: rawCocktail.strDrinkThumb,
      strInstructions: rawCocktail.strInstructions || "No instructions available.",
      strIngredients: ingredients,
    };

  } catch (error) {
    console.error(`error fetching cocktail with id ${id}`, error);
    throw error;
  }
};

export const searchCocktails = async (query: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `${BASE_URL}/cocktails?s=${query}`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error("error searching cocktails", error);
    throw error;
  }
};

export const saveNewDrink = async (
  newDrink: Omit<Cocktail, "idDrink">
): Promise<Cocktail> => {
  try {
    const newDrinkData: Cocktail = {
      ...newDrink,
      idDrink: Date.now().toString(),
    };
    const storedDrinks = localStorage.getItem("customDrinks");
    const customDrinks: Cocktail[] = storedDrinks
      ? JSON.parse(storedDrinks)
      : [];

    customDrinks.push(newDrinkData);

    localStorage.setItem("customDrinks", JSON.stringify(customDrinks));
    await new Promise((resolve) => setTimeout(resolve, 500));
    return newDrinkData;
  } catch (error) {
    console.error("error saving new drink");
    throw error;
  }
};
