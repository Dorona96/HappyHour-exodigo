import React from "react";
import { Cocktail } from "types/cocktail";
import { useGrid } from "hooks/useGrid";
import CocktailCard from "components/CocktailCard/CocktailCard";
import styles from "./CocktailList.module.scss";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { Link } from "react-router-dom";

interface CocktailListProps {
  cocktails: Cocktail[];
  gap?: number;
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktails, gap = 10 }) => {
  const { gridHeight, columns, rows, itemHeight, itemWidth } = useGrid(
    cocktails.length
  );
  return (
    <Grid
      className={styles.cocktailGrid}
      key={cocktails.length}
      columnCount={columns}
      columnWidth={itemWidth + gap}
      rowCount={rows}
      rowHeight={itemHeight + gap}
      height={gridHeight}
      width={columns * (itemWidth + gap) + gap}
    >
      {({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
        const index = rowIndex * columns + columnIndex;
        if (index >= cocktails.length) return null;

        const cocktail = cocktails[index];

        return (
          <Link
            className={styles.cocktailItem}
            style={style}
            to={`/cocktail/${cocktail.idDrink}`}
          >
            <CocktailCard cocktail={cocktail} />
          </Link>
        );
      }}
    </Grid>
  );
};

export default CocktailList;
