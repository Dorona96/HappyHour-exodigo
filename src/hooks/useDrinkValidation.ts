import { useCallback } from "react";

export const useDrinkValidation = (state: any, image: File | null) => {
  return useCallback(() => {
    if (!state.name.trim() || state.ingredients.some((i: string) => !i.trim()) || !state.instructions.trim() || !image) {
      return "Please fill in all required fields and upload an image.";
    }
    return null;
  }, [state, image]);
};
