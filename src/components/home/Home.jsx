import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import GigantCarrousel from "../gigantCarrousel/gigantCarrousel";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  const [originalGames, setOriginalGames] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectPrice = (newPriceFilter) => {
    console.log('Filtro de precio seleccionado:', newPriceFilter);
    let sortedGames = [...games];
    setSelectedPrice(newPriceFilter);
    if (newPriceFilter === "lowToHigh") {
      sortedGames.sort((a, b) => a.price - b.price);
    } else if (newPriceFilter === "highToLow") {
      sortedGames.sort((a, b) => b.price - a.price);
    } else if (newPriceFilter === "A-Z") {
      sortedGames.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
    } else if (newPriceFilter === "Z-A") {
      sortedGames.sort((a, b) => b.nameGame.localeCompare(a.nameGame));
    } else if (newPriceFilter === "reset") {
      sortedGames = searchQuery ? games : [...originalGames];
      setSelectedPlatform("");
    }
    console.log('Juegos ordenados:', sortedGames);
    setGames(sortedGames);
  };

  const handleSearch = (query, searchResults) => {
    console.log('handleSearch - Query:', query, 'Resultados:', searchResults);
    setSearchQuery(query);
    if (query.trim() === "") {
      setGames([...originalGames]);
    } else {
      setGames(searchResults);
    }
  };

  const filteredGames = selectedPlatform
    ? games.filter((game) => {
        const hasPlatform = game.platforms.some(
          (platform) => platform.platformName === selectedPlatform
        );
        console.log(`Filtrando juego ${game.nameGame} para plataforma ${selectedPlatform}:`, hasPlatform);
        return hasPlatform;
      })
    : games;

  console.log('Juegos filtrados para Cards:', filteredGames);

  useEffect(() => {
    console.log('Cargando juegos originales desde el backend');
    axios
      .get("http://localhost:3000/games")
      .then((response) => {
        console.log('Juegos originales cargados:', response.data);
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
      />
      <div className="main-content">
        <GigantCarrousel />
        {filteredGames.length === 0 ? (
          <p className="d-flex justify-content-center flex-wrap">
            No se encontraron juegos.
          </p>
        ) : (
          <Cards games={filteredGames} />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;