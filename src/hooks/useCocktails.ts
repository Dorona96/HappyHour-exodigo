import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Cocktail } from "../types/cocktail";
import { fetchAllCocktails, searchCocktails } from "../services/api";
import usePersistedState from "./usePresistedState";

const PAGE_SIZE = 24;

export const useCocktails = () => {
  const [cocktails, setCocktails] = usePersistedState<Cocktail[]>("cocktails", []);
  const [currentPage, setCurrentPage] = usePersistedState("currentPage", 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false); 

 
  const validCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => cocktail.strDrink && cocktail.strDrinkThumb);
  }, [cocktails]);

 
  const loadCocktails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiData = await fetchAllCocktails();
      const storedDrinks = localStorage.getItem("newDrinks");
      const newDrinks: Cocktail[] = storedDrinks ? JSON.parse(storedDrinks) : [];

      
      const allCocktails = [...newDrinks, ...apiData].filter(
        (drink, index, self) =>
          drink.strDrink &&
          drink.strDrinkThumb &&
          index === self.findIndex((d) => d.idDrink === drink.idDrink)
      );
      setCocktails(allCocktails);
    } catch (error: any) {
      console.error("Failed fetching cocktails:", error.message);
      setError("Failed to fetch cocktails");
    } finally {
      setLoading(false);
    }
  }, [setCocktails]);

 
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      loadCocktails();
    }
  }, [loadCocktails]);


  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        loadCocktails(); 
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const apiResults = await searchCocktails(query);
        const storedResults = localStorage.getItem("newDrinks");
        const newDrinks: Cocktail[] = storedResults ? JSON.parse(storedResults) : [];

        
        const filteredNewDrinks = newDrinks.filter((drink) =>
          drink.strDrink.toLowerCase().includes(query.toLowerCase())
        );
        const combinedResults = [...filteredNewDrinks, ...apiResults];
        setCocktails(combinedResults);
      } catch (error) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    },
    [setCocktails, loadCocktails, setCurrentPage] 
  );


  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(validCocktails.length / PAGE_SIZE));
  }, [validCocktails]);

  const currentCocktails = useMemo(() => {
    return validCocktails.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  }, [validCocktails, currentPage]);

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
