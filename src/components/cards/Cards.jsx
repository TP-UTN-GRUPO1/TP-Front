

export const Cards = ({nameGame, imageUrl,platform,price}) => {
  return (
    <div>
      <img src ={imageUrl}/>
      <h2>{nameGame}</h2>
      <p>{platform}</p>
      <p>${price}</p>

    </div>
  )
}

