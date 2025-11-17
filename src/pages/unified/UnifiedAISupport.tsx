import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareIcon, BookOpenIcon, MessageCircleIcon, SendIcon, MapPinIcon, FileTextIcon, CreditCardIcon, HelpCircleIcon, SearchIcon, ThumbsUpIcon, EyeIcon, ClockIcon, StarIcon, UsersIcon, CheckCircleIcon, AlertCircleIcon, BotIcon, SparklesIcon, TrendingUpIcon } from 'lucide-react';
type TabType = 'chat' | 'knowledge' | 'feedback';
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
interface Ticket {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
  category: string;
}
export default function UnifiedAISupport() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your AI assistant. I can help you with business setup, location insights, document requirements, and more.",
    timestamp: '10:30 AM'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [feedbackForm, setFeedbackForm] = useState({
    title: '',
    category: 'General',
    priority: 'Medium',
    description: ''
  });
  const quickActions = [{
    label: 'Business Setup Guide',
    icon: TrendingUpIcon,
    color: 'from-m2m-accent-blue to-m2m-accent-teal'
  }, {
    label: 'Document Checklist',
    icon: FileTextIcon,
    color: 'from-m2m-accent-teal to-m2m-success'
  }, {
    label: 'Location Analysis Help',
    icon: MapPinIcon,
    color: 'from-m2m-accent-orange to-m2m-chart-orange'
  }, {
    label: 'Payment Issues',
    icon: CreditCardIcon,
    color: 'from-m2m-chart-yellow to-m2m-accent-orange'
  }];
  const supportCategories = ['General Questions', 'Location Analysis', 'Documentation', 'Payments', 'Technical Support'];
  const knowledgeBaseArticles = [{
    title: 'How does the AI location analysis work?',
    description: 'Explains AI data points like demographics and market trends.',
    helpful: 45,
    views: 120
  }, {
    title: 'What documents are required for business registration?',
    description: 'Lists common permits like BIR, Business Permit, Sanitary, etc.',
    helpful: 38,
    views: 95
  }, {
    title: 'What payment methods are supported?',
    description: 'Includes GCash, PayMaya, bank transfers.',
    helpful: 52,
    views: 148
  }, {
    title: 'How to optimize my business location?',
    description: 'Best practices for choosing the right location for your business.',
    helpful: 67,
    views: 203
  }, {
    title: 'Understanding supplier networks',
    description: 'How to connect with suppliers and manage your supply chain.',
    helpful: 41,
    views: 112
  }, {
    title: 'Getting started with NEARBUY',
    description: 'A complete guide to setting up your business on NEARBUY.',
    helpful: 89,
    views: 267
  }];
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I understand your question. Let me help you with that. Our AI system analyzes multiple data points including demographics, market trends, and competitor locations to provide you with the best business insights.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  const handleSubmitFeedback = () => {
    if (!feedbackForm.title.trim()) return;
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: feedbackForm.title,
      status: 'Open',
      timestamp: new Date().toLocaleString(),
      category: feedbackForm.category
    };
    setTickets([newTicket, ...tickets]);
    setFeedbackForm({
      title: '',
      category: 'General',
      priority: 'Medium',
      description: ''
    });
  };
  const tabs = [{
    id: 'chat' as TabType,
    label: 'AI Chat Support',
    icon: MessageSquareIcon
  }, {
    id: 'knowledge' as TabType,
    label: 'Knowledge Base',
    icon: BookOpenIcon
  }, {
    id: 'feedback' as TabType,
    label: 'Feedback & Tickets',
    icon: MessageCircleIcon
  }];
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-m2m-text-primary flex items-center">
            <SparklesIcon className="w-8 h-8 mr-3 text-m2m-accent-blue" />
            AI Support Center
          </h1>
          <p className="text-m2m-text-secondary mt-2">
            Get instant help with our AI-powered support system
          </p>
        </div>
      </motion.div>
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-m2m-divider">
        {tabs.map(tab => {
        const Icon = tab.icon;
        return <motion.button key={tab.id} whileHover={{
          y: -2
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all relative ${activeTab === tab.id ? 'text-m2m-accent-blue' : 'text-m2m-text-secondary hover:text-m2m-text-primary'}`}>
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal" transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            </motion.button>;
      })}
      </div>
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'chat' && <motion.div key="chat" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} transition={{
        duration: 0.3
      }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Window */}
            <div className="lg:col-span-2 bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider overflow-hidden flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <BotIcon className="w-6 h-6 text-m2m-accent-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <div className="flex items-center space-x-1 text-white/90 text-sm">
                    <div className="w-2 h-2 bg-m2m-success rounded-full animate-pulse" />
                    <span>Online & Ready to Help</span>
                  </div>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-m2m-bg-primary">
                {messages.map(message => <motion.div key={message.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white' : 'bg-m2m-bg-card border border-m2m-divider text-m2m-text-primary'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-m2m-text-secondary'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>)}
              </div>
              {/* Input */}
              <div className="p-4 bg-m2m-bg-card border-t border-m2m-divider">
                <div className="flex space-x-2">
                  <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleSendMessage} className="px-6 py-3 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    <SendIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6">
                <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                const Icon = action.icon;
                return <motion.button key={index} whileHover={{
                  scale: 1.02,
                  x: 4
                }} whileTap={{
                  scale: 0.98
                }} className="w-full flex items-center space-x-3 p-3 bg-m2m-bg-primary rounded-xl hover:shadow-md transition-all border border-m2m-divider">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-m2m-text-primary">
                          {action.label}
                        </span>
                      </motion.button>;
              })}
                </div>
              </div>
              {/* Support Categories */}
              <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6">
                <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                  Support Categories
                </h3>
                <div className="space-y-2">
                  {supportCategories.map((category, index) => <motion.button key={index} whileHover={{
                x: 4
              }} className="w-full text-left px-4 py-2 text-sm text-m2m-text-secondary hover:text-m2m-accent-blue hover:bg-m2m-bg-primary rounded-lg transition-all">
                      {category}
                    </motion.button>)}
                </div>
              </div>
              {/* Support Status */}
              <div className="bg-gradient-to-br from-m2m-accent-blue/10 to-m2m-accent-teal/10 rounded-2xl shadow-lg border border-m2m-accent-blue/20 p-6">
                <h3 className="text-lg font-bold text-m2m-text-primary mb-4">
                  Support Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-m2m-accent-blue" />
                      <span className="text-sm text-m2m-text-secondary">
                        Response Time
                      </span>
                    </div>
                    <span className="text-sm font-bold text-m2m-text-primary">
                      &lt;30s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-4 h-4 text-m2m-accent-orange fill-current" />
                      <span className="text-sm text-m2m-text-secondary">
                        Satisfaction
                      </span>
                    </div>
                    <span className="text-sm font-bold text-m2m-text-primary">
                      4.8 ⭐
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="w-4 h-4 text-m2m-success" />
                      <span className="text-sm text-m2m-text-secondary">
                        Active Users
                      </span>
                    </div>
                    <span className="text-sm font-bold text-m2m-text-primary">
                      1,247
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>}
        {activeTab === 'knowledge' && <motion.div key="knowledge" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} transition={{
        duration: 0.3
      }} className="space-y-6">
            {/* Search Bar */}
            <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                <input type="text" placeholder="Search knowledge base..." className="w-full pl-12 pr-4 py-4 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
              </div>
            </div>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBaseArticles.map((article, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5,
            scale: 1.02
          }} className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6 cursor-pointer group">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal flex items-center justify-center flex-shrink-0">
                      <HelpCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-m2m-text-primary group-hover:text-m2m-accent-blue transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-sm text-m2m-text-secondary mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-m2m-text-secondary">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <ThumbsUpIcon className="w-3 h-3" />
                        <span>{article.helpful} helpful</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-3 h-3" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <span className="text-m2m-accent-blue font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>}
        {activeTab === 'feedback' && <motion.div key="feedback" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} transition={{
        duration: 0.3
      }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Form */}
            <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6">
              <h3 className="text-xl font-bold text-m2m-text-primary mb-6">
                Submit Feedback or Report Issue
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Issue Title
                  </label>
                  <input type="text" value={feedbackForm.title} onChange={e => setFeedbackForm({
                ...feedbackForm,
                title: e.target.value
              })} placeholder="Brief description of the issue" className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Category
                  </label>
                  <select value={feedbackForm.category} onChange={e => setFeedbackForm({
                ...feedbackForm,
                category: e.target.value
              })} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary focus:outline-none focus:border-m2m-accent-blue transition-colors">
                    <option>General</option>
                    <option>Documentation</option>
                    <option>Location Analysis</option>
                    <option>Payments</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    {['Low', 'Medium', 'High'].map(priority => <button key={priority} onClick={() => setFeedbackForm({
                  ...feedbackForm,
                  priority
                })} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${feedbackForm.priority === priority ? 'bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white' : 'bg-m2m-bg-primary border border-m2m-divider text-m2m-text-secondary hover:border-m2m-accent-blue'}`}>
                        {priority}
                      </button>)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                    Description
                  </label>
                  <textarea value={feedbackForm.description} onChange={e => setFeedbackForm({
                ...feedbackForm,
                description: e.target.value
              })} placeholder="Provide detailed information about the issue" rows={6} className="w-full px-4 py-3 bg-m2m-bg-primary border border-m2m-divider rounded-xl text-m2m-text-primary placeholder-m2m-text-secondary focus:outline-none focus:border-m2m-accent-blue transition-colors resize-none" />
                </div>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleSubmitFeedback} className="w-full py-4 bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Submit Feedback
                </motion.button>
              </div>
            </div>
            {/* Support Tickets */}
            <div className="bg-m2m-bg-card rounded-2xl shadow-lg border border-m2m-divider p-6">
              <h3 className="text-xl font-bold text-m2m-text-primary mb-6">
                Your Support Tickets
              </h3>
              {tickets.length === 0 ? <div className="text-center py-12">
                  <MessageCircleIcon className="w-16 h-16 text-m2m-text-secondary/30 mx-auto mb-4" />
                  <p className="text-m2m-text-secondary">
                    No support tickets yet.
                  </p>
                  <p className="text-sm text-m2m-text-secondary mt-2">
                    Submit a ticket using the form on the left.
                  </p>
                </div> : <div className="space-y-4">
                  {tickets.map(ticket => <motion.div key={ticket.id} initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} className="p-4 bg-m2m-bg-primary rounded-xl border border-m2m-divider">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-m2m-text-primary">
                          {ticket.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.status === 'Open' ? 'bg-m2m-accent-blue/20 text-m2m-accent-blue' : ticket.status === 'In Progress' ? 'bg-m2m-accent-orange/20 text-m2m-accent-orange' : 'bg-m2m-success/20 text-m2m-success'}`}>
                          {ticket.status === 'Open' && <AlertCircleIcon className="w-3 h-3 inline mr-1" />}
                          {ticket.status === 'Resolved' && <CheckCircleIcon className="w-3 h-3 inline mr-1" />}
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm text-m2m-text-secondary mb-2">
                        Category: {ticket.category}
                      </p>
                      <p className="text-xs text-m2m-text-secondary">
                        {ticket.timestamp}
                      </p>
                    </motion.div>)}
                </div>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}