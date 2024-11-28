import React, { useState } from "react";
import productImage from "../../assets/product.png";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import "./ProductDetails.scss";

const ProductDetails = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite] = useState(product.like);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="product__content">
      <div className="product__preview">
        <img src={productImage} alt={product.name} />
      </div>
      <div className="product__description">
        <div className="product__title">{product.name}</div>
        <div className="product__title_descr">{product.description}</div>
        <div className="product__details">Details</div>
        <div className="product__details_descr">
          Detailed information about the product goes here.
        </div>
        <div className="product__buy">
          <div className="product__price">${product.price.value}</div>
          <div className="product__btns cart__group">
            <button type="button" className="decrement" onClick={decrement}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              readOnly
              id="quantity-input"
            />
            <button type="button" className="increment" onClick={increment}>
              +
            </button>
          </div>
          <button className="product__cart cart__group">Add to cart</button>
          <img
            className="item__favorite"
            src={isFavorite ? favoriteBorder : favoriteImage}
            alt="Favorite"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
