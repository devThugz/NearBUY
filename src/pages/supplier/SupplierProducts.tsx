import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { XIcon, ShoppingCartIcon, SearchIcon } from 'lucide-react';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}
const MOCK_PRODUCTS: Product[] = [{
  id: '1',
  name: 'Fresh Organic Tomatoes',
  description: 'Premium quality organic tomatoes, farm fresh',
  price: 120,
  image: 'https://images.unsplash.com/photo-1546470427-227e1e3c3b8f?w=400',
  stock: 150,
  category: 'Vegetables'
}, {
  id: '2',
  name: 'Premium Rice 25kg',
  description: 'High-quality jasmine rice, perfect for daily use',
  price: 1250,
  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
  stock: 80,
  category: 'Grains'
}, {
  id: '3',
  name: 'Fresh Chicken Meat',
  description: 'Free-range chicken, hormone-free',
  price: 280,
  image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400',
  stock: 45,
  category: 'Meat'
}, {
  id: '4',
  name: 'Cooking Oil 1L',
  description: 'Pure vegetable cooking oil',
  price: 95,
  image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
  stock: 200,
  category: 'Pantry'
}, {
  id: '5',
  name: 'Fresh Eggs (30pcs)',
  description: 'Farm fresh eggs, high protein',
  price: 180,
  image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
  stock: 120,
  category: 'Dairy'
}, {
  id: '6',
  name: 'Potatoes 5kg',
  description: 'Fresh potatoes, perfect for any dish',
  price: 150,
  image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
  stock: 90,
  category: 'Vegetables'
}];
export default function SupplierProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    addToCart
  } = useCart();
  const filteredProducts = MOCK_PRODUCTS.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleAddToCart = (product: Product, qty: number) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      supplierId: 'supplier-1'
    });
    toast.success(`${product.name} added to cart!`);
    setSelectedProduct(null);
    setQuantity(1);
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Browse and order from our product catalog
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <div className="aspect-video overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{product.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
                <button onClick={e => {
              e.stopPropagation();
              handleAddToCart(product, 1);
            }} className="px-4 py-2 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center">
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  Add
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {/* Product Detail Modal */}
      {selectedProduct && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h2>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    {selectedProduct.category}
                  </span>
                </div>
                <p className="text-gray-700">{selectedProduct.description}</p>
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₱{selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Stock</p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedProduct.stock}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                      -
                    </button>
                    <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center border border-gray-300 rounded-lg py-2" min="1" max={selectedProduct.stock} />
                    <button onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))} className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleAddToCart(selectedProduct, quantity)} className="w-full py-3 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Add {quantity} to Cart - ₱
                  {(selectedProduct.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}