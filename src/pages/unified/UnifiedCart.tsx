import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { toast } from 'sonner';
import { ShoppingCartIcon, TrashIcon, MinusIcon, PlusIcon } from 'lucide-react';
export default function UnifiedCart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total,
    clearCart
  } = useCart();
  const {
    addOrder
  } = useSupplierOrders();
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    const orderItems = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));
    addOrder(orderItems);
    clearCart();
    toast.success('✅ Your order has been placed successfully!');
  };
  if (items.length === 0) {
    return <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600">Add some products to get started!</p>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">Review and manage your cart items</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {items.map(item => <div key={item.id} className="p-6 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">₱{item.price} each</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="text-right min-w-[100px]">
                <p className="text-lg font-bold text-gray-900">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>)}
        </div>
        {/* Cart Summary */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-900">Subtotal:</span>
            <span className="text-2xl font-bold text-gray-900">
              ₱{total.toFixed(2)}
            </span>
          </div>
          <button onClick={handlePlaceOrder} className="w-full py-3 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Place Order
          </button>
        </div>
      </div>
    </div>;
}