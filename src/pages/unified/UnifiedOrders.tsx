import React from 'react';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export default function UnifiedOrders() {
  const {
    orders
  } = useSupplierOrders();
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon className="w-5 h-5 text-m2m-success" />;
      case 'Pending':
        return <ClockIcon className="w-5 h-5 text-m2m-chart-yellow" />;
      case 'Cancelled':
        return <XCircleIcon className="w-5 h-5 text-m2m-accent-orange" />;
      default:
        return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-m2m-success/20 text-m2m-success';
      case 'Pending':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow';
      case 'Cancelled':
        return 'bg-m2m-accent-orange/20 text-m2m-accent-orange';
      default:
        return 'bg-m2m-divider/20 text-m2m-text-secondary';
    }
  };
  if (pendingOrders.length === 0) {
    return <div className="space-y-6">
        <h1 className="text-3xl font-bold text-m2m-text-primary">
          Active Orders
        </h1>
        <div className="bg-m2m-bg-card rounded-xl shadow-lg p-12 text-center border border-m2m-divider">
          <ClockIcon className="w-24 h-24 text-m2m-text-secondary/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
            No active orders
          </h2>
          <p className="text-m2m-text-secondary">
            Your pending orders will appear here
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-m2m-text-primary">
          Active Orders
        </h1>
        <p className="text-m2m-text-secondary mt-2">
          Track your pending orders
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingOrders.map(order => <div key={order.id} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-m2m-text-secondary">
                  Order ID
                </p>
                <p className="text-sm font-bold text-m2m-text-primary">
                  {order.id}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="ml-2">{order.status}</span>
              </span>
            </div>
            <div className="flex items-center mb-4">
              <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
              <div>
                <p className="font-semibold text-m2m-text-primary">
                  {order.name}
                </p>
                <p className="text-sm text-m2m-text-secondary">
                  Qty: {order.quantity}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-m2m-divider">
              <p className="text-sm text-m2m-text-secondary">{order.date}</p>
              <p className="text-lg font-bold text-m2m-text-primary">
                ₱{(order.price * order.quantity).toFixed(2)}
              </p>
            </div>
          </div>)}
      </div>
    </div>;
}