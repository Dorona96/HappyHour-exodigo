import React, { useCallback, useState } from "react";
import { Cocktail } from "types/cocktail";
import styles from "./DrinkForm.module.scss";
import { useImageUpload } from "hooks/useImageUpload";
import { saveDrinkToLocalStorage } from "utils/storage";
import { imageToBase64 } from "utils/imageUtils";
import { useDrinkForm } from "hooks/useDrinkForm";
import { Link } from "react-router-dom";
const DrinkForm: React.FC = () => {
  const {
    state,
    error,
    setError,
    setName,
    setInstructions,
    addIngredient,
    removeIngredient,
    updateIngredient,
    resetForm,
  } = useDrinkForm();
  const [isPopup, setPopup] = useState(false);
  const { image, preview, handleImageChange, resetImage } = useImageUpload();

  const handleSaveDrink = async (e: React.FormEvent) => {
    e.preventDefault();

    const base64Image = image ? await imageToBase64(image) : "";

    const newDrink: Cocktail = {
      idDrink: Date.now().toString(),
      strDrink: state.name,
      strInstructions: state.instructions,
      strDrinkThumb: base64Image,
      strIngredients: state.ingredients,
    };

    saveDrinkToLocalStorage(newDrink);
    setPopup(true);
  };

  const handleResetForm = () => {
    resetForm();
    resetImage();
    setError(null);
  };

  if (isPopup)
    return (
      <div className={styles.form}>
        <h2>Your Drink was Added!</h2>
        {preview && (
          <img
            src={preview}
            alt="Cocktail Preview"
            className={styles.imagePreview}
          />
        )}
        <div className={styles.btnsAction}>
          <Link className={styles.backBtn} to="/">
            back ro feed
          </Link>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setPopup(false);
              handleResetForm();
            }}
          >
            add more
          </button>
        </div>
      </div>
    );

  return (
    <form
      className={styles.form}
      onSubmit={handleSaveDrink}
      onReset={handleResetForm}
    >
      <h2>Add a New Cocktail</h2>

      {error && <span className={styles.error}>{error}</span>}
      <label htmlFor="name">Drink Name</label>
      <input
        id="name"
        required
        type="text"
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
            required
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
        required
        id="instructions"
        placeholder="How to prepare the cocktail"
        value={state.instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <label htmlFor="imageUpload">Upload Image</label>
      <input
        required
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
        <button type="reset" className={styles.resetBtn}>
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
