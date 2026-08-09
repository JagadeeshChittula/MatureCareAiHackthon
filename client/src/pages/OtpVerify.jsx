import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import Toast from '../components/Toast';
import { KeyRound, CheckCircle2, RotateCcw, ShieldCheck, Mail, Sparkles } from 'lucide-react';

const OtpVerify = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = searchParams.get('email') || '';
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown

  // Smart Dev OTP Preview Box (Appears ONLY if email was not delivered via SMTP)
  const [devOtpPreview, setDevOtpPreview] = useState(() => {
    const previewFromState = location.state?.devOtpPreview;
    const previewFromQuery = searchParams.get('otpPreview');
    return previewFromState || previewFromQuery || null;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setToast(null);

    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setToast({ type: 'error', message: 'Please enter a complete 6-digit OTP code.' });
      return;
    }

    if (!email) {
      setToast({ type: 'error', message: 'Email address is missing.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/verify-otp', {
        email: email.trim().toLowerCase(),
        otp: fullOtp,
      });

      if (res.data.success) {
        setToast({
          type: 'success',
          message: 'Account verified successfully! Redirecting to Login...',
        });
        setTimeout(() => {
          navigate(`/login?email=${encodeURIComponent(email)}`);
        }, 1200);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'OTP Verification failed. Please check the code.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setToast({ type: 'error', message: 'Email is required to resend OTP.' });
      return;
    }

    setResendLoading(true);
    setToast(null);

    try {
      const res = await API.post('/auth/resend-otp', { email: email.trim().toLowerCase() });
      if (res.data.success) {
        setToast({
          type: 'success',
          message: res.data.message || 'Fresh OTP code generated!',
        });
        setTimeLeft(600);
        if (res.data.devOtpPreview) {
          setDevOtpPreview(res.data.devOtpPreview);
        } else {
          setDevOtpPreview(null);
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to resend OTP.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-xl shadow-cyan-500/10">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-white">Verify 6-Digit OTP</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the verification code for <br />
            <span className="font-semibold text-cyan-400">{email || 'your email'}</span>
          </p>
        </div>

        {/* Smart UI OTP Display Box (Shows when email delivery fails / placeholder mode) */}
        {devOtpPreview && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-indigo-950/80 to-slate-900 border border-cyan-500/50 text-center shadow-xl shadow-cyan-500/10 animate-fade-in">
            <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Security Verification Code
            </div>
            <p className="text-3xl font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300">
              {devOtpPreview}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Email delivery is unavailable, so this code is shown on-screen for verification.
            </p>
          </div>
        )}

        {/* Card Form */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-6">
            
            {/* Email field if not provided in URL */}
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

            {/* 6-Digit Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 text-center">
                6-Digit Security Code
              </label>
              <div className="flex justify-between items-center gap-2 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold text-cyan-400 bg-slate-900 border border-slate-700 rounded-xl focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition"
                  />
                ))}
              </div>
            </div>

            {/* Timer countdown */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Single-use Code
              </span>
              <span className={`font-mono font-bold ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
                Expires in: {formatTime(timeLeft)}
              </span>
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
                  Verify OTP & Activate Account
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Resend OTP */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Didn't receive code?</span>
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="flex items-center gap-1 font-bold text-cyan-400 hover:underline disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OtpVerify;
