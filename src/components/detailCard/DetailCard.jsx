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

console.log(gameDetail, "gameDetail");

  return (
    <div>
      <h1>{gameDetail.nameGame}</h1>
      <img src={gameDetail.imageUrl} alt={gameDetail.nameGame} />
      <p>Desarrollador: {gameDetail.developer}</p>
      <p>Rating: {gameDetail.rating}/5</p>
      <p>Género: {gameDetail.genre}</p>
      <p>Plataforma: {gameDetail.platform}</p>
      <p>Precio: ${gameDetail.price}</p>
      <p>Disponible: {gameDetail.available ? "Sí" : "No"}</p>
    </div>
  )
}

export default DetailCard