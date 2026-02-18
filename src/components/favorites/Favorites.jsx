import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { errorToast, successToast } from "../../utils/notification";
import { useTranslate } from "../../hooks/useTranslate";
import { useCart } from "../../contexts/CartContext/CartContext";
import Button from "../button/Button";
import "../cardsItem/cardsItem.css";
import "./Favorites.css";

const Favorites = () => {
  const { token, userRole } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const role = Number(userRole);
  const isUser = role === 3 || !userRole;
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavoritesById = async () => {
      try {
        const res = await axios.get("https://localhost:7256/api/Favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) getFavoritesById();
  }, [userId, token]);

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`https://localhost:7256/api/Favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successToast("Juego eliminado de favoritos con éxito");
      setFavorites((prev) => prev.filter((fav) => fav.gameId !== favoriteId));
    } catch (err) {
      console.error(
        "Error deleting favorite",
        err.response?.data || err.message,
      );
      errorToast("Ups, error: no se pudo quitar el juego de favoritos.");
    }
  };

  const handleAddToCart = (fav) => {
    if (!fav.available) {
      errorToast(translate("Out_of_stock_error"));
      return;
    }

    try {
      const formattedProduct = {
        id: fav.id,
        name: fav.nameGame,
        img: fav.imageUrl,
        price: fav.price,
      };

      addToCart(formattedProduct);
      successToast(translate("Added_to_cart_success"));
    } catch (error) {
      console.error("Error adding to cart", error);
      errorToast(translate("Error_adding_to_cart"));
    }
  };

  const handleGameSelected = (fav) => {
    navigate(`/games/${fav.id || fav.gameId}`, {
      state: {
        game: {
          id: fav.id || fav.gameId,
          gameName: fav.nameGame,
          imageUrl: fav.imageUrl,
          price: fav.price,
          available: fav.available,
        },
      },
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="favorites-container">
      <Button
        text={translate("Return")}
        onClick={() => window.history.back()}
        className="back-button"
      />
      <h2 className="favorites-title">{translate("Your_Favorites")}</h2>

      {favorites.length === 0 ? (
        <p className="favorites-empty">{translate("No_games_favorites")}</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <div className="card" key={fav.id || fav.gameId}>
              <div className="card2">
                <div className="imgBox">
                  <img
                    src={fav.imageUrl}
                    alt={fav.nameGame}
                    className="card-game-img"
                  />
                </div>

                <div className="contentBox">
                  <div className="stock">
                    {fav.available ? (
                      <Badge bg="success">{translate("Available_stock")}</Badge>
                    ) : (
                      <Badge bg="danger">
                        {translate("Out_of_stock_badge")}
                      </Badge>
                    )}
                  </div>
                  <h3>{fav.nameGame}</h3>
                  <h2 className="price">$ {fav.price}</h2>
                </div>

                <div className="card-overlay">
                  <a
                    className="buy"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameSelected(fav);
                    }}
                  >
                    {translate("Select_game")}
                  </a>
                  <a
                    className="buy fav-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFavorite(fav.gameId);
                    }}
                  >
                    {translate("Remove_from_favorites")}
                  </a>
                  {isUser && (
                    <a
                      className="buy"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(fav);
                      }}
                    >
                      {translate("Add_cart")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
