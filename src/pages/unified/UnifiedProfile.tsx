import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, SaveIcon } from 'lucide-react';
export default function UnifiedProfile() {
  const {
    user
  } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: '123 Business St, Manila, Philippines',
    businessName: 'Map2Market Supply Co.',
    businessType: 'Food & Beverage'
  });
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-m2m-text-primary">
          Profile Settings
        </h1>
        <p className="text-m2m-text-secondary mt-2">
          Manage your account information
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-m2m-bg-card rounded-xl shadow-lg p-6 text-center border border-m2m-divider">
            <div className="w-24 h-24 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-m2m-text-primary">
              {user?.name}
            </h2>
            <p className="text-m2m-text-secondary mb-2">{user?.email}</p>
            <span className="inline-block px-4 py-1 bg-m2m-accent-blue/20 text-m2m-accent-blue text-sm font-semibold rounded-full capitalize">
              {user?.role} Account
            </span>
          </div>
          {/* Quick Stats */}
          <div className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
            <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-m2m-text-secondary">
                  Member Since
                </span>
                <span className="text-sm font-semibold text-m2m-text-primary">
                  Jan 2024
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-m2m-text-secondary">
                  Total Orders
                </span>
                <span className="text-sm font-semibold text-m2m-text-primary">
                  127
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-m2m-text-secondary">
                  Success Rate
                </span>
                <span className="text-sm font-semibold text-m2m-success">
                  98.5%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 space-y-6 border border-m2m-divider">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input type="text" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input type="tel" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="w-full pl-10 pr-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Business Name
                </label>
                <input type="text" value={formData.businessName} onChange={e => setFormData({
                ...formData,
                businessName: e.target.value
              })} className="w-full px-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Business Address
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-m2m-text-secondary" />
                  <textarea value={formData.address} onChange={e => setFormData({
                  ...formData,
                  address: e.target.value
                })} rows={3} className="w-full pl-10 pr-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Business Type
                </label>
                <select value={formData.businessType} onChange={e => setFormData({
                ...formData,
                businessType: e.target.value
              })} className="w-full px-4 py-2 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-m2m-accent-blue">
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
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center">
              <SaveIcon className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>;
}