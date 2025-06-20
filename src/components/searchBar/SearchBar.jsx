import { useTranslate } from "../../hooks/useTranslate";

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  const translate = useTranslate();
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={translate("Search_Games")}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyPress={handleKeyPress}
        name="searchBar"
      />
    </div>
  );
};

export default SearchBar;
