import GameFilters from "../gameFilters/GameFilters";
import GameList from "../gameList/GameList";
import useGames from "./useGames";
import GigantCarrousel from "../gigantCarrousel/GigantCarrousel";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  const {
    filteredGames,
    currentGames,
    currentPage,
    setCurrentPage,
    selectedPrice,
    handleSelectPlatform,
    handleSelectPrice,
    handleSearch,
    showCarrousel,
    gamesPerPage,
  } = useGames();

  return (
    <div>
      <GameFilters
        selectedPrice={selectedPrice}
        onSelectedPrice={handleSelectPrice}
        onSearch={handleSearch}
        setSelectedPlatform={handleSelectPlatform}
      />

      <div className="main-content">
        {showCarrousel && <GigantCarrousel />}

        {currentGames.length === 0 ? (
          <p className="d-flex justify-content-center flex-wrap">
            No se encontraron juegos.
          </p>
        ) : (
          <GameList
            games={filteredGames}
            currentGames={currentGames}
            currentPage={currentPage}
            gamesPerPage={gamesPerPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
