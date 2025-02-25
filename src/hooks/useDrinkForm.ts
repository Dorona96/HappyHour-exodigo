import { useReducer, useState, useEffect } from "react";
import { formReducer, initialState } from "reducers/drinkFormReducer";
import { loadFromLocalStorage } from "utils/storage";
import useDebounce from "hooks/useDebounce";

const FORM_STORAGE_KEY = "drinkFormState";

export const useDrinkForm = () => {
  const [state, dispatch] = useReducer(
    formReducer,
    loadFromLocalStorage(FORM_STORAGE_KEY, initialState)
  );
  
  const [error, setError] = useState<string | null>(null);
  const debouncedState = useDebounce(state, 500);
  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(debouncedState));
  }, [debouncedState]);

  const setName = (name: string) => dispatch({ type: "SET_NAME", payload: name });
  const setInstructions = (instructions: string) => dispatch({ type: "SET_INSTRUCTIONS", payload: instructions });
  const addIngredient = () => dispatch({ type: "ADD_INGREDIENT" });
  const removeIngredient = (index: number) => dispatch({ type: "REMOVE_INGREDIENT", payload: index });
  const updateIngredient = (index: number, value: string) => dispatch({ type: "SET_INGREDIENT", payload: { index, value } });
  const resetForm = () => dispatch({ type: "RESET_FORM" });

  return {
    state,
    error,
    setError,
    setName,
    setInstructions,
    addIngredient,
    removeIngredient,
    updateIngredient,
    resetForm,
    dispatch,
  };
};
