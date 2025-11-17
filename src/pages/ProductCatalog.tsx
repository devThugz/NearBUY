import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
export default function ProductCatalog() {
  const {
    user
  } = useAuth();
  const {
    addToCart
  } = useCart();
  // Mock products data
  const products = [{
    id: '1',
    name: 'Product 1',
    description: 'This is a description for product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    supplierId: 'supplier1'
  }, {
    id: '2',
    name: 'Product 2',
    description: 'This is a description for product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    supplierId: 'supplier2'
  }, {
    id: '3',
    name: 'Product 3',
    description: 'This is a description for product 3',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    supplierId: 'supplier1'
  }];
  const handleAddToCart = (product: any) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      supplierId: product.supplierId
    });
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product Catalog
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {user?.role === 'business' && <button onClick={() => handleAddToCart(product)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                      Add to Cart
                    </button>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}