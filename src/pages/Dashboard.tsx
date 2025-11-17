import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import AdminDashboard from './AdminDashboard';
import SupplierDashboard from './SupplierDashboard';
import BusinessDashboard from './BusinessDashboard';
export default function Dashboard() {
  const {
    user
  } = useAuth();
  // Remove navbar from child components and render based on role
  if (user?.role === 'admin') {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  User Management
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage users and their permissions.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  System Analytics
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  View system-wide analytics and reports.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure system settings and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  if (user?.role === 'supplier') {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Supplier Dashboard
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Management
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your product listings and inventory.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage incoming orders.
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Track your sales and performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  // Business user dashboard
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business Dashboard
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Order History
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View your past orders and their status.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Suppliers</h3>
              <p className="mt-1 text-sm text-gray-500">
                Browse available suppliers and their products.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-1 text-sm text-gray-500">
                View your purchasing analytics and spending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}