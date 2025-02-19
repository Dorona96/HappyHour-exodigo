import React, { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./CocktailDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCocktailById } from "../../services/api";
import { Cocktail } from "../../types/cocktail";

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const loadCocktail = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const storedDrinks = localStorage.getItem("newDrinks");
      const newDrinks: Cocktail[] = storedDrinks
        ? JSON.parse(storedDrinks)
        : [];
      const foundNewDrink = newDrinks.find((drink) => drink.idDrink === id);
      if (foundNewDrink) {
        setCocktail(foundNewDrink);
      } else {
        const drink = await fetchCocktailById(id);
        setCocktail(drink);
      }
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
    <Fragment>
      <button onClick={() => navigate(-1)}>back</button>
      <div className={styles.cocktailDetails}>
        <h1>{cocktail.strDrink}</h1>
        <img
          src={cocktail.strDrinkThumb || undefined}
          alt={cocktail.strDrink}
        />
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
    </Fragment>
  );
};

export default CocktailDetails;
