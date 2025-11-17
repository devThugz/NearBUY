import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { PackageIcon, ShoppingCartIcon, TruckIcon, TrendingUpIcon, TrendingDownIcon, BarChart3Icon, UsersIcon, ArrowUpIcon, ArrowDownIcon, ActivityIcon, ClockIcon, StarIcon, PhoneIcon, EyeIcon, XIcon, BoxIcon, CheckCircle2Icon, MapPinIcon, AlertTriangleIcon, BellIcon, SparklesIcon, PlusIcon, LayoutDashboardIcon, MessageSquareIcon, DollarSignIcon, PercentIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon, ShoppingBagIcon, StoreIcon, LineChartIcon, ImageIcon, TagIcon, SaveIcon, UploadIcon, ShieldCheckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  category: string;
  rating: number;
  distance: string;
  products: string[];
  services: string[];
}
interface ProductVariant {
  id: string;
  name: string;
  price: string;
  stock: string;
  sku: string;
}
export default function UnifiedDashboard() {
  const {
    items
  } = useCart();
  const {
    orders
  } = useSupplierOrders();
  // Add Product Panel State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  // Product form states
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [tags, setTags] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [minOrderQty, setMinOrderQty] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [skuCode, setSkuCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [shippingCategory, setShippingCategory] = useState('');
  const [courierOptions, setCourierOptions] = useState('');
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const totalProducts = 24;
  const totalOrders = orders.length;
  const activeSuppliers = 12;
  // NEW: Business User KPI Data
  const businessKPIs = [{
    title: 'Location Score',
    value: '8.5/10',
    icon: MapPinIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal',
    change: '+0.5',
    changeType: 'increase'
  }, {
    title: 'Sales Today',
    value: '₱45,230',
    icon: DollarSignIcon,
    color: 'from-m2m-success to-m2m-chart-green',
    change: '+18%',
    changeType: 'increase'
  }, {
    title: 'Stock Status',
    value: 'Safe',
    icon: BoxIcon,
    color: 'from-m2m-accent-teal to-m2m-accent-blue',
    change: '3 Low',
    changeType: 'warning'
  }, {
    title: 'Top Product',
    value: 'Tomatoes',
    icon: PackageIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange',
    change: '145 sold',
    changeType: 'neutral'
  }, {
    title: 'Pending Orders',
    value: '8',
    icon: ShoppingCartIcon,
    color: 'from-purple-500 to-pink-500',
    change: '+2',
    changeType: 'increase'
  }, {
    title: 'Demand Trend',
    value: 'Up',
    icon: TrendingUpIcon,
    color: 'from-m2m-success to-green-400',
    change: '+12%',
    changeType: 'increase'
  }];
  // NEW: AI Insights Data
  const aiInsights = [{
    id: 1,
    message: 'Stock for Fresh Organic Tomatoes may run out in 2 days.',
    severity: 'high',
    icon: AlertTriangleIcon
  }, {
    id: 2,
    message: 'Zone 3 demand for beverages is increasing by 15%.',
    severity: 'medium',
    icon: TrendingUpIcon
  }, {
    id: 3,
    message: 'Foot traffic around your area is trending upward this week.',
    severity: 'low',
    icon: ActivityIcon
  }];
  // NEW: Inventory Status Data
  const inventoryStatus = {
    lowStock: 3,
    criticalStock: 1,
    fastMoving: [{
      name: 'Fresh Organic Tomatoes',
      sales: 145
    }, {
      name: 'Premium Rice 25kg',
      sales: 132
    }, {
      name: 'Fresh Chicken Breast',
      sales: 98
    }],
    restockSuggestions: ['Organic Vegetables Mix', 'Fresh Milk 1L', 'Eggs (Dozen)']
  };
  // NEW: Market Activity Feed Data
  const marketActivities = [{
    id: 1,
    type: 'demand',
    message: 'Demand increase for Fresh Produce in your zone',
    time: '15 min ago',
    icon: TrendingUpIcon,
    color: 'text-m2m-success'
  }, {
    id: 2,
    type: 'supplier',
    message: 'New supplier "Metro Fresh Logistics" available nearby',
    time: '1 hour ago',
    icon: TruckIcon,
    color: 'text-m2m-accent-blue'
  }, {
    id: 3,
    type: 'business',
    message: 'New retail store opened 0.5km from your location',
    time: '3 hours ago',
    icon: StoreIcon,
    color: 'text-m2m-accent-orange'
  }, {
    id: 4,
    type: 'market',
    message: 'Local market shift: Organic products trending +25%',
    time: '5 hours ago',
    icon: LineChartIcon,
    color: 'text-m2m-accent-teal'
  }];
  // NEW: Alerts Data
  const alerts = [{
    id: 1,
    title: 'Low Stock Warning',
    message: 'Fresh Organic Tomatoes - Only 15 units remaining',
    severity: 'high',
    icon: AlertTriangleIcon
  }, {
    id: 2,
    title: 'Demand Drop Alert',
    message: 'Premium Rice sales decreased by 8% this week',
    severity: 'medium',
    icon: TrendingDownIcon
  }, {
    id: 3,
    title: 'Pending Order Action',
    message: '3 orders require confirmation',
    severity: 'medium',
    icon: ShoppingCartIcon
  }, {
    id: 4,
    title: 'Location Opportunity',
    message: 'High foot traffic detected in Zone 5',
    severity: 'low',
    icon: MapPinIcon
  }];
  // NEW: Today's Orders Summary
  const todaysOrders = {
    total: 12,
    completed: 8,
    pending: 3,
    cancelled: 1
  };
  // NEW: Top Suppliers
  const topSuppliers = [{
    name: 'ABC Trading Co.',
    orders: 24,
    rating: 4.8
  }, {
    name: 'Metro Fresh Produce',
    orders: 18,
    rating: 4.7
  }, {
    name: 'Prime Distribution',
    orders: 15,
    rating: 4.9
  }];
  const stats = [{
    title: 'Total Products',
    value: totalProducts,
    icon: PackageIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal',
    link: '/dashboard/products',
    change: '+12%',
    changeType: 'increase'
  }, {
    title: 'Cart Items',
    value: items.length,
    icon: ShoppingCartIcon,
    color: 'from-m2m-accent-teal to-m2m-accent-blue',
    link: '/dashboard/cart',
    change: '+5%',
    changeType: 'increase'
  }, {
    title: 'Total Orders',
    value: totalOrders,
    icon: TruckIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange',
    link: '/dashboard/orders',
    change: '+23%',
    changeType: 'increase'
  }, {
    title: 'Active Suppliers',
    value: activeSuppliers,
    icon: UsersIcon,
    color: 'from-m2m-success to-m2m-chart-green',
    link: '/dashboard/map',
    change: '+8%',
    changeType: 'increase'
  }];
  const recentOrderStats = [{
    month: 'Jan',
    orders: 12
  }, {
    month: 'Feb',
    orders: 19
  }, {
    month: 'Mar',
    orders: 15
  }, {
    month: 'Apr',
    orders: 25
  }, {
    month: 'May',
    orders: 22
  }, {
    month: 'Jun',
    orders: 30
  }];
  const recentActivities = [{
    id: 1,
    action: 'New order placed',
    description: 'Order #12345 from ABC Trading Co.',
    time: '2 hours ago',
    icon: ShoppingCartIcon,
    color: 'text-m2m-accent-blue'
  }, {
    id: 2,
    action: 'Product updated',
    description: 'Fresh Organic Tomatoes - Price updated',
    time: '5 hours ago',
    icon: PackageIcon,
    color: 'text-m2m-accent-teal'
  }, {
    id: 3,
    action: 'Order delivered',
    description: 'Order #12344 successfully delivered',
    time: '1 day ago',
    icon: TruckIcon,
    color: 'text-m2m-success'
  }, {
    id: 4,
    action: 'New supplier added',
    description: 'Metro Fresh Produce joined the network',
    time: '2 days ago',
    icon: UsersIcon,
    color: 'text-m2m-accent-orange'
  }];
  const topProducts = [{
    name: 'Fresh Organic Tomatoes',
    sales: 145,
    revenue: '₱12,450',
    trend: 'up'
  }, {
    name: 'Premium Rice 25kg',
    sales: 132,
    revenue: '₱11,880',
    trend: 'up'
  }, {
    name: 'Fresh Chicken Breast',
    sales: 98,
    revenue: '₱8,820',
    trend: 'down'
  }, {
    name: 'Organic Vegetables Mix',
    sales: 87,
    revenue: '₱7,830',
    trend: 'up'
  }];
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-m2m-chart-yellow/10 text-m2m-chart-yellow border-m2m-chart-yellow/30';
      case 'low':
        return 'bg-m2m-accent-blue/10 text-m2m-accent-blue border-m2m-accent-blue/30';
      default:
        return 'bg-m2m-divider/10 text-m2m-text-secondary border-m2m-divider/30';
    }
  };
  const categories = ['Retail & Shopping Supplies', 'Office Equipment', 'Food and Beverage Supplies', 'Technology Hardware', 'Construction Materials', 'Logistics and Delivery', 'Maintenance and Repair', 'Hospitality Supplies', 'Healthcare Supplies', 'Educational Supplies', 'Entertainment Supplies', 'Automotive Supplies'];
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: '',
      price: '',
      stock: '',
      sku: ''
    };
    setVariants([...variants, newVariant]);
  };
  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };
  const updateVariant = (id: string, field: keyof ProductVariant, value: string) => {
    setVariants(variants.map(v => v.id === id ? {
      ...v,
      [field]: value
    } : v));
  };
  const handlePublishProduct = () => {
    if (!productName || !category || !stockQuantity || !skuCode || !weight) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Product Successfully Published!', {
      description: `${productName} is now live in your catalog`,
      icon: <CheckCircleIcon className="w-5 h-5" />
    });
    setIsAddProductOpen(false);
    // Reset form
    resetProductForm();
  };
  const handleSaveDraft = () => {
    toast.success('Product saved as draft', {
      description: 'You can continue editing later',
      icon: <SaveIcon className="w-5 h-5" />
    });
    setIsAddProductOpen(false);
    resetProductForm();
  };
  const resetProductForm = () => {
    setProductName('');
    setCategory('');
    setDescription('');
    setBrand('');
    setTags('');
    setSellingPrice('');
    setCostPrice('');
    setDiscountPrice('');
    setMinOrderQty('');
    setWholesalePrice('');
    setStockQuantity('');
    setSkuCode('');
    setBarcode('');
    setLowStockThreshold('');
    setWeight('');
    setLength('');
    setWidth('');
    setHeight('');
    setShippingCategory('');
    setCourierOptions('');
    setVariants([]);
    setUploadedImages([]);
  };
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <h1 className="text-3xl font-bold text-m2m-text-primary">
          Business Dashboard
        </h1>
        <p className="text-m2m-text-secondary mt-2">
          Welcome to NearBuy! Your business intelligence hub — explore insights,
          manage suppliers, and monitor operations in real time.
        </p>
      </motion.div>

      {/* NEW: Business User KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {businessKPIs.map((kpi, index) => <motion.div key={index} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: index * 0.05
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-4 border border-m2m-divider hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xs font-semibold ${kpi.changeType === 'increase' ? 'text-m2m-success' : kpi.changeType === 'warning' ? 'text-m2m-chart-yellow' : 'text-m2m-text-secondary'}`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-xs text-m2m-text-secondary mb-1">
              {kpi.title}
            </h3>
            <p className="text-xl font-bold text-m2m-text-primary">
              {kpi.value}
            </p>
          </motion.div>)}
      </div>

      {/* NEW: Quick Actions Toolbar */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.3
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <h2 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
          <LayoutDashboardIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button onClick={() => setIsAddProductOpen(true)} className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-blue/10 hover:border-m2m-accent-blue border border-m2m-divider transition-all duration-300 group">
            <PlusIcon className="w-6 h-6 text-m2m-accent-blue mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Add Product
            </span>
          </button>
          <Link to="/dashboard/orders" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-teal/10 hover:border-m2m-accent-teal border border-m2m-divider transition-all duration-300 group">
            <ShoppingCartIcon className="w-6 h-6 text-m2m-accent-teal mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Create Order
            </span>
          </Link>
          <Link to="/dashboard/products" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-success/10 hover:border-m2m-success border border-m2m-divider transition-all duration-300 group">
            <BoxIcon className="w-6 h-6 text-m2m-success mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              View Inventory
            </span>
          </Link>
          <Link to="/dashboard/map" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-orange/10 hover:border-m2m-accent-orange border border-m2m-divider transition-all duration-300 group">
            <MapPinIcon className="w-6 h-6 text-m2m-accent-orange mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Analyze Location
            </span>
          </Link>
          <Link to="/dashboard/ai-support" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-purple-500/10 hover:border-purple-500 border border-m2m-divider transition-all duration-300 group">
            <MessageSquareIcon className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              AI Assistant
            </span>
          </Link>
        </div>
      </motion.div>

      {/* NEW: AI Quick Insights + Interactive Map Snapshot Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Quick Insights Panel */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="bg-gradient-to-br from-m2m-accent-blue/5 to-m2m-accent-teal/5 rounded-xl shadow-lg p-6 border border-m2m-accent-blue/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
              AI Quick Insights
            </h2>
            <Link to="/dashboard/ai-support" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View More →
            </Link>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => <motion.div key={insight.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.5 + index * 0.1
          }} className={`p-3 rounded-lg border ${getSeverityColor(insight.severity)} flex items-start space-x-3`}>
                <insight.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{insight.message}</p>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Interactive Map Snapshot */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="bg-m2m-bg-card rounded-xl shadow-lg border border-m2m-divider overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-m2m-accent-orange" />
                Location Overview
              </h2>
              <Link to="/dashboard/map" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
                Full Map →
              </Link>
            </div>
          </div>
          <Link to="/dashboard/map" className="block relative h-64 bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 hover:opacity-90 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-16 h-16 text-m2m-accent-blue mx-auto mb-3" />
                <p className="text-sm font-semibold text-m2m-text-primary">
                  Your Store Location
                </p>
                <p className="text-xs text-m2m-text-secondary mt-1">
                  Butuan Business District
                </p>
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-m2m-accent-orange rounded-full"></div>
                    <span className="text-xs text-m2m-text-secondary">
                      Your Store
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-m2m-accent-teal rounded-full"></div>
                    <span className="text-xs text-m2m-text-secondary">
                      Suppliers
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-m2m-text-secondary">
                      Competitors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* NEW: Sales Trend + Inventory Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Mini Chart */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <LineChartIcon className="w-5 h-5 mr-2 text-m2m-success" />
              Sales Trend
            </h2>
            <select className="px-3 py-1.5 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-sm text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-all duration-300">
              <option>Today vs Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg">
              <div>
                <p className="text-sm text-m2m-text-secondary mb-1">Today</p>
                <p className="text-2xl font-bold text-m2m-text-primary">
                  ₱45,230
                </p>
              </div>
              <div className="flex items-center space-x-2 text-m2m-success">
                <ArrowUpIcon className="w-5 h-5" />
                <span className="text-lg font-bold">+18%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-m2m-bg-primary rounded-lg">
              <div>
                <p className="text-sm text-m2m-text-secondary mb-1">
                  Yesterday
                </p>
                <p className="text-2xl font-bold text-m2m-text-primary">
                  ₱38,330
                </p>
              </div>
              <div className="text-m2m-text-secondary">
                <span className="text-sm">Baseline</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inventory Status Summary */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.7
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <BoxIcon className="w-5 h-5 mr-2 text-m2m-accent-teal" />
              Inventory Status
            </h2>
            <Link to="/dashboard/products" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-m2m-chart-yellow/10 rounded-lg border border-m2m-chart-yellow/30">
              <p className="text-2xl font-bold text-m2m-chart-yellow">
                {inventoryStatus.lowStock}
              </p>
              <p className="text-xs text-m2m-text-secondary">Low Stock Items</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-2xl font-bold text-red-500">
                {inventoryStatus.criticalStock}
              </p>
              <p className="text-xs text-m2m-text-secondary">Critical Stock</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-m2m-text-primary mb-2">
              Fast-Moving Products:
            </p>
            {inventoryStatus.fastMoving.map((product, index) => <div key={index} className="flex items-center justify-between p-2 bg-m2m-bg-primary rounded-lg">
                <span className="text-sm text-m2m-text-primary">
                  {product.name}
                </span>
                <span className="text-sm font-bold text-m2m-success">
                  {product.sales} sold
                </span>
              </div>)}
          </div>
        </motion.div>
      </div>

      {/* NEW: Market Activity Feed + Alerts Panel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Activity Feed */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.8
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <h2 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
            <ActivityIcon className="w-5 h-5 mr-2 text-m2m-accent-teal" />
            Market Activity Feed
          </h2>
          <div className="space-y-3">
            {marketActivities.map((activity, index) => <motion.div key={activity.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.9 + index * 0.1
          }} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-m2m-bg-primary transition-all duration-300">
                <div className={`p-2 rounded-lg bg-m2m-bg-primary ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-m2m-text-primary">
                    {activity.message}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ClockIcon className="w-3 h-3 text-m2m-text-secondary" />
                    <span className="text-xs text-m2m-text-secondary">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Alerts and Notifications Panel */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.9
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <BellIcon className="w-5 h-5 mr-2 text-m2m-accent-orange" />
              Alerts & Notifications
            </h2>
            <Link to="/dashboard/alerts" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => <motion.div key={alert.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 1.0 + index * 0.1
          }} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} flex items-start space-x-3`}>
                <alert.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="text-xs mt-1">{alert.message}</p>
                </div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>

      {/* NEW: Business User Overview Section */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 1.0
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary mb-6 flex items-center">
          <StoreIcon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
          Business Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Orders */}
          <div>
            <h3 className="text-sm font-semibold text-m2m-text-secondary mb-3">
              Today's Orders
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-m2m-bg-primary rounded-lg">
                <span className="text-sm text-m2m-text-primary">Total</span>
                <span className="text-lg font-bold text-m2m-text-primary">
                  {todaysOrders.total}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-m2m-success/10 rounded-lg">
                <span className="text-sm text-m2m-success">Completed</span>
                <span className="text-lg font-bold text-m2m-success">
                  {todaysOrders.completed}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-m2m-chart-yellow/10 rounded-lg">
                <span className="text-sm text-m2m-chart-yellow">Pending</span>
                <span className="text-lg font-bold text-m2m-chart-yellow">
                  {todaysOrders.pending}
                </span>
              </div>
            </div>
          </div>

          {/* Top Suppliers */}
          <div>
            <h3 className="text-sm font-semibold text-m2m-text-secondary mb-3">
              Top Suppliers
            </h3>
            <div className="space-y-2">
              {topSuppliers.map((supplier, index) => <div key={index} className="flex items-center justify-between p-3 bg-m2m-bg-primary rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-m2m-text-primary truncate">
                      {supplier.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarIcon className="w-3 h-3 text-m2m-chart-yellow fill-current" />
                      <span className="text-xs text-m2m-text-secondary">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-m2m-accent-blue">
                    {supplier.orders}
                  </span>
                </div>)}
            </div>
          </div>

          {/* Recommended Products */}
          <div>
            <h3 className="text-sm font-semibold text-m2m-text-secondary mb-3">
              Suggested Restock
            </h3>
            <div className="space-y-2">
              {inventoryStatus.restockSuggestions.map((product, index) => <div key={index} className="flex items-center justify-between p-3 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-blue/10 transition-colors">
                  <span className="text-sm text-m2m-text-primary">
                    {product}
                  </span>
                  <PlusIcon className="w-4 h-4 text-m2m-accent-blue" />
                </div>)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* EXISTING: Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <motion.div key={index} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 1.1 + index * 0.1
      }}>
            <Link to={stat.link} className="block bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <motion.div whileHover={{
              scale: 1.1,
              rotate: 5
            }} className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.changeType === 'increase' ? 'text-m2m-success' : 'text-m2m-accent-orange'}`}>
                  {stat.changeType === 'increase' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-m2m-text-secondary text-sm mb-1">
                {stat.title}
              </h3>
              <motion.p initial={{
            scale: 0.5
          }} animate={{
            scale: 1
          }} transition={{
            delay: 1.5 + index * 0.1,
            type: 'spring'
          }} className="text-3xl font-bold text-m2m-text-primary group-hover:text-m2m-accent-blue transition-colors duration-300">
                {stat.value}
              </motion.p>
            </Link>
          </motion.div>)}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Analytics Chart */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
              <motion.div animate={{
              rotate: [0, 10, -10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}>
                <BarChart3Icon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
              </motion.div>
              Order Analytics
            </h2>
            <select className="px-3 py-1.5 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-sm text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-all duration-300">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="grid grid-cols-6 gap-4 h-48">
            {recentOrderStats.map((stat, index) => <motion.div key={index} initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.7 + index * 0.1
          }} className="flex flex-col items-center justify-end">
                <motion.div initial={{
              scaleY: 0
            }} animate={{
              scaleY: 1
            }} transition={{
              duration: 0.8,
              delay: 0.8 + index * 0.1,
              type: 'spring'
            }} whileHover={{
              scaleY: 1.05
            }} className="w-full bg-gradient-to-t from-m2m-accent-blue to-m2m-accent-teal rounded-t-lg transition-all duration-300 hover:opacity-80 origin-bottom cursor-pointer" style={{
              height: `${stat.orders / 30 * 100}%`
            }} />
                <motion.p initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 1.2 + index * 0.1
            }} className="text-sm font-semibold text-m2m-text-primary mt-2">
                  {stat.orders}
                </motion.p>
                <p className="text-xs text-m2m-text-secondary">{stat.month}</p>
              </motion.div>)}
          </div>
        </motion.div>
        {/* Recent Activities */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.7
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
              <ActivityIcon className="w-6 h-6 mr-2 text-m2m-accent-teal" />
              Recent Activities
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => <motion.div key={activity.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.8 + index * 0.1
          }} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-m2m-bg-primary transition-all duration-300 cursor-pointer">
                <div className={`p-2 rounded-lg bg-m2m-bg-primary ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary">
                    {activity.action}
                  </p>
                  <p className="text-xs text-m2m-text-secondary truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ClockIcon className="w-3 h-3 text-m2m-text-secondary" />
                    <span className="text-xs text-m2m-text-secondary">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
      {/* Top Products Table */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.8
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
            <TrendingUpIcon className="w-6 h-6 mr-2 text-m2m-success" />
            Top Performing Products
          </h2>
          <Link to="/dashboard/products" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-m2m-divider">
                <th className="text-left py-3 px-4 text-sm font-semibold text-m2m-text-secondary">
                  Product Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-m2m-text-secondary">
                  Sales
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-m2m-text-secondary">
                  Revenue
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-m2m-text-secondary">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => <motion.tr key={index} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.9 + index * 0.1
            }} className="border-b border-m2m-divider hover:bg-m2m-bg-primary transition-all duration-300">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-m2m-accent-blue/20 to-m2m-accent-teal/20 rounded-lg flex items-center justify-center">
                        <PackageIcon className="w-5 h-5 text-m2m-accent-blue" />
                      </div>
                      <span className="text-sm font-medium text-m2m-text-primary">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-m2m-text-primary">
                      {product.sales}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-bold text-m2m-text-primary">
                      {product.revenue}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {product.trend === 'up' ? <div className="inline-flex items-center space-x-1 px-2 py-1 bg-m2m-success/10 rounded-full">
                        <ArrowUpIcon className="w-4 h-4 text-m2m-success" />
                        <span className="text-xs font-semibold text-m2m-success">
                          Up
                        </span>
                      </div> : <div className="inline-flex items-center space-x-1 px-2 py-1 bg-m2m-accent-orange/10 rounded-full">
                        <ArrowDownIcon className="w-4 h-4 text-m2m-accent-orange" />
                        <span className="text-xs font-semibold text-m2m-accent-orange">
                          Down
                        </span>
                      </div>}
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Quick Actions */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 1
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md">
          <motion.div whileHover={{
          scale: 1.05,
          y: -5
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/dashboard/history" className="block p-4 border-2 border-m2m-divider rounded-lg hover:border-m2m-success hover:bg-m2m-success/10 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-400/30">
              <motion.div animate={{
              y: [0, -3, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}>
                <TruckIcon className="w-8 h-8 text-m2m-success mb-2" />
              </motion.div>
              <h3 className="font-semibold text-m2m-text-primary">
                Order History
              </h3>
              <p className="text-sm text-m2m-text-secondary">
                Track your orders
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      {/* Add Product Full-Screen Slide-in Panel */}
      <AnimatePresence>
        {isAddProductOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsAddProductOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            {/* Slide-in Panel */}
            <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300
        }} className="fixed top-0 right-0 h-full w-full bg-m2m-bg-primary z-50 overflow-y-auto">
              <div className="max-w-6xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-m2m-bg-primary pb-4 border-b border-m2m-divider z-10">
                  <div>
                    <h1 className="text-3xl font-bold text-m2m-text-primary">
                      Add New Product
                    </h1>
                    <p className="text-m2m-text-secondary mt-2">
                      Create a new product listing for your catalog
                    </p>
                  </div>
                  <button onClick={() => setIsAddProductOpen(false)} className="p-2 hover:bg-m2m-bg-card rounded-lg transition-colors">
                    <XIcon className="w-6 h-6 text-m2m-text-secondary" />
                  </button>
                </div>
                {/* 1. Product Information */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <PackageIcon className="w-6 h-6 text-m2m-accent-blue mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Product Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter product name" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all">
                        <option value="">Select product category</option>
                        {categories.map(cat => <option key={cat} value={cat}>
                            {cat}
                          </option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Product Description
                      </label>
                      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your product…" rows={4} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Brand
                      </label>
                      <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand name (optional)" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Tags / Keywords
                      </label>
                      <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. wholesale, hardware, grocery" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                  </div>
                </motion.div>
                {/* 2. Product Media */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <ImageIcon className="w-6 h-6 text-m2m-accent-teal mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Product Media
                    </h2>
                  </div>
                  <div className="border-2 border-dashed border-m2m-divider rounded-lg p-8 text-center hover:border-m2m-accent-blue transition-colors">
                    <UploadIcon className="w-12 h-12 text-m2m-text-secondary mx-auto mb-4" />
                    <p className="text-m2m-text-primary font-medium mb-2">
                      Upload clear product images (1–9 files)
                    </p>
                    <p className="text-sm text-m2m-text-secondary mb-4">
                      Drag and drop or click to browse
                    </p>
                    <button onClick={() => toast.info('Image upload feature coming soon!')} className="px-6 py-2 bg-m2m-accent-blue text-white rounded-lg hover:bg-m2m-accent-teal transition-colors">
                      Choose Files
                    </button>
                  </div>
                  {uploadedImages.length > 0 && <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                      {uploadedImages.map((img, index) => <div key={index} className="relative aspect-square bg-m2m-bg-primary rounded-lg border border-m2m-divider">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                          <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>)}
                    </div>}
                </motion.div>
                {/* 3. Pricing & Cost Details */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <DollarSignIcon className="w-6 h-6 text-m2m-success mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Pricing & Cost Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Selling Price (₱){' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Cost Price (optional)
                      </label>
                      <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Discount Price
                      </label>
                      <input type="number" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Minimum Order Quantity
                      </label>
                      <input type="number" value={minOrderQty} onChange={e => setMinOrderQty(e.target.value)} placeholder="1" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Wholesale Price Tier (optional)
                      </label>
                      <input type="number" value={wholesalePrice} onChange={e => setWholesalePrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                  </div>
                </motion.div>
                {/* 4. Inventory Details */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <BoxIcon className="w-6 h-6 text-m2m-accent-orange mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Inventory Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Available Stock Quantity{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        SKU Code <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={skuCode} onChange={e => setSkuCode(e.target.value)} placeholder="SKU-12345" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Barcode (optional)
                      </label>
                      <input type="text" value={barcode} onChange={e => setBarcode(e.target.value)} placeholder="1234567890123" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Low-stock alert threshold
                      </label>
                      <input type="number" value={lowStockThreshold} onChange={e => setLowStockThreshold(e.target.value)} placeholder="10" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                  </div>
                </motion.div>
                {/* 5. Product Variants */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <TagIcon className="w-6 h-6 text-purple-500 mr-3" />
                      <h2 className="text-xl font-bold text-m2m-text-primary">
                        Product Variants (Optional)
                      </h2>
                    </div>
                    <button onClick={addVariant} className="flex items-center space-x-2 px-4 py-2 bg-m2m-accent-blue text-white rounded-lg hover:bg-m2m-accent-teal transition-colors">
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Variant</span>
                    </button>
                  </div>
                  {variants.length === 0 ? <div className="text-center py-8 text-m2m-text-secondary">
                      <p>
                        No variants added yet. Click "Add Variant" to create
                        one.
                      </p>
                    </div> : <div className="space-y-4">
                      {variants.map((variant, index) => <div key={variant.id} className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-m2m-text-primary">
                              Variant {index + 1}
                            </h3>
                            <button onClick={() => removeVariant(variant.id)} className="p-1 hover:bg-red-500/10 rounded transition-colors">
                              <XIcon className="w-5 h-5 text-red-500" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                                Variant Name
                              </label>
                              <input type="text" value={variant.name} onChange={e => updateVariant(variant.id, 'name', e.target.value)} placeholder="e.g. Size L, Color Red" className="w-full px-4 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                                Variant Price
                              </label>
                              <input type="number" value={variant.price} onChange={e => updateVariant(variant.id, 'price', e.target.value)} placeholder="0.00" className="w-full px-4 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                                Variant Stock
                              </label>
                              <input type="number" value={variant.stock} onChange={e => updateVariant(variant.id, 'stock', e.target.value)} placeholder="0" className="w-full px-4 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                                Variant SKU
                              </label>
                              <input type="text" value={variant.sku} onChange={e => updateVariant(variant.id, 'sku', e.target.value)} placeholder="SKU-VAR-001" className="w-full px-4 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                            </div>
                          </div>
                        </div>)}
                    </div>}
                </motion.div>
                {/* 6. Shipping Details */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <TruckIcon className="w-6 h-6 text-m2m-accent-teal mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Shipping Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="0.0" step="0.1" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Product Dimensions (L × W × H)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="L" className="w-full px-3 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                        <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="W" className="w-full px-3 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="H" className="w-full px-3 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Shipping Category
                      </label>
                      <select value={shippingCategory} onChange={e => setShippingCategory(e.target.value)} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all">
                        <option value="">Select category</option>
                        <option value="standard">Standard</option>
                        <option value="express">Express</option>
                        <option value="fragile">Fragile</option>
                        <option value="perishable">Perishable</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Courier Options
                      </label>
                      <input type="text" value={courierOptions} onChange={e => setCourierOptions(e.target.value)} placeholder="e.g. LBC, J&T, Grab Express" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                    </div>
                  </div>
                </motion.div>
                {/* 7. Compliance Documents */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-center mb-6">
                    <ShieldCheckIcon className="w-6 h-6 text-m2m-success mr-3" />
                    <h2 className="text-xl font-bold text-m2m-text-primary">
                      Compliance Documents (Optional)
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        FDA Certificate
                      </label>
                      <div className="border-2 border-dashed border-m2m-divider rounded-lg p-4 hover:border-m2m-accent-blue transition-colors">
                        <button onClick={() => toast.info('File upload coming soon!')} className="flex items-center space-x-2 text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors">
                          <UploadIcon className="w-5 h-5" />
                          <span>Upload FDA Certificate</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        DTI Compliance
                      </label>
                      <div className="border-2 border-dashed border-m2m-divider rounded-lg p-4 hover:border-m2m-accent-blue transition-colors">
                        <button onClick={() => toast.info('File upload coming soon!')} className="flex items-center space-x-2 text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors">
                          <UploadIcon className="w-5 h-5" />
                          <span>Upload DTI Compliance Document</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                        Product Authenticity Document
                      </label>
                      <div className="border-2 border-dashed border-m2m-divider rounded-lg p-4 hover:border-m2m-accent-blue transition-colors">
                        <button onClick={() => toast.info('File upload coming soon!')} className="flex items-center space-x-2 text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors">
                          <UploadIcon className="w-5 h-5" />
                          <span>Upload Authenticity Document</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* 8. Final Actions - Fixed at bottom */}
                <div className="sticky bottom-0 bg-m2m-bg-primary pt-6 pb-4 border-t border-m2m-divider">
                  <div className="bg-gradient-to-br from-m2m-accent-blue/5 to-m2m-accent-teal/5 rounded-xl shadow-lg p-6 border border-m2m-accent-blue/20">
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                      <button onClick={handlePublishProduct} className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                        <CheckCircleIcon className="w-6 h-6" />
                        <span>Publish Product</span>
                      </button>
                      <button onClick={handleSaveDraft} className="w-full md:w-auto px-8 py-4 bg-m2m-bg-card text-m2m-text-primary border-2 border-m2m-divider rounded-xl font-semibold text-lg hover:bg-m2m-bg-primary transition-all flex items-center justify-center space-x-2">
                        <SaveIcon className="w-6 h-6" />
                        <span>Save as Draft</span>
                      </button>
                    </div>
                    <p className="text-center text-sm text-m2m-text-secondary mt-4">
                      All fields marked with{' '}
                      <span className="text-red-500">*</span> are required
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}