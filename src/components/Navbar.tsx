import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';
import { toast } from 'sonner';
import { ShoppingCartIcon, LogOutIcon, PackageIcon, MapIcon, LayoutDashboardIcon, BellIcon, XIcon, CheckCheckIcon, UserPlusIcon, FileTextIcon, TruckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface Alert {
  id: number;
  type: 'order' | 'stock' | 'delivery' | 'message' | 'user' | 'supplier' | 'document';
  message: string;
  time: string;
  unread: boolean;
  icon?: React.ReactNode;
}
export default function Navbar() {
  const {
    user,
    logout
  } = useAuth();
  const {
    items
  } = useCart();
  const navigate = useNavigate();
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([{
    id: 1,
    type: 'order',
    message: 'New order placed by ABC Trading Co.',
    time: '2 min ago',
    unread: true
  }, {
    id: 2,
    type: 'stock',
    message: 'Fresh Produce Co. updated stock levels',
    time: '15 min ago',
    unread: true
  }, {
    id: 3,
    type: 'delivery',
    message: 'Order #12345 delivered successfully',
    time: '1 hour ago',
    unread: false
  }, {
    id: 4,
    type: 'message',
    message: 'New message from Tech Solutions Inc.',
    time: '2 hours ago',
    unread: true
  }]);
  const unreadCount = alerts.filter(a => a.unread).length;
  useEffect(() => {
    const notificationTypes = [{
      type: 'user' as const,
      messages: ['New user login: Maria Santos just logged in', 'New user registration: Juan Dela Cruz', 'User profile updated: Tech Solutions Inc.'],
      icon: <UserPlusIcon className="w-4 h-4" />
    }, {
      type: 'supplier' as const,
      messages: ['New supplier registration: Fresh Valley Farms', 'Supplier updated product catalog: BuildMart Hardware', 'New supplier verification pending'],
      icon: <TruckIcon className="w-4 h-4" />
    }, {
      type: 'document' as const,
      messages: ['Document status changed: Approved', 'New document uploaded by Green Valley Farms', 'Document verification required'],
      icon: <FileTextIcon className="w-4 h-4" />
    }];
    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      const newAlert: Alert = {
        id: Date.now(),
        type: randomType.type,
        message: randomMessage,
        time: 'Just now',
        unread: true,
        icon: randomType.icon
      };
      setAlerts(prev => [newAlert, ...prev]);
      toast.success(randomMessage, {
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => setAlertsOpen(true)
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  const handleLogout = () => {
    logout();
    toast.success('✅ You have successfully logged out.');
    navigate('/');
  };
  const handleMarkAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      unread: false
    } : alert));
  };
  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({
      ...alert,
      unread: false
    })));
    toast.success('All notifications marked as read');
  };
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UserPlusIcon className="w-4 h-4 text-blue-500" />;
      case 'supplier':
        return <TruckIcon className="w-4 h-4 text-orange-500" />;
      case 'document':
        return <FileTextIcon className="w-4 h-4 text-teal-500" />;
      default:
        return <BellIcon className="w-4 h-4 text-gray-500" />;
    }
  };
  return <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo size="md" showText={true} />
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50">
              <LayoutDashboardIcon className="w-5 h-5 mr-1.5 flex-shrink-0" />
              <span className="font-medium">Dashboard</span>
            </Link>
            {user?.role !== 'admin' && <>
                <Link to="/products" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50">
                  <PackageIcon className="w-5 h-5 mr-1.5 flex-shrink-0" />
                  <span className="font-medium">Products</span>
                </Link>
                <Link to="/orders" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50">
                  <span className="font-medium">Orders</span>
                </Link>
              </>}
            {(user?.role === 'business' || user?.role === 'admin') && <Link to="/map" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50">
                <MapIcon className="w-5 h-5 mr-1.5 flex-shrink-0" />
                <span className="font-medium">Map</span>
              </Link>}
            {user?.role === 'business' && <Link to="/cart" className="relative flex items-center text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50">
                <ShoppingCartIcon className="w-5 h-5 flex-shrink-0" />
                {items.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {items.length}
                  </span>}
              </Link>}
            <div className="flex items-center space-x-3 pl-6 ml-2 border-l border-gray-200">
              <div className="relative">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => setAlertsOpen(!alertsOpen)} className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative" title="Realtime Alerts">
                  <motion.div animate={unreadCount > 0 ? {
                  rotate: [0, -15, 15, -15, 15, 0]
                } : {}} transition={{
                  duration: 0.5,
                  repeat: unreadCount > 0 ? Infinity : 0,
                  repeatDelay: 3
                }}>
                    <BellIcon className="w-5 h-5 flex-shrink-0" />
                  </motion.div>
                  {unreadCount > 0 && <>
                      <motion.span animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full" />
                      <motion.span initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-[9px] text-white font-bold">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </motion.span>
                    </>}
                </motion.button>
                <AnimatePresence>
                  {alertsOpen && <>
                      <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setAlertsOpen(false)} />
                      <motion.div initial={{
                    opacity: 0,
                    y: -20,
                    scale: 0.9
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.9
                  }} transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                  }} className="absolute right-0 top-14 w-96 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div animate={{
                          rotate: [0, 10, -10, 0]
                        }} transition={{
                          duration: 0.5
                        }}>
                              <BellIcon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-white font-bold text-lg">
                                Notifications
                              </h3>
                              <p className="text-white/80 text-xs">
                                {unreadCount} unread alerts
                              </p>
                            </div>
                          </div>
                          <motion.button whileHover={{
                        scale: 1.1,
                        rotate: 90
                      }} whileTap={{
                        scale: 0.9
                      }} onClick={() => setAlertsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                            <XIcon className="w-5 h-5 text-white" />
                          </motion.button>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto">
                          {alerts.length === 0 ? <div className="p-8 text-center">
                              <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500 text-sm">
                                No recent notifications
                              </p>
                            </div> : alerts.map((alert, index) => <motion.div key={alert.id} initial={{
                        opacity: 0,
                        x: -20
                      }} animate={{
                        opacity: 1,
                        x: 0
                      }} transition={{
                        delay: index * 0.05,
                        duration: 0.3
                      }} onClick={() => handleMarkAsRead(alert.id)} className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 cursor-pointer group ${alert.unread ? 'bg-blue-50/50' : ''}`}>
                                <div className="flex items-start space-x-3">
                                  <motion.div whileHover={{
                            scale: 1.2,
                            rotate: 10
                          }} className="mt-1 flex-shrink-0">
                                    {alert.icon || getAlertIcon(alert.type)}
                                  </motion.div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${alert.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                      {alert.message}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <p className="text-xs text-gray-500">
                                        {alert.time}
                                      </p>
                                      {alert.unread && <motion.div initial={{
                                scale: 0
                              }} animate={{
                                scale: 1
                              }} className="w-2 h-2 bg-red-500 rounded-full" />}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>)}
                        </div>
                        {alerts.length > 0 && <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <motion.button whileHover={{
                        scale: 1.05,
                        x: 5
                      }} whileTap={{
                        scale: 0.95
                      }} onClick={handleMarkAllAsRead} disabled={unreadCount === 0} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-teal-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                              <CheckCheckIcon className="w-4 h-4" />
                              <span>Mark all as read</span>
                            </motion.button>
                            <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} className="text-sm text-blue-600 hover:text-teal-600 font-medium transition-colors">
                              View all
                            </motion.button>
                          </div>}
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-default hidden lg:block" style={{
              fontSize: '11px',
              letterSpacing: '0.3px'
            }}>
                <motion.span whileHover={{
                textShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
              }} transition={{
                duration: 0.3
              }}>
                  © NearBuy — All Rights Reserved
                </motion.span>
              </motion.div>
              <button onClick={handleLogout} className="p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all" title="Logout">
                <LogOutIcon className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>;
}