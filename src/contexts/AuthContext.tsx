import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supplier' | 'business';
  password: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Demo users with specified credentials
const DEMO_USERS: User[] = [{
  id: '1',
  name: 'Admin User',
  email: 'admin@lantaw.ai',
  password: '12345',
  role: 'admin'
}, {
  id: '2',
  name: 'Supplier Demo',
  email: 'reyjhon@gmail.com',
  password: '12345',
  role: 'supplier'
}, {
  id: '3',
  name: 'Business User',
  email: 'villarias@gmail.com',
  password: '12345',
  role: 'business'
}];
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('users', JSON.stringify(DEMO_USERS));
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithoutPassword = {
        ...foundUser
      };
      delete (userWithoutPassword as any).password;
      setUser(userWithoutPassword as User);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };
  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    // Create new user
    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Auto login after registration
    const userWithoutPassword = {
      ...newUser
    };
    delete (userWithoutPassword as any).password;
    setUser(userWithoutPassword as User);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}