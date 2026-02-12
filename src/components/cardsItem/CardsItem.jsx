import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardsItem.css";
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
    <div className="card-container">
      <Card className="cards">
        <div className="button-card" onClick={handleGameSelected}>
          <Card.Img height={350} variant="top" src={imageUrl} />
          <Card.Body>
            <div className="stock">
              {available ? (
                <Badge bg="success">{translate("Available_stock")}</Badge>
              ) : (
                <Badge bg="danger">{translate("Out_of_stock_badge")}</Badge>
              )}
            </div>
            <Card.Title>{gameName}</Card.Title>
            <div>
              {Array.isArray(platform) ? platform.join(", ") : platform}
            </div>
            <div className="genre-list">
              {Array.isArray(genre) ? genre.join(", ") : genre}
            </div>
            <p>$ {price}</p>
            <div className="d-grid gap-2"></div>
          </Card.Body>
        </div>
        <div className="card-buttons">
          <Button onClick={handleGameSelected} className="me-3" size="sm">
            {translate("Select_game")}
          </Button>
          <Button
            className="me-3"
            size="sm"
            variant="secondary"
            onClick={handleAddToFavorites}
          >
            {translate("Add_favorites")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardsItem;
