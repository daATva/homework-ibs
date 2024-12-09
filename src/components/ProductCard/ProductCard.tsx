import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import productImage from "../../assets/prod.png";
import { Product } from "../../pages/Main/Main";

<<<<<<< HEAD:src/components/ProductCard/ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.like);

  useEffect(() => {
    const savedFavorites: Product[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
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

  const toggleFavorite = (e: React.MouseEvent) => {
=======
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(product.like);

  const handleSelectProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const toggleFavorite = (e) => {
>>>>>>> cb70d020c874d6fd149798245fd627af023e17d5:src/components/ProductCard/ProductCard.jsx
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
