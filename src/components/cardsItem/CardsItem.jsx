import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardsItem.css";
import { useFavorites } from "../FavoritesContext/FavoritesContext";
import { useContext } from "react";
import { warningToast, successToast } from "/src/utils/notification";
import { AuthContext } from "../../auth/Auth.Context";


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
  const navigate = useNavigate();
  const { addToFavorites } = useFavorites();
  const { token } = useContext(AuthContext);

  const handleAddToFavorites = () => {
    if (!token) {
      warningToast("Debes iniciar sesión para añadir a favoritos.");
      return;
    }
    addToFavorites({
      id,
      gameName,
      imageUrl,
    });
    successToast("Juego añadido a lista de deseos")
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
                <Badge bg="success">En Stock</Badge>
              ) : (
                <Badge bg="danger">Sin Stock</Badge>
              )}
            </div>
            <Card.Title>{gameName}</Card.Title>
            <div>{Array.isArray(platform) ? platform.join(", ") : platform}</div>
            <p>$ {price}</p>
            <div className="d-grid gap-2"></div>
          </Card.Body>
        </div>
        <Button onClick={handleGameSelected} className="me-3" size="sm">
          Seleccionar juego
        </Button>
        <Button
          size="sm"
          className="ButtonFavorite"
          variant="secondary"
          onClick={handleAddToFavorites}
        >
          Añadir a favoritos
        </Button>
      </Card>
    </div>
  );
};

export default CardsItem;
