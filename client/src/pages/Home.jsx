import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  ChevronUp,
  Activity,
  Globe,
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  // Active track state for interactive domain explorer
  const [activeTrack, setActiveTrack] = useState('ai');

  // FAQ accordion open index state
  const [openFaq, setOpenFaq] = useState(0);

  // Live countdown timer target (30 days from issued date)
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tracksData = {
    ai: {
      title: 'AI / Machine Learning',
      icon: Cpu,
      color: 'cyan',
      description: 'Predictive health models, computer vision diagnostic tools, NLP medical assistants, and intelligent automation algorithms.',
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'FastAPI'],
      prize: '₹1,50,000 + Direct MatruCare AI Internship Referral',
      sampleProjects: ['Early Cancer Detector', 'Radiology Image Analyzer', 'AI Triage Assistant'],
    },
    web: {
      title: 'Web & Full Stack Dev',
      icon: Code2,
      color: 'emerald',
      description: 'Scalable MERN web applications, interactive clinical dashboards, responsive patient portals, and RESTful API integrations.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      prize: '₹1,00,000 + MERN Developer Internship Role',
      sampleProjects: ['Telemedicine Portal', 'Hospital Queue Tracker', 'EHR Management System'],
    },
    iot: {
      title: 'Internet of Things (IoT)',
      icon: Layers,
      color: 'purple',
      description: 'Wearable telemetry sensors, smart medical device integrations, real-time vital monitoring, and edge data processing.',
      techStack: ['Arduino', 'Raspberry Pi', 'MQTT', 'Node.js', 'WebSockets'],
      prize: '₹75,000 + Hardware Grant & Internship Role',
      sampleProjects: ['Remote ECG Monitor', 'Smart Pill Dispenser', 'ICU Vital Telemetry Device'],
    },
    cyber: {
      title: 'Cyber Security',
      icon: ShieldCheck,
      color: 'rose',
      description: 'Zero-trust patient data security, end-to-end medical encryption, vulnerability assessment tools, and HIPAA compliance layers.',
      techStack: ['Cryptography', 'OAuth2', 'JWT', 'Penetration Testing', 'Node.js Security'],
      prize: '₹75,000 + Security Auditor Role',
      sampleProjects: ['Encrypted EHR Vault', 'HIPAA Audit Scanner', 'Biometric Auth Gateway'],
    },
    blockchain: {
      title: 'Blockchain & Web3',
      icon: Award,
      color: 'amber',
      description: 'Decentralized health record verification, immutable patient consent logs, smart contracts, and verifiable credentials.',
      techStack: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS', 'Hardhat'],
      prize: '₹75,000 + Web3 Research Grant',
      sampleProjects: ['Decentralized Consent Registry', 'Pharma Supply Chain Tracker', 'Medical NFT Badges'],
    },
    open: {
      title: 'Open Innovation',
      icon: Zap,
      color: 'sky',
      description: 'Bring your own bold technical solution or startup MVP addressing critical real-world healthcare and engineering challenges.',
      techStack: ['Full Stack MERN', 'Flutter', 'Cloud Architecture', 'Python'],
      prize: '₹50,000 + Incubator Mentorship',
      sampleProjects: ['Mental Health Companion App', 'Organ Donation Network', 'AI Diagnostic Chatbot'],
    },
  };

  const faqData = [
    {
      q: 'Who is eligible to participate in the MatruCare AI Hackathon?',
      a: 'All undergraduate, postgraduate, and diploma engineering / computer science students across India are eligible to register.',
    },
    {
      q: 'What is the permitted team size?',
      a: 'Teams can range from 1 member (solo participant) up to 5 members. Dynamic team member fields will automatically expand based on your Team Size selection.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'No! Registration is 100% free for all students.',
    },
    {
      q: 'How does identity verification work?',
      a: 'When you sign up, a custom 6-digit OTP is generated with a 10-minute expiry and sent via Nodemailer from matrucareai@gmail.com.',
    },
    {
      q: 'What links are required in the submission form?',
      a: 'You must provide your Project Name, Google Drive / OneDrive PPT Link, and GitHub / Figma / Live Prototype Link. Demo video link is optional.',
    },
  ];

  return (
    <div className="space-y-28 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 lg:pt-24 overflow-hidden">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-cyan-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
            MatruCare AI Internship Programme • National Track 2026
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl mx-auto">
            Innovate the Future of Healthcare with <br />
            <span className="gradient-text-cyan font-black">
              MatruCare AI Hackathon
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Build high-impact projects, showcase your technical skills, collaborate in teams of 1 to 5 members, and earn fast-track internship roles at <strong className="text-cyan-400 font-semibold">MatruCare AI</strong>.
          </p>

          {/* Countdown Widget */}
          <div className="mt-10 max-w-xl mx-auto p-4 rounded-2xl glass-panel border border-slate-800 shadow-xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Submission Deadline Countdown
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-2xl font-black font-mono text-cyan-400">{timeLeft.days}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Days</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-2xl font-black font-mono text-cyan-400">{timeLeft.hours}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-2xl font-black font-mono text-cyan-400">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Mins</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-2xl font-black font-mono text-emerald-400">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>

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
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 glass-card-interactive hover:text-white transition flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  Login to Portal
                </Link>
              </>
            )}
          </div>

          {/* Metric Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl glass-card-interactive text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">100% MERN</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Full Stack Architecture</div>
            </div>
            <div className="p-5 rounded-2xl glass-card-interactive text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1 - 5</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Dynamic Team Members</div>
            </div>
            <div className="p-5 rounded-2xl glass-card-interactive text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">Nodemailer</div>
              <div className="text-xs text-slate-400 font-medium mt-1">6-Digit OTP Verification</div>
            </div>
            <div className="p-5 rounded-2xl glass-card-interactive text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Fast-Track</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Internship Opportunities</div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE DOMAIN TRACKS EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Interactive Tracks Explorer
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight sm:text-4xl">
            Choose Your Specialized Track
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            Click on any domain track tab to explore track descriptions, recommended tech stacks, sample projects, and prize pools.
          </p>
        </div>

        {/* Track Tabs Header */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {Object.keys(tracksData).map((key) => {
            const track = tracksData[key];
            const Icon = track.icon;
            const isSelected = activeTrack === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTrack(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition duration-200 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 transform scale-105'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {track.title}
              </button>
            );
          })}
        </div>

        {/* Selected Track Detail Card */}
        {activeTrack && (
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    {React.createElement(tracksData[activeTrack].icon, { className: 'w-6 h-6' })}
                  </div>
                  <h3 className="text-2xl font-black text-white">{tracksData[activeTrack].title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {tracksData[activeTrack].description}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left md:text-right shrink-0">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Track Prize Pool</span>
                <span className="text-lg font-black text-white">{tracksData[activeTrack].prize}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {tracksData[activeTrack].techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sample Project Concepts</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {tracksData[activeTrack].sampleProjects.map((proj, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      {proj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* EVENT TIMELINE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Event Progression Timeline</h2>
          <p className="text-slate-400 text-sm mt-2">Clear step-by-step roadmap from registration to evaluation.</p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800/80 space-y-8 glass-card-interactive">
          
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

      {/* INTERACTIVE FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl glass-panel border border-slate-800 overflow-hidden transition">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-base font-bold text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl glass-card-interactive">
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
