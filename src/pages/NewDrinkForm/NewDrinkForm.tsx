import React, { useState } from "react";
import { Cocktail } from "types/cocktail";
import styles from "./NewDrinkForm.module.scss";

const NewDrinkForm: React.FC = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIngredientsChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const deleteIngredientField = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };



  const resetFormFields = () => {
    setName("");
    setIngredients([""]);
    setInstructions("");
    setImage(null);
    setPreview(null);
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if(preview){
        URL.revokeObjectURL(preview);
      }
      const newPreview = URL.createObjectURL(file);
      setImage(file);
      setPreview(newPreview);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveDrink = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || ingredients.some((i) => !i.trim()) || !instructions.trim() || !preview) {
      setError("Please fill in all required fields and upload an image.");
      return;
    }
    const base64Image =image? await convertToBase64(image):"";

    const newDrink: Cocktail = {
      idDrink: Date.now().toString(),
      strDrink: name,
      strInstructions: instructions,
      strDrinkThumb: base64Image,
      strIngredients: ingredients,
    };

    const storedDrinks = localStorage.getItem("customDrinks");
    const newDrinks: Cocktail[] = storedDrinks ? JSON.parse(storedDrinks) : [];

    newDrinks.push(newDrink);
    localStorage.setItem("newDrinks", JSON.stringify(newDrinks));

    resetFormFields();
  };

  return (
    <form className={styles.form} onSubmit={handleSaveDrink} onReset={resetFormFields}>
      <h2>Add a New Cocktail</h2>

      {error && <span className={styles.error}>{error}</span>}

      <label htmlFor="name">Drink Name</label>
      <input id="name" placeholder="Enter cocktail name" required value={name} onChange={(e) => setName(e.target.value)} />

      <label>Ingredients</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.ingredientField}>
          <input
            type="text"
            value={ingredient}
            placeholder="Ingredient"
            onChange={(e) => handleIngredientsChange(index, e.target.value)}
            required
          />
          {ingredients.length > 1 && (
            <button type="button" className={styles.deleteBtn} onClick={() => deleteIngredientField(index)}>
              ✖
            </button>
          )}
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addIngredientField}>
        + Add Ingredient
      </button>

      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        placeholder="How to prepare the cocktail"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      ></textarea>

      <label htmlFor="imageUpload">Upload Image</label>
      <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} />

      {preview && <img src={preview} alt="Cocktail Preview" className={styles.imagePreview} />}

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

export default NewDrinkForm;
