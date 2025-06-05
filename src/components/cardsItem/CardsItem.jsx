import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./cardsItem.css";

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

  const HandleGameSelected = () => {
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
      <Card className="cards" >
        <div className="button-card" onClick={HandleGameSelected}>
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
          {/* <Card.Subtitle>{developer}</Card.Subtitle> */}
          <div>{Array.isArray(platform) ? platform.join(", ") : platform}</div>
          {/* <div>{Array.isArray(genre) ? genre.join(", ") : genre}</div> */}
          <p>$ {price}</p>
          <div className="d-grid gap-2">
             <Button onClick={HandleGameSelected} className="me-3" size="sm">
              Seleccionar juego
            </Button>
            {/* <Button size="sm" className="me-3" variant="secondary">
              Añadir al carrito
            </Button> */}
          </div>
        </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default CardsItem;
