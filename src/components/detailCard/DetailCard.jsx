import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailCard = () => {
const  [gameDetail, setGameDetail] = useState({}); // es null porque no tengo nada al principio
const { id } = useParams();


useEffect(() => {
  const getDetailGame = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/games/${id}`); // Usa el id real
      setGameDetail(response.data);
      
    } catch (error) {
      console.error("Error fetching game details", error);
    }
  }
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
      <p>
        <a href="https://gifer.com" target="_blank" rel="noopener noreferrer"></a>
      </p>
    </div>
  );
}


  return (
    <div>
      <h1>{gameDetail.nameGame}</h1>
      <img src={gameDetail.imageUrl} alt={gameDetail.nameGame} />
      <p>Desarrollador: {gameDetail.developer}</p>
      <p>Rating: {gameDetail.rating}/10 ⭐</p>
      <p>Género: {gameDetail.genres?.map(g => g.genreName).join(' - ') || " "}</p>
      <p>Plataforma: {gameDetail.platforms?.map(g => g.platformName).join(' - ') || " "}</p>
      <p>Precio: ${gameDetail.price}</p>
      <p>Disponible: {gameDetail.available ? "Sí" : "No"}</p>
    </div>
  )
}

export default DetailCard