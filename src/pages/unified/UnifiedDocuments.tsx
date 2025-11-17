import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileTextIcon, SearchIcon, DownloadIcon, EyeIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon, ShieldCheckIcon, ChevronDownIcon, FilterIcon, CalendarIcon, DollarSignIcon, UploadIcon, FileIcon, XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
interface Document {
  id: string;
  name: string;
  category: string;
  status: 'required' | 'optional' | 'pending';
  fee: string;
  paid: boolean;
  uploadDate: string;
  description: string;
  fileUrl?: string;
}
export default function UnifiedDocuments() {
  const [activeTab, setActiveTab] = useState<'documents' | 'payments' | 'status'>('documents');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const documents: Document[] = [{
    id: '1',
    name: 'Business Permit',
    category: 'Permits',
    status: 'required',
    fee: '₱2,500',
    paid: true,
    uploadDate: '11/15/2025',
    description: 'Municipal business application',
    fileUrl: '#'
  }, {
    id: '2',
    name: 'BIR Registration',
    category: 'Registration',
    status: 'required',
    fee: '₱500',
    paid: false,
    uploadDate: '11/15/2025',
    description: 'Bureau of Internal Revenue registration',
    fileUrl: '#'
  }, {
    id: '3',
    name: 'Barangay Clearance',
    category: 'Clearances',
    status: 'required',
    fee: '₱200',
    paid: true,
    uploadDate: '11/14/2025',
    description: 'Local barangay clearance certificate',
    fileUrl: '#'
  }, {
    id: '4',
    name: 'Fire Safety Certificate',
    category: 'Safety',
    status: 'required',
    fee: '₱1,000',
    paid: false,
    uploadDate: '11/13/2025',
    description: 'Fire safety inspection certificate'
  }, {
    id: '5',
    name: 'Sanitary Permit',
    category: 'Health',
    status: 'optional',
    fee: '₱300',
    paid: true,
    uploadDate: '11/12/2025',
    description: 'Health and sanitation permit',
    fileUrl: '#'
  }, {
    id: '6',
    name: 'Environmental Compliance',
    category: 'Compliance',
    status: 'optional',
    fee: '₱1,500',
    paid: false,
    uploadDate: '11/10/2025',
    description: 'Environmental compliance certificate'
  }];
  const businessLocations = ['Main Office - Butuan City', 'Branch 1 - Agusan del Norte', 'Branch 2 - Surigao City', 'Warehouse - Nasipit'];
  const categories = ['all', ...new Set(documents.map(d => d.category))];
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  const handleView = (doc: Document) => {
    toast.success(`Viewing ${doc.name}`);
  };
  const handleDownload = (doc: Document) => {
    if (doc.fileUrl) {
      toast.success(`Downloading ${doc.name}`);
    } else {
      toast.error('File not available for download');
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'required':
        return <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">
            Required
          </span>;
      case 'optional':
        return <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
            Optional
          </span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-full">
            Pending
          </span>;
    }
  };
  const getCategoryBadge = (category: string) => {
    return <span className="px-2 py-1 text-xs font-semibold bg-m2m-accent-blue/10 text-m2m-accent-blue rounded-full">
        {category}
      </span>;
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-m2m-text-primary flex items-center">
              <FileTextIcon className="w-8 h-8 mr-3 text-m2m-accent-blue" />
              Document Management
            </h1>
            <p className="text-m2m-text-secondary mt-2">
              Manage required documents and payments for your business
              locations.
            </p>
          </div>
          <motion.div whileHover={{
          scale: 1.05
        }} className="px-4 py-2 bg-m2m-success/20 text-m2m-success rounded-full font-semibold flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4" />
            Secure Document Processing
          </motion.div>
        </div>
      </motion.div>

      {/* Business Location Progress */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="bg-m2m-bg-card rounded-xl p-6 border border-m2m-divider">
        <h3 className="text-lg font-semibold text-m2m-text-primary mb-4">
          Business Location Progress
        </h3>
        <div className="relative">
          <label className="block text-sm font-medium text-m2m-text-secondary mb-2">
            Select Business Location
          </label>
          <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary appearance-none focus:outline-none focus:border-m2m-accent-blue transition-colors cursor-pointer">
            <option value="">Choose a business location</option>
            {businessLocations.map((location, index) => <option key={index} value={location}>
                {location}
              </option>)}
          </select>
          <ChevronDownIcon className="absolute right-3 top-[42px] w-5 h-5 text-m2m-text-secondary pointer-events-none" />
        </div>

        {selectedLocation && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-m2m-text-secondary">
                  Total Documents
                </span>
                <FileTextIcon className="w-5 h-5 text-m2m-accent-blue" />
              </div>
              <p className="text-2xl font-bold text-m2m-text-primary">
                {documents.length}
              </p>
            </div>
            <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-m2m-text-secondary">
                  Completed
                </span>
                <CheckCircleIcon className="w-5 h-5 text-m2m-success" />
              </div>
              <p className="text-2xl font-bold text-m2m-success">
                {documents.filter(d => d.paid).length}
              </p>
            </div>
            <div className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-m2m-text-secondary">Pending</span>
                <ClockIcon className="w-5 h-5 text-m2m-accent-orange" />
              </div>
              <p className="text-2xl font-bold text-m2m-accent-orange">
                {documents.filter(d => !d.paid).length}
              </p>
            </div>
          </motion.div>}
      </motion.div>

      {/* Tabs Section */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="bg-m2m-bg-card rounded-xl border border-m2m-divider overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-m2m-divider bg-m2m-bg-primary">
          <button onClick={() => setActiveTab('documents')} className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'documents' ? 'text-m2m-accent-blue border-b-2 border-m2m-accent-blue bg-m2m-accent-blue/5' : 'text-m2m-text-secondary hover:text-m2m-text-primary hover:bg-m2m-bg-primary'}`}>
            Documents
          </button>
          <button onClick={() => setActiveTab('payments')} className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'payments' ? 'text-m2m-accent-blue border-b-2 border-m2m-accent-blue bg-m2m-accent-blue/5' : 'text-m2m-text-secondary hover:text-m2m-text-primary hover:bg-m2m-bg-primary'}`}>
            Payments
          </button>
          <button onClick={() => setActiveTab('status')} className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'status' ? 'text-m2m-accent-blue border-b-2 border-m2m-accent-blue bg-m2m-accent-blue/5' : 'text-m2m-text-secondary hover:text-m2m-text-primary hover:bg-m2m-bg-primary'}`}>
            Status Tracking
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'documents' && <motion.div key="documents" initial={{
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
          }}>
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search documents..." className="w-full pl-10 pr-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                  </div>
                  <div className="relative">
                    <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full md:w-48 px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary appearance-none focus:outline-none focus:border-m2m-accent-blue transition-colors cursor-pointer">
                      <option value="all">All Documents</option>
                      {categories.filter(c => c !== 'all').map(category => <option key={category} value={category}>
                            {category}
                          </option>)}
                    </select>
                    <FilterIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary pointer-events-none" />
                  </div>
                </div>

                {/* Document Cards */}
                <div className="space-y-4">
                  {filteredDocuments.map((doc, index) => <motion.div key={doc.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.05
              }} className="bg-m2m-bg-primary rounded-xl p-6 border border-m2m-divider hover:border-m2m-accent-blue hover:shadow-lg transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Left: Document Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-m2m-accent-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileIcon className="w-6 h-6 text-m2m-accent-blue" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-lg font-semibold text-m2m-text-primary">
                                  {doc.name}
                                </h4>
                                {getStatusBadge(doc.status)}
                                {getCategoryBadge(doc.category)}
                              </div>
                              <p className="text-sm text-m2m-text-secondary mb-3">
                                {doc.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-m2m-text-secondary">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>Uploaded: {doc.uploadDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSignIcon className="w-4 h-4" />
                                  <span className={`font-semibold ${doc.paid ? 'text-m2m-success' : 'text-m2m-accent-orange'}`}>
                                    {doc.fee} {doc.paid && 'paid'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                          <motion.button whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }} onClick={() => handleView(doc)} className="px-4 py-2 bg-m2m-accent-blue text-white rounded-lg font-medium hover:bg-m2m-accent-blue/90 transition-all flex items-center gap-2">
                            <EyeIcon className="w-4 h-4" />
                            View
                          </motion.button>
                          {doc.fileUrl && <motion.button whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }} onClick={() => handleDownload(doc)} className="px-4 py-2 bg-m2m-accent-teal text-white rounded-lg font-medium hover:bg-m2m-accent-teal/90 transition-all flex items-center gap-2">
                              <DownloadIcon className="w-4 h-4" />
                              Download
                            </motion.button>}
                        </div>
                      </div>
                    </motion.div>)}
                </div>

                {filteredDocuments.length === 0 && <div className="text-center py-12">
                    <FileTextIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
                    <p className="text-m2m-text-secondary">
                      No documents found
                    </p>
                  </div>}
              </motion.div>}

            {activeTab === 'payments' && <motion.div key="payments" initial={{
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
          }}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-m2m-text-primary mb-4">
                    Payment Summary
                  </h3>

                  {/* Payment Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-m2m-bg-primary rounded-lg p-6 border border-m2m-divider">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Total Fees
                        </span>
                        <DollarSignIcon className="w-5 h-5 text-m2m-accent-blue" />
                      </div>
                      <p className="text-2xl font-bold text-m2m-text-primary">
                        ₱
                        {documents.reduce((sum, d) => sum + parseInt(d.fee.replace(/[₱,]/g, '')), 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-m2m-bg-primary rounded-lg p-6 border border-m2m-divider">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Paid
                        </span>
                        <CheckCircleIcon className="w-5 h-5 text-m2m-success" />
                      </div>
                      <p className="text-2xl font-bold text-m2m-success">
                        ₱
                        {documents.filter(d => d.paid).reduce((sum, d) => sum + parseInt(d.fee.replace(/[₱,]/g, '')), 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-m2m-bg-primary rounded-lg p-6 border border-m2m-divider">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-m2m-text-secondary">
                          Outstanding
                        </span>
                        <AlertCircleIcon className="w-5 h-5 text-m2m-accent-orange" />
                      </div>
                      <p className="text-2xl font-bold text-m2m-accent-orange">
                        ₱
                        {documents.filter(d => !d.paid).reduce((sum, d) => sum + parseInt(d.fee.replace(/[₱,]/g, '')), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Payment List */}
                  <div className="space-y-3">
                    {documents.map(doc => <div key={doc.id} className="bg-m2m-bg-primary rounded-lg p-4 border border-m2m-divider flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${doc.paid ? 'bg-m2m-success/20' : 'bg-m2m-accent-orange/20'}`}>
                            {doc.paid ? <CheckCircleIcon className="w-5 h-5 text-m2m-success" /> : <ClockIcon className="w-5 h-5 text-m2m-accent-orange" />}
                          </div>
                          <div>
                            <p className="font-semibold text-m2m-text-primary">
                              {doc.name}
                            </p>
                            <p className="text-sm text-m2m-text-secondary">
                              {doc.paid ? 'Payment completed' : 'Payment pending'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${doc.paid ? 'text-m2m-success' : 'text-m2m-accent-orange'}`}>
                            {doc.fee}
                          </p>
                          {!doc.paid && <button className="text-sm text-m2m-accent-blue hover:underline">
                              Pay Now
                            </button>}
                        </div>
                      </div>)}
                  </div>
                </div>
              </motion.div>}

            {activeTab === 'status' && <motion.div key="status" initial={{
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
          }}>
                <h3 className="text-xl font-bold text-m2m-text-primary mb-6">
                  Document Status Tracking
                </h3>

                <div className="space-y-4">
                  {documents.map((doc, index) => <div key={doc.id} className="bg-m2m-bg-primary rounded-lg p-6 border border-m2m-divider">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-m2m-text-primary mb-1">
                            {doc.name}
                          </h4>
                          <p className="text-sm text-m2m-text-secondary">
                            {doc.description}
                          </p>
                        </div>
                        {doc.paid ? <span className="px-3 py-1 bg-m2m-success/20 text-m2m-success rounded-full text-sm font-semibold">
                            Completed
                          </span> : <span className="px-3 py-1 bg-m2m-accent-orange/20 text-m2m-accent-orange rounded-full text-sm font-semibold">
                            In Progress
                          </span>}
                      </div>

                      {/* Progress Steps */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-8 h-8 bg-m2m-success rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 h-1 bg-m2m-success"></div>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${doc.paid ? 'bg-m2m-success' : 'bg-m2m-accent-orange'}`}>
                            {doc.paid ? <CheckCircleIcon className="w-5 h-5 text-white" /> : <ClockIcon className="w-5 h-5 text-white" />}
                          </div>
                          <div className={`flex-1 h-1 ${doc.paid ? 'bg-m2m-success' : 'bg-gray-300'}`}></div>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${doc.paid ? 'bg-m2m-success' : 'bg-gray-300'}`}>
                            {doc.paid ? <CheckCircleIcon className="w-5 h-5 text-white" /> : <XCircleIcon className="w-5 h-5 text-white" />}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-2 text-xs text-m2m-text-secondary">
                        <span>Uploaded</span>
                        <span>Payment</span>
                        <span>Approved</span>
                      </div>
                    </div>)}
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>;
}