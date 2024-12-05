import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import Main from "./pages/Main/Main";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
