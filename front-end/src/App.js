import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductSold from "./components/ProductSold";
import InvoiceList from "./components/invoiceList"; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> 
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-products" element={<ProductList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/product-sold" element={<ProductSold />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
