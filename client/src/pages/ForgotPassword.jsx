import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Toast from '../components/Toast';
import { Mail, KeyRound, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setToast({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password', {
        email: email.trim().toLowerCase(),
      });

      if (res.data.success) {
        const nextMessage = res.data.emailDelivered
          ? res.data.message || 'Password reset OTP sent to your email!'
          : `${res.data.message || 'Reset code generated for testing.'} Use the code shown on the next screen.`;

        setToast({
          type: 'success',
          message: nextMessage,
        });
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`, {
            state: { devOtpPreview: res.data.devOtpPreview },
          });
        }, 1200);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to request password reset.';
      setToast({ type: 'error', message: errorMsg });
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4 shadow-xl shadow-purple-500/10">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-white">Forgot Password?</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your registered email address to receive a 6-digit reset code
          </p>
        </div>

        {/* Card Form */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 hover:from-purple-300 hover:to-cyan-300 shadow-xl shadow-purple-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Send Reset OTP Code
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Remembered your password?{' '}
            <Link to="/login" className="font-bold text-cyan-400 hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
