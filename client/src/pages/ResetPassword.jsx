import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import Toast from '../components/Toast';
import { Lock, KeyRound, CheckCircle2, ShieldCheck, Mail, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = searchParams.get('email') || '';
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [devOtpPreview] = useState(() => {
    const previewFromState = location.state?.devOtpPreview;
    const previewFromQuery = searchParams.get('otpPreview');
    return previewFromState || previewFromQuery || null;
  });

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = async () => {
    if (!email) {
      setToast({ type: 'error', message: 'Email is required to resend the reset code.' });
      return;
    }

    setResendLoading(true);
    setToast(null);

    try {
      const res = await API.post('/auth/forgot-password', { email: email.trim().toLowerCase() });
      if (res.data.success) {
        setToast({
          type: 'success',
          message: res.data.message || 'Fresh reset code generated!',
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to resend reset code.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setToast({ type: 'error', message: 'Please enter the complete 6-digit reset code.' });
      return;
    }

    if (!email) {
      setToast({ type: 'error', message: 'Email address is required.' });
      return;
    }

    if (newPassword.length < 6) {
      setToast({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/reset-password', {
        email: email.trim().toLowerCase(),
        otp: fullOtp,
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        setToast({
          type: 'success',
          message: 'Password reset successfully! Redirecting to Login...',
        });
        setTimeout(() => {
          navigate(`/login?email=${encodeURIComponent(email)}`);
        }, 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Password reset failed. Please check your reset code.';
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-xl shadow-cyan-500/10">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-white">Set New Password</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the 6-digit reset code sent to <br />
            <span className="font-semibold text-cyan-400">{email || 'your email'}</span>
          </p>
        </div>

        {devOtpPreview && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-indigo-950/80 to-slate-900 border border-cyan-500/50 text-center shadow-xl shadow-cyan-500/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Password Reset Code
            </div>
            <p className="text-3xl font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300">
              {devOtpPreview}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Email delivery is unavailable, so this code is shown on-screen for reset verification.
            </p>
          </div>
        )}

        {/* Card Form */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email if missing */}
            {!initialEmail && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Registered Email
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
            )}

            {/* 6-Digit OTP */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 text-center">
                6-Digit Reset Code
              </label>
              <div className="flex justify-between items-center gap-2 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`reset-otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold text-purple-400 bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition"
                  />
                ))}
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Reset Password & Sign In
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Didn't receive code?</span>
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="flex items-center gap-1 font-bold text-cyan-400 hover:underline disabled:opacity-50"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
