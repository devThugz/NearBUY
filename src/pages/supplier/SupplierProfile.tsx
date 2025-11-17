import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, SaveIcon, MapIcon, ZoomInIcon, ZoomOutIcon, LayersIcon } from 'lucide-react';
export default function SupplierProfile() {
  const {
    user
  } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: '123 Business St, Manila, Philippines',
    businessName: 'NEARBUY Supply Co.',
    businessType: 'Food & Beverage'
  });
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
              Supplier Account
            </span>
          </div>
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-semibold text-gray-900">
                  Jan 2024
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="text-sm font-semibold text-gray-900">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-semibold text-green-600">
                  98.5%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input type="text" value={formData.businessName} onChange={e => setFormData({
                ...formData,
                businessName: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea value={formData.address} onChange={e => setFormData({
                  ...formData,
                  address: e.target.value
                })} rows={3} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select value={formData.businessType} onChange={e => setFormData({
                ...formData,
                businessType: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Retail & Shopping</option>
                  <option>Food and Beverage</option>
                  <option>Technological & IT</option>
                  <option>Logistics & Transport</option>
                  <option>Professional Services</option>
                  <option>Hospitality & Tourism</option>
                  <option>Construction & Real Estate</option>
                  <option>Healthcare & Medical</option>
                  <option>Educational & Training</option>
                  <option>Entertainment & Recreation</option>
                  <option>Automotive & Transport</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center">
              <SaveIcon className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </form>
          {/* Delivery Coverage Map - Mapbox Satellite Integration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <MapIcon className="w-5 h-5 mr-2 text-blue-900" />
                Delivery Routes & Coverage Map
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <LayersIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ZoomInIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ZoomOutIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            {/* Mapbox Satellite View Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
              {/* Satellite-style background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)'
              }}></div>
              </div>
              {/* Map markers */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg"></div>
              <div className="absolute top-2/3 left-2/3 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg"></div>
              {/* Map overlay info */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-blue-900" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Metro Manila
                    </p>
                    <p className="text-xs text-gray-600">
                      Primary Coverage Area
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3">
                <p className="text-xs font-semibold text-gray-900">
                  Satellite View
                </p>
                <p className="text-xs text-gray-600">Powered by Mapbox</p>
              </div>
              {/* Center overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <MapIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">
                    Mapbox Satellite Integration
                  </p>
                  <p className="text-xs">
                    Interactive delivery route visualization
                  </p>
                </div>
              </div>
            </div>
            {/* Coverage Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-900">15</p>
                <p className="text-xs text-gray-600">Delivery Zones</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">250km²</p>
                <p className="text-xs text-gray-600">Coverage Area</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-xs text-gray-600">On-Time Rate</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              📍 Delivery routes update in real-time • Zoom and pan to explore
              coverage areas
            </p>
          </div>
        </div>
      </div>
    </div>;
}