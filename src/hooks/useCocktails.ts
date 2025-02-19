import { useCallback, useEffect, useState, useMemo } from "react";
import { Cocktail } from "../types/cocktail";
import { fetchAllCocktails, searchCocktails } from "../services/api";
import usePersistedState from "./usePresistedState";

const PAGE_SIZE = 24;

export const useCocktails = () => {
  const [cocktails, setCocktails] = usePersistedState<Cocktail[]>(
    "cocktails",
    []
  );
  const [currentPage, setCurrentPage] = usePersistedState("currentPage", 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validCocktails = useMemo(() => {
    return cocktails.filter(
      (cocktail) => cocktail.strDrink && cocktail.strDrinkThumb
    );
  }, [cocktails]);

  const loadCocktails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCocktails();
      const storedDrinks = localStorage.getItem("newDrinks");
      const newDrinks: Cocktail[] = storedDrinks
        ? JSON.parse(storedDrinks)
        : [];

      const allCocktails = [...data, ...newDrinks];
      setCocktails(allCocktails);
    } catch (error: any) {
      console.error("Failed fetching cocktails:", error.message);
      setError("Failed to fetch cocktails");
    } finally {
      setLoading(false);
    }
  }, [setCocktails]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setCocktails([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const results = await searchCocktails(query);
        setCocktails(results);
      } catch (error) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    },
    [setCocktails]
  );

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(validCocktails.length / PAGE_SIZE));
  }, [validCocktails]);

  const currentCocktails = useMemo(() => {
    return validCocktails.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );
  }, [validCocktails, currentPage]);

  useEffect(() => {
    if (cocktails.length === 0) {
      loadCocktails();
    }
  }, [cocktails, loadCocktails]);

  return {
    cocktails: currentCocktails,
    totalPages,
    currentPage,
    loading,
    error,
    handleSearch,
    setCurrentPage,
  };
};
