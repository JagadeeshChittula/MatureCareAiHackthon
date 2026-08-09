import React, { useState } from 'react';
import API from '../services/api';
import Toast from '../components/Toast';
import { Mail, Send, User, MessageSquare, MapPin, Phone, Shield, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!formData.name || !formData.email || !formData.message) {
      setToast({ type: 'error', message: 'All fields (Name, Email, Message) are required.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        setToast({
          type: 'success',
          message: res.data.message || 'Message dispatched to matrucareai@gmail.com!',
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please try again.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Official Support & Inquiries
        </span>
        <h1 className="text-4xl font-extrabold text-white">Contact MatruCare AI</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base">
          Have questions about your hackathon submission, team registration, or OTP verification? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Contact Cards */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Official Email Address</h4>
              <a href="mailto:matrucareai@gmail.com" className="text-sm font-semibold text-cyan-400 hover:underline">
                matrucareai@gmail.com
              </a>
              <p className="text-xs text-slate-400 mt-1">
                Monitored 24/7 by the MatruCare AI Internship Organizing Committee.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Automated OTP Dispatch</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                All 6-digit OTP codes and registration confirmations are dispatched automatically via Nodemailer from <strong className="text-slate-300">matrucareai@gmail.com</strong>.
              </p>
            </div>
          </div>

        </div>

        {/* Right 2 Columns: Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
            
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Send Us a Message
            </h3>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Your Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Your Email Address <span className="text-rose-400">*</span>
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

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your inquiry or question in detail..."
                required
                className="w-full p-4 rounded-xl glass-input text-sm"
              ></textarea>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Dispatch Message to matrucareai@gmail.com
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
