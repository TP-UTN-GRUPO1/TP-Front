import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';






const Favorites = () => {

  const [favorites, setfavorites] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favorites/${id}`);
        setfavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };
    getFavorites();
  }, [id]);


  const addToFavorites= () => {
      setfavorites((prevFavorites) => {
        const existingFavoritesIndex = prevFavorites.findIndex(
          (item)=> item.id === favorites.id
        );

        if(existingFavoritesIndex === 1){
          return console.log("Ya esta agregado a favoritos")
        }
      })

      
  }

  const handleAddToFavorites = () => {
    if (favorites) {
      addToFavorites({
        id: favorites.id,
        name: favorites.nameGame,
        img: favorites.imageUrl,
      });

    }
  }


  // if (!favorites) {
  //   return <LoadingSpinner />;
  // }

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