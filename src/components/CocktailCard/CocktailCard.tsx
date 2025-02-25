import React from "react";
import { Cocktail } from "types/cocktail";
import styles from "./CocktailCard.module.scss";
interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  return (
    <div className={styles.cocktailCard}>
      <img src={cocktail.strDrinkThumb||undefined} />
      <h3>{cocktail.strDrink}</h3>
    </div>
  );
};

export default CocktailCard;
