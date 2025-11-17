import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSupplierOrders } from '../../contexts/SupplierOrderContext';
import { toast } from 'sonner';
import { XIcon, ShoppingCartIcon, SearchIcon, ClockIcon, HistoryIcon, MinusIcon, PlusIcon, TrashIcon, CheckCircleIcon, XCircleIcon, ChevronDownIcon, HeartIcon, StarIcon, ZapIcon, PackageIcon, CheckIcon, MapPinIcon, CreditCardIcon, TruckIcon, ShieldCheckIcon, TagIcon, GiftIcon, EyeIcon, ShoppingBagIcon, RefreshCwIcon, UserIcon, PhoneIcon, HomeIcon, BuildingIcon, MapIcon, CloudIcon, CloudRainIcon, SunIcon, CloudSnowIcon, ThumbsUpIcon, MessageSquareIcon, ChevronUpIcon, Loader2Icon, BadgeCheckIcon, SettingsIcon, LogOutIcon, BellIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  rating: number;
  reviews: number;
}
interface ShippingAddress {
  recipientName: string;
  phoneNumber: string;
  region: string;
  city: string;
  district: string;
  street: string;
  unit: string;
  category: 'Home' | 'Office';
}
interface Feedback {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  isVerifiedBusiness: boolean;
}
// Extensive product catalog with 6-7 products per category
const MOCK_PRODUCTS: Product[] = [
// Retail & Shopping Supplies (7 products)
{
  id: 'rs1',
  name: 'Premium Shopping Bags',
  description: 'Eco-friendly reusable shopping bags made from durable recycled materials.',
  price: 450,
  image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
  stock: 200,
  category: 'Retail & Shopping Supplies',
  rating: 4.5,
  reviews: 128
}, {
  id: 'rs2',
  name: 'Professional Price Tag Gun',
  description: 'Industrial-grade price tagging system with ergonomic design.',
  price: 850,
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
  stock: 45,
  category: 'Retail & Shopping Supplies',
  rating: 4.8,
  reviews: 89
}, {
  id: 'rs3',
  name: 'Display Mannequins Set',
  description: 'Professional retail mannequins for clothing display.',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  stock: 30,
  category: 'Retail & Shopping Supplies',
  rating: 4.6,
  reviews: 67
}, {
  id: 'rs4',
  name: 'Retail Shelving Units',
  description: 'Adjustable metal shelving system for store displays.',
  price: 5500,
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
  stock: 25,
  category: 'Retail & Shopping Supplies',
  rating: 4.7,
  reviews: 92
}, {
  id: 'rs5',
  name: 'Cash Register System',
  description: 'Modern POS system with touch screen interface.',
  price: 15000,
  image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400',
  stock: 15,
  category: 'Retail & Shopping Supplies',
  rating: 4.9,
  reviews: 156
}, {
  id: 'rs6',
  name: 'Shopping Baskets',
  description: 'Durable plastic shopping baskets with handles.',
  price: 280,
  image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
  stock: 150,
  category: 'Retail & Shopping Supplies',
  rating: 4.4,
  reviews: 73
}, {
  id: 'rs7',
  name: 'Security Tag System',
  description: 'Electronic article surveillance system for theft prevention.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  stock: 20,
  category: 'Retail & Shopping Supplies',
  rating: 4.8,
  reviews: 104
},
// Office Equipment (7 products)
{
  id: 'oe1',
  name: 'Executive Ergonomic Chair',
  description: 'Premium office chair with advanced lumbar support.',
  price: 5500,
  image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
  stock: 35,
  category: 'Office Equipment',
  rating: 4.7,
  reviews: 156
}, {
  id: 'oe2',
  name: 'Standing Desk Pro',
  description: 'Electric height-adjustable standing desk.',
  price: 12000,
  image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400',
  stock: 22,
  category: 'Office Equipment',
  rating: 4.8,
  reviews: 143
}, {
  id: 'oe3',
  name: 'Office Filing Cabinet',
  description: '4-drawer steel filing cabinet with lock.',
  price: 4200,
  image: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400',
  stock: 40,
  category: 'Office Equipment',
  rating: 4.5,
  reviews: 87
}, {
  id: 'oe4',
  name: 'Conference Table',
  description: 'Large meeting table for 10-12 people.',
  price: 18000,
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  stock: 12,
  category: 'Office Equipment',
  rating: 4.9,
  reviews: 76
}, {
  id: 'oe5',
  name: 'Office Printer All-in-One',
  description: 'Multifunction printer with scanner and copier.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400',
  stock: 28,
  category: 'Office Equipment',
  rating: 4.6,
  reviews: 124
}, {
  id: 'oe6',
  name: 'Whiteboard with Stand',
  description: 'Mobile whiteboard with magnetic surface.',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400',
  stock: 45,
  category: 'Office Equipment',
  rating: 4.4,
  reviews: 92
}, {
  id: 'oe7',
  name: 'Office Shredder',
  description: 'Heavy-duty paper shredder for secure document disposal.',
  price: 3500,
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
  stock: 33,
  category: 'Office Equipment',
  rating: 4.7,
  reviews: 68
},
// Food and Beverage Supplies (7 products)
{
  id: 'fb1',
  name: 'Commercial Coffee Maker',
  description: 'Professional-grade coffee machine for high-volume brewing.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
  stock: 22,
  category: 'Food and Beverage Supplies',
  rating: 4.6,
  reviews: 94
}, {
  id: 'fb2',
  name: 'Industrial Blender',
  description: 'Heavy-duty blender for smoothies and food prep.',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
  stock: 38,
  category: 'Food and Beverage Supplies',
  rating: 4.7,
  reviews: 112
}, {
  id: 'fb3',
  name: 'Commercial Refrigerator',
  description: 'Large capacity refrigerator for food storage.',
  price: 35000,
  image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
  stock: 8,
  category: 'Food and Beverage Supplies',
  rating: 4.9,
  reviews: 87
}, {
  id: 'fb4',
  name: 'Food Warming Display',
  description: 'Glass display case with heating elements.',
  price: 12000,
  image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
  stock: 15,
  category: 'Food and Beverage Supplies',
  rating: 4.5,
  reviews: 76
}, {
  id: 'fb5',
  name: 'Stainless Steel Cookware Set',
  description: 'Professional 12-piece cookware collection.',
  price: 6800,
  image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
  stock: 42,
  category: 'Food and Beverage Supplies',
  rating: 4.8,
  reviews: 134
}, {
  id: 'fb6',
  name: 'Commercial Microwave',
  description: 'Heavy-duty microwave for restaurant use.',
  price: 5500,
  image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
  stock: 28,
  category: 'Food and Beverage Supplies',
  rating: 4.6,
  reviews: 98
}, {
  id: 'fb7',
  name: 'Food Storage Containers',
  description: 'Set of 20 airtight food storage containers.',
  price: 1800,
  image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400',
  stock: 85,
  category: 'Food and Beverage Supplies',
  rating: 4.4,
  reviews: 156
},
// Technology Hardware (7 products)
{
  id: 'th1',
  name: 'Business Laptop Pro',
  description: 'High-performance business laptop with Intel Core i7.',
  price: 45000,
  image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
  stock: 15,
  category: 'Technology Hardware',
  rating: 4.9,
  reviews: 203
}, {
  id: 'th2',
  name: '27" 4K Monitor',
  description: 'Ultra HD monitor with IPS panel.',
  price: 18000,
  image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
  stock: 25,
  category: 'Technology Hardware',
  rating: 4.8,
  reviews: 167
}, {
  id: 'th3',
  name: 'Wireless Mouse & Keyboard',
  description: 'Ergonomic wireless combo set.',
  price: 2500,
  image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
  stock: 65,
  category: 'Technology Hardware',
  rating: 4.5,
  reviews: 189
}, {
  id: 'th4',
  name: 'Network Router Pro',
  description: 'Enterprise-grade WiFi 6 router.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400',
  stock: 32,
  category: 'Technology Hardware',
  rating: 4.7,
  reviews: 143
}, {
  id: 'th5',
  name: 'External Hard Drive 4TB',
  description: 'Portable storage with USB 3.0.',
  price: 5200,
  image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
  stock: 48,
  category: 'Technology Hardware',
  rating: 4.6,
  reviews: 234
}, {
  id: 'th6',
  name: 'Webcam HD Pro',
  description: '1080p webcam with built-in microphone.',
  price: 3800,
  image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400',
  stock: 55,
  category: 'Technology Hardware',
  rating: 4.4,
  reviews: 178
}, {
  id: 'th7',
  name: 'UPS Battery Backup',
  description: '1500VA uninterruptible power supply.',
  price: 6500,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  stock: 28,
  category: 'Technology Hardware',
  rating: 4.8,
  reviews: 124
},
// Construction Materials (6 products)
{
  id: 'cm1',
  name: 'Heavy-Duty Power Drill',
  description: 'Industrial power drill with variable speed control.',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
  stock: 58,
  category: 'Construction Materials',
  rating: 4.8,
  reviews: 167
}, {
  id: 'cm2',
  name: 'Circular Saw Pro',
  description: 'Professional-grade circular saw for precision cuts.',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
  stock: 42,
  category: 'Construction Materials',
  rating: 4.7,
  reviews: 134
}, {
  id: 'cm3',
  name: 'Safety Equipment Kit',
  description: 'Complete PPE set including helmet, gloves, and goggles.',
  price: 1800,
  image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
  stock: 95,
  category: 'Construction Materials',
  rating: 4.6,
  reviews: 198
}, {
  id: 'cm4',
  name: 'Tool Storage Cabinet',
  description: 'Heavy-duty steel cabinet with multiple drawers.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
  stock: 22,
  category: 'Construction Materials',
  rating: 4.9,
  reviews: 87
}, {
  id: 'cm5',
  name: 'Measuring Laser Level',
  description: 'Digital laser level for accurate measurements.',
  price: 5200,
  image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  stock: 38,
  category: 'Construction Materials',
  rating: 4.5,
  reviews: 112
}, {
  id: 'cm6',
  name: 'Portable Generator',
  description: '5000W portable power generator.',
  price: 25000,
  image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400',
  stock: 12,
  category: 'Construction Materials',
  rating: 4.8,
  reviews: 76
},
// Logistics and Delivery (6 products)
{
  id: 'ld1',
  name: 'Hand Truck Dolly',
  description: 'Heavy-duty hand truck for moving cargo.',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 45,
  category: 'Logistics and Delivery',
  rating: 4.6,
  reviews: 143
}, {
  id: 'ld2',
  name: 'Pallet Jack',
  description: 'Manual pallet jack with 5000 lbs capacity.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 18,
  category: 'Logistics and Delivery',
  rating: 4.8,
  reviews: 98
}, {
  id: 'ld3',
  name: 'Shipping Label Printer',
  description: 'Thermal label printer for logistics.',
  price: 4200,
  image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400',
  stock: 32,
  category: 'Logistics and Delivery',
  rating: 4.5,
  reviews: 167
}, {
  id: 'ld4',
  name: 'Packaging Tape Dispenser',
  description: 'Heavy-duty tape gun for sealing boxes.',
  price: 850,
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
  stock: 120,
  category: 'Logistics and Delivery',
  rating: 4.4,
  reviews: 234
}, {
  id: 'ld5',
  name: 'Warehouse Scanner',
  description: 'Barcode scanner for inventory management.',
  price: 5500,
  image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400',
  stock: 28,
  category: 'Logistics and Delivery',
  rating: 4.7,
  reviews: 189
}, {
  id: 'ld6',
  name: 'Moving Blankets Pack',
  description: 'Set of 12 protective moving blankets.',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400',
  stock: 55,
  category: 'Logistics and Delivery',
  rating: 4.6,
  reviews: 156
},
// Maintenance and Repair (6 products)
{
  id: 'mr1',
  name: 'Tool Set Professional',
  description: '120-piece mechanics tool set with case.',
  price: 6500,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
  stock: 35,
  category: 'Maintenance and Repair',
  rating: 4.8,
  reviews: 178
}, {
  id: 'mr2',
  name: 'Pressure Washer',
  description: '3000 PSI electric pressure washer.',
  price: 12000,
  image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  stock: 22,
  category: 'Maintenance and Repair',
  rating: 4.7,
  reviews: 143
}, {
  id: 'mr3',
  name: 'Ladder Multi-Position',
  description: 'Aluminum ladder with 300 lbs capacity.',
  price: 5500,
  image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
  stock: 28,
  category: 'Maintenance and Repair',
  rating: 4.6,
  reviews: 124
}, {
  id: 'mr4',
  name: 'Wet/Dry Vacuum',
  description: 'Shop vacuum for cleaning and maintenance.',
  price: 4200,
  image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
  stock: 42,
  category: 'Maintenance and Repair',
  rating: 4.5,
  reviews: 198
}, {
  id: 'mr5',
  name: 'Paint Sprayer Pro',
  description: 'Electric paint sprayer for large projects.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
  stock: 18,
  category: 'Maintenance and Repair',
  rating: 4.8,
  reviews: 87
}, {
  id: 'mr6',
  name: 'Maintenance Cart',
  description: 'Rolling utility cart with storage compartments.',
  price: 3500,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 38,
  category: 'Maintenance and Repair',
  rating: 4.4,
  reviews: 156
},
// Hospitality Supplies (7 products)
{
  id: 'hs1',
  name: 'Hotel Bedding Set',
  description: 'Luxury 5-star hotel quality bedding collection.',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
  stock: 55,
  category: 'Hospitality Supplies',
  rating: 4.7,
  reviews: 189
}, {
  id: 'hs2',
  name: 'Towel Set Premium',
  description: 'Egyptian cotton towel set for hotels.',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
  stock: 75,
  category: 'Hospitality Supplies',
  rating: 4.6,
  reviews: 234
}, {
  id: 'hs3',
  name: 'Room Service Cart',
  description: 'Stainless steel service cart with wheels.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 22,
  category: 'Hospitality Supplies',
  rating: 4.8,
  reviews: 98
}, {
  id: 'hs4',
  name: 'Minibar Refrigerator',
  description: 'Compact mini fridge for hotel rooms.',
  price: 6500,
  image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
  stock: 32,
  category: 'Hospitality Supplies',
  rating: 4.5,
  reviews: 167
}, {
  id: 'hs5',
  name: 'Hotel Safe Box',
  description: 'Digital safe for guest valuables.',
  price: 5200,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  stock: 28,
  category: 'Hospitality Supplies',
  rating: 4.7,
  reviews: 143
}, {
  id: 'hs6',
  name: 'Housekeeping Cart',
  description: 'Professional cleaning cart with compartments.',
  price: 4200,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 35,
  category: 'Hospitality Supplies',
  rating: 4.6,
  reviews: 178
}, {
  id: 'hs7',
  name: 'Amenities Dispenser Set',
  description: 'Wall-mounted soap and shampoo dispensers.',
  price: 1800,
  image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400',
  stock: 85,
  category: 'Hospitality Supplies',
  rating: 4.4,
  reviews: 212
},
// Healthcare Supplies (7 products)
{
  id: 'hcs1',
  name: 'Medical Supply Kit',
  description: 'Comprehensive first-aid and medical supply package.',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
  stock: 42,
  category: 'Healthcare Supplies',
  rating: 4.7,
  reviews: 112
}, {
  id: 'hcs2',
  name: 'Digital Thermometer Set',
  description: 'Contactless infrared thermometers pack of 10.',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
  stock: 65,
  category: 'Healthcare Supplies',
  rating: 4.6,
  reviews: 198
}, {
  id: 'hcs3',
  name: 'Blood Pressure Monitor',
  description: 'Professional digital BP monitor.',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  stock: 48,
  category: 'Healthcare Supplies',
  rating: 4.8,
  reviews: 167
}, {
  id: 'hcs4',
  name: 'Medical Gloves Box',
  description: 'Nitrile examination gloves, 100 pieces.',
  price: 850,
  image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
  stock: 200,
  category: 'Healthcare Supplies',
  rating: 4.5,
  reviews: 289
}, {
  id: 'hcs5',
  name: 'Wheelchair Standard',
  description: 'Folding wheelchair with comfortable seating.',
  price: 12000,
  image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400',
  stock: 15,
  category: 'Healthcare Supplies',
  rating: 4.9,
  reviews: 87
}, {
  id: 'hcs6',
  name: 'Pulse Oximeter',
  description: 'Fingertip pulse oximeter for oxygen monitoring.',
  price: 1500,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  stock: 95,
  category: 'Healthcare Supplies',
  rating: 4.4,
  reviews: 234
}, {
  id: 'hcs7',
  name: 'Medical Cart Mobile',
  description: 'Rolling medical supply cart with drawers.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 22,
  category: 'Healthcare Supplies',
  rating: 4.7,
  reviews: 124
},
// Educational Supplies (7 products)
{
  id: 'es1',
  name: 'Smart Whiteboard System',
  description: 'Interactive digital whiteboard with touch capabilities.',
  price: 12500,
  image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400',
  stock: 18,
  category: 'Educational Supplies',
  rating: 4.9,
  reviews: 88
}, {
  id: 'es2',
  name: 'Student Desk Set',
  description: 'Adjustable desk and chair combo for students.',
  price: 4200,
  image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400',
  stock: 55,
  category: 'Educational Supplies',
  rating: 4.6,
  reviews: 178
}, {
  id: 'es3',
  name: 'Projector HD',
  description: 'High-definition projector for classrooms.',
  price: 18000,
  image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400',
  stock: 22,
  category: 'Educational Supplies',
  rating: 4.8,
  reviews: 143
}, {
  id: 'es4',
  name: 'Book Storage Cabinet',
  description: 'Large capacity bookshelf for libraries.',
  price: 6500,
  image: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400',
  stock: 32,
  category: 'Educational Supplies',
  rating: 4.5,
  reviews: 167
}, {
  id: 'es5',
  name: 'Science Lab Equipment',
  description: 'Complete chemistry lab starter kit.',
  price: 25000,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
  stock: 12,
  category: 'Educational Supplies',
  rating: 4.9,
  reviews: 76
}, {
  id: 'es6',
  name: 'Art Supplies Set',
  description: 'Comprehensive art materials for students.',
  price: 3500,
  image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
  stock: 68,
  category: 'Educational Supplies',
  rating: 4.4,
  reviews: 198
}, {
  id: 'es7',
  name: 'Tablet Cart Charging',
  description: 'Secure charging cart for 30 tablets.',
  price: 15000,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
  stock: 15,
  category: 'Educational Supplies',
  rating: 4.7,
  reviews: 124
},
// Entertainment Supplies (6 products)
{
  id: 'ent1',
  name: 'Sound System Pro',
  description: 'Professional PA system for events.',
  price: 35000,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  stock: 12,
  category: 'Entertainment Supplies',
  rating: 4.9,
  reviews: 87
}, {
  id: 'ent2',
  name: 'LED Stage Lights',
  description: 'RGB LED lighting system for performances.',
  price: 18000,
  image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400',
  stock: 22,
  category: 'Entertainment Supplies',
  rating: 4.8,
  reviews: 134
}, {
  id: 'ent3',
  name: 'Karaoke Machine',
  description: 'Professional karaoke system with dual mics.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
  stock: 35,
  category: 'Entertainment Supplies',
  rating: 4.6,
  reviews: 189
}, {
  id: 'ent4',
  name: 'Gaming Console Bundle',
  description: 'Latest gaming console with controllers.',
  price: 25000,
  image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
  stock: 18,
  category: 'Entertainment Supplies',
  rating: 4.9,
  reviews: 267
}, {
  id: 'ent5',
  name: 'DJ Controller Pro',
  description: 'Professional DJ mixing console.',
  price: 22000,
  image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400',
  stock: 15,
  category: 'Entertainment Supplies',
  rating: 4.7,
  reviews: 143
}, {
  id: 'ent6',
  name: 'Arcade Game Machine',
  description: 'Classic arcade cabinet with multiple games.',
  price: 45000,
  image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
  stock: 8,
  category: 'Entertainment Supplies',
  rating: 4.8,
  reviews: 98
},
// Automotive Supplies (6 products)
{
  id: 'auto1',
  name: 'Car Wash Equipment',
  description: 'Professional car washing system.',
  price: 15000,
  image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  stock: 18,
  category: 'Automotive Supplies',
  rating: 4.7,
  reviews: 124
}, {
  id: 'auto2',
  name: 'Tire Inflator Pro',
  description: 'Heavy-duty air compressor for tires.',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
  stock: 42,
  category: 'Automotive Supplies',
  rating: 4.6,
  reviews: 189
}, {
  id: 'auto3',
  name: 'Car Jack Hydraulic',
  description: '3-ton hydraulic floor jack.',
  price: 6500,
  image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
  stock: 28,
  category: 'Automotive Supplies',
  rating: 4.8,
  reviews: 156
}, {
  id: 'auto4',
  name: 'Battery Charger',
  description: 'Smart battery charger and maintainer.',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  stock: 55,
  category: 'Automotive Supplies',
  rating: 4.5,
  reviews: 198
}, {
  id: 'auto5',
  name: 'Tool Set Automotive',
  description: '200-piece mechanic tool set.',
  price: 12000,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
  stock: 22,
  category: 'Automotive Supplies',
  rating: 4.9,
  reviews: 167
}, {
  id: 'auto6',
  name: 'Diagnostic Scanner',
  description: 'OBD2 scanner for vehicle diagnostics.',
  price: 8500,
  image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400',
  stock: 32,
  category: 'Automotive Supplies',
  rating: 4.7,
  reviews: 143
}];
const VOUCHERS = {
  SAVE50: 50,
  DISCOUNT100: 100,
  WELCOME20: 20
};
// Mock feedback data
const INITIAL_FEEDBACK: Feedback[] = [{
  id: 'f1',
  productId: 'rs1',
  userName: 'Sarah Chen',
  rating: 5,
  comment: 'Excellent quality bags! Very durable and perfect for our retail store.',
  date: '2024-01-15',
  helpful: 12,
  isVerifiedBusiness: true
}, {
  id: 'f2',
  productId: 'rs1',
  userName: 'Mike Johnson',
  rating: 4,
  comment: 'Good product, fast delivery. Highly recommend!',
  date: '2024-01-10',
  helpful: 8,
  isVerifiedBusiness: false
}, {
  id: 'f3',
  productId: 'oe1',
  userName: 'Emily Rodriguez',
  rating: 5,
  comment: 'Best office chair I have ever purchased. Great lumbar support!',
  date: '2024-01-12',
  helpful: 15,
  isVerifiedBusiness: true
}];
export default function UnifiedProducts() {
  const [activeTab, setActiveTab] = useState<'products' | 'cart' | 'orders' | 'history' | 'favorites'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([]);
  const [showCheckoutDetails, setShowCheckoutDetails] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [currentAddress, setCurrentAddress] = useState<ShippingAddress>({
    recipientName: '',
    phoneNumber: '',
    region: '',
    city: '',
    district: '',
    street: '',
    unit: '',
    category: 'Home'
  });
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
    deliveryOption: 'standard'
  });
  // New state for real-time stock and feedback
  const [productStocks, setProductStocks] = useState<Record<string, number>>(() => {
    const stocks: Record<string, number> = {};
    MOCK_PRODUCTS.forEach(p => {
      stocks[p.id] = p.stock;
    });
    return stocks;
  });
  const [isStockUpdating, setIsStockUpdating] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, boolean>>({});
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    clearCart
  } = useCart();
  const {
    orders,
    addOrder
  } = useSupplierOrders();
  const navigate = useNavigate();
  const categories = ['Retail & Shopping Supplies', 'Office Equipment', 'Food and Beverage Supplies', 'Technology Hardware', 'Construction Materials', 'Logistics and Delivery', 'Maintenance and Repair', 'Hospitality Supplies', 'Healthcare Supplies', 'Educational Supplies', 'Entertainment Supplies', 'Automotive Supplies'];
  // Real-time stock calculation
  const getAvailableStock = (productId: string) => {
    const cartQuantity = items.filter(item => item.productId === productId).reduce((sum, item) => sum + item.quantity, 0) || 0;
    return productStocks[productId] - cartQuantity;
  };
  // Update stock in real-time when cart changes
  useEffect(() => {
    setIsStockUpdating(true);
    const timer = setTimeout(() => {
      setIsStockUpdating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const favoriteProducts = MOCK_PRODUCTS.filter(product => favorites.includes(product.id));
  const selectedItems = items.filter(item => selectedCartItems.includes(item.id));
  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const finalTotal = selectedTotal - discountAmount;
  useEffect(() => {
    if (selectedProduct) {
      setModalQuantity(1);
    }
  }, [selectedProduct]);
  useEffect(() => {
    setSelectedCartItems(items.map(item => item.id));
  }, [items]);
  const applyVoucher = () => {
    const discount = VOUCHERS[voucherCode.toUpperCase() as keyof typeof VOUCHERS];
    if (discount) {
      setAppliedVoucher({
        code: voucherCode.toUpperCase(),
        discount
      });
      toast.success(`Congrats! You're Saving ₱${discount}`);
    } else {
      toast.error('Invalid voucher code');
    }
  };
  const handleBuyNow = (product: Product, qty: number) => {
    const availableStock = getAvailableStock(product.id);
    if (qty > availableStock) {
      toast.error(`Only ${availableStock} items available in stock`);
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      supplierId: 'supplier-1'
    });
    setTimeout(() => {
      const addedItem = items.find(i => i.productId === product.id) || {
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.image,
        supplierId: 'supplier-1'
      };
      setSelectedCartItems([addedItem.id]);
      setActiveTab('cart');
      setShowCheckoutDetails(true);
    }, 100);
    toast.success(`${product.name} added to cart!`);
    setSelectedProduct(null);
    setModalQuantity(1);
  };
  const handleAddToCart = (product: Product, qty: number) => {
    const availableStock = getAvailableStock(product.id);
    if (qty > availableStock) {
      toast.error(`Only ${availableStock} items available in stock`);
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      supplierId: 'supplier-1'
    });
    toast.success(`${product.name} added to cart!`);
    setSelectedProduct(null);
    setModalQuantity(1);
  };
  const toggleCartItemSelection = (itemId: string) => {
    setSelectedCartItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };
  const toggleSelectAll = () => {
    if (selectedCartItems.length === items.length) {
      setSelectedCartItems([]);
    } else {
      setSelectedCartItems(items.map(item => item.id));
    }
  };
  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
  };
  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setSelectedCartItems(prev => prev.filter(id => id !== itemToDelete));
      setItemToDelete(null);
      toast.success('Item removed from cart');
    }
  };
  const cancelDelete = () => {
    setItemToDelete(null);
  };
  const handleSaveAddress = () => {
    if (!currentAddress.recipientName || !currentAddress.phoneNumber || !currentAddress.city || !currentAddress.street) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSavedAddresses([...savedAddresses, currentAddress]);
    setSelectedAddressIndex(savedAddresses.length);
    setCheckoutData({
      ...checkoutData,
      fullName: currentAddress.recipientName,
      phone: currentAddress.phoneNumber,
      address: `${currentAddress.street}, ${currentAddress.unit ? currentAddress.unit + ', ' : ''}${currentAddress.district}`,
      city: currentAddress.city
    });
    setShowAddressModal(false);
    setCurrentAddress({
      recipientName: '',
      phoneNumber: '',
      region: '',
      city: '',
      district: '',
      street: '',
      unit: '',
      category: 'Home'
    });
    toast.success('Address saved successfully!');
  };
  const handleSelectAddress = (index: number) => {
    const address = savedAddresses[index];
    setSelectedAddressIndex(index);
    setCheckoutData({
      ...checkoutData,
      fullName: address.recipientName,
      phone: address.phoneNumber,
      address: `${address.street}, ${address.unit ? address.unit + ', ' : ''}${address.district}`,
      city: address.city
    });
    toast.success('Address selected!');
  };
  const handlePlaceOrder = () => {
    if (selectedCartItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }
    if (!checkoutData.fullName || !checkoutData.phone || !checkoutData.address || !checkoutData.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    setShowCheckoutDetails(false);
    setShowOrderSummary(true);
  };
  const handleConfirmOrder = () => {
    const orderItems = selectedItems.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      deliveryOption: checkoutData.deliveryOption
    }));
    addOrder(orderItems);
    selectedCartItems.forEach(itemId => {
      removeFromCart(itemId);
    });
    setSelectedCartItems([]);
    setShowOrderSummary(false);
    setCheckoutData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'cash',
      deliveryOption: 'standard'
    });
    setAppliedVoucher(null);
    setVoucherCode('');
    setSelectedAddressIndex(null);
    toast.success('✅ Your order has been placed successfully!');
  };
  const handleViewInOrders = () => {
    handleConfirmOrder();
    setActiveTab('orders');
  };
  const handleBuyAgain = () => {
    handleConfirmOrder();
    setActiveTab('products');
  };
  // Feedback functions
  const getProductFeedback = (productId: string) => {
    return feedbackList.filter(f => f.productId === productId);
  };
  const getAverageRating = (productId: string) => {
    const feedback = getProductFeedback(productId);
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return sum / feedback.length;
  };
  const handleSubmitFeedback = () => {
    if (!selectedProduct) return;
    if (!newFeedback.comment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    const feedback: Feedback = {
      id: `f${Date.now()}`,
      productId: selectedProduct.id,
      userName: newFeedback.userName || 'Anonymous',
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      isVerifiedBusiness: false
    };
    setFeedbackList([feedback, ...feedbackList]);
    setNewFeedback({
      userName: '',
      rating: 5,
      comment: ''
    });
    setShowFeedbackForm(false);
    toast.success('Thank you for your feedback!');
  };
  const handleHelpfulClick = (feedbackId: string) => {
    if (helpfulClicks[feedbackId]) {
      toast.info('You already marked this as helpful');
      return;
    }
    setFeedbackList(feedbackList.map(f => f.id === feedbackId ? {
      ...f,
      helpful: f.helpful + 1
    } : f));
    setHelpfulClicks({
      ...helpfulClicks,
      [feedbackId]: true
    });
    toast.success('Thank you for your feedback!');
  };
  const getDeliveryDate = (deliveryOption: string) => {
    const now = new Date();
    const days = deliveryOption === 'express' ? 3 : 7;
    const deliveryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getDeliveryDays = (deliveryOption: string) => {
    return deliveryOption === 'express' ? 3 : 7;
  };
  const getWeatherIcon = (deliveryOption: string) => {
    const random = Math.random();
    if (deliveryOption === 'express') {
      return random > 0.5 ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <CloudIcon className="w-5 h-5 text-gray-400" />;
    } else {
      if (random > 0.7) return <SunIcon className="w-5 h-5 text-yellow-500" />;
      if (random > 0.4) return <CloudIcon className="w-5 h-5 text-gray-400" />;
      return <CloudRainIcon className="w-5 h-5 text-blue-400" />;
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon className="w-5 h-5 text-m2m-success" />;
      case 'Pending':
        return <ClockIcon className="w-5 h-5 text-m2m-chart-yellow" />;
      case 'Cancelled':
        return <XCircleIcon className="w-5 h-5 text-m2m-accent-orange" />;
      default:
        return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-m2m-success/20 text-m2m-success';
      case 'Pending':
        return 'bg-m2m-chart-yellow/20 text-m2m-chart-yellow';
      case 'Cancelled':
        return 'bg-m2m-accent-orange/20 text-m2m-accent-orange';
      default:
        return 'bg-m2m-divider/20 text-m2m-text-secondary';
    }
  };
  const ProductCard = ({
    product,
    index
  }: {
    product: Product;
    index: number;
  }) => {
    const isFavorite = favorites.includes(product.id);
    const availableStock = getAvailableStock(product.id);
    return <motion.div key={product.id} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      delay: index * 0.05
    }} whileHover={{
      y: -12,
      transition: {
        duration: 0.2
      }
    }} className="bg-m2m-bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-m2m-divider group relative">
        <motion.button whileHover={{
        scale: 1.2
      }} whileTap={{
        scale: 0.9
      }} onClick={e => {
        e.stopPropagation();
        setFavorites(prev => prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]);
        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites!');
      }} className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
          <HeartIcon className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </motion.button>
        <div onClick={() => setSelectedProduct(product)}>
          <div className="aspect-video overflow-hidden relative">
            <motion.img whileHover={{
            scale: 1.15
          }} transition={{
            duration: 0.4
          }} src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-sm text-m2m-text-secondary">
                ({product.reviews})
              </span>
            </div>
            <motion.span whileHover={{
            scale: 1.05
          }} className="text-xs font-bold text-m2m-accent-blue bg-m2m-accent-blue/10 px-3 py-1.5 rounded-full inline-block">
              {product.category}
            </motion.span>
            <h3 className="text-lg font-bold text-m2m-text-primary mt-3 group-hover:text-m2m-accent-blue transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-m2m-text-secondary mt-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-sm text-m2m-text-secondary mb-1">Price</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal bg-clip-text text-transparent">
                  ₱{product.price.toLocaleString()}
                </p>
                <motion.div key={availableStock} initial={{
                scale: 1.2
              }} animate={{
                scale: 1
              }} className="text-xs text-m2m-text-secondary mt-1 flex items-center">
                  <PackageIcon className="w-3 h-3 mr-1" />
                  {isStockUpdating ? <Loader2Icon className="w-3 h-3 animate-spin" /> : <span>{availableStock} in stock</span>}
                </motion.div>
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} onClick={e => {
                e.stopPropagation();
                handleBuyNow(product, 1);
              }} className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                  Buy Now
                </motion.button>
                <motion.button whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} onClick={e => {
                e.stopPropagation();
                handleAddToCart(product, 1);
              }} className="px-4 py-2.5 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                  Add
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>;
  };
  return <div className="space-y-6">
      {/* Header with Tabs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-m2m-text-primary">Products</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <motion.button whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('products')} className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center relative overflow-hidden ${activeTab === 'products' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'bg-m2m-bg-card text-m2m-text-secondary hover:bg-m2m-bg-primary/50 border border-m2m-divider'}`}>
            {activeTab === 'products' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            <SearchIcon className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Products</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('cart')} className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center relative overflow-hidden ${activeTab === 'cart' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal shadow-md' : 'bg-m2m-bg-card hover:bg-m2m-bg-primary/50 border border-m2m-divider'}`}>
            {activeTab === 'cart' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            <ShoppingCartIcon className={`w-5 h-5 mr-2 relative z-10 ${activeTab === 'cart' ? 'text-white' : 'text-m2m-text-secondary'}`} />
            <span className={`relative z-10 ${activeTab === 'cart' ? 'text-white' : 'text-m2m-text-secondary'}`}>
              Shopping Cart
            </span>
            {items.length > 0 && <motion.span key={items.length} initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} className={`ml-2 px-2 py-0.5 rounded-full text-xs relative z-10 ${activeTab === 'cart' ? 'bg-white/20 text-white' : 'bg-m2m-accent-orange text-white'}`}>
                {items.length}
              </motion.span>}
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('favorites')} className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center relative overflow-hidden ${activeTab === 'favorites' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'bg-m2m-bg-card text-m2m-text-secondary hover:bg-m2m-bg-primary/50 border border-m2m-divider'}`}>
            {activeTab === 'favorites' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            <HeartIcon className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Favorites</span>
            {favorites.length > 0 && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs relative z-10">
                {favorites.length}
              </span>}
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('orders')} className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center relative overflow-hidden ${activeTab === 'orders' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'bg-m2m-bg-card text-m2m-text-secondary hover:bg-m2m-bg-primary/50 border border-m2m-divider'}`}>
            {activeTab === 'orders' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            <ClockIcon className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Orders</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('history')} className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center relative overflow-hidden ${activeTab === 'history' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-md' : 'bg-m2m-bg-card text-m2m-text-secondary hover:bg-m2m-bg-primary/50 border border-m2m-divider'}`}>
            {activeTab === 'history' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            <HistoryIcon className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Order History</span>
          </motion.button>
        </div>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }}>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-2xl focus:ring-2 focus:ring-m2m-accent-blue transition-all" />
              </div>
              <div className="relative sm:w-64">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full pl-4 pr-10 py-3 border border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-2xl focus:ring-2 focus:ring-m2m-accent-blue transition-all text-left flex items-center justify-between">
                  <span className="truncate">
                    {selectedCategory || 'All Categories'}
                  </span>
                  <motion.div animate={{
                rotate: isDropdownOpen ? 180 : 0
              }} transition={{
                duration: 0.3
              }} className="flex-shrink-0">
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.2
              }} className="absolute z-20 w-full mt-2 bg-m2m-bg-card border border-m2m-divider rounded-2xl shadow-xl max-h-80 overflow-y-auto">
                      <motion.button onClick={() => {
                  setSelectedCategory('');
                  setIsDropdownOpen(false);
                }} whileHover={{
                  backgroundColor: 'rgba(30, 144, 255, 0.1)',
                  x: 4
                }} className={`w-full px-4 py-3 text-left text-m2m-text-secondary hover:text-m2m-text-primary transition-all relative group ${selectedCategory === '' ? 'bg-m2m-accent-blue/10 text-m2m-accent-blue font-semibold' : ''}`}>
                        <span className="relative z-10">All Categories</span>
                      </motion.button>
                      {categories.map(category => <motion.button key={category} onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }} whileHover={{
                  backgroundColor: 'rgba(30, 144, 255, 0.1)',
                  x: 4
                }} className={`w-full px-4 py-3 text-left text-m2m-text-secondary hover:text-m2m-text-primary transition-all relative group ${category === selectedCategory ? 'bg-m2m-accent-blue/10 text-m2m-accent-blue font-semibold' : ''}`}>
                          <span className="relative z-10">{category}</span>
                        </motion.button>)}
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </motion.div>}

      {/* Shopping Cart Tab */}
      {activeTab === 'cart' && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
          {items.length === 0 ? <div className="bg-m2m-bg-card rounded-xl shadow-lg p-12 text-center border border-m2m-divider">
              <ShoppingCartIcon className="w-24 h-24 text-m2m-text-secondary/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                Your cart is empty
              </h2>
              <p className="text-m2m-text-secondary mb-6">
                Start adding products to your cart
              </p>
              <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('products')} className="px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold">
                Browse Products
              </motion.button>
            </div> : <div className="space-y-6">
              <div className="bg-m2m-bg-card rounded-xl shadow-lg p-4 border border-m2m-divider flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" checked={selectedCartItems.length === items.length} onChange={toggleSelectAll} className="w-5 h-5 rounded border-m2m-divider text-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue cursor-pointer" />
                  <span className="ml-3 text-m2m-text-primary font-medium">
                    Select All ({items.length} items)
                  </span>
                </label>
                {selectedCartItems.length > 0 && <span className="text-sm text-m2m-accent-blue font-semibold">
                    {selectedCartItems.length} selected
                  </span>}
              </div>
              <div className="space-y-4">
                {items.map(item => <motion.div key={item.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-m2m-bg-card rounded-xl shadow-lg overflow-hidden border border-m2m-divider">
                    <div className="p-6 flex items-center gap-4">
                      <input type="checkbox" checked={selectedCartItems.includes(item.id)} onChange={() => toggleCartItemSelection(item.id)} className="w-5 h-5 rounded border-m2m-divider text-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue cursor-pointer flex-shrink-0" />
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-m2m-text-primary truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-m2m-text-secondary mt-1">
                          ₱{item.price.toLocaleString()} each
                        </p>
                        <div className="flex items-center space-x-3 mt-3">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-m2m-bg-primary rounded-lg hover:bg-m2m-divider transition-colors">
                            <MinusIcon className="w-4 h-4 text-m2m-text-primary" />
                          </button>
                          <span className="w-12 text-center font-semibold text-m2m-text-primary">
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-m2m-bg-primary rounded-lg hover:bg-m2m-divider transition-colors">
                            <PlusIcon className="w-4 h-4 text-m2m-text-primary" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-m2m-text-primary">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => handleDeleteClick(item.id)} className="mt-2 p-2 text-m2m-accent-orange hover:bg-m2m-accent-orange/10 rounded-lg transition-colors">
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
              <motion.div key={selectedCartItems.length} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider sticky bottom-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-m2m-text-secondary">
                    Selected Items Total:
                  </span>
                  <motion.span key={selectedTotal} initial={{
              scale: 1.2
            }} animate={{
              scale: 1
            }} className="text-3xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal bg-clip-text text-transparent">
                    ₱{selectedTotal.toLocaleString()}
                  </motion.span>
                </div>
                <motion.button whileHover={{
            scale: selectedCartItems.length > 0 ? 1.02 : 1
          }} whileTap={{
            scale: selectedCartItems.length > 0 ? 0.98 : 1
          }} onClick={() => selectedCartItems.length > 0 ? setShowCheckoutDetails(true) : toast.error('Please select items to checkout')} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${selectedCartItems.length > 0 ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <ShoppingCartIcon className="w-5 h-5" />
                  Check Out ({selectedCartItems.length})
                </motion.button>
              </motion.div>
            </div>}
        </motion.div>}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
          {favoriteProducts.length === 0 ? <div className="bg-m2m-bg-card rounded-xl shadow-lg p-12 text-center border border-m2m-divider">
              <HeartIcon className="w-24 h-24 text-m2m-text-secondary/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                No favorites yet
              </h2>
              <p className="text-m2m-text-secondary mb-6">
                Start adding products to your favorites list
              </p>
              <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab('products')} className="px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-lg font-semibold">
                Browse Products
              </motion.button>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>}
        </motion.div>}

      {/* Orders Tab with Real-time Weather */}
      {activeTab === 'orders' && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
          {orders.filter(o => o.status === 'Pending').length === 0 ? <div className="bg-m2m-bg-card rounded-xl shadow-lg p-12 text-center border border-m2m-divider">
              <ClockIcon className="w-24 h-24 text-m2m-text-secondary/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                No active orders
              </h2>
              <p className="text-m2m-text-secondary">
                Your pending orders will appear here
              </p>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'Pending').map(order => <motion.div key={order.id} whileHover={{
          scale: 1.02,
          boxShadow: '0 10px 30px rgba(30, 144, 255, 0.2)'
        }} onClick={() => setSelectedOrderDetails(order)} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider cursor-pointer hover:border-m2m-accent-blue transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-m2m-text-secondary">
                          Order ID
                        </p>
                        <p className="text-sm font-bold text-m2m-text-primary">
                          {order.id}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <ClockIcon className="w-4 h-4 text-m2m-text-secondary" />
                          <p className="text-xs text-m2m-text-secondary">
                            {getDeliveryDays(order.deliveryOption || 'standard')}{' '}
                            days delivery
                          </p>
                          <div className="flex items-center gap-1">
                            {getWeatherIcon(order.deliveryOption || 'standard')}
                          </div>
                        </div>
                        <p className="text-xs text-m2m-text-secondary mt-1">
                          Est:{' '}
                          {getDeliveryDate(order.deliveryOption || 'standard')}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-m2m-chart-yellow/20 text-m2m-chart-yellow">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
                      <div>
                        <p className="font-semibold text-m2m-text-primary">
                          {order.name}
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Qty: {order.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-m2m-divider">
                      <p className="text-sm text-m2m-text-secondary">
                        {order.date}
                      </p>
                      <p className="text-lg font-bold text-m2m-text-primary">
                        ₱{(order.price * order.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>)}
            </div>}
        </motion.div>}

      {/* Order History Tab */}
      {activeTab === 'history' && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
          {orders.length === 0 ? <div className="bg-m2m-bg-card rounded-xl shadow-lg p-12 text-center border border-m2m-divider">
              <HistoryIcon className="w-24 h-24 text-m2m-text-secondary/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                No orders yet
              </h2>
              <p className="text-m2m-text-secondary">
                Your order history will appear here
              </p>
            </div> : <div className="space-y-4">
              {orders.map(order => <div key={order.id} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-m2m-text-secondary">
                        Order ID
                      </p>
                      <p className="text-sm font-bold text-m2m-text-primary">
                        {order.id}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
                    <div>
                      <p className="font-semibold text-m2m-text-primary">
                        {order.name}
                      </p>
                      <p className="text-sm text-m2m-text-secondary">
                        Qty: {order.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-m2m-divider">
                    <p className="text-sm text-m2m-text-secondary">
                      {order.date}
                    </p>
                    <p className="text-lg font-bold text-m2m-text-primary">
                      ₱{(order.price * order.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>)}
            </div>}
        </motion.div>}

      {/* Enhanced Product Detail Modal with Feedback Section */}
      {selectedProduct && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" style={{
      backdropFilter: 'blur(8px)'
    }} onClick={() => setSelectedProduct(null)}>
          <motion.div initial={{
        scale: 0.8,
        opacity: 0,
        y: 50
      }} animate={{
        scale: 1,
        opacity: 1,
        y: 0
      }} onClick={e => e.stopPropagation()} className="bg-m2m-bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-m2m-divider p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-m2m-text-primary mb-2">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                  </div>
                  <span className="text-m2m-text-secondary">
                    ({selectedProduct.reviews} reviews)
                  </span>
                </div>
              </div>
              <motion.button whileHover={{
            scale: 1.1,
            rotate: 90
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setSelectedProduct(null)} className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                <XIcon className="w-6 h-6 text-m2m-text-secondary" />
              </motion.button>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-2xl mb-6 shadow-lg" />
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-m2m-text-primary mb-2">
                  Description
                </h3>
                <p className="text-m2m-text-secondary leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-m2m-divider">
                <div className="text-center">
                  <p className="text-sm text-m2m-text-secondary mb-2">Price</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal bg-clip-text text-transparent">
                    ₱{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-m2m-text-secondary mb-2">
                    Available Stock
                  </p>
                  <motion.p key={getAvailableStock(selectedProduct.id)} initial={{
                scale: 1.2
              }} animate={{
                scale: 1
              }} className="text-4xl font-bold text-m2m-success flex items-center justify-center gap-2">
                    {isStockUpdating ? <Loader2Icon className="w-8 h-8 animate-spin" /> : <>
                        <PackageIcon className="w-8 h-8" />
                        {getAvailableStock(selectedProduct.id)}
                      </>}
                  </motion.p>
                </div>
              </div>
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))} className="w-10 h-10 bg-m2m-bg-primary rounded-lg font-bold hover:bg-m2m-divider transition-colors flex items-center justify-center">
                    <MinusIcon className="w-5 h-5 text-m2m-text-primary" />
                  </button>
                  <input type="number" value={modalQuantity} onChange={e => setModalQuantity(Math.max(1, Math.min(getAvailableStock(selectedProduct.id), parseInt(e.target.value) || 1)))} className="w-20 text-center border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg py-2 font-semibold" min="1" max={getAvailableStock(selectedProduct.id)} />
                  <button onClick={() => setModalQuantity(Math.min(getAvailableStock(selectedProduct.id), modalQuantity + 1))} className="w-10 h-10 bg-m2m-bg-primary rounded-lg font-bold hover:bg-m2m-divider transition-colors flex items-center justify-center">
                    <PlusIcon className="w-5 h-5 text-m2m-text-primary" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => handleBuyNow(selectedProduct, modalQuantity)} className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                  <ShoppingBagIcon className="w-6 h-6" />
                  Buy Now ({modalQuantity})
                </motion.button>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => handleAddToCart(selectedProduct, modalQuantity)} className="flex-1 py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                  <ShoppingCartIcon className="w-6 h-6" />
                  Add to Cart ({modalQuantity})
                </motion.button>
              </div>
              {/* Business User Feedback Section */}
              <div className="border-t border-m2m-divider pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-m2m-text-primary flex items-center gap-2">
                    <MessageSquareIcon className="w-6 h-6 text-m2m-accent-blue" />
                    Business User Feedback
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(getAverageRating(selectedProduct.id)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                    <span className="text-sm text-m2m-text-secondary">
                      {getAverageRating(selectedProduct.id).toFixed(1)} (
                      {getProductFeedback(selectedProduct.id).length} reviews)
                    </span>
                  </div>
                </div>
                {/* Feedback List */}
                <div className="space-y-4 mb-4">
                  {getProductFeedback(selectedProduct.id).slice(0, showAllFeedback ? undefined : 2).map(feedback => <motion.div key={feedback.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} className={`p-4 rounded-xl border ${feedback.isVerifiedBusiness ? 'bg-gradient-to-r from-m2m-accent-blue/5 to-m2m-accent-teal/5 border-m2m-accent-blue/20' : 'bg-m2m-bg-primary border-m2m-divider'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-m2m-text-primary">
                              {feedback.userName}
                            </span>
                            {feedback.isVerifiedBusiness && <div className="flex items-center gap-1 px-2 py-0.5 bg-m2m-accent-blue/20 rounded-full">
                                <BadgeCheckIcon className="w-3 h-3 text-m2m-accent-blue" />
                                <span className="text-xs text-m2m-accent-blue font-medium">
                                  Verified Business
                                </span>
                              </div>}
                          </div>
                          <span className="text-xs text-m2m-text-secondary">
                            {feedback.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <p className="text-sm text-m2m-text-secondary mb-3">
                          {feedback.comment}
                        </p>
                        <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={() => handleHelpfulClick(feedback.id)} className={`flex items-center gap-2 text-sm ${helpfulClicks[feedback.id] ? 'text-m2m-accent-blue' : 'text-m2m-text-secondary hover:text-m2m-accent-blue'} transition-colors`}>
                          <ThumbsUpIcon className={`w-4 h-4 ${helpfulClicks[feedback.id] ? 'fill-m2m-accent-blue' : ''}`} />
                          <span>Helpful ({feedback.helpful})</span>
                        </motion.button>
                      </motion.div>)}
                </div>
                {/* View All Feedback Button */}
                {getProductFeedback(selectedProduct.id).length > 2 && <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setShowAllFeedback(!showAllFeedback)} className="w-full py-3 border-2 border-m2m-divider rounded-xl font-semibold text-m2m-accent-blue hover:bg-m2m-accent-blue/10 transition-all flex items-center justify-center gap-2">
                    {showAllFeedback ? <>
                        <ChevronUpIcon className="w-5 h-5" />
                        Show Less
                      </> : <>
                        <ChevronDownIcon className="w-5 h-5" />
                        View All Feedback (
                        {getProductFeedback(selectedProduct.id).length})
                      </>}
                  </motion.button>}
                {/* Add Feedback Button */}
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setShowFeedbackForm(!showFeedbackForm)} className="w-full mt-4 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <MessageSquareIcon className="w-5 h-5" />
                  Write a Review
                </motion.button>
                {/* Feedback Form */}
                <AnimatePresence>
                  {showFeedbackForm && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} exit={{
                opacity: 0,
                height: 0
              }} className="mt-4 p-6 bg-m2m-bg-primary rounded-xl border border-m2m-divider">
                      <h4 className="text-lg font-semibold text-m2m-text-primary mb-4">
                        Share Your Experience
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                            Name (optional)
                          </label>
                          <input type="text" value={newFeedback.userName} onChange={e => setNewFeedback({
                      ...newFeedback,
                      userName: e.target.value
                    })} placeholder="Your name" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                            Rating
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => <motion.button key={star} whileHover={{
                        scale: 1.2
                      }} whileTap={{
                        scale: 0.9
                      }} onClick={() => setNewFeedback({
                        ...newFeedback,
                        rating: star
                      })} className="p-1">
                                <StarIcon className={`w-8 h-8 ${star <= newFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              </motion.button>)}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                            Comment
                          </label>
                          <textarea value={newFeedback.comment} onChange={e => setNewFeedback({
                      ...newFeedback,
                      comment: e.target.value
                    })} placeholder="Share your thoughts about this product..." rows={4} className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue resize-none" />
                        </div>
                        <div className="flex gap-3">
                          <motion.button whileHover={{
                      scale: 1.02
                    }} whileTap={{
                      scale: 0.98
                    }} onClick={() => {
                      setShowFeedbackForm(false);
                      setNewFeedback({
                        userName: '',
                        rating: 5,
                        comment: ''
                      });
                    }} className="flex-1 py-3 border-2 border-m2m-divider rounded-xl font-semibold text-m2m-text-primary hover:bg-m2m-bg-primary transition-all">
                            Cancel
                          </motion.button>
                          <motion.button whileHover={{
                      scale: 1.02
                    }} whileTap={{
                      scale: 0.98
                    }} onClick={handleSubmitFeedback} className="flex-1 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                            Submit Review
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>}

      {/* Enhanced Checkout Modal with Real-time Updates */}
      {showCheckoutDetails && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="bg-m2m-bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] border-2 border-m2m-divider flex flex-col">
            <div className="p-8 border-b border-m2m-divider flex-shrink-0">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-m2m-text-primary">
                  Checkout Details
                </h2>
                <motion.button whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={() => setShowCheckoutDetails(false)} className="p-2 hover:bg-m2m-bg-primary rounded-xl transition-colors">
                  <XIcon className="w-6 h-6 text-m2m-text-secondary" />
                </motion.button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-8">
              <div className="space-y-6">
                {/* Order Preview with Real-time Count */}
                <motion.div key={selectedCartItems.length} initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-gradient-to-r from-m2m-accent-blue/10 to-m2m-accent-teal/10 p-6 rounded-xl border border-m2m-accent-blue/20">
                  <div className="flex items-center gap-4">
                    <motion.div animate={{
                  rotate: [0, 10, -10, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}>
                      <ShoppingBagIcon className="w-12 h-12 text-m2m-accent-blue" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-m2m-text-primary">
                        You're about to place an order!
                      </h3>
                      <motion.p key={selectedCartItems.length} initial={{
                    scale: 1.2
                  }} animate={{
                    scale: 1
                  }} className="text-m2m-text-secondary">
                        <span className="font-bold text-m2m-accent-blue">
                          {selectedCartItems.length}
                        </span>{' '}
                        {selectedCartItems.length === 1 ? 'item' : 'items'}{' '}
                        ready for delivery
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Delivery Information with Add Address Button */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-m2m-text-primary flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                      Delivery Information
                    </h3>
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={() => setShowAddressModal(true)} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal font-medium flex items-center gap-1 px-3 py-2 border border-m2m-accent-blue rounded-lg hover:bg-m2m-accent-blue/10 transition-all">
                      <PlusIcon className="w-4 h-4" />
                      Add shipping address
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name *" value={checkoutData.fullName} onChange={e => setCheckoutData({
                  ...checkoutData,
                  fullName: e.target.value
                })} className="px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                    <input type="tel" placeholder="Phone Number *" value={checkoutData.phone} onChange={e => setCheckoutData({
                  ...checkoutData,
                  phone: e.target.value
                })} className="px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                  </div>
                  <input type="text" placeholder="Complete Address *" value={checkoutData.address} onChange={e => setCheckoutData({
                ...checkoutData,
                address: e.target.value
              })} className="mt-4 w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input type="text" placeholder="City *" value={checkoutData.city} onChange={e => setCheckoutData({
                  ...checkoutData,
                  city: e.target.value
                })} className="px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                    <input type="text" placeholder="Postal Code" value={checkoutData.postalCode} onChange={e => setCheckoutData({
                  ...checkoutData,
                  postalCode: e.target.value
                })} className="px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                  </div>
                </div>

                {/* Voucher Section with Real-time Application */}
                <div>
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4 flex items-center">
                    <TagIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Apply Voucher
                  </h3>
                  <div className="flex gap-2">
                    <input type="text" value={voucherCode} onChange={e => setVoucherCode(e.target.value)} placeholder="Enter voucher code (e.g., SAVE50)" className="flex-1 px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={applyVoucher} className="px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-lg">
                      Apply
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {appliedVoucher && <motion.div initial={{
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
                }} className="mt-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                        <motion.div animate={{
                    rotate: [0, 10, -10, 0]
                  }} transition={{
                    duration: 0.5
                  }}>
                          <GiftIcon className="w-6 h-6 text-green-600" />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-green-700 font-bold">
                            Congrats! You're Saving ₱{appliedVoucher.discount}
                          </p>
                          <p className="text-green-600 text-sm">
                            Voucher "{appliedVoucher.code}" applied
                          </p>
                        </div>
                        <button onClick={() => {
                    setAppliedVoucher(null);
                    setVoucherCode('');
                    toast.info('Voucher removed');
                  }} className="p-1 hover:bg-green-100 rounded-lg transition-colors">
                          <XIcon className="w-4 h-4 text-green-600" />
                        </button>
                      </motion.div>}
                  </AnimatePresence>
                  <p className="text-xs text-m2m-text-secondary mt-2">
                    Try: SAVE50, DISCOUNT100, WELCOME20
                  </p>
                </div>

                {/* Delivery Option */}
                <div>
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4 flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Delivery Option
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                      <input type="radio" name="delivery" value="standard" checked={checkoutData.deliveryOption === 'standard'} onChange={e => setCheckoutData({
                    ...checkoutData,
                    deliveryOption: e.target.value
                  })} className="w-5 h-5 text-m2m-accent-blue" />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-m2m-text-primary">
                          Standard Delivery
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          5-7 business days • ₱50
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                      <input type="radio" name="delivery" value="express" checked={checkoutData.deliveryOption === 'express'} onChange={e => setCheckoutData({
                    ...checkoutData,
                    deliveryOption: e.target.value
                  })} className="w-5 h-5 text-m2m-accent-blue" />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-m2m-text-primary">
                          Express Delivery
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          2-3 business days • ₱150
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4 flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                      <input type="radio" name="payment" value="cash" checked={checkoutData.paymentMethod === 'cash'} onChange={e => setCheckoutData({
                    ...checkoutData,
                    paymentMethod: e.target.value
                  })} className="w-5 h-5 text-m2m-accent-blue" />
                      <div className="ml-3">
                        <p className="font-semibold text-m2m-text-primary">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Pay when you receive
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                      <input type="radio" name="payment" value="card" checked={checkoutData.paymentMethod === 'card'} onChange={e => setCheckoutData({
                    ...checkoutData,
                    paymentMethod: e.target.value
                  })} className="w-5 h-5 text-m2m-accent-blue" />
                      <div className="ml-3">
                        <p className="font-semibold text-m2m-text-primary">
                          Credit/Debit Card
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Secure payment
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                      <input type="radio" name="payment" value="gcash" checked={checkoutData.paymentMethod === 'gcash'} onChange={e => setCheckoutData({
                    ...checkoutData,
                    paymentMethod: e.target.value
                  })} className="w-5 h-5 text-m2m-accent-blue" />
                      <div className="ml-3">
                        <p className="font-semibold text-m2m-text-primary">
                          GCash / PayMaya
                        </p>
                        <p className="text-sm text-m2m-text-secondary">
                          Online payment via e-wallet
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Summary with Real-time Voucher Updates */}
                <motion.div key={`${selectedTotal}-${discountAmount}`} initial={{
              opacity: 0.8
            }} animate={{
              opacity: 1
            }} className="bg-m2m-bg-primary p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-m2m-text-secondary">
                      <span>Subtotal ({selectedCartItems.length} items)</span>
                      <span>₱{selectedTotal.toLocaleString()}</span>
                    </div>
                    <AnimatePresence>
                      {appliedVoucher && <motion.div initial={{
                    opacity: 0,
                    x: -10,
                    height: 0
                  }} animate={{
                    opacity: 1,
                    x: 0,
                    height: 'auto'
                  }} exit={{
                    opacity: 0,
                    x: -10,
                    height: 0
                  }} className="flex justify-between text-green-600 font-semibold">
                          <span>Voucher Discount</span>
                          <motion.span key={appliedVoucher.discount} initial={{
                      scale: 1.2
                    }} animate={{
                      scale: 1
                    }}>
                            -₱{appliedVoucher.discount}
                          </motion.span>
                        </motion.div>}
                    </AnimatePresence>
                    <div className="flex justify-between text-m2m-text-secondary">
                      <span>Shipping Fee</span>
                      <span>
                        {checkoutData.deliveryOption === 'express' ? '₱150' : '₱50'}
                      </span>
                    </div>
                    <div className="border-t border-m2m-divider pt-2 mt-2">
                      <div className="flex justify-between text-xl font-bold text-m2m-text-primary">
                        <span>Total</span>
                        <motion.span key={finalTotal + (checkoutData.deliveryOption === 'express' ? 150 : 50)} initial={{
                      scale: 1.2
                    }} animate={{
                      scale: 1
                    }} className="bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal bg-clip-text text-transparent">
                          ₱
                          {(finalTotal + (checkoutData.deliveryOption === 'express' ? 150 : 50)).toLocaleString()}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="p-8 border-t border-m2m-divider flex-shrink-0">
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={handlePlaceOrder} className="w-full py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                Place Order
              </motion.button>
            </div>
          </motion.div>
        </motion.div>}

      {/* Add Shipping Address Modal */}
      {showAddressModal && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="bg-m2m-bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-m2m-divider p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-m2m-text-primary">
                Add Shipping Address
              </h2>
              <motion.button whileHover={{
            scale: 1.1,
            rotate: 90
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setShowAddressModal(false)} className="p-2 hover:bg-m2m-bg-primary rounded-xl transition-colors">
                <XIcon className="w-6 h-6 text-m2m-text-secondary" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-m2m-accent-blue" />
                  Recipient's Name *
                </label>
                <input type="text" value={currentAddress.recipientName} onChange={e => setCurrentAddress({
              ...currentAddress,
              recipientName: e.target.value
            })} placeholder="Enter recipient's name" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-m2m-accent-blue" />
                  Phone Number *
                </label>
                <input type="tel" value={currentAddress.phoneNumber} onChange={e => setCurrentAddress({
              ...currentAddress,
              phoneNumber: e.target.value
            })} placeholder="Enter phone number" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-m2m-accent-blue" />
                    Region *
                  </label>
                  <input type="text" value={currentAddress.region} onChange={e => setCurrentAddress({
                ...currentAddress,
                region: e.target.value
              })} placeholder="Region" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    City *
                  </label>
                  <input type="text" value={currentAddress.city} onChange={e => setCurrentAddress({
                ...currentAddress,
                city: e.target.value
              })} placeholder="City" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    District *
                  </label>
                  <input type="text" value={currentAddress.district} onChange={e => setCurrentAddress({
                ...currentAddress,
                district: e.target.value
              })} placeholder="District" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-m2m-accent-blue" />
                  Street / Building Name *
                </label>
                <input type="text" value={currentAddress.street} onChange={e => setCurrentAddress({
              ...currentAddress,
              street: e.target.value
            })} placeholder="Enter street or building name" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-m2m-accent-blue" />
                  Unit / Floor
                </label>
                <input type="text" value={currentAddress.unit} onChange={e => setCurrentAddress({
              ...currentAddress,
              unit: e.target.value
            })} placeholder="Unit number, floor (optional)" className="w-full px-4 py-3 border border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-xl focus:ring-2 focus:ring-m2m-accent-blue" />
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 flex items-center gap-2">
                  <HomeIcon className="w-4 h-4 text-m2m-accent-blue" />
                  Address Category *
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                    <input type="radio" name="category" value="Home" checked={currentAddress.category === 'Home'} onChange={e => setCurrentAddress({
                  ...currentAddress,
                  category: e.target.value as 'Home' | 'Office'
                })} className="w-5 h-5 text-m2m-accent-blue mr-3" />
                    <HomeIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    <span className="font-semibold text-m2m-text-primary">
                      Home
                    </span>
                  </label>
                  <label className="flex-1 flex items-center justify-center p-4 border-2 border-m2m-divider rounded-xl cursor-pointer hover:border-m2m-accent-blue transition-colors">
                    <input type="radio" name="category" value="Office" checked={currentAddress.category === 'Office'} onChange={e => setCurrentAddress({
                  ...currentAddress,
                  category: e.target.value as 'Home' | 'Office'
                })} className="w-5 h-5 text-m2m-accent-blue mr-3" />
                    <BuildingIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    <span className="font-semibold text-m2m-text-primary">
                      Office
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setShowAddressModal(false)} className="flex-1 py-3 border-2 border-m2m-divider rounded-xl font-semibold text-m2m-text-primary hover:bg-m2m-bg-primary transition-all">
                  Cancel
                </motion.button>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleSaveAddress} className="flex-1 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                  Save Address
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>}

      {/* Order Summary Modal */}
      {showOrderSummary && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div initial={{
        scale: 0.9,
        opacity: 0,
        y: 50
      }} animate={{
        scale: 1,
        opacity: 1,
        y: 0
      }} transition={{
        type: 'spring',
        duration: 0.5
      }} className="bg-m2m-bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] border-2 border-m2m-divider flex flex-col">
            <div className="bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal p-8 text-center flex-shrink-0">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.2,
            type: 'spring',
            duration: 0.6
          }} className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-12 h-12 text-m2m-success" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-white/90">
                Thank you for your order. We'll process it right away.
              </p>
            </div>

            <div className="overflow-y-auto flex-1 p-8">
              <div className="space-y-6">
                <div className="bg-m2m-bg-primary p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-m2m-text-primary mb-4 flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 mr-2 text-m2m-accent-blue" />
                    Order Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-m2m-text-secondary">Order ID</span>
                      <span className="font-semibold text-m2m-text-primary">{`ORD-${Date.now()}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-m2m-text-secondary">
                        Estimated Delivery
                      </span>
                      <span className="font-semibold text-m2m-text-primary">
                        {getDeliveryDate(checkoutData.deliveryOption)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-m2m-text-secondary">Items</span>
                      <span className="font-semibold text-m2m-text-primary">
                        {selectedCartItems.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-m2m-accent-blue/10 to-m2m-accent-teal/10 p-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-m2m-text-primary">
                      Total Amount
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal bg-clip-text text-transparent">
                      ₱
                      {(finalTotal + (checkoutData.deliveryOption === 'express' ? 150 : 50)).toLocaleString()}
                    </span>
                  </div>
                  {appliedVoucher && <p className="text-sm text-green-600 font-medium mt-2">
                      You saved ₱{appliedVoucher.discount} with voucher!
                    </p>}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-m2m-divider flex-shrink-0">
              <div className="flex gap-4">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleViewInOrders} className="flex-1 py-4 border-2 border-m2m-accent-blue text-m2m-accent-blue rounded-xl font-bold hover:bg-m2m-accent-blue/10 transition-all flex items-center justify-center gap-2">
                  <EyeIcon className="w-5 h-5" />
                  View in Orders
                </motion.button>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleBuyAgain} className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <RefreshCwIcon className="w-5 h-5" />
                  Buy Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>}

      {/* Order Details Modal */}
      {selectedOrderDetails && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setSelectedOrderDetails(null)}>
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} onClick={e => e.stopPropagation()} className="bg-m2m-bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-m2m-divider p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-m2m-text-primary">
                Order Details
              </h2>
              <motion.button whileHover={{
            scale: 1.1,
            rotate: 90
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setSelectedOrderDetails(null)} className="p-2 hover:bg-m2m-bg-primary rounded-xl transition-colors">
                <XIcon className="w-6 h-6 text-m2m-text-secondary" />
              </motion.button>
            </div>
            <div className="space-y-4">
              <div className="bg-m2m-bg-primary p-4 rounded-xl">
                <p className="text-sm text-m2m-text-secondary">Order ID</p>
                <p className="font-bold text-m2m-text-primary">
                  {selectedOrderDetails.id}
                </p>
              </div>
              <div className="bg-m2m-bg-primary p-4 rounded-xl">
                <p className="text-sm text-m2m-text-secondary">
                  Estimated Delivery
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-bold text-m2m-text-primary">
                    {getDeliveryDate(selectedOrderDetails.deliveryOption || 'standard')}
                  </p>
                  {getWeatherIcon(selectedOrderDetails.deliveryOption || 'standard')}
                </div>
                <p className="text-xs text-m2m-text-secondary mt-1">
                  {getDeliveryDays(selectedOrderDetails.deliveryOption || 'standard')}{' '}
                  days delivery
                </p>
              </div>
              <img src={selectedOrderDetails.image} alt={selectedOrderDetails.name} className="w-full h-64 object-cover rounded-xl shadow-lg" />
              <div>
                <h3 className="font-bold text-xl text-m2m-text-primary">
                  {selectedOrderDetails.name}
                </h3>
                <p className="text-m2m-text-secondary mt-2">
                  Quantity: {selectedOrderDetails.quantity}
                </p>
                <p className="text-2xl font-bold text-m2m-text-primary mt-4">
                  ₱
                  {(selectedOrderDetails.price * selectedOrderDetails.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={cancelDelete}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-m2m-bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 border border-m2m-divider">
              <div className="text-center">
                <div className="w-16 h-16 bg-m2m-accent-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrashIcon className="w-8 h-8 text-m2m-accent-orange" />
                </div>
                <h3 className="text-xl font-bold text-m2m-text-primary mb-2">
                  Remove Item?
                </h3>
                <p className="text-m2m-text-secondary mb-6">
                  Are you sure you want to remove this item from your cart?
                </p>
                <div className="flex gap-3">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={cancelDelete} className="flex-1 px-4 py-3 border-2 border-m2m-divider rounded-lg font-semibold text-m2m-text-primary hover:bg-m2m-bg-primary transition-all">
                    Cancel
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={confirmDelete} className="flex-1 px-4 py-3 bg-m2m-accent-orange text-white rounded-lg font-semibold hover:brightness-110 transition-all">
                    Yes, Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}