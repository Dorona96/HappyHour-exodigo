import axios from "axios";
import { Cocktail } from "../types/cocktail";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
// const BASE_URL = "http://localhost:5000/api";

export const fetchCocktailsByLetter = async (letter: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `${BASE_URL}/search.php?s=${letter}`
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
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `${BASE_URL}/lookup.php?i=${id}`
    );
    return response.data.drinks ? response.data.drinks[0] : null;
  } catch (error) {
    console.error(`error fetching cocktail with id ${id}`, error);
    throw error;
  }
};

export const searchCocktails = async (query: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `${BASE_URL}/search.php?s=${query}`
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

    localStorage.setItem("custom drinks", JSON.stringify(customDrinks));
    await new Promise((resolve) => setTimeout(resolve, 500));
    return newDrinkData;
  } catch (error) {
    console.error("error saving new drink");
    throw error;
  }
};
