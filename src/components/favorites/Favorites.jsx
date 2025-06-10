import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
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
        const res = await axios.get(`http://localhost:3000/favorites?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setFavorites(res.data)
      } catch (err) {
        console.error("Error fetching favorites", err)
      } finally {
        setLoading(false);
      }

    };
    if (userId) getFavoritesById();
  }, [userId, token]);



  // const addToFavorites = async (newFavorite) => {
  //   try {
  //     const isAlreadyFavorite = favorites.some(
  //       (fav) => fav.nameGame === newFavorite.nameGame
  //     );
  //     if (isAlreadyFavorite) {
  //       return console.log("Este juego ya está en tus favoritos");
  //     }
  //     const res = await axios.post(
  //       "http://localhost:3000/favorites",
  //       {
  //         userId: userId,
  //         nameGame: newFavorite.nameGame,
  //         imageUrl: newFavorite.imageUrl,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       },
  //     );
  //     setFavorites((prev) => [...prev, res.data]);
  //   } catch (err) {
  //     console.error("Error adding to favorites", err);
  //   }
  // };



  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:3000/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      console.error("Error deleting favorite", err)
    }
  }








  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Tus Favoritos</h2>

      <div className="cart-header">
        <span>Juego</span>
        <span></span>
        <span></span>
        <span>Eliminar</span>
      </div>
    </div>
  )
}

export default Favorites