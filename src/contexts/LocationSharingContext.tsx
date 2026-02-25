import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext } from
'react';
import { useAuth } from './AuthContext';
interface UserLocation {
  userId: string;
  userName: string;
  userType: 'business' | 'supplier';
  lat: number;
  lng: number;
  lastUpdated: Date;
  isActive: boolean;
  businessType?: string;
  category?: string;
  rating: number;
}
interface LocationSharingContextType {
  userLocations: UserLocation[];
  updateUserLocation: (lat: number, lng: number) => void;
  isLocationSharing: boolean;
  toggleLocationSharing: () => void;
}
const LocationSharingContext = createContext<
  LocationSharingContextType | undefined>(
  undefined);
export function LocationSharingProvider({
  children


}: {children: React.ReactNode;}) {
  const { user } = useAuth();
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);
  const [isLocationSharing, setIsLocationSharing] = useState(true);
  // Simulate real-time location updates from users
  useEffect(() => {
    // Mock initial user locations (in production, this would come from a real-time database)
    const mockUsers: UserLocation[] = [
    {
      userId: 'user-1',
      userName: 'Green Valley Farms',
      userType: 'business',
      lat: 8.9475,
      lng: 125.5406,
      lastUpdated: new Date(),
      isActive: true,
      businessType: 'Agriculture',
      rating: 4.8
    },
    {
      userId: 'user-2',
      userName: 'Metro Construction Co.',
      userType: 'business',
      lat: 8.955,
      lng: 125.545,
      lastUpdated: new Date(),
      isActive: true,
      businessType: 'Construction',
      rating: 4.9
    },
    {
      userId: 'user-3',
      userName: 'TechHub Solutions',
      userType: 'business',
      lat: 8.94,
      lng: 125.535,
      lastUpdated: new Date(),
      isActive: true,
      businessType: 'Technology',
      rating: 4.7
    },
    {
      userId: 'supplier-1',
      userName: 'Fresh Produce Suppliers',
      userType: 'supplier',
      lat: 8.96,
      lng: 125.52,
      lastUpdated: new Date(),
      isActive: true,
      category: 'Food & Beverage',
      rating: 4.9
    },
    {
      userId: 'supplier-2',
      userName: 'BuildMart Hardware',
      userType: 'supplier',
      lat: 8.93,
      lng: 125.53,
      lastUpdated: new Date(),
      isActive: true,
      category: 'Construction Materials',
      rating: 4.8
    },
    {
      userId: 'supplier-3',
      userName: 'Office Essentials Inc.',
      userType: 'supplier',
      lat: 8.97,
      lng: 125.54,
      lastUpdated: new Date(),
      isActive: true,
      category: 'Office Supplies',
      rating: 4.7
    }];

    setUserLocations(mockUsers);
    // Simulate real-time location updates (in production, use WebSocket or Firebase)
    const interval = setInterval(() => {
      setUserLocations((prev) =>
      prev.map((loc) => ({
        ...loc,
        // Simulate small location changes (realistic movement)
        lat: loc.lat + (Math.random() - 0.5) * 0.001,
        lng: loc.lng + (Math.random() - 0.5) * 0.001,
        lastUpdated: new Date()
      }))
      );
    }, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);
  // Update current user's location
  const updateUserLocation = useCallback(
    (lat: number, lng: number) => {
      if (!user || !isLocationSharing) return;
      setUserLocations((prev) => {
        const existingIndex = prev.findIndex((loc) => loc.userId === user.id);
        const newLocation: UserLocation = {
          userId: user.id,
          userName: user.name,
          userType: user.role === 'supplier' ? 'supplier' : 'business',
          lat,
          lng,
          lastUpdated: new Date(),
          isActive: true,
          businessType:
          user.role === 'business' ? 'General Business' : undefined,
          category: user.role === 'supplier' ? 'General Supplier' : undefined,
          rating: 4.5
        };
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newLocation;
          return updated;
        } else {
          return [...prev, newLocation];
        }
      });
    },
    [user, isLocationSharing]
  );
  const toggleLocationSharing = useCallback(() => {
    setIsLocationSharing((prev) => !prev);
  }, []);
  return (
    <LocationSharingContext.Provider
      value={{
        userLocations,
        updateUserLocation,
        isLocationSharing,
        toggleLocationSharing
      }}>

      {children}
    </LocationSharingContext.Provider>);

}
export function useLocationSharing() {
  const context = useContext(LocationSharingContext);
  if (!context) {
    throw new Error(
      'useLocationSharing must be used within LocationSharingProvider'
    );
  }
  return context;
}