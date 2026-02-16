import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./cardsItem.css";
import { useFavorites } from "../../contexts/FavoritesContext/FavoritesContext";
import { useContext } from "react";
import { warningToast, successToast } from "/src/utils/notification";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useTranslate } from "../../hooks/useTranslate";

const CardsItem = ({
  id,
  gameName,
  developer,
  imageUrl,
  platform,
  price,
  available,
  onGameSelected,
  genre,
}) => {
  const translate = useTranslate();
  const navigate = useNavigate();
  const { addToFavorites } = useFavorites();
  const { token } = useContext(AuthContext);

  const handleAddToFavorites = () => {
    if (!token) {
      warningToast(translate("Login_fav"));
      return;
    }
    addToFavorites({
      id,
      gameName,
      imageUrl,
    });
    successToast(translate("Game_added_to_wishlist"));
  };

  const handleGameSelected = () => {
    if (onGameSelected) onGameSelected(gameName);
    navigate(`/games/${id}`, {
      state: {
        game: {
          id,
          gameName,
          developer,
          imageUrl,
          platform,
          price,
          available,
          genre,
        },
      },
    });
  };

  return (
    <div className="card" onClick={handleGameSelected}>
      <div className="card2">
        <div className="imgBox">
          <img src={imageUrl} alt={gameName} className="card-game-img" />
        </div>

        <div className="contentBox">
          <div className="stock">
            {available ? (
              <Badge bg="success">{translate("Available_stock")}</Badge>
            ) : (
              <Badge bg="danger">{translate("Out_of_stock_badge")}</Badge>
            )}
          </div>
          <h3>{gameName}</h3>
          <span className="platform-info">
            {Array.isArray(platform) ? platform.join(", ") : platform}
          </span>
          <span className="genre-info">
            {Array.isArray(genre) ? genre.join(", ") : genre}
          </span>
          <h2 className="price">$ {price}</h2>
        </div>

        <div className="card-overlay">
          <a
            className="buy"
            onClick={(e) => {
              e.stopPropagation();
              handleGameSelected();
            }}
          >
            {translate("Select_game")}
          </a>
          <a
            className="buy fav-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFavorites();
            }}
          >
            {translate("Add_favorites")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
