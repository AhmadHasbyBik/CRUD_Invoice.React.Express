// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-xl font-bold">My App</div>
        <div className="flex space-x-7">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/manage-products" className="text-white">
            Manage Product
          </Link>
          <Link to="/invoices" className="text-white">
            Invoice
          </Link>
          <Link to="/product-sold" className="text-white">
            Product Sold
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
