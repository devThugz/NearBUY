import React, { useEffect, useState, useRef, lazy, Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import AuthModal from '../components/AuthModal';
import ThemeToggle from '../components/ThemeToggle';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence } from
'framer-motion';
import { toast } from 'sonner';
import {
  BrainIcon,
  BarChart3Icon,
  MapIcon,
  NetworkIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  TargetIcon,
  SparklesIcon,
  ZapIcon,
  BuildingIcon,
  HomeIcon,
  FactoryIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  TreesIcon,
  AlertTriangleIcon,
  StoreIcon,
  MapPinIcon,
  XIcon,
  DollarSignIcon,
  PhoneIcon } from
'lucide-react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap } from
'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngBounds } from 'leaflet';
// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2



}: {end: number;duration?: number;}) {
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
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );
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
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) =>
      <motion.div
        key={i}
        className="absolute ambient-particle"
        initial={{
          x:
          Math.random() * (
          typeof window !== 'undefined' ? window.innerWidth : 1920),
          y:
          Math.random() * (
          typeof window !== 'undefined' ? window.innerHeight : 1080),
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{
          x: [
          Math.random() * (
          typeof window !== 'undefined' ? window.innerWidth : 1920),
          Math.random() * (
          typeof window !== 'undefined' ? window.innerWidth : 1920),
          Math.random() * (
          typeof window !== 'undefined' ? window.innerWidth : 1920)],

          y: [
          Math.random() * (
          typeof window !== 'undefined' ? window.innerHeight : 1080),
          Math.random() * (
          typeof window !== 'undefined' ? window.innerHeight : 1080),
          Math.random() * (
          typeof window !== 'undefined' ? window.innerHeight : 1080)],

          scale: [
          Math.random() * 0.5 + 0.5,
          Math.random() * 0.8 + 0.7,
          Math.random() * 0.5 + 0.5],

          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: Math.random() * 15 + 10,
          repeat: Infinity,
          ease: 'linear'
        }} />

      )}
    </div>);

}
// Map Auto-Fit Component
function MapAutoFit({ bounds }: {bounds: LatLngBounds | null;}) {
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
  const [selectedPlan, setSelectedPlan] = useState<
    'starter' | 'professional' | 'enterprise'>(
    'professional');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [showBusinessSuggestions, setShowBusinessSuggestions] = useState(false);
  const [showSuppliersModal, setShowSuppliersModal] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  // Change default map center to Tandag City
  const TANDAG_CITY_CENTER: [number, number] = [9.0742, 126.1947];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };
  // Land validation function
  const isValidLandCoordinate = (lat: number, lng: number): boolean => {
    // Butuan City land boundaries (strict validation)
    const butuanLandBounds = {
      north: 8.98,
      south: 8.91,
      east: 125.58,
      west: 125.5
    };
    // Check if within land bounds
    if (
    lat < butuanLandBounds.south ||
    lat > butuanLandBounds.north ||
    lng < butuanLandBounds.west ||
    lng > butuanLandBounds.east)
    {
      return false;
    }
    // Additional check: avoid coastal/water areas
    const waterZones = [
    {
      lat: 8.95,
      lng: 125.58,
      radius: 0.005
    },
    {
      lat: 8.92,
      lng: 125.52,
      radius: 0.003
    } // Southern coast
    ];
    for (const zone of waterZones) {
      const distance = Math.sqrt(
        Math.pow(lat - zone.lat, 2) + Math.pow(lng - zone.lng, 2)
      );
      if (distance < zone.radius) {
        return false;
      }
    }
    return true;
  };
  const features = [
  {
    icon: BrainIcon,
    title: 'AI Location Scoring',
    description:
    'Advanced algorithms analyze demographics, foot traffic, and market trends to score optimal business locations.',
    gradient: 'from-m2m-neon-cyan to-m2m-electric-aqua'
  },
  {
    icon: BarChart3Icon,
    title: 'Market Demand Analytics',
    description:
    'Real-time insights into consumer behavior, spending patterns, and market saturation levels.',
    gradient: 'from-m2m-neon-blue to-m2m-electric-aqua'
  },
  {
    icon: MapIcon,
    title: 'Competitor Heatmap',
    description:
    'Visualize competitor density and identify underserved markets with our interactive heatmap.',
    gradient: 'from-m2m-electric-aqua to-m2m-neon-cyan'
  },
  {
    icon: NetworkIcon,
    title: 'Supplier Network Connections',
    description:
    'Connect with verified suppliers and distributors in your target area instantly.',
    gradient: 'from-m2m-neon-blue to-m2m-neon-cyan'
  }];

  const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Restaurant Owner',
    content:
    'MAP2MARKET helped us find the perfect location. Our foot traffic increased by 240% in the first quarter!',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'Real Estate Developer',
    content:
    'The AI insights are incredibly accurate. We saved months of research and made data-driven decisions.',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Franchise Owner',
    content:
    'The supplier network feature alone paid for itself. Highly recommend for any business expansion.',
    rating: 5
  }];

  // Update zones to be relative to Tandag City with proper coordinates
  const zones = [
  {
    id: 1,
    name: 'Commercial District',
    type: 'commercial',
    coordinates: [
    [9.078, 126.192],
    [9.078, 126.198],
    [9.072, 126.198],
    [9.072, 126.192]] as
    [number, number][],
    color: '#1E90FF',
    icon: BuildingIcon,
    businesses: 245,
    growth: '+23%',
    description: 'Downtown business hub with high foot traffic',
    classification: 'High-Density Commercial',
    characteristics: [
    'Prime retail locations',
    'Banking and financial services',
    'Government offices nearby',
    'Public transportation access']

  },
  {
    id: 2,
    name: 'Residential Zone',
    type: 'residential',
    coordinates: [
    [9.082, 126.188],
    [9.082, 126.194],
    [9.076, 126.194],
    [9.076, 126.188]] as
    [number, number][],
    color: '#36C275',
    icon: HomeIcon,
    businesses: 89,
    growth: '+15%',
    description: 'Northern sector with dense housing communities',
    classification: 'Medium-Density Residential',
    characteristics: [
    'Family-oriented neighborhoods',
    'Local convenience stores',
    'Schools and daycare centers',
    'Community parks']

  },
  {
    id: 3,
    name: 'Educational District',
    type: 'educational',
    coordinates: [
    [9.076, 126.194],
    [9.076, 126.2],
    [9.07, 126.2],
    [9.07, 126.194]] as
    [number, number][],
    color: '#00B3A4',
    icon: GraduationCapIcon,
    businesses: 45,
    growth: '+12%',
    description: 'Schools, universities, and training centers',
    classification: 'Educational Zone',
    characteristics: [
    'University campus',
    'Secondary schools',
    'Bookstores and supplies',
    'Student housing']

  },
  {
    id: 4,
    name: 'Industrial Zone',
    type: 'industrial',
    coordinates: [
    [9.068, 126.19],
    [9.068, 126.196],
    [9.062, 126.196],
    [9.062, 126.19]] as
    [number, number][],
    color: '#64748B',
    icon: FactoryIcon,
    businesses: 156,
    growth: '+20%',
    description: 'Port area with manufacturing and logistics',
    classification: 'Light Industrial',
    characteristics: [
    'Warehousing facilities',
    'Manufacturing plants',
    'Logistics and distribution',
    'Port access']

  },
  {
    id: 5,
    name: 'Recreational Area',
    type: 'recreational',
    coordinates: [
    [9.08, 126.2],
    [9.08, 126.206],
    [9.074, 126.206],
    [9.074, 126.2]] as
    [number, number][],
    color: '#A78BFA',
    icon: TreesIcon,
    businesses: 34,
    growth: '+8%',
    description: 'Beachfront area with parks and entertainment',
    classification: 'Recreation & Tourism',
    characteristics: [
    'Beach resorts',
    'Parks and playgrounds',
    'Sports facilities',
    'Tourist attractions']

  }];

  // Update business suggestions to Tandag City locations
  const businessSuggestions = [
  {
    id: 1,
    name: 'Tandag Coffee House',
    category: 'Food & Beverage',
    position: [9.075, 126.195] as [number, number],
    address: 'Downtown Tandag',
    distance: '0.5 km',
    aiScore: 92,
    demandScore: 88,
    insights: 'High foot traffic area with growing coffee culture'
  },
  {
    id: 2,
    name: 'Surigao Retail Store',
    category: 'Retail',
    position: [9.073, 126.197] as [number, number],
    address: 'Commercial Center',
    distance: '0.8 km',
    aiScore: 88,
    demandScore: 85,
    insights: 'Prime retail location near shopping district'
  },
  {
    id: 3,
    name: 'Caraga Supply Co.',
    category: 'Supplier',
    position: [9.071, 126.193] as [number, number],
    address: 'Industrial Park',
    distance: '1.2 km',
    aiScore: 85,
    demandScore: 90,
    insights: 'Strategic location for distribution and logistics'
  },
  {
    id: 4,
    name: 'Mindanao Tech Hub',
    category: 'Technology',
    position: [9.077, 126.191] as [number, number],
    address: 'Business District',
    distance: '0.6 km',
    aiScore: 90,
    demandScore: 87,
    insights: 'Growing tech sector with skilled workforce'
  }];

  const createCustomIcon = (color: string) =>
  new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₱2,999',
    period: '/month',
    description: 'Perfect for small businesses and startups',
    features: [
    'Up to 5 location searches per month',
    'Basic AI insights',
    'Competitor heatmap access',
    'Email support',
    'Mobile app access',
    '1 user account'],

    gradient: 'from-m2m-neon-cyan to-m2m-electric-aqua',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₱7,999',
    period: '/month',
    description: 'For growing businesses and franchises',
    features: [
    'Unlimited location searches',
    'Advanced AI analytics',
    'Full competitor analysis',
    'Priority support',
    'API access',
    'Up to 10 user accounts',
    'Custom reports',
    'Supplier network access'],

    gradient: 'from-m2m-neon-blue to-m2m-electric-aqua',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom needs',
    features: [
    'Everything in Professional',
    'Dedicated account manager',
    'Custom AI model training',
    'White-label options',
    'Unlimited user accounts',
    'SLA guarantees',
    'Custom integrations',
    'On-premise deployment option'],

    gradient: 'from-m2m-electric-aqua to-m2m-neon-cyan',
    popular: false
  }];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setContactForm({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };
  // Nearby Suppliers Modal Component
  const NearbySuppliersModal = () =>
  <motion.div
    initial={{
      opacity: 0
    }}
    animate={{
      opacity: 1
    }}
    exit={{
      opacity: 0
    }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={() => setShowSuppliersModal(false)}>

      <motion.div
      initial={{
        scale: 0.9,
        y: 20,
        opacity: 0
      }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1
      }}
      exit={{
        scale: 0.9,
        y: 20,
        opacity: 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}>

        <div className="glass-panel-strong rounded-3xl p-8 border-2 border-m2m-success/40 shadow-premium-depth overflow-y-auto max-h-[85vh]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-m2m-success mb-2 flex items-center gap-2">
                <MapPinIcon className="w-8 h-8" />
                Nearby Suppliers
              </h3>
              <p className="text-m2m-text-secondary">
                Verified suppliers in your target area
              </p>
            </div>
            <motion.button
            onClick={() => setShowSuppliersModal(false)}
            className="p-2 hover:bg-m2m-success/10 rounded-lg transition-colors"
            whileHover={{
              scale: 1.1,
              rotate: 90
            }}
            whileTap={{
              scale: 0.9
            }}>

              <XIcon className="w-6 h-6 text-m2m-text-secondary" />
            </motion.button>
          </div>
          <div className="space-y-4">
            {businessSuggestions.map((business, index) =>
          <motion.div
            key={business.id}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            className="glass-panel rounded-2xl p-6 border border-m2m-success/20 hover:border-m2m-success transition-all group"
            whileHover={{
              x: 8,
              scale: 1.02
            }}>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-m2m-text-primary mb-1 group-hover:text-m2m-success transition-colors">
                      {business.name}
                    </h4>
                    <p className="text-sm text-m2m-text-secondary mb-3">
                      {business.category}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-m2m-success" />
                        <span className="text-sm text-m2m-text-secondary">
                          {business.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TargetIcon className="w-4 h-4 text-m2m-electric-aqua" />
                        <span className="text-sm text-m2m-text-secondary">
                          {business.distance} away
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                className="px-4 py-2 bg-m2m-success/20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}>

                    <span className="text-lg font-bold text-m2m-success">
                      {business.aiScore}
                    </span>
                  </motion.div>
                </div>
                <div className="p-3 glass-panel rounded-lg mb-4">
                  <p className="text-xs text-m2m-text-secondary italic">
                    "{business.insights}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-m2m-divider">
                  <span className="text-sm text-m2m-text-secondary">
                    Demand Score:{' '}
                    <span className="font-bold text-m2m-success">
                      {business.demandScore}/100
                    </span>
                  </span>
                  <motion.button
                className="px-4 py-2 bg-m2m-success/20 hover:bg-m2m-success/30 text-m2m-success rounded-lg text-sm font-semibold transition-all"
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}>

                    View Details
                  </motion.button>
                </div>
              </motion.div>
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>;

  // Business Suggestions Modal Component
  const BusinessSuggestionsModal = () =>
  <motion.div
    initial={{
      opacity: 0
    }}
    animate={{
      opacity: 1
    }}
    exit={{
      opacity: 0
    }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={() => setShowBusinessSuggestions(false)}>

      <motion.div
      initial={{
        scale: 0.9,
        y: 20,
        opacity: 0
      }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1
      }}
      exit={{
        scale: 0.9,
        y: 20,
        opacity: 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}>

        <div className="glass-panel-strong rounded-3xl p-8 border-2 border-m2m-neon-cyan/40 shadow-premium-depth overflow-y-auto max-h-[85vh]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold premium-gradient-text mb-2">
                AI Business Suggestions
              </h3>
              <p className="text-m2m-text-secondary">
                Recommended opportunities based on market analysis
              </p>
            </div>
            <motion.button
            onClick={() => setShowBusinessSuggestions(false)}
            className="p-2 hover:bg-m2m-neon-cyan/10 rounded-lg transition-colors"
            whileHover={{
              scale: 1.1,
              rotate: 90
            }}
            whileTap={{
              scale: 0.9
            }}>

              <XIcon className="w-6 h-6 text-m2m-text-secondary" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessSuggestions.map((business, index) =>
          <motion.div
            key={business.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            className="glass-panel rounded-2xl p-6 border border-m2m-divider hover:border-m2m-neon-cyan transition-all group"
            whileHover={{
              y: -8,
              scale: 1.02
            }}>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-m2m-text-primary mb-1 group-hover:text-m2m-neon-cyan transition-colors">
                      {business.name}
                    </h4>
                    <p className="text-sm text-m2m-text-secondary">
                      {business.category}
                    </p>
                  </div>
                  <motion.div
                className="px-3 py-1 bg-m2m-success/20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}>

                    <span className="text-sm font-bold text-m2m-success">
                      {business.aiScore}
                    </span>
                  </motion.div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-m2m-neon-cyan" />
                    <span className="text-sm text-m2m-text-secondary">
                      {business.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TargetIcon className="w-4 h-4 text-m2m-electric-aqua" />
                    <span className="text-sm text-m2m-text-secondary">
                      Demand Score:{' '}
                      <span className="font-semibold text-m2m-text-primary">
                        {business.demandScore}/100
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-3 glass-panel rounded-lg mb-4">
                  <p className="text-xs text-m2m-text-secondary italic">
                    "{business.insights}"
                  </p>
                </div>

                <motion.button
              onClick={() => openAuthModal('register')}
              className="w-full py-3 btn-premium text-white rounded-xl font-semibold shadow-neon-glow-sm"
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}>

                  Explore Location
                </motion.button>
              </motion.div>
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>;

  return (
    <div className="w-full min-h-screen bg-m2m-bg-primary relative overflow-hidden">
      <div className="fixed inset-0 bg-m2m-bg-primary pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.15),transparent_50%)] dark:opacity-100 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,102,255,0.1),transparent_50%)] dark:opacity-100 opacity-20" />
      </div>

      <AmbientParticles />

      {/* Enhanced Navigation with Auto-Hide */}
      <motion.nav
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: navVisible ? 0 : -100,
          opacity: navVisible ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-panel shadow-neon-glow-sm border-b border-m2m-neon-cyan/30' : 'bg-m2m-bg-card/60 backdrop-blur-xl border-b border-m2m-divider/50'}`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="hidden md:flex justify-between items-center">
              <motion.div
                className="flex-shrink-0"
                whileHover={{
                  scale: 1.05
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400
                }}>

                <Logo size="sm" showText={true} />
              </motion.div>

              <div className="flex items-center space-x-6 lg:space-x-8">
                {['features', 'pricing', 'insights', 'contact'].map((item) =>
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors font-semibold relative group tracking-wide"
                  style={{
                    fontSize: '15px',
                    letterSpacing: '0.5px'
                  }}
                  whileHover={{
                    y: -2
                  }}>

                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-m2m-neon-cyan to-m2m-electric-aqua"
                    initial={{
                      width: 0
                    }}
                    whileHover={{
                      width: '100%'
                    }}
                    transition={{
                      duration: 0.3
                    }} />

                  </motion.a>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <ThemeToggle />
                <motion.button
                  onClick={() => openAuthModal('login')}
                  className="px-4 lg:px-6 py-2 glow-border rounded-lg font-medium transition-all text-sm whitespace-nowrap text-m2m-neon-cyan"
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}>

                  <span className="relative z-10">Sign In</span>
                </motion.button>
                <motion.button
                  onClick={() => openAuthModal('register')}
                  className="px-4 lg:px-6 py-2 btn-premium text-white rounded-lg font-medium text-sm whitespace-nowrap shadow-neon-glow-sm"
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
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
                {['features', 'pricing', 'insights', 'contact'].map((item) =>
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors text-sm font-medium">

                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 w-full max-w-sm">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex-1 px-3 py-2 glow-border rounded-lg font-medium text-m2m-neon-cyan transition-all text-sm">

                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="flex-1 px-3 py-2 btn-premium text-white rounded-lg font-medium text-sm shadow-neon-glow-sm">

                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section with Floating Parallax */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)']

          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.2
              }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-6 shadow-neon-glow-sm">

              <SparklesIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-semibold premium-gradient-text">
                Next-Gen Location Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.3
              }}
              className="text-5xl md:text-7xl font-bold text-m2m-text-primary mb-6 leading-tight">

              <motion.span
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="inline-block">

                Discover
              </motion.span>{' '}
              <motion.span
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2
                }}
                className="inline-block">

                Strategic
              </motion.span>{' '}
              <motion.span
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4
                }}
                className="inline-block">

                Business
              </motion.span>
              <br />
              <motion.span
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6
                }}
                className="inline-block">

                Locations
              </motion.span>{' '}
              <motion.span
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8
                }}
                className="inline-block">

                with
              </motion.span>{' '}
              <motion.span
                className="inline-block bg-gradient-to-r from-m2m-neon-cyan via-m2m-electric-aqua to-m2m-neon-blue bg-clip-text text-transparent"
                animate={{
                  y: [0, -8, 0],
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.0
                  },
                  backgroundPosition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}>

                NEARBUY
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.4
              }}
              className="text-xl mb-8 max-w-3xl mx-auto">

              <span
                className="font-semibold bg-gradient-to-r from-m2m-neon-cyan via-m2m-electric-aqua to-m2m-neon-blue bg-clip-text text-transparent animate-gradient-flow"
                style={{
                  backgroundSize: '200% 200%'
                }}>

                Empowering businesses and developers through AI-driven map
                intelligence with real-time satellite imagery and advanced
                analytics.
              </span>
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.5
              }}
              className="flex items-center justify-center gap-4 flex-wrap mb-12">

              <motion.button
                onClick={() => openAuthModal('register')}
                className="px-8 py-4 btn-premium text-white rounded-xl font-semibold text-lg shadow-neon-glow relative overflow-hidden group"
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}>

                <span className="relative z-10 flex items-center gap-2">
                  <ZapIcon className="w-5 h-5" />
                  Start Free
                </span>
              </motion.button>
              <motion.button
                className="px-8 py-4 glass-panel text-m2m-text-primary rounded-xl font-semibold text-lg flex items-center gap-2"
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}>

                <PlayCircleIcon className="w-5 h-5 text-m2m-neon-cyan" />
                <span className="relative z-10">Watch Demo</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="text-center mb-12">

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4 shadow-neon-glow-sm"
              whileHover={{
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
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
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
            <motion.div
              initial={{
                opacity: 0,
                x: -50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8
              }}
              className="lg:col-span-1 space-y-6">

              <motion.div
                className="glass-panel-strong rounded-2xl shadow-premium-depth p-6 glow-border-animated relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  y: -8
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300
                }}>

                <div className="absolute inset-0 bg-gradient-to-br from-m2m-neon-cyan/10 via-m2m-neon-blue/10 to-m2m-electric-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mini-map-container mb-4 h-48 relative">
                  <div className="mini-map-overlay" />
                  <MapContainer
                    center={TANDAG_CITY_CENTER}
                    zoom={14}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    dragging={false}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '12px'
                    }}>

                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Esri" />

                    {zones.slice(0, 3).map((zone) =>
                    <Polygon
                      key={zone.id}
                      positions={zone.coordinates}
                      pathOptions={{
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: 0.3,
                        weight: 2
                      }} />

                    )}
                  </MapContainer>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold premium-gradient-text">
                      Tandag City
                    </h3>
                    <motion.div
                      className="px-3 py-1 bg-m2m-neon-cyan/20 rounded-full"
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}>

                      <span className="text-xs font-bold text-m2m-neon-cyan">
                        LIVE
                      </span>
                    </motion.div>
                  </div>

                  <p className="text-sm text-m2m-text-secondary mb-4">
                    Strategic city with excellent business potential and growing
                    economy in Caraga Region
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

                  <motion.button
                    onClick={() => setShowBusinessSuggestions(true)}
                    className="w-full px-6 py-3 mb-4 glass-panel rounded-xl font-semibold transition-all border-2 border-m2m-neon-cyan/30 hover:border-m2m-neon-cyan hover:bg-m2m-neon-cyan/10 text-m2m-neon-cyan shadow-neon-glow-sm"
                    whileHover={{
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{
                      scale: 0.95
                    }}>

                    <span className="flex items-center justify-center gap-2">
                      <SparklesIcon className="w-5 h-5" />
                      Business Suggestions
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    className="w-full px-6 py-3 btn-premium text-white rounded-xl font-semibold shadow-neon-glow-sm">

                    Explore Area
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -50
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2
                }}
                className="zone-legend-panel rounded-2xl p-6 sticky top-24">

                <h4 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
                  <SparklesIcon className="w-5 h-5 mr-2 text-m2m-neon-cyan" />
                  Zone Classifications
                </h4>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {zones.map((zone, index) => {
                    const ZoneIcon = zone.icon;
                    return (
                      <motion.div
                        key={zone.id}
                        initial={{
                          opacity: 0,
                          x: -20
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0
                        }}
                        viewport={{
                          once: true
                        }}
                        transition={{
                          delay: index * 0.05
                        }}
                        className={`flex items-center justify-between p-3 glass-panel rounded-lg hover-lift cursor-pointer transition-all ${selectedZone === zone.id ? 'ring-2 ring-m2m-neon-cyan' : ''} ${hoveredZone === zone.id ? 'shadow-neon-glow-sm' : ''}`}
                        onClick={() =>
                        setSelectedZone(
                          zone.id === selectedZone ? null : zone.id
                        )
                        }
                        onMouseEnter={() => setHoveredZone(zone.id)}
                        onMouseLeave={() => setHoveredZone(null)}>

                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center animate-zone-glow"
                            style={{
                              backgroundColor: `${zone.color}20`,
                              border: `2px solid ${zone.color}`,
                              boxShadow: `0 0 10px ${zone.color}40`
                            }}>

                            <ZoneIcon
                              className="w-5 h-5"
                              style={{
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
                      </motion.div>);

                  })}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 50
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8,
                delay: 0.2
              }}
              className="lg:col-span-3 glass-panel-strong rounded-2xl p-6 glow-border-animated shadow-premium-depth relative group"
              whileHover={{
                scale: 1.01
              }}>

              <div className="absolute -inset-1 bg-gradient-to-r from-m2m-neon-cyan/20 via-m2m-neon-blue/20 to-m2m-electric-aqua/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <h3 className="text-xl font-bold text-m2m-text-primary flex items-center">
                    <MapIcon className="w-6 h-6 mr-2 text-m2m-neon-cyan" />
                    Interactive Zone Map - Tandag City
                  </h3>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSuppliersModal(true);
                      }}
                      className="px-4 py-2 glass-panel rounded-lg text-sm font-semibold text-m2m-success hover:bg-m2m-success/10 transition-all flex items-center gap-2 border border-m2m-success/30 hover:border-m2m-success"
                      whileHover={{
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{
                        scale: 0.95
                      }}>

                      <MapPinIcon className="w-4 h-4 text-m2m-success" />
                      <span className="text-m2m-success">Nearby Suppliers</span>
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowBusinessSuggestions(true);
                      }}
                      className="px-4 py-2 glass-panel rounded-lg text-sm font-semibold text-m2m-neon-cyan hover:bg-m2m-neon-cyan/10 transition-all flex items-center gap-2 border border-m2m-neon-cyan/30 hover:border-m2m-neon-cyan"
                      whileHover={{
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{
                        scale: 0.95
                      }}>

                      <SparklesIcon className="w-4 h-4 text-m2m-neon-cyan" />
                      <span className="text-m2m-neon-cyan">AI Suggestions</span>
                    </motion.button>
                    <motion.div
                      animate={{
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full">

                      <div className="w-2 h-2 bg-m2m-neon-cyan rounded-full animate-neon-pulse" />
                      <span className="text-xs font-bold text-m2m-neon-cyan">
                        REAL-TIME
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-[700px] rounded-xl overflow-hidden border-2 border-m2m-neon-cyan/30 relative shadow-premium-depth">
                    <MapContainer
                      center={TANDAG_CITY_CENTER}
                      zoom={14}
                      scrollWheelZoom={true}
                      zoomControl={true}
                      style={{
                        height: '100%',
                        width: '100%'
                      }}
                      className="rounded-xl">

                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Esri" />


                      {/* Zone Polygons with Interactive Popups */}
                      {zones.map((zone) => {
                        const ZoneIcon = zone.icon;
                        return (
                          <Polygon
                            key={zone.id}
                            positions={zone.coordinates}
                            pathOptions={{
                              color: zone.color,
                              fillColor: zone.color,
                              fillOpacity: hoveredZone === zone.id ? 0.4 : 0.25,
                              weight: hoveredZone === zone.id ? 3 : 2
                            }}
                            eventHandlers={{
                              mouseover: () => setHoveredZone(zone.id),
                              mouseout: () => setHoveredZone(null),
                              click: () =>
                              setSelectedZone(
                                zone.id === selectedZone ? null : zone.id
                              )
                            }}>

                            <Popup className="custom-popup">
                              <div className="p-4 min-w-[280px]">
                                <div className="flex items-center gap-3 mb-3">
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                      backgroundColor: `${zone.color}20`,
                                      border: `2px solid ${zone.color}`
                                    }}>

                                    <ZoneIcon
                                      className="w-5 h-5"
                                      style={{
                                        color: zone.color
                                      }} />

                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900 text-lg">
                                      {zone.name}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                      {zone.classification}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-700 mb-3">
                                  {zone.description}
                                </p>

                                <div className="space-y-2 mb-3">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                      Businesses
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                      {zone.businesses}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                      Growth Rate
                                    </span>
                                    <span
                                      className="font-semibold"
                                      style={{
                                        color: zone.color
                                      }}>

                                      {zone.growth}
                                    </span>
                                  </div>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                  <p className="text-xs font-semibold text-gray-700 mb-2">
                                    Key Characteristics:
                                  </p>
                                  <ul className="space-y-1">
                                    {zone.characteristics.map((char, idx) =>
                                    <li
                                      key={idx}
                                      className="text-xs text-gray-600 flex items-start">

                                        <CheckCircleIcon
                                        className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0"
                                        style={{
                                          color: zone.color
                                        }} />

                                        <span>{char}</span>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </Popup>
                          </Polygon>);

                      })}

                      {/* Business Suggestion Markers */}
                      {businessSuggestions.map((business) =>
                      <Marker
                        key={business.id}
                        position={business.position}
                        icon={createCustomIcon('#F89C36')}>

                          <Popup>
                            <div className="p-2">
                              <h4 className="font-bold text-gray-900 mb-1">
                                {business.name}
                              </h4>
                              <p className="text-xs text-gray-600 mb-2">
                                {business.category}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">
                                  AI Score:{' '}
                                  <span className="font-bold text-orange-600">
                                    {business.aiScore}
                                  </span>
                                </span>
                                <span className="text-xs text-gray-600">
                                  {business.distance}
                                </span>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>

                    {/* Hover Info Panel */}
                    <AnimatePresence>
                      {hoveredZone !== null &&
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: 20
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        exit={{
                          opacity: 0,
                          x: 20
                        }}
                        className="absolute top-4 right-4 glass-panel-strong rounded-xl p-4 shadow-neon-glow-sm max-w-xs pointer-events-none">

                          {(() => {
                          const zone = zones.find((z) => z.id === hoveredZone);
                          if (!zone) return null;
                          const ZoneIcon = zone.icon;
                          return (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{
                                    backgroundColor: `${zone.color}20`,
                                    border: `2px solid ${zone.color}`
                                  }}>

                                    <ZoneIcon
                                    className="w-4 h-4"
                                    style={{
                                      color: zone.color
                                    }} />

                                  </div>
                                  <h4 className="font-bold text-m2m-text-primary text-sm">
                                    {zone.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-m2m-text-secondary mb-2">
                                  {zone.classification}
                                </p>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-m2m-text-secondary">
                                    {zone.businesses} businesses
                                  </span>
                                  <span
                                  className="font-semibold"
                                  style={{
                                    color: zone.color
                                  }}>

                                    {zone.growth}
                                  </span>
                                </div>
                              </>);

                        })()}
                        </motion.div>
                      }
                    </AnimatePresence>
                  </div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.5
                    }}
                    className="absolute top-4 right-4 glass-panel-strong rounded-lg p-4 shadow-neon-glow-sm max-w-xs">

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

                <motion.div
                  initial={{
                    x: 400,
                    opacity: 0
                  }}
                  animate={{
                    x: showBusinessPanel ? 0 : 400,
                    opacity: showBusinessPanel ? 1 : 0
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                  className="absolute top-0 right-0 w-80 h-full glass-panel-strong rounded-xl p-6 shadow-premium-depth overflow-hidden"
                  style={{
                    pointerEvents: showBusinessPanel ? 'auto' : 'none'
                  }}>

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-m2m-text-primary flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-m2m-success" />
                      <span className="text-m2m-success">Nearby Suppliers</span>
                    </h4>
                    <motion.button
                      onClick={() => setShowBusinessPanel(false)}
                      className="p-1 hover:bg-m2m-neon-cyan/10 rounded-lg transition-colors"
                      whileHover={{
                        scale: 1.1
                      }}
                      whileTap={{
                        scale: 0.9
                      }}>

                      <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                    </motion.button>
                  </div>
                  <div className="space-y-3 overflow-y-auto max-h-[calc(100%-60px)] pr-2">
                    {businessSuggestions.map((business, index) =>
                    <motion.div
                      key={business.id}
                      initial={{
                        opacity: 0,
                        y: 20
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: index * 0.1
                      }}
                      className="glass-panel rounded-lg p-4 hover-lift cursor-pointer border border-m2m-success/20"
                      whileHover={{
                        scale: 1.02
                      }}>

                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-m2m-text-primary">
                            {business.name}
                          </h5>
                          <motion.div
                          className="px-2 py-1 bg-m2m-success/20 rounded-full"
                          animate={{
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}>

                            <span className="text-xs font-bold text-m2m-success">
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
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                {[
                {
                  label: 'Zones',
                  value: '8',
                  color: 'text-m2m-neon-cyan',
                  bgColor: 'bg-m2m-neon-cyan/10',
                  icon: MapIcon
                },
                {
                  label: 'Businesses',
                  value: '834',
                  color: 'text-m2m-success',
                  bgColor: 'bg-m2m-success/10',
                  icon: StoreIcon
                },
                {
                  label: 'Coverage',
                  value: '52km²',
                  color: 'text-m2m-electric-aqua',
                  bgColor: 'bg-m2m-electric-aqua/10',
                  icon: TargetIcon
                },
                {
                  label: 'Accuracy',
                  value: '98%',
                  color: 'text-m2m-neon-blue',
                  bgColor: 'bg-m2m-neon-blue/10',
                  icon: CheckCircleIcon
                }].
                map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay: 0.3 + index * 0.1
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -4
                      }}
                      className={`glass-panel rounded-lg p-4 text-center cursor-pointer group ${stat.bgColor} border border-transparent hover:border-current transition-all`}>

                      <StatIcon
                        className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />

                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-m2m-text-secondary mt-1">
                        {stat.label}
                      </p>
                    </motion.div>);

                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-m2m-bg-primary relative">

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16">

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4 shadow-neon-glow-sm"
            whileHover={{
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
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
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
          {features.map((feature, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 50
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.6
            }}
            className="glass-panel rounded-2xl shadow-floating p-6 border border-m2m-divider hover:border-m2m-neon-cyan transition-all cursor-pointer group"
            whileHover={{
              y: -8,
              scale: 1.02
            }}>

              <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-neon-glow-sm relative`}
              whileHover={{
                rotate: 360,
                scale: 1.1
              }}
              transition={{
                duration: 0.6
              }}>

                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-m2m-text-primary mb-2 group-hover:text-m2m-neon-cyan transition-colors">
                {feature.title}
              </h3>
              <p className="text-m2m-text-secondary">{feature.description}</p>
              <motion.button
              onClick={() => openAuthModal('register')}
              className="mt-4 text-sm text-m2m-neon-cyan hover:text-m2m-electric-aqua transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100"
              whileHover={{
                x: 5
              }}>

                Try it now
                <SparklesIcon className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Section with Enhanced Animations */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
            'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 102, 255, 0.05) 50%, rgba(0, 217, 255, 0.05) 100%)',
            'linear-gradient(225deg, rgba(0, 217, 255, 0.05) 0%, rgba(0, 102, 255, 0.05) 50%, rgba(0, 255, 255, 0.05) 100%)',
            'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 102, 255, 0.05) 50%, rgba(0, 217, 255, 0.05) 100%)']

          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%'
          }} />


        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-center mb-16">

            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 glass-panel-strong rounded-full mb-6 shadow-neon-glow-sm"
              whileHover={{
                scale: 1.05
              }}>

              <SparklesIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-bold premium-gradient-text">
                ✨ Join 1,200+ Successful Businesses
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-m2m-text-primary mb-6">
              Choose Your{' '}
              <span className="premium-gradient-text relative">
                Perfect Plan
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }} />

              </span>
            </h2>
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.3
              }}
              className="flex flex-col items-center gap-3">

              <p className="text-xl text-m2m-text-secondary">
                <span className="text-m2m-neon-cyan font-bold text-2xl">
                  Start Free for 14 Days
                </span>
              </p>
              <div className="flex items-center gap-4 text-m2m-text-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-m2m-success" />
                  <span className="font-semibold">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-m2m-success" />
                  <span className="font-semibold">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-m2m-success" />
                  <span className="font-semibold">Full feature access</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {pricingPlans.map((plan, index) =>
            <motion.div
              key={plan.id}
              initial={{
                opacity: 0,
                y: 50
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}
              className={`glass-panel-strong rounded-2xl p-8 border-2 transition-all cursor-pointer relative overflow-hidden group min-h-[680px] flex flex-col ${selectedPlan === plan.id ? 'border-m2m-neon-cyan shadow-neon-glow' : 'border-m2m-divider hover:border-m2m-neon-cyan/50'} ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              onClick={() => setSelectedPlan(plan.id as any)}
              whileHover={{
                y: -12,
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(0, 217, 255, 0.3)'
              }}>

                <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${plan.id === 'starter' ? 'rgba(0, 217, 255, 0.05)' : plan.id === 'professional' ? 'rgba(0, 102, 255, 0.08)' : 'rgba(0, 255, 245, 0.05)'}, transparent)`
                }} />

                <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  background:
                  'linear-gradient(45deg, transparent 30%, rgba(0, 217, 255, 0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%'
                }} />

                {plan.popular &&
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-r from-m2m-neon-cyan to-m2m-electric-aqua text-white text-xs font-bold py-2 text-center"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  boxShadow: [
                  '0 0 10px rgba(0, 217, 255, 0.3)',
                  '0 0 20px rgba(0, 217, 255, 0.6)',
                  '0 0 10px rgba(0, 217, 255, 0.3)']

                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}>

                    ⭐ MOST POPULAR
                  </motion.div>
              }
                <div
                className={`flex flex-col flex-1 ${plan.popular ? 'mt-8' : ''}`}>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-m2m-text-primary">
                      {plan.name}
                    </h3>
                    {selectedPlan === plan.id &&
                  <motion.div
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    className="w-8 h-8 bg-m2m-neon-cyan rounded-full flex items-center justify-center">

                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </motion.div>
                  }
                  </div>
                  <p className="text-m2m-text-secondary text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span
                    className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>

                      {plan.price}
                    </span>
                    <span className="text-m2m-text-secondary">
                      {plan.period}
                    </span>
                  </div>
                  <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAuthModal('register');
                  }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all mb-6 relative z-10 ${plan.popular ? 'btn-premium text-white shadow-neon-glow' : 'glass-panel text-m2m-neon-cyan hover:bg-m2m-neon-cyan/10 border-2 border-m2m-neon-cyan/30'}`}
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}>

                    <span className="flex items-center justify-center gap-2 relative z-10">
                      {plan.id === 'enterprise' ?
                    <>
                          <PhoneIcon className="w-5 h-5" />
                          Contact Sales
                        </> :

                    <>
                          <ZapIcon className="w-5 h-5" />
                          Get Started
                        </>
                    }
                    </span>
                  </motion.button>
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, i) =>
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: i * 0.05
                    }}
                    className="flex items-start gap-3">

                        <CheckCircleIcon className="w-5 h-5 text-m2m-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-m2m-text-secondary">
                          {feature}
                        </span>
                      </motion.div>
                  )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-m2m-neon-cyan via-m2m-neon-blue to-m2m-electric-aqua rounded-3xl opacity-10 blur-3xl" />

            <div className="relative glass-panel-strong rounded-3xl p-12 border-2 border-m2m-neon-cyan/30 shadow-premium-depth overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) =>
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-m2m-neon-cyan/40 rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: '100%'
                  }}
                  animate={{
                    y: '-100%',
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }} />

                )}
              </div>

              <div className="text-center relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-m2m-text-primary mb-4">
                  Ready to Find Your{' '}
                  <span className="premium-gradient-text">
                    Perfect Location?
                  </span>
                </h3>

                <p className="text-lg text-m2m-text-secondary mb-8 max-w-2xl mx-auto">
                  Join 1,200+ growing businesses using NEARBUY
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <motion.button
                    onClick={() => openAuthModal('register')}
                    className="px-10 py-5 btn-premium text-white rounded-xl font-bold text-lg shadow-neon-glow"
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}>

                    <span className="relative z-10 flex items-center gap-2">
                      <ZapIcon className="w-6 h-6" />
                      Start Free Trial
                    </span>
                  </motion.button>

                  <motion.button
                    className="px-10 py-5 glass-panel text-m2m-text-primary rounded-xl font-semibold text-lg border-2 border-m2m-neon-cyan/30 hover:border-m2m-neon-cyan/60 transition-all"
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}>

                    <span className="flex items-center gap-2">
                      <PlayCircleIcon className="w-6 h-6 text-m2m-neon-cyan" />
                      Watch Demo
                    </span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-m2m-divider/30">
                  {[
                  {
                    icon: UsersIcon,
                    label: '1,200+ Users'
                  },
                  {
                    icon: TargetIcon,
                    label: '98.7% Accuracy'
                  },
                  {
                    icon: CheckCircleIcon,
                    label: '24/7 Support'
                  }].
                  map((item, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="text-center">

                      <item.icon className="w-8 h-8 mx-auto mb-2 text-m2m-neon-cyan" />
                      <p className="text-sm font-semibold text-m2m-text-primary">
                        {item.label}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insights Section */}
      <section
        id="insights"
        className="py-20 px-4 sm:px-6 lg:px-8 glass-panel relative overflow-hidden">

        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
            'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.3), transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(0, 102, 255, 0.3), transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.3), transparent 50%)']

          }}
          transition={{
            duration: 10,
            repeat: Infinity
          }} />


        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Real-Time{' '}
              <span className="premium-gradient-text relative">
                Market Intelligence
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-electric-aqua to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
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
            {[
            {
              value: 98.7,
              label: 'Data Accuracy',
              suffix: '%',
              gradient: 'from-m2m-neon-cyan to-m2m-electric-aqua'
            },
            {
              value: 1247,
              label: 'Business Listings',
              suffix: '+',
              gradient: 'from-m2m-neon-blue to-m2m-electric-aqua'
            },
            {
              value: 45,
              label: 'Market Categories',
              suffix: '',
              gradient: 'from-m2m-electric-aqua to-m2m-neon-cyan'
            }].
            map((stat, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.6
              }}
              className="premium-card rounded-2xl shadow-floating p-8 glow-border text-center premium-hover-lift">

                <motion.div
                className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                initial={{
                  scale: 0
                }}
                whileInView={{
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: index * 0.2 + 0.3,
                  type: 'spring'
                }}>

                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </motion.div>
                <div className="text-m2m-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-m2m-bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Trusted by{' '}
              <span className="premium-gradient-text relative">
                Business Leaders
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-blue to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
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
              <motion.div
                className="flex"
                animate={{
                  x: `${-currentTestimonial * 100}%`
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}>

                {testimonials.map((testimonial, index) =>
                <div key={index} className="min-w-full px-4">
                    <motion.div
                    className="premium-card rounded-2xl shadow-floating p-8 glow-border relative overflow-hidden"
                    animate={{
                      opacity: currentTestimonial === index ? 1 : 0.3,
                      scale: currentTestimonial === index ? 1 : 0.95
                    }}>

                      <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-neon-cyan to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear'
                      }} />

                      <div className="flex mb-4 relative z-10">
                        {[...Array(testimonial.rating)].map((_, i) =>
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1
                        }}
                        transition={{
                          delay: i * 0.1
                        }}>

                            <StarIcon className="w-5 h-5 text-m2m-neon-cyan fill-m2m-neon-cyan" />
                          </motion.div>
                      )}
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
                  </div>
                )}
              </motion.div>
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) =>
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all ${currentTestimonial === index ? 'w-8 bg-gradient-to-r from-m2m-neon-cyan to-m2m-electric-aqua shadow-neon-glow-sm' : 'w-2 bg-m2m-divider'}`}
                whileHover={{
                  scale: 1.2
                }}
                whileTap={{
                  scale: 0.9
                }} />

              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-m2m-bg-primary relative overflow-hidden">

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-center mb-16">

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4 shadow-neon-glow-sm"
              whileHover={{
                scale: 1.05
              }}>

              <PhoneIcon className="w-4 h-4 text-m2m-neon-cyan animate-pulse" />
              <span className="text-sm font-semibold premium-gradient-text">
                Get in Touch
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-m2m-text-primary mb-4">
              Ready to{' '}
              <span className="premium-gradient-text relative">
                Transform Your Business?
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-m2m-electric-aqua to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }} />

              </span>
            </h2>
            <p className="text-xl text-m2m-text-secondary max-w-3xl mx-auto mb-8">
              Our team is here to help you find the perfect location for your
              business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                x: -50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="space-y-8">

              <div className="glass-panel rounded-2xl p-8 border border-m2m-divider">
                <h3 className="text-2xl font-bold text-m2m-text-primary mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {[
                  {
                    icon: PhoneIcon,
                    label: 'Phone',
                    value: '+63 917 123 4567'
                  },
                  {
                    icon: PhoneIcon,
                    label: 'Email',
                    value: 'hello@nearbuy.ph'
                  },
                  {
                    icon: MapPinIcon,
                    label: 'Address',
                    value: 'Tandag City, Surigao del Sur, Philippines'
                  }].
                  map((item, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="flex items-start gap-4">

                      <div className="w-12 h-12 bg-gradient-to-br from-m2m-neon-cyan to-m2m-electric-aqua rounded-xl flex items-center justify-center shadow-neon-glow-sm">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-m2m-text-secondary mb-1">
                          {item.label}
                        </p>
                        <p className="text-m2m-text-primary font-semibold">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 border border-m2m-divider">
                <h3 className="text-xl font-bold text-m2m-text-primary mb-4">
                  Business Hours
                </h3>
                <div className="space-y-3 text-m2m-text-secondary">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold text-m2m-text-primary">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-m2m-text-primary">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold text-m2m-text-primary">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="glass-panel rounded-2xl p-8 border border-m2m-divider">

              <h3 className="text-2xl font-bold text-m2m-text-primary mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      name: e.target.value
                    })
                    }
                    className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary focus:outline-none focus:border-m2m-neon-cyan focus:ring-2 focus:ring-m2m-neon-cyan/20 transition-all"
                    placeholder="John Doe" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      email: e.target.value
                    })
                    }
                    className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary focus:outline-none focus:border-m2m-neon-cyan focus:ring-2 focus:ring-m2m-neon-cyan/20 transition-all"
                    placeholder="john@example.com" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      company: e.target.value
                    })
                    }
                    className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary focus:outline-none focus:border-m2m-neon-cyan focus:ring-2 focus:ring-m2m-neon-cyan/20 transition-all"
                    placeholder="Your Company" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      message: e.target.value
                    })
                    }
                    className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary focus:outline-none focus:border-m2m-neon-cyan focus:ring-2 focus:ring-m2m-neon-cyan/20 transition-all resize-none"
                    placeholder="Tell us about your project..." />

                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 btn-premium text-white rounded-xl font-semibold shadow-neon-glow-sm"
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}>

                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-m2m-text-primary py-12 px-4 sm:px-6 lg:px-8 border-t border-m2m-divider/50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
            'radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.2), transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(0, 102, 255, 0.2), transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.2), transparent 50%)']

          }}
          transition={{
            duration: 15,
            repeat: Infinity
          }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}>

              <Logo size="md" showText={true} />
              <p className="text-m2m-text-secondary mt-4">
                AI-powered location intelligence for smart business decisions
              </p>
            </motion.div>
            {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Insights']
            },
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Contact']
            },
            {
              title: 'Stats',
              links: [
              '1,247+ Business Listings',
              '98.7% Data Accuracy',
              '45 Market Categories']

            }].
            map((section, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}>

                <h3 className="font-semibold mb-4 text-m2m-text-primary">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-m2m-text-secondary">
                  {section.links.map((link, i) =>
                <motion.li
                  key={i}
                  whileHover={{
                    x: 5
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300
                  }}>

                      <a
                    href="#"
                    className="hover:text-m2m-neon-cyan transition-colors">

                        {link}
                      </a>
                    </motion.li>
                )}
                </ul>
              </motion.div>
            )}
          </div>
          <div className="border-t border-m2m-divider/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-m2m-text-secondary text-sm">
              © 2025 NEARBUY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a
                href="#"
                className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors"
                whileHover={{
                  y: -2
                }}>

                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-m2m-text-secondary hover:text-m2m-neon-cyan transition-colors"
                whileHover={{
                  y: -2
                }}>

                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Nearby Suppliers Modal */}
      <AnimatePresence>
        {showSuppliersModal && <NearbySuppliersModal />}
      </AnimatePresence>

      {/* Business Suggestions Modal */}
      <AnimatePresence>
        {showBusinessSuggestions && <BusinessSuggestionsModal />}
      </AnimatePresence>

      {/* Auth Modal */}
      {showAuthModal &&
      <AuthModal
        mode={authMode}
        onClose={() => setShowAuthModal(false)}
        onSwitchMode={(mode) => setAuthMode(mode)} />

      }
    </div>);

}