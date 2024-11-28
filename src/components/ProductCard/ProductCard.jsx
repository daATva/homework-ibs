import React, { useState, useEffect } from "react";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import productImage from "../../assets/prod.png";

const ProductCard = ({ product, onSelectProduct }) => {
  const [isFavorite, setIsFavorite] = useState(product.like);

  useEffect(() => {
    // Сохраняем состояние избранных товаров в localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      if (!savedFavorites.some((fav) => fav.id === product.id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...savedFavorites, product])
        );
      }
    } else {
      const newFavorites = savedFavorites.filter(
        (fav) => fav.id !== product.id
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  }, [isFavorite, product]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события клика
    setIsFavorite((prev) => !prev); // Меняем состояние
  };

  return (
    <div className="catalog__item" onClick={() => onSelectProduct(product)}>
      <div className="item__group">
        <div
          className={`item__favorite ${isFavorite ? "favorite-active" : ""}`}
          onClick={toggleFavorite}
        >
          <img
            src={isFavorite ? favoriteBorder : favoriteImage}
            alt="Favorite"
          />
        </div>
        <div className="item__image">
          <img
            src={productImage}
            alt={product.picture?.alt || product.name}
            className="item__min"
          />
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
