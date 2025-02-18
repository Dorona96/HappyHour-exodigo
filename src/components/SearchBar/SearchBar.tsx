import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import useDebounce from "../../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={styles.searchbar}>
      <input
        placeholder="search by name..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
