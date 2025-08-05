import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useCart } from "../../contexts/CartContext/CartContext.jsx";
import { AuthContext } from "../../contexts/auth/Auth.Context.jsx";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../utils/notification.jsx";
import { useTranslate } from "../../hooks/useTranslate.jsx";

const CardPage = () => {
  const [gameDetail, setGameDetail] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext);
  const translate = useTranslate();

  useEffect(() => {
    const getDetailGame = async () => {
      try {
        const response = await axios.get(
          `https://thefrog-server.onrender.com/games/${id}`
        );
        setGameDetail(response.data);
      } catch (error) {
        console.error("Error fetching game details", error);
      }
    };
    getDetailGame();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      warningToast(translate("Login_cart"));
      return;
    }
    try {
      if (gameDetail) {
        if (!gameDetail.available) {
          errorToast(translate("Out_of_stock_error"));
          return;
        }
        addToCart({
          id: gameDetail.id,
          name: gameDetail.nameGame,
          img: gameDetail.imageUrl,
          price: gameDetail.price,
        });
        successToast(translate("Added_to_cart_success"));
      } else {
        errorToast(translate("Error_adding_to_cart"));
      }
    } catch (error) {
      console.error("Error al añadir al carrito", error);
      errorToast(translate("Error_adding_to_cart"));
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
