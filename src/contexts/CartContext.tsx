import React, { useState, createContext, useContext } from 'react';
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  supplierId: string;
}
interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingItem = items.find(i => i.productId === item.productId);
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
    } else {
      setItems([...items, {
        ...item,
        id: `cart-${Date.now()}`
      }]);
    }
  };
  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setItems(items.map(item => item.id === id ? {
        ...item,
        quantity
      } : item));
    }
  };
  const clearCart = () => {
    setItems([]);
  };
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <CartContext.Provider value={{
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  }}>
      {children}
    </CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}