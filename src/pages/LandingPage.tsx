import React, { useEffect, useState, useRef, Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import AuthModal from '../components/AuthModal';
import ThemeToggle from '../components/ThemeToggle';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BrainIcon, BarChart3Icon, MapIcon, NetworkIcon, PlayCircleIcon, CheckCircleIcon, StarIcon, TrendingUpIcon, UsersIcon, TargetIcon, SparklesIcon, ZapIcon, BuildingIcon, HomeIcon, FactoryIcon, GraduationCapIcon, HeartPulseIcon, TreesIcon, AlertTriangleIcon, StoreIcon, MapPinIcon, XIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngBounds } from 'leaflet';
// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}</span>;
}
// Enhanced Ambient Background Particles
function AmbientParticles() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => <motion.div key={i} className="absolute ambient-particle" initial={{
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      scale: Math.random() * 0.5 + 0.5
    }} animate={{
      x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
      y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
      scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.7, Math.random() * 0.5 + 0.5],
      opacity: [0.2, 0.4, 0.2]
    }} transition={{
      duration: Math.random() * 15 + 10,
      repeat: Infinity,
      ease: 'linear'
    }} />)}
    </div>;
}
// Map Auto-Fit Component
function MapAutoFit({
  bounds
}: {
  bounds: LatLngBounds | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      });
    }
  }, [bounds, map]);
  return null;
}
export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const [showBusinessPanel, setShowBusinessPanel] = useState(false);
  const {
    scrollY
  } = useScroll();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };
  const features = [{
    icon: BrainIcon,
    title: 'AI Location Scoring',
    description: 'Advanced algorithms analyze demographics, foot traffic, and market trends to score optimal business locations.',
    gradient: 'from-m2m-neon-cyan to-m2m-electric-aqua'
  }, {
    icon: BarChart3Icon,
    title: 'Market Demand Analytics',
    description: 'Real-time insights into consumer behavior, spending patterns, and market saturation levels.',
    gradient: 'from-m2m-neon-blue to-m2m-electric-aqua'
  }, {
    icon: MapIcon,
    title: 'Competitor Heatmap',
    description: 'Visualize competitor density and identify underserved markets with our interactive heatmap.',
    gradient: 'from-m2m-electric-aqua to-m2m-neon-cyan'
  }, {
    icon: NetworkIcon,
    title: 'Supplier Network Connections',
    description: 'Connect with verified suppliers and distributors in your target area instantly.',
    gradient: 'from-m2m-neon-blue to-m2m-neon-cyan'
  }];
  const testimonials = [{
    name: 'Sarah Chen',
    role: 'Restaurant Owner',
    content: 'MAP2MARKET helped us find the perfect location. Our foot traffic increased by 240% in the first quarter!',
    rating: 5
  }, {
    name: 'Michael Rodriguez',
    role: 'Real Estate Developer',
    content: 'The AI insights are incredibly accurate. We saved months of research and made data-driven decisions.',
    rating: 5
  }, {
    name: 'Emily Watson',
    role: 'Franchise Owner',
    content: 'The supplier network feature alone paid for itself. Highly recommend for any business expansion.',
    rating: 5
  }];
  // Enhanced Zone data with 8 categories for Tandag City
  const zones = [{
    id: 1,
    name: 'Commercial District',
    type: 'commercial',
    coordinates: [[9.0785, 126.1975], [9.0785, 126.2025], [9.0735, 126.2025], [9.0735, 126.1975]] as [number, number][],
    color: '#00D9FF',
    icon: BuildingIcon,
    businesses: 245,
    growth: '+23%',
    description: 'Primary business and commerce hub'
  }, {
    id: 2,
    name: 'Residential Area',
    type: 'residential',
    coordinates: [[9.0835, 126.1925], [9.0835, 126.1975], [9.0785, 126.1975], [9.0785, 126.1925]] as [number, number][],
    color: '#36C275',
    icon: HomeIcon,
    businesses: 89,
    growth: '+15%',
    description: 'Dense housing and living communities'
  }, {
    id: 3,
    name: 'Mixed-Use Development',
    type: 'mixed',
    coordinates: [[9.0735, 126.2025], [9.0735, 126.2075], [9.0685, 126.2075], [9.0685, 126.2025]] as [number, number][],
    color: '#F89C36',
    icon: StoreIcon,
    businesses: 198,
    growth: '+28%',
    description: 'Combined residential and commercial zones'
  }, {
    id: 4,
    name: 'Educational Zone',
    type: 'educational',
    coordinates: [[9.0835, 126.1975], [9.0835, 126.2025], [9.0785, 126.2025], [9.0785, 126.1975]] as [number, number][],
    color: '#FFD166',
    icon: GraduationCapIcon,
    businesses: 45,
    growth: '+12%',
    description: 'Schools, universities, and training centers'
  }, {
    id: 5,
    name: 'Healthcare District',
    type: 'healthcare',
    coordinates: [[9.0685, 126.1925], [9.0685, 126.1975], [9.0635, 126.1975], [9.0635, 126.1925]] as [number, number][],
    color: '#FF6B9D',
    icon: HeartPulseIcon,
    businesses: 67,
    growth: '+18%',
    description: 'Medical facilities and health services'
  }, {
    id: 6,
    name: 'Recreational Area',
    type: 'recreational',
    coordinates: [[9.0885, 126.1975], [9.0885, 126.2025], [9.0835, 126.2025], [9.0835, 126.1975]] as [number, number][],
    color: '#7CFF8A',
    icon: TreesIcon,
    businesses: 34,
    growth: '+8%',
    description: 'Parks, entertainment, and leisure spaces'
  }, {
    id: 7,
    name: 'Industrial Zone',
    type: 'industrial',
    coordinates: [[9.0635, 126.2025], [9.0635, 126.2075], [9.0585, 126.2075], [9.0585, 126.2025]] as [number, number][],
    color: '#64748B',
    icon: FactoryIcon,
    businesses: 156,
    growth: '+20%',
    description: 'Manufacturing and industrial facilities'
  }, {
    id: 8,
    name: 'Hazard Area',
    type: 'hazard',
    coordinates: [[9.0585, 126.1925], [9.0585, 126.1975], [9.0535, 126.1975], [9.0535, 126.1925]] as [number, number][],
    color: '#EF4444',
    icon: AlertTriangleIcon,
    businesses: 0,
    growth: 'N/A',
    description: 'High-risk and restricted zones'
  }];
  // Business suggestions near Tandag City
  const businessSuggestions = [{
    id: 1,
    name: 'Tandag Coffee House',
    category: 'Food & Beverage',
    position: [9.0765, 126.2] as [number, number],
    address: 'Downtown Tandag',
    distance: '0.5 km',
    aiScore: 92
  }, {
    id: 2,
    name: 'Pacific Retail Store',
    category: 'Retail',
    position: [9.0795, 126.1985] as [number, number],
    address: 'Commercial Center',
    distance: '0.8 km',
    aiScore: 88
  }, {
    id: 3,
    name: 'Surigao Supply Co.',
    category: 'Supplier',
    position: [9.0745, 126.204] as [number, number],
    address: 'Industrial Park',
    distance: '1.2 km',
    aiScore: 85
  }, {
    id: 4,
    name: 'Mindanao Tech Hub',
    category: 'Technology',
    position: [9.081, 126.1995] as [number, number],
    address: 'Business District',
    distance: '0.6 km',
    aiScore: 90
  }];
  // Custom marker icons with neon glow
  const createCustomIcon = (color: string) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  return <div className="w-full min-h-screen bg-m2m-bg-primary relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-m2m-deep-navy/95 via-m2m-midnight-blue/95 to-m2m-deep-teal/95 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,102,255,0.1),transparent_50%)]" />
      </div>
      {/* Ambient Particles */}
      <AmbientParticles />
      {/* Premium Navigation */}
      <motion.nav initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }} className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-panel shadow-neon-glow-sm border-b border-m2m-neon-cyan/30' : 'bg-m2m-bg-card/60 backdrop-blur-xl border-b border-m2m-divider/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="hidden md:flex justify-between items-center">
              <motion.div className="flex-shrink-0" whileHover={{
              scale: 1.05
            }} transition={{
              type: 'spring',
              stiffness: 400
            }}>
                <Logo size="sm" showText={true} />
              </motion.div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                {['features', 'pricing', 'insights', 'contact'].map(item => <motion.a key={item} href={`#${item}`} className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors text-sm font-medium relative group" whileHover={{
                y: -2
              }}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-m2m-neon-cyan to-m2m-electric-aqua group-hover:w-full transition-all duration-300" />
                  </motion.a>)}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <ThemeToggle />
                <motion.button onClick={() => openAuthModal('login')} className="px-4 lg:px-6 py-2 glow-border rounded-lg font-medium transition-all text-sm whitespace-nowrap text-m2m-neon-cyan" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <span className="relative z-10">Sign In</span>
                </motion.button>
                <motion.button onClick={() => openAuthModal('register')} className="px-4 lg:px-6 py-2 btn-premium text-white rounded-lg font-medium text-sm whitespace-nowrap shadow-neon-glow-sm" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <span className="relative z-10">Get Started Free</span>
                </motion.button>
              </div>
            </div>
            <div className="md:hidden flex flex-col items-center space-y-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center scale-125">
                  <Logo size="sm" showText={true} />
                </div>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center space-x-4 w-full">
                {['features', 'pricing', 'insights', 'contact'].map(item => <a key={item} href={`#${item}`} className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors text-sm font-medium">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>)}
              </div>
              <div className="flex items-center gap-2 w-full max-w-sm">
                <button onClick={() => openAuthModal('login')} className="flex-1 px-3 py-2 glow-border rounded-lg font-medium text-m2m-neon-cyan transition-all text-sm">
                  Sign In
                </button>
                <button onClick={() => openAuthModal('register')} className="flex-1 px-3 py-2 btn-premium text-white rounded-lg font-medium text-sm shadow-neon-glow-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-30" animate={{
        background: ['radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, rgba(0, 102, 255, 0.2) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)']
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear'
      }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-6 shadow-neon-glow-sm">
              <SparklesIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-semibold premium-gradient-text">
                Next-Gen Location Intelligence
              </span>
            </motion.div>
            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="text-5xl md:text-7xl font-bold text-m2m-text-primary mb-6 leading-tight">
              Discover Strategic Business
              <br />
              Locations with{' '}
              <motion.span className="premium-gradient-text inline-block" animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear'
            }} style={{
              backgroundSize: '200% 200%'
            }}>
                NEARBUY
              </motion.span>
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="text-xl text-m2m-text-primary/90 mb-8 max-w-3xl mx-auto">
              Empowering businesses and developers through AI-driven map
              intelligence with real-time satellite imagery and advanced
              analytics.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5
          }} className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <motion.button onClick={() => openAuthModal('register')} className="px-8 py-4 btn-premium text-white rounded-xl font-semibold text-lg shadow-neon-glow relative overflow-hidden group" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <span className="relative z-10 flex items-center gap-2">
                  <ZapIcon className="w-5 h-5" />
                  Start Free
                </span>
              </motion.button>
              <motion.button className="px-8 py-4 glass-panel text-m2m-text-primary rounded-xl font-semibold text-lg flex items-center gap-2" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <PlayCircleIcon className="w-5 h-5 text-m2m-neon-cyan" />
                <span className="relative z-10">Watch Demo</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* REORDERED: Interactive Map Section - Now directly below hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-12">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4 shadow-neon-glow-sm" whileHover={{
            scale: 1.05
          }}>
              <MapIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-semibold premium-gradient-text">
                AI-Powered Location Intelligence
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Explore Business Zones with{' '}
              <span className="premium-gradient-text relative">
                Interactive Maps
                <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent" animate={{
                opacity: [0.5, 1, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </span>
            </h2>
            <p className="text-xl text-m2m-text-secondary max-w-3xl mx-auto">
              Real-time satellite imagery with advanced zone classifications and
              comprehensive area insights
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Enhanced Manila CBD Card */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="lg:col-span-1 space-y-6">
              <motion.div className="glass-panel-strong rounded-2xl shadow-premium-depth p-6 glow-border-animated relative overflow-hidden group" whileHover={{
              scale: 1.02,
              y: -8
            }} transition={{
              type: 'spring',
              stiffness: 300
            }}>
                <div className="absolute inset-0 bg-gradient-to-br from-m2m-neon-cyan/10 via-m2m-neon-blue/10 to-m2m-electric-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mini-map-container mb-4 h-48 relative">
                  <div className="mini-map-overlay" />
                  <MapContainer center={[9.076, 126.1995]} zoom={14} scrollWheelZoom={false} zoomControl={false} dragging={false} style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '12px'
                }}>
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Esri" />
                    {zones.slice(0, 3).map(zone => <Polygon key={zone.id} positions={zone.coordinates} pathOptions={{
                    color: zone.color,
                    fillColor: zone.color,
                    fillOpacity: 0.3,
                    weight: 2
                  }} />)}
                  </MapContainer>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold premium-gradient-text">
                      Tandag City
                    </h3>
                    <motion.div className="px-3 py-1 bg-m2m-neon-cyan/20 rounded-full" animate={{
                    scale: [1, 1.05, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }}>
                      <span className="text-xs font-bold text-m2m-neon-cyan">
                        LIVE
                      </span>
                    </motion.div>
                  </div>
                  <p className="text-sm text-m2m-text-secondary mb-4">
                    Strategic coastal city with excellent business potential and
                    growing economy
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <span className="text-sm text-m2m-text-secondary">
                        AI Score
                      </span>
                      <span className="text-lg font-bold premium-gradient-text">
                        94/100
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <span className="text-sm text-m2m-text-secondary">
                        Business Density
                      </span>
                      <span className="text-sm font-semibold text-m2m-success">
                        High
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <span className="text-sm text-m2m-text-secondary">
                        Growth Rate
                      </span>
                      <span className="text-sm font-semibold text-m2m-neon-cyan">
                        +23% YoY
                      </span>
                    </div>
                  </div>
                  <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="w-full px-6 py-3 btn-premium text-white rounded-xl font-semibold shadow-neon-glow-sm">
                    Explore Area
                  </motion.button>
                </div>
              </motion.div>
              {/* Enhanced Zone Legend Panel */}
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="zone-legend-panel rounded-2xl p-6 sticky top-24">
                <h4 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
                  <SparklesIcon className="w-5 h-5 mr-2 text-m2m-neon-cyan" />
                  Zone Classifications
                </h4>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {zones.map((zone, index) => {
                  const ZoneIcon = zone.icon;
                  return <motion.div key={zone.id} initial={{
                    opacity: 0,
                    x: -20
                  }} whileInView={{
                    opacity: 1,
                    x: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: index * 0.05
                  }} className={`flex items-center justify-between p-3 glass-panel rounded-lg hover-lift cursor-pointer transition-all ${selectedZone === zone.id ? 'ring-2 ring-m2m-neon-cyan' : ''} ${hoveredZone === zone.id ? 'shadow-neon-glow-sm' : ''}`} onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)} onMouseEnter={() => setHoveredZone(zone.id)} onMouseLeave={() => setHoveredZone(null)}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center animate-zone-glow" style={{
                        backgroundColor: `${zone.color}20`,
                        border: `2px solid ${zone.color}`,
                        boxShadow: `0 0 10px ${zone.color}40`
                      }}>
                            <ZoneIcon className="w-5 h-5" style={{
                          color: zone.color
                        }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-m2m-text-primary">
                              {zone.name}
                            </p>
                            <p className="text-xs text-m2m-text-secondary">
                              {zone.businesses} businesses
                            </p>
                          </div>
                        </div>
                        <span className={`zone-badge zone-${zone.type}`}>
                          {zone.growth}
                        </span>
                      </motion.div>;
                })}
                </div>
              </motion.div>
            </motion.div>
            {/* Enhanced Main Satellite Map Container */}
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="lg:col-span-3 glass-panel-strong rounded-2xl p-6 glow-border-animated shadow-premium-depth">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-m2m-text-primary flex items-center">
                  <MapIcon className="w-6 h-6 mr-2 text-m2m-neon-cyan" />
                  Satellite Zone Map - Tandag City
                </h3>
                <div className="flex items-center gap-3">
                  <motion.button onClick={() => setShowBusinessPanel(!showBusinessPanel)} className="px-4 py-2 glass-panel rounded-lg text-sm font-semibold text-m2m-neon-cyan hover:bg-m2m-neon-cyan/10 transition-all flex items-center gap-2" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                    <MapPinIcon className="w-4 h-4" />
                    Business Suggestions
                  </motion.button>
                  <motion.div animate={{
                  opacity: [1, 0.5, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full">
                    <div className="w-2 h-2 bg-m2m-neon-cyan rounded-full animate-neon-pulse" />
                    <span className="text-xs font-bold text-m2m-neon-cyan">
                      REAL-TIME
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="relative">
                <div className="h-[700px] rounded-xl overflow-hidden border-2 border-m2m-neon-cyan/30 relative shadow-premium-depth">
                  <MapContainer center={[9.076, 126.1995]} zoom={14} scrollWheelZoom={true} style={{
                  height: '100%',
                  width: '100%'
                }}>
                    {/* Satellite Basemap */}
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" />
                    {/* Zone Polygons with Enhanced Styling */}
                    {zones.map(zone => <Polygon key={zone.id} positions={zone.coordinates} pathOptions={{
                    color: zone.color,
                    fillColor: zone.color,
                    fillOpacity: hoveredZone === zone.id || selectedZone === zone.id ? 0.4 : 0.2,
                    weight: hoveredZone === zone.id || selectedZone === zone.id ? 4 : 2,
                    className: 'animate-zone-glow'
                  }} eventHandlers={{
                    mouseover: () => setHoveredZone(zone.id),
                    mouseout: () => setHoveredZone(null),
                    click: () => setSelectedZone(zone.id === selectedZone ? null : zone.id)
                  }}>
                        <Popup>
                          <div className="p-3 min-w-[250px]">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                            backgroundColor: `${zone.color}20`,
                            border: `2px solid ${zone.color}`
                          }}>
                                <zone.icon className="w-5 h-5" style={{
                              color: zone.color
                            }} />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">
                                  {zone.name}
                                </h4>
                                <p className="text-xs text-gray-600">
                                  {zone.type}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="text-gray-700">
                                {zone.description}
                              </p>
                              <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-gray-600">
                                  Businesses:
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {zone.businesses}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Growth:</span>
                                <span className="font-semibold text-green-600">
                                  {zone.growth}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Polygon>)}
                    {/* Business Markers with Animated Ripples */}
                    {businessSuggestions.map(business => <Marker key={business.id} position={business.position} icon={createCustomIcon('#00D9FF')}>
                        <Popup>
                          <div className="p-3 min-w-[220px]">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {business.name}
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <StoreIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                  {business.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                  {business.address}
                                </span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-gray-600">Distance:</span>
                                <span className="font-semibold text-gray-900">
                                  {business.distance}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">AI Score:</span>
                                <span className="font-bold text-green-600">
                                  {business.aiScore}/100
                                </span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>)}
                    {/* Auto-fit bounds when zone is selected */}
                    {selectedZone && <MapAutoFit bounds={new LatLngBounds(zones.find(z => z.id === selectedZone)?.coordinates || [])} />}
                  </MapContainer>
                  {/* Map Overlay Info */}
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} whileInView={{
                  opacity: 1,
                  scale: 1
                }} viewport={{
                  once: true
                }} transition={{
                  delay: 0.5
                }} className="absolute top-4 right-4 glass-panel-strong rounded-lg p-4 shadow-neon-glow-sm max-w-xs">
                    <p className="text-xs font-semibold text-m2m-neon-cyan mb-2">
                      AI INSIGHTS
                    </p>
                    <p className="text-sm text-m2m-text-primary">
                      Analyzing{' '}
                      <span className="font-bold text-m2m-neon-cyan">834</span>{' '}
                      business locations in real-time
                    </p>
                  </motion.div>
                </div>
                {/* Business Suggestions Panel */}
                <motion.div initial={{
                x: 400,
                opacity: 0
              }} animate={{
                x: showBusinessPanel ? 0 : 400,
                opacity: showBusinessPanel ? 1 : 0
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }} className="absolute top-0 right-0 w-80 h-full glass-panel-strong rounded-xl p-6 shadow-premium-depth overflow-hidden" style={{
                pointerEvents: showBusinessPanel ? 'auto' : 'none'
              }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-m2m-text-primary flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-m2m-neon-cyan" />
                      Nearby Opportunities
                    </h4>
                    <motion.button onClick={() => setShowBusinessPanel(false)} className="p-1 hover:bg-m2m-neon-cyan/10 rounded-lg transition-colors" whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.9
                  }}>
                      <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                    </motion.button>
                  </div>
                  <div className="space-y-3 overflow-y-auto max-h-[calc(100%-60px)] pr-2">
                    {businessSuggestions.map((business, index) => <motion.div key={business.id} initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: index * 0.1
                  }} className="glass-panel rounded-lg p-4 hover-lift cursor-pointer" whileHover={{
                    scale: 1.02
                  }}>
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-m2m-text-primary">
                            {business.name}
                          </h5>
                          <motion.div className="px-2 py-1 bg-m2m-neon-cyan/20 rounded-full" animate={{
                        scale: [1, 1.05, 1]
                      }} transition={{
                        duration: 2,
                        repeat: Infinity
                      }}>
                            <span className="text-xs font-bold text-m2m-neon-cyan">
                              {business.aiScore}
                            </span>
                          </motion.div>
                        </div>
                        <p className="text-sm text-m2m-text-secondary mb-2">
                          {business.category}
                        </p>
                        <div className="flex items-center justify-between text-xs text-m2m-text-secondary">
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            {business.distance}
                          </span>
                          <span>{business.address}</span>
                        </div>
                      </motion.div>)}
                  </div>
                </motion.div>
              </div>
              {/* Enhanced Map Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {[{
                label: 'Zones',
                value: '8',
                color: 'neon-cyan',
                icon: MapIcon
              }, {
                label: 'Businesses',
                value: '834',
                color: 'neon-blue',
                icon: StoreIcon
              }, {
                label: 'Coverage',
                value: '52km²',
                color: 'electric-aqua',
                icon: TargetIcon
              }, {
                label: 'Accuracy',
                value: '98%',
                color: 'neon-teal',
                icon: CheckCircleIcon
              }].map((stat, index) => {
                const StatIcon = stat.icon;
                return <motion.div key={index} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: 0.3 + index * 0.1
                }} whileHover={{
                  scale: 1.05,
                  y: -4
                }} className="glass-panel rounded-lg p-4 text-center cursor-pointer group">
                      <StatIcon className={`w-6 h-6 mx-auto mb-2 text-m2m-${stat.color} group-hover:scale-110 transition-transform`} />
                      <p className={`text-2xl font-bold text-m2m-${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-m2m-text-secondary mt-1">
                        {stat.label}
                      </p>
                    </motion.div>;
              })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-m2m-bg-primary relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4 shadow-neon-glow-sm" whileHover={{
            scale: 1.05
          }}>
              <SparklesIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-semibold premium-gradient-text">
                Premium Features
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Powerful Features for{' '}
              <span className="premium-gradient-text relative">
                Smart Decisions
                <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent" animate={{
                opacity: [0.5, 1, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </span>
            </h2>
            <p className="text-xl text-m2m-text-secondary max-w-3xl mx-auto">
              Everything you need to find and validate the perfect business
              location
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.6
          }} className="premium-card rounded-2xl shadow-floating p-6 glow-border cursor-pointer premium-hover-lift">
                <motion.div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-neon-glow-sm relative`} whileHover={{
              rotate: 360,
              scale: 1.1
            }} transition={{
              duration: 0.6
            }}>
                  <feature.icon className="w-8 h-8 text-white" />
                  <motion.div className="absolute inset-0 rounded-2xl" animate={{
                boxShadow: ['0 0 20px rgba(0, 255, 255, 0.3)', '0 0 30px rgba(0, 255, 255, 0.5)', '0 0 20px rgba(0, 255, 255, 0.3)']
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
                </motion.div>
                <h3 className="text-xl font-semibold text-m2m-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-m2m-text-secondary">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* Enhanced Analytics Section */}
      <section id="insights" className="py-20 px-4 sm:px-6 lg:px-8 glass-panel relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" animate={{
        background: ['radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.3), transparent 50%)', 'radial-gradient(circle at 100% 100%, rgba(0, 102, 255, 0.3), transparent 50%)', 'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.3), transparent 50%)']
      }} transition={{
        duration: 10,
        repeat: Infinity
      }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Real-Time{' '}
              <span className="premium-gradient-text relative">
                Market Intelligence
                <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-electric-aqua to-transparent" animate={{
                opacity: [0.5, 1, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </span>
            </h2>
            <p className="text-xl text-m2m-text-secondary max-w-3xl mx-auto">
              Access comprehensive analytics and insights at your fingertips
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            value: 98.7,
            label: 'Data Accuracy',
            suffix: '%',
            gradient: 'from-m2m-neon-cyan to-m2m-electric-aqua'
          }, {
            value: 1247,
            label: 'Business Listings',
            suffix: '+',
            gradient: 'from-m2m-neon-blue to-m2m-electric-aqua'
          }, {
            value: 45,
            label: 'Market Categories',
            suffix: '',
            gradient: 'from-m2m-electric-aqua to-m2m-neon-cyan'
          }].map((stat, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.2,
            duration: 0.6
          }} className="premium-card rounded-2xl shadow-floating p-8 glow-border text-center premium-hover-lift">
                <motion.div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`} initial={{
              scale: 0
            }} whileInView={{
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.2 + 0.3,
              type: 'spring'
            }}>
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </motion.div>
                <div className="text-m2m-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* Enhanced Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-m2m-bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Trusted by{' '}
              <span className="premium-gradient-text relative">
                Business Leaders
                <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-blue to-transparent" animate={{
                opacity: [0.5, 1, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </span>
            </h2>
            <p className="text-xl text-m2m-text-secondary">
              See what our customers have to say
            </p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div className="flex" animate={{
              x: `${-currentTestimonial * 100}%`
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}>
                {testimonials.map((testimonial, index) => <div key={index} className="min-w-full px-4">
                    <motion.div className="premium-card rounded-2xl shadow-floating p-8 glow-border relative overflow-hidden" animate={{
                  opacity: currentTestimonial === index ? 1 : 0.3,
                  scale: currentTestimonial === index ? 1 : 0.95
                }}>
                      <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent" animate={{
                    x: ['-100%', '100%']
                  }} transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }} />
                      <div className="flex mb-4 relative z-10">
                        {[...Array(testimonial.rating)].map((_, i) => <motion.div key={i} initial={{
                      opacity: 0,
                      scale: 0
                    }} animate={{
                      opacity: 1,
                      scale: 1
                    }} transition={{
                      delay: i * 0.1
                    }}>
                            <StarIcon className="w-5 h-5 text-m2m-neon-cyan fill-m2m-neon-cyan" />
                          </motion.div>)}
                      </div>
                      <p className="text-m2m-text-secondary mb-4 text-lg relative z-10">
                        {testimonial.content}
                      </p>
                      <div className="relative z-10">
                        <div className="font-semibold text-m2m-text-primary text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-m2m-text-secondary">
                          {testimonial.role}
                        </div>
                      </div>
                    </motion.div>
                  </div>)}
              </motion.div>
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => <motion.button key={index} onClick={() => setCurrentTestimonial(index)} className={`h-2 rounded-full transition-all ${currentTestimonial === index ? 'w-8 bg-gradient-to-r from-m2m-neon-cyan to-m2m-electric-aqua shadow-neon-glow-sm' : 'w-2 bg-m2m-divider'}`} whileHover={{
              scale: 1.2
            }} whileTap={{
              scale: 0.9
            }} />)}
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Premium CTA */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div className="absolute inset-0" animate={{
        background: ['linear-gradient(135deg, #00FFFF 0%, #0066FF 50%, #00D9FF 100%)', 'linear-gradient(225deg, #00D9FF 0%, #0066FF 50%, #00FFFF 100%)', 'linear-gradient(135deg, #00FFFF 0%, #0066FF 50%, #00D9FF 100%)']
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }} style={{
        backgroundSize: '200% 200%'
      }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-2 h-2 bg-white/40 rounded-full" initial={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
          y: Math.random() * 200
        }} animate={{
          y: [null, -200],
          opacity: [0.4, 0]
        }} transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }} />)}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <motion.div className="inline-block glass-panel text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-neon-glow" whileHover={{
            scale: 1.05
          }} animate={{
            boxShadow: ['0 0 20px rgba(255, 255, 255, 0.3)', '0 0 30px rgba(255, 255, 255, 0.5)', '0 0 20px rgba(255, 255, 255, 0.3)']
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              ✨ Trusted by 1,200+ Businesses
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Premium Market Intelligence
              <br />
              with NEARBUY Pro
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get unlimited access to AI insights, competitor analysis, and
              supplier connections
            </p>
            <motion.button onClick={() => openAuthModal('register')} className="px-10 py-5 bg-white text-m2m-midnight-blue rounded-xl font-bold text-lg shadow-premium-depth relative overflow-hidden group" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} animate={{
            boxShadow: ['0 20px 60px rgba(0, 0, 0, 0.4)', '0 25px 70px rgba(0, 0, 0, 0.5)', '0 20px 60px rgba(0, 0, 0, 0.4)']
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <span className="relative z-10 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                Join NEARBUY Pro
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* Enhanced Footer */}
      <footer id="contact" className="text-m2m-text-primary py-12 px-4 sm:px-6 lg:px-8 border-t border-m2m-divider/50 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-10" animate={{
        background: ['radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.2), transparent 50%)', 'radial-gradient(circle at 100% 0%, rgba(0, 102, 255, 0.2), transparent 50%)', 'radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.2), transparent 50%)']
      }} transition={{
        duration: 15,
        repeat: Infinity
      }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <Logo size="md" showText={true} />
              <p className="text-m2m-text-secondary mt-4">
                AI-powered location intelligence for smart business decisions
              </p>
            </motion.div>
            {[{
            title: 'Product',
            links: ['Features', 'Pricing', 'Insights']
          }, {
            title: 'Company',
            links: ['About Us', 'Careers', 'Contact']
          }, {
            title: 'Stats',
            links: ['1,247+ Business Listings', '98.7% Data Accuracy', '45 Market Categories']
          }].map((section, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <h3 className="font-semibold mb-4 text-m2m-text-primary">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-m2m-text-secondary">
                  {section.links.map((link, i) => <motion.li key={i} whileHover={{
                x: 5
              }} transition={{
                type: 'spring',
                stiffness: 300
              }}>
                      <a href="#" className="hover:text-m2m-neon-cyan transition-colors">
                        {link}
                      </a>
                    </motion.li>)}
                </ul>
              </motion.div>)}
          </div>
          <div className="border-t border-m2m-divider/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-m2m-text-secondary text-sm">
              © 2025 NEARBUY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a href="#" className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors" whileHover={{
              y: -2
            }}>
                Privacy Policy
              </motion.a>
              <motion.a href="#" className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors" whileHover={{
              y: -2
            }}>
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
      {/* Auth Modal */}
      {showAuthModal && <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} onSwitchMode={mode => setAuthMode(mode)} />}
    </div>;
}