import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import UnifiedLayout from './components/layouts/UnifiedLayout';
import UnifiedDashboard from './pages/unified/UnifiedDashboard';
import UnifiedAlerts from './pages/unified/UnifiedAlerts';
import UnifiedDocuments from './pages/unified/UnifiedDocuments';
import UnifiedAnalytics from './pages/unified/UnifiedAnalytics';
import UnifiedProducts from './pages/unified/UnifiedProducts';
import UnifiedCart from './pages/unified/UnifiedCart';
import UnifiedOrders from './pages/unified/UnifiedOrders';
import UnifiedOrderHistory from './pages/unified/UnifiedOrderHistory';
import UnifiedProfile from './pages/unified/UnifiedProfile';
import UnifiedMapView from './pages/unified/UnifiedMapView';
import UnifiedAISupport from './pages/unified/UnifiedAISupport';
import AdminDashboard from './pages/admin/AdminDashboard';
import ThemeToggle from './components/ThemeToggle';
import { toast } from 'sonner';
import { LogOutIcon } from 'lucide-react';
function ProtectedRoute({
  children,
  allowedRoles
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const {
    user
  } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
function RootRedirect() {
  const {
    user
  } = useAuth();
  if (!user) {
    return <LandingPage />;
  }
  // Redirect both suppliers and business users to unified dashboard
  if (user.role === 'supplier' || user.role === 'business') {
    return <Navigate to="/dashboard" />;
  }
  // Admin goes to admin dashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }
  return <Navigate to="/dashboard" />;
}
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Unified Dashboard Routes for Supplier & Business Users */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['supplier', 'business']}>
              <UnifiedLayout />
            </ProtectedRoute>}>
          <Route index element={<UnifiedDashboard />} />
          <Route path="alerts" element={<UnifiedAlerts />} />
          <Route path="documents" element={<UnifiedDocuments />} />
          <Route path="analytics" element={<UnifiedAnalytics />} />
          <Route path="products" element={<UnifiedProducts />} />
          <Route path="cart" element={<UnifiedCart />} />
          <Route path="orders" element={<UnifiedOrders />} />
          <Route path="history" element={<UnifiedOrderHistory />} />
          <Route path="profile" element={<UnifiedProfile />} />
          <Route path="map" element={<UnifiedMapView />} />
          <Route path="support" element={<UnifiedAISupport />} />
        </Route>

        {/* Admin Dashboard Route */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>;
}