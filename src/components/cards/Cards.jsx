import React from 'react'

import Cardsitem from "../cardsItem/CardsItem";




const Cards = ({games}) => {


  const gamesMapped = games
  .map((games) =>
      <Cardsitem
          key={games.id}
          id={games.id}
          gameName={games.nameGame}
          developer={games.developer}
          price={games.price}
          platform={games.platforms.map(game => game.platformName)}
          genre={games.genres.map(game => game.genreName)}
          imageUrl={games.imageUrl}
          available={games.available}/>);
 
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {gamesMapped}
    </div>
  )
}


export default Cards
