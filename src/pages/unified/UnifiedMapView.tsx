import React, { useEffect, useMemo, useState, useRef, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl, Rectangle, useMapEvents, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapIcon, MapPinIcon, MaximizeIcon, SearchIcon, TrendingUpIcon, ChevronDownIcon, BuildingIcon, HomeIcon, GraduationCapIcon, HeartPulseIcon, TreesIcon, FactoryIcon, AlertTriangleIcon, LayersIcon, SparklesIcon, UsersIcon, TruckIcon, PhoneIcon, StarIcon, CheckCircleIcon, XCircleIcon, TargetIcon, DollarSignIcon, BriefcaseIcon, ShoppingBagIcon, ClockIcon, Loader2Icon, NavigationIcon, EyeIcon, XIcon, MailIcon, MessageSquareIcon, RocketIcon, BriefcaseIcon as ManageIcon, ArrowRightIcon, TrendingDownIcon, PackageIcon, StoreIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import BusinessRegistrationPanel from '../../components/BusinessRegistrationPanel';
// Fix for default marker icon issue in react-leaflet
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
const selectedLocationIcon = createCustomIcon('#F89C36');
const userLocationIcon = createCustomIcon('#10B981');
// Expanded pool of unique supplier names
const allSupplierNames = ['FastShip Logistics', 'Metro Transport Hub', 'Express Cargo Solutions', 'Prime Distribution Network', 'Swift Delivery Services', 'Global Freight Solutions', 'Urban Logistics Pro', 'Rapid Transit Systems', 'Elite Supply Chain', 'Quantum Logistics Hub', 'Nexus Transport Co.', 'Velocity Freight Services', 'Horizon Distribution', 'Apex Cargo Solutions', 'Summit Logistics Network', 'Pinnacle Transport Group', 'Vanguard Supply Chain', 'Meridian Freight Co.', 'Zenith Distribution Hub', 'Optimum Logistics Solutions', 'Premier Cargo Services', 'Dynamic Transport Network', 'Streamline Logistics Pro', 'Integrated Supply Solutions', 'Continental Freight Systems'];
// DEFAULT FALLBACK LOCATION: Tandag City coordinates
const TANDAG_CITY_CENTER: [number, number] = [9.0782, 126.1967];
const supplierTypes = ['Freight & Delivery', 'Distribution Services', 'Logistics & Supply Chain', 'Warehousing Solutions', 'Last-Mile Delivery', 'Express Shipping', 'Cold Chain Logistics', 'Cross-Border Transport'];
// ENHANCED: Business hours generator for realistic operating times
const generateBusinessHours = () => {
  const openingHours = ['6:00 AM', '7:00 AM', '7:30 AM', '8:00 AM', '9:00 AM'];
  const closingHours = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
  const opening = openingHours[Math.floor(Math.random() * openingHours.length)];
  const closing = closingHours[Math.floor(Math.random() * closingHours.length)];
  return `${opening} – ${closing}`;
};
interface ZoneClassification {
  name: string;
  color: string;
  icon: React.ElementType;
  description: string;
}
interface LogisticsPartner {
  name: string;
  distance: string;
  rating: number;
  type: string;
}
interface LocationInsights {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  zoneDetails: {
    zoneType: string;
    classification: string;
    hazardLevel: string;
  };
  regulations: string;
  requiredPermits: string[];
  nearbyBusinesses: {
    name: string;
    category: string;
    rating: number;
    distance: string;
  }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  demographics: {
    totalPopulation: string;
    populationDensity: string;
    growthRate: string;
    ageDistribution: {
      label: string;
      percentage: number;
    }[];
    economicProfile: {
      avgIncome: string;
      employmentRate: string;
      businessGrowth: string;
    };
    consumerBehavior: {
      spendingPatterns: string;
      peakHours: string;
    };
  };
}
interface SupplierDetails {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  description: string;
  products: string[];
  contact: {
    email: string;
    phone: string;
  };
  address: string;
  businessHours: string;
  openCloseTime: string;
  servicesOffered: string[];
}
// Map click handler component
function MapClickHandler({
  onMapClick
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: e => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}
// Location tracker component
function LocationTracker({
  onLocationUpdate
}: {
  onLocationUpdate: (lat: number, lng: number) => void;
}) {
  const map = useMap();
  useEffect(() => {
    map.locate({
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000 // Faster timeout
    });
    map.on('locationfound', e => {
      onLocationUpdate(e.latlng.lat, e.latlng.lng);
      // ENHANCED: Smooth, instant fly to location without lag
      map.flyTo(e.latlng, 15, {
        duration: 0.5,
        easeLinearity: 0.1 // Smoother easing
      });
    });
    return () => {
      map.stopLocate();
    };
  }, [map, onLocationUpdate]);
  return null;
}
// Smooth zoom component
function SmoothZoom() {
  const map = useMap();
  useEffect(() => {
    map.options.zoomAnimation = true;
    map.options.fadeAnimation = true;
    map.options.markerZoomAnimation = true;
  }, [map]);
  return null;
}
// Auto-center map component
function AutoCenterMap({
  center
}: {
  center: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center, map]);
  return null;
}
export default function UnifiedMapView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showZoneInfo, setShowZoneInfo] = useState(true);
  const [showNearbyOperators, setShowNearbyOperators] = useState(true);
  const [showAIRecommender, setShowAIRecommender] = useState(true);
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationInsights, setLocationInsights] = useState<LocationInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDetails | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSupplier, setContactSupplier] = useState<SupplierDetails | null>(null);
  const [usedSupplierNames, setUsedSupplierNames] = useState<Set<string>>(new Set());
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [baseLocation, setBaseLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationPinAnimation, setLocationPinAnimation] = useState(false);
  const [markerPulseAnimation, setMarkerPulseAnimation] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [showBusinessRegistrationPanel, setShowBusinessRegistrationPanel] = useState(false);
  const zoneClassifications: ZoneClassification[] = [{
    name: 'Commercial',
    color: '#1E90FF',
    icon: BuildingIcon,
    description: 'Business & Commerce'
  }, {
    name: 'Residential',
    color: '#36C275',
    icon: HomeIcon,
    description: 'Housing & Living'
  }, {
    name: 'Mixed-Use',
    color: '#F89C36',
    icon: LayersIcon,
    description: 'Combined Development'
  }, {
    name: 'Educational',
    color: '#00B3A4',
    icon: GraduationCapIcon,
    description: 'Schools & Universities'
  }, {
    name: 'Healthcare',
    color: '#FF6B9D',
    icon: HeartPulseIcon,
    description: 'Medical Facilities'
  }, {
    name: 'Recreational',
    color: '#A78BFA',
    icon: TreesIcon,
    description: 'Parks & Entertainment'
  }, {
    name: 'Industrial',
    color: '#64748B',
    icon: FactoryIcon,
    description: 'Manufacturing & Industry'
  }, {
    name: 'Hazard',
    color: '#EF4444',
    icon: AlertTriangleIcon,
    description: 'Risk Areas'
  }];
  const businessCategories = ['Retail & Shopping', 'Food and Beverage', 'Technological and IT', 'Logistics & Transport', 'Professional Services', 'Hospitality & Tourism', 'Construction & Real Estate', 'Healthcare and Medical', 'Educational and Training', 'Entertainment and Recreation', 'Automotive and Transport'];
  // Tandag City center coordinates (default fallback when geolocation is denied)
  const centerPosition: [number, number] = TANDAG_CITY_CENTER;
  // Zone boundaries for visualization
  const zones = [{
    bounds: [[8.96, 125.52], [8.98, 125.56]] as [[number, number], [number, number]],
    color: '#1E90FF',
    label: 'Commercial District',
    aiScore: 92
  }, {
    bounds: [[8.93, 125.53], [8.95, 125.57]] as [[number, number], [number, number]],
    color: '#36C275',
    label: 'Residential Area A',
    aiScore: 0
  }, {
    bounds: [[8.94, 125.51], [8.96, 125.53]] as [[number, number], [number, number]],
    color: '#00B3A4',
    label: 'Educational District',
    aiScore: 88
  }];
  // Enhanced distance calculation function using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  // ENHANCED: Generate stable supplier positions with CLOSER, more accurate distance-based placement
  const generateStablePosition = (supplierId: string, index: number, baseLat: number, baseLng: number, targetDistance: number): [number, number] => {
    const hash = supplierId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Generate angle based on hash and index for consistent positioning
    const angle = (hash + index * 137.5) % 360 * (Math.PI / 180);
    // Convert distance to degrees with high precision
    // 1 degree latitude ≈ 111.32 km
    const kmPerDegreeLat = 111.32;
    const kmPerDegreeLng = 111.32 * Math.cos(baseLat * Math.PI / 180);
    const latOffset = Math.cos(angle) * targetDistance / kmPerDegreeLat;
    const lngOffset = Math.sin(angle) * targetDistance / kmPerDegreeLng;
    return [baseLat + latOffset, baseLng + lngOffset];
  };
  // NEW: Product categories for unique supplier product generation
  const PRODUCT_CATEGORIES = ['Retail & Shopping Supplies', 'Food & Beverage Supplies', 'Office Equipment', 'Technology Hardware', 'Construction Materials', 'Logistics & Delivery', 'Maintenance and Repair', 'Hospitality Supplies', 'Healthcare Supplies', 'Educational Supplies', 'Entertainment Supplies', 'Automotive Supplies'];
  // NEW: Sample products per category (for random selection)
  const CATEGORY_PRODUCTS: Record<string, string[]> = {
    'Retail & Shopping Supplies': ['Premium Shopping Bags', 'Professional Price Tag Gun', 'Display Mannequins Set', 'Retail Shelving Units', 'Cash Register System', 'Shopping Baskets', 'Security Tag System', 'Barcode Scanner', 'Receipt Printer', 'Display Racks', 'Clothing Hangers', 'Store Signage'],
    'Food & Beverage Supplies': ['Commercial Coffee Maker', 'Industrial Blender', 'Commercial Refrigerator', 'Food Warming Display', 'Stainless Steel Cookware Set', 'Commercial Microwave', 'Food Storage Containers', 'Commercial Oven', 'Ice Maker Machine', 'Food Processor', 'Commercial Mixer', 'Beverage Dispenser'],
    'Office Equipment': ['Executive Ergonomic Chair', 'Standing Desk Pro', 'Office Filing Cabinet', 'Conference Table', 'Office Printer All-in-One', 'Whiteboard with Stand', 'Office Shredder', 'Desk Organizer Set', 'Office Phone System', 'Projector Screen', 'Document Scanner', 'Ergonomic Keyboard'],
    'Technology Hardware': ['Business Laptop Pro', '27" 4K Monitor', 'Wireless Mouse & Keyboard', 'Network Router Pro', 'External Hard Drive 4TB', 'Webcam HD Pro', 'UPS Battery Backup', 'USB Hub Multi-Port', 'Cable Management Kit', 'Surge Protector', 'Wireless Headset', 'Graphics Tablet'],
    'Construction Materials': ['Heavy-Duty Power Drill', 'Circular Saw Pro', 'Safety Equipment Kit', 'Tool Storage Cabinet', 'Measuring Laser Level', 'Portable Generator', 'Pneumatic Nail Gun', 'Angle Grinder', 'Concrete Mixer', 'Scaffolding Set', 'Work Bench', 'Tool Belt Professional'],
    'Logistics & Delivery': ['Hand Truck Dolly', 'Pallet Jack', 'Shipping Label Printer', 'Packaging Tape Dispenser', 'Warehouse Scanner', 'Moving Blankets Pack', 'Cargo Straps Set', 'Loading Ramp', 'Stretch Wrap Dispenser', 'Shipping Scale', 'Box Cutter Set', 'Warehouse Cart'],
    'Maintenance and Repair': ['Tool Set Professional', 'Pressure Washer', 'Ladder Multi-Position', 'Wet/Dry Vacuum', 'Paint Sprayer Pro', 'Maintenance Cart', 'Air Compressor', 'Welding Machine', 'Pipe Wrench Set', 'Socket Set', 'Cordless Drill Kit', 'Inspection Camera'],
    'Hospitality Supplies': ['Hotel Bedding Set', 'Towel Set Premium', 'Room Service Cart', 'Minibar Refrigerator', 'Hotel Safe Box', 'Housekeeping Cart', 'Amenities Dispenser Set', 'Luggage Rack', 'Iron & Ironing Board', 'Hair Dryer Professional', 'Bathroom Accessories Set', 'Room Slippers'],
    'Healthcare Supplies': ['Medical Supply Kit', 'Digital Thermometer Set', 'Blood Pressure Monitor', 'Medical Gloves Box', 'Wheelchair Standard', 'Pulse Oximeter', 'Medical Cart Mobile', 'Stethoscope Professional', 'First Aid Cabinet', 'Medical Masks Box', 'Hand Sanitizer Station', 'Patient Monitor'],
    'Educational Supplies': ['Smart Whiteboard System', 'Student Desk Set', 'Projector HD', 'Book Storage Cabinet', 'Science Lab Equipment', 'Art Supplies Set', 'Tablet Cart Charging', 'Educational Posters', 'Classroom Chairs', 'Globe Stand', 'Microscope Set', 'Calculator Set'],
    'Entertainment Supplies': ['Sound System Pro', 'LED Stage Lights', 'Karaoke Machine', 'Gaming Console Bundle', 'DJ Controller Pro', 'Arcade Game Machine', 'Pool Table', 'Dart Board Set', 'Foosball Table', 'Air Hockey Table', 'Pinball Machine', 'VR Headset'],
    'Automotive Supplies': ['Car Wash Equipment', 'Tire Inflator Pro', 'Car Jack Hydraulic', 'Battery Charger', 'Tool Set Automotive', 'Diagnostic Scanner', 'Jump Starter Kit', 'Car Vacuum Cleaner', 'Tire Pressure Gauge', 'Engine Hoist', 'Oil Drain Pan', 'Work Light LED']
  };
  // NEW: Function to validate if coordinates are on land (simple approximation)
  const isOnLand = (lat: number, lng: number): boolean => {
    // Simple land validation for Philippines region
    // Philippines approximate bounds: 4.5°N to 21°N, 116°E to 127°E
    const isInPhilippinesBounds = lat >= 4.5 && lat <= 21 && lng >= 116 && lng <= 127;
    // ENHANCED: More precise ocean detection for Philippine waters
    const isLikelyOcean =
    // South China Sea (west of Philippines)
    lng < 119 && lat < 12 ||
    // Pacific Ocean (east of Philippines)
    lng > 127 && lat > 6 ||
    // Sulu Sea (southwest)
    lat < 6 && lng < 122 ||
    // Celebes Sea (south)
    lat < 5 ||
    // Philippine Sea (far east)
    lng > 128 ||
    // Luzon Strait (north)
    lat > 20;
    return isInPhilippinesBounds && !isLikelyOcean;
  };
  // NEW: Function to find nearest land coordinates
  const findNearestLand = (lat: number, lng: number): [number, number] => {
    // If already on land, return as is
    if (isOnLand(lat, lng)) {
      return [lat, lng];
    }
    // ENHANCED: Smart fallback based on region
    // If coordinates are near Philippines but in water, adjust to nearest major city
    // Check if near Mindanao region (south)
    if (lat >= 5 && lat <= 10 && lng >= 120 && lng <= 127) {
      // Return Tandag City (default for eastern Mindanao)
      return TANDAG_CITY_CENTER;
    }
    // Check if near Visayas region (central)
    if (lat >= 9 && lat <= 13 && lng >= 122 && lng <= 126) {
      // Return Cebu City coordinates
      return [10.3157, 123.8854];
    }
    // Check if near Luzon region (north)
    if (lat >= 13 && lat <= 19 && lng >= 120 && lng <= 122) {
      // Return Manila coordinates
      return [14.5995, 120.9842];
    }
    // Default fallback to Tandag City for any other case
    return TANDAG_CITY_CENTER;
  };
  // NEW: Generate unique products for each supplier (8-12 products)
  const generateUniqueProducts = (supplierId: string): string[] => {
    const productCount = Math.floor(Math.random() * 5) + 8; // 8-12 products
    const selectedCategories: string[] = [];
    const products: string[] = [];
    // Randomly select 3-5 categories
    const categoryCount = Math.floor(Math.random() * 3) + 3; // 3-5 categories
    const shuffledCategories = [...PRODUCT_CATEGORIES].sort(() => Math.random() - 0.5);
    for (let i = 0; i < categoryCount && i < shuffledCategories.length; i++) {
      selectedCategories.push(shuffledCategories[i]);
    }
    // Generate unique hash from supplier ID for consistent randomization
    const hash = supplierId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Select products from chosen categories
    selectedCategories.forEach((category, catIndex) => {
      const categoryProducts = CATEGORY_PRODUCTS[category];
      const productsFromCategory = Math.ceil(productCount / categoryCount);
      // Use hash to create deterministic but unique selection
      const startIndex = (hash + catIndex * 7) % categoryProducts.length;
      for (let i = 0; i < productsFromCategory && products.length < productCount; i++) {
        const productIndex = (startIndex + i) % categoryProducts.length;
        products.push(categoryProducts[productIndex]);
      }
    });
    // Ensure we have exactly the right number of products
    return products.slice(0, productCount);
  };
  // MODIFIED: Generate unique suppliers with unique products - MOVED BEFORE useEffect
  const generateUniqueSuppliers = (lat: number, lng: number, minCount: number = 5, maxCount: number = 10): SupplierDetails[] => {
    const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const availableNames = allSupplierNames.filter(name => !usedSupplierNames.has(name));
    if (availableNames.length < count) {
      setUsedSupplierNames(new Set());
      const adjustedCount = Math.min(count, allSupplierNames.length);
      const newSuppliers: SupplierDetails[] = [];
      const selectedNames: string[] = [];
      for (let i = 0; i < adjustedCount; i++) {
        const name = allSupplierNames[i];
        selectedNames.push(name);
        const supplierId = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
        const targetDistance = Math.random() * 1.7 + 0.3;
        const position = generateStablePosition(supplierId, i, lat, lng, targetDistance);
        const actualDistance = calculateDistance(lat, lng, position[0], position[1]);
        const rating = +(Math.random() * 0.5 + 4.5).toFixed(1);
        const type = supplierTypes[Math.floor(Math.random() * supplierTypes.length)];
        const openCloseTime = generateBusinessHours();
        // NEW: Generate unique products for this supplier
        const uniqueProducts = generateUniqueProducts(supplierId);
        const allServices = ['Express Delivery', 'Freight Transport', 'Warehousing', 'Last-Mile Delivery', 'Same-Day Shipping', 'Cold Storage', 'Package Tracking', 'Bulk Orders'];
        const servicesCount = Math.floor(Math.random() * 3) + 3;
        const servicesOffered = allServices.sort(() => 0.5 - Math.random()).slice(0, servicesCount);
        newSuppliers.push({
          id: supplierId,
          name,
          type,
          rating,
          distance: `${actualDistance.toFixed(1)} km`,
          description: `Leading ${type.toLowerCase()} provider specializing in fast and reliable services across the region.`,
          products: uniqueProducts,
          contact: {
            email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
            phone: `+63 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`
          },
          address: 'Butuan Business District, Agusan del Norte',
          businessHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
          openCloseTime,
          servicesOffered
        });
      }
      setUsedSupplierNames(new Set(selectedNames));
      return newSuppliers;
    }
    const newSuppliers: SupplierDetails[] = [];
    const selectedNames: string[] = [];
    for (let i = 0; i < Math.min(count, availableNames.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      const name = availableNames[randomIndex];
      availableNames.splice(randomIndex, 1);
      selectedNames.push(name);
      const supplierId = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
      const targetDistance = Math.random() * 1.7 + 0.3;
      const position = generateStablePosition(supplierId, i, lat, lng, targetDistance);
      const actualDistance = calculateDistance(lat, lng, position[0], position[1]);
      const rating = +(Math.random() * 0.5 + 4.5).toFixed(1);
      const type = supplierTypes[Math.floor(Math.random() * supplierTypes.length)];
      const openCloseTime = generateBusinessHours();
      // NEW: Generate unique products for this supplier
      const uniqueProducts = generateUniqueProducts(supplierId);
      const allServices = ['Express Delivery', 'Freight Transport', 'Warehousing', 'Last-Mile Delivery', 'Same-Day Shipping', 'Cold Storage', 'Package Tracking', 'Bulk Orders'];
      const servicesCount = Math.floor(Math.random() * 3) + 3;
      const servicesOffered = allServices.sort(() => 0.5 - Math.random()).slice(0, servicesCount);
      newSuppliers.push({
        id: supplierId,
        name,
        type,
        rating,
        distance: `${actualDistance.toFixed(1)} km`,
        description: `Leading ${type.toLowerCase()} provider specializing in fast and reliable services across the region.`,
        products: uniqueProducts,
        contact: {
          email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: `+63 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`
        },
        address: 'Butuan Business District, Agusan del Norte',
        businessHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
        openCloseTime,
        servicesOffered
      });
    }
    setUsedSupplierNames(prev => new Set([...prev, ...selectedNames]));
    return newSuppliers;
  };
  const [displayedSuppliers, setDisplayedSuppliers] = useState<SupplierDetails[]>([]);
  // ENHANCED: Real-time distance calculation that updates based on user location or orange marker
  const stableSupplierPositions = useMemo(() => {
    if (!baseLocation) return [];
    // Priority: selectedLocation (orange marker) > userLocation (green GPS marker) > baseLocation
    const referenceLocation = selectedLocation || userLocation || baseLocation;
    return displayedSuppliers.map((supplier, index) => {
      // Extract original target distance from supplier ID hash
      const hash = supplier.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const targetDistance = hash % 17 / 10 + 0.3; // Reconstruct target distance (0.3-2km)
      const position = generateStablePosition(supplier.id, index, baseLocation.lat, baseLocation.lng, targetDistance);
      // REAL-TIME: Recalculate distance based on current reference location
      const distance = calculateDistance(referenceLocation.lat, referenceLocation.lng, position[0], position[1]);
      return {
        supplier: {
          ...supplier,
          distance: `${distance.toFixed(1)} km`
        },
        position
      };
    });
  }, [displayedSuppliers, baseLocation, selectedLocation, userLocation]);
  // ENHANCED: Automatic GPS permission request on mount with better feedback
  useEffect(() => {
    const requestGPSPermission = async () => {
      if (!navigator.geolocation) {
        // Fallback to Tandag City when geolocation is not supported
        const fallbackCenter = TANDAG_CITY_CENTER;
        setMapCenter(fallbackCenter);
        setBaseLocation({
          lat: fallbackCenter[0],
          lng: fallbackCenter[1]
        });
        const fallbackSuppliers = generateUniqueSuppliers(fallbackCenter[0], fallbackCenter[1], 5, 10);
        setDisplayedSuppliers(fallbackSuppliers);
        toast.warning('Geolocation not supported. Using Tandag City as default location.');
        return;
      }
      setIsRequestingLocation(true);
      toast.info('Requesting location access...', {
        duration: 3000
      });
      try {
        navigator.geolocation.getCurrentPosition(position => {
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // NEW: Validate and correct coordinates if on ocean
          if (!isOnLand(location.lat, location.lng)) {
            const correctedCoords = findNearestLand(location.lat, location.lng);
            location = {
              lat: correctedCoords[0],
              lng: correctedCoords[1]
            };
            toast.info('Location adjusted to nearest valid area');
          }
          setUserLocation(location);
          setMapCenter([location.lat, location.lng]);
          setBaseLocation(location);
          setIsRequestingLocation(false);
          const initialSuppliers = generateUniqueSuppliers(location.lat, location.lng, 5, 10);
          setDisplayedSuppliers(initialSuppliers);
          toast.success('Location access granted! Map loaded with your current location.', {
            duration: 4000
          });
        }, error => {
          console.error('GPS permission error:', error);
          setIsRequestingLocation(false);
          // Fallback to Tandag City when location access is denied or unavailable
          const fallbackCenter = TANDAG_CITY_CENTER;
          setMapCenter(fallbackCenter);
          setBaseLocation({
            lat: fallbackCenter[0],
            lng: fallbackCenter[1]
          });
          const fallbackSuppliers = generateUniqueSuppliers(fallbackCenter[0], fallbackCenter[1], 5, 10);
          setDisplayedSuppliers(fallbackSuppliers);
          if (error.code === error.PERMISSION_DENIED) {
            toast.error('Location access denied. Using Tandag City as default location. Click "Track Location" to enable.', {
              duration: 5000
            });
          } else {
            toast.info('Could not access location. Using Tandag City as default location.', {
              duration: 4000
            });
          }
        }, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      } catch (error) {
        console.error('Error requesting GPS:', error);
        setIsRequestingLocation(false);
        // Fallback to Tandag City on any error
        const fallbackCenter = TANDAG_CITY_CENTER;
        setMapCenter(fallbackCenter);
        setBaseLocation({
          lat: fallbackCenter[0],
          lng: fallbackCenter[1]
        });
        const fallbackSuppliers = generateUniqueSuppliers(fallbackCenter[0], fallbackCenter[1], 5, 10);
        setDisplayedSuppliers(fallbackSuppliers);
        toast.info('Map loaded with Tandag City as default location');
      }
    };
    requestGPSPermission();
  }, []);
  const toggleFullscreen = () => {
    const mapElement = document.getElementById('map-container');
    if (!document.fullscreenElement && mapElement) {
      mapElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  // Fetch location insights (mock API call)
  const fetchLocationInsights = async (lat: number, lng: number) => {
    setIsLoadingInsights(true);
    setSelectedLocation({
      lat,
      lng
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Mock data - in production, this would be: await fetch(`/api/location-insights?lat=${lat}&lng=${lng}`)
    const mockData: LocationInsights = {
      coordinates: {
        latitude: lat,
        longitude: lng
      },
      zoneDetails: {
        zoneType: 'Commercial C-3',
        classification: 'High-Density Commercial',
        hazardLevel: 'Low'
      },
      regulations: 'General city ordinances apply. Commercial activities permitted with proper permits.',
      requiredPermits: ["Business Permit (Mayor's Permit)", 'BIR Registration (TIN)', 'Barangay Clearance', 'Fire Safety Certificate', 'Sanitary Permit'],
      nearbyBusinesses: [{
        name: 'ABC Trading Co.',
        category: 'Retail & Shopping',
        rating: 4.8,
        distance: '0.5 km'
      }, {
        name: 'Metro Café & Bistro',
        category: 'Food and Beverage',
        rating: 4.6,
        distance: '0.8 km'
      }, {
        name: 'TechHub Solutions',
        category: 'Technological and IT',
        rating: 4.9,
        distance: '1.2 km'
      }, {
        name: 'Green Mart Supermarket',
        category: 'Retail & Shopping',
        rating: 4.7,
        distance: '0.3 km'
      }, {
        name: 'Elite Fitness Center',
        category: 'Entertainment and Recreation',
        rating: 4.5,
        distance: '1.5 km'
      }, {
        name: 'Prime Real Estate',
        category: 'Construction & Real Estate',
        rating: 4.8,
        distance: '0.9 km'
      }],
      swot: {
        strengths: ['High foot traffic area', 'Excellent transportation access', 'Established commercial zone', 'Strong local economy', 'Diverse customer base'],
        weaknesses: ['High rental costs', 'Intense competition', 'Limited parking space', 'Seasonal demand fluctuation'],
        opportunities: ['Growing digital market', 'Tourism expansion potential', 'New infrastructure projects', 'Government business incentives', 'Emerging middle class'],
        threats: ['Economic downturn risk', 'Regulatory changes', 'Online competition', 'Rising operational costs']
      },
      demographics: {
        totalPopulation: '1,234,567',
        populationDensity: '2,450 per km²',
        growthRate: '+2.3% annually',
        ageDistribution: [{
          label: '0-17 years',
          percentage: 28
        }, {
          label: '18-34 years',
          percentage: 35
        }, {
          label: '35-54 years',
          percentage: 25
        }, {
          label: '55+ years',
          percentage: 12
        }],
        economicProfile: {
          avgIncome: '₱35,000/month',
          employmentRate: '87%',
          businessGrowth: '+15% YoY'
        },
        consumerBehavior: {
          spendingPatterns: 'High retail spending, moderate dining out frequency',
          peakHours: '11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM'
        }
      }
    };
    setLocationInsights(mockData);
    setIsLoadingInsights(false);
  };
  // ENHANCED: Track Location with improved permission handling and real-time updates
  const handleTrackLocation = () => {
    if (isTrackingLocation) {
      setIsTrackingLocation(false);
      toast.info('Location tracking stopped');
      return;
    }
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser');
      return;
    }
    setIsRequestingLocation(true);
    toast.info('Requesting location permission...', {
      duration: 3000
    });
    // ENHANCED: Use high accuracy and immediate response
    navigator.geolocation.getCurrentPosition(position => {
      let location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // CRITICAL: Validate location is on land, not in ocean
      if (!isOnLand(location.lat, location.lng)) {
        const correctedLocation = findNearestLand(location.lat, location.lng);
        location = {
          lat: correctedLocation[0],
          lng: correctedLocation[1]
        };
        toast.warning('Location adjusted to nearest land area (GPS detected ocean coordinates)', {
          duration: 4000
        });
      }
      // INSTANT UPDATE: Set all location states immediately
      setUserLocation(location);
      setMapCenter([location.lat, location.lng]);
      setBaseLocation(location);
      setIsTrackingLocation(true);
      setIsRequestingLocation(false);
      // Generate suppliers for the validated location
      const initialSuppliers = generateUniqueSuppliers(location.lat, location.lng, 5, 10);
      setDisplayedSuppliers(initialSuppliers);
      toast.success('Location tracking enabled! Map centered on your position.', {
        duration: 4000
      });
    }, error => {
      console.error('Geolocation error:', error);
      setIsRequestingLocation(false);
      if (error.code === error.PERMISSION_DENIED) {
        toast.error('Location permission denied. Please enable location access in your browser settings.', {
          duration: 6000
        });
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        toast.error('Location information unavailable. Please check your device settings.');
      } else if (error.code === error.TIMEOUT) {
        toast.error('Location request timed out. Please try again.');
      } else {
        toast.error('Unable to retrieve location. Please try again.');
      }
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0 // Always get fresh location
    });
  };
  const handleLocationUpdate = (lat: number, lng: number) => {
    // ENHANCED: Validate location before updating
    let validatedLocation = {
      lat,
      lng
    };
    if (!isOnLand(lat, lng)) {
      const correctedCoords = findNearestLand(lat, lng);
      validatedLocation = {
        lat: correctedCoords[0],
        lng: correctedCoords[1]
      };
      // Silent correction - don't spam toast notifications during live tracking
      console.log('Location corrected from ocean to land:', {
        original: {
          lat,
          lng
        },
        corrected: validatedLocation
      });
    }
    setUserLocation(validatedLocation);
    setMapCenter([validatedLocation.lat, validatedLocation.lng]);
    if (showNearbyOperators) {
      const newSuppliers = generateUniqueSuppliers(validatedLocation.lat, validatedLocation.lng, 5, 10);
      setDisplayedSuppliers(newSuppliers);
    }
  };
  const handleNearbyOperatorsToggle = () => {
    const newState = !showNearbyOperators;
    setShowNearbyOperators(newState);
    if (newState && baseLocation) {
      const newSuppliers = generateUniqueSuppliers(baseLocation.lat, baseLocation.lng, 5, 10);
      setDisplayedSuppliers(newSuppliers);
      toast.success('Nearby operators enabled');
    } else {
      toast.info('Nearby operators disabled');
    }
  };
  const handleViewSupplier = (supplier: SupplierDetails) => {
    setSelectedSupplier(supplier);
  };
  const handleContactSupplier = (supplier: SupplierDetails) => {
    setContactSupplier(supplier);
    setShowContactModal(true);
  };
  // NEW: Handle "View Products" button - redirect to shop with supplier products
  const handleShopRedirect = (supplierId: string) => {
    const supplier = stableSupplierPositions.find(s => s.supplier.id === supplierId)?.supplier;
    if (supplier) {
      navigate('/dashboard/products', {
        state: {
          supplierId: supplier.id,
          supplierName: supplier.name,
          supplierProducts: supplier.products
        }
      });
      toast.success(`Viewing products from ${supplier.name}`);
    }
  };
  // ENHANCED: Map click handler with accurate supplier generation
  const handleMapClick = (lat: number, lng: number) => {
    setLocationPinAnimation(true);
    setMarkerPulseAnimation(true);
    setTimeout(() => {
      setLocationPinAnimation(false);
      setMarkerPulseAnimation(false);
    }, 2000);
    setMapCenter([lat, lng]);
    setSelectedLocation({
      lat,
      lng
    });
    fetchLocationInsights(lat, lng);
    if (showNearbyOperators) {
      setBaseLocation({
        lat,
        lng
      });
      const supplierCount = Math.floor(Math.random() * 6) + 5;
      const newSuppliers = generateUniqueSuppliers(lat, lng, supplierCount, supplierCount);
      setDisplayedSuppliers(newSuppliers);
      toast.success(`Location pinned! Discovering ${newSuppliers.length} nearby suppliers...`);
    }
  };
  const getHazardBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-m2m-success/20 text-m2m-success border-m2m-success/30';
      case 'medium':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow border-m2m-chart-yellow/30';
      case 'high':
        return 'bg-m2m-accent-orange/20 text-m2m-accent-orange border-m2m-accent-orange/30';
      default:
        return 'bg-m2m-divider/20 text-m2m-text-secondary border-m2m-divider/30';
    }
  };
  return <div className="space-y-6 pt-6 relative">
      {/* NEARBUY Floating Particles Background */}
      <div className="floating-particles fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => <div key={i} className="particle" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${6 + Math.random() * 4}s`
      }} />)}
      </div>

      {/* Header with Premium Gradient */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="relative z-10">
        <h1 className="text-3xl font-bold shimmer-text flex items-center">
          <SparklesIcon className="w-8 h-8 mr-3 text-m2m-nearbuy-neon drop-shadow-lg" />
          AI-Powered Location Analysis
        </h1>
        <p className="text-m2m-text-secondary mt-2">
          Real-time geospatial analysis with interactive maps, zone
          classifications, and comprehensive area insights for optimal business
          placement.
        </p>
      </motion.div>
      {/* Map Filters & Controls with Glass Effect */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="glass-panel rounded-xl shadow-nearbuy-lg p-6 border border-m2m-nearbuy-green/20 hover-lift relative z-10">
        <h3 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
          <LayersIcon className="w-5 h-5 mr-2 text-m2m-nearbuy-teal" />
          Map Filters & Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 nearbuy-card rounded-lg">
            <div>
              <p className="font-medium text-m2m-text-primary">
                Zone Information
              </p>
              <p className="text-xs text-m2m-text-secondary">
                Show zone classifications & hazard areas
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={showZoneInfo} onChange={() => setShowZoneInfo(!showZoneInfo)} />
              <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-nearbuy-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nearbuy-gradient"></div>
            </label>
          </div>

          {/* Enhanced Nearby Operators Toggle with Glow */}
          <div className="flex items-center justify-between p-4 nearbuy-card rounded-lg ambient-glow">
            <div>
              <p className="font-medium text-m2m-text-primary flex items-center">
                Nearby Operators
                {showNearbyOperators && isTrackingLocation && <motion.span animate={{
                opacity: [1, 0.5, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} className="ml-2 px-2 py-0.5 bg-m2m-nearbuy-neon/20 text-m2m-nearbuy-neon text-xs rounded-full font-bold live-indicator">
                    LIVE
                  </motion.span>}
              </p>
              <p className="text-xs text-m2m-text-secondary">
                Display business operators in real-time
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={showNearbyOperators} onChange={handleNearbyOperatorsToggle} />
              <motion.div animate={showNearbyOperators ? {
              boxShadow: ['0 0 0 0 rgba(124, 255, 138, 0.7)', '0 0 0 10px rgba(124, 255, 138, 0)']
            } : {}} transition={{
              duration: 2,
              repeat: showNearbyOperators ? Infinity : 0
            }} className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-nearbuy-neon/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nearbuy-gradient" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 nearbuy-card rounded-lg">
            <div>
              <p className="font-medium text-m2m-text-primary">
                AI Recommender
              </p>
              <p className="text-xs text-m2m-text-secondary">
                Show AI-recommended zones
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={showAIRecommender} onChange={() => setShowAIRecommender(!showAIRecommender)} />
              <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-nearbuy-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nearbuy-gradient"></div>
            </label>
          </div>
        </div>
      </motion.div>
      {/* Zone Classification & Legend with Enhanced Cards */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="glass-panel rounded-xl shadow-nearbuy-lg p-6 border border-m2m-nearbuy-green/20 relative z-10">
        <h3 className="text-lg font-bold gradient-text mb-4">
          Zone Classification & Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {zoneClassifications.map((zone, index) => {
          const Icon = zone.icon;
          return <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.3 + index * 0.05
          }} className="flex items-center space-x-3 p-3 nearbuy-card rounded-lg hover-lift cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-nearbuy-sm" style={{
              background: `linear-gradient(135deg, ${zone.color}40 0%, ${zone.color}20 100%)`
            }}>
                  <Icon className="w-5 h-5" style={{
                color: zone.color
              }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary truncate">
                    {zone.name}
                  </p>
                  <p className="text-xs text-m2m-text-secondary truncate">
                    {zone.description}
                  </p>
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>

      {/* Search Bar & Business Category Filter with Gradient Focus */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="glass-panel rounded-xl shadow-nearbuy-lg p-6 border border-m2m-nearbuy-green/20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-m2m-text-primary mb-2">
              Search Location
            </label>
            <div className="relative group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary group-focus-within:text-m2m-nearbuy-teal transition-colors" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for areas in Butuan City…" className="w-full pl-10 pr-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-nearbuy-teal focus:ring-2 focus:ring-m2m-nearbuy-teal/20 transition-all" />
            </div>
          </div>
          {/* Business Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-m2m-text-primary mb-2">
              Business Category
            </label>
            <div className="relative group">
              <select value={selectedBusinessCategory} onChange={e => setSelectedBusinessCategory(e.target.value)} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary appearance-none focus:outline-none focus:border-m2m-nearbuy-teal focus:ring-2 focus:ring-m2m-nearbuy-teal/20 transition-all cursor-pointer">
                <option value="">Select a category...</option>
                {businessCategories.map((category, index) => <option key={index} value={category}>
                    {category}
                  </option>)}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary pointer-events-none group-focus-within:text-m2m-nearbuy-teal transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Interactive Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-bold text-m2m-text-primary flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Interactive Zone Map
                  </h3>
                  {isLiveMode && <motion.div animate={{
                  opacity: [1, 0.5, 1]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }} className="flex items-center space-x-2 px-3 py-1 bg-m2m-success/20 rounded-full">
                      <div className="w-2 h-2 bg-m2m-success rounded-full" />
                      <span className="text-xs font-bold text-m2m-success">
                        LIVE
                      </span>
                    </motion.div>}
                  {isRequestingLocation && <motion.div animate={{
                  opacity: [1, 0.5, 1]
                }} transition={{
                  duration: 1,
                  repeat: Infinity
                }} className="flex items-center space-x-2 px-3 py-1 bg-m2m-accent-blue/20 rounded-full">
                      <Loader2Icon className="w-3 h-3 text-m2m-accent-blue animate-spin" />
                      <span className="text-xs font-bold text-m2m-accent-blue">
                        Requesting Location...
                      </span>
                    </motion.div>}
                </div>
                <p className="text-xs text-m2m-text-secondary mt-1">
                  Click anywhere on the map to view detailed location insights
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleTrackLocation} disabled={isRequestingLocation} className={`px-4 py-2 rounded-lg transition-all flex items-center text-sm font-medium button-press ${isRequestingLocation ? 'bg-m2m-divider text-m2m-text-secondary cursor-not-allowed' : isTrackingLocation ? 'btn-nearbuy text-white shadow-nearbuy-md' : 'nearbuy-card hover:shadow-nearbuy-sm'}`}>
                  {isRequestingLocation ? <>
                      <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                      Requesting...
                    </> : <>
                      <NavigationIcon className="w-4 h-4 mr-2" />
                      {isTrackingLocation ? 'Stop Tracking' : 'Track Location'}
                    </>}
                </motion.button>
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={toggleFullscreen} className="p-2 nearbuy-card rounded-lg transition-all flex items-center text-sm text-m2m-text-secondary hover:text-m2m-nearbuy-teal button-press">
                  <MaximizeIcon className="w-4 h-4 mr-1" />
                  Fullscreen
                </motion.button>
              </div>
            </div>
            {/* Map Container with premium border glow */}
            <div id="map-container" className="relative rounded-lg overflow-hidden shadow-nearbuy-xl border-2 border-m2m-nearbuy-green/30 hover:border-m2m-nearbuy-teal/50 transition-all" style={{
            height: '600px',
            zIndex: 1
          }}>
              {mapCenter && <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={true} style={{
              height: '100%',
              width: '100%'
            }} zoomControl={false} className="transition-all duration-500 ease-in-out" maxBounds={[[mapCenter[0] - 0.5, mapCenter[1] - 0.5], [mapCenter[0] + 0.5, mapCenter[1] + 0.5]]} maxBoundsViscosity={1.0} key={`map-${mapCenter[0]}-${mapCenter[1]}`}>
                  <SmoothZoom />
                  <AutoCenterMap center={mapCenter} />
                  {isTrackingLocation && <LocationTracker onLocationUpdate={handleLocationUpdate} />}
                  <MapClickHandler onMapClick={handleMapClick} />
                  {/* Satellite-only mode */}
                  <TileLayer attribution='&copy; <a href="https://www.esri.com/">Esri</a>' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" maxZoom={18} />
                  <ZoomControl position="bottomright" />
                  {/* Zone Rectangles */}
                  {showZoneInfo && zones.map((zone, index) => <Rectangle key={index} bounds={zone.bounds} pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.2,
                weight: 2
              }}>
                        <Popup>
                          <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-gray-900 mb-2">
                              {zone.label}
                            </h3>
                            {zone.aiScore > 0 && showAIRecommender && <div className="flex items-center space-x-2 mb-2">
                                <SparklesIcon className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-semibold text-blue-600">
                                  AI Recommended: {zone.aiScore}%
                                </span>
                              </div>}
                            <p className="text-xs text-gray-600">
                              Click for detailed zone analysis
                            </p>
                          </div>
                        </Popup>
                      </Rectangle>)}
                  {/* User Location Marker (Green GPS marker) */}
                  {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-gray-900 mb-1">
                            Your Location
                          </h3>
                          <p className="text-xs text-gray-600">
                            Real-time GPS position
                          </p>
                        </div>
                      </Popup>
                    </Marker>}
                  {/* Selected Location Marker (Orange pin) */}
                  {selectedLocation && (!userLocation || selectedLocation.lat !== userLocation.lat || selectedLocation.lng !== userLocation.lng) && <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={selectedLocationIcon}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-gray-900 mb-1">
                              Pinned Location
                            </h3>
                            <p className="text-xs text-gray-600">
                              Lat: {selectedLocation.lat.toFixed(4)}, Lng:{' '}
                              {selectedLocation.lng.toFixed(4)}
                            </p>
                          </div>
                        </Popup>
                      </Marker>}
                  {/* AI Recommended Markers */}
                  {showAIRecommender && <>
                      <Marker position={[8.97, 125.54]} icon={aiRecommendedIcon}>
                        <Popup>
                          <div className="p-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <SparklesIcon className="w-5 h-5 text-blue-600" />
                              <h3 className="font-bold text-gray-900">
                                AI Recommended
                              </h3>
                            </div>
                            <p className="text-sm font-semibold text-blue-600 mb-1">
                              92% Confidence
                            </p>
                            <p className="text-xs text-gray-600">
                              High potential for{' '}
                              {selectedBusinessCategory || 'selected business category'}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                      <Marker position={[8.945, 125.525]} icon={aiRecommendedIcon}>
                        <Popup>
                          <div className="p-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <SparklesIcon className="w-5 h-5 text-blue-600" />
                              <h3 className="font-bold text-gray-900">
                                AI Recommended
                              </h3>
                            </div>
                            <p className="text-sm font-semibold text-blue-600 mb-1">
                              88% Confidence
                            </p>
                            <p className="text-xs text-gray-600">
                              Growing area with low competition
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    </>}
                  {/* Green supplier markers with blue line paths */}
                  {showNearbyOperators && selectedLocation && stableSupplierPositions.map(({
                supplier,
                position
              }) => <Fragment key={supplier.id}>
                        {/* Blue line from orange pin to supplier */}
                        <Polyline positions={[[selectedLocation.lat, selectedLocation.lng], position]} pathOptions={{
                  color: '#1E90FF',
                  weight: 2,
                  opacity: 0.6,
                  dashArray: '5, 10'
                }} />
                        <Marker position={position} icon={businessIcon}>
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
                        </Marker>
                      </Fragment>)}
                </MapContainer>}
              {/* Pulse animation overlay when marking location */}
              {markerPulseAnimation && <motion.div initial={{
              opacity: 0.8,
              scale: 0.8
            }} animate={{
              opacity: 0,
              scale: 2
            }} transition={{
              duration: 2,
              ease: 'easeOut'
            }} className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{
              zIndex: 1000
            }}>
                  <div className="w-32 h-32 rounded-full bg-m2m-accent-orange/30 border-4 border-m2m-accent-orange" />
                </motion.div>}
            </div>
            {/* Coverage Statistics with Gradient Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <motion.div whileHover={{
              scale: 1.05,
              y: -4
            }} className="text-center p-3 nearbuy-card rounded-lg cursor-pointer shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all">
                <p className="text-2xl font-bold gradient-text">8</p>
                <p className="text-xs text-m2m-text-secondary">Zone Types</p>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05,
              y: -4
            }} className="text-center p-3 nearbuy-card rounded-lg cursor-pointer shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all">
                <p className="text-2xl font-bold gradient-text">817km²</p>
                <p className="text-xs text-m2m-text-secondary">Coverage Area</p>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05,
              y: -4
            }} className="text-center p-3 nearbuy-card rounded-lg cursor-pointer shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all">
                <p className="text-2xl font-bold gradient-text">95%</p>
                <p className="text-xs text-m2m-text-secondary">AI Accuracy</p>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05,
              y: -4
            }} className="text-center p-3 nearbuy-card rounded-lg cursor-pointer shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all">
                <p className="text-2xl font-bold gradient-text">
                  {displayedSuppliers.length}
                </p>
                <p className="text-xs text-m2m-text-secondary">
                  Active Suppliers
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Right Side Panel - Enhanced Suppliers with Real-Time Updates */}
        <div className="lg:col-span-1">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-m2m-text-primary flex items-center">
                <TruckIcon className="w-5 h-5 mr-2 text-m2m-accent-orange" />
                {selectedLocation ? 'Suggested Suppliers' : 'Nearby Suppliers'}
              </h3>
              {showNearbyOperators && isTrackingLocation && <motion.div animate={{
              opacity: [1, 0.5, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} className="px-2 py-1 bg-m2m-success/20 text-m2m-success text-xs rounded-full font-bold">
                  LIVE
                </motion.div>}
            </div>
            <p className="text-sm text-m2m-text-secondary mb-4">
              {selectedLocation ? 'Based on your pinned location' : 'Suppliers in your area'}
            </p>
            <AnimatePresence mode="wait">
              {showNearbyOperators ? <motion.div key={displayedSuppliers.map(s => s.id).join('-')} initial={{
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
            }} className="space-y-3 mb-4 max-h-[500px] overflow-y-auto">
                  {stableSupplierPositions.map(({
                supplier
              }, index) => <motion.div key={supplier.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }} className="nearbuy-card rounded-lg p-4 hover-lift shadow-nearbuy-sm hover:shadow-nearbuy-md cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center flex-1">
                          <div className="w-10 h-10 rounded-full bg-nearbuy-gradient flex items-center justify-center mr-2 flex-shrink-0 shadow-nearbuy-sm">
                            <TruckIcon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-semibold text-m2m-text-primary text-sm">
                            {supplier.name}
                          </h4>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 text-m2m-chart-yellow fill-current mr-1" />
                          <span className="text-sm font-medium text-m2m-text-primary">
                            {supplier.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-m2m-text-secondary mb-2">
                        {supplier.type}
                      </p>
                      <p className="text-xs text-m2m-text-secondary mb-2">
                        📍 {supplier.distance} away
                      </p>
                      {/* ENHANCED: Open/Close Time with gradient icon */}
                      <div className="flex items-center text-xs text-m2m-text-secondary mb-2">
                        <ClockIcon className="w-3 h-3 mr-1 text-m2m-nearbuy-green" />
                        <span>Open: {supplier.openCloseTime}</span>
                      </div>
                      {/* ENHANCED: Contact Number with gradient icon */}
                      <div className="flex items-center text-xs text-m2m-text-secondary mb-3">
                        <PhoneIcon className="w-3 h-3 mr-1 text-m2m-nearbuy-teal" />
                        <span>{supplier.contact.phone}</span>
                      </div>
                      {/* ENHANCED: Services Offered with gradient badges */}
                      <div className="mb-3">
                        <p className="text-xs font-medium text-m2m-text-primary mb-1">
                          Services:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.servicesOffered.slice(0, 3).map((service, idx) => <span key={idx} className="text-xs px-2 py-0.5 bg-nearbuy-soft text-m2m-nearbuy-teal rounded-full border border-m2m-nearbuy-teal/20">
                                {service}
                              </span>)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => handleViewSupplier(supplier)} className="px-3 py-2 btn-nearbuy text-white rounded-lg text-sm font-medium shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all duration-300 flex items-center justify-center button-press">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          View
                        </motion.button>
                        <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => handleContactSupplier(supplier)} className="px-3 py-2 nearbuy-card text-m2m-nearbuy-teal rounded-lg text-sm font-medium shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all duration-300 flex items-center justify-center button-press">
                          <PhoneIcon className="w-4 h-4 mr-1" />
                          Contact
                        </motion.button>
                      </div>
                    </motion.div>)}
                </motion.div> : <motion.div key="disabled" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} className="text-center py-12">
                  <TruckIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
                  <p className="text-sm text-m2m-text-secondary">
                    Enable Nearby Operators to view suppliers
                  </p>
                </motion.div>}
            </AnimatePresence>
          </motion.div>
          {/* AI Insights Card with Premium Gradient */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="glass-panel rounded-xl shadow-nearbuy-xl p-6 border-2 border-m2m-nearbuy-green/30 mt-6 ambient-glow" style={{
          background: 'linear-gradient(135deg, rgba(58, 166, 107, 0.1) 0%, rgba(31, 111, 179, 0.1) 100%)'
        }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-nearbuy-gradient rounded-full flex items-center justify-center shadow-nearbuy-glow animate-pulse-glow">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold gradient-text">AI Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-m2m-bg-primary/50">
                <span className="text-sm text-m2m-text-secondary">
                  Analysis Confidence
                </span>
                <span className="text-sm font-bold gradient-text">95%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-m2m-bg-primary/50">
                <span className="text-sm text-m2m-text-secondary">
                  Available Suppliers
                </span>
                <span className="text-sm font-bold gradient-text">
                  {displayedSuppliers.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-m2m-bg-primary/50">
                <span className="text-sm text-m2m-text-secondary">
                  Market Potential
                </span>
                <span className="text-sm font-bold text-m2m-nearbuy-green">
                  High
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* SECTION 1: LOCATION INFORMATION */}
      <AnimatePresence>
        {isLoadingInsights && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-12 border border-m2m-divider">
            <div className="flex flex-col items-center justify-center">
              <Loader2Icon className="w-12 h-12 text-m2m-accent-blue animate-spin mb-4" />
              <p className="text-lg font-semibold text-m2m-text-primary">
                Analyzing Location...
              </p>
              <p className="text-sm text-m2m-text-secondary mt-2">
                Fetching comprehensive insights for your selected area
              </p>
            </div>
          </motion.div>}
        {locationInsights && !isLoadingInsights && <>
            {/* SECTION 1: Location Information */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-6 flex items-center">
                <MapPinIcon className="w-6 h-6 mr-3 text-m2m-accent-blue" />
                Location Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Coordinates */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Coordinates
                    </h3>
                    <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Latitude
                        </span>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {locationInsights.coordinates.latitude.toFixed(6)}°
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-m2m-text-secondary">
                          Longitude
                        </span>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {locationInsights.coordinates.longitude.toFixed(6)}°
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Zone Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Zone Details
                    </h3>
                    <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-m2m-text-secondary">
                          Zone Type
                        </span>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {locationInsights.zoneDetails.zoneType}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-m2m-text-secondary">
                          Classification
                        </span>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {locationInsights.zoneDetails.classification}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-m2m-text-secondary">
                          Hazard Level
                        </span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getHazardBadgeColor(locationInsights.zoneDetails.hazardLevel)}`}>
                          {locationInsights.zoneDetails.hazardLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Regulations */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Regulations
                    </h3>
                    <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                      <p className="text-sm text-m2m-text-secondary">
                        {locationInsights.regulations}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                  {/* Required Permits */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Required Permits
                    </h3>
                    <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                      <ul className="space-y-2">
                        {locationInsights.requiredPermits.map((permit, index) => <li key={index} className="flex items-start text-sm text-m2m-text-secondary">
                              <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                              <span>{permit}</span>
                            </li>)}
                      </ul>
                    </div>
                  </div>
                  {/* Nearby Business Operators */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Nearby Business Operators
                    </h3>
                    <div className="space-y-3">
                      {locationInsights.nearbyBusinesses.map((business, index) => <div key={index} className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider hover:border-m2m-accent-blue transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-m2m-text-primary text-sm mb-1">
                                  {business.name}
                                </h4>
                                <p className="text-xs text-m2m-text-secondary">
                                  {business.category}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <StarIcon className="w-4 h-4 text-m2m-chart-yellow fill-current mr-1" />
                                <span className="text-sm font-medium text-m2m-text-primary">
                                  {business.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-m2m-text-secondary">
                              📍 {business.distance}
                            </p>
                          </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* SECTION 2: SWOT Analysis */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-6 flex items-center">
                <TargetIcon className="w-6 h-6 mr-3 text-m2m-accent-teal" />
                SWOT Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Strengths */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-m2m-success/20 rounded-lg flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-m2m-success" />
                    </div>
                    <h3 className="text-lg font-bold text-m2m-text-primary">
                      Strengths
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {locationInsights.swot.strengths.map((item, index) => <div key={index} className="bg-m2m-success/10 border border-m2m-success/30 rounded-lg px-3 py-2">
                        <p className="text-sm text-m2m-text-primary">{item}</p>
                      </div>)}
                  </div>
                </div>
                {/* Weaknesses */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <XCircleIcon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-m2m-text-primary">
                      Weaknesses
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {locationInsights.swot.weaknesses.map((item, index) => <div key={index} className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                        <p className="text-sm text-m2m-text-primary">{item}</p>
                      </div>)}
                  </div>
                </div>
                {/* Opportunities */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-m2m-accent-blue/20 rounded-lg flex items-center justify-center">
                      <TrendingUpIcon className="w-6 h-6 text-m2m-accent-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-m2m-text-primary">
                      Opportunities
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {locationInsights.swot.opportunities.map((item, index) => <div key={index} className="bg-m2m-accent-blue/10 border border-m2m-accent-blue/30 rounded-lg px-3 py-2">
                        <p className="text-sm text-m2m-text-primary">{item}</p>
                      </div>)}
                  </div>
                </div>
                {/* Threats */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-m2m-accent-orange/20 rounded-lg flex items-center justify-center">
                      <AlertTriangleIcon className="w-6 h-6 text-m2m-accent-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-m2m-text-primary">
                      Threats
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {locationInsights.swot.threats.map((item, index) => <div key={index} className="bg-m2m-accent-orange/10 border border-m2m-accent-orange/30 rounded-lg px-3 py-2">
                        <p className="text-sm text-m2m-text-primary">{item}</p>
                      </div>)}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* SECTION 3: Population Data & Demographics */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-6 flex items-center">
                <UsersIcon className="w-6 h-6 mr-3 text-m2m-accent-teal" />
                Population Data & Demographics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Population Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                      Population Overview
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider text-center">
                        <p className="text-2xl font-bold text-m2m-accent-blue mb-1">
                          {locationInsights.demographics.totalPopulation}
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Total Population
                        </p>
                      </div>
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider text-center">
                        <p className="text-2xl font-bold text-m2m-accent-teal mb-1">
                          {locationInsights.demographics.populationDensity}
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Density
                        </p>
                      </div>
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider text-center">
                        <p className="text-2xl font-bold text-m2m-success mb-1">
                          {locationInsights.demographics.growthRate}
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Growth Rate
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Age Distribution */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                      Age Distribution
                    </h3>
                    <div className="space-y-3">
                      {locationInsights.demographics.ageDistribution.map((age, index) => <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-m2m-text-secondary">
                                {age.label}
                              </span>
                              <span className="text-sm font-bold text-m2m-text-primary">
                                {age.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-3 bg-m2m-bg-primary rounded-full overflow-hidden border border-m2m-divider">
                              <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${age.percentage}%`
                      }} transition={{
                        duration: 1,
                        delay: 0.5 + index * 0.1
                      }} className="h-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal rounded-full" />
                            </div>
                          </div>)}
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                  {/* Economic Profile */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                      Economic Profile
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <DollarSignIcon className="w-5 h-5 text-m2m-success" />
                            <span className="text-sm text-m2m-text-secondary">
                              Average Income
                            </span>
                          </div>
                          <span className="text-sm font-bold text-m2m-text-primary">
                            {locationInsights.demographics.economicProfile.avgIncome}
                          </span>
                        </div>
                      </div>
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <BriefcaseIcon className="w-5 h-5 text-m2m-accent-blue" />
                            <span className="text-sm text-m2m-text-secondary">
                              Employment Rate
                            </span>
                          </div>
                          <span className="text-sm font-bold text-m2m-text-primary">
                            {locationInsights.demographics.economicProfile.employmentRate}
                          </span>
                        </div>
                      </div>
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <TrendingUpIcon className="w-5 h-5 text-m2m-success" />
                            <span className="text-sm text-m2m-text-secondary">
                              Business Growth
                            </span>
                          </div>
                          <span className="text-sm font-bold text-m2m-success">
                            {locationInsights.demographics.economicProfile.businessGrowth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Consumer Behavior Insights */}
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                      Consumer Behavior Insights
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                        <div className="flex items-start space-x-3">
                          <ShoppingBagIcon className="w-5 h-5 text-m2m-accent-orange mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-m2m-text-primary mb-1">
                              Spending Patterns
                            </p>
                            <p className="text-xs text-m2m-text-secondary">
                              {locationInsights.demographics.consumerBehavior.spendingPatterns}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                        <div className="flex items-start space-x-3">
                          <ClockIcon className="w-5 h-5 text-m2m-accent-blue mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-m2m-text-primary mb-1">
                              Peak Hours
                            </p>
                            <p className="text-xs text-m2m-text-secondary">
                              {locationInsights.demographics.consumerBehavior.peakHours}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* NEW SECTION: AI Recommendations & Predictions */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.6
        }} className="bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 rounded-xl shadow-lg p-6 border border-m2m-accent-blue/20">
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-6 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-3 text-m2m-accent-blue" />
                AI Recommendations & Predictions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recommended Business Types */}
                <div className="bg-m2m-bg-card rounded-lg p-6 border border-m2m-divider">
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                    Recommended Business Types
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Food & Beverage
                        </span>
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} className="text-sm font-bold text-m2m-success">
                          92%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-m2m-bg-primary rounded-full overflow-hidden">
                        <motion.div initial={{
                      width: 0
                    }} animate={{
                      width: '92%'
                    }} transition={{
                      duration: 1.5,
                      ease: 'easeOut'
                    }} className="h-full bg-gradient-to-r from-m2m-success to-m2m-success/70 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Retail & Shopping
                        </span>
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} className="text-sm font-bold text-m2m-accent-blue">
                          85%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-m2m-bg-primary rounded-full overflow-hidden">
                        <motion.div initial={{
                      width: 0
                    }} animate={{
                      width: '85%'
                    }} transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                      delay: 0.2
                    }} className="h-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-blue/70 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Technology & IT
                        </span>
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} className="text-sm font-bold text-m2m-accent-teal">
                          78%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-m2m-bg-primary rounded-full overflow-hidden">
                        <motion.div initial={{
                      width: 0
                    }} animate={{
                      width: '78%'
                    }} transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                      delay: 0.4
                    }} className="h-full bg-gradient-to-r from-m2m-accent-teal to-m2m-accent-teal/70 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Market Demand Levels */}
                <div className="bg-m2m-bg-card rounded-lg p-6 border border-m2m-divider">
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                    Market Demand Levels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-m2m-success/10 rounded-lg border border-m2m-success/30">
                      <div className="flex items-center space-x-3">
                        <TrendingUpIcon className="w-5 h-5 text-m2m-success" />
                        <span className="text-sm font-medium text-m2m-text-primary">
                          Consumer Goods
                        </span>
                      </div>
                      <span className="text-xs font-bold text-m2m-success px-2 py-1 bg-m2m-success/20 rounded">
                        High
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-m2m-accent-blue/10 rounded-lg border border-m2m-accent-blue/30">
                      <div className="flex items-center space-x-3">
                        <TrendingUpIcon className="w-5 h-5 text-m2m-accent-blue" />
                        <span className="text-sm font-medium text-m2m-text-primary">
                          Professional Services
                        </span>
                      </div>
                      <span className="text-xs font-bold text-m2m-accent-blue px-2 py-1 bg-m2m-accent-blue/20 rounded">
                        Medium
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-m2m-chart-yellow/10 rounded-lg border border-m2m-chart-yellow/30">
                      <div className="flex items-center space-x-3">
                        <TrendingDownIcon className="w-5 h-5 text-m2m-chart-yellow" />
                        <span className="text-sm font-medium text-m2m-text-primary">
                          Manufacturing
                        </span>
                      </div>
                      <span className="text-xs font-bold text-m2m-chart-yellow px-2 py-1 bg-m2m-chart-yellow/20 rounded">
                        Low
                      </span>
                    </div>
                  </div>
                </div>
                {/* Growth Potential Metrics */}
                <div className="bg-m2m-bg-card rounded-lg p-6 border border-m2m-divider">
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                    Growth Potential
                  </h3>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 mb-4">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-m2m-divider" />
                        <motion.circle cx="64" cy="64" r="56" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeDasharray="351.86" initial={{
                      strokeDashoffset: 351.86
                    }} animate={{
                      strokeDashoffset: 35.186
                    }} transition={{
                      duration: 2,
                      ease: 'easeOut'
                    }} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0052D4" />
                            <stop offset="100%" stopColor="#00B3A4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span initial={{
                      opacity: 0,
                      scale: 0.5
                    }} animate={{
                      opacity: 1,
                      scale: 1
                    }} transition={{
                      delay: 0.5
                    }} className="text-3xl font-bold text-m2m-text-primary">
                          90%
                        </motion.span>
                      </div>
                    </div>
                    <p className="text-sm text-m2m-text-secondary text-center mb-4">
                      Excellent growth potential in this area
                    </p>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <div className="text-center p-2 bg-m2m-bg-primary rounded-lg">
                        <p className="text-lg font-bold text-m2m-accent-blue">
                          +15%
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          YoY Growth
                        </p>
                      </div>
                      <div className="text-center p-2 bg-m2m-bg-primary rounded-lg">
                        <p className="text-lg font-bold text-m2m-success">24</p>
                        <p className="text-xs text-m2m-text-secondary">
                          New Businesses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* NEW SECTION: Ready to Start Your Business Journey */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.8
        }} className="bg-gradient-to-br from-m2m-accent-blue/5 to-m2m-accent-teal/5 rounded-xl shadow-lg p-8 border border-m2m-divider">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-m2m-text-primary mb-3">
                  Ready to Start Your Business Journey?
                </h2>
                <p className="text-m2m-text-secondary max-w-2xl mx-auto">
                  Whether you are launching a new venture or optimizing an
                  existing one, we have the tools and insights to help you
                  succeed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Start New Business Card */}
                <motion.div whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider hover:border-m2m-accent-blue transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full mb-4 mx-auto">
                    <RocketIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-m2m-text-primary mb-3 text-center">
                    Start New Business
                  </h3>
                  <p className="text-sm text-m2m-text-secondary mb-6 text-center">
                    Launch your business with guided setup, documentation
                    support, and legal assistance. Get started in minutes.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Step-by-step business registration</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Legal documentation templates</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Permit application assistance</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>AI-powered business plan generator</span>
                    </li>
                  </ul>
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => setShowBusinessRegistrationPanel(true)} className="w-full px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    Get Started
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </motion.button>
                </motion.div>
                {/* Manage Existing Business Card */}
                <motion.div whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider hover:border-m2m-accent-teal transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-m2m-accent-teal to-m2m-accent-blue rounded-full mb-4 mx-auto">
                    <ManageIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-m2m-text-primary mb-3 text-center">
                    Manage Existing Business
                  </h3>
                  <p className="text-sm text-m2m-text-secondary mb-6 text-center">
                    Optimize operations, expand your reach, and unlock growth
                    opportunities with AI-powered insights.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Performance analytics dashboard</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Market expansion recommendations</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Supplier network optimization</span>
                    </li>
                    <li className="flex items-start text-sm text-m2m-text-secondary">
                      <CheckCircleIcon className="w-4 h-4 text-m2m-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Automated compliance monitoring</span>
                    </li>
                  </ul>
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="w-full px-6 py-3 bg-gradient-to-r from-m2m-accent-teal to-m2m-accent-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    Optimize Now
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
      {/* Supplier Details Modal with Premium Design */}
      <AnimatePresence>
        {selectedSupplier && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedSupplier(null)}>
            <motion.div initial={{
          scale: 0.9,
          y: 20,
          opacity: 0
        }} animate={{
          scale: 1,
          y: 0,
          opacity: 1
        }} exit={{
          scale: 0.9,
          y: 20,
          opacity: 0
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300
        }} className="glass-panel rounded-2xl shadow-nearbuy-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-m2m-nearbuy-green/30" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-nearbuy-gradient rounded-full flex items-center justify-center shadow-nearbuy-glow">
                      <StoreIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold gradient-text">
                        {selectedSupplier.name}
                      </h2>
                      <p className="text-sm text-m2m-text-secondary">
                        {selectedSupplier.type}
                      </p>
                    </div>
                  </div>
                  <motion.button whileHover={{
                scale: 1.1,
                rotate: 90
              }} whileTap={{
                scale: 0.9
              }} onClick={() => setSelectedSupplier(null)} className="p-2 nearbuy-card rounded-lg transition-all">
                    <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Rating & Distance with Gradient */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center px-4 py-2 nearbuy-card rounded-lg">
                      <StarIcon className="w-5 h-5 text-m2m-chart-yellow fill-current mr-2" />
                      <span className="text-lg font-semibold gradient-text">
                        {selectedSupplier.rating}
                      </span>
                      <span className="text-sm text-m2m-text-secondary ml-1">
                        / 5.0
                      </span>
                    </div>
                    <div className="flex items-center px-4 py-2 nearbuy-card rounded-lg">
                      <MapPinIcon className="w-5 h-5 text-m2m-nearbuy-teal mr-2" />
                      <span className="text-sm text-m2m-text-secondary">
                        {selectedSupplier.distance}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="nearbuy-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold gradient-text mb-2">
                      About
                    </h3>
                    <p className="text-sm text-m2m-text-secondary">
                      {selectedSupplier.description}
                    </p>
                  </div>

                  {/* Products Section with Scroll Animation */}
                  <div className="nearbuy-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold gradient-text mb-3 flex items-center">
                      <PackageIcon className="w-5 h-5 mr-2 text-m2m-nearbuy-green" />
                      Products ({selectedSupplier.products.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {selectedSupplier.products.map((product, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    x: -10
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: index * 0.02
                  }} className="flex items-center space-x-2 p-2 bg-nearbuy-soft rounded-lg border border-m2m-nearbuy-green/20 hover:border-m2m-nearbuy-teal/50 transition-all hover-lift">
                          <PackageIcon className="w-4 h-4 text-m2m-nearbuy-teal flex-shrink-0" />
                          <span className="text-sm text-m2m-text-secondary truncate">
                            {product}
                          </span>
                        </motion.div>)}
                    </div>
                  </div>

                  {/* Services Section with Gradient Badges */}
                  <div className="nearbuy-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold gradient-text mb-3 flex items-center">
                      <TruckIcon className="w-5 h-5 mr-2 text-m2m-nearbuy-teal" />
                      Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplier.servicesOffered.map((service, idx) => <motion.span key={idx} initial={{
                    opacity: 0,
                    scale: 0.8
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} transition={{
                    delay: idx * 0.05
                  }} className="text-xs px-3 py-1.5 bg-nearbuy-soft text-m2m-nearbuy-teal rounded-full border border-m2m-nearbuy-teal/30 hover:border-m2m-nearbuy-teal hover:shadow-nearbuy-sm transition-all cursor-pointer">
                          {service}
                        </motion.span>)}
                    </div>
                  </div>

                  {/* Contact Information with Icons */}
                  <div className="nearbuy-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold gradient-text mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <motion.div whileHover={{
                    x: 4
                  }} className="flex items-center space-x-3 p-3 bg-nearbuy-soft rounded-lg hover:shadow-nearbuy-sm transition-all">
                        <MailIcon className="w-5 h-5 text-m2m-nearbuy-blue" />
                        <span className="text-sm text-m2m-text-secondary">
                          {selectedSupplier.contact.email}
                        </span>
                      </motion.div>
                      <motion.div whileHover={{
                    x: 4
                  }} className="flex items-center space-x-3 p-3 bg-nearbuy-soft rounded-lg hover:shadow-nearbuy-sm transition-all">
                        <PhoneIcon className="w-5 h-5 text-m2m-nearbuy-teal" />
                        <span className="text-sm text-m2m-text-secondary">
                          {selectedSupplier.contact.phone}
                        </span>
                      </motion.div>
                      <motion.div whileHover={{
                    x: 4
                  }} className="flex items-center space-x-3 p-3 bg-nearbuy-soft rounded-lg hover:shadow-nearbuy-sm transition-all">
                        <MapPinIcon className="w-5 h-5 text-m2m-nearbuy-green" />
                        <span className="text-sm text-m2m-text-secondary">
                          {selectedSupplier.address}
                        </span>
                      </motion.div>
                      <motion.div whileHover={{
                    x: 4
                  }} className="flex items-center space-x-3 p-3 bg-nearbuy-soft rounded-lg hover:shadow-nearbuy-sm transition-all">
                        <ClockIcon className="w-5 h-5 text-m2m-nearbuy-green" />
                        <span className="text-sm text-m2m-text-secondary">
                          {selectedSupplier.businessHours}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Action Buttons with Premium Gradient */}
                  <div className="flex space-x-3 pt-4">
                    <motion.button whileHover={{
                  scale: 1.02,
                  y: -2
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => handleShopRedirect(selectedSupplier.id)} className="flex-1 px-6 py-3 btn-nearbuy text-white rounded-lg font-semibold shadow-nearbuy-md hover:shadow-nearbuy-lg transition-all duration-300 flex items-center justify-center button-press">
                      <PackageIcon className="w-5 h-5 mr-2" />
                      View Products
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.02,
                  y: -2
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => {
                  setContactSupplier(selectedSupplier);
                  setShowContactModal(true);
                  setSelectedSupplier(null);
                }} className="flex-1 px-6 py-3 nearbuy-card text-m2m-nearbuy-teal rounded-lg font-semibold shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all duration-300 flex items-center justify-center button-press">
                      <MessageSquareIcon className="w-5 h-5 mr-2" />
                      Contact
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && contactSupplier && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => {
        setShowContactModal(false);
        setContactSupplier(null);
      }}>
            <motion.div initial={{
          scale: 0.9,
          y: 20
        }} animate={{
          scale: 1,
          y: 0
        }} exit={{
          scale: 0.9,
          y: 20
        }} transition={{
          type: 'spring',
          damping: 25
        }} className="bg-m2m-bg-card rounded-2xl shadow-2xl max-w-md w-full border border-m2m-divider" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-m2m-text-primary">
                    Contact Supplier
                  </h2>
                  <button onClick={() => {
                setShowContactModal(false);
                setContactSupplier(null);
              }} className="p-2 hover:bg-m2m-bg-primary rounded-lg transition-colors">
                    <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                  </button>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-m2m-text-secondary">
                    Send a message to{' '}
                    <span className="font-semibold text-m2m-text-primary">
                      {contactSupplier.name}
                    </span>
                  </p>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Your Name
                    </label>
                    <input type="text" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Your Email
                    </label>
                    <input type="email" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Message
                    </label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors resize-none" placeholder="Write your message here..." />
                  </div>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <MessageSquareIcon className="w-5 h-5 mr-2" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Business Registration Panel */}
      <AnimatePresence>
        {showBusinessRegistrationPanel && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowBusinessRegistrationPanel(false)}>
            <motion.div initial={{
          scale: 0.9,
          y: 20,
          opacity: 0
        }} animate={{
          scale: 1,
          y: 0,
          opacity: 1
        }} exit={{
          scale: 0.9,
          y: 20,
          opacity: 0
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300
        }} className="glass-panel rounded-2xl shadow-nearbuy-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-m2m-nearbuy-green/30" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-nearbuy-gradient rounded-full flex items-center justify-center shadow-nearbuy-glow">
                      <RocketIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold gradient-text">
                        Start Your Business Journey
                      </h2>
                      <p className="text-sm text-m2m-text-secondary">
                        Launch your business with guided setup, documentation
                        support, and legal assistance.
                      </p>
                    </div>
                  </div>
                  <motion.button whileHover={{
                scale: 1.1,
                rotate: 90
              }} whileTap={{
                scale: 0.9
              }} onClick={() => setShowBusinessRegistrationPanel(false)} className="p-2 nearbuy-card rounded-lg transition-all">
                    <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                  </motion.button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                          Business Name
                        </label>
                        <input type="text" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="Enter your business name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                          Business Category
                        </label>
                        <select className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary appearance-none focus:outline-none focus:border-m2m-accent-blue transition-colors cursor-pointer">
                          <option value="">Select a category...</option>
                          {businessCategories.map((category, index) => <option key={index} value={category}>
                              {category}
                            </option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                          Your Name
                        </label>
                        <input type="text" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                          Email
                        </label>
                        <input type="email" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="your@email.com" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Business Address
                    </h3>
                    <input type="text" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors" placeholder="Enter your business address" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-m2m-text-primary mb-3">
                      Business Description
                    </h3>
                    <textarea rows={4} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors resize-none" placeholder="Describe your business and services" />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => setShowBusinessRegistrationPanel(false)} className="flex-1 px-6 py-3 nearbuy-card text-m2m-nearbuy-teal rounded-lg font-semibold shadow-nearbuy-sm hover:shadow-nearbuy-md transition-all duration-300 flex items-center justify-center">
                      Cancel
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="flex-1 px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                      Submit Application
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}