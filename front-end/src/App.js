import React from 'react';
import ProductList from './components/ProductList';
import ProductSold from './components/ProductSold';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/soldproducts" element={<ProductSold />} />
      </Routes>
    </Router>
  );
}

export default App;
