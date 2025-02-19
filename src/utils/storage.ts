import { Cocktail } from "types/cocktail";

export const saveDrinkToLocalStorage = (newDrink: Cocktail) => {
  const storedDrinks = localStorage.getItem("newDrinks");
  const newDrinks: Cocktail[] = storedDrinks ? JSON.parse(storedDrinks) : [];
  newDrinks.push(newDrink);
  localStorage.setItem("newDrinks", JSON.stringify(newDrinks));
};
