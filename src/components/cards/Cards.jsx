import React from "react";
import CardsItem from "../cardsItem/CardsItem";

const Cards = ({ games }) => {
  const gamesMapped = games.map((game) => {
    return (
      <CardsItem
        key={game.id}
        id={game.id}
        gameName={game.nameGame}
        developer={game.developer}
        price={game.price}
        platform={game.platforms?.map((p) => p.platformName) || []}
        genre={game.genres?.map((g) => g.genreName) || []}
        imageUrl={game.imageURL || game.imageUrl}
        available={game.available}
      />
    );
  });

  return (
    <div className="d-flex justify-content-center flex-wrap">{gamesMapped}</div>
  );
};

export default Cards;
