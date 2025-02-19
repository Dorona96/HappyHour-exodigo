import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCocktail } from "hooks/useCocktail";
import styles from "./CocktailDetails.module.scss";

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cocktail, loading, error } = useCocktail(id);
  const navigate = useNavigate();

  const handleBack = () => {
    const previousPage = sessionStorage.getItem("previousPage") || "/";
    navigate(previousPage, { replace: true });
    
    setTimeout(() => {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    }, 0);
  };

  if (loading) return <span>Loading...</span>;
  if (error) return <span className={styles.error}>{error}</span>;
  if (!cocktail) return <span>No cocktail found.</span>;

  return (
    <div className="overlay">
      <div className={styles.cocktailDetails}>
        <button className={styles.backBtn} onClick={handleBack}>
          X
        </button>
        <h1>{cocktail.strDrink}</h1>
        <img src={cocktail.strDrinkThumb || undefined} alt={cocktail.strDrink} />
        
        <div className={styles.description}>
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
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetails;
