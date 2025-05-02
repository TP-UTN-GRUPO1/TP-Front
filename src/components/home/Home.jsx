import { useEffect, useState } from "react";
// import axios from "axios";
import Cards from "../cards/Cards";
import ProductCarousel from "../miniCarrousel/miniCarrousel";

import GigantCarrousel from "../gigantCarrousel/gigantCarrousel";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  const [games, setGames] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/games")
  //     .then((response) => {
  //       setGames(response.data);
  //       console.log(response.data, "pedido de los juegos");
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching games", error);
  //     });
  // }, []); //muy muy importante el arreglo vacio, xq se ejecuta una vez cuando se monta el componente
  return (
    <div>
      <Navbar />
      <br />
      <GigantCarrousel />
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <ProductCarousel></ProductCarousel>
      <br />
      <br />
      <br />
      <Cards games={games} />
      <Footer />
    </div>
  );
};

export default Home;
