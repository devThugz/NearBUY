import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { toast } from 'sonner';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from 'lucide-react';
export default function SupplierCart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  } = useCart();
  const {
    addOrder
  } = useSupplierOrders();
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    addOrder(items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })));
    clearCart();
    toast.success('Your order has been placed successfully!');
    navigate('/supplier/orders');
  };
  if (items.length === 0) {
    return <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <button onClick={() => navigate('/supplier/products')} className="px-6 py-3 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Browse Products
          </button>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {items.length} items in your cart
          </p>
        </div>
        <button onClick={clearCart} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
          Clear Cart
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => <div key={item.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row gap-4">
                <img src={item.image} alt={item.name} className="w-full sm:w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    ₱{item.price}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₱50.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₱{(total + 50).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={handlePlaceOrder} className="w-full py-3 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Place Order
            </button>
            <button onClick={() => navigate('/supplier/products')} className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>;
}