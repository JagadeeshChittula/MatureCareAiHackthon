import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Users,
  Code2,
  Calendar,
  Zap,
  CheckCircle,
  Clock,
  Award,
  Layers,
  HelpCircle,
  Cpu,
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-28 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 lg:pt-24 overflow-hidden">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/15 to-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            MatruCare AI Internship Programme • National Track 2026
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl mx-auto">
            Innovate the Future of Healthcare with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              MatruCare AI Hackathon
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Build high-impact projects, showcase your technical skills, collaborate in teams of 1 to 5 members, and earn fast-track internship roles at <strong className="text-cyan-400 font-semibold">MatruCare AI</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                Open Participant Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 glass-card hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  Login to Portal
                </Link>
              </>
            )}
          </div>

          {/* Metric Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl glass-panel text-center border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">100% MERN</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Full Stack Architecture</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel text-center border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1 - 5</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Dynamic Team Members</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel text-center border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">Nodemailer</div>
              <div className="text-xs text-slate-400 font-medium mt-1">6-Digit OTP Verification</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel text-center border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Fast-Track</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Internship Opportunities</div>
            </div>
          </div>

        </div>
      </section>

      {/* DOMAIN TRACKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Focus Areas
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight sm:text-4xl">
            Hackathon Innovation Tracks
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            Choose your specialization domain and engineer solutions to real-world healthcare & engineering problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-cyan-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI / Machine Learning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predictive health models, computer vision diagnostic tools, NLP medical assistants, and intelligent automation algorithms.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-emerald-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Web & Full Stack Dev</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scalable MERN web applications, interactive clinical dashboards, responsive patient portals, and RESTful API integrations.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-purple-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Internet of Things (IoT)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wearable telemetry sensors, smart medical device integrations, real-time vital monitoring, and edge data processing.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-rose-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cyber Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-trust patient data security, end-to-end medical encryption, vulnerability assessment tools, and HIPAA compliance layers.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-amber-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Blockchain & Web3</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decentralized health record verification, immutable patient consent logs, smart contracts, and verifiable credentials.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-panel border border-slate-800/80 hover:border-sky-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Open Innovation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bring your own bold technical solution or startup MVP addressing critical real-world healthcare and engineering challenges.
            </p>
          </div>

        </div>
      </section>

      {/* EVENT TIMELINE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Event Progression Timeline</h2>
          <p className="text-slate-400 text-sm mt-2">Clear step-by-step roadmap from registration to evaluation.</p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800/80 space-y-8">
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step 1 — Signup & Verification</div>
              <h4 className="text-base font-bold text-white mt-1">Account Creation & 6-Digit OTP Check</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Fill out the signup form. An automated 6-digit OTP is dispatched via Nodemailer from <strong className="text-slate-300">matrucareai@gmail.com</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 2 — Hackathon Registration</div>
              <h4 className="text-base font-bold text-white mt-1">Project & Dynamic Team Submission</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Log in to your Dashboard, select Team Size (1 to 5), enter team members, submit your PPT link, prototype link, and optional demo video.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 3 — Confirmation & Evaluation</div>
              <h4 className="text-base font-bold text-white mt-1">Instant Email Receipt & Jury Review</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Receive an official registration receipt email. The MatruCare AI evaluation committee reviews submitted prototypes and code repos.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Submit Your Hackathon Entry?
          </h2>
          <p className="mt-3 text-slate-300 max-w-lg mx-auto text-sm">
            Join participants across India. Create your account and complete your team submission today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 transition transform hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
