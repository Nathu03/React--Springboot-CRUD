import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import Api from './pages/ApiGet';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProductForm />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
          <Route path="/api" element={<Api />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
