import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, Code, Cpu, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <span className="font-extrabold text-lg text-white">MatruCare <span className="text-cyan-400">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering next-gen innovators through healthcare & AI engineering. Official Hackathon Registration Portal — Internship Programme.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">Home Landing</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">About Event & Tracks</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-cyan-400 transition">Participant Signup</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition">Participant Login</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">Help & Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tracks */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Innovation Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> AI & Machine Learning</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Web & Full Stack Dev</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Internet of Things (IoT)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Cyber Security & Web3</li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Official Contact</h4>
            <div className="p-4 rounded-xl glass-panel space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:matrucareai@gmail.com" className="font-semibold text-cyan-400 hover:underline">
                  matrucareai@gmail.com
                </a>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                Nodemailer confirmation emails & verification OTPs are dispatched strictly from this address.
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 MatruCare AI Internship Programme. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition">Privacy Policy</span>
            <span className="hover:text-slate-300 transition">Terms of Service</span>
            <span className="hover:text-slate-300 transition">Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
