// src/components/navbar/SearchBar.jsx
import { useEffect } from "react";

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar juegos..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
