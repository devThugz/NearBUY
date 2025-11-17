import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3Icon, TrendingUpIcon, TrendingDownIcon, MapPinIcon, PackageIcon, DollarSignIcon, UsersIcon, AlertTriangleIcon, SparklesIcon, ClockIcon, ShoppingBagIcon, TruckIcon, StarIcon, TargetIcon, ActivityIcon, PieChartIcon, LineChartIcon, ArrowUpIcon, ArrowDownIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, ZapIcon, ThumbsUpIcon, ThumbsDownIcon, BriefcaseIcon, HomeIcon, BuildingIcon, ShieldAlertIcon, CalendarIcon, PercentIcon, BoxIcon, RefreshCwIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export default function UnifiedAnalytics() {
  const {
    user
  } = useAuth();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const isBusinessUser = user?.role === 'business';
  // Mock data for analytics
  const locations = ['All Locations', 'Main Office - Butuan City', 'Branch 1 - Agusan del Norte', 'Branch 2 - Surigao City'];
  const locationScores = [{
    name: 'Main Office - Butuan City',
    score: 92,
    traffic: 'High',
    accessibility: 'Excellent',
    competitors: 8,
    population: '125K',
    risk: 'Low'
  }, {
    name: 'Branch 1 - Agusan del Norte',
    score: 85,
    traffic: 'Medium',
    accessibility: 'Good',
    competitors: 5,
    population: '78K',
    risk: 'Low'
  }, {
    name: 'Branch 2 - Surigao City',
    score: 78,
    traffic: 'Medium',
    accessibility: 'Good',
    competitors: 12,
    population: '95K',
    risk: 'Medium'
  }];
  const stockLevels = [{
    product: 'Office Supplies Bundle',
    status: 'safe',
    current: 450,
    optimal: 500,
    trend: 'stable'
  }, {
    product: 'Construction Materials',
    status: 'low',
    current: 120,
    optimal: 300,
    trend: 'decreasing'
  }, {
    product: 'Fresh Produce',
    status: 'critical',
    current: 25,
    optimal: 200,
    trend: 'decreasing'
  }, {
    product: 'Tech Equipment',
    status: 'safe',
    current: 180,
    optimal: 200,
    trend: 'increasing'
  }];
  const fastMovingProducts = [{
    name: 'Office Paper A4',
    sales: 1250,
    growth: '+15%'
  }, {
    name: 'Construction Cement',
    sales: 980,
    growth: '+22%'
  }, {
    name: 'Fresh Vegetables',
    sales: 875,
    growth: '+8%'
  }, {
    name: 'Tech Accessories',
    sales: 650,
    growth: '+12%'
  }];
  const slowMovingProducts = [{
    name: 'Specialty Tools',
    sales: 45,
    decline: '-18%'
  }, {
    name: 'Seasonal Items',
    sales: 32,
    decline: '-25%'
  }, {
    name: 'Bulk Hardware',
    sales: 28,
    decline: '-12%'
  }];
  const aiRecommendations = [{
    type: 'expand',
    title: 'Expand to Commercial District Zone 4',
    confidence: 94,
    reason: 'High construction activity detected. Hardware demand increasing by 35%.',
    action: 'View Location'
  }, {
    type: 'product',
    title: 'Introduce Tech Equipment in Branch 2',
    confidence: 88,
    reason: 'Growing IT sector nearby. 12 new tech companies opened in Q4.',
    action: 'Add Products'
  }, {
    type: 'remove',
    title: 'Phase out Seasonal Items in Main Office',
    confidence: 82,
    reason: 'Consistent low demand for 6 months. Storage cost exceeds profit.',
    action: 'Review Inventory'
  }, {
    type: 'supplier',
    title: 'Switch to FastShip Logistics',
    confidence: 90,
    reason: '25% faster delivery, 15% cost reduction vs. current supplier.',
    action: 'Compare Suppliers'
  }];
  const alerts = [{
    severity: 'high',
    type: 'stock',
    message: 'Fresh Produce critically low - Restock within 24 hours',
    location: 'Main Office'
  }, {
    severity: 'medium',
    type: 'risk',
    message: 'Flood risk alert for Branch 2 area - Monitor inventory',
    location: 'Branch 2'
  }, {
    severity: 'high',
    type: 'competition',
    message: 'New competitor opened 0.5km from Branch 1',
    location: 'Branch 1'
  }, {
    severity: 'low',
    type: 'demand',
    message: 'Tech equipment demand dropped 8% this week',
    location: 'All Locations'
  }];
  const consumerSegments = [{
    segment: 'Small Businesses',
    percentage: 42,
    trend: '+5%'
  }, {
    segment: 'Construction Companies',
    percentage: 28,
    trend: '+12%'
  }, {
    segment: 'Retail Stores',
    percentage: 18,
    trend: '-3%'
  }, {
    segment: 'Individual Buyers',
    percentage: 12,
    trend: '+2%'
  }];
  const peakHours = [{
    time: '8:00 AM - 10:00 AM',
    activity: 85
  }, {
    time: '10:00 AM - 12:00 PM',
    activity: 95
  }, {
    time: '12:00 PM - 2:00 PM',
    activity: 65
  }, {
    time: '2:00 PM - 4:00 PM',
    activity: 78
  }, {
    time: '4:00 PM - 6:00 PM',
    activity: 92
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-m2m-success/20 text-m2m-success border-m2m-success/30';
      case 'low':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow border-m2m-chart-yellow/30';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow border-m2m-chart-yellow/30';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-m2m-text-primary flex items-center">
              <BarChart3Icon className="w-8 h-8 mr-3 text-m2m-accent-blue" />
              Analytics Dashboard
            </h1>
            <p className="text-m2m-text-secondary mt-2">
              Comprehensive insights and performance metrics for data-driven
              decisions
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center bg-m2m-bg-card border border-m2m-divider rounded-lg p-1">
              <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeRange === 'daily' ? 'bg-m2m-accent-blue text-white shadow-lg' : 'text-m2m-text-secondary hover:text-m2m-text-primary'}`}>
                Daily
              </button>
              <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeRange === 'weekly' ? 'bg-m2m-accent-blue text-white shadow-lg' : 'text-m2m-text-secondary hover:text-m2m-text-primary'}`}>
                Weekly
              </button>
              <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeRange === 'monthly' ? 'bg-m2m-accent-blue text-white shadow-lg' : 'text-m2m-text-secondary hover:text-m2m-text-primary'}`}>
                Monthly
              </button>
            </div>
            {/* Location Filter */}
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="px-4 py-2 bg-m2m-bg-card border border-m2m-divider rounded-lg text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue">
              {locations.map((loc, index) => <option key={index} value={loc.toLowerCase()}>
                  {loc}
                </option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-m2m-accent-blue/20 rounded-full flex items-center justify-center">
              <DollarSignIcon className="w-6 h-6 text-m2m-accent-blue" />
            </div>
            <span className="flex items-center text-m2m-success text-sm font-semibold">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              +12.5%
            </span>
          </div>
          <p className="text-m2m-text-secondary text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-m2m-text-primary">₱2.4M</p>
          <p className="text-xs text-m2m-text-secondary mt-2">
            vs. last{' '}
            {timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}
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
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-m2m-accent-teal/20 rounded-full flex items-center justify-center">
              <ShoppingBagIcon className="w-6 h-6 text-m2m-accent-teal" />
            </div>
            <span className="flex items-center text-m2m-success text-sm font-semibold">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              +8.3%
            </span>
          </div>
          <p className="text-m2m-text-secondary text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-m2m-text-primary">1,847</p>
          <p className="text-xs text-m2m-text-secondary mt-2">
            Across all locations
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
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-m2m-accent-orange/20 rounded-full flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-m2m-accent-orange" />
            </div>
            <span className="flex items-center text-m2m-success text-sm font-semibold">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              +15.2%
            </span>
          </div>
          <p className="text-m2m-text-secondary text-sm mb-1">
            Customer Traffic
          </p>
          <p className="text-3xl font-bold text-m2m-text-primary">12.5K</p>
          <p className="text-xs text-m2m-text-secondary mt-2">
            Unique visitors
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
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-m2m-success/20 rounded-full flex items-center justify-center">
              <PercentIcon className="w-6 h-6 text-m2m-success" />
            </div>
            <span className="flex items-center text-red-600 text-sm font-semibold">
              <ArrowDownIcon className="w-4 h-4 mr-1" />
              -2.1%
            </span>
          </div>
          <p className="text-m2m-text-secondary text-sm mb-1">
            Conversion Rate
          </p>
          <p className="text-3xl font-bold text-m2m-text-primary">14.8%</p>
          <p className="text-xs text-m2m-text-secondary mt-2">
            Traffic to sales
          </p>
        </motion.div>
      </div>

      {/* 1. Location Performance Analytics */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
            <MapPinIcon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
            Location Performance Analytics
          </h2>
          <button className="text-sm text-m2m-accent-blue hover:underline">
            View Full Map
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {locationScores.map((location, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.6 + index * 0.1
        }} className="bg-m2m-bg-primary rounded-lg p-5 border border-m2m-divider hover:border-m2m-accent-blue transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-m2m-text-primary text-sm">
                  {location.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {location.score}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-m2m-text-secondary">Traffic:</span>
                  <span className="font-medium text-m2m-text-primary">
                    {location.traffic}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-m2m-text-secondary">
                    Accessibility:
                  </span>
                  <span className="font-medium text-m2m-text-primary">
                    {location.accessibility}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-m2m-text-secondary">Competitors:</span>
                  <span className="font-medium text-m2m-text-primary">
                    {location.competitors}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-m2m-text-secondary">Population:</span>
                  <span className="font-medium text-m2m-text-primary">
                    {location.population}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-m2m-text-secondary">Risk Level:</span>
                  <span className={`font-semibold ${location.risk === 'Low' ? 'text-m2m-success' : location.risk === 'Medium' ? 'text-m2m-chart-yellow' : 'text-red-600'}`}>
                    {location.risk}
                  </span>
                </div>
              </div>
            </motion.div>)}
        </div>
      </motion.div>

      {/* 2. Inventory & Stock Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
            <PackageIcon className="w-6 h-6 mr-2 text-m2m-accent-teal" />
            Stock Level Status
          </h2>
          <div className="space-y-3">
            {stockLevels.map((stock, index) => <div key={index} className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-m2m-text-primary text-sm">
                    {stock.product}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full border ${getStatusColor(stock.status)}`}>
                    {stock.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-m2m-text-secondary">
                    Current: {stock.current}
                  </span>
                  <span className="text-m2m-text-secondary">
                    Optimal: {stock.optimal}
                  </span>
                </div>
                <div className="w-full h-2 bg-m2m-divider rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${stock.status === 'safe' ? 'bg-m2m-success' : stock.status === 'low' ? 'bg-m2m-chart-yellow' : 'bg-red-600'}`} style={{
                width: `${stock.current / stock.optimal * 100}%`
              }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-m2m-text-secondary">
                    Trend: {stock.trend}
                  </span>
                  {stock.status === 'critical' && <button className="text-xs text-m2m-accent-blue hover:underline">
                      Restock Now
                    </button>}
                </div>
              </div>)}
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
            <TrendingUpIcon className="w-6 h-6 mr-2 text-m2m-success" />
            Product Performance
          </h2>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-m2m-text-primary mb-3 flex items-center">
              <ThumbsUpIcon className="w-4 h-4 mr-2 text-m2m-success" />
              Fast-Moving Products
            </h3>
            <div className="space-y-2">
              {fastMovingProducts.map((product, index) => <div key={index} className="flex items-center justify-between p-3 bg-m2m-success/10 rounded-lg border border-m2m-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-m2m-success/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-m2m-success">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-m2m-text-primary">
                        {product.name}
                      </p>
                      <p className="text-xs text-m2m-text-secondary">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-m2m-success">
                    {product.growth}
                  </span>
                </div>)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-m2m-text-primary mb-3 flex items-center">
              <ThumbsDownIcon className="w-4 h-4 mr-2 text-m2m-accent-orange" />
              Slow-Moving Products
            </h3>
            <div className="space-y-2">
              {slowMovingProducts.map((product, index) => <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="text-sm font-medium text-m2m-text-primary">
                      {product.name}
                    </p>
                    <p className="text-xs text-m2m-text-secondary">
                      {product.sales} sales
                    </p>
                  </div>
                  <span className="text-sm font-bold text-red-600">
                    {product.decline}
                  </span>
                </div>)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Sales & Revenue Insights */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.9
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
          <LineChartIcon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
          Sales & Revenue Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <p className="text-sm text-m2m-text-secondary mb-2">
              Average Order Value
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">₱1,298</p>
            <p className="text-xs text-m2m-success mt-1">
              +5.2% vs last period
            </p>
          </div>
          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <p className="text-sm text-m2m-text-secondary mb-2">
              Best Performing Zone
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">Zone A</p>
            <p className="text-xs text-m2m-text-secondary mt-1">
              ₱850K revenue
            </p>
          </div>
          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <p className="text-sm text-m2m-text-secondary mb-2">
              Profit Margin
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">28.5%</p>
            <p className="text-xs text-m2m-success mt-1">+2.3% improvement</p>
          </div>
        </div>

        <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
          <h3 className="text-sm font-semibold text-m2m-text-primary mb-4">
            Revenue Trend ({timeRange})
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 78, 82, 88, 75, 92, 95].map((height, index) => <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div initial={{
              height: 0
            }} animate={{
              height: `${height}%`
            }} transition={{
              delay: 1 + index * 0.1,
              duration: 0.5
            }} className="w-full bg-gradient-to-t from-m2m-accent-blue to-m2m-accent-teal rounded-t-lg" />
                <span className="text-xs text-m2m-text-secondary mt-2">
                  {timeRange === 'daily' ? `Day ${index + 1}` : timeRange === 'weekly' ? `Week ${index + 1}` : `Month ${index + 1}`}
                </span>
              </div>)}
          </div>
        </div>
      </motion.div>

      {/* 4. Market & Consumer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.0
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
            <UsersIcon className="w-6 h-6 mr-2 text-m2m-accent-teal" />
            Consumer Segments
          </h2>
          <div className="space-y-3">
            {consumerSegments.map((segment, index) => <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-m2m-text-primary">
                    {segment.segment}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-m2m-text-primary">
                      {segment.percentage}%
                    </span>
                    <span className={`text-xs font-semibold ${segment.trend.startsWith('+') ? 'text-m2m-success' : 'text-red-600'}`}>
                      {segment.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-m2m-divider rounded-full overflow-hidden">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: `${segment.percentage}%`
              }} transition={{
                delay: 1.1 + index * 0.1,
                duration: 0.5
              }} className="h-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal rounded-full" />
                </div>
              </div>)}
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.1
      }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
            <ClockIcon className="w-6 h-6 mr-2 text-m2m-accent-orange" />
            Peak Buying Hours
          </h2>
          <div className="space-y-3">
            {peakHours.map((hour, index) => <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-m2m-text-primary">
                    {hour.time}
                  </span>
                  <span className="text-sm font-bold text-m2m-text-primary">
                    {hour.activity}%
                  </span>
                </div>
                <div className="w-full h-2 bg-m2m-divider rounded-full overflow-hidden">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: `${hour.activity}%`
              }} transition={{
                delay: 1.2 + index * 0.1,
                duration: 0.5
              }} className={`h-full rounded-full ${hour.activity >= 90 ? 'bg-m2m-success' : hour.activity >= 75 ? 'bg-m2m-accent-blue' : 'bg-m2m-chart-yellow'}`} />
                </div>
              </div>)}
          </div>
        </motion.div>
      </div>

      {/* 5. AI Recommendation Center */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.2
    }} className="bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 rounded-xl p-6 border border-m2m-accent-blue/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
            AI Recommendation Center
          </h2>
          <span className="px-3 py-1 bg-m2m-accent-blue/20 text-m2m-accent-blue rounded-full text-xs font-bold">
            Powered by AI
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {aiRecommendations.map((rec, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 1.3 + index * 0.1
        }} className="bg-m2m-bg-card rounded-lg p-5 border border-m2m-divider hover:border-m2m-accent-blue transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {rec.type === 'expand' && <TargetIcon className="w-5 h-5 text-m2m-accent-blue" />}
                  {rec.type === 'product' && <PackageIcon className="w-5 h-5 text-m2m-accent-teal" />}
                  {rec.type === 'remove' && <AlertTriangleIcon className="w-5 h-5 text-m2m-accent-orange" />}
                  {rec.type === 'supplier' && <TruckIcon className="w-5 h-5 text-m2m-success" />}
                  <h3 className="font-semibold text-m2m-text-primary text-sm">
                    {rec.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <ZapIcon className="w-4 h-4 text-m2m-chart-yellow" />
                  <span className="text-xs font-bold text-m2m-text-primary">
                    {rec.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-m2m-text-secondary mb-4">
                {rec.reason}
              </p>
              <button className="w-full px-4 py-2 bg-m2m-accent-blue text-white rounded-lg text-sm font-medium hover:bg-m2m-accent-blue/90 transition-all">
                {rec.action}
              </button>
            </motion.div>)}
        </div>
      </motion.div>

      {/* 6. Operational Performance */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.4
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
          <ActivityIcon className="w-6 h-6 mr-2 text-m2m-accent-teal" />
          Operational Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className="w-5 h-5 text-m2m-accent-blue" />
              <span className="text-xs font-semibold text-m2m-success">
                Excellent
              </span>
            </div>
            <p className="text-sm text-m2m-text-secondary mb-1">
              Fulfillment Speed
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">2.3h</p>
            <p className="text-xs text-m2m-text-secondary mt-1">Average time</p>
          </div>

          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <div className="flex items-center justify-between mb-2">
              <TruckIcon className="w-5 h-5 text-m2m-accent-teal" />
              <span className="text-xs font-semibold text-m2m-success">
                4.8/5.0
              </span>
            </div>
            <p className="text-sm text-m2m-text-secondary mb-1">
              Supplier Score
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">96%</p>
            <p className="text-xs text-m2m-text-secondary mt-1">
              On-time delivery
            </p>
          </div>

          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <div className="flex items-center justify-between mb-2">
              <StarIcon className="w-5 h-5 text-m2m-chart-yellow" />
              <span className="text-xs font-semibold text-m2m-success">
                +0.3
              </span>
            </div>
            <p className="text-sm text-m2m-text-secondary mb-1">
              Customer Satisfaction
            </p>
            <p className="text-2xl font-bold text-m2m-text-primary">4.7/5</p>
            <p className="text-xs text-m2m-text-secondary mt-1">
              Based on reviews
            </p>
          </div>

          <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
            <div className="flex items-center justify-between mb-2">
              <RefreshCwIcon className="w-5 h-5 text-m2m-accent-orange" />
              <span className="text-xs font-semibold text-m2m-success">
                -12%
              </span>
            </div>
            <p className="text-sm text-m2m-text-secondary mb-1">Lead Time</p>
            <p className="text-2xl font-bold text-m2m-text-primary">1.8d</p>
            <p className="text-xs text-m2m-text-secondary mt-1">Optimized</p>
          </div>
        </div>
      </motion.div>

      {/* 7. Risk & Alert Dashboard */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.5
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
          <ShieldAlertIcon className="w-6 h-6 mr-2 text-m2m-accent-orange" />
          Risk & Alert Dashboard
        </h2>

        <div className="space-y-3">
          {alerts.map((alert, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 1.6 + index * 0.1
        }} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {alert.severity === 'high' && <AlertTriangleIcon className="w-5 h-5 text-red-700" />}
                    {alert.severity === 'medium' && <AlertCircleIcon className="w-5 h-5 text-m2m-chart-yellow" />}
                    {alert.severity === 'low' && <AlertCircleIcon className="w-5 h-5 text-blue-700" />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="opacity-75">
                        Type: {alert.type.toUpperCase()}
                      </span>
                      <span className="opacity-75">
                        Location: {alert.location}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-xs font-medium hover:underline">
                  View Details
                </button>
              </div>
            </motion.div>)}
        </div>
      </motion.div>

      {/* 8. Benchmark & Comparison */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.7
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary flex items-center mb-6">
          <PieChartIcon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
          Benchmark & Comparison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-m2m-bg-primary rounded-lg p-5 border border-m2m-divider">
            <h3 className="text-sm font-semibold text-m2m-text-primary mb-4">
              Your Performance
            </h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-m2m-divider" />
                  <motion.circle cx="64" cy="64" r="56" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeDasharray="351.86" initial={{
                  strokeDashoffset: 351.86
                }} animate={{
                  strokeDashoffset: 52.78
                }} transition={{
                  delay: 1.8,
                  duration: 1.5
                }} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0052D4" />
                      <stop offset="100%" stopColor="#00B3A4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-m2m-text-primary">
                    85%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-m2m-text-secondary text-center">
              Above area average by 12%
            </p>
          </div>

          <div className="bg-m2m-bg-primary rounded-lg p-5 border border-m2m-divider">
            <h3 className="text-sm font-semibold text-m2m-text-primary mb-4">
              Price Competitiveness
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">
                  Your Avg Price
                </span>
                <span className="text-sm font-bold text-m2m-text-primary">
                  ₱1,250
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">
                  Market Avg
                </span>
                <span className="text-sm font-bold text-m2m-text-primary">
                  ₱1,320
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">
                  Difference
                </span>
                <span className="text-sm font-bold text-m2m-success">
                  -5.3% (Better)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-m2m-bg-primary rounded-lg p-5 border border-m2m-divider">
            <h3 className="text-sm font-semibold text-m2m-text-primary mb-4">
              Competitor Analysis
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">
                  Your Score
                </span>
                <span className="text-sm font-bold text-m2m-text-primary">
                  8.5/10
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">
                  Top Competitor
                </span>
                <span className="text-sm font-bold text-m2m-text-primary">
                  8.2/10
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-m2m-text-secondary">Ranking</span>
                <span className="text-sm font-bold text-m2m-success">
                  #1 in Zone
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
}