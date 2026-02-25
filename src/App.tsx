import React from 'react';
import { AppRouter } from './AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SupplierOrderProvider } from './contexts/SupplierOrderContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LocationSharingProvider } from './contexts/LocationSharingContext';
import { Toaster } from 'sonner';
export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocationSharingProvider>
          <NotificationProvider>
            <CartProvider>
              <SupplierOrderProvider>
                <div className="w-full min-h-screen bg-m2m-bg-primary">
                  <AppRouter />
                  <Toaster position="top-right" />
                </div>
              </SupplierOrderProvider>
            </CartProvider>
          </NotificationProvider>
        </LocationSharingProvider>
      </AuthProvider>
    </ThemeProvider>);

}