import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  MailIcon,
  LockIcon,
  SparklesIcon } from
'lucide-react';
import Logo from '../../../components/Logo';
// Demo account credentials
const DEMO_CREDENTIALS = {
  business: {
    email: 'villarias@gmail.com',
    password: '12345'
  },
  supplier: {
    email: 'reyjhon@gmail.com',
    password: '12345'
  }
};
export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accountType: 'business' as 'business' | 'supplier',
    rememberMe: false,
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  // Auto-fill credentials when account type changes
  useEffect(() => {
    if (!showForgotPassword) {
      const credentials = DEMO_CREDENTIALS[formData.accountType];
      setFormData((prev) => ({
        ...prev,
        email: credentials.email,
        password: credentials.password
      }));
    }
  }, [formData.accountType, showForgotPassword]);
  const accountTypes = [
  {
    value: 'business',
    label: 'Business User'
  },
  {
    value: 'supplier',
    label: 'Supplier'
  }];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error('Please accept the Terms & Conditions to continue');
      return;
    }
    setLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedEmail', formData.email);
        }
        setLoading(false);
        setShowSuccessAnimation(true);
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error('Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Login failed');
      setLoading(false);
    }
  };
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotPasswordSent(true);
      toast.success('Password reset link sent to your email!');
    }, 1500);
  };
  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
    setForgotPasswordSent(false);
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

                Welcome Back!
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

                Redirecting to dashboard...
              </motion.p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-m2m-accent-blue to-m2m-accent-teal p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
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
            Welcome to NEARBUY
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Your intelligent business platform for seamless operations and
            growth.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  AI-Powered Insights
                </h3>
                <p className="text-white/80 text-sm">
                  Get intelligent recommendations and analytics for your
                  business
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Enterprise Security
                </h3>
                <p className="text-white/80 text-sm">
                  Bank-level encryption and compliance with industry standards
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

          <AnimatePresence mode="wait">
            {!showForgotPassword ?
            <motion.div
              key="signin"
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: 20
              }}
              transition={{
                duration: 0.3
              }}>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-m2m-text-primary mb-2">
                    Sign In
                  </h2>
                  <p className="text-m2m-text-secondary">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                      Account Type
                    </label>
                    <select
                    value={formData.accountType}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountType: e.target.value as any
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
                      placeholder="Enter your email"
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
                      placeholder="Enter your password"
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                      type="checkbox"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        rememberMe: e.target.checked
                      })
                      }
                      className="w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />

                      <label
                      htmlFor="rememberMe"
                      className="ml-2 text-sm text-m2m-text-secondary">

                        Remember me
                      </label>
                    </div>
                    <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">

                      Forgot password?
                    </button>
                  </div>

                  <div className="flex items-start">
                    <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptTerms: e.target.checked
                    })
                    }
                    className="mt-0.5 w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />

                    <label
                    htmlFor="acceptTerms"
                    className="ml-2 text-sm text-m2m-text-secondary">

                      I accept the{' '}
                      <a
                      href="#"
                      className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">

                        Terms & Conditions
                      </a>
                    </label>
                  </div>

                  <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center">

                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-m2m-text-secondary text-sm">
                    Don't have an account?{' '}
                    <Link
                    to="/signup"
                    className="text-m2m-accent-blue hover:text-m2m-accent-teal font-semibold transition-colors">

                      Sign Up
                    </Link>
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-m2m-divider">
                  <div className="flex items-center justify-center mb-3">
                    <ShieldCheckIcon className="w-4 h-4 text-m2m-accent-blue mr-2" />
                    <p className="text-xs text-m2m-text-secondary">
                      Secured by enterprise-grade encryption
                    </p>
                  </div>
                  <p className="text-xs text-m2m-text-secondary text-center">
                    Demo accounts auto-fill when you select Account Type
                  </p>
                </div>
              </motion.div> :

            <motion.div
              key="forgot-password"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              transition={{
                duration: 0.3
              }}>

                {!forgotPasswordSent ?
              <>
                    <button
                  onClick={resetForgotPassword}
                  className="mb-6 flex items-center text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors">

                      <ArrowLeftIcon className="w-5 h-5 mr-2" />
                      Back to Sign In
                    </button>

                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-m2m-text-primary mb-2">
                        Forgot Password?
                      </h2>
                      <p className="text-m2m-text-secondary">
                        Enter your email and we'll send you a reset link.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-m2m-text-secondary" />
                          <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) =>
                        setForgotPasswordEmail(e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-m2m-divider bg-m2m-bg-card text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue focus:border-transparent transition-all placeholder-m2m-text-secondary"
                        placeholder="Enter your email"
                        required />

                        </div>
                      </div>

                      <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50">

                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </form>
                  </> :

              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                className="text-center">

                    <div className="w-20 h-20 bg-m2m-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-10 h-10 text-m2m-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                      Check Your Email
                    </h2>
                    <p className="text-m2m-text-secondary mb-6">
                      We've sent a password reset link to{' '}
                      <strong>{forgotPasswordEmail}</strong>
                    </p>
                    <button
                  onClick={resetForgotPassword}
                  className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all">

                      Back to Sign In
                    </button>
                  </motion.div>
              }
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>);

}