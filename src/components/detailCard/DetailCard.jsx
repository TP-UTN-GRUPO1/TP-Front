import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import './detailCard.css';

const DetailCard = () => {
  const [gameDetail, setGameDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDetailGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}`);
        setGameDetail(response.data);
      } catch (error) {
        console.error("Error fetching game details", error);
      }
    };
    getDetailGame();
  }, [id]);

  if (!gameDetail) {
    return (
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <iframe
          src="https://gifer.com/embed/1fpC"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          frameBorder="0"
          allowFullScreen
          title="loading-gif"
        ></iframe>
      </div>
    );
  }

  return (
    <>
      <Navbar
        showSearch={true}
        showUserButtons={true}
        showFilters={false}
      />

      <div className="card-container">
        <div className="cards">
          <h1>{gameDetail.nameGame}</h1>
          <img
            src={gameDetail.imageUrl}
            alt={gameDetail.nameGame}
            style={{ width: '100%', borderRadius: '10px' }}
          />
          <p>Desarrollador: {gameDetail.developer}</p>
          <p>Rating: {gameDetail.rating}/10 ⭐</p>
          <p>Género: {gameDetail.genres?.map(g => g.genreName).join(' - ') || " "}</p>
          <p>Plataforma: {gameDetail.platforms?.map(p => p.platformName).join(' - ') || " "}</p>
          <p>Precio: ${gameDetail.price}</p>
          <p>Disponible: {gameDetail.available ? "Sí" : "No"}</p>

          <Button asChild><Link to="/">Volver</Link></Button>
          <Button>Comprar!</Button>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
