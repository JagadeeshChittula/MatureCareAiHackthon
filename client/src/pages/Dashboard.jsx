import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Toast from '../components/Toast';
import {
  User,
  Mail,
  CheckCircle2,
  FileCode,
  ExternalLink,
  PlusCircle,
  Trash2,
  Users,
  Award,
  BookOpen,
  Sparkles,
  Video,
  Copy,
  Check,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [entryData, setEntryData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const fetchMyEntry = async () => {
    try {
      const res = await API.get('/hackathon/my-entry');
      if (res.data.success) {
        setIsRegistered(res.data.registered);
        setEntryData(res.data.registration);
      }
    } catch (err) {
      console.error('[Fetch Entry Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEntry();
  }, []);

  const handleCopyLink = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeleteEntry = async () => {
    if (!entryData?._id) return;
    if (!window.confirm('Are you sure you want to delete your hackathon registration?')) {
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await API.delete(`/hackathon/${entryData._id}`);
      if (res.data.success) {
        setToast({ type: 'success', message: 'Registration entry deleted successfully.' });
        setIsRegistered(false);
        setEntryData(null);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete registration.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* User Header Profile Badge */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-cyan-500/20">
            {user?.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{user?.fullName}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Account
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isRegistered && (
            <Link
              to="/registration"
              className="px-6 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              Register Now
            </Link>
          )}
        </div>

      </div>

      {/* Registered Event Overview */}
      {isRegistered && entryData ? (
        
        <div className="space-y-8">
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-400" />
              Hackathon Event Registration
            </h2>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Confirmed Entry
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Main Project Info */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
                
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      {entryData.domainTrack}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-3">{entryData.projectName}</h3>
                  </div>
                  <div className="text-xs text-slate-400">
                    Submitted: {new Date(entryData.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Academic Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-medium block">College / Institute</span>
                    <span className="text-white font-semibold truncate block mt-1">{entryData.collegeName}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-medium block">Course</span>
                    <span className="text-white font-semibold block mt-1">{entryData.course}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-medium block">Branch</span>
                    <span className="text-white font-semibold block mt-1">{entryData.branch}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-medium block">Year of Study</span>
                    <span className="text-white font-semibold block mt-1">{entryData.yearOfStudy}</span>
                  </div>
                </div>

                {/* Asset Links with Copy Buttons */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Project Assets</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <a
                        href={entryData.pptLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-semibold text-slate-200 hover:text-cyan-400 transition truncate mr-2"
                      >
                        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">PPT Link</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <button
                        onClick={() => handleCopyLink(entryData.pptLink, 'ppt')}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Copy Link"
                      >
                        {copiedField === 'ppt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <a
                        href={entryData.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-semibold text-slate-200 hover:text-emerald-400 transition truncate mr-2"
                      >
                        <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">Prototype Link</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <button
                        onClick={() => handleCopyLink(entryData.prototypeLink, 'prototype')}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Copy Link"
                      >
                        {copiedField === 'prototype' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {entryData.demoVideoLink && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between sm:col-span-2">
                        <a
                          href={entryData.demoVideoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-semibold text-slate-200 hover:text-purple-400 transition truncate mr-2"
                        >
                          <Video className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">Demo Video Link</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                        <button
                          onClick={() => handleCopyLink(entryData.demoVideoLink, 'video')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Copy Link"
                        >
                          {copiedField === 'video' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>

            </div>

            {/* Right Col: Team Roster & Options */}
            <div className="space-y-6">
              
              <div className="p-7 rounded-3xl glass-panel border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Team Composition ({entryData.teamSize} Member{entryData.teamSize > 1 ? 's' : ''})
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Lead Member */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        {entryData.fullName}
                        <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold">Leader</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{entryData.email}</div>
                    </div>
                  </div>

                  {/* Dynamic Members */}
                  {entryData.teamMembers && entryData.teamMembers.length > 0 ? (
                    entryData.teamMembers.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="font-semibold text-slate-200">Member #{idx + 2}: {m.name}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{m.email}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 text-xs py-2 italic text-center">Solo Team Participant</div>
                  )}

                </div>
              </div>

              {/* Delete Entry Box */}
              <div className="p-6 rounded-3xl glass-panel border border-rose-500/20 bg-rose-950/10 space-y-3">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Registration Options</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Need to make modifications or cancel your submission? You can delete this registration entry and resubmit a new one.
                </p>
                <button
                  onClick={handleDeleteEntry}
                  disabled={deleteLoading}
                  className="w-full py-3 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  {deleteLoading ? 'Deleting...' : 'Delete Hackathon Entry'}
                </button>
              </div>

            </div>

          </div>

        </div>

      ) : (

        /* UNREGISTERED STATE */
        <div className="p-10 sm:p-14 rounded-3xl glass-panel border border-cyan-500/30 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-white">No Active Hackathon Registration</h2>
            <p className="text-sm text-slate-400">
              You haven't submitted your team registration for the MatruCare AI National Hackathon 2026 yet.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
            >
              Register Now for Hackathon
              <PlusCircle className="w-5 h-5 text-slate-950" />
            </Link>
          </div>
        </div>

      )}

    </div>
  );
};

export default Dashboard;
