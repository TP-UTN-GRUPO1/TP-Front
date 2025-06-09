const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar juegos..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyPress={handleKeyPress}
        name="searchBar"
      />
    </div>
  );
};

export default SearchBar;
