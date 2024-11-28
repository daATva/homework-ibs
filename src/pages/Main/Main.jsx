import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Catalog from "../../components/Catalog/Catalog";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import "./Main.scss";

const Main = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <main>
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <Catalog
            onSelectProduct={handleSelectProduct}
            searchTerm={searchTerm}
          />
        )}
      </main>
    </div>
  );
};

export default Main;
