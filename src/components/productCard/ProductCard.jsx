import { useTranslate } from "../../hooks/useTranslate";
import Button from "../button/Button";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const translate = useTranslate();

  return (
    <div className="productCard">
      <div className="tittleButton">
        <Button
          text={translate("Return")}
          onClick={() => window.history.back()}
          className="back-button"
        />
      </div>

      <div className="product-content">
        <img
          src={product.imageUrl}
          alt={product.nameGame}
          className="cardPageImg"
        />

        <div className="product-info">
          <h1 className="product-title">{product.nameGame}</h1>
          <p>{translate("Developer")}: {product.developer}</p>
          <p>Rating: {product.rating}/10 ⭐</p>
          <p>
            {translate("Genre")}:{" "}
            {product.genres?.map((g) => g.genreName).join(" - ") || "N/A"}
          </p>
          <p>
            {translate("Platform")}:{" "}
            {product.platforms?.map((p) => p.platformName).join(" - ") || "N/A"}
          </p>
          <p>{translate("Price")}: ${product.price}</p>
          <p>
            {translate("Available")}: {product.available ? translate("Yes") : translate("No")}
          </p>
          <Button
            text={translate("Add_cart")}
            onClick={onAddToCart}
            className="add-to-cart"
          />
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
