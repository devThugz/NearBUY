import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, ClockIcon, HistoryIcon, UserIcon, LogOutIcon, MenuIcon, XIcon, BellIcon, MapIcon, SettingsIcon, HelpCircleIcon, CheckIcon, TrashIcon, CheckCheckIcon, Trash2Icon, HistoryIcon as ViewHistoryIcon, AlertCircleIcon, CheckCircleIcon as CheckCircle2Icon, BarChart3Icon, TrendingUpIcon, BotIcon, SendIcon, MapPinIcon, FileTextIcon, CreditCardIcon, StarIcon, UsersIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { MailIcon } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { UserPlusIcon, TruckIcon, MessageSquareIcon } from 'lucide-react';
interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}
interface SafeBizMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
export default function UnifiedLayout() {
  const {
    user,
    logout
  } = useAuth();
  const {
    items
  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // Use shared notification context
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount,
    addNotification
  } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [safeBizPanelOpen, setSafeBizPanelOpen] = useState(false);
  const [safeBizMessages, setSafeBizMessages] = useState<SafeBizMessage[]>([{
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your SAFEBIZ.AI assistant. I can help you with business setup, supplier guidance, location insights, document requirements, and more. What would you like to know?",
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }]);
  const [safeBizInput, setSafeBizInput] = useState('');
  const [showPreviousNotifications, setShowPreviousNotifications] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  // Mock user profile photo - in real app, this would come from user context
  const userProfilePhoto = user?.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200';
  const isBusinessUser = user?.role === 'business';
  // Simulate new notifications periodically
  useEffect(() => {
    const notificationTypes = [{
      type: 'user' as const,
      category: 'User Activity',
      messages: ['New user login: Maria Santos just logged in', 'New user registration: Juan Dela Cruz', 'User profile updated: Tech Solutions Inc.'],
      priority: 'low' as const
    }, {
      type: 'supplier' as const,
      category: 'Suppliers',
      messages: ['New supplier registration: Fresh Valley Farms', 'Supplier updated product catalog: BuildMart Hardware', 'New supplier verification pending'],
      priority: 'medium' as const
    }, {
      type: 'document' as const,
      category: 'Documents',
      messages: ['Document status changed: Approved', 'New document uploaded by Green Valley Farms', 'Document verification required'],
      priority: 'high' as const
    }, {
      type: 'order' as const,
      category: 'Orders',
      messages: ['New order received from Metro Fresh Foods', 'Order #12346 ready for pickup', 'Order status updated to In Transit'],
      priority: 'high' as const
    }];
    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      addNotification({
        type: randomType.type,
        category: randomType.category,
        message: randomMessage,
        unread: true,
        priority: randomType.priority
      });
      toast.success(randomMessage, {
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => {
            setNotificationOpen(false);
            navigate('/dashboard/alerts');
          }
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [addNotification, navigate]);
  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setUserMenuOpen(false);
  };
  const confirmLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
    setShowLogoutConfirm(false);
  };
  // Updated navigation items with new order and renamed Analytics
  const navItems = [{
    path: '/dashboard',
    icon: LayoutDashboardIcon,
    label: 'Dashboard'
  }, {
    path: '/dashboard/map',
    icon: MapIcon,
    label: 'Location Insights'
  }, {
    path: '/dashboard/products',
    icon: PackageIcon,
    label: 'Shop'
  }, {
    path: '/dashboard/documents',
    icon: FileTextIcon,
    label: 'Documents'
  }, {
    path: '/dashboard/analytics',
    icon: BarChart3Icon,
    label: 'Analytics'
  }, {
    action: () => setSafeBizPanelOpen(true),
    icon: BotIcon,
    label: 'SAFEBIZ.AI Support',
    isAction: true
  }, {
    path: '/dashboard/alerts',
    icon: BellIcon,
    label: 'Alerts'
  }];
  const handleSafeBizSend = () => {
    if (!safeBizInput.trim()) return;
    const userMessage: SafeBizMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: safeBizInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setSafeBizMessages([...safeBizMessages, userMessage]);
    setSafeBizInput('');
    // AI Response Logic based on user role and question
    setTimeout(() => {
      let aiResponse = '';
      const question = safeBizInput.toLowerCase();
      if (question.includes('best place') || question.includes('where')) {
        if (isBusinessUser) {
          aiResponse = "Based on our map analysis, I've identified several promising locations for your business:\n\n• **Construction Zone Area**: High demand for construction materials, hardware supplies, and safety equipment. There's a major construction project 2km from your location.\n\n• **Commercial District**: Multiple cafés and restaurants nearby - great opportunity for food suppliers or packaging materials.\n\n• **Residential Area**: Growing population with limited retail options - perfect for convenience stores or service businesses.\n\nWould you like detailed demographics for any of these locations?";
        } else {
          aiResponse = "As a supplier, I've analyzed high-demand zones for your products:\n\n• **Café Cluster Zone**: 12 cafés within 3km radius without a local coffee supplier - excellent distribution opportunity.\n\n• **Restaurant District**: High demand for fresh produce and packaging materials. Current suppliers are 15km away.\n\n• **Office Complex Area**: Growing need for office supplies and catering services. Low competition in this zone.\n\nWould you like me to provide contact information for potential buyers in these areas?";
        }
      } else if (question.includes('document') || question.includes('permit')) {
        aiResponse = "Here's your complete document checklist:\n\n✓ Business Permit (Mayor's Permit)\n✓ BIR Registration (TIN)\n✓ Barangay Clearance\n✓ Fire Safety Certificate\n✓ Sanitary Permit (if food-related)\n✓ Environmental Compliance Certificate\n\nI can guide you through each step. Which document would you like to start with?";
      } else if (question.includes('supplier') || question.includes('buyer')) {
        if (isBusinessUser) {
          aiResponse = 'I found 15 verified suppliers near your location:\n\n• **ABC Trading Co.** - Construction Materials (0.5km)\n  Rating: ⭐ 4.8 | Verified Supplier\n\n• **Fresh Harvest Farms** - Organic Produce (1.2km)\n  Rating: ⭐ 4.9 | Fast Delivery\n\n• **Metro Logistics Hub** - Distribution Services (2.3km)\n  Rating: ⭐ 4.7 | Nationwide Coverage\n\nWould you like to connect with any of these suppliers?';
        } else {
          aiResponse = 'I found 23 potential buyers in your area:\n\n• **Green Café Network** - 8 locations seeking coffee suppliers\n  Monthly Volume: 500kg | Payment: NET 30\n\n• **Metro Restaurant Group** - Fresh produce needed\n  Monthly Volume: 2 tons | Payment: NET 15\n\n• **Office Solutions Inc.** - Office supplies distributor\n  Monthly Volume: ₱250K | Payment: COD\n\nShall I arrange introductions?';
        }
      } else if (question.includes('payment') || question.includes('pricing')) {
        aiResponse = 'Payment & Pricing Support:\n\n• **Accepted Methods**: GCash, PayMaya, Bank Transfer, Cash on Delivery\n• **Payment Terms**: NET 15, NET 30, or COD available\n• **Pricing Tools**: Dynamic pricing calculator based on market rates\n• **Invoice Management**: Automated invoice generation\n\nNeed help setting up payment terms or resolving a payment issue?';
      } else {
        aiResponse = "I'm here to help! I can assist you with:\n\n• 📍 Location analysis and recommendations\n• 📋 Business permits and documentation\n• 🤝 Connecting with suppliers/buyers\n• 💰 Payment and pricing guidance\n• 📊 Market insights and trends\n• 🚚 Logistics and delivery optimization\n\nWhat would you like to explore?";
      }
      const assistantMessage: SafeBizMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setSafeBizMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  const quickActions = [{
    label: 'Business Setup Guide',
    icon: TrendingUpIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal'
  }, {
    label: 'Document Checklist',
    icon: FileTextIcon,
    color: 'from-m2m-accent-teal to-m2m-success'
  }, {
    label: 'Location Analysis Help',
    icon: MapPinIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange'
  }, {
    label: 'Payment Issues',
    icon: CreditCardIcon,
    color: 'from-m2m-chart-yellow to-m2m-accent-orange'
  }];
  const supportCategories = ['General Questions', 'Location Analysis', 'Documentation', 'Payments', 'Technical Support'];
  const userMenuItems = [{
    label: 'Profile',
    icon: UserIcon,
    action: () => {
      navigate('/dashboard/profile');
      setUserMenuOpen(false);
    }
  }, {
    label: 'Settings',
    icon: SettingsIcon,
    action: () => {
      setShowSettingsModal(true);
      setUserMenuOpen(false);
    }
  }, {
    label: 'Help Center',
    icon: HelpCircleIcon,
    action: () => {
      setShowHelpModal(true);
      setUserMenuOpen(false);
    }
  }, {
    label: 'Logout',
    icon: LogOutIcon,
    action: handleLogout,
    danger: true
  }];
  // Updated notification handlers
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    toast.success('Notification marked as read');
  };
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success('All notifications marked as read');
  };
  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    toast.success('Notification deleted');
  };
  const handleDeleteAllNotifications = () => {
    clearAllNotifications();
    setNotificationOpen(false);
    toast.success('All notifications deleted');
  };
  // Handle notification bell click - redirect to Alerts page
  const handleNotificationClick = () => {
    setNotificationOpen(false);
    navigate('/dashboard/alerts');
  };
  const currentNotifications = showPreviousNotifications ? notifications : notifications.slice(0, 5);
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UserPlusIcon className="w-4 h-4 text-blue-500" />;
      case 'supplier':
        return <TruckIcon className="w-4 h-4 text-orange-500" />;
      case 'document':
        return <FileTextIcon className="w-4 h-4 text-teal-500" />;
      case 'order':
        return <PackageIcon className="w-4 h-4 text-purple-500" />;
      case 'delivery':
        return <TruckIcon className="w-4 h-4 text-green-500" />;
      case 'message':
        return <MessageSquareIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <BellIcon className="w-4 h-4 text-gray-500" />;
    }
  };
  return <div className="min-h-screen bg-m2m-bg-primary">
      {/* Fixed Sidebar - Desktop */}
      <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 bg-m2m-bg-card border-r border-m2m-divider shadow-xl z-40 flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
          {/* Enhanced Logo with Effects */}
          <div className="flex items-center justify-between p-6 border-b border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5 relative">
            {!sidebarCollapsed ? <div className="flex items-center space-x-3">
                <motion.img whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              type: 'spring',
              stiffness: 400
            }} src="/NearBuy_Logo.png" alt="NEARBUY Logo" className="w-12 h-12 rounded-xl shadow-lg object-contain" />
                <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }}>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-success bg-clip-text text-transparent">
                    NEARBUY
                  </h1>
                  <p className="text-xs text-m2m-text-secondary">
                    Business Portal
                  </p>
                </motion.div>
              </div> : <motion.img initial={{
            scale: 0.8
          }} animate={{
            scale: 1
          }} whileHover={{
            scale: 1.1,
            rotate: 5
          }} transition={{
            type: 'spring',
            stiffness: 400
          }} src="/NearBuy_Logo.png" alt="NEARBUY Logo" className="w-10 h-10 rounded-xl shadow-lg mx-auto object-contain" />}
            {/* Toggle Button */}
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-m2m-accent-blue rounded-full flex items-center justify-center shadow-lg hover:bg-m2m-accent-teal transition-colors ${sidebarCollapsed ? '' : ''}`}>
              {sidebarCollapsed ? <ChevronRightIcon className="w-4 h-4 text-white" /> : <ChevronLeftIcon className="w-4 h-4 text-white" />}
            </motion.button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path && location.pathname === item.path;
            if (item.isAction) {
              return <motion.button key={index} whileHover={{
                x: sidebarCollapsed ? 0 : 6,
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={item.action} className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start space-x-3 px-4'} py-3.5 rounded-xl transition-all text-m2m-text-secondary hover:bg-gradient-to-r hover:from-m2m-accent-blue/10 hover:to-m2m-accent-teal/10 hover:text-m2m-text-primary group relative`} title={sidebarCollapsed ? item.label : undefined}>
                    <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                    {sidebarCollapsed && <div className="absolute left-full ml-2 px-3 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {item.label}
                        </span>
                      </div>}
                  </motion.button>;
            }
            return <motion.div key={item.path} whileHover={{
              x: sidebarCollapsed ? 0 : 6,
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                  <Link to={item.path!} className={`flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start space-x-3 px-4'} py-3.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-lg shadow-m2m-accent-blue/30' : 'text-m2m-text-secondary hover:bg-gradient-to-r hover:from-m2m-accent-blue/10 hover:to-m2m-accent-teal/10 hover:text-m2m-text-primary'} group relative`} title={sidebarCollapsed ? item.label : undefined}>
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                    {sidebarCollapsed && !isActive && <div className="absolute left-full ml-2 px-3 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {item.label}
                        </span>
                      </div>}
                  </Link>
                </motion.div>;
          })}
          </nav>
          {/* User Info */}
          <div className="p-4 border-t border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5">
            {!sidebarCollapsed ? <motion.div whileHover={{
            scale: 1.02
          }} className="flex items-center space-x-3 px-4 py-3 bg-m2m-bg-primary rounded-xl shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-m2m-text-secondary truncate">
                    {user?.email}
                  </p>
                </div>
              </motion.div> : <motion.div whileHover={{
            scale: 1.1
          }} className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer" title={user?.name || 'User'}>
                <UserIcon className="w-6 h-6 text-white" />
              </motion.div>}
          </div>
          {/* Copyright Footer */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }} whileHover={{
          scale: 1.02,
          boxShadow: '0 10px 40px rgba(30, 144, 255, 0.3)'
        }} className="mt-auto pt-6 border-t border-m2m-divider transition-all duration-300 ease-in-out">
            <p className="text-xs text-m2m-text-secondary text-center font-medium hover:text-m2m-accent-blue transition-colors duration-300">
              © NearBuy — All Rights Reserved
            </p>
          </motion.div>
        </div>
      </aside>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{
          x: '-100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '-100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed left-0 top-0 bottom-0 w-72 bg-m2m-bg-card shadow-2xl z-50 flex flex-col lg:hidden">
              {/* Enhanced Logo with Effects */}
              <div className="flex items-center justify-between p-6 border-b border-m2m-divider">
                <div className="flex items-center space-x-3">
                  <motion.img whileHover={{
                scale: 1.1,
                rotate: 5
              }} transition={{
                type: 'spring',
                stiffness: 400
              }} src="/NearBuy_Logo.png" alt="NEARBUY Logo" className="w-10 h-10 rounded-lg shadow-lg object-contain" />
                  <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }}>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-success bg-clip-text text-transparent">
                      NEARBUY
                    </h1>
                    <p className="text-xs text-m2m-text-secondary">
                      Business Portal
                    </p>
                  </motion.div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-m2m-bg-primary rounded-lg">
                  <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                </button>
              </div>
              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.path && location.pathname === item.path;
              if (item.isAction) {
                return <motion.button key={index} whileHover={{
                  x: 4
                }} onClick={item.action} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-m2m-text-secondary hover:bg-m2m-bg-primary hover:text-m2m-text-primary">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>;
              }
              return <Link key={item.path} to={item.path!} onClick={() => setSidebarOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'text-m2m-text-secondary hover:bg-m2m-bg-primary hover:text-m2m-text-primary'}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>;
            })}
              </nav>
              {/* User Info */}
              <div className="p-4 border-t border-m2m-divider">
                <div className="flex items-center space-x-3 px-4 py-3 bg-m2m-bg-primary rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-m2m-text-primary truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-m2m-text-secondary truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>}
      </AnimatePresence>
      {/* Main Content Area */}
      <div className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Header - Fixed */}
        <header className="bg-m2m-bg-card border-b border-m2m-divider sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Mobile Menu Button */}
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-m2m-bg-primary rounded-xl transition-colors">
              <MenuIcon className="w-6 h-6 text-m2m-text-primary" />
            </button>
            <div className="flex-1 lg:flex-none" />
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications - Updated to redirect to Alerts page */}
              <div className="relative">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleNotificationClick} className="p-2.5 hover:bg-m2m-bg-primary rounded-xl relative transition-colors">
                  <BellIcon className="w-6 h-6 text-m2m-text-secondary" />
                  {unreadCount > 0 && <motion.span initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="absolute top-1 right-1 w-5 h-5 bg-m2m-accent-orange text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                      {unreadCount}
                    </motion.span>}
                </motion.button>
              </div>
              {/* User Menu Dropdown */}
              <div className="relative">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2 p-1.5 hover:bg-m2m-bg-primary rounded-xl transition-colors group">
                  <div className="relative">
                    <img src={user?.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'} alt={user?.name || 'User'} className="w-10 h-10 rounded-full object-cover border-2 border-m2m-divider group-hover:border-m2m-accent-blue transition-colors shadow-md" />
                    {user?.role === 'business' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-m2m-accent-blue rounded-full border-2 border-m2m-bg-card flex items-center justify-center shadow-lg">
                        <TrendingUpIcon className="w-2.5 h-2.5 text-white" />
                      </div>}
                  </div>
                </motion.button>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && <>
                      {/* Backdrop */}
                      <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      {/* Menu */}
                      <motion.div initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} transition={{
                    duration: 0.2
                  }} className="absolute right-0 mt-2 w-64 bg-m2m-bg-card border border-m2m-divider rounded-2xl shadow-2xl z-50 py-2 overflow-hidden">
                        {/* User Info Header with Profile Photo */}
                        <div className="px-4 py-3 border-b border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5">
                          <div className="flex items-center space-x-3">
                            <img src={userProfilePhoto} alt={user?.name || 'User'} className="w-12 h-12 rounded-full object-cover border-2 border-m2m-accent-blue" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-m2m-text-primary truncate">
                                {user?.name || 'User'}
                              </p>
                              <p className="text-xs text-m2m-text-secondary truncate">
                                {user?.email}
                              </p>
                              {isBusinessUser && <div className="flex items-center gap-1 mt-1">
                                  <TrendingUpIcon className="w-3 h-3 text-m2m-accent-blue" />
                                  <span className="text-xs text-m2m-accent-blue font-medium">
                                    Business User
                                  </span>
                                </div>}
                            </div>
                          </div>
                        </div>
                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return <motion.button key={index} whileHover={{
                          x: 4
                        }} onClick={item.action} className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-colors ${item.danger ? 'text-m2m-accent-orange hover:bg-m2m-accent-orange/10' : 'text-m2m-text-secondary hover:bg-m2m-bg-primary hover:text-m2m-text-primary'}`}>
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                  {item.label}
                                </span>
                              </motion.button>;
                      })}
                        </div>
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-m2m-bg-primary">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {/* SAFEBIZ.AI Support Panel */}
      <AnimatePresence>
        {safeBizPanelOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setSafeBizPanelOpen(false)} />
            {/* Panel */}
            <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed right-0 top-0 bottom-0 w-full lg:w-[900px] bg-m2m-bg-card shadow-2xl z-50 overflow-hidden flex flex-col">
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-7 h-7 text-m2m-accent-blue" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      SAFEBIZ.AI Assistant
                    </h2>
                    <div className="flex items-center space-x-2 text-white/90">
                      <div className="w-2 h-2 bg-m2m-success rounded-full animate-pulse" />
                      <span className="text-sm">Online & Ready to Help</span>
                    </div>
                  </div>
                </div>
                <motion.button whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={() => setSafeBizPanelOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <XIcon className="w-6 h-6 text-white" />
                </motion.button>
              </div>
              {/* Panel Content */}
              <div className="flex-1 overflow-hidden flex">
                {/* Left: Chat Interface */}
                <div className="flex-1 flex flex-col bg-m2m-bg-primary">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {safeBizMessages.map(message => <motion.div key={message.id} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${message.type === 'user' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white' : 'bg-m2m-bg-card border border-m2m-divider text-m2m-text-primary'}`}>
                          <p className="text-sm whitespace-pre-line">
                            {message.content}
                          </p>
                          <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-m2m-text-secondary'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </motion.div>)}
                  </div>
                  {/* Input */}
                  <div className="p-6 bg-m2m-bg-card border-t border-m2m-divider">
                    <div className="flex space-x-3">
                      <input type="text" value={safeBizInput} onChange={e => setSafeBizInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSafeBizSend()} placeholder="Type your question here..." className="flex-1 px-5 py-4 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={handleSafeBizSend} className="px-6 py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-medium hover:shadow-lg transition-all">
                        <SendIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                {/* Right: Quick Panels */}
                <div className="w-80 bg-m2m-bg-card border-l border-m2m-divider p-6 space-y-6 overflow-y-auto">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return <motion.button key={index} whileHover={{
                      scale: 1.02,
                      x: 4
                    }} whileTap={{
                      scale: 0.98
                    }} className="w-full flex items-center space-x-3 p-3 bg-m2m-bg-primary rounded-xl hover:shadow-md transition-all border border-m2m-divider">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-m2m-text-primary text-left">
                              {action.label}
                            </span>
                          </motion.button>;
                  })}
                    </div>
                  </div>
                  {/* Support Categories */}
                  <div>
                    <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                      Support Categories
                    </h3>
                    <div className="space-y-2">
                      {supportCategories.map((category, index) => <motion.button key={index} whileHover={{
                    x: 4
                  }} className="w-full text-left px-4 py-2 text-sm text-m2m-text-secondary hover:text-m2m-accent-blue hover:bg-m2m-bg-primary rounded-lg transition-all">
                          {category}
                        </motion.button>)}
                    </div>
                  </div>
                  {/* Support Status */}
                  <div className="bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 rounded-2xl border border-m2m-accent-blue/20 p-5">
                    <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                      Support Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-m2m-accent-blue rounded-full" />
                          <span className="text-sm text-m2m-text-secondary">
                            Response Time
                          </span>
                        </div>
                        <span className="text-sm font-bold text-m2m-text-primary">
                          &lt;30s
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <StarIcon className="w-4 h-4 text-m2m-accent-orange fill-current" />
                          <span className="text-sm text-m2m-text-secondary">
                            Satisfaction
                          </span>
                        </div>
                        <span className="text-sm font-bold text-m2m-text-primary">
                          4.8 ⭐
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <UsersIcon className="w-4 h-4 text-m2m-success" />
                          <span className="text-sm text-m2m-text-secondary">
                            Active Users
                          </span>
                        </div>
                        <span className="text-sm font-bold text-m2m-text-primary">
                          1,247
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="bg-m2m-bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 border border-m2m-divider">
            <div className="flex items-center justify-center w-16 h-16 bg-m2m-accent-orange/20 rounded-full mx-auto mb-4">
              <AlertCircleIcon className="w-8 h-8 text-m2m-accent-orange" />
            </div>
            <h3 className="text-xl font-bold text-m2m-text-primary text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-m2m-text-secondary text-center mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-3 border border-m2m-divider text-m2m-text-primary rounded-lg font-medium hover:bg-m2m-bg-primary transition-colors">
                No, Cancel
              </button>
              <button onClick={confirmLogout} className="flex-1 px-4 py-3 bg-gradient-to-r from-m2m-accent-orange to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Yes, Logout
              </button>
            </div>
          </motion.div>
        </div>}
      {/* Settings Modal */}
      {showSettingsModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="bg-m2m-bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-m2m-divider">
            <div className="sticky top-0 bg-m2m-bg-card border-b border-m2m-divider p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-m2m-text-primary flex items-center">
                <SettingsIcon className="w-6 h-6 mr-3 text-m2m-accent-blue" />
                Settings
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="p-2 hover:bg-m2m-bg-primary rounded-lg transition-colors">
                <XIcon className="w-5 h-5 text-m2m-text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Account Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Account Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg">
                    <div>
                      <p className="font-medium text-m2m-text-primary">
                        Email Notifications
                      </p>
                      <p className="text-sm text-m2m-text-secondary">
                        Receive order updates via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-m2m-accent-blue"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg">
                    <div>
                      <p className="font-medium text-m2m-text-primary">
                        Push Notifications
                      </p>
                      <p className="text-sm text-m2m-text-secondary">
                        Get instant updates on your device
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-m2m-accent-blue"></div>
                    </label>
                  </div>
                </div>
              </div>
              {/* Privacy Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Privacy & Security
                </h4>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-m2m-bg-primary rounded-lg text-left hover:bg-m2m-divider/50 transition-colors">
                    <p className="font-medium text-m2m-text-primary">
                      Change Password
                    </p>
                    <p className="text-sm text-m2m-text-secondary">
                      Update your account password
                    </p>
                  </button>
                  <button className="w-full p-4 bg-m2m-bg-primary rounded-lg text-left hover:bg-m2m-divider/50 transition-colors">
                    <p className="font-medium text-m2m-text-primary">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-m2m-text-secondary">
                      Add an extra layer of security
                    </p>
                  </button>
                </div>
              </div>
              {/* Display Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Display Preferences
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg">
                    <div>
                      <p className="font-medium text-m2m-text-primary">
                        Dark Mode
                      </p>
                      <p className="text-sm text-m2m-text-secondary">
                        Switch to dark theme
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-m2m-accent-blue"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>}
      {/* Help Center Modal */}
      {showHelpModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="bg-m2m-bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-m2m-divider">
            <div className="sticky top-0 bg-m2m-bg-card border-b border-m2m-divider p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-m2m-text-primary flex items-center">
                <HelpCircleIcon className="w-6 h-6 mr-3 text-m2m-accent-blue" />
                Help Center
              </h3>
              <button onClick={() => setShowHelpModal(false)} className="p-2 hover:bg-m2m-bg-primary rounded-lg transition-colors">
                <XIcon className="w-5 h-5 text-m2m-text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Common Issues */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Common Issues & Solutions
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-m2m-bg-primary rounded-lg border-l-4 border-m2m-accent-blue">
                    <div className="flex items-start">
                      <CheckCircle2Icon className="w-5 h-5 text-m2m-success mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-m2m-text-primary mb-1">
                          Cannot place order
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Solution: Ensure you have items in your cart and all
                          required fields are filled. Check your internet
                          connection and try again.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-m2m-bg-primary rounded-lg border-l-4 border-m2m-accent-blue">
                    <div className="flex items-start">
                      <CheckCircle2Icon className="w-5 h-5 text-m2m-success mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-m2m-text-primary mb-1">
                          Products not loading
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Solution: Refresh the page or clear your browser
                          cache. If the issue persists, try logging out and
                          logging back in.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-m2m-bg-primary rounded-lg border-l-4 border-m2m-accent-blue">
                    <div className="flex items-start">
                      <CheckCircle2Icon className="w-5 h-5 text-m2m-success mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-m2m-text-primary mb-1">
                          Order status not updating
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Solution: Order status updates may take a few minutes.
                          Refresh the page to see the latest status. Contact
                          support if no update after 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-m2m-bg-primary rounded-lg border-l-4 border-m2m-accent-blue">
                    <div className="flex items-start">
                      <CheckCircle2Icon className="w-5 h-5 text-m2m-success mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-m2m-text-primary mb-1">
                          Payment issues
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Solution: Verify your payment details are correct.
                          Ensure sufficient funds are available. Try a different
                          payment method if the issue continues.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-m2m-bg-primary rounded-lg border-l-4 border-m2m-accent-blue">
                    <div className="flex items-start">
                      <CheckCircle2Icon className="w-5 h-5 text-m2m-success mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-m2m-text-primary mb-1">
                          Forgot password
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Solution: Click "Forgot Password" on the login page.
                          Enter your email to receive a password reset link.
                          Check spam folder if not received.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact Support */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Contact Support
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-m2m-accent-blue/10 rounded-lg">
                    <MailIcon className="w-6 h-6 text-m2m-accent-blue mb-2" />
                    <p className="font-medium text-m2m-text-primary">Email</p>
                    <p className="text-sm text-m2m-text-secondary">
                      support@nearbuy.com
                    </p>
                  </div>
                  <div className="p-4 bg-m2m-accent-teal/10 rounded-lg">
                    <HelpCircleIcon className="w-6 h-6 text-m2m-accent-teal mb-2" />
                    <p className="font-medium text-m2m-text-primary">
                      Live Chat
                    </p>
                    <p className="text-sm text-m2m-text-secondary">
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
              {/* FAQs */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-m2m-text-primary">
                  Frequently Asked Questions
                </h4>
                <div className="space-y-2">
                  <details className="p-4 bg-m2m-bg-primary rounded-lg cursor-pointer">
                    <summary className="font-medium text-m2m-text-primary">
                      How do I track my order?
                    </summary>
                    <p className="text-sm text-m2m-text-secondary mt-2">
                      Go to the Orders tab to view all your active orders and
                      their current status. You'll receive notifications for any
                      status updates.
                    </p>
                  </details>
                  <details className="p-4 bg-m2m-bg-primary rounded-lg cursor-pointer">
                    <summary className="font-medium text-m2m-text-primary">
                      Can I cancel an order?
                    </summary>
                    <p className="text-sm text-m2m-text-secondary mt-2">
                      Orders can be cancelled within 1 hour of placement.
                      Contact support immediately if you need to cancel an
                      order.
                    </p>
                  </details>
                  <details className="p-4 bg-m2m-bg-primary rounded-lg cursor-pointer">
                    <summary className="font-medium text-m2m-text-primary">
                      What payment methods are accepted?
                    </summary>
                    <p className="text-sm text-m2m-text-secondary mt-2">
                      We accept credit/debit cards, bank transfers, and various
                      digital payment methods. All transactions are secured and
                      encrypted.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </motion.div>
        </div>}
    </div>;
}