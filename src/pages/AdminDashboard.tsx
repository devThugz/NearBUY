import React from 'react';
import Navbar from '../components/Navbar';
export default function AdminDashboard() {
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
                Users Management
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage all users, suppliers and businesses in the system.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-1 text-sm text-gray-500">
                View platform analytics and performance metrics.
              </p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure platform settings and parameters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}