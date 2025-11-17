import React, { useState, createContext, useContext } from 'react';
interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  date: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
}
interface SupplierOrderContextType {
  orders: OrderItem[];
  addOrder: (items: Omit<OrderItem, 'id' | 'date' | 'status'>[]) => void;
  updateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
}
const SupplierOrderContext = createContext<SupplierOrderContextType | undefined>(undefined);
export function SupplierOrderProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const addOrder = (items: Omit<OrderItem, 'id' | 'date' | 'status'>[]) => {
    const newOrders = items.map(item => ({
      ...item,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending' as const
    }));
    setOrders(prev => [...newOrders, ...prev]);
  };
  const updateOrderStatus = (orderId: string, status: OrderItem['status']) => {
    setOrders(prev => prev.map(order => order.id === orderId ? {
      ...order,
      status
    } : order));
  };
  return <SupplierOrderContext.Provider value={{
    orders,
    addOrder,
    updateOrderStatus
  }}>
      {children}
    </SupplierOrderContext.Provider>;
}
export function useSupplierOrders() {
  const context = useContext(SupplierOrderContext);
  if (!context) {
    throw new Error('useSupplierOrders must be used within SupplierOrderProvider');
  }
  return context;
}