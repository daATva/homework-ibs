import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import productImage from "../../assets/product.png";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import Header from "../Header/Header";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((item) => item.id.toString() === id)
  );
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite] = useState(product?.like || false);

  const handleSearch = (query) => {
    console.log("Поиск:", query);
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    console.log(
      `Добавлено в корзину: ${product.name}, количество: ${quantity}`
    );
  };

  if (loading) {
    return <div>Загрузка товара...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки товара: {error}</div>;
  }

  if (!product) {
    return <div>Товар не найден.</div>;
  }

  return (
    <>
      <Header onSearch={handleSearch} />
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
            <button className="product__cart" onClick={addToCart}>
              Add to cart
            </button>
            <img
              className="item__favorite"
              src={isFavorite ? favoriteImage : favoriteBorder}
              alt="Favorite"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
