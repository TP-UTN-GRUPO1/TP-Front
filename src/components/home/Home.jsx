import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import ProductCarousel from "../miniCarrousel/miniCarrousel";

import GigantCarrousel from "../gigantCarrousel/gigantCarrousel";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const filteredGames = selectedPlatform && selectedPlatform !== ""
  ? games.filter((game) =>
      game.platforms.some((platform) =>
        platform.platformName === selectedPlatform
      )
    )
  : games;
  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((response) => {
        setGames(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching games", error);
      });
  }, []); //muy muy importante el arreglo vacio, xq se ejecuta una vez cuando se monta el componente
  return (
    <div>
        <Navbar setSelectedPlatform={setSelectedPlatform} />
      <br />
      <GigantCarrousel />
      {/* <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel> */}
      <br />
      <br />
      <br />
      {filteredGames.length === 0 ? (
        <p className="d-flex justify-content-center flex-wrap">
          No se encontraron juegos.
        </p>):
        (<Cards games={filteredGames} />)}
      <Footer />
    </div>
  );
};

export default Home;
