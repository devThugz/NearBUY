import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CheckIcon,
  CameraIcon,
  XIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  SparklesIcon,
  TrendingUpIcon } from
'lucide-react';
import Logo from '../../../components/Logo';
export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'business' as 'business' | 'supplier',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const accountTypes = [
  {
    value: 'business',
    label: 'Business User'
  },
  {
    value: 'supplier',
    label: 'Supplier'
  }];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Photo size must be less than 20MB');
        return;
      }
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG and PNG files are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success('Photo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };
  const removePhoto = () => {
    setProfilePhoto(null);
    toast.info('Photo removed');
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[0-9]/.test(formData.password)) {
      toast.error('Password must contain at least one number');
      return;
    }
    setLoading(true);
    try {
      const success = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.accountType,
        profilePhoto: profilePhoto || undefined
      });
      if (success) {
        setLoading(false);
        setShowSuccessAnimation(true);
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error('Email already exists');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Registration failed');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-m2m-bg-primary flex">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation &&
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-m2m-bg-card/95 backdrop-blur-sm">

            <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: 'spring',
              duration: 0.6
            }}
            className="text-center">

              <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: [0, 1.2, 1]
              }}
              transition={{
                duration: 0.6
              }}
              className="w-24 h-24 bg-m2m-success/20 rounded-full flex items-center justify-center mx-auto mb-4">

                <CheckCircleIcon className="w-16 h-16 text-m2m-success" />
              </motion.div>
              <motion.h3
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
              className="text-2xl font-bold text-m2m-text-primary">

                Welcome to NEARBUY!
              </motion.h3>
              <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}
              className="text-m2m-text-secondary mt-2">

                Setting up your account...
              </motion.p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-m2m-accent-teal to-m2m-accent-blue p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16">
              <Logo size="md" showText={false} />
            </div>
          </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Start Your Journey
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of businesses growing with NEARBUY's intelligent
            platform.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUpIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Grow Your Business
                </h3>
                <p className="text-white/80 text-sm">
                  Access powerful tools and insights to scale your operations
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  AI-Powered Platform
                </h3>
                <p className="text-white/80 text-sm">
                  Smart recommendations and automation for better decisions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2024 NEARBUY. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/">
              <div className="w-20 h-20">
                <Logo size="lg" showText={false} />
              </div>
            </Link>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.3
            }}>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-m2m-text-primary mb-2">
                Create Account
              </h2>
              <p className="text-m2m-text-secondary">
                Get started with your free account today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2 text-center">
                  Upload Profile Photo
                </label>
                <div className="flex flex-col items-center">
                  {profilePhoto ?
                  <div className="relative">
                      <img
                      src={profilePhoto}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-m2m-accent-blue shadow-lg" />

                      <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">

                        <XIcon className="w-4 h-4" />
                      </button>
                    </div> :

                  <label className="w-24 h-24 bg-m2m-bg-card border-2 border-dashed border-m2m-divider rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-m2m-accent-blue hover:bg-m2m-accent-blue/5 transition-all group">
                      <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handlePhotoUpload}
                      className="hidden" />

                      <CameraIcon className="w-8 h-8 text-m2m-text-secondary group-hover:text-m2m-accent-blue transition-colors" />
                      <span className="text-xs text-m2m-text-secondary mt-1 group-hover:text-m2m-accent-blue transition-colors">
                        Upload
                      </span>
                    </label>
                  }
                  <p className="text-xs text-m2m-text-secondary mt-2 text-center">
                    JPG or PNG only • Maximum file size: 20MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all placeholder-m2m-text-secondary"
                    placeholder="John Doe"
                    required />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all placeholder-m2m-text-secondary"
                    placeholder="john@example.com"
                    required />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                    }
                    className="w-full pl-10 pr-12 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all placeholder-m2m-text-secondary"
                    placeholder="Create a password"
                    required />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-m2m-text-secondary hover:text-m2m-text-primary">

                    {showPassword ?
                    <EyeOffIcon className="w-5 h-5" /> :

                    <EyeIcon className="w-5 h-5" />
                    }
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-all ${formData.password.length >= 8 ? 'bg-m2m-success' : 'bg-gray-300'}`}>

                      {formData.password.length >= 8 &&
                      <CheckIcon className="w-3 h-3 text-white" />
                      }
                    </div>
                    <span className="text-m2m-text-secondary">
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-all ${/[A-Z]/.test(formData.password) ? 'bg-m2m-success' : 'bg-gray-300'}`}>

                      {/[A-Z]/.test(formData.password) &&
                      <CheckIcon className="w-3 h-3 text-white" />
                      }
                    </div>
                    <span className="text-m2m-text-secondary">
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-all ${/[0-9]/.test(formData.password) ? 'bg-m2m-success' : 'bg-gray-300'}`}>

                      {/[0-9]/.test(formData.password) &&
                      <CheckIcon className="w-3 h-3 text-white" />
                      }
                    </div>
                    <span className="text-m2m-text-secondary">One number</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                    }
                    className="w-full pl-10 pr-12 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all placeholder-m2m-text-secondary"
                    placeholder="Confirm your password"
                    required />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-m2m-text-secondary hover:text-m2m-text-primary">

                    {showConfirmPassword ?
                    <EyeOffIcon className="w-5 h-5" /> :

                    <EyeIcon className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                  Account Type
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountType: e.target.value as 'business' | 'supplier'
                  })
                  }
                  className="w-full px-4 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all">

                  {accountTypes.map((type) =>
                  <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  )}
                </select>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreeToTerms: e.target.checked
                  })
                  }
                  className="mt-0.5 w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />

                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-m2m-text-secondary">

                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">

                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">

                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center">

                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-m2m-text-secondary text-sm">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-m2m-accent-blue hover:text-m2m-accent-teal font-semibold transition-colors">

                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-m2m-divider">
              <div className="flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-m2m-accent-blue mr-2" />
                <p className="text-xs text-m2m-text-secondary">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

}