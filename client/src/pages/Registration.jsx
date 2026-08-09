import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Toast from '../components/Toast';
import {
  User,
  Mail,
  Phone,
  School,
  BookOpen,
  Sparkles,
  FileCode,
  Video,
  Users,
  Send,
  Plus,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

const PREDEFINED_COLLEGES = [
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Madras',
  'National Institute of Technology (NIT) Trichy',
  'BITS Pilani',
  'Delhi Technological University (DTU)',
  'VIT University, Vellore',
  'SRM Institute of Science and Technology',
  'Manipal Institute of Technology',
  'Amity University',
  'Anna University, Chennai',
  'Jawaharlal Nehru Technological University (JNTU)',
  'Other / Custom Institution',
];

const COURSES = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc (Computer Science / IT)', 'M.Sc', 'Other Degree'];
const BRANCHES = ['CSE (Computer Science)', 'IT (Information Tech)', 'ECE (Electronics & Comm)', 'ME (Mechanical)', 'CE (Civil)', 'AI & Data Science', 'Cyber Security', 'Other Branch'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DOMAINS = [
  'AI / Machine Learning',
  'Web Development (Full Stack / MERN)',
  'Internet of Things (IoT)',
  'Cyber Security',
  'Blockchain & Web3',
  'HealthTech & Medical AI',
  'Open Innovation Track',
];

const Registration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: '',
    collegeName: PREDEFINED_COLLEGES[0],
    customCollege: '',
    course: COURSES[0],
    branch: BRANCHES[0],
    yearOfStudy: YEARS[0],
    domainTrack: DOMAINS[0],
    projectName: '',
    pptLink: '',
    prototypeLink: '',
    demoVideoLink: '',
    teamSize: 1,
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Synchronize team members array when teamSize changes
  useEffect(() => {
    const needed = formData.teamSize - 1;
    if (needed <= 0) {
      setTeamMembers([]);
    } else {
      setTeamMembers((prev) => {
        const updated = [...prev];
        if (updated.length < needed) {
          for (let i = updated.length; i < needed; i++) {
            updated.push({ name: '', email: '' });
          }
        } else if (updated.length > needed) {
          return updated.slice(0, needed);
        }
        return updated;
      });
    }
  }, [formData.teamSize]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    // Form validations
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      setToast({ type: 'error', message: 'Full Name must be at least 3 characters long.' });
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      setToast({ type: 'error', message: 'Please enter a valid 10-digit Indian mobile number.' });
      return;
    }

    const finalCollege = formData.collegeName === 'Other / Custom Institution'
      ? formData.customCollege.trim()
      : formData.collegeName;

    if (!finalCollege) {
      setToast({ type: 'error', message: 'Please specify your institution name.' });
      return;
    }

    if (!formData.projectName || formData.projectName.trim().length < 5) {
      setToast({ type: 'error', message: 'Project Name must be at least 5 characters long.' });
      return;
    }

    if (!formData.pptLink || !formData.prototypeLink) {
      setToast({ type: 'error', message: 'PPT Link and Prototype Link are mandatory.' });
      return;
    }

    // Dynamic team validation
    if (formData.teamSize > 1) {
      for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m.name || m.name.trim().length < 2 || !m.email || !/\S+@\S+\.\S+/.test(m.email)) {
          setToast({ type: 'error', message: `Member #${i + 2} name and valid email address are required.` });
          return;
        }
      }
    }

    setLoading(true);

    try {
      const res = await API.post('/hackathon/register', {
        ...formData,
        collegeName: finalCollege,
        teamMembers,
      });

      if (res.data.success) {
        setToast({
          type: 'success',
          message: 'Registration submitted successfully! Confirmation email dispatched from matrucareai@gmail.com.',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Submission failed. Please verify form details.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Title */}
      <div className="text-center mb-10 space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Official Entry Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Hackathon Event Registration</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Complete the form below to submit your team project entry to MatruCare AI.
        </p>
      </div>

      {/* Main Form Formatted into 4 Clean Cards */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* CARD 1: Lead Participant Details */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-xs">
                1
              </div>
              Lead Participant Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Min 3 characters (letters only)</p>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900/90 text-slate-400 cursor-not-allowed border-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">Pre-filled from auth session</p>
            </div>

            {/* Mobile Number */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Mobile Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-xs text-slate-400 font-bold">+91</span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">10-digit Indian mobile number</p>
            </div>

          </div>
        </div>

        {/* CARD 2: Academic Details */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                2
              </div>
              Academic Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* College Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                College / Institute Name <span className="text-rose-400">*</span>
              </label>
              <select
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-950 text-slate-100"
              >
                {PREDEFINED_COLLEGES.map((col, idx) => (
                  <option key={idx} value={col} className="bg-slate-950 text-slate-100">
                    {col}
                  </option>
                ))}
              </select>

              {formData.collegeName === 'Other / Custom Institution' && (
                <input
                  type="text"
                  name="customCollege"
                  value={formData.customCollege}
                  onChange={handleChange}
                  placeholder="Enter exact college name..."
                  required
                  className="w-full mt-3 px-4 py-3 rounded-xl glass-input text-sm"
                />
              )}
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Degree / Course <span className="text-rose-400">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-950 text-slate-100"
              >
                {COURSES.map((c, idx) => (
                  <option key={idx} value={c} className="bg-slate-950">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Branch / Department <span className="text-rose-400">*</span>
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-950 text-slate-100"
              >
                {BRANCHES.map((b, idx) => (
                  <option key={idx} value={b} className="bg-slate-950">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Year of Study */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Year of Study <span className="text-rose-400">*</span>
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-950 text-slate-100"
              >
                {YEARS.map((y, idx) => (
                  <option key={idx} value={y} className="bg-slate-950">
                    {y}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* CARD 3: Project Submission */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-extrabold text-xs">
                3
              </div>
              Project & Asset Links
            </h3>
          </div>

          <div className="space-y-5">
            
            {/* Domain Track */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Domain Track <span className="text-rose-400">*</span>
              </label>
              <select
                name="domainTrack"
                value={formData.domainTrack}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-950 text-slate-100"
              >
                {DOMAINS.map((d, idx) => (
                  <option key={idx} value={d} className="bg-slate-950">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Project Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g. MatruCare AI Smart Health Assistant"
                required
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Min 5 characters</p>
            </div>

            {/* PPT Link */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                PPT Presentation Link <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                name="pptLink"
                value={formData.pptLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/..."
                required
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Google Drive / OneDrive shareable presentation link</p>
            </div>

            {/* Prototype Link */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Prototype Link <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                name="prototypeLink"
                value={formData.prototypeLink}
                onChange={handleChange}
                placeholder="https://github.com/user/repo or Figma link"
                required
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">GitHub repo / Figma mockup / live web demo link</p>
            </div>

            {/* Demo Video Link (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Demo Video Link <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                type="url"
                name="demoVideoLink"
                value={formData.demoVideoLink}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=... or Drive link"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>

          </div>
        </div>

        {/* CARD 4: Dynamic Team Composition */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-xs">
                4
              </div>
              Team Size & Member Entry
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Team Size Select (1 to 5) <span className="text-rose-400">*</span>
              </label>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm bg-slate-950 text-cyan-400 font-bold"
              >
                <option value={1}>1 Member (Solo Participant)</option>
                <option value={2}>2 Members (Leader + 1 Team Member)</option>
                <option value={3}>3 Members (Leader + 2 Team Members)</option>
                <option value={4}>4 Members (Leader + 3 Team Members)</option>
                <option value={5}>5 Members (Leader + 4 Team Members)</option>
              </select>
            </div>

            {/* Dynamic Member Fields */}
            {formData.teamSize > 1 && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  ⚡ <strong>Dynamic Team Fields:</strong> As specified, enter the name and email for each of the {formData.teamSize - 1} additional team members.
                </div>

                {teamMembers.map((member, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Team Member #{idx + 2} Details
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Member Name
                        </label>
                        <input
                          type="text"
                          placeholder="Member Full Name"
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Member Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Member Email Address"
                          value={member.email}
                          onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4.5 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Submit Hackathon Entry
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Registration;
