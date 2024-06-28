import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, deleteProduct } from '../redux/productSlice';
import CreateProductModal from '../components/modal/CreateProductModal'; 
import EditProductModal from '../components/modal/EditProductModal'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [showCreateModal, setShowCreateModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold mt-5 mb-4">Product List</div>
      <button onClick={handleOpenCreateModal} className="bg-blue-500 text-white px-4 py-2 rounded-2xl mb-4">
        Create Product
      </button>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
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
            {/* Tombol Edit */}
            <button 
              onClick={() => handleOpenEditModal(product)} 
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-2xl"
            >
              Edit
            </button>
            {/* Tombol Hapus */}
            <button 
              onClick={() => handleDeleteProduct(product.id)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-2xl ml-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Paginasi */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal Create Product */}
      {showCreateModal && <CreateProductModal onClose={handleCloseCreateModal} />}

      {/* Modal Edit Product */}
      {showEditModal && <EditProductModal product={selectedProduct} onClose={handleCloseEditModal} />}
    </div>
  );
};

export default ProductList;
