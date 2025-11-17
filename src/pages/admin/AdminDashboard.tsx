import React, { useEffect, useState, Fragment, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersIcon, FileTextIcon, MapIcon, LogOutIcon, MenuIcon, XIcon, BellIcon, SearchIcon, UserIcon, BuildingIcon, TruckIcon, ClockIcon, StarIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, PackageIcon, CheckCircleIcon, TrendingUpIcon, BarChart3Icon, SettingsIcon, HelpCircleIcon, CameraIcon, LockIcon, SaveIcon, ChevronDownIcon, ChevronUpIcon, BookOpenIcon, MessageSquareIcon, CheckCircle2Icon, AlertCircleIcon, SendIcon, ExternalLinkIcon, KeyIcon, CloudIcon, PaletteIcon, MoonIcon, SunIcon, UserPlusIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import ThemeToggle from '../../components/ThemeToggle';
import { toast } from 'sonner';
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
const businessIcon = createCustomIcon('#1E90FF');
const supplierIcon = createCustomIcon('#F89C36');
interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
  location: string;
  joinDate: string;
  rating: number;
  status: 'Active' | 'Inactive';
  lat: number;
  lng: number;
}
interface BusinessUser extends User {
  businessType: string;
  documentCount: number;
}
interface SupplierUser extends User {
  category: string;
  productCount: number;
}
export default function AdminDashboard() {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [showBusinessUsers, setShowBusinessUsers] = useState(true);
  const [showSupplierUsers, setShowSupplierUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'profile' | 'settings' | 'help' | null>(null);
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin',
    email: user?.email || 'admin@nearbuy.com',
    phone: '+63 912 345 6789',
    role: 'Administrator'
  });
  // Settings state
  const [settingsData, setSettingsData] = useState({
    smartUsers: true,
    documents: true,
    gisZoning: true,
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    accentColor: 'blue',
    mapboxKey: '',
    cloudStorage: ''
  });
  // Help Center state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  // Alert state
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([{
    id: 1,
    type: 'order',
    message: 'New order placed by ABC Trading Co.',
    time: '2 min ago',
    unread: true
  }, {
    id: 2,
    type: 'stock',
    message: 'Fresh Produce Co. updated stock levels',
    time: '15 min ago',
    unread: true
  }, {
    id: 3,
    type: 'delivery',
    message: 'Order #12345 delivered successfully',
    time: '1 hour ago',
    unread: false
  }, {
    id: 4,
    type: 'message',
    message: 'New message from Tech Solutions Inc.',
    time: '2 hours ago',
    unread: true
  }]);
  const unreadCount = alerts.filter(a => a.unread).length;
  useEffect(() => {
    const notificationTypes = [{
      type: 'user' as const,
      messages: ['New user login: Maria Santos just logged in', 'New user registration: Juan Dela Cruz', 'User profile updated: Tech Solutions Inc.'],
      icon: <UserPlusIcon className="w-4 h-4" />
    }, {
      type: 'supplier' as const,
      messages: ['New supplier registration: Fresh Valley Farms', 'Supplier updated product catalog: BuildMart Hardware', 'New supplier verification pending'],
      icon: <TruckIcon className="w-4 h-4" />
    }, {
      type: 'document' as const,
      messages: ['Document status changed: Approved', 'New document uploaded by Green Valley Farms', 'Document verification required'],
      icon: <FileTextIcon className="w-4 h-4" />
    }];
    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      const newAlert: Alert = {
        id: Date.now(),
        type: randomType.type,
        message: randomMessage,
        time: 'Just now',
        unread: true,
        icon: randomType.icon
      };
      setAlerts(prev => [newAlert, ...prev]);
      toast.success(randomMessage, {
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => {
            setActiveTab('alerts');
            setAlertsOpen(false);
          }
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  // Mock data
  const businessUsers: BusinessUser[] = [{
    id: '1',
    name: 'Green Valley Farms',
    businessType: 'Agriculture',
    email: 'contact@greenvalley.com',
    contact: '+63 912 345 6789',
    location: 'Butuan City',
    joinDate: 'Jan 15, 2024',
    rating: 4.8,
    status: 'Active',
    documentCount: 12,
    lat: 8.9475,
    lng: 125.5406
  }, {
    id: '2',
    name: 'Metro Construction Co.',
    businessType: 'Construction',
    email: 'info@metroconstruction.com',
    contact: '+63 923 456 7890',
    location: 'Agusan del Norte',
    joinDate: 'Feb 20, 2024',
    rating: 4.9,
    status: 'Active',
    documentCount: 18,
    lat: 8.955,
    lng: 125.545
  }, {
    id: '3',
    name: 'TechHub Solutions',
    businessType: 'Technology',
    email: 'hello@techhub.com',
    contact: '+63 934 567 8901',
    location: 'Butuan Business District',
    joinDate: 'Mar 10, 2024',
    rating: 4.7,
    status: 'Active',
    documentCount: 15,
    lat: 8.94,
    lng: 125.535
  }];
  const supplierUsers: SupplierUser[] = [{
    id: '1',
    name: 'Fresh Produce Suppliers',
    category: 'Food & Beverage',
    email: 'sales@freshproduce.com',
    contact: '+63 945 678 9012',
    location: 'Butuan Port Area',
    joinDate: 'Jan 25, 2024',
    rating: 4.9,
    status: 'Active',
    productCount: 156,
    lat: 8.96,
    lng: 125.52
  }, {
    id: '2',
    name: 'BuildMart Hardware',
    category: 'Construction Materials',
    email: 'orders@buildmart.com',
    contact: '+63 956 789 0123',
    location: 'Industrial Zone',
    joinDate: 'Feb 05, 2024',
    rating: 4.8,
    status: 'Active',
    productCount: 243,
    lat: 8.93,
    lng: 125.53
  }, {
    id: '3',
    name: 'Office Essentials Inc.',
    category: 'Office Supplies',
    email: 'support@officeessentials.com',
    contact: '+63 967 890 1234',
    location: 'Commercial District',
    joinDate: 'Mar 15, 2024',
    rating: 4.7,
    status: 'Active',
    productCount: 189,
    lat: 8.97,
    lng: 125.54
  }];
  const totalUsers = businessUsers.length + supplierUsers.length;
  const pendingDocuments = 8;
  const centerPosition: [number, number] = [8.9475, 125.5406];
  // Documents state
  const [documentSearchQuery, setDocumentSearchQuery] = useState('');
  const [documentStatusFilter, setDocumentStatusFilter] = useState('all');
  const [documentUserFilter, setDocumentUserFilter] = useState('all');
  const [documentMethodFilter, setDocumentMethodFilter] = useState('all');
  // GIS Zoning state
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [showZoneLegend, setShowZoneLegend] = useState(true);
  // Mock document data
  const documentSubmissions = [{
    id: 1,
    user: 'Green Valley Farms',
    userType: 'Business',
    documentType: 'Business Permit',
    status: 'Approved',
    payment: '₱2,500',
    date: 'Jan 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
  }, {
    id: 2,
    user: 'Fresh Produce Suppliers',
    userType: 'Supplier',
    documentType: 'Tax Clearance',
    status: 'Pending',
    payment: '₱1,800',
    date: 'Jan 18, 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  }, {
    id: 3,
    user: 'Metro Construction Co.',
    userType: 'Business',
    documentType: 'Environmental Permit',
    status: 'Under Review',
    payment: '₱3,200',
    date: 'Jan 20, 2024',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100'
  }, {
    id: 4,
    user: 'BuildMart Hardware',
    userType: 'Supplier',
    documentType: 'Business Permit',
    status: 'Approved',
    payment: '₱2,500',
    date: 'Jan 22, 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  }, {
    id: 5,
    user: 'TechHub Solutions',
    userType: 'Business',
    documentType: 'Fire Safety Certificate',
    status: 'Rejected',
    payment: '₱1,500',
    date: 'Jan 25, 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  }];
  // GIS Zone data for Tandag City
  const tandagZones = [{
    id: 1,
    name: 'Commercial District',
    type: 'Commercial',
    color: '#3B82F6',
    bounds: [[9.08, 126.19], [9.08, 126.21], [9.07, 126.21], [9.07, 126.19]],
    classification: 'C-1 (Central Business District)',
    hazardLevel: 'Low',
    population: '15,000',
    area: '2.5 km²',
    regulations: 'Commercial activities permitted. Building height limit: 10 floors.'
  }, {
    id: 2,
    name: 'Residential Area North',
    type: 'Residential',
    color: '#10B981',
    bounds: [[9.09, 126.19], [9.09, 126.21], [9.08, 126.21], [9.08, 126.19]],
    classification: 'R-1 (Low Density Residential)',
    hazardLevel: 'Low',
    population: '8,500',
    area: '3.2 km²',
    regulations: 'Residential use only. Maximum 2-story structures.'
  }, {
    id: 3,
    name: 'Educational Zone',
    type: 'Educational',
    color: '#8B5CF6',
    bounds: [[9.075, 126.185], [9.075, 126.195], [9.07, 126.195], [9.07, 126.185]],
    classification: 'ED-1 (Educational Facilities)',
    hazardLevel: 'Low',
    population: '3,200',
    area: '1.8 km²',
    regulations: 'Educational institutions and related facilities only.'
  }, {
    id: 4,
    name: 'Recreational Park',
    type: 'Recreational',
    color: '#F59E0B',
    bounds: [[9.08, 126.205], [9.08, 126.215], [9.075, 126.215], [9.075, 126.205]],
    classification: 'REC-1 (Public Recreation)',
    hazardLevel: 'Low',
    population: 'N/A',
    area: '1.2 km²',
    regulations: 'Open space and recreational facilities only.'
  }, {
    id: 5,
    name: 'Industrial Zone',
    type: 'Industrial',
    color: '#EF4444',
    bounds: [[9.065, 126.19], [9.065, 126.21], [9.06, 126.21], [9.06, 126.19]],
    classification: 'I-1 (Light Industrial)',
    hazardLevel: 'Medium',
    population: '2,100',
    area: '4.5 km²',
    regulations: 'Light manufacturing and warehousing permitted.'
  }, {
    id: 6,
    name: 'Healthcare District',
    type: 'Healthcare',
    color: '#EC4899',
    bounds: [[9.085, 126.185], [9.085, 126.195], [9.08, 126.195], [9.08, 126.185]],
    classification: 'H-1 (Medical Facilities)',
    hazardLevel: 'Low',
    population: '1,800',
    area: '0.8 km²',
    regulations: 'Healthcare facilities and medical services only.'
  }, {
    id: 7,
    name: 'Flood-Prone Area',
    type: 'Hazard',
    color: '#DC2626',
    bounds: [[9.07, 126.215], [9.07, 126.225], [9.065, 126.225], [9.065, 126.215]],
    classification: 'HZ-1 (High Risk Zone)',
    hazardLevel: 'High',
    population: '500',
    area: '1.5 km²',
    regulations: 'Development restricted. Evacuation plan required.'
  }];
  const tandagCenter: [number, number] = [9.0778, 126.1986];
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-m2m-success/20 text-m2m-success';
      case 'pending':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow';
      case 'under review':
        return 'bg-m2m-accent-blue/20 text-m2m-accent-blue';
      case 'rejected':
        return 'bg-m2m-accent-orange/20 text-m2m-accent-orange';
      default:
        return 'bg-m2m-divider text-m2m-text-secondary';
    }
  };
  const getZoneIcon = (type: string) => {
    switch (type) {
      case 'Commercial':
        return BuildingIcon;
      case 'Residential':
        return UsersIcon;
      case 'Educational':
        return BookOpenIcon;
      case 'Recreational':
        return TrendingUpIcon;
      case 'Industrial':
        return PackageIcon;
      case 'Healthcare':
        return HelpCircleIcon;
      case 'Hazard':
        return AlertCircleIcon;
      default:
        return MapIcon;
    }
  };
  const filteredDocuments = documentSubmissions.filter(doc => {
    const matchesSearch = doc.user.toLowerCase().includes(documentSearchQuery.toLowerCase()) || doc.documentType.toLowerCase().includes(documentSearchQuery.toLowerCase());
    const matchesStatus = documentStatusFilter === 'all' || doc.status.toLowerCase() === documentStatusFilter.toLowerCase();
    const matchesUser = documentUserFilter === 'all' || doc.userType.toLowerCase() === documentUserFilter.toLowerCase();
    const matchesMethod = documentMethodFilter === 'all';
    return matchesSearch && matchesStatus && matchesUser && matchesMethod;
  });
  const handleClearFilters = () => {
    setDocumentSearchQuery('');
    setDocumentStatusFilter('all');
    setDocumentUserFilter('all');
    setDocumentMethodFilter('all');
    toast.success('Filters cleared');
  };
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };
  const navItems = [{
    id: 'users',
    icon: UsersIcon,
    label: 'Smart Users'
  }, {
    id: 'alerts',
    icon: BellIcon,
    label: 'Alerts'
  }, {
    id: 'documents',
    icon: FileTextIcon,
    label: 'Documents'
  }, {
    id: 'gis',
    icon: MapIcon,
    label: 'GIS Zoning'
  }];
  const handleMarkAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      unread: false
    } : alert));
  };
  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({
      ...alert,
      unread: false
    })));
    toast.success('All notifications marked as read');
  };
  const handleClearAll = () => {
    setAlerts([]);
    toast.success('All notifications cleared');
  };
  const handleBellClick = () => {
    setActiveTab('alerts');
    setAlertsOpen(false);
  };
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UserPlusIcon className="w-5 h-5 text-blue-500" />;
      case 'supplier':
        return <TruckIcon className="w-5 h-5 text-orange-500" />;
      case 'document':
        return <FileTextIcon className="w-5 h-5 text-teal-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  const getAlertCategoryColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-700';
      case 'supplier':
        return 'bg-orange-100 text-orange-700';
      case 'document':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  const userMenuItems = [{
    label: 'Profile',
    icon: UserIcon,
    action: () => {
      setUserMenuOpen(false);
      setActiveDrawer('profile');
    }
  }, {
    label: 'Settings',
    icon: SettingsIcon,
    action: () => {
      setUserMenuOpen(false);
      setActiveDrawer('settings');
    }
  }, {
    label: 'Help Center',
    icon: HelpCircleIcon,
    action: () => {
      setUserMenuOpen(false);
      setActiveDrawer('help');
    }
  }, {
    label: 'Logout',
    icon: LogOutIcon,
    action: handleLogout,
    danger: true
  }];
  const filteredBusinessUsers = businessUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredSupplierUsers = supplierUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const userProfilePhoto = user?.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200';
  const faqs = [{
    question: 'How to approve new users?',
    answer: 'Navigate to the Smart Users section, find pending users, and click the "Approve" button. You can review their documents before approval.'
  }, {
    question: 'How to manage supplier documents?',
    answer: 'Go to the Documents tab, filter by supplier, and you can view, approve, or request revisions for submitted documents.'
  }, {
    question: 'How to reset my password?',
    answer: 'Click on Profile, then navigate to the Security section and click "Change Password". Enter your current password and new password.'
  }];
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setActiveDrawer(null);
  };
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
    setActiveDrawer(null);
  };
  const handleSendFeedback = () => {
    if (feedback.trim()) {
      toast.success('Feedback submitted successfully!');
      setFeedback('');
      setActiveDrawer(null);
    } else {
      toast.error('Please enter your feedback');
    }
  };
  return <div className="min-h-screen bg-m2m-bg-primary">
      {/* Fixed Sidebar - Desktop */}
      <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 bg-m2m-bg-card border-r border-m2m-divider shadow-xl z-40 flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5 relative">
            {!sidebarCollapsed ? <div className="flex items-center space-x-3">
                <motion.img whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              type: 'spring',
              stiffness: 400
            }} src="/Gemini_Generated_Image_gkv9vygkv9vygkv9.png" alt="NEARBUY Logo" className="w-12 h-12 rounded-xl shadow-lg" />
                <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }}>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-m2m-accent-blue via-m2m-accent-teal to-m2m-accent-blue bg-clip-text text-transparent">
                    NEARBUY
                  </h1>
                  <p className="text-xs text-m2m-text-secondary">
                    Admin Portal
                  </p>
                </motion.div>
              </div> : <motion.img initial={{
            scale: 0.8
          }} animate={{
            scale: 1
          }} whileHover={{
            scale: 1.1,
            rotate: 5
          }} transition={{
            type: 'spring',
            stiffness: 400
          }} src="/Gemini_Generated_Image_gkv9vygkv9vygkv9.png" alt="NEARBUY Logo" className="w-10 h-10 rounded-xl shadow-lg mx-auto" />}
            {/* Toggle Button */}
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-m2m-accent-blue rounded-full flex items-center justify-center shadow-lg hover:bg-m2m-accent-teal transition-colors">
              {sidebarCollapsed ? <ChevronRightIcon className="w-4 h-4 text-white" /> : <ChevronLeftIcon className="w-4 h-4 text-white" />}
            </motion.button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return <motion.button key={item.id} whileHover={{
              x: sidebarCollapsed ? 0 : 6,
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start space-x-3 px-4'} py-3.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-lg shadow-m2m-accent-blue/30' : 'text-m2m-text-secondary hover:bg-gradient-to-r hover:from-m2m-accent-blue/10 hover:to-m2m-accent-teal/10 hover:text-m2m-text-primary'} group relative`} title={sidebarCollapsed ? item.label : undefined}>
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  {item.id === 'alerts' && unreadCount > 0 && !sidebarCollapsed && <motion.span initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                        {unreadCount}
                      </motion.span>}
                  {sidebarCollapsed && !isActive && <div className="absolute left-full ml-2 px-3 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      <span className="text-sm font-medium text-m2m-text-primary">
                        {item.label}
                      </span>
                    </div>}
                </motion.button>;
          })}
          </nav>
          {/* User Info */}
          <div className="p-4 border-t border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5">
            {!sidebarCollapsed ? <motion.div whileHover={{
            scale: 1.02
          }} className="flex items-center space-x-3 px-4 py-3 bg-m2m-bg-primary rounded-xl shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary truncate">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-m2m-text-secondary truncate">
                    Administrator
                  </p>
                </div>
              </motion.div> : <motion.div whileHover={{
            scale: 1.1
          }} className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer" title={user?.name || 'Admin'}>
                <UserIcon className="w-6 h-6 text-white" />
              </motion.div>}
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{
          x: '-100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '-100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed left-0 top-0 bottom-0 w-72 bg-m2m-bg-card shadow-2xl z-50 flex flex-col lg:hidden">
              <div className="flex items-center justify-between p-6 border-b border-m2m-divider">
                <div className="flex items-center space-x-3">
                  <img src="/Gemini_Generated_Image_gkv9vygkv9vygkv9.png" alt="NEARBUY Logo" className="w-10 h-10 rounded-lg shadow-lg" />
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-m2m-accent-blue via-m2m-accent-teal to-m2m-accent-blue bg-clip-text text-transparent">
                      NEARBUY
                    </h1>
                    <p className="text-xs text-m2m-text-secondary">
                      Admin Portal
                    </p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-m2m-bg-primary rounded-lg">
                  <XIcon className="w-5 h-5 text-m2m-text-secondary" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return <button key={item.id} onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'text-m2m-text-secondary hover:bg-m2m-bg-primary hover:text-m2m-text-primary'}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>;
            })}
              </nav>
            </motion.aside>
          </>}
      </AnimatePresence>
      {/* Main Content */}
      <div className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Header */}
        <header className="bg-m2m-bg-card border-b border-m2m-divider sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-m2m-bg-primary rounded-xl transition-colors">
              <MenuIcon className="w-6 h-6 text-m2m-text-primary" />
            </button>
            <div className="flex-1 lg:flex-none" />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {/* Bell Icon - Navigate to Alerts */}
              <div className="relative">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleBellClick} className="p-2.5 hover:bg-m2m-bg-primary rounded-xl relative transition-colors" title="View Alerts">
                  <motion.div animate={unreadCount > 0 ? {
                  rotate: [0, -15, 15, -15, 15, 0]
                } : {}} transition={{
                  duration: 0.5,
                  repeat: unreadCount > 0 ? Infinity : 0,
                  repeatDelay: 3
                }}>
                    <BellIcon className="w-6 h-6 text-m2m-text-secondary" />
                  </motion.div>
                  {unreadCount > 0 && <>
                      <motion.span animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full" />
                      <motion.span initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-[9px] text-white font-bold">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </motion.span>
                    </>}
                </motion.button>
              </div>
              {/* User Profile Dropdown */}
              <div className="relative">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2 p-1.5 hover:bg-m2m-bg-primary rounded-xl transition-colors group">
                  <div className="relative">
                    <img src={userProfilePhoto} alt={user?.name || 'Admin'} className="w-10 h-10 rounded-full object-cover border-2 border-m2m-divider group-hover:border-m2m-accent-blue transition-colors shadow-md" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-m2m-accent-blue rounded-full border-2 border-m2m-bg-card flex items-center justify-center shadow-lg">
                      <UserIcon className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                </motion.button>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && <>
                      {/* Backdrop */}
                      <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} transition={{
                    duration: 0.15
                  }} className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      {/* Menu */}
                      <motion.div initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} transition={{
                    duration: 0.2,
                    ease: 'easeInOut'
                  }} className="absolute right-0 mt-2 w-64 bg-m2m-bg-card border border-m2m-divider rounded-2xl shadow-2xl z-50 py-2 overflow-hidden">
                        {/* User Info Header with Profile Photo */}
                        <div className="px-4 py-3 border-b border-m2m-divider bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5">
                          <div className="flex items-center space-x-3">
                            <img src={userProfilePhoto} alt={user?.name || 'Admin'} className="w-12 h-12 rounded-full object-cover border-2 border-m2m-accent-blue shadow-md" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-m2m-text-primary truncate">
                                {user?.name || 'Admin'}
                              </p>
                              <p className="text-xs text-m2m-text-secondary truncate">
                                {user?.email || 'admin@nearbuy.com'}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <UserIcon className="w-3 h-3 text-m2m-accent-blue" />
                                <span className="text-xs text-m2m-accent-blue font-medium">
                                  Administrator
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return <motion.button key={index} whileHover={{
                          x: 4
                        }} transition={{
                          duration: 0.2,
                          ease: 'easeInOut'
                        }} onClick={item.action} className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all ${item.danger ? 'text-m2m-accent-orange hover:bg-m2m-accent-orange/10' : 'text-m2m-text-secondary hover:bg-m2m-bg-primary hover:text-m2m-text-primary'}`}>
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                  {item.label}
                                </span>
                              </motion.button>;
                      })}
                        </div>
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-m2m-bg-primary">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-xl flex items-center justify-center shadow-lg">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-m2m-text-secondary text-sm mb-1">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-m2m-text-primary">
                  {totalUsers}
                </p>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-m2m-accent-blue/20 rounded-xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-m2m-accent-blue rounded-full" />
                  </div>
                </div>
                <h3 className="text-m2m-text-secondary text-sm mb-1">
                  Business Users
                </h3>
                <p className="text-3xl font-bold text-m2m-text-primary">
                  {businessUsers.length}
                </p>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-m2m-accent-orange/20 rounded-xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-m2m-accent-orange rounded-full" />
                  </div>
                </div>
                <h3 className="text-m2m-text-secondary text-sm mb-1">
                  Supplier Users
                </h3>
                <p className="text-3xl font-bold text-m2m-text-primary">
                  {supplierUsers.length}
                </p>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-m2m-chart-yellow/20 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-m2m-chart-yellow" />
                  </div>
                </div>
                <h3 className="text-m2m-text-secondary text-sm mb-1">
                  Pending Documents
                </h3>
                <p className="text-3xl font-bold text-m2m-text-primary">
                  {pendingDocuments}
                </p>
              </motion.div>
            </div>
            {/* Tab Content */}
            {activeTab === 'users' && <div className="space-y-6">
                {/* Interactive User Map Panel */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                        Interactive User Map
                      </h2>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-m2m-success rounded-full animate-pulse" />
                        <span className="text-sm text-m2m-text-secondary">
                          Admin Map Active
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Toggle Switches */}
                      <div className="flex items-center space-x-3 bg-m2m-bg-primary px-4 py-2 rounded-lg">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={showBusinessUsers} onChange={e => setShowBusinessUsers(e.target.checked)} />
                          <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-accent-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-m2m-accent-blue"></div>
                        </label>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          Business Users
                        </span>
                        <div className="w-3 h-3 bg-m2m-accent-blue rounded-full" />
                      </div>
                      <div className="flex items-center space-x-3 bg-m2m-bg-primary px-4 py-2 rounded-lg">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={showSupplierUsers} onChange={e => setShowSupplierUsers(e.target.checked)} />
                          <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-m2m-accent-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-m2m-accent-orange"></div>
                        </label>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          Supplier Users
                        </span>
                        <div className="w-3 h-3 bg-m2m-accent-orange rounded-full" />
                      </div>
                      {/* Search Bar */}
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                      </div>
                    </div>
                  </div>
                  {/* Map Container */}
                  <div className="rounded-lg overflow-hidden shadow-md border border-m2m-divider" style={{
                height: '500px'
              }}>
                    <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} style={{
                  height: '100%',
                  width: '100%'
                }} zoomControl={false}>
                      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
                      <ZoomControl position="bottomright" />
                      {/* Business User Markers */}
                      {showBusinessUsers && filteredBusinessUsers.map(user => <Marker key={user.id} position={[user.lat, user.lng]} icon={businessIcon}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900 mb-1">
                                  {user.name}
                                </h3>
                                <p className="text-xs text-gray-600 mb-1">
                                  {user.businessType}
                                </p>
                                <div className="flex items-center">
                                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs">{user.rating}</span>
                                </div>
                              </div>
                            </Popup>
                          </Marker>)}
                      {/* Supplier User Markers */}
                      {showSupplierUsers && filteredSupplierUsers.map(user => <Marker key={user.id} position={[user.lat, user.lng]} icon={supplierIcon}>
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-bold text-gray-900 mb-1">
                                  {user.name}
                                </h3>
                                <p className="text-xs text-gray-600 mb-1">
                                  {user.category}
                                </p>
                                <div className="flex items-center">
                                  <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs">{user.rating}</span>
                                </div>
                              </div>
                            </Popup>
                          </Marker>)}
                    </MapContainer>
                  </div>
                </motion.div>
                {/* User Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Business Users List */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-m2m-accent-blue/20 rounded-lg flex items-center justify-center">
                        <BuildingIcon className="w-6 h-6 text-m2m-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-m2m-text-primary">
                        Business Users
                      </h3>
                    </div>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {filteredBusinessUsers.map((user, index) => <motion.div key={user.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: 0.1 * index
                  }} className="bg-m2m-bg-primary rounded-xl p-4 border border-m2m-divider hover:border-m2m-accent-blue transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-m2m-text-primary mb-1">
                                {user.name}
                              </h4>
                              <p className="text-xs text-m2m-text-secondary">
                                {user.businessType}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-m2m-chart-yellow fill-current" />
                              <span className="text-sm font-medium text-m2m-text-primary">
                                {user.rating}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <MailIcon className="w-4 h-4" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <PhoneIcon className="w-4 h-4" />
                              <span>{user.contact}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <CalendarIcon className="w-4 h-4" />
                              <span>Joined {user.joinDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="px-2 py-1 bg-m2m-success/20 text-m2m-success text-xs font-medium rounded">
                                {user.status}
                              </span>
                              <span className="text-xs text-m2m-text-secondary">
                                {user.documentCount} docs
                              </span>
                            </div>
                            <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} className="px-4 py-2 bg-m2m-accent-blue text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                              <EyeIcon className="w-4 h-4" />
                              <span>View</span>
                            </motion.button>
                          </div>
                        </motion.div>)}
                    </div>
                  </motion.div>
                  {/* Supplier Users List */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.7
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-m2m-accent-orange/20 rounded-lg flex items-center justify-center">
                        <TruckIcon className="w-6 h-6 text-m2m-accent-orange" />
                      </div>
                      <h3 className="text-xl font-bold text-m2m-text-primary">
                        Supplier Users
                      </h3>
                    </div>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {filteredSupplierUsers.map((user, index) => <motion.div key={user.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: 0.1 * index
                  }} className="bg-m2m-bg-primary rounded-xl p-4 border border-m2m-divider hover:border-m2m-accent-orange transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-m2m-text-primary mb-1">
                                {user.name}
                              </h4>
                              <p className="text-xs text-m2m-text-secondary">
                                {user.category}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-m2m-chart-yellow fill-current" />
                              <span className="text-sm font-medium text-m2m-text-primary">
                                {user.rating}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <MailIcon className="w-4 h-4" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <PhoneIcon className="w-4 h-4" />
                              <span>{user.contact}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-m2m-text-secondary">
                              <CalendarIcon className="w-4 h-4" />
                              <span>Joined {user.joinDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="px-2 py-1 bg-m2m-success/20 text-m2m-success text-xs font-medium rounded">
                                {user.status}
                              </span>
                              <span className="text-xs text-m2m-text-secondary">
                                {user.productCount} products
                              </span>
                            </div>
                            <motion.button whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} className="px-4 py-2 bg-m2m-accent-orange text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                              <EyeIcon className="w-4 h-4" />
                              <span>View</span>
                            </motion.button>
                          </div>
                        </motion.div>)}
                    </div>
                  </motion.div>
                </div>
              </div>}
            {/* Alerts Tab */}
            {activeTab === 'alerts' && <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
                {/* Alert Page Header */}
                <div className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-m2m-text-primary mb-2 flex items-center">
                        <BellIcon className="w-7 h-7 mr-3 text-m2m-accent-blue" />
                        System Alerts & Notifications
                      </h2>
                      <p className="text-sm text-m2m-text-secondary">
                        Monitor all system events and activities in real-time
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={handleMarkAllAsRead} disabled={unreadCount === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-m2m-accent-blue text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <CheckCircle2Icon className="w-4 h-4" />
                        <span>Mark All Read</span>
                      </motion.button>
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={handleClearAll} disabled={alerts.length === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-m2m-accent-orange text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <XIcon className="w-4 h-4" />
                        <span>Clear All</span>
                      </motion.button>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-m2m-bg-primary rounded-xl p-4 border border-m2m-divider">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <BellIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-m2m-text-primary">
                            {unreadCount}
                          </p>
                          <p className="text-xs text-m2m-text-secondary">
                            Unread Alerts
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-m2m-bg-primary rounded-xl p-4 border border-m2m-divider">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CheckCircle2Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-m2m-text-primary">
                            {alerts.length - unreadCount}
                          </p>
                          <p className="text-xs text-m2m-text-secondary">
                            Read Alerts
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-m2m-bg-primary rounded-xl p-4 border border-m2m-divider">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <TrendingUpIcon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-m2m-text-primary">
                            {alerts.length}
                          </p>
                          <p className="text-xs text-m2m-text-secondary">
                            Total Alerts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Alerts List */}
                <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider overflow-hidden">
                  {alerts.length === 0 ? <div className="p-16 text-center">
                      <BellIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-m2m-text-primary mb-2">
                        No Alerts
                      </h3>
                      <p className="text-m2m-text-secondary">
                        You're all caught up! No notifications at this time.
                      </p>
                    </div> : <div className="divide-y divide-m2m-divider">
                      <AnimatePresence mode="popLayout">
                        {alerts.map((alert, index) => <motion.div key={alert.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} exit={{
                    opacity: 0,
                    x: 20,
                    height: 0
                  }} transition={{
                    delay: index * 0.05,
                    duration: 0.3
                  }} className={`p-6 hover:bg-m2m-bg-primary/50 transition-all duration-300 cursor-pointer ${alert.unread ? 'bg-blue-50/50' : ''}`} onClick={() => handleMarkAsRead(alert.id)}>
                            <div className="flex items-start space-x-4">
                              <motion.div whileHover={{
                        scale: 1.2,
                        rotate: 10
                      }} className="mt-1 flex-shrink-0">
                                {alert.icon || getAlertIcon(alert.type)}
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <p className={`text-sm font-medium ${alert.unread ? 'text-m2m-text-primary' : 'text-m2m-text-secondary'}`}>
                                    {alert.message}
                                  </p>
                                  {alert.unread && <motion.div initial={{
                            scale: 0
                          }} animate={{
                            scale: 1
                          }} className="w-2.5 h-2.5 bg-red-500 rounded-full ml-3 mt-1 flex-shrink-0" />}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className="text-xs text-m2m-text-secondary flex items-center">
                                    <ClockIcon className="w-3 h-3 mr-1" />
                                    {alert.time}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAlertCategoryColor(alert.type)}`}>
                                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${alert.unread ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {alert.unread ? 'Unread' : 'Read'}
                                  </span>
                                </div>
                              </div>
                              <motion.button whileHover={{
                        scale: 1.1
                      }} whileTap={{
                        scale: 0.9
                      }} onClick={e => {
                        e.stopPropagation();
                        handleMarkAsRead(alert.id);
                      }} className="p-2 hover:bg-m2m-bg-primary rounded-lg transition-colors">
                                <CheckCircle2Icon className="w-5 h-5 text-m2m-accent-blue" />
                              </motion.button>
                            </div>
                          </motion.div>)}
                      </AnimatePresence>
                    </div>}
                </div>
              </motion.div>}
            {/* Enhanced Documents Tab */}
            {activeTab === 'documents' && <div className="space-y-6">
                {/* Document Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)'
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal rounded-xl flex items-center justify-center shadow-lg">
                        <FileTextIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-m2m-text-secondary text-sm mb-1">
                      Total Documents
                    </h3>
                    <p className="text-3xl font-bold text-m2m-text-primary">
                      127
                    </p>
                    <p className="text-xs text-m2m-success mt-2">
                      +12% from last month
                    </p>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)'
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-m2m-chart-yellow/20 rounded-xl flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-m2m-chart-yellow" />
                      </div>
                    </div>
                    <h3 className="text-m2m-text-secondary text-sm mb-1">
                      Pending Review
                    </h3>
                    <p className="text-3xl font-bold text-m2m-text-primary">
                      {pendingDocuments}
                    </p>
                    <p className="text-xs text-m2m-chart-yellow mt-2">
                      Requires attention
                    </p>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-m2m-success/20 rounded-xl flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-m2m-success" />
                      </div>
                    </div>
                    <h3 className="text-m2m-text-secondary text-sm mb-1">
                      Approved
                    </h3>
                    <p className="text-3xl font-bold text-m2m-text-primary">
                      98
                    </p>
                    <p className="text-xs text-m2m-success mt-2">
                      77% approval rate
                    </p>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(0, 179, 164, 0.2)'
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-m2m-accent-teal/20 rounded-xl flex items-center justify-center">
                        <TrendingUpIcon className="w-6 h-6 text-m2m-accent-teal" />
                      </div>
                    </div>
                    <h3 className="text-m2m-text-secondary text-sm mb-1">
                      Total Revenue
                    </h3>
                    <p className="text-3xl font-bold text-m2m-text-primary">
                      ₱287K
                    </p>
                    <p className="text-xs text-m2m-accent-teal mt-2">
                      +18% growth
                    </p>
                  </motion.div>
                </div>
                {/* Filters Section */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                  <h3 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
                    <SettingsIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Filters & Search
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                      <input type="text" placeholder="Search documents..." value={documentSearchQuery} onChange={e => setDocumentSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                    </div>
                    <select value={documentStatusFilter} onChange={e => setDocumentStatusFilter(e.target.value)} className="px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors">
                      <option value="all">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="under review">Under Review</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <select value={documentUserFilter} onChange={e => setDocumentUserFilter(e.target.value)} className="px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors">
                      <option value="all">All Users</option>
                      <option value="business">Business</option>
                      <option value="supplier">Supplier</option>
                    </select>
                    <select value={documentMethodFilter} onChange={e => setDocumentMethodFilter(e.target.value)} className="px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors">
                      <option value="all">All Methods</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={handleClearFilters} className="px-4 py-3 bg-m2m-accent-orange text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      <XIcon className="w-5 h-5" />
                      <span>Clear Filters</span>
                    </motion.button>
                  </div>
                </motion.div>
                {/* Document Submissions Table */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider overflow-hidden">
                  <div className="p-6 border-b border-m2m-divider">
                    <h3 className="text-lg font-bold text-m2m-text-primary flex items-center">
                      <FileTextIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                      Document Submissions
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-m2m-bg-primary border-b border-m2m-divider">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            Document Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-m2m-text-secondary uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-m2m-divider">
                        {filteredDocuments.map((doc, index) => <motion.tr key={doc.id} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      delay: 0.1 * index
                    }} whileHover={{
                      backgroundColor: 'rgba(37, 99, 235, 0.05)'
                    }} className="transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <img src={doc.avatar} alt={doc.user} className="w-10 h-10 rounded-full object-cover border-2 border-m2m-divider" />
                                <div>
                                  <p className="text-sm font-medium text-m2m-text-primary">
                                    {doc.user}
                                  </p>
                                  <p className="text-xs text-m2m-text-secondary">
                                    {doc.userType}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-m2m-text-primary">
                                {doc.documentType}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm font-semibold text-m2m-text-primary">
                                {doc.payment}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-m2m-text-secondary">
                                {doc.date}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <motion.button whileHover={{
                            scale: 1.1
                          }} whileTap={{
                            scale: 0.9
                          }} className="p-2 bg-m2m-accent-blue/10 text-m2m-accent-blue rounded-lg hover:bg-m2m-accent-blue hover:text-white transition-all" title="View">
                                  <EyeIcon className="w-4 h-4" />
                                </motion.button>
                                <motion.button whileHover={{
                            scale: 1.1
                          }} whileTap={{
                            scale: 0.9
                          }} className="p-2 bg-m2m-accent-teal/10 text-m2m-accent-teal rounded-lg hover:bg-m2m-accent-teal hover:text-white transition-all" title="Download">
                                  <ExternalLinkIcon className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-m2m-bg-primary border-t border-m2m-divider flex items-center justify-between">
                    <p className="text-sm text-m2m-text-secondary">
                      Showing {filteredDocuments.length} of{' '}
                      {documentSubmissions.length} documents
                    </p>
                    <div className="flex items-center space-x-2">
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} className="px-4 py-2 bg-m2m-bg-card border border-m2m-divider text-m2m-text-primary rounded-lg hover:bg-m2m-accent-blue/10 transition-all">
                        Previous
                      </motion.button>
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} className="px-4 py-2 bg-m2m-accent-blue text-white rounded-lg hover:shadow-lg transition-all">
                        Next
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>}
            {/* Enhanced GIS Zoning Tab */}
            {activeTab === 'gis' && <div className="space-y-6">
                {/* GIS Header */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-m2m-text-primary mb-2 flex items-center">
                        <MapIcon className="w-7 h-7 mr-3 text-m2m-accent-blue" />
                        GIS Zoning Map - Tandag City
                      </h2>
                      <p className="text-sm text-m2m-text-secondary">
                        Interactive zoning map with real-time updates
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-m2m-success rounded-full animate-pulse" />
                      <span className="text-sm text-m2m-success font-medium">
                        Live
                      </span>
                    </div>
                  </div>
                </motion.div>
                {/* Map and Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map Container */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="lg:col-span-2 bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider overflow-hidden">
                    <div className="p-4 border-b border-m2m-divider flex items-center justify-between">
                      <h3 className="text-lg font-bold text-m2m-text-primary">
                        Zone Map
                      </h3>
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => setShowZoneLegend(!showZoneLegend)} className="px-3 py-1.5 bg-m2m-accent-blue text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                        {showZoneLegend ? 'Hide' : 'Show'} Legend
                      </motion.button>
                    </div>
                    <div style={{
                  height: '600px'
                }} className="relative">
                      <MapContainer center={tandagCenter} zoom={13} scrollWheelZoom={true} style={{
                    height: '100%',
                    width: '100%'
                  }} zoomControl={false}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
                        <ZoomControl position="bottomright" />
                        {/* Zone Polygons */}
                        {tandagZones.map(zone => {
                      const L = require('leaflet');
                      const polygon = L.polygon(zone.bounds, {
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: 0.3,
                        weight: 2
                      });
                      return <Fragment key={zone.id}>
                              {/* This is a simplified representation - in production you'd use Polygon component */}
                              <Marker position={[(zone.bounds[0][0] + zone.bounds[2][0]) / 2, (zone.bounds[0][1] + zone.bounds[2][1]) / 2]} icon={new Icon({
                          iconUrl: `data:image/svg+xml;base64,${btoa(`
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                        <circle cx="12" cy="12" r="10" fill="${zone.color}" opacity="0.8" stroke="white" stroke-width="2"/>
                                      </svg>
                                    `)}`,
                          iconSize: [32, 32],
                          iconAnchor: [16, 16]
                        })} eventHandlers={{
                          click: () => setSelectedZone(zone)
                        }}>
                                <Popup>
                                  <div className="p-2">
                                    <h4 className="font-bold text-gray-900 mb-1">
                                      {zone.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-1">
                                      {zone.type}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Click for details
                                    </p>
                                  </div>
                                </Popup>
                              </Marker>
                            </Fragment>;
                    })}
                      </MapContainer>
                      {/* Zone Legend Overlay */}
                      <AnimatePresence>
                        {showZoneLegend && <motion.div initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} exit={{
                      opacity: 0,
                      x: -20
                    }} className="absolute bottom-4 left-4 bg-m2m-bg-card rounded-xl shadow-2xl p-4 border border-m2m-divider z-[1000] max-w-xs">
                            <h4 className="text-sm font-bold text-m2m-text-primary mb-3">
                              Zone Legend
                            </h4>
                            <div className="space-y-2">
                              {tandagZones.map(zone => {
                          const Icon = getZoneIcon(zone.type);
                          return <motion.div key={zone.id} whileHover={{
                            x: 4
                          }} className="flex items-center space-x-2 cursor-pointer" onClick={() => setSelectedZone(zone)}>
                                    <div className="w-4 h-4 rounded" style={{
                              backgroundColor: zone.color
                            }} />
                                    <Icon className="w-4 h-4 text-m2m-text-secondary" />
                                    <span className="text-xs text-m2m-text-primary">
                                      {zone.type}
                                    </span>
                                  </motion.div>;
                        })}
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  {/* Zone Details Panel */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                      Zone Details
                    </h3>
                    {selectedZone ? <motion.div key={selectedZone.id} initial={{
                  opacity: 0,
                  scale: 0.95
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      backgroundColor: `${selectedZone.color}20`
                    }}>
                            {createElement(getZoneIcon(selectedZone.type), {
                        className: 'w-6 h-6',
                        style: {
                          color: selectedZone.color
                        }
                      })}
                          </div>
                          <div>
                            <h4 className="font-bold text-m2m-text-primary">
                              {selectedZone.name}
                            </h4>
                            <p className="text-xs text-m2m-text-secondary">
                              {selectedZone.type}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-m2m-bg-primary rounded-lg">
                            <p className="text-xs text-m2m-text-secondary mb-1">
                              Classification
                            </p>
                            <p className="text-sm font-medium text-m2m-text-primary">
                              {selectedZone.classification}
                            </p>
                          </div>
                          <div className="p-3 bg-m2m-bg-primary rounded-lg">
                            <p className="text-xs text-m2m-text-secondary mb-1">
                              Hazard Level
                            </p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedZone.hazardLevel === 'High' ? 'bg-red-500/20 text-red-500' : selectedZone.hazardLevel === 'Medium' ? 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow' : 'bg-m2m-success/20 text-m2m-success'}`}>
                              {selectedZone.hazardLevel}
                            </span>
                          </div>
                          <div className="p-3 bg-m2m-bg-primary rounded-lg">
                            <p className="text-xs text-m2m-text-secondary mb-1">
                              Population
                            </p>
                            <p className="text-sm font-medium text-m2m-text-primary">
                              {selectedZone.population}
                            </p>
                          </div>
                          <div className="p-3 bg-m2m-bg-primary rounded-lg">
                            <p className="text-xs text-m2m-text-secondary mb-1">
                              Area
                            </p>
                            <p className="text-sm font-medium text-m2m-text-primary">
                              {selectedZone.area}
                            </p>
                          </div>
                          <div className="p-3 bg-m2m-bg-primary rounded-lg">
                            <p className="text-xs text-m2m-text-secondary mb-2">
                              Regulations
                            </p>
                            <p className="text-xs text-m2m-text-primary leading-relaxed">
                              {selectedZone.regulations}
                            </p>
                          </div>
                        </div>
                        <motion.button whileHover={{
                    scale: 1.02
                  }} whileTap={{
                    scale: 0.98
                  }} className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-medium hover:shadow-lg transition-all">
                          View Full Report
                        </motion.button>
                      </motion.div> : <div className="text-center py-12">
                        <MapIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
                        <p className="text-sm text-m2m-text-secondary">
                          Click on a zone marker to view details
                        </p>
                      </div>}
                  </motion.div>
                </div>
                {/* Zone Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-m2m-accent-blue/20 rounded-lg flex items-center justify-center">
                        <MapIcon className="w-5 h-5 text-m2m-accent-blue" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-m2m-text-primary">
                          7
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Total Zones
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-m2m-success/20 rounded-lg flex items-center justify-center">
                        <TrendingUpIcon className="w-5 h-5 text-m2m-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-m2m-text-primary">
                          15.5 km²
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Total Coverage
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5
              }} className="bg-m2m-bg-card rounded-2xl shadow-lg p-6 border border-m2m-divider">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-m2m-accent-orange/20 rounded-lg flex items-center justify-center">
                        <AlertCircleIcon className="w-5 h-5 text-m2m-accent-orange" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-m2m-text-primary">
                          1
                        </p>
                        <p className="text-xs text-m2m-text-secondary">
                          Hazard Zones
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>}
          </div>
        </main>
      </div>
      {/* Profile Modal */}
      <AnimatePresence>
        {activeDrawer === 'profile' && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setActiveDrawer(null)} />
            {/* Modal */}
            <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.95
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-[600px] max-h-[90vh] bg-m2m-bg-card rounded-2xl shadow-2xl border border-m2m-divider overflow-hidden flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] p-6 border-b border-m2m-divider flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                      Administrator Profile
                    </h2>
                    <motion.button whileHover={{
                  rotate: 90,
                  scale: 1.1
                }} transition={{
                  duration: 0.2
                }} onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <XIcon className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Avatar Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="flex flex-col items-center">
                    <div className="relative group">
                      <motion.img whileHover={{
                    scale: 1.1
                  }} transition={{
                    duration: 0.3
                  }} src={userProfilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-[#2563EB] shadow-lg" />
                      <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} className="absolute bottom-0 right-0 p-3 bg-[#2563EB] text-white rounded-full shadow-lg hover:bg-[#1d4ed8] transition-all">
                        <CameraIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                  {/* Personal Info Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Personal Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="text" value={profileData.name} onChange={e => setProfileData({
                      ...profileData,
                      name: e.target.value
                    })} className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="email" value={profileData.email} disabled className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-primary/50 text-m2m-text-secondary rounded-lg cursor-not-allowed" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Contact Number
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="tel" value={profileData.phone} onChange={e => setProfileData({
                      ...profileData,
                      phone: e.target.value
                    })} className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Role
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] text-white rounded-lg font-semibold shadow-lg">
                          {profileData.role}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  {/* Security Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Security
                    </h3>
                    <motion.button whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)'
                }} whileTap={{
                  scale: 0.98
                }} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-m2m-bg-primary border border-m2m-divider text-m2m-text-primary rounded-lg hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all">
                      <LockIcon className="w-5 h-5" />
                      <span className="font-medium">Change Password</span>
                    </motion.button>
                    <div className="p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-m2m-text-secondary">
                          Last Login
                        </span>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          2 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-m2m-text-secondary">
                          Two-Factor Authentication
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* Action Buttons */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="flex gap-3 p-6 border-t border-m2m-divider bg-m2m-bg-primary flex-shrink-0">
                  <motion.button whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
              }} whileTap={{
                scale: 0.98
              }} onClick={handleSaveProfile} className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] text-white rounded-lg font-semibold shadow-lg transition-all">
                    <SaveIcon className="w-5 h-5" />
                    <span>Save Changes</span>
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setActiveDrawer(null)} className="px-6 py-3 border-2 border-m2m-divider text-m2m-text-secondary rounded-lg font-semibold hover:bg-m2m-bg-card transition-all">
                    Cancel
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
      {/* Settings Modal */}
      <AnimatePresence>
        {activeDrawer === 'settings' && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setActiveDrawer(null)} />
            {/* Modal */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-[600px] max-h-[90vh] bg-m2m-bg-card rounded-2xl shadow-2xl border border-m2m-divider overflow-hidden flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] p-6 border-b border-m2m-divider flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Settings</h2>
                    <motion.button whileHover={{
                  rotate: 90,
                  scale: 1.1
                }} transition={{
                  duration: 0.2
                }} onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <XIcon className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* System Preferences */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      System Preferences
                    </h3>
                    <div className="space-y-3">
                      {[{
                    key: 'smartUsers',
                    label: 'Smart Users',
                    icon: UsersIcon
                  }, {
                    key: 'documents',
                    label: 'Documents',
                    icon: FileTextIcon
                  }, {
                    key: 'gisZoning',
                    label: 'GIS Zoning',
                    icon: MapIcon
                  }].map((item, index) => {
                    const Icon = item.icon;
                    return <motion.div key={item.key} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.3,
                      ease: 'easeInOut'
                    }} className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider hover:border-[#2563EB] transition-all duration-300">
                            <div className="flex items-center space-x-3">
                              <motion.div whileHover={{
                          scale: 1.1,
                          rotate: 5
                        }}>
                                <Icon className="w-5 h-5 text-[#2563EB]" />
                              </motion.div>
                              <span className="font-medium text-m2m-text-primary">
                                {item.label}
                              </span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={settingsData[item.key as keyof typeof settingsData] as boolean} onChange={e => setSettingsData({
                          ...settingsData,
                          [item.key]: e.target.checked
                        })} className="sr-only peer" />
                              <motion.div whileHover={{
                          boxShadow: '0 0 10px rgba(37, 99, 235, 0.3)'
                        }} className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></motion.div>
                            </label>
                          </motion.div>;
                  })}
                    </div>
                  </motion.div>
                  {/* Notifications */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      {[{
                    key: 'emailNotifications',
                    label: 'Email Alerts',
                    icon: MailIcon
                  }, {
                    key: 'pushNotifications',
                    label: 'Push Notifications',
                    icon: BellIcon
                  }].map((item, index) => {
                    const Icon = item.icon;
                    return <motion.div key={item.key} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      delay: 0.2 + index * 0.05,
                      duration: 0.3,
                      ease: 'easeInOut'
                    }} className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider hover:border-[#2563EB] transition-all duration-300">
                            <div className="flex items-center space-x-3">
                              <motion.div whileHover={{
                          scale: 1.1,
                          rotate: 5
                        }}>
                                <Icon className="w-5 h-5 text-[#2563EB]" />
                              </motion.div>
                              <span className="font-medium text-m2m-text-primary">
                                {item.label}
                              </span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={settingsData[item.key as keyof typeof settingsData] as boolean} onChange={e => setSettingsData({
                          ...settingsData,
                          [item.key]: e.target.checked
                        })} className="sr-only peer" />
                              <motion.div whileHover={{
                          boxShadow: '0 0 10px rgba(37, 99, 235, 0.3)'
                        }} className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></motion.div>
                            </label>
                          </motion.div>;
                  })}
                    </div>
                  </motion.div>
                  {/* Appearance */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Appearance
                    </h3>
                    <motion.div initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.3,
                  duration: 0.3,
                  ease: 'easeInOut'
                }} className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider">
                      <div className="flex items-center space-x-3">
                        {settingsData.darkMode ? <MoonIcon className="w-5 h-5 text-[#2563EB]" /> : <SunIcon className="w-5 h-5 text-[#FB923C]" />}
                        <span className="font-medium text-m2m-text-primary">
                          Light / Dark Mode
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settingsData.darkMode} onChange={e => setSettingsData({
                      ...settingsData,
                      darkMode: e.target.checked
                    })} className="sr-only peer" />
                        <motion.div whileHover={{
                      boxShadow: '0 0 10px rgba(37, 99, 235, 0.3)'
                    }} className="w-11 h-6 bg-m2m-divider peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></motion.div>
                      </label>
                    </motion.div>
                    <div className="p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider space-y-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <PaletteIcon className="w-5 h-5 text-[#2563EB]" />
                        <span className="font-medium text-m2m-text-primary">
                          Accent Color
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <motion.button whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)'
                    }} whileTap={{
                      scale: 0.9
                    }} onClick={() => setSettingsData({
                      ...settingsData,
                      accentColor: 'blue'
                    })} className={`w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center transition-all ${settingsData.accentColor === 'blue' ? 'ring-4 ring-[#2563EB]/30' : ''}`}>
                          {settingsData.accentColor === 'blue' && <CheckCircle2Icon className="w-6 h-6 text-white" />}
                        </motion.button>
                        <motion.button whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 15px rgba(251, 146, 60, 0.5)'
                    }} whileTap={{
                      scale: 0.9
                    }} onClick={() => setSettingsData({
                      ...settingsData,
                      accentColor: 'orange'
                    })} className={`w-12 h-12 rounded-full bg-[#FB923C] flex items-center justify-center transition-all ${settingsData.accentColor === 'orange' ? 'ring-4 ring-[#FB923C]/30' : ''}`}>
                          {settingsData.accentColor === 'orange' && <CheckCircle2Icon className="w-6 h-6 text-white" />}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  {/* Integrations */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Integration
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Mapbox API Key
                      </label>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="text" value={settingsData.mapboxKey} onChange={e => setSettingsData({
                      ...settingsData,
                      mapboxKey: e.target.value
                    })} placeholder="Enter Mapbox API Key" className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
                        Cloud Storage URL
                      </label>
                      <div className="relative">
                        <CloudIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                        <input type="text" value={settingsData.cloudStorage} onChange={e => setSettingsData({
                      ...settingsData,
                      cloudStorage: e.target.value
                    })} placeholder="Enter Cloud Storage URL" className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* Action Buttons */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="flex gap-3 p-6 border-t border-m2m-divider bg-m2m-bg-primary flex-shrink-0">
                  <motion.button whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
              }} whileTap={{
                scale: 0.98
              }} onClick={handleSaveSettings} className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] text-white rounded-lg font-semibold shadow-lg transition-all">
                    <SaveIcon className="w-5 h-5" />
                    <span>Save Settings</span>
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setActiveDrawer(null)} className="px-6 py-3 border-2 border-m2m-divider text-m2m-text-secondary rounded-lg font-semibold hover:bg-m2m-bg-card transition-all">
                    Cancel
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
      {/* Help Center Modal */}
      <AnimatePresence>
        {activeDrawer === 'help' && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setActiveDrawer(null)} />
            {/* Modal */}
            <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: 10
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-[600px] max-h-[90vh] bg-m2m-bg-card rounded-2xl shadow-2xl border border-m2m-divider overflow-hidden flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] p-6 border-b border-m2m-divider flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                      Help Center
                    </h2>
                    <motion.button whileHover={{
                  rotate: 90,
                  scale: 1.1
                }} transition={{
                  duration: 0.2
                }} onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <XIcon className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* FAQs */}
                  <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-2">
                      {faqs.map((faq, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.3,
                    ease: 'easeInOut'
                  }} className="border border-m2m-divider rounded-lg overflow-hidden">
                          <motion.button whileHover={{
                      backgroundColor: 'rgba(37, 99, 235, 0.05)'
                    }} onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left transition-all duration-300 ease-in-out">
                            <span className="font-medium text-m2m-text-primary">
                              {faq.question}
                            </span>
                            <motion.div animate={{
                        rotate: expandedFaq === index ? 180 : 0
                      }} transition={{
                        duration: 0.3,
                        ease: 'easeInOut'
                      }}>
                              <ChevronDownIcon className="w-5 h-5 text-m2m-text-secondary" />
                            </motion.div>
                          </motion.button>
                          <AnimatePresence>
                            {expandedFaq === index && <motion.div initial={{
                        height: 0,
                        opacity: 0
                      }} animate={{
                        height: 'auto',
                        opacity: 1
                      }} exit={{
                        height: 0,
                        opacity: 0
                      }} transition={{
                        duration: 0.3,
                        ease: 'easeInOut'
                      }} className="overflow-hidden">
                                <div className="p-4 pt-0 text-sm text-m2m-text-secondary bg-m2m-bg-primary/50">
                                  {faq.answer}
                                </div>
                              </motion.div>}
                          </AnimatePresence>
                        </motion.div>)}
                    </div>
                  </motion.div>
                  {/* Documentation */}
                  <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Documentation
                    </h3>
                    <motion.button whileHover={{
                  scale: 1.02,
                  x: 4,
                  boxShadow: '0 5px 15px rgba(37, 99, 235, 0.2)'
                }} whileTap={{
                  scale: 0.98
                }} className="w-full flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider hover:border-[#2563EB] transition-all">
                      <div className="flex items-center space-x-3">
                        <BookOpenIcon className="w-5 h-5 text-[#2563EB]" />
                        <span className="font-medium text-m2m-text-primary">
                          Open Admin Guide
                        </span>
                      </div>
                      <ExternalLinkIcon className="w-5 h-5 text-m2m-text-secondary" />
                    </motion.button>
                  </motion.div>
                  {/* Contact Support */}
                  <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Support Contact
                    </h3>
                    <div className="p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider space-y-3">
                      <div className="flex items-center space-x-3">
                        <MailIcon className="w-5 h-5 text-[#2563EB]" />
                        <a href="mailto:support@nearbuy.com" className="text-m2m-text-primary hover:text-[#2563EB] transition-colors">
                          support@nearbuy.com
                        </a>
                      </div>
                      <motion.button whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
                  }} whileTap={{
                    scale: 0.98
                  }} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#2563EB] text-white rounded-lg font-semibold shadow-lg transition-all">
                        <MessageSquareIcon className="w-5 h-5" />
                        <span>Submit a Ticket</span>
                      </motion.button>
                    </div>
                  </motion.div>
                  {/* System Status */}
                  <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      System Status
                    </h3>
                    <div className="p-4 bg-m2m-bg-primary rounded-lg border border-m2m-divider">
                      <div className="flex items-center space-x-3">
                        <motion.div animate={{
                      boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.7)', '0 0 0 10px rgba(34, 197, 94, 0)']
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} className="w-3 h-3 bg-green-500 rounded-full" />
                        <div>
                          <p className="font-medium text-m2m-text-primary">
                            All Systems Online
                          </p>
                          <p className="text-xs text-m2m-text-secondary">
                            Last updated: Just now
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Feedback */}
                  <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5
              }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary border-b border-m2m-divider pb-2">
                      Send Feedback
                    </h3>
                    <div className="space-y-3">
                      <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Share your thoughts or report an issue..." rows={4} className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all resize-none" />
                      <motion.button whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                  }} whileTap={{
                    scale: 0.98
                  }} onClick={handleSendFeedback} className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#00B3A4] text-white rounded-lg font-semibold shadow-lg transition-all">
                        <SendIcon className="w-5 h-5" />
                        <span>Send Feedback</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}