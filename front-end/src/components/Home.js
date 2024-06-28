import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from '../redux/productSlice';
import ProductModal from '../components/modal/ProductModal';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBuyClick = (productId) => {
    setSelectedProduct(productId);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold mt-5 mb-4">Home</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4">
            <img 
              src={`http://localhost:5000/images/${product.image}`} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-700 mt-2">Price: ${product.price}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
            <p className="text-gray-700">{product.category}</p>
            <button 
              onClick={() => handleBuyClick(product.id)} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-2xl"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal 
          productId={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Home;
