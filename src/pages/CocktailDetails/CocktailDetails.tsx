import React, { useCallback, useEffect, useState } from "react";
import styles from "./CocktailDetails.module.scss";
import { useParams } from "react-router-dom";
import { fetchCocktailById } from "../../services/api";
import { Cocktail } from "../../types/cocktail";

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCocktail = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const drink = await fetchCocktailById(id);
      setCocktail(drink);
    } catch (error) {
      console.error("faild to fetch cocktail details", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCocktail();
  }, [loadCocktail]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  if (!cocktail) return <span>No cocktail found.</span>;

  return (
    <div className={styles.cocktailDetails}>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>Ingredients</h3>
      <ul>
      {cocktail.strIngredients?.length > 0 ? (
          cocktail.strIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))
        ) : (
          <li>No ingredients available.</li>
        )}
      </ul>
      <h3>Instructions</h3>
      <span>{cocktail.strInstructions}</span>
    </div>
  );
};

export default CocktailDetails;
