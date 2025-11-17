import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { PackageIcon, ShoppingCartIcon, TruckIcon, TrendingUpIcon, TrendingDownIcon, BarChart3Icon, UsersIcon, ArrowUpIcon, ArrowDownIcon, ActivityIcon, ClockIcon, StarIcon, DollarSignIcon, BoxIcon, CheckCircle2Icon, AlertTriangleIcon, BellIcon, SparklesIcon, PlusIcon, LayoutDashboardIcon, RefreshCwIcon, FileTextIcon, MapPinIcon, PercentIcon, TimerIcon, AwardIcon, LineChartIcon, StoreIcon, ShoppingBagIcon, MessageSquareIcon, PrinterIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
export default function SupplierDashboard() {
  const {
    items
  } = useCart();
  const {
    orders
  } = useSupplierOrders();
  const totalProducts = 24;
  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(o => o.status === 'Pending').length;
  // NEW: Supplier KPI Data
  const supplierKPIs = [{
    title: 'Incoming Orders',
    value: '47',
    icon: ShoppingCartIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal',
    change: '+12',
    changeType: 'increase'
  }, {
    title: 'Pending Fulfillment',
    value: '18',
    icon: ClockIcon,
    color: 'from-m2m-chart-yellow to-m2m-accent-orange',
    change: '+3',
    changeType: 'warning'
  }, {
    title: 'On-Time Delivery',
    value: '94%',
    icon: CheckCircle2Icon,
    color: 'from-m2m-success to-m2m-chart-green',
    change: '+2%',
    changeType: 'increase'
  }, {
    title: 'Top Product',
    value: 'Rice 25kg',
    icon: PackageIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange',
    change: '132 orders',
    changeType: 'neutral'
  }, {
    title: 'Revenue Today',
    value: '₱78,450',
    icon: DollarSignIcon,
    color: 'from-purple-500 to-pink-500',
    change: '+24%',
    changeType: 'increase'
  }, {
    title: 'Demand Trend',
    value: 'Up',
    icon: TrendingUpIcon,
    color: 'from-m2m-success to-green-400',
    change: '+18%',
    changeType: 'increase'
  }];
  // NEW: AI Supplier Insights
  const supplierInsights = [{
    id: 1,
    message: 'High demand for Premium Rice 25kg in Zone 4. Consider increasing stock.',
    severity: 'high',
    icon: TrendingUpIcon
  }, {
    id: 2,
    message: 'Your delivery rate dropped by 6% this week. Suggested action: optimize delivery routes.',
    severity: 'medium',
    icon: AlertTriangleIcon
  }, {
    id: 3,
    message: 'Retailers in your area are frequently running out of Fresh Vegetables. Opportunity detected.',
    severity: 'low',
    icon: StoreIcon
  }];
  // NEW: Product Demand Forecast
  const demandForecast = [{
    product: 'Premium Rice 25kg',
    currentDemand: 132,
    predictedDemand: 165,
    trend: 'up',
    zone: 'Zone 4'
  }, {
    product: 'Fresh Vegetables Mix',
    currentDemand: 98,
    predictedDemand: 125,
    trend: 'up',
    zone: 'Zone 3'
  }, {
    product: 'Chicken Breast',
    currentDemand: 87,
    predictedDemand: 95,
    trend: 'up',
    zone: 'Zone 2'
  }, {
    product: 'Organic Tomatoes',
    currentDemand: 76,
    predictedDemand: 68,
    trend: 'down',
    zone: 'Zone 1'
  }];
  // NEW: Incoming Orders Summary
  const incomingOrdersSummary = {
    total: 47,
    pending: 18,
    inTransit: 15,
    completed: 14
  };
  // NEW: Top Customers
  const topCustomers = [{
    name: 'ABC Trading Co.',
    orders: 34,
    frequency: 'Weekly',
    trend: 'up'
  }, {
    name: 'Metro Fresh Mart',
    orders: 28,
    frequency: 'Bi-weekly',
    trend: 'up'
  }, {
    name: 'Green Valley Store',
    orders: 22,
    frequency: 'Weekly',
    trend: 'stable'
  }, {
    name: 'Prime Retail Hub',
    orders: 19,
    frequency: 'Monthly',
    trend: 'down'
  }];
  // NEW: Supplier Inventory Status
  const supplierInventory = {
    available: 156,
    lowStock: 8,
    overstock: 3,
    suggestions: [{
      product: 'Premium Rice 25kg',
      action: 'Increase production by 30%'
    }, {
      product: 'Fresh Vegetables',
      action: 'Restock immediately'
    }, {
      product: 'Organic Eggs',
      action: 'Reduce production - slow moving'
    }]
  };
  // NEW: Market Activity Feed (Supplier View)
  const supplierMarketActivities = [{
    id: 1,
    type: 'demand',
    message: 'Demand spike for Fresh Produce in Zone 4 (+35%)',
    time: '10 min ago',
    icon: TrendingUpIcon,
    color: 'text-m2m-success'
  }, {
    id: 2,
    type: 'business',
    message: 'New retail business "Fresh Market Pro" registered in your delivery zone',
    time: '45 min ago',
    icon: StoreIcon,
    color: 'text-m2m-accent-blue'
  }, {
    id: 3,
    type: 'competitor',
    message: 'Competitor reduced price for Premium Rice by 8%',
    time: '2 hours ago',
    icon: AlertCircleIcon,
    color: 'text-m2m-accent-orange'
  }, {
    id: 4,
    type: 'search',
    message: 'Retailers searching for "Organic Vegetables" increased by 45%',
    time: '4 hours ago',
    icon: LineChartIcon,
    color: 'text-m2m-accent-teal'
  }];
  // NEW: Supplier Alerts
  const supplierAlerts = [{
    id: 1,
    title: 'Low Inventory Alert',
    message: 'Premium Rice 25kg - Only 45 units remaining',
    severity: 'high',
    icon: AlertTriangleIcon
  }, {
    id: 2,
    title: 'High Demand Warning',
    message: 'Fresh Vegetables demand increased 35% in Zone 4',
    severity: 'high',
    icon: TrendingUpIcon
  }, {
    id: 3,
    title: 'Delivery Delay Alert',
    message: '3 orders delayed due to traffic in Zone 2',
    severity: 'medium',
    icon: TruckIcon
  }, {
    id: 4,
    title: 'Payment Reminder',
    message: '2 invoices pending payment from ABC Trading Co.',
    severity: 'medium',
    icon: DollarSignIcon
  }];
  // NEW: Supplier Performance Metrics
  const supplierPerformance = {
    fulfillmentRate: 94,
    avgDeliveryTime: '2.3 hours',
    customerSatisfaction: 4.7,
    topSKUs: [{
      name: 'Premium Rice 25kg',
      orders: 132,
      revenue: '₱23,760'
    }, {
      name: 'Fresh Vegetables Mix',
      orders: 98,
      revenue: '₱17,640'
    }, {
      name: 'Chicken Breast',
      orders: 87,
      revenue: '₱15,660'
    }]
  };
  const stats = [{
    title: 'Total Products',
    value: totalProducts,
    icon: PackageIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal',
    link: '/supplier/products',
    change: '+12%',
    changeType: 'increase'
  }, {
    title: 'Cart Items',
    value: items.length,
    icon: ShoppingCartIcon,
    color: 'from-m2m-accent-teal to-m2m-accent-blue',
    link: '/supplier/cart',
    change: '+5%',
    changeType: 'increase'
  }, {
    title: 'Total Orders',
    value: totalOrders,
    icon: TruckIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange',
    link: '/supplier/orders',
    change: '+23%',
    changeType: 'increase'
  }, {
    title: 'Pending Deliveries',
    value: pendingDeliveries,
    icon: TrendingUpIcon,
    color: 'from-m2m-success to-m2m-chart-green',
    link: '/supplier/orders',
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
          Supplier Dashboard
        </h1>
        <p className="text-m2m-text-secondary mt-2">
          Welcome back! Manage your inventory, fulfill orders, and track
          supplier performance in real-time.
        </p>
      </motion.div>

      {/* NEW: Supplier KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {supplierKPIs.map((kpi, index) => <motion.div key={index} initial={{
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

      {/* NEW: Quick Actions Toolbar (Supplier Tools) */}
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
          <Link to="/dashboard/add-product" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-blue/10 hover:border-m2m-accent-blue border border-m2m-divider transition-all duration-300 group">
            <PlusIcon className="w-6 h-6 text-m2m-accent-blue mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Add Product
            </span>
          </Link>
          <Link to="/supplier/products" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-teal/10 hover:border-m2m-accent-teal border border-m2m-divider transition-all duration-300 group">
            <RefreshCwIcon className="w-6 h-6 text-m2m-accent-teal mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Update Inventory
            </span>
          </Link>
          <Link to="/supplier/orders" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-success/10 hover:border-m2m-success border border-m2m-divider transition-all duration-300 group">
            <ShoppingCartIcon className="w-6 h-6 text-m2m-success mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Process Orders
            </span>
          </Link>
          <Link to="/supplier/orders" className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-orange/10 hover:border-m2m-accent-orange border border-m2m-divider transition-all duration-300 group">
            <TruckIcon className="w-6 h-6 text-m2m-accent-orange mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              Manage Deliveries
            </span>
          </Link>
          <button onClick={() => toast.info('AI Assistant feature coming soon!')} className="flex flex-col items-center justify-center p-4 bg-m2m-bg-primary rounded-lg hover:bg-purple-500/10 hover:border-purple-500 border border-m2m-divider transition-all duration-300 group">
            <MessageSquareIcon className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-m2m-text-primary">
              AI Assistant
            </span>
          </button>
        </div>
      </motion.div>

      {/* NEW: AI Supplier Insights + Product Demand Forecast Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Supplier Insights Panel */}
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
              AI Supplier Insights
            </h2>
            <button onClick={() => toast.info('Full insights coming soon!')} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View More →
            </button>
          </div>
          <div className="space-y-3">
            {supplierInsights.map((insight, index) => <motion.div key={insight.id} initial={{
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

        {/* Product Demand Forecast Panel */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <LineChartIcon className="w-5 h-5 mr-2 text-m2m-success" />
              Demand Forecast
            </h2>
            <select className="px-3 py-1.5 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-sm text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-all duration-300">
              <option>Next Week</option>
              <option>Next Month</option>
              <option>Next Quarter</option>
            </select>
          </div>
          <div className="space-y-3">
            {demandForecast.map((item, index) => <motion.div key={index} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.6 + index * 0.1
          }} className="flex items-center justify-between p-3 bg-m2m-bg-primary rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary truncate">
                    {item.product}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPinIcon className="w-3 h-3 text-m2m-text-secondary" />
                    <span className="text-xs text-m2m-text-secondary">
                      {item.zone}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-m2m-text-secondary">Current</p>
                    <p className="text-sm font-bold text-m2m-text-primary">
                      {item.currentDemand}
                    </p>
                  </div>
                  <ArrowUpIcon className={`w-4 h-4 ${item.trend === 'up' ? 'text-m2m-success' : 'text-m2m-accent-orange'}`} />
                  <div className="text-right">
                    <p className="text-xs text-m2m-text-secondary">Predicted</p>
                    <p className="text-sm font-bold text-m2m-success">
                      {item.predictedDemand}
                    </p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>

      {/* NEW: Incoming Orders Summary + Top Customers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Orders Summary */}
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
              <ShoppingBagIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
              Incoming Orders
            </h2>
            <Link to="/supplier/orders" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 rounded-lg border border-m2m-accent-blue/30">
              <p className="text-3xl font-bold text-m2m-accent-blue">
                {incomingOrdersSummary.total}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">
                Total Orders
              </p>
            </div>
            <div className="p-4 bg-m2m-chart-yellow/10 rounded-lg border border-m2m-chart-yellow/30">
              <p className="text-3xl font-bold text-m2m-chart-yellow">
                {incomingOrdersSummary.pending}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">Pending</p>
            </div>
            <div className="p-4 bg-m2m-accent-orange/10 rounded-lg border border-m2m-accent-orange/30">
              <p className="text-3xl font-bold text-m2m-accent-orange">
                {incomingOrdersSummary.inTransit}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">In Transit</p>
            </div>
            <div className="p-4 bg-m2m-success/10 rounded-lg border border-m2m-success/30">
              <p className="text-3xl font-bold text-m2m-success">
                {incomingOrdersSummary.completed}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">Completed</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/supplier/orders" className="flex-1 px-4 py-2 bg-m2m-accent-blue text-white rounded-lg text-sm font-medium hover:bg-m2m-accent-teal transition-colors text-center">
              Prepare Order
            </Link>
            <button onClick={() => toast.info('Print feature coming soon!')} className="px-4 py-2 bg-m2m-bg-primary border border-m2m-divider text-m2m-text-primary rounded-lg text-sm font-medium hover:bg-m2m-accent-blue/10 transition-colors flex items-center">
              <PrinterIcon className="w-4 h-4 mr-1" />
              Print
            </button>
          </div>
        </motion.div>

        {/* Top Customers Overview */}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <UsersIcon className="w-5 h-5 mr-2 text-m2m-accent-teal" />
              Top Customers
            </h2>
            <button onClick={() => toast.info('Customer insights coming soon!')} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => <motion.div key={index} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.8 + index * 0.1
          }} className="flex items-center justify-between p-3 bg-m2m-bg-primary rounded-lg hover:bg-m2m-accent-blue/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-m2m-text-primary truncate">
                    {customer.name}
                  </p>
                  <p className="text-xs text-m2m-text-secondary mt-1">
                    Orders: {customer.frequency}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-m2m-text-primary">
                      {customer.orders}
                    </p>
                    <p className="text-xs text-m2m-text-secondary">Total</p>
                  </div>
                  {customer.trend === 'up' ? <ArrowUpIcon className="w-4 h-4 text-m2m-success" /> : customer.trend === 'down' ? <ArrowDownIcon className="w-4 h-4 text-m2m-accent-orange" /> : <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-m2m-text-secondary"></div>
                    </div>}
                </div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>

      {/* NEW: Inventory Status + Market Activity Feed Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Status Summary (Supplier View) */}
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
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <BoxIcon className="w-5 h-5 mr-2 text-m2m-accent-teal" />
              Inventory Status
            </h2>
            <Link to="/supplier/products" className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              Manage →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-m2m-success/10 rounded-lg border border-m2m-success/30 text-center">
              <p className="text-2xl font-bold text-m2m-success">
                {supplierInventory.available}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">Available</p>
            </div>
            <div className="p-3 bg-m2m-chart-yellow/10 rounded-lg border border-m2m-chart-yellow/30 text-center">
              <p className="text-2xl font-bold text-m2m-chart-yellow">
                {supplierInventory.lowStock}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">Low Stock</p>
            </div>
            <div className="p-3 bg-m2m-accent-orange/10 rounded-lg border border-m2m-accent-orange/30 text-center">
              <p className="text-2xl font-bold text-m2m-accent-orange">
                {supplierInventory.overstock}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">Overstock</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-m2m-text-primary mb-2">
              Suggested Actions:
            </p>
            {supplierInventory.suggestions.map((suggestion, index) => <div key={index} className="flex items-start space-x-2 p-2 bg-m2m-bg-primary rounded-lg">
                <AlertCircleIcon className="w-4 h-4 text-m2m-accent-blue flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-m2m-text-primary">
                    {suggestion.product}
                  </p>
                  <p className="text-xs text-m2m-text-secondary">
                    {suggestion.action}
                  </p>
                </div>
              </div>)}
          </div>
        </motion.div>

        {/* Market Activity Feed (Supplier View) */}
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
          <h2 className="text-lg font-bold text-m2m-text-primary mb-4 flex items-center">
            <ActivityIcon className="w-5 h-5 mr-2 text-m2m-accent-teal" />
            Market Activity
          </h2>
          <div className="space-y-3">
            {supplierMarketActivities.map((activity, index) => <motion.div key={activity.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 1.0 + index * 0.1
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
      </div>

      {/* NEW: Alerts & Notifications + Supplier Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts and Notifications Panel */}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <BellIcon className="w-5 h-5 mr-2 text-m2m-accent-orange" />
              Alerts & Notifications
            </h2>
            <button onClick={() => toast.info('All alerts coming soon!')} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {supplierAlerts.map((alert, index) => <motion.div key={alert.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 1.1 + index * 0.1
          }} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} flex items-start space-x-3`}>
                <alert.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="text-xs mt-1">{alert.message}</p>
                </div>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Supplier Performance Overview */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 1.1
      }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-m2m-text-primary flex items-center">
              <AwardIcon className="w-5 h-5 mr-2 text-m2m-success" />
              Performance Overview
            </h2>
            <button onClick={() => toast.info('Analytics coming soon!')} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
              Analytics →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-m2m-success/10 rounded-lg border border-m2m-success/30 text-center">
              <p className="text-2xl font-bold text-m2m-success">
                {supplierPerformance.fulfillmentRate}%
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">
                Fulfillment
              </p>
            </div>
            <div className="p-3 bg-m2m-accent-blue/10 rounded-lg border border-m2m-accent-blue/30 text-center">
              <p className="text-xl font-bold text-m2m-accent-blue">
                {supplierPerformance.avgDeliveryTime}
              </p>
              <p className="text-xs text-m2m-text-secondary mt-1">
                Avg Delivery
              </p>
            </div>
            <div className="p-3 bg-m2m-chart-yellow/10 rounded-lg border border-m2m-chart-yellow/30 text-center">
              <div className="flex items-center justify-center space-x-1">
                <StarIcon className="w-4 h-4 text-m2m-chart-yellow fill-current" />
                <p className="text-2xl font-bold text-m2m-chart-yellow">
                  {supplierPerformance.customerSatisfaction}
                </p>
              </div>
              <p className="text-xs text-m2m-text-secondary mt-1">
                Satisfaction
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-m2m-text-primary mb-2">
              Top Performing SKUs:
            </p>
            {supplierPerformance.topSKUs.map((sku, index) => <div key={index} className="flex items-center justify-between p-2 bg-m2m-bg-primary rounded-lg">
                <span className="text-sm text-m2m-text-primary truncate flex-1">
                  {sku.name}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-m2m-text-secondary">
                    {sku.orders} orders
                  </span>
                  <span className="text-sm font-bold text-m2m-success">
                    {sku.revenue}
                  </span>
                </div>
              </div>)}
          </div>
        </motion.div>
      </div>

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
        delay: 1.2 + index * 0.1
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
            delay: 1.6 + index * 0.1,
            type: 'spring'
          }} className="text-3xl font-bold text-m2m-text-primary group-hover:text-m2m-accent-blue transition-colors duration-300">
                {stat.value}
              </motion.p>
            </Link>
          </motion.div>)}
      </div>

      {/* EXISTING: Recent Order Statistics */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 1.6
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-m2m-text-primary flex items-center">
            <BarChart3Icon className="w-6 h-6 mr-2 text-m2m-accent-blue" />
            Recent Order Statistics
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
          delay: 1.7 + index * 0.1
        }} className="flex flex-col items-center justify-end">
              <motion.div initial={{
            scaleY: 0
          }} animate={{
            scaleY: 1
          }} transition={{
            duration: 0.8,
            delay: 1.8 + index * 0.1,
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
            delay: 2.2 + index * 0.1
          }} className="text-sm font-semibold text-m2m-text-primary mt-2">
                {stat.orders}
              </motion.p>
              <p className="text-xs text-m2m-text-secondary">{stat.month}</p>
            </motion.div>)}
        </div>
      </motion.div>

      {/* EXISTING: Quick Actions */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 2.0
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <h2 className="text-xl font-bold text-m2m-text-primary mb-4">
          Additional Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div whileHover={{
          scale: 1.05,
          y: -5
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/supplier/products" className="block p-4 border-2 border-m2m-divider rounded-lg hover:border-m2m-accent-blue hover:bg-m2m-accent-blue/10 transition-all duration-300 ease-in-out hover:shadow-lg">
              <PackageIcon className="w-8 h-8 text-m2m-accent-blue mb-2" />
              <h3 className="font-semibold text-m2m-text-primary">
                Browse Products
              </h3>
              <p className="text-sm text-m2m-text-secondary">
                View available products
              </p>
            </Link>
          </motion.div>
          <motion.div whileHover={{
          scale: 1.05,
          y: -5
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/supplier/cart" className="block p-4 border-2 border-m2m-divider rounded-lg hover:border-m2m-accent-orange hover:bg-m2m-accent-orange/10 transition-all duration-300 ease-in-out hover:shadow-lg">
              <ShoppingCartIcon className="w-8 h-8 text-m2m-accent-orange mb-2" />
              <h3 className="font-semibold text-m2m-text-primary">View Cart</h3>
              <p className="text-sm text-m2m-text-secondary">
                Check your cart items
              </p>
            </Link>
          </motion.div>
          <motion.div whileHover={{
          scale: 1.05,
          y: -5
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/supplier/orders" className="block p-4 border-2 border-m2m-divider rounded-lg hover:border-m2m-success hover:bg-m2m-success/10 transition-all duration-300 ease-in-out hover:shadow-lg">
              <TruckIcon className="w-8 h-8 text-m2m-success mb-2" />
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
    </div>;
}