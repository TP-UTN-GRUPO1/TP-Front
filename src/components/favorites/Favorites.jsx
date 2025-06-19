import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { AuthContext } from '../../auth/Auth.Context';
import {errorToast, successToast}from "../../utils/notification"
import "./Favorites.css"
import { Button, Card } from 'react-bootstrap';

const Favorites = () => {

  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;


  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const getFavoritesById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)
      setFavorites(res.data.games || []);
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
    await axios.delete("http://localhost:3000/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        gameId: favoriteId,
        idUser: userId,
      },
    });
    successToast("Juego eliminado de favoritos con exito")

    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  } catch (err) {
    console.error("Error deleting favorite", err.response?.data || err.message);
    errorToast("Ups error no se pudo quitar el juego de favo =(")
  }
};



  if (loading) return <LoadingSpinner />;
  console.log(favorites, "como lo trae")
  return (
    <div className="container mt-4">
      <h2 className="text-white">Tus Favoritos</h2>

      {favorites.length === 0 ? (
        <p className='text-white'>No tenés juegos en favoritos todavía.</p>
      ) : (
        <div className="row">
          {favorites.map((fav) => (
            <div className="col-md-4 mb-4" key={fav.id}>
              <Card className="cards">
                <Card.Img src={fav.imageUrl} height={350} variant='top' alt={fav.nameGame} />
                <Card.Body className="card-body">
                  <h5 className="card-title">{fav.nameGame}</h5>
                  <Button
                    className="button"
                    onClick={() => handleDeleteFavorite(fav.id)}
                  >
                    Eliminar de favoritos
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default Favorites