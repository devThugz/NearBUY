import React from 'react';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export default function SupplierOrderHistory() {
  const {
    orders
  } = useSupplierOrders();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'Pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'Cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  if (orders.length === 0) {
    return <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <ClockIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-600">Your order history will appear here</p>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={order.image} alt={order.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                    <span className="text-sm text-gray-900">{order.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₱{(order.price * order.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{order.status}</span>
                  </span>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map(order => <div key={order.id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-sm font-bold text-gray-900">{order.id}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="ml-2">{order.status}</span>
              </span>
            </div>
            <div className="flex items-center mb-3">
              <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
              <div>
                <p className="font-semibold text-gray-900">{order.name}</p>
                <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">{order.date}</p>
              <p className="text-lg font-bold text-gray-900">
                ₱{(order.price * order.quantity).toFixed(2)}
              </p>
            </div>
          </div>)}
      </div>
    </div>;
}