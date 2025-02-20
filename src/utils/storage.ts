import { Cocktail } from "types/cocktail";

export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallback;
  } catch (error) {
    console.error("Failed to load from localStorage", error);
    return fallback;
  }
};

export const saveDrinkToLocalStorage = (newDrink: Cocktail) => {
  const storedDrinks = localStorage.getItem("newDrinks");
  const newDrinks: Cocktail[] = storedDrinks ? JSON.parse(storedDrinks) : [];
  newDrinks.push(newDrink);
  localStorage.setItem("newDrinks", JSON.stringify(newDrinks));
};