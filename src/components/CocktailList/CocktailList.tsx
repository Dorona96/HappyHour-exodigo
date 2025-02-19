import React from "react";
import { Cocktail } from "types/cocktail";
import CocktailCard from "../CocktailCard/CocktailCard";
import styles from "./CocktailList.module.scss";
import { Link } from "react-router-dom";


interface CocktailListProps {
  cocktails: Cocktail[];
}
const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  
  return (
    <div className={styles.cocktailList}>
      {cocktails.map((cocktail, index) => {
        return <Link key={index} to={`/cocktail/${cocktail.idDrink}`}><CocktailCard key={cocktail.idDrink} cocktail={cocktail} /></Link>;
      })}
    </div>
  );
};

export default CocktailList;
