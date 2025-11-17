import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { XIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon, CheckCircleIcon, ArrowLeftIcon, MailIcon, CheckIcon, CameraIcon } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}
// Demo account credentials
const DEMO_CREDENTIALS = {
  business: {
    email: '',
    password: ''
  },
  supplier: {
    email: 'reyjhon@gmail.com',
    password: '12345'
  },
  admin: {
    email: 'admin@lantaw.ai',
    password: '12345'
  }
};
export default function AuthModal({
  mode,
  onClose,
  onSwitchMode
}: AuthModalProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    accountType: 'business' as 'business' | 'supplier' | 'admin',
    rememberMe: false,
    acceptTerms: false
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'business' as 'business' | 'supplier' | 'admin',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const {
    login,
    register
  } = useAuth();
  const navigate = useNavigate();
  // Auto-fill credentials when account type changes (only for login mode)
  useEffect(() => {
    if (mode === 'login' && !showForgotPassword) {
      const credentials = DEMO_CREDENTIALS[loginData.accountType];
      setLoginData(prev => ({
        ...prev,
        email: credentials.email,
        password: credentials.password
      }));
    }
  }, [loginData.accountType, mode, showForgotPassword]);
  const accountTypes = [{
    value: 'business',
    label: 'Business User'
  }, {
    value: 'supplier',
    label: 'Supplier'
  }, {
    value: 'admin',
    label: 'Administrator'
  }];
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
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
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.acceptTerms) {
      toast.error('Please accept the Terms & Conditions to continue');
      return;
    }
    setLoading(true);
    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        if (loginData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedEmail', loginData.email);
        }
        setLoading(false);
        setShowSuccessAnimation(true);
        toast.success('Login successful!');
        // Wait for animation then navigate
        setTimeout(() => {
          onClose();
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
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (!/[A-Z]/.test(registerData.password)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[0-9]/.test(registerData.password)) {
      toast.error('Password must contain at least one number');
      return;
    }
    setLoading(true);
    try {
      const success = await register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        role: 'business'
      });
      if (success) {
        setLoading(false);
        setShowSuccessAnimation(true);
        toast.success('Registration successful!');
        // Wait for animation then navigate
        setTimeout(() => {
          onClose();
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
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending password reset email
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
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{
      scale: 0.9,
      opacity: 0,
      y: 20
    }} animate={{
      scale: 1,
      opacity: 1,
      y: 0
    }} exit={{
      scale: 0.9,
      opacity: 0,
      y: 20
    }} transition={{
      type: 'spring',
      duration: 0.5,
      bounce: 0.3
    }} className="bg-m2m-bg-card backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-[420px] max-h-[90vh] overflow-y-auto border border-m2m-divider relative">
        {/* Success Animation Overlay */}
        <AnimatePresence>
          {showSuccessAnimation && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 z-50 flex items-center justify-center bg-m2m-bg-card/95 backdrop-blur-sm rounded-2xl">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: 'spring',
            duration: 0.6
          }} className="text-center">
                <motion.div initial={{
              scale: 0
            }} animate={{
              scale: [0, 1.2, 1]
            }} transition={{
              duration: 0.6
            }} className="w-24 h-24 bg-m2m-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-16 h-16 text-m2m-success" />
                </motion.div>
                <motion.h3 initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="text-2xl font-bold text-m2m-text-primary">
                  Welcome!
                </motion.h3>
                <motion.p initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.5
            }} className="text-m2m-text-secondary mt-2">
                  Redirecting to dashboard...
                </motion.p>
              </motion.div>
            </motion.div>}
        </AnimatePresence>

        <div className="p-6 md:p-8">
          <div className="flex justify-end mb-4">
            <motion.button whileHover={{
            scale: 1.1,
            rotate: 90
          }} whileTap={{
            scale: 0.9
          }} onClick={onClose} className="p-2 hover:bg-m2m-bg-primary/50 rounded-lg transition-colors">
              <XIcon className="w-5 h-5 text-m2m-text-secondary" />
            </motion.button>
          </div>
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2,
          type: 'spring',
          bounce: 0.4
        }} className="flex justify-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40">
              <Logo size="lg" showText={false} />
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {mode === 'login' && !showForgotPassword ? <motion.div key="login" initial={{
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
          }}>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-m2m-text-primary">
                  Login
                </h2>
                <p className="text-m2m-text-secondary text-center mb-6 text-sm">
                  Sign in to your intelligent business platform.
                </p>
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Account Type
                    </label>
                    <select value={loginData.accountType} onChange={e => setLoginData({
                  ...loginData,
                  accountType: e.target.value as any
                })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm">
                      {accountTypes.map(type => <option key={type.value} value={type.value}>
                          {type.label}
                        </option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Email Address
                    </label>
                    <input type="email" value={loginData.email} onChange={e => setLoginData({
                  ...loginData,
                  email: e.target.value
                })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={loginData.password} onChange={e => setLoginData({
                    ...loginData,
                    password: e.target.value
                  })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all pr-10 text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Enter your password" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-m2m-text-secondary hover:text-m2m-text-primary">
                        {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id="rememberMe" checked={loginData.rememberMe} onChange={e => setLoginData({
                    ...loginData,
                    rememberMe: e.target.checked
                  })} className="w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />
                      <label htmlFor="rememberMe" className="ml-2 text-xs text-m2m-text-secondary">
                        Remember Me
                      </label>
                    </div>
                    <button type="button" onClick={() => setShowForgotPassword(true)} className="text-xs text-m2m-accent-blue hover:text-m2m-accent-teal transition-colors font-medium">
                      Forgot Password
                    </button>
                  </div>
                  <div className="flex items-start pt-1">
                    <input type="checkbox" id="acceptTermsLogin" checked={loginData.acceptTerms} onChange={e => setLoginData({
                  ...loginData,
                  acceptTerms: e.target.checked
                })} className="mt-0.5 w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />
                    <label htmlFor="acceptTermsLogin" className="ml-2 text-xs text-m2m-text-secondary">
                      I accept the{' '}
                      <a href="#" className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center text-sm mt-5">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
                <div className="mt-5 text-center">
                  <p className="text-m2m-text-secondary text-sm">
                    Don't have an account?{' '}
                    <button onClick={() => onSwitchMode('register')} className="text-m2m-accent-blue hover:text-m2m-accent-teal font-semibold transition-colors">
                      Sign Up
                    </button>
                  </p>
                </div>
                <div className="mt-5 pt-5 border-t border-m2m-divider">
                  <div className="flex items-center justify-center mb-2.5">
                    <ShieldCheckIcon className="w-4 h-4 text-m2m-accent-blue mr-2" />
                    <p className="text-xs text-m2m-text-secondary">
                      Secured by enterprise-grade encryption
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-m2m-text-secondary">
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      ISO 27001
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      GDPR
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      SOC 2
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-m2m-text-secondary">
                    Demo accounts auto-fill when you select Account Type
                  </p>
                </div>
              </motion.div> : mode === 'login' && showForgotPassword ? <motion.div key="forgot-password" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.3
          }}>
                {!forgotPasswordSent ? <>
                    <div className="flex items-center justify-between mb-6">
                      <button onClick={resetForgotPassword} className="p-2 hover:bg-m2m-bg-primary/50 rounded-lg transition-colors text-m2m-accent-blue hover:text-m2m-accent-teal">
                        <ArrowLeftIcon className="w-5 h-5" />
                      </button>
                      <h2 className="text-2xl md:text-3xl font-bold text-m2m-text-primary flex-1 text-center">
                        Forgot Password
                      </h2>
                      <div className="w-9" />
                    </div>
                    <p className="text-m2m-text-secondary text-center mb-6 text-sm">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <input type="email" value={forgotPasswordEmail} onChange={e => setForgotPasswordEmail(e.target.value)} className="w-full px-3.5 py-2.5 pl-10 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Enter your email" required />
                          <MailIcon className="w-5 h-5 text-m2m-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center text-sm">
                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </form>
                    <div className="mt-6 p-4 bg-m2m-accent-blue/10 border border-m2m-accent-blue/20 rounded-lg">
                      <h3 className="text-sm font-semibold text-m2m-text-primary mb-2">
                        Password Reset Process:
                      </h3>
                      <ul className="text-xs text-m2m-text-secondary space-y-1">
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-3 h-3 mr-2 mt-0.5 text-m2m-accent-blue flex-shrink-0" />
                          <span>Verify email address in our system</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-3 h-3 mr-2 mt-0.5 text-m2m-accent-blue flex-shrink-0" />
                          <span>
                            Generate secure reset token (expires in 1 hour)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-3 h-3 mr-2 mt-0.5 text-m2m-accent-blue flex-shrink-0" />
                          <span>Send encrypted link to registered email</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-3 h-3 mr-2 mt-0.5 text-m2m-accent-blue flex-shrink-0" />
                          <span>Validate token and allow password update</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-3 h-3 mr-2 mt-0.5 text-m2m-accent-blue flex-shrink-0" />
                          <span>Invalidate old sessions for security</span>
                        </li>
                      </ul>
                    </div>
                  </> : <motion.div initial={{
              scale: 0.9,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} className="text-center">
                    <div className="w-20 h-20 bg-m2m-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-10 h-10 text-m2m-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-m2m-text-primary mb-2">
                      Check Your Email
                    </h2>
                    <p className="text-m2m-text-secondary mb-6 text-sm">
                      We've sent a password reset link to{' '}
                      <strong>{forgotPasswordEmail}</strong>
                    </p>
                    <div className="bg-m2m-bg-primary/50 rounded-lg p-4 mb-6">
                      <p className="text-xs text-m2m-text-secondary mb-2">
                        Didn't receive the email? Check your spam folder or
                      </p>
                      <button onClick={() => setForgotPasswordSent(false)} className="text-sm text-m2m-accent-blue hover:text-m2m-accent-teal font-medium transition-colors">
                        Try another email address
                      </button>
                    </div>
                    <button onClick={resetForgotPassword} className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all text-sm">
                      Back to Login
                    </button>
                  </motion.div>}
              </motion.div> : <motion.div key="register" initial={{
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
          }}>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-m2m-text-primary">
                  Join NEARBUY
                </h2>
                <p className="text-m2m-text-secondary text-center mb-6 text-sm">
                  Create your account and start discovering opportunities.
                </p>
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-2 text-center">
                      Profile Photo
                    </label>
                    <div className="flex flex-col items-center">
                      {profilePhoto ? <div className="relative">
                          <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-m2m-accent-blue" />
                          <button type="button" onClick={removePhoto} className="absolute -top-2 -right-2 w-8 h-8 bg-m2m-accent-orange text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div> : <label className="w-24 h-24 bg-m2m-bg-primary border-2 border-dashed border-m2m-divider rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-m2m-accent-blue hover:bg-m2m-accent-blue/5 transition-all group">
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          <CameraIcon className="w-8 h-8 text-m2m-text-secondary group-hover:text-m2m-accent-blue transition-colors" />
                          <span className="text-xs text-m2m-text-secondary mt-1 group-hover:text-m2m-accent-blue transition-colors">
                            Upload
                          </span>
                        </label>}
                      <p className="text-xs text-m2m-text-secondary mt-2">
                        Max size: 5MB
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Full Name
                    </label>
                    <input type="text" value={registerData.name} onChange={e => setRegisterData({
                  ...registerData,
                  name: e.target.value
                })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Email Address
                    </label>
                    <input type="email" value={registerData.email} onChange={e => setRegisterData({
                  ...registerData,
                  email: e.target.value
                })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={registerData.password} onChange={e => setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all pr-10 text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Create a password" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-m2m-text-secondary hover:text-m2m-text-primary">
                        {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${registerData.password.length >= 8 ? 'bg-m2m-success' : registerData.password.length > 0 ? 'bg-gray-300' : 'bg-white border-2 border-gray-300'}`}>
                          {registerData.password.length >= 8 && <CheckIcon className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-xs text-m2m-text-secondary flex-1 ml-2">
                          At least 8 characters
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${/[A-Z]/.test(registerData.password) ? 'bg-m2m-success' : registerData.password.length > 0 ? 'bg-gray-300' : 'bg-white border-2 border-gray-300'}`}>
                          {/[A-Z]/.test(registerData.password) && <CheckIcon className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-xs text-m2m-text-secondary flex-1 ml-2">
                          At least one uppercase letter
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${/[0-9]/.test(registerData.password) ? 'bg-m2m-success' : registerData.password.length > 0 ? 'bg-gray-300' : 'bg-white border-2 border-gray-300'}`}>
                          {/[0-9]/.test(registerData.password) && <CheckIcon className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-xs text-m2m-text-secondary flex-1 ml-2">
                          At least one number
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input type={showConfirmPassword ? 'text' : 'password'} value={registerData.confirmPassword} onChange={e => setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value
                  })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all pr-10 text-sm shadow-sm placeholder-m2m-text-secondary" placeholder="Confirm your password" required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-m2m-text-secondary hover:text-m2m-text-primary">
                        {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-m2m-text-primary mb-1.5">
                      Account Type
                    </label>
                    <select value={registerData.accountType} onChange={e => setRegisterData({
                  ...registerData,
                  accountType: e.target.value as any
                })} className="w-full px-3.5 py-2.5 border-2 border-m2m-divider bg-m2m-bg-primary text-m2m-text-primary rounded-lg focus:ring-2 focus:ring-m2m-accent-blue transition-all text-sm shadow-sm">
                      {accountTypes.map(type => <option key={type.value} value={type.value}>
                          {type.label}
                        </option>)}
                    </select>
                  </div>
                  <div className="flex items-start pt-1">
                    <input type="checkbox" id="terms" checked={registerData.agreeToTerms} onChange={e => setRegisterData({
                  ...registerData,
                  agreeToTerms: e.target.checked
                })} className="mt-0.5 w-4 h-4 text-m2m-accent-blue border-m2m-divider rounded focus:ring-m2m-accent-blue" />
                    <label htmlFor="terms" className="ml-2 text-xs text-m2m-text-secondary">
                      I agree to the{' '}
                      <a href="#" className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-m2m-accent-blue hover:text-m2m-accent-teal font-medium">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-m2m-accent-blue to-m2m-accent-teal text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center text-sm mt-5">
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
                <div className="mt-5 text-center">
                  <p className="text-m2m-text-secondary text-sm">
                    Already have an account?{' '}
                    <button onClick={() => onSwitchMode('login')} className="text-m2m-accent-blue hover:text-m2m-accent-teal font-semibold transition-colors">
                      Sign In
                    </button>
                  </p>
                </div>
                <div className="mt-5 pt-5 border-t border-m2m-divider">
                  <div className="flex items-center justify-center mb-2.5">
                    <ShieldCheckIcon className="w-4 h-4 text-m2m-accent-blue mr-2" />
                    <p className="text-xs text-m2m-text-secondary">
                      Secured by enterprise-grade encryption
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-m2m-text-secondary">
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      ISO 27001
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      GDPR
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <CheckCircleIcon className="w-3 h-3 mr-1 text-m2m-success" />
                      SOC 2
                    </span>
                  </div>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>;
}