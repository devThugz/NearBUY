import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckCircleIcon, ClockIcon, FileTextIcon, MapPinIcon, BuildingIcon, AlertCircleIcon } from 'lucide-react';
interface BusinessRegistrationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
interface DocumentItem {
  id: number;
  name: string;
  status: 'Required' | 'N/A';
  description: string;
  processing: string;
  fee: string;
  completed: boolean;
}
export default function BusinessRegistrationPanel({
  isOpen,
  onClose
}: BusinessRegistrationPanelProps) {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>([{
    id: 1,
    name: "Mayor's Permit / Business Permit",
    status: 'Required',
    description: 'Primary business operation permit issued by the local government',
    processing: '5–7 business days',
    fee: '₱2,500',
    completed: false
  }, {
    id: 2,
    name: 'Zoning Clearance',
    status: 'Required',
    description: 'City planning office zoning compliance certificate',
    processing: '7–10 business days',
    fee: '₱1,500',
    completed: false
  }, {
    id: 3,
    name: 'DTI Business Name Registration',
    status: 'Required',
    description: 'Department of Trade and Industry business name registration',
    processing: '1–2 business days',
    fee: '₱500',
    completed: false
  }, {
    id: 4,
    name: 'BIR Registration Certificate',
    status: 'Required',
    description: 'Bureau of Internal Revenue certificate for tax purposes',
    processing: '3–5 business days',
    fee: '₱500',
    completed: false
  }, {
    id: 5,
    name: 'SSS Employer Registration',
    status: 'N/A',
    description: 'Social Security System employer registration (if hiring employees)',
    processing: '2–3 business days',
    fee: '₱0',
    completed: false
  }]);
  const requiredDocuments = documents.filter(doc => doc.status === 'Required');
  const completedDocuments = documents.filter(doc => doc.completed);
  const totalFees = requiredDocuments.reduce((sum, doc) => sum + parseInt(doc.fee.replace(/[^0-9]/g, '')), 0);
  const paidFees = completedDocuments.filter(doc => doc.status === 'Required').reduce((sum, doc) => sum + parseInt(doc.fee.replace(/[^0-9]/g, '')), 0);
  const progress = Math.round(completedDocuments.filter(doc => doc.status === 'Required').length / requiredDocuments.length * 100);
  const isFormComplete = businessName.trim() !== '' && ownerName.trim() !== '' && requiredDocuments.every(doc => doc.completed);
  const toggleDocumentComplete = (id: number) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? {
      ...doc,
      completed: !doc.completed
    } : doc));
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
          {/* Panel */}
          <motion.div initial={{
        x: '100%',
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} exit={{
        x: '100%',
        opacity: 0
      }} transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }} className="fixed right-0 top-0 h-full w-full md:w-[800px] lg:w-[900px] bg-m2m-bg-primary z-50 overflow-y-auto">
            <div className="min-h-full p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <motion.h2 initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="text-3xl font-bold gradient-text">
                    Document Requirements
                  </motion.h2>
                  <motion.p initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.15
              }} className="text-m2m-text-secondary mt-2">
                    Complete your{' '}
                    <span className="font-semibold">
                      General Business setup
                    </span>{' '}
                    in{' '}
                    <span className="font-semibold">
                      Central Business District
                    </span>
                  </motion.p>
                </div>
                <motion.button initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.2
            }} whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={onClose} className="p-2 hover:bg-m2m-bg-card rounded-lg transition-colors">
                  <XIcon className="w-6 h-6 text-m2m-text-secondary" />
                </motion.button>
              </div>
              {/* Metrics Overview */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="glass-panel rounded-2xl p-6 mb-8 border border-m2m-divider shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">
                      Overall Progress
                    </p>
                    <p className="text-2xl font-bold gradient-text">
                      {progress}% Complete
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">
                      Required Documents
                    </p>
                    <p className="text-2xl font-bold text-m2m-accent-blue">
                      {requiredDocuments.length} Required
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">
                      Completed Documents
                    </p>
                    <p className="text-2xl font-bold text-m2m-success">
                      {completedDocuments.filter(doc => doc.status === 'Required').length}{' '}
                      Completed
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">Paid Fees</p>
                    <p className="text-2xl font-bold text-m2m-success">
                      ₱{paidFees.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">
                      Remaining Fees
                    </p>
                    <p className="text-2xl font-bold text-m2m-accent-orange">
                      ₱{(totalFees - paidFees).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-m2m-text-secondary">
                      Selected Location
                    </p>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4 text-m2m-accent-blue" />
                      <p className="text-sm font-semibold text-m2m-text-primary">
                        Central Business District
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-m2m-divider grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-m2m-text-secondary">
                      Location Type
                    </p>
                    <p className="text-sm font-semibold text-m2m-accent-blue">
                      Commercial
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-m2m-text-secondary">
                      Coordinates
                    </p>
                    <p className="text-sm font-mono text-m2m-text-primary">
                      8.948896, 125.542934
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Business Information */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="bg-m2m-bg-card rounded-2xl p-6 mb-8 border border-m2m-divider shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <BuildingIcon className="w-5 h-5 text-m2m-accent-blue" />
                  <h3 className="text-xl font-bold text-m2m-text-primary">
                    Business Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Enter your business name" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Enter owner name" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Business Description
                    </label>
                    <textarea value={businessDescription} onChange={e => setBusinessDescription(e.target.value)} placeholder="Describe your business..." rows={3} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Contact Information
                    </label>
                    <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} placeholder="Phone number, email, etc." className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-lg text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue focus:ring-2 focus:ring-m2m-accent-blue/20 transition-all" />
                  </div>
                </div>
              </motion.div>
              {/* Required Documents */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-m2m-bg-card rounded-2xl p-6 mb-8 border border-m2m-divider shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <FileTextIcon className="w-5 h-5 text-m2m-accent-blue" />
                  <h3 className="text-xl font-bold text-m2m-text-primary">
                    Required Permits, Licenses, and Registration
                  </h3>
                </div>
                <div className="space-y-3">
                  {documents.map((doc, index) => <motion.div key={doc.id} initial={{
                opacity: 0,
                y: 20,
                scale: 0.95
              }} animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }} transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.3
              }} whileHover={{
                scale: 1.02
              }} className={`bg-m2m-bg-primary rounded-xl p-4 cursor-pointer transition-all ${doc.completed ? 'border-2 border-m2m-success bg-m2m-success/5' : 'border border-m2m-divider hover:border-m2m-accent-blue'}`} onClick={() => toggleDocumentComplete(doc.id)}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {doc.completed ? <motion.div initial={{
                      scale: 0
                    }} animate={{
                      scale: 1
                    }} transition={{
                      type: 'spring',
                      stiffness: 500
                    }}>
                              <CheckCircleIcon className="w-6 h-6 text-m2m-success" />
                            </motion.div> : <div className="w-6 h-6 rounded-full border-2 border-m2m-divider" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-m2m-text-primary">
                              {doc.name}
                            </h4>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doc.status === 'Required' ? 'bg-m2m-accent-blue/20 text-m2m-accent-blue border border-m2m-accent-blue/40' : 'bg-m2m-bg-primary text-m2m-text-secondary border border-m2m-divider'}`}>
                                {doc.status}
                              </span>
                              <span className="text-lg font-bold text-m2m-accent-blue">
                                {doc.fee}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-m2m-text-secondary mb-3">
                            {doc.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-m2m-text-secondary">
                            <ClockIcon className="w-4 h-4" />
                            <span>Processing: {doc.processing}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
              </motion.div>
              {/* Final Action Section */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.9
          }} className="bg-m2m-bg-card rounded-2xl p-8 text-center border border-m2m-divider shadow-lg">
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  Ready to Launch Your Business?
                </h3>
                <p className="text-m2m-text-secondary mb-6">
                  Complete all required documents to add your business to the
                  operating business section.
                </p>
                <motion.button whileHover={isFormComplete ? {
              scale: 1.03
            } : {}} whileTap={isFormComplete ? {
              scale: 0.98
            } : {}} disabled={!isFormComplete} className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all ${isFormComplete ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white shadow-lg hover:shadow-xl' : 'bg-m2m-bg-primary text-m2m-text-secondary cursor-not-allowed opacity-50'}`}>
                  Done – Add to Operating Business
                </motion.button>
                {!isFormComplete && <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 1
            }} className="mt-4 flex items-center justify-center gap-2 text-sm text-m2m-accent-orange">
                    <AlertCircleIcon className="w-4 h-4" />
                    <span>
                      Please complete all required documents and business
                      information to proceed
                    </span>
                  </motion.div>}
              </motion.div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}