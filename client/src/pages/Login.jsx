import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Toast from '../components/Toast';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: initialEmail,
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!formData.email || !formData.password) {
      setToast({ type: 'error', message: 'Email and password are required.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (res.data.success) {
        login(res.data.token, res.data.user);
        setToast({ type: 'success', message: 'Login successful. Redirecting to your dashboard...' });
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 600);
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.needsVerification) {
        setToast({
          type: 'warning',
          message: 'Account email is not verified. Redirecting to OTP verification...',
        });
        setTimeout(() => {
          navigate(`/verify-otp?email=${encodeURIComponent(formData.email.trim().toLowerCase())}`);
        }, 1200);
      } else {
        setToast({ type: 'error', message: errorData?.message || 'Invalid email or password.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-xl shadow-cyan-500/20 mb-4">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your Hackathon Dashboard
          </p>
        </div>

        {/* Card Form */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to={formData.email ? `/forgot-password?email=${encodeURIComponent(formData.email)}` : '/forgot-password'}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 rounded-xl glass-input text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-bold text-cyan-400 hover:underline">
              Create a new account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
