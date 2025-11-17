import React, { useCallback, useEffect, useState, Component } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { MapIcon, TruckIcon, StarIcon, PhoneIcon, SparklesIcon, TargetIcon, UsersIcon, PackageIcon, ShoppingCartIcon, TrendingUpIcon, MapPinIcon, NavigationIcon, XIcon, EyeIcon, CheckCircle2Icon, BoxIcon, LayersIcon, ToggleLeftIcon, ToggleRightIcon, SatelliteIcon, MapIcon as MapViewIcon, TextIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Rectangle, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLng } from 'leaflet';
import { toast } from 'sonner';
// Product categories for randomization
const productCategories = ['Retail & Shopping Supplies', 'Office Equipment', 'Food and Beverage Supplies', 'Technology Hardware', 'Construction Materials', 'Logistics and Delivery', 'Maintenance and Repair', 'Hospitality Supplies', 'Healthcare Supplies', 'Educational Supplies', 'Entertainment Supplies', 'Automotive Supplies'];
// Uniform services for all suppliers
const uniformServices = ['Distribution Services', 'Logistics Management', 'Cross-Docking', 'Warehousing', 'Inventory Management', 'Last-Mile Delivery', 'Supply Chain Consulting', 'Quality Control'];
// Generate random categories for a supplier (8-12 items)
const getRandomCategories = () => {
  const count = Math.floor(Math.random() * 5) + 8; // 8-12
  const shuffled = [...productCategories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
interface Supplier {
  id: number;
  name: string;
  type: string;
  rating: number;
  distance: string;
  position: [number, number];
  products: string[];
  services: string[];
}
// Expanded supplier name pools for 5 suppliers
const supplierNames = ['Fresh Produce Co.', 'Office Supplies Plus', 'Tech Solutions Inc.', 'BuildMart Hardware', 'Metro Fresh Foods', 'Prime Logistics Hub', 'Quality Equipment Store', 'Urban Supply Center', 'Elite Trading Co.', 'Smart Business Solutions', 'Global Distribution Network', 'Premium Wholesale Mart', 'NextGen Supplies', 'Rapid Delivery Services', 'ProTech Distributors'];
const supplierTypes = ['Food & Beverage', 'Business Supplies', 'Technology', 'Construction', 'Retail', 'Logistics'];
// Custom marker icons
const createCustomIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <path fill="${color}" stroke="white" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
const aiRecommendedIcon = createCustomIcon('#1E90FF');
const businessIcon = createCustomIcon('#00B3A4');
const pinnedLocationIcon = createCustomIcon('#FF6B6B');
const userLocationIcon = createCustomIcon('#10B981');
// Component to handle map clicks
function MapClickHandler({
  onLocationPin
}: {
  onLocationPin: (latlng: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationPin(e.latlng);
    }
  });
  return null;
}
export default function BusinessDashboard() {
  const [activeMapView, setActiveMapView] = useState('suppliers');
  const [mapLayerMode, setMapLayerMode] = useState<'street' | 'satellite' | 'livetext'>('street');
  const [pinnedLocation, setPinnedLocation] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [usedSupplierNames, setUsedSupplierNames] = useState<Set<string>>(new Set());
  // Map filter toggles
  const [showZoneInfo, setShowZoneInfo] = useState(true);
  const [showNearbyOperators, setShowNearbyOperators] = useState(true);
  const [showAIRecommender, setShowAIRecommender] = useState(true);
  // Butuan City center coordinates
  const centerPosition: [number, number] = [8.9475, 125.5406];
  // Request location permission on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(location);
        setPinnedLocation(location);
        toast.success('Location detected successfully!');
      }, error => {
        setLocationPermissionDenied(true);
        toast.error('Location access denied — enable location to view nearby suppliers');
      });
    } else {
      setLocationPermissionDenied(true);
      toast.error('Geolocation is not supported by your browser');
    }
  }, []);
  // Generate unique suppliers based on location - NOW GENERATES 5 SUPPLIERS
  const generateSuppliersForLocation = useCallback((location: [number, number]) => {
    const availableNames = supplierNames.filter(name => !usedSupplierNames.has(name));
    if (availableNames.length < 5) {
      // Reset if we've used too many names
      setUsedSupplierNames(new Set());
      return generateSuppliersForLocation(location);
    }
    const newSuppliers: Supplier[] = [];
    const count = Math.min(5, availableNames.length); // Changed from 3 to 5
    for (let i = 0; i < count; i++) {
      const nameIndex = Math.floor(Math.random() * availableNames.length);
      const name = availableNames[nameIndex];
      availableNames.splice(nameIndex, 1);
      // Generate position near the pinned location
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;
      newSuppliers.push({
        id: Date.now() + i,
        name,
        type: supplierTypes[Math.floor(Math.random() * supplierTypes.length)],
        rating: +(Math.random() * 0.5 + 4.5).toFixed(1),
        distance: `${(Math.random() * 2 + 0.5).toFixed(1)} km`,
        position: [location[0] + latOffset, location[1] + lngOffset],
        products: getRandomCategories(),
        services: uniformServices
      });
      setUsedSupplierNames(prev => new Set([...prev, name]));
    }
    return newSuppliers;
  }, [usedSupplierNames]);
  const [nearbySuppliers, setNearbySuppliers] = useState<Supplier[]>(() => generateSuppliersForLocation(centerPosition));
  // Update suppliers when user location is detected
  useEffect(() => {
    if (userLocation) {
      const newSuppliers = generateSuppliersForLocation(userLocation);
      setNearbySuppliers(newSuppliers);
    }
  }, [userLocation]);
  // Zone boundaries
  const zones = [{
    bounds: [[8.96, 125.52], [8.98, 125.56]] as [[number, number], [number, number]],
    color: '#1E90FF',
    label: 'Commercial District',
    aiScore: 92
  }, {
    bounds: [[8.93, 125.53], [8.95, 125.57]] as [[number, number], [number, number]],
    color: '#36C275',
    label: 'Residential Area',
    aiScore: 0
  }];
  const handleLocationPin = (latlng: LatLng) => {
    const newLocation: [number, number] = [latlng.lat, latlng.lng];
    setPinnedLocation(newLocation);
    // Generate new unique suppliers
    const newSuppliers = generateSuppliersForLocation(newLocation);
    setNearbySuppliers(newSuppliers);
    toast.success('Location pinned! Discovering nearby suppliers...');
  };
  const handleTrackLocation = () => {
    setIsTracking(true);
    toast.success('Tracking your location...');
    // Simulate getting user location
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setPinnedLocation(location);
          const newSuppliers = generateSuppliersForLocation(location);
          setNearbySuppliers(newSuppliers);
          setIsTracking(false);
          setLocationPermissionDenied(false);
          toast.success('Location tracked successfully!');
        }, () => {
          // Fallback to center if geolocation fails
          setPinnedLocation(centerPosition);
          const newSuppliers = generateSuppliersForLocation(centerPosition);
          setNearbySuppliers(newSuppliers);
          setIsTracking(false);
          toast.info('Using default location');
        });
      } else {
        setPinnedLocation(centerPosition);
        const newSuppliers = generateSuppliersForLocation(centerPosition);
        setNearbySuppliers(newSuppliers);
        setIsTracking(false);
        toast.info('Using default location');
      }
    }, 1000);
  };
  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };
  const handleContactSupplier = (supplier: Supplier) => {
    toast.success(`Opening chat with ${supplier.name}...`);
  };
  const handleViewProductsInShop = (supplier: Supplier) => {
    setSelectedSupplier(null);
    toast.success(`Redirecting to shop with ${supplier.name}'s product categories...`);
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Business Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your business operations and discover nearby suppliers
          </p>
          {locationPermissionDenied && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Location access denied — enable location to view nearby
                suppliers
              </p>
            </motion.div>}
        </motion.div>
        {/* Interactive Map & Scrollable Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Fixed Map Container - Left Side */}
          <div className="lg:col-span-2 relative">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden" style={{
            maxWidth: '100%',
            zIndex: 1
          }}>
              <div className="flex flex-col h-[600px]">
                {/* Map Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                        <MapIcon className="w-6 h-6 mr-2 text-blue-600" />
                        Location Insights Map
                      </h2>
                      <p className="text-sm text-gray-600">
                        {pinnedLocation ? 'Showing suppliers near your location' : 'Click anywhere on the map to discover nearby suppliers'}
                      </p>
                    </div>
                    <motion.div animate={{
                    opacity: [1, 0.5, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                      LIVE
                    </motion.div>
                  </div>
                </div>
                {/* Map Filters & Controls */}
                <div className="px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
                  <div className="flex flex-col gap-4">
                    {/* View Toggles */}
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => setActiveMapView('zone')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'zone' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        Zones
                      </button>
                      <button onClick={() => setActiveMapView('suppliers')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'suppliers' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        Suppliers
                      </button>
                      <button onClick={() => setActiveMapView('ai')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'ai' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        AI Insights
                      </button>
                      <div className="ml-auto">
                        <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} animate={isTracking ? {
                        rotate: [0, 360]
                      } : {}} transition={isTracking ? {
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      } : {}} onClick={handleTrackLocation} disabled={isTracking} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50">
                          <NavigationIcon className="w-4 h-4" />
                          {isTracking ? 'Tracking...' : 'Track Location'}
                        </motion.button>
                      </div>
                    </div>
                    {/* Map Layer Mode Toggles */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-200">
                      <button onClick={() => setMapLayerMode('street')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${mapLayerMode === 'street' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <MapViewIcon className="w-4 h-4" />
                        Street Map
                      </button>
                      <button onClick={() => setMapLayerMode('satellite')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${mapLayerMode === 'satellite' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <SatelliteIcon className="w-4 h-4" />
                        Satellite View
                      </button>
                      <button onClick={() => setMapLayerMode('livetext')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${mapLayerMode === 'livetext' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <TextIcon className="w-4 h-4" />
                        Live Text Mode
                      </button>
                    </div>
                    {/* Filter Toggles */}
                    <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-200">
                      <button onClick={() => setShowZoneInfo(!showZoneInfo)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                        {showZoneInfo ? <ToggleRightIcon className="w-5 h-5 text-blue-600" /> : <ToggleLeftIcon className="w-5 h-5 text-gray-400" />}
                        <span className={`text-sm font-medium ${showZoneInfo ? 'text-gray-900' : 'text-gray-500'}`}>
                          Zone Information
                        </span>
                      </button>
                      <button onClick={() => {
                      setShowNearbyOperators(!showNearbyOperators);
                      toast.success(showNearbyOperators ? 'Nearby Operators hidden' : 'Nearby Operators shown');
                    }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                        {showNearbyOperators ? <ToggleRightIcon className="w-5 h-5 text-green-600" /> : <ToggleLeftIcon className="w-5 h-5 text-gray-400" />}
                        <span className={`text-sm font-medium ${showNearbyOperators ? 'text-gray-900' : 'text-gray-500'}`}>
                          Nearby Operators
                        </span>
                      </button>
                      <button onClick={() => setShowAIRecommender(!showAIRecommender)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                        {showAIRecommender ? <ToggleRightIcon className="w-5 h-5 text-purple-600" /> : <ToggleLeftIcon className="w-5 h-5 text-gray-400" />}
                        <span className={`text-sm font-medium ${showAIRecommender ? 'text-gray-900' : 'text-gray-500'}`}>
                          AI Recommender
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Map Container - Fixed Height with Overflow Hidden */}
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <MapContainer center={pinnedLocation || centerPosition} zoom={13} scrollWheelZoom={true} style={{
                    height: '100%',
                    width: '100%'
                  }} zoomControl={false}>
                      {/* Dynamic Layer Based on Mode */}
                      {mapLayerMode === 'street' && <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />}
                      {mapLayerMode === 'satellite' && <TileLayer attribution='&copy; <a href="https://www.esri.com/">Esri</a>' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" maxZoom={18} />}
                      {mapLayerMode === 'livetext' && <>
                          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} opacity={0.6} />
                        </>}
                      <ZoomControl position="bottomright" />
                      <MapClickHandler onLocationPin={handleLocationPin} />
                      {/* User's Current Location Marker */}
                      {userLocation && <Marker position={userLocation} icon={userLocationIcon}>
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-bold text-gray-900">
                                Your Location
                              </h3>
                              <p className="text-xs text-gray-600 mt-1">
                                Current position detected
                              </p>
                            </div>
                          </Popup>
                        </Marker>}
                      {/* Pinned Location Marker */}
                      {pinnedLocation && pinnedLocation !== userLocation && <Marker position={pinnedLocation} icon={pinnedLocationIcon}>
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-bold text-gray-900">
                                Pinned Location
                              </h3>
                              <p className="text-xs text-gray-600 mt-1">
                                Discovering nearby suppliers...
                              </p>
                            </div>
                          </Popup>
                        </Marker>}
                      {/* Zone Rectangles with Live Text Labels */}
                      {showZoneInfo && activeMapView === 'zone' && zones.map((zone, index) => <Rectangle key={index} bounds={zone.bounds} pathOptions={{
                      color: zone.color,
                      fillColor: zone.color,
                      fillOpacity: mapLayerMode === 'livetext' ? 0.4 : 0.2,
                      weight: mapLayerMode === 'livetext' ? 3 : 2
                    }}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900">
                                  {zone.label}
                                </h3>
                                {mapLayerMode === 'livetext' && <div className="mt-2 space-y-1">
                                    <p className="text-xs text-gray-600">
                                      <strong>Population:</strong> 45,000+
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      <strong>Businesses:</strong> 1,200+
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      <strong>Growth:</strong> +15% YoY
                                    </p>
                                  </div>}
                                <p className="text-xs text-gray-600 mt-1">
                                  Click for more details
                                </p>
                              </div>
                            </Popup>
                          </Rectangle>)}
                      {/* AI Recommended Locations */}
                      {showAIRecommender && activeMapView === 'ai' && <Marker position={[8.97, 125.54]} icon={aiRecommendedIcon}>
                          <Popup>
                            <div className="p-2">
                              <div className="flex items-center space-x-2 mb-2">
                                <SparklesIcon className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-gray-900">
                                  Recommended Area
                                </h3>
                              </div>
                              <p className="text-sm font-semibold text-blue-600">
                                92% Match Score
                              </p>
                            </div>
                          </Popup>
                        </Marker>}
                      {/* Supplier Locations */}
                      {showNearbyOperators && activeMapView === 'suppliers' && nearbySuppliers.map(supplier => <Marker key={supplier.id} position={supplier.position} icon={businessIcon}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900 mb-1">
                                  {supplier.name}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">
                                  {supplier.type}
                                </p>
                                <div className="flex items-center">
                                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs">
                                    {supplier.rating} · {supplier.distance}
                                  </span>
                                </div>
                              </div>
                            </Popup>
                          </Marker>)}
                    </MapContainer>
                  </div>
                </div>
                {/* Map Footer Stats */}
                <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">
                        {showNearbyOperators ? nearbySuppliers.length : 0}
                      </p>
                      <p className="text-xs text-gray-600">Suppliers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">5km</p>
                      <p className="text-xs text-gray-600">Radius</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">95%</p>
                      <p className="text-xs text-gray-600">Match</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">12</p>
                      <p className="text-xs text-gray-600">Categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Scrollable Content - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nearby Suppliers - Controlled by showNearbyOperators toggle with smooth animation */}
            <AnimatePresence mode="wait">
              {showNearbyOperators && <motion.div key="nearby-suppliers" initial={{
              opacity: 0,
              height: 0,
              y: -20
            }} animate={{
              opacity: 1,
              height: 'auto',
              y: 0
            }} exit={{
              opacity: 0,
              height: 0,
              y: -20
            }} transition={{
              duration: 0.4,
              ease: 'easeInOut'
            }} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 overflow-hidden">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Suggested Suppliers
                  </h2>
                  <AnimatePresence mode="wait">
                    <motion.div key={nearbySuppliers.map(s => s.id).join('-')} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -20
                }} transition={{
                  duration: 0.3
                }} className="space-y-3">
                      {nearbySuppliers.map((supplier, index) => <motion.div key={supplier.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: index * 0.1
                  }} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {supplier.name}
                            </h3>
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-sm font-medium">
                                {supplier.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {supplier.type}
                          </p>
                          <p className="text-xs text-gray-500 mb-3 flex items-center">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            {supplier.distance} away
                          </p>
                          <div className="flex gap-2">
                            <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} onClick={() => handleViewSupplier(supplier)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center justify-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              View
                            </motion.button>
                            <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} onClick={() => handleContactSupplier(supplier)} className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center">
                              <PhoneIcon className="w-4 h-4 mr-1" />
                              Contact
                            </motion.button>
                          </div>
                        </motion.div>)}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>}
            </AnimatePresence>
            {/* Quick Stats */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-sm font-bold text-gray-900">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Recommended Suppliers
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {showNearbyOperators ? nearbySuppliers.length : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Area Potential</span>
                  <span className="text-sm font-bold text-green-600">High</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Scrollable Dashboard Cards Below Map */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <PackageIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order History
              </h3>
              <p className="text-sm text-gray-500">
                View your past orders and their status.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ShoppingCartIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Suppliers
              </h3>
              <p className="text-sm text-gray-500">
                Browse available suppliers and their products.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUpIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Analytics
              </h3>
              <p className="text-sm text-gray-500">
                View your purchasing analytics and spending.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Supplier Modal - remains unchanged */}
      <AnimatePresence>
        {selectedSupplier && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setSelectedSupplier(null)} />
            {/* Modal */}
            <motion.div initial={{
          opacity: 0,
          y: 50,
          scale: 0.9
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: 50,
          scale: 0.9
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 p-6 border-b border-gray-200 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedSupplier.name}
                      </h2>
                      <p className="text-white/80 text-sm mt-1">
                        {selectedSupplier.type}
                      </p>
                      <div className="flex items-center mt-2">
                        <StarIcon className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
                        <span className="text-white text-sm font-medium">
                          {selectedSupplier.rating} ·{' '}
                          {selectedSupplier.distance}
                        </span>
                      </div>
                    </div>
                    <motion.button whileHover={{
                  rotate: 90,
                  scale: 1.1
                }} transition={{
                  duration: 0.2
                }} onClick={() => setSelectedSupplier(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <XIcon className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                {/* Modal Content */}
                <div className="p-6 space-y-8">
                  {/* Products Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <BoxIcon className="w-6 h-6 mr-2 text-blue-600" />
                        Available Products
                      </h3>
                      <span className="text-sm text-gray-600">
                        {selectedSupplier.products.length} categories
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {selectedSupplier.products.map((product, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    scale: 0.9
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} transition={{
                    delay: 0.1 + index * 0.03
                  }} whileHover={{
                    scale: 1.03,
                    y: -2
                  }} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-300 ease-in-out">
                          <div className="flex items-start space-x-2">
                            <CheckCircle2Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-gray-900 leading-tight">
                              {product}
                            </span>
                          </div>
                        </motion.div>)}
                    </div>
                  </motion.div>
                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>
                  {/* Services Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <TruckIcon className="w-6 h-6 mr-2 text-green-600" />
                        Services Offered
                      </h3>
                      <span className="text-sm text-gray-600">
                        {selectedSupplier.services.length} services
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {selectedSupplier.services.map((service, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    scale: 0.9
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} transition={{
                    delay: 0.2 + index * 0.03
                  }} whileHover={{
                    scale: 1.03,
                    y: -2
                  }} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-md transition-all duration-300 ease-in-out">
                          <span className="text-sm font-medium text-gray-900">
                            {service}
                          </span>
                        </motion.div>)}
                    </div>
                  </motion.div>
                  {/* Action Buttons */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => handleViewProductsInShop(selectedSupplier)} className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
                      <PackageIcon className="w-5 h-5" />
                      <span>View Products in Shop</span>
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => {
                  handleContactSupplier(selectedSupplier);
                  setSelectedSupplier(null);
                }} className="sm:w-auto px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
                      <PhoneIcon className="w-5 h-5" />
                      <span>Contact Supplier</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}