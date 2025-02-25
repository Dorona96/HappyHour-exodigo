import { useCallback } from "react";
import { Cocktail } from "types/cocktail";

export const useDrinkValidation = (state: Cocktail, image: File | null) => {
  return useCallback(() => {
    if (!state.strDrink.trim() || state.strIngredients.some((i: string) => !i.trim()) || !state.strInstructions.trim() || !image) {
      return "Please fill in all required fields and upload an image.";
    }
    return null;
  }, [state, image]);
};
