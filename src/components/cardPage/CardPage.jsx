import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useCart } from "../cartContext/CartContext.jsx";
import { AuthContext } from "../../auth/Auth.Context.jsx";
import { warningToast } from "../../utils/notification.jsx";

const CardPage = () => {
  const [gameDetail, setGameDetail] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const {token} = useContext(AuthContext);

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

  const handleAddToCart = () => {
    if (!token) {
      warningToast("Debes iniciar sesión para añadir al carrito.");
      return;
    }
    if (gameDetail) {
      addToCart({
        id: gameDetail.id,
        name: gameDetail.nameGame,
        img: gameDetail.imageUrl,
        price: gameDetail.price,
      });
    }
  };

  if (!gameDetail) {
    return <LoadingSpinner />;
  }

  return (
    <div className="detail-card">
      <ProductCard product={gameDetail} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default CardPage;
