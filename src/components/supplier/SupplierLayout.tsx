import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, ClockIcon, UserIcon, LogOutIcon, MenuIcon, XIcon, BellIcon } from 'lucide-react';
export default function SupplierLayout() {
  const {
    user,
    logout
  } = useAuth();
  const {
    items
  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };
  const navItems = [{
    path: '/supplier/dashboard',
    icon: LayoutDashboardIcon,
    label: 'Dashboard'
  }, {
    path: '/supplier/products',
    icon: PackageIcon,
    label: 'Products'
  }, {
    path: '/supplier/cart',
    icon: ShoppingCartIcon,
    label: 'Cart',
    badge: items.length
  }, {
    path: '/supplier/orders',
    icon: ClockIcon,
    label: 'Order History'
  }, {
    path: '/supplier/profile',
    icon: UserIcon,
    label: 'Profile'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {sidebarOpen ? <XIcon className="w-6 h-6 text-gray-700" /> : <MenuIcon className="w-6 h-6 text-gray-700" />}
            </button>
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden">
                <img src="/NearBuy_Logo.png" alt="NEARBUY Logo" className="w-full h-full object-contain" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-success bg-clip-text text-transparent">
                  NEARBUY
                </h1>
                <p className="text-xs text-gray-600">Supplier Portal</p>
              </div>
            </div>
            {/* User Info & Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <BellIcon className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-600">Supplier</p>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-700 hover:text-red-600" title="Logout">
                <LogOutIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out overflow-y-auto`}>
          <nav className="p-4 space-y-2">
            {navItems.map(item => <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive(item.path) ? 'bg-gradient-to-r from-blue-900 to-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}>
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>}
              </Link>)}
            <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-red-50 hover:text-red-600 mt-4">
              <LogOutIcon className="w-5 h-5 mr-3" />
              <span className="font-medium">Log Out</span>
            </button>
          </nav>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>;
}