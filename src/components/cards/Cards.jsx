export const Cards = ({ nameGame, imageUrl, platform, price }) => {

  const imgAlternative = "https://w7.pngwing.com/pngs/268/183/png-transparent-sniper-2-ghost-warrior-pc-dvd-case-soldier-pc-game-film-video-game-software-sniper-ghost-warrior-2-game-video-game-sniper-thumbnail.png"
  return (
    <div>
      <img src={imageUrl ||imgAlternative } alt="Img not found" />
      <h2>{nameGame}</h2>
      <p>{platform}</p>
      <p>${price}</p>
    </div>
  );
};
