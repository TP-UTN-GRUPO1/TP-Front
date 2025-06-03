import Navbar from "../nav/Navbar";

const GameFilters = ({
  selectedPrice,
  onSelectedPrice,
  onSearch,
  setSelectedPlatform,
}) => {
  return (
    <Navbar
      selectedPrice={selectedPrice}
      onSelectedPrice={onSelectedPrice}
      onSearch={onSearch}
      setSelectedPlatform={setSelectedPlatform}
    />
  );
};

export default GameFilters;
