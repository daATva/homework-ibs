import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import ProductCard from "../ProductCard/ProductCard";

const Catalog = ({ searchTerm, onSelectProduct }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Загрузка товаров...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки товаров: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div>Товары не найдены.</div>;
  }

  return (
    <div className="catalog">
      <div className="catalog__group">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
