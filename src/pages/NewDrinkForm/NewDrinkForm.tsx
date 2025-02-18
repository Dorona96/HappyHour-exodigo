import React, { use, useState } from "react";
import { Cocktail } from "../../types/cocktail";

const NewDrinkForm: React.FC = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addIngrediantField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleIngrediantsChange = (index: number, value: string) => {
    const updatedInrediants = [...ingredients];
    updatedInrediants[index] = value;
    setIngredients(updatedInrediants);
  };

  const handleSaveDrink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || ingredients.some((i) => i.trim() === "") || !instructions) {
      setError("please fill all required.");
      return;
    }

    const newDrink: Cocktail = {
      idDrink: Date.now().toString(),
      strDrink: name,
      strInstructions: instructions,
      strDrinkThumb: preview || "",
      strIngredients: ingredients,
    };

    const storedDrinks = localStorage.getItem("customDrinks");
    const customDrinks: Cocktail[] = storedDrinks
      ? JSON.parse(storedDrinks)
      : [];
    customDrinks.push(newDrink);
    localStorage.setItem("customDrinks", JSON.stringify(customDrinks));

    setName("");
    setIngredients([""]);
    setInstructions("");
    setImage(null);
    setPreview(null);
    setError("");
  };
  return (
    <form onSubmit={handleSaveDrink}>
      <h2>Add new Drink</h2>
      {error && <span>{error}</span>}
      <label>Drink Name</label>
      <input
        placeholder="Cocktail Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>instructions</label>
      <textarea placeholder="instructions"></textarea>

      <input placeholder="Cocktail Name" />
      <button type="submit">Save Drink</button>
    </form>
  );
};

export default NewDrinkForm;
