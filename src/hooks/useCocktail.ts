import { useState, useEffect, useCallback } from "react";
import { fetchCocktailById } from "services/api";
import { Cocktail } from "types/cocktail";

export const useCocktail = (id: string | undefined) => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCocktail = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const storedDrinks = localStorage.getItem("newDrinks");
      const newDrinks: Cocktail[] = storedDrinks ? JSON.parse(storedDrinks) : [];
      const foundNewDrink = newDrinks.find((drink) => drink.idDrink === id);

      if (foundNewDrink) {
        setCocktail(foundNewDrink);
      } else {
        const drink = await fetchCocktailById(id);
        setCocktail(drink);
      }
    } catch (err) {
      setError("Failed to fetch cocktail details.");
      console.error("Failed to fetch cocktail details", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCocktail();
  }, [loadCocktail]);

  return { cocktail, loading, error };
};
