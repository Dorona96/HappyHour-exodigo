import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import useDebounce from "hooks/useDebounce";
import icSearch from "assets/icons/ic-search.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      onSearch(debouncedSearchTerm);
    } else {
      onSearch("");
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={styles.searchbar}>
      <img src={icSearch} alt="search icon" />
      <input
        placeholder="Search by name..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
