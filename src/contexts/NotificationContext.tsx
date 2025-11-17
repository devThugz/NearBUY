import React, { useEffect, useState, createContext, useContext } from 'react';
export interface Notification {
  id: string;
  type: 'order' | 'stock' | 'supplier' | 'ai' | 'market' | 'system' | 'inquiry' | 'payment' | 'user' | 'document' | 'delivery' | 'message';
  category: string;
  message: string;
  timestamp: Date;
  unread: boolean;
  priority?: 'low' | 'medium' | 'high';
}
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
}
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
export function NotificationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Initialize with some default notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [{
      id: '1',
      type: 'order',
      category: 'Orders',
      message: 'New order placed by ABC Trading Co.',
      timestamp: new Date(Date.now() - 2 * 60000),
      unread: true,
      priority: 'high'
    }, {
      id: '2',
      type: 'stock',
      category: 'Inventory',
      message: 'Fresh Produce Co. updated stock levels',
      timestamp: new Date(Date.now() - 15 * 60000),
      unread: true,
      priority: 'medium'
    }, {
      id: '3',
      type: 'delivery',
      category: 'Delivery',
      message: 'Order #12345 delivered successfully',
      timestamp: new Date(Date.now() - 60 * 60000),
      unread: false,
      priority: 'low'
    }, {
      id: '4',
      type: 'message',
      category: 'Messages',
      message: 'New message from Tech Solutions Inc.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      unread: true,
      priority: 'medium'
    }];
    setNotifications(initialNotifications);
  }, []);
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? {
      ...notif,
      unread: false
    } : notif));
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({
      ...notif,
      unread: false
    })));
  };
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  const unreadCount = notifications.filter(n => n.unread).length;
  return <NotificationContext.Provider value={{
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount
  }}>
      {children}
    </NotificationContext.Provider>;
}
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}