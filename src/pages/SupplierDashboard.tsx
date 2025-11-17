import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { PackageIcon, ShoppingCartIcon, TruckIcon, TrendingUpIcon, MapPinIcon, SearchIcon, BellIcon, MessageSquareIcon, UserIcon, ChevronDownIcon, BarChart3Icon, LineChartIcon, ShieldCheckIcon, AlertTriangleIcon, SparklesIcon, TargetIcon, UsersIcon, DollarSignIcon, BriefcaseIcon, ZapIcon, StarIcon, PhoneIcon, MapIcon, LayersIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
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
export default function SupplierDashboard() {
  const [activeMapView, setActiveMapView] = useState('zone');
  const statsCards = [{
    title: 'Active Products',
    value: '247',
    change: '+12%',
    icon: PackageIcon,
    color: 'from-blue-500 to-cyan-500'
  }, {
    title: 'Total Orders',
    value: '1,834',
    change: '+23%',
    icon: ShoppingCartIcon,
    color: 'from-purple-500 to-pink-500'
  }, {
    title: 'Pending Shipments',
    value: '42',
    change: '-8%',
    icon: TruckIcon,
    color: 'from-orange-500 to-red-500'
  }, {
    title: 'Sales Analytics',
    value: '₱2.4M',
    change: '+18%',
    icon: TrendingUpIcon,
    color: 'from-green-500 to-emerald-500'
  }];
  const logisticsPartners = [{
    name: 'FastShip Logistics',
    distance: '2.3 km',
    type: 'truck',
    rating: 4.8
  }, {
    name: 'Ocean Freight Co.',
    distance: '5.1 km',
    type: 'ship',
    rating: 4.6
  }, {
    name: 'Express Cargo',
    distance: '1.8 km',
    type: 'truck',
    rating: 4.9
  }];
  const swotData = [{
    title: 'Strengths',
    icon: '💪',
    items: ['Strong supplier network', 'Competitive pricing', 'Fast delivery'],
    color: 'from-green-400/20 to-emerald-400/20'
  }, {
    title: 'Weaknesses',
    icon: '⚠️',
    items: ['Limited product range', 'Seasonal demand', 'Storage capacity'],
    color: 'from-yellow-400/20 to-orange-400/20'
  }, {
    title: 'Opportunities',
    icon: '🌱',
    items: ['Market expansion', 'New partnerships', 'Digital growth'],
    color: 'from-blue-400/20 to-cyan-400/20'
  }, {
    title: 'Threats',
    icon: '🔥',
    items: ['Competition', 'Regulations', 'Supply chain risks'],
    color: 'from-red-400/20 to-pink-400/20'
  }];
  const demographics = [{
    label: 'Total Population',
    value: '1.2M',
    icon: UsersIcon
  }, {
    label: 'Income Range',
    value: '₱25K-45K',
    icon: DollarSignIcon
  }, {
    label: 'Employment Rate',
    value: '87%',
    icon: BriefcaseIcon
  }, {
    label: 'Business Growth',
    value: '+15%',
    icon: TrendingUpIcon
  }];
  // Butuan City center coordinates
  const centerPosition: [number, number] = [8.9475, 125.5406];
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
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      {/* Custom Header */}
      <div className="bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-['Poppins']">LANTAW.AI</h1>
            <p className="text-sm text-white/80">
              Business Intelligence Platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <MessageSquareIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <UserIcon className="w-5 h-5" />
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm font-medium">
              Switch to Business View
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Overview Cards */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </motion.div>)}
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
            delay: 0.4
          }} className="lg:fixed lg:top-24 lg:w-[calc((100%-8rem)*2/3-1rem)] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden" style={{
            maxWidth: '100%'
          }}>
              <div className="flex flex-col h-[600px]">
                {/* Map Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50 flex-shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <MapIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Interactive Zone Map
                  </h2>
                  <p className="text-sm text-gray-600">
                    Real-time location insights and zone analysis
                  </p>
                </div>
                {/* Map Controls */}
                <div className="px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveMapView('zone')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'zone' ? 'bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Zone Info
                    </button>
                    <button onClick={() => setActiveMapView('businesses')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'businesses' ? 'bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Nearby Businesses
                    </button>
                    <button onClick={() => setActiveMapView('ai')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeMapView === 'ai' ? 'bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      AI Recommendations
                    </button>
                  </div>
                </div>
                {/* Map Container - Fixed Height with Overflow Hidden */}
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} style={{
                    height: '100%',
                    width: '100%'
                  }} zoomControl={false}>
                      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
                      <ZoomControl position="bottomright" />
                      {/* Zone Rectangles */}
                      {activeMapView === 'zone' && zones.map((zone, index) => <Rectangle key={index} bounds={zone.bounds} pathOptions={{
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
                                {zone.aiScore > 0 && activeMapView === 'ai' && <div className="flex items-center space-x-2 mb-2">
                                    <SparklesIcon className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-blue-600">
                                      AI Score: {zone.aiScore}%
                                    </span>
                                  </div>}
                                <p className="text-xs text-gray-600">
                                  Click for detailed analysis
                                </p>
                              </div>
                            </Popup>
                          </Rectangle>)}
                      {/* AI Recommended Markers */}
                      {activeMapView === 'ai' && <>
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
                                  High potential location
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
                      {/* Nearby Businesses */}
                      {activeMapView === 'businesses' && <>
                          <Marker position={[8.955, 125.545]} icon={businessIcon}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900 mb-1">
                                  ABC Trading Co.
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">
                                  Retail & Shopping
                                </p>
                                <div className="flex items-center">
                                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs">4.8 · 0.5km</span>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                          <Marker position={[8.94, 125.535]} icon={businessIcon}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900 mb-1">
                                  Metro Logistics
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">
                                  Logistics & Transport
                                </p>
                                <div className="flex items-center">
                                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs">4.9 · 1.2km</span>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        </>}
                    </MapContainer>
                  </div>
                </div>
                {/* Map Footer Stats */}
                <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">8</p>
                      <p className="text-xs text-gray-600">Zones</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">
                        817km²
                      </p>
                      <p className="text-xs text-gray-600">Coverage</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">95%</p>
                      <p className="text-xs text-gray-600">AI Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">247</p>
                      <p className="text-xs text-gray-600">Businesses</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Spacer for mobile */}
            <div className="lg:hidden h-[600px]"></div>
          </div>
          {/* Scrollable Content - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logistics & Connections Panel */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="w-5 h-5 mr-2 text-orange-600" />
                Nearby Logistics
              </h2>
              <div className="space-y-3">
                {logisticsPartners.map((partner, index) => <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <TruckIcon className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {partner.name}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium">
                          {partner.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      📍 {partner.distance} away
                    </p>
                    <button className="w-full px-3 py-2 bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      Contact
                    </button>
                  </div>)}
              </div>
            </motion.div>
            {/* SWOT Analysis */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7
          }} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TargetIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Quick SWOT
              </h2>
              <div className="space-y-4">
                {swotData.slice(0, 2).map((item, index) => <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border border-white/20`}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <ul className="space-y-1">
                      {item.items.slice(0, 2).map((point, i) => <li key={i} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{point}</span>
                        </li>)}
                    </ul>
                  </div>)}
              </div>
            </motion.div>
            {/* Demographics */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.8
          }} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <UsersIcon className="w-5 h-5 mr-2 text-green-600" />
                Demographics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {demographics.map((item, index) => <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                    <item.icon className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>
        {/* Location & Regulation Panel */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <LayersIcon className="w-6 h-6 mr-2 text-purple-600" />
            Location & Regulation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Coordinates</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-medium">14.5995° N</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-medium">120.9842° E</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mt-6 mb-3">
                Zone Classification
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Zone Type:</span>
                  <span className="font-medium">Commercial C-3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hazard Level:</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Permit Checklist
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Business Permit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Fire Safety Certificate</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-gray-700">Environmental Clearance</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mt-6 mb-3">
                Nearby Operators
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">ABC Trading Co.</span>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm">4.8 · 0.5km</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">XYZ Logistics</span>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm">4.6 · 1.2km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* SWOT Analysis */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7
      }} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TargetIcon className="w-6 h-6 mr-2 text-indigo-600" />
            SWOT Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {swotData.map((item, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.7 + index * 0.1
          }} className={`bg-gradient-to-br ${item.color} backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((point, i) => <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </li>)}
                </ul>
              </motion.div>)}
          </div>
        </motion.div>
        {/* Market Data & Demographics */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8
      }} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <UsersIcon className="w-6 h-6 mr-2 text-green-600" />
            Market Data & Demographics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demographics.map((item, index) => <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0052D4] to-[#FF6A00]" style={{
                  width: '75%'
                }}></div>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{item.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>)}
          </div>
        </motion.div>
        {/* AI Insights Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.9
      }} className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-purple-600" />
            AI-Powered Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Suggested Product Lines
              </h3>
              <div className="space-y-3">
                <div className="bg-white/80 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      Organic Vegetables
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      High Demand
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{
                    width: '85%'
                  }}></div>
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      Eco-Friendly Packaging
                    </span>
                    <span className="text-sm text-blue-600 font-semibold">
                      Growing
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{
                    width: '72%'
                  }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Success Potential
              </h3>
              <div className="bg-white/80 rounded-lg p-6 text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="35.186" strokeLinecap="round" transform="rotate(-90 64 64)" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0052D4" />
                        <stop offset="100%" stopColor="#FF6A00" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      92%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 mb-4">
                  High confidence in market success
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-[#0052D4] to-[#FF6A00] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center mx-auto">
                  <ZapIcon className="w-5 h-5 mr-2" />
                  Apply Suggestion
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Analytics Charts */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.0
      }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3Icon className="w-5 h-5 mr-2 text-blue-600" />
                Monthly Orders
              </h3>
              <button className="text-gray-500 hover:text-gray-700">
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
              <BarChart3Icon className="w-24 h-24 text-blue-600/20" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <LineChartIcon className="w-5 h-5 mr-2 text-orange-600" />
                Revenue Growth
              </h3>
              <button className="text-gray-500 hover:text-gray-700">
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center">
              <LineChartIcon className="w-24 h-24 text-orange-600/20" />
            </div>
          </div>
        </motion.div>
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md">
            <Link to="/supplier/orders" className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
              <TruckIcon className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Order History</h3>
              <p className="text-sm text-gray-600">Track your orders</p>
            </Link>
          </div>
        </div>
        {/* Footer */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.1
      }} className="bg-gradient-to-r from-[#0052D4] to-[#FF6A00] rounded-2xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join the LANTAW Network</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div>
              <div className="text-3xl font-bold">2,847</div>
              <div className="text-sm text-white/80">Active Suppliers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5,234</div>
              <div className="text-sm text-white/80">Verified Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">12,456</div>
              <div className="text-sm text-white/80">Matched Businesses</div>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:shadow-2xl transition-all inline-flex items-center">
            <ZapIcon className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </button>
        </motion.div>
      </div>
    </div>;
}