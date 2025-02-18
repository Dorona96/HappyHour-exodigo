import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import "./Home.module.scss";
import { Cocktail } from "../../types/cocktail";
import { fetchAllCocktails, searchCocktails } from "../../services/api";
import Pagination from "../../components/Pagination/Pagination";
import CocktailList from "../../components/CocktailList/CocktailList";
import usePersistedState from "../../hooks/usePresistedState";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Home.module.scss";
const PAGE_SIZE = 24;

const Home: React.FC = () => {
  const [cocktails, setCocktails] = usePersistedState<Cocktail[]>(
    "cocktails",
    []
  );
  const [currentPage, setCurrentPage] = usePersistedState("currentPage", 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const totalPages = useMemo(
    () => Math.ceil(cocktails.length / PAGE_SIZE),
    [cocktails]
  );

  const loadCocktails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCocktails();
      setCocktails(data);
    } catch (error: any) {
      console.error("Failed fetching cocktails:", error.message);
      setError("Failed to fetch cocktails");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cocktails.length === 0) {
      loadCocktails();
    }
  }, [cocktails, loadCocktails]);

  const currentCocktails = useMemo(() => {
    return cocktails.slice(startIndex, startIndex + PAGE_SIZE);
  }, [cocktails, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
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
        setError("failed to fetch search results");
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className={styles.home}>
      <SearchBar onSearch={handleSearch} />
      <h1>Welcome to Exodigo Happy Hour!</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <Fragment>
          <CocktailList cocktails={currentCocktails} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Fragment>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Home;
