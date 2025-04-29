import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from 'react-router';


import './cardsItem.css'

const Cardsitem = ({
  id,
  gameName, 
  developer,
  imageUrl, 
  platform, 
  price,
  available,
  onGameSelected
}) => {

  const navigate = useNavigate();
  const HandleGameSelected = () => {
      onGameSelected(gameName);
      navigate(`${id}`, {
          state: {
              game: {
                  id,
                  gameName, 
                  developer,
                  imageUrl, 
                  platform, 
                  price,
                  available,
                  
              }
          }
      })
  }

  return (
      <Card className="mx-3 mb-3 card-container">
          <Card.Img
              height={300}
              variant="top"
              src={imageUrl} />
          <Card.Body>
              <div className="mb-2">
                  {available ?
                      <Badge bg="success">En Stock</Badge> :
                      <Badge bg="danger">Sin Stock</Badge>
                  }
              </div>
              <Card.Title>{gameName}</Card.Title>
              <Card.Subtitle>{developer}</Card.Subtitle>
              <div> {platform} </div>
              <p>$ {price}</p>
              <div className="d-flex justify-content-between">
                  <Button
                      onClick={HandleGameSelected}>
                      Seleccionar juego
                  </Button>
              </div>
          </Card.Body>
      </Card>
  )
}


export default Cardsitem
