import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import GigantCarrousel from "../gigantCarrousel/gigantCarrousel";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CustomPagination from '../pagination/Pagination.jsx'; // Importa el componente personalizado
import "./Home.css";
import { SORT_ORDERS } from './Home.consts.js';

const Home = () => {
  const [originalGames, setOriginalGames] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCarrousel, setShowCarrousel] = useState(true)
  const gamesPerPage = 9;


  const handleSelectPrice = (newPriceFilter) => {
    let sortedGames = [...games];
    setSelectedPrice(newPriceFilter);
    if (newPriceFilter === SORT_ORDERS.LOW_TO_HIGH) {
      sortedGames.sort((a, b) => a.price - b.price);
    } else if (newPriceFilter === SORT_ORDERS.HIGH_TO_LOW) {
      sortedGames.sort((a, b) => b.price - a.price);
    } else if (newPriceFilter === SORT_ORDERS.A_Z) {
      sortedGames.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
    } else if (newPriceFilter === SORT_ORDERS.Z_A) {
      sortedGames.sort((a, b) => b.nameGame.localeCompare(a.nameGame));
    } else if (newPriceFilter === SORT_ORDERS.RESET) {
      sortedGames = searchQuery ? games : [...originalGames];
      setSelectedPlatform("");
    }
    setGames(sortedGames);
    setCurrentPage(1);
  };

  const handleSearch = (query, searchResults) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setGames([...originalGames]);
    } else {
      setGames(searchResults);
      setShowCarrousel(false)
    }
    setCurrentPage(1);
  };

  const filteredGames = selectedPlatform
    ? games.filter((game) =>
        game.platforms.some(
          (platform) => platform.platformName === selectedPlatform
        )
      )
    : games;

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((response) => {
        setOriginalGames(response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar juegos originales:", error);
      });
  }, []);

  return (
    <div>
      <Navbar
        selectedPrice={selectedPrice}
        setSelectedPlatform={setSelectedPlatform}
        onSelectedPrice={handleSelectPrice}
        onSearch={handleSearch}
        resetGames={setOriginalGames}
      />
      <div className="main-content">
        
        {showCarrousel && <GigantCarrousel /> }
  
         
        {currentGames.length === 0 ? (
          <p className="d-flex justify-content-center flex-wrap">
            No se encontraron juegos.
          </p>
        ) : (
          <>
          <>
          <CustomPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
              onPageChange={paginate}
            />
            </>
            <>
            <Cards games={currentGames} />
            </>
            <>
            <CustomPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
              onPageChange={paginate}
            />
            </>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
