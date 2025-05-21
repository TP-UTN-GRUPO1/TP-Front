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

  useEffect(() => {
    let sortedGames = [...originalGames];
    if (selectedPrice === "lowToHigh") {
      sortedGames.sort((a, b) => a.price - b.price);
      setGames(sortedGames);
    } else if (selectedPrice === "highToLow") {
      sortedGames.sort((a, b) => b.price - a.price);
      setGames(sortedGames);
    } else if (selectedPrice === "reset") {
      setGames(originalGames);
    } else if (selectedPrice === "A-Z") {
      sortedGames.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
      setGames(sortedGames);
    } else if (selectedPrice === "Z-A") {
      sortedGames.sort((a, b) => b.nameGame.localeCompare(a.nameGame));
      setGames(sortedGames);
    }
  }, [selectedPrice, originalGames]);

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
        setSelectedPlatform={setSelectedPlatform}
        setSelectedPrice={setSelectedPrice}
      />
      <div className="main-content">
        <GigantCarrousel />
        <br />
        <br />
        <br />
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
