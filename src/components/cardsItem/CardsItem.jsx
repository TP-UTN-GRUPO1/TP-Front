import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./cardsItem.css";

const Cardsitem = ({
  id,
  gameName,
  developer,
  imageUrl,
  platform,
  price,
  available,
  onGameSelected,
  genre
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
          genre
        },
      },
    });
  };

  return (
    <div className="card-container">
    <Card className="cards">
      <Card.Img height={300} variant="top" src={imageUrl} />
      <Card.Body>
        <div className="stock">
          {available ? (
            <Badge bg="success">En Stock</Badge>
          ) : (
            <Badge bg="danger">Sin Stock</Badge>
          )}
        </div>
        <Card.Title>{gameName}</Card.Title>
        <Card.Subtitle>{developer}</Card.Subtitle>
        <div>{platform.map(plt => plt.platformName)}</div>
        <div>{genre.map(gnr => gnr.genreName)}</div>
        <p>$ {price}</p>
        <div className="">
          <Button onClick={HandleGameSelected}>Seleccionar juego</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};

export default Cardsitem;
