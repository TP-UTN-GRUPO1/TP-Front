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




  const handleSelectPrice = (newPriceFilter) => {
    let sortedGames = [...originalGames];
    setSelectedPrice(newPriceFilter)
    if (newPriceFilter === "lowToHigh") {
      sortedGames.sort((a, b) => a.price - b.price);
      setGames(sortedGames);
    } else if (newPriceFilter === "highToLow") {
      sortedGames.sort((a, b) => b.price - a.price);
      setGames(sortedGames);
    } else if (newPriceFilter === "reset") {
      setGames(originalGames);
    } else if (newPriceFilter === "A-Z") {
      sortedGames.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
      setGames(sortedGames);
    } else if (newPriceFilter === "Z-A") {
      sortedGames.sort((a, b) => b.nameGame.localeCompare(a.nameGame));
      setGames(sortedGames);
    }
  }

  const filteredGames =
    selectedPlatform && selectedPlatform !== ""
      ? games.filter((game) =>
          game.platforms.some(
            (platform) => platform.platformName === selectedPlatform
          )
        )
      : games;

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((response) => {
        setOriginalGames(response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching games", error);
      });
  }, []);

  return (
    <div>
      <Navbar
      selectedPrice={selectedPrice}
        setSelectedPlatform={setSelectedPlatform}
        onSelectedPrice={handleSelectPrice}
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
