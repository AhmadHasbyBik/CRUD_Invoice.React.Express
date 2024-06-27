import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, deleteProduct } from '../redux/productSlice';
import CreateProductModal from './CreateProductModal'; // Import modal yang sudah dibuat

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [showModal, setShowModal] = useState(false); // State lokal untuk menampilkan modal

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold mt-5 mb-4">Product List</div>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Create Product
      </button>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 relative">
            <img 
              src={`http://localhost:5000/images/${product.image}`} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-700 mt-2">Price: ${product.price}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
            <p className="text-gray-700">{product.category}</p>
            {/* Tombol Hapus */}
            <button 
              onClick={() => handleDeleteProduct(product.id)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-2xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal Create Product */}
      {showModal && <CreateProductModal onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductList;
