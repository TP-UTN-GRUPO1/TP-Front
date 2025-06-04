import Button from "../button/Button";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => (
  <div className="cards">
    <h1>{product.nameGame}</h1>
    <img
      src={product.imageUrl}
      alt={product.nameGame}
      className="cardPageImg"
    />
    <p>Desarrollador: {product.developer}</p>
    <p>Rating: {product.rating}/10 ⭐</p>
    <p>
      Género: {product.genres?.map((g) => g.genreName).join(" - ") || "N/A"}
    </p>
    <p>
      Plataforma:{" "}
      {product.platforms?.map((p) => p.platformName).join(" - ") || "N/A"}
    </p>
    <p>Precio: ${product.price}</p>
    <p>Disponible: {product.available ? "Sí" : "No"}</p>
    <Button
      text="Añadir al carrito"
      onClick={onAddToCart}
      className="add-to-cart"
    />
    <Button
      text="Volver"
      onClick={() => window.history.back()}
      className="back-button"
    />
  </div>
);

export default ProductCard;
