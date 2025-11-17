import React from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total
  } = useCart();
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        {items.length === 0 ? <div className="mt-6 bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div> : <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {items.map(item => <li key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          -
                        </button>
                        <span className="px-3 py-1 border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          +
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </div>
                  </li>)}
              </ul>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                  Checkout
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}