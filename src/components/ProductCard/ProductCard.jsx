import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import productImage from "../../assets/prod.png";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(product.like);

  const handleSelectProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="catalog__item" onClick={handleSelectProduct}>
      <div className="item__group">
        <div className="item__favorite" onClick={toggleFavorite}>
          <img
            src={isFavorite ? favoriteImage : favoriteBorder}
            alt="Favorite"
          />
        </div>
        <div className="item__image">
          <img src={productImage} alt={product.name} className="item__min" />
        </div>
        <div className="item__title">{product.name}</div>
        <div className="item__price">
          {product.price.value} {product.price.currency}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
