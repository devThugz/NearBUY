import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, PackageIcon, TruckIcon, AlertTriangleIcon, TrendingUpIcon, CheckCheckIcon, TrashIcon, XIcon, SparklesIcon, ShoppingBagIcon, DollarSignIcon, UserPlusIcon, FileTextIcon, ClockIcon, CheckIcon, Trash2Icon, MessageSquareIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { toast } from 'sonner';
export default function UnifiedAlerts() {
  const {
    user
  } = useAuth();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount
  } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <PackageIcon className="w-5 h-5" />;
      case 'stock':
        return <AlertTriangleIcon className="w-5 h-5" />;
      case 'supplier':
        return <TruckIcon className="w-5 h-5" />;
      case 'ai':
        return <SparklesIcon className="w-5 h-5" />;
      case 'market':
        return <TrendingUpIcon className="w-5 h-5" />;
      case 'inquiry':
        return <ShoppingBagIcon className="w-5 h-5" />;
      case 'payment':
        return <DollarSignIcon className="w-5 h-5" />;
      case 'user':
        return <UserPlusIcon className="w-5 h-5" />;
      case 'document':
        return <FileTextIcon className="w-5 h-5" />;
      case 'delivery':
        return <TruckIcon className="w-5 h-5" />;
      case 'message':
        return <MessageSquareIcon className="w-5 h-5" />;
      default:
        return <BellIcon className="w-5 h-5" />;
    }
  };
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-blue-600 bg-blue-50';
      case 'stock':
        return 'text-red-600 bg-red-50';
      case 'supplier':
        return 'text-orange-600 bg-orange-50';
      case 'ai':
        return 'text-purple-600 bg-purple-50';
      case 'market':
        return 'text-green-600 bg-green-50';
      case 'inquiry':
        return 'text-teal-600 bg-teal-50';
      case 'payment':
        return 'text-emerald-600 bg-emerald-50';
      case 'user':
        return 'text-blue-600 bg-blue-50';
      case 'document':
        return 'text-teal-600 bg-teal-50';
      case 'delivery':
        return 'text-green-600 bg-green-50';
      case 'message':
        return 'text-indigo-600 bg-indigo-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">
            High Priority
          </span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-full">
            Medium
          </span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-bold bg-gray-100 text-gray-700 rounded-full">
            Low
          </span>;
    }
  };
  const formatTimestamp = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    toast.success('Alert marked as read');
  };
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success('All alerts marked as read');
  };
  const handleClearAll = () => {
    clearAllNotifications();
    toast.success('All alerts cleared');
  };
  const handleDeleteAlert = (id: string) => {
    deleteNotification(id);
    toast.success('Alert deleted');
  };
  const filteredAlerts = notifications.filter(alert => {
    if (filter === 'unread' && !alert.unread) return false;
    if (filter === 'read' && alert.unread) return false;
    if (categoryFilter !== 'all' && alert.category !== categoryFilter) return false;
    return true;
  });
  const categories = ['all', ...new Set(notifications.map(a => a.category))];
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-m2m-text-primary flex items-center">
            <BellIcon className="w-8 h-8 mr-3 text-m2m-accent-blue" />
            System Alerts & Notifications
          </h1>
          <p className="text-m2m-text-secondary mt-2">
            Stay updated with real-time alerts and system notifications
          </p>
        </div>
        <motion.div animate={{
        opacity: [1, 0.5, 1]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="px-4 py-2 bg-m2m-accent-blue/20 text-m2m-accent-blue rounded-full font-bold">
          {unreadCount} Unread
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-m2m-text-secondary text-sm">Total Alerts</p>
              <p className="text-3xl font-bold text-m2m-text-primary mt-2">
                {notifications.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-m2m-accent-blue/20 rounded-full flex items-center justify-center">
              <BellIcon className="w-6 h-6 text-m2m-accent-blue" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-m2m-text-secondary text-sm">Unread</p>
              <p className="text-3xl font-bold text-m2m-accent-orange mt-2">
                {unreadCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-m2m-accent-orange/20 rounded-full flex items-center justify-center">
              <AlertTriangleIcon className="w-6 h-6 text-m2m-accent-orange" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-m2m-text-secondary text-sm">High Priority</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {notifications.filter(a => a.priority === 'high').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-m2m-text-secondary text-sm">Today</p>
              <p className="text-3xl font-bold text-m2m-success mt-2">
                {notifications.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-m2m-success/20 rounded-full flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-m2m-success" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Actions */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'all' ? 'bg-m2m-accent-blue text-white shadow-lg' : 'bg-m2m-bg-primary text-m2m-text-secondary hover:bg-m2m-accent-blue/10'}`}>
              All ({notifications.length})
            </button>
            <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'unread' ? 'bg-m2m-accent-orange text-white shadow-lg' : 'bg-m2m-bg-primary text-m2m-text-secondary hover:bg-m2m-accent-orange/10'}`}>
              Unread ({unreadCount})
            </button>
            <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'read' ? 'bg-m2m-success text-white shadow-lg' : 'bg-m2m-bg-primary text-m2m-text-secondary hover:bg-m2m-success/10'}`}>
              Read ({notifications.length - unreadCount})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-4 py-2 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue">
              {categories.map(cat => <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>)}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleMarkAllAsRead} disabled={unreadCount === 0} className="px-4 py-2 bg-m2m-accent-teal text-white rounded-lg font-medium hover:bg-m2m-accent-teal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <CheckCheckIcon className="w-4 h-4" />
              Mark All Read
            </motion.button>
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleClearAll} disabled={notifications.length === 0} className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <TrashIcon className="w-4 h-4" />
              Clear All
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Alerts List */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.6
    }} className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length === 0 ? <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="bg-m2m-bg-card rounded-xl p-12 border border-m2m-divider text-center">
              <BellIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
              <p className="text-m2m-text-secondary text-lg">
                No alerts to display
              </p>
            </motion.div> : filteredAlerts.map((alert, index) => <motion.div key={alert.id} layout initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} transition={{
          delay: index * 0.05
        }} className={`bg-m2m-bg-card rounded-xl p-6 border transition-all duration-300 ${alert.unread ? 'border-m2m-accent-blue bg-blue-50 shadow-lg' : 'border-m2m-divider hover:border-m2m-accent-blue/50'}`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getAlertColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-m2m-text-secondary uppercase tracking-wide">
                            {alert.category}
                          </span>
                          {getPriorityBadge(alert.priority)}
                          {alert.unread && <motion.div animate={{
                      scale: [1, 1.2, 1]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} className="w-2 h-2 bg-m2m-accent-blue rounded-full" />}
                        </div>
                        <p className={`text-sm ${alert.unread ? 'text-m2m-text-primary font-semibold' : 'text-m2m-text-secondary'}`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-m2m-text-secondary mt-2 flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {alert.unread && <motion.button whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.9
                  }} onClick={() => handleMarkAsRead(alert.id)} className="p-2 hover:bg-m2m-success/20 rounded-lg transition-colors" title="Mark as read">
                            <CheckIcon className="w-4 h-4 text-m2m-success" />
                          </motion.button>}
                        <motion.button whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.9
                  }} onClick={() => handleDeleteAlert(alert.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete alert">
                          <XIcon className="w-4 h-4 text-red-600" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </div>;
}