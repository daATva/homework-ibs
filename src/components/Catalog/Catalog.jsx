import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { fetchItems } from "../../api/api";

const Catalog = ({ searchTerm, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems()
      .then((data) => {
        if (data.content && Array.isArray(data.content)) {
          setProducts(data.content);
          setFilteredProducts(data.content);
        } else {
          setError("Некорректные данные от сервера");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

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
