import React, { useReducer, useCallback, useEffect } from "react";
import { Cocktail } from "types/cocktail";
import styles from "./DrinkForm.module.scss";
import { useImageUpload } from "hooks/useImageUpload";
import { loadFromLocalStorage, saveDrinkToLocalStorage } from "utils/storage";
import { imageToBase64 } from "utils/imageUtils";
import { formReducer, initialState } from "reducers/drinkFormReducer";

const FORM_STORAGE_KEY = "drinkFormState";
const DrinkForm: React.FC = () => {
  const [state, dispatch] = useReducer(
    formReducer,
    loadFromLocalStorage(FORM_STORAGE_KEY, initialState)
  );
  const { image, preview, handleImageChange, resetImage } = useImageUpload();
  const [error, setError] = React.useState<string | null>(null);

  const setName = (name: string) =>
    dispatch({ type: "SET_NAME", payload: name });
  const setInstructions = (instructions: string) =>
    dispatch({ type: "SET_INSTRUCTIONS", payload: instructions });
  const addIngredient = () => dispatch({ type: "ADD_INGREDIENT" });
  const removeIngredient = (index: number) =>
    dispatch({ type: "REMOVE_INGREDIENT", payload: index });
  const updateIngredient = (index: number, value: string) =>
    dispatch({ type: "SET_INGREDIENT", payload: { index, value } });
  const resetForm = () => dispatch({ type: "RESET_FORM" });

  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const validateForm = useCallback(() => {
    if (
      !state.name.trim() ||
      state.ingredients.some((i) => !i.trim()) ||
      !state.instructions.trim() ||
      !image
    ) {
      return "Please fill in all required fields and upload an image.";
    }
    return null;
  }, [state, image]);

  const handleSaveDrink = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const base64Image = image ? await imageToBase64(image) : "";

    const newDrink: Cocktail = {
      idDrink: Date.now().toString(),
      strDrink: state.name,
      strInstructions: state.instructions,
      strDrinkThumb: base64Image,
      strIngredients: state.ingredients,
    };

    saveDrinkToLocalStorage(newDrink);
    dispatch({ type: "RESET_FORM" });
    resetImage();
    setError(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSaveDrink}>
      <h2>Add a New Cocktail</h2>

      {error && <span className={styles.error}>{error}</span>}

      <label htmlFor="name">Drink Name</label>
      <input
        id="name"
        placeholder="Enter cocktail name"
        value={state.name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Ingredients</label>
      {state.ingredients.map((ingredient, index) => (
        <div key={index} className={styles.ingredientField}>
          <input
            type="text"
            value={ingredient}
            placeholder="Ingredient"
            onChange={(e) => updateIngredient(index, e.target.value)}
          />
          {state.ingredients.length > 1 && (
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => removeIngredient(index)}
            >
              ✖
            </button>
          )}
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addIngredient}>
        + Add Ingredient
      </button>

      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        placeholder="How to prepare the cocktail"
        value={state.instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <label htmlFor="imageUpload">Upload Image</label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Cocktail Preview"
          className={styles.imagePreview}
        />
      )}

      <div className={styles.btnsAction}>
        <button type="reset" className={styles.resetBtn} onClick={resetForm}>
          Reset
        </button>
        <button type="submit" className={styles.submitBtn}>
          Save Drink
        </button>
      </div>
    </form>
  );
};

export default DrinkForm;
