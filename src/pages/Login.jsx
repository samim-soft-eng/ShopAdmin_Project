import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  ShoppingBag,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { DEMO_CREDENTIALS, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // If user is already authenticated, redirect to dashboard or intended page
  const from = location.state?.from?.pathname || '/dashboard';
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const result = login(email, password, rememberMe);

    if (!result.success) {
      if (result.field === 'email') {
        setFormErrors({ email: result.error });
      } else if (result.field === 'password') {
        setFormErrors({ password: result.error });
      } else {
        setFormErrors({ general: result.error });
      }
      toastError(result.error);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success(`Welcome back, ${result.user.name}!`);
      navigate(from, { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      {/* LEFT SECTION: Premium SaaS Branding (Hidden on small mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden text-white">
        {/* Subtle decorative glow overlays */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                Shop<span className="text-primary-light">Admin</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-primary text-white rounded-md tracking-wider">
                ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              E-Commerce Management Platform
            </p>
          </div>
        </div>

        {/* Middle Feature Hero Banner */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Next-Gen Dashboard & Inventory Suite</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            Manage your products, orders & cart in real-time.
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Experience complete administrative control with persistent shopping cart management, accurate GST & discount calculation, real-time activity tracking, and seamless order dispatch.
          </p>

          {/* Quick value props list */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time Cart Calculations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant LocalStorage Sync</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Search, Filter & Price Sort</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Checkout & Orders History</span>
            </div>
          </div>
        </div>

        {/* Bottom Security / Trust Notice */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Client-Side Demo Session</span>
          </div>
          <span>ShopAdmin v2.4</span>
        </div>
      </div>

      {/* RIGHT SECTION: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card-hover">
          {/* Mobile Brand Identity */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Shop<span className="text-primary">Admin</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              Enter your credentials below to access the management dashboard.
            </p>
          </div>

          {/* Demo Login Quick-Fill Helper Banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-primary shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-primary">Demo Account:</span>
                <span className="block text-[11px] text-slate-500">
                  {DEMO_CREDENTIALS.email} &bull; {DEMO_CREDENTIALS.password}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-primary hover:text-primary-hover bg-white hover:bg-indigo-50/50 px-2.5 py-1.5 rounded-lg border border-indigo-200 transition-colors shadow-xs shrink-0"
            >
              Fill Demo
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors((p) => ({ ...p, email: null, general: null }));
              }}
              error={formErrors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter at least 6 characters"
              icon={Lock}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormErrors((p) => ({ ...p, password: null, general: null }));
              }}
              error={formErrors.password}
              required
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 text-slate-600 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span>Remember me on this device</span>
              </label>

              <span className="text-slate-400 text-xs hover:text-slate-600 cursor-pointer">
                Demo Auth Mode
              </span>
            </div>

            {/* General form error if any */}
            {formErrors.general && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {formErrors.general}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full shadow-md shadow-primary/25"
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
            By signing in, you agree to ShopAdmin Terms of Service and Privacy Policy. Session persisted in local storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
