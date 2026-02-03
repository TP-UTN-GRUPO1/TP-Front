import { useTranslate } from "../../hooks/useTranslate";
import GameFilters from "../gameFilters/GameFilters";
import GameList from "../gameList/GameList";
import useGames from "./useGames";
import Carrousel from "../carrousel/Carrousel";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  const translate = useTranslate();
  const {
    filteredGames,
    currentGames,
    currentPage,
    setCurrentPage,
    selectedOrder,
    handleSelectPlatform,
    handleSelectOrder,
    handleSearch,
    showCarrousel,
    gamesPerPage,
  } = useGames();

  return (
    <div>
      <GameFilters
        selectedOrder={selectedOrder}
        onselectedOrder={handleSelectOrder}
        onSearch={handleSearch}
        setSelectedPlatform={handleSelectPlatform}
      />

      <div className="main-content">
        {showCarrousel && <Carrousel />}

        {currentGames.length === 0 ? (
          <p className="d-flex justify-content-center flex-wrap">
            {translate("No_games_found")}
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
