import Navbar from "../nav/Navbar";

const GameFilters = ({
  selectedOrder,
  onselectedOrder,
  onSearch,
  setSelectedPlatform,
}) => {
  return (
    <Navbar
      selectedOrder={selectedOrder}
      onselectedOrder={onselectedOrder}
      onSearch={onSearch}
      setSelectedPlatform={setSelectedPlatform}
    />
  );
};

export default GameFilters;
