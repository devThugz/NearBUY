import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackageIcon, ImageIcon, DollarSignIcon, BoxIcon, TruckIcon, ShieldCheckIcon, PlusIcon, XIcon, UploadIcon, TagIcon, SaveIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
interface ProductVariant {
  id: string;
  name: string;
  price: string;
  stock: string;
  sku: string;
}
export default function AddProduct() {
  const navigate = useNavigate();
  // Product Information
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [tags, setTags] = useState('');
  // Pricing & Cost
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [minOrderQty, setMinOrderQty] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  // Inventory
  const [stockQuantity, setStockQuantity] = useState('');
  const [skuCode, setSkuCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('');
  // Shipping
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [shippingCategory, setShippingCategory] = useState('');
  const [courierOptions, setCourierOptions] = useState('');
  // Variants
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  // Media
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
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
  const handlePublish = () => {
    if (!productName || !category || !stockQuantity || !skuCode || !weight) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Product Successfully Published!', {
      description: `${productName} is now live in your catalog`,
      icon: <CheckCircleIcon className="w-5 h-5" />
    });
    setTimeout(() => {
      navigate('/supplier/products');
    }, 1500);
  };
  const handleSaveDraft = () => {
    toast.success('Product saved as draft', {
      description: 'You can continue editing later',
      icon: <SaveIcon className="w-5 h-5" />
    });
    setTimeout(() => {
      navigate('/supplier/dashboard');
    }, 1500);
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate('/supplier/dashboard')} className="p-2 hover:bg-m2m-bg-card rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-m2m-text-secondary" />
            </button>
            <h1 className="text-3xl font-bold text-m2m-text-primary">
              Add New Product
            </h1>
          </div>
          <p className="text-m2m-text-secondary mt-2 ml-14">
            Create a new product listing for your catalog
          </p>
        </div>
      </div>
      {/* 1. Product Information */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
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
      duration: 0.5,
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
      duration: 0.5,
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
              Selling Price (₱) <span className="text-red-500">*</span>
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
      duration: 0.5,
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
              Available Stock Quantity <span className="text-red-500">*</span>
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
      duration: 0.5,
      delay: 0.5
    }} className="bg-m2m-bg-card rounded-xl shadow-lg p-6 border border-m2m-divider">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TagIcon className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-bold text-m2m-text-primary">
              Product Variants (Optional)
            </h2>
          </div>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={addVariant} className="flex items-center space-x-2 px-4 py-2 bg-m2m-accent-blue text-white rounded-lg hover:bg-m2m-accent-teal transition-colors">
            <PlusIcon className="w-4 h-4" />
            <span>Add Variant</span>
          </motion.button>
        </div>
        {variants.length === 0 ? <div className="text-center py-8 text-m2m-text-secondary">
            <p>No variants added yet. Click "Add Variant" to create one.</p>
          </div> : <div className="space-y-4">
            {variants.map((variant, index) => <motion.div key={variant.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1 * index
        }} className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
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
              </motion.div>)}
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
      duration: 0.5,
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
      duration: 0.5,
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
      {/* 8. Final Actions */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.8
    }} className="bg-gradient-to-br from-m2m-accent-blue/5 to-m2m-accent-teal/5 rounded-xl shadow-lg p-8 border border-m2m-accent-blue/20">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handlePublish} className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
            <CheckCircleIcon className="w-6 h-6" />
            <span>Publish Product</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleSaveDraft} className="w-full md:w-auto px-8 py-4 bg-m2m-bg-card text-m2m-text-primary border-2 border-m2m-divider rounded-xl font-semibold text-lg hover:bg-m2m-bg-primary transition-all flex items-center justify-center space-x-2">
            <SaveIcon className="w-6 h-6" />
            <span>Save as Draft</span>
          </motion.button>
        </div>
        <p className="text-center text-sm text-m2m-text-secondary mt-6">
          All fields marked with <span className="text-red-500">*</span> are
          required
        </p>
      </motion.div>
    </motion.div>;
}