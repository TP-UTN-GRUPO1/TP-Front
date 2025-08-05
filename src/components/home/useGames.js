import { useEffect, useState } from "react";
import axios from "axios";
import { SORT_ORDERS } from "./Home.consts.js";

const useGames = () => {
  const [originalGames, setOriginalGames] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedOrder, setselectedOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCarrousel, setShowCarrousel] = useState(true);
  const gamesPerPage = 9;

  const handleSelectOrder = (newOrderBy) => {
    let sortedGames = [...games];
    setselectedOrder(newOrderBy);
    setShowCarrousel(false);

    if (newOrderBy === SORT_ORDERS.LOW_TO_HIGH) {
      sortedGames.sort((a, b) => a.price - b.price);
    } else if (newOrderBy === SORT_ORDERS.HIGH_TO_LOW) {
      sortedGames.sort((a, b) => b.price - a.price);
    } else if (newOrderBy === SORT_ORDERS.A_Z) {
      sortedGames.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
    } else if (newOrderBy === SORT_ORDERS.Z_A) {
      sortedGames.sort((a, b) => b.nameGame.localeCompare(a.nameGame));
    } else if (newOrderBy === SORT_ORDERS.RESET) {
      sortedGames = searchQuery ? games : [...originalGames];
      setSelectedPlatform("");
      setShowCarrousel(true);
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
      setShowCarrousel(false);
    }
    setCurrentPage(1);
  };

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform);
    setCurrentPage(1);
    setShowCarrousel(false);
  };

  const filteredGames = (
    selectedPlatform
      ? games.filter((game) =>
          game.platforms.some(
            (platform) => platform.platformName === selectedPlatform
          )
        )
      : games
  ).filter((game) => game.available);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    axios
      .get("https://thefrog-server.onrender.com/games")
      .then((response) => {
        setOriginalGames(response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar juegos originales:", error);
      });
  }, []);

  return {
    games,
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
  };
};

export default useGames;
