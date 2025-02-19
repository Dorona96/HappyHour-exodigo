import React, { Fragment } from "react";
import "./Home.module.scss";
import { useCocktails } from "hooks/useCocktails";
import Pagination from "../../components/Pagination/Pagination";
import CocktailList from "../../components/CocktailList/CocktailList";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const { cocktails, totalPages, currentPage, loading, error, handleSearch, setCurrentPage } = useCocktails();

  return (
    <div className={styles.home}>
      <SearchBar onSearch={handleSearch} />
      <h1>Welcome to Exodigo Happy Hour!</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <Fragment>
          <CocktailList cocktails={cocktails} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </Fragment>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Home;
