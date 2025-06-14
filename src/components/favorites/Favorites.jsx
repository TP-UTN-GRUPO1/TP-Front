import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { AuthContext } from '../../auth/Auth.Context';

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

    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  } catch (err) {
    console.error("Error deleting favorite", err.response?.data || err.message);
  }
};



  if (loading) return <LoadingSpinner />;
  console.log(favorites, "como lo trae")
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tus Favoritos</h2>

      {favorites.length === 0 ? (
        <p>No tenés juegos en favoritos todavía.</p>
      ) : (
        <div className="row">
          {favorites.map((fav) => (
            <div className="col-md-4 mb-4" key={fav.id}>
              <div className="card h-100">
                <img src={fav.imageUrl} className="card-img-top" alt={fav.nameGame} />
                <div className="card-body">
                  <h5 className="card-title">{fav.nameGame}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteFavorite(fav.id)}
                  >
                    Eliminar de favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default Favorites