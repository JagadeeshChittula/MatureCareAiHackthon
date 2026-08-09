import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Official Brief & Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About MatruCare AI Hackathon 2026</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Full Stack Developer Track • Internship Programme Specification
        </p>
      </div>

      {/* Program Overview */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <Award className="w-6 h-6 text-cyan-400" />
          Project Overview
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Participants are required to design and develop a fully functional <strong>Hackathon Registration Portal</strong> using the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js) with complete CRUD operations. The platform allows participants to register, verify identity via OTP, log in to a personal dashboard, and register for a hackathon event with full team management. Confirmation emails must be sent via Nodemailer from <strong className="text-cyan-400">matrucareai@gmail.com</strong>.
        </p>
      </div>

      {/* Evaluation Criteria Table */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-emerald-400" />
            Evaluation Criteria Breakdown (Total: 100 Marks)
          </h2>
          <p className="text-slate-400 text-xs mt-1">Official evaluation metric as published in assignment brief.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                <th className="py-3.5 px-4 font-bold">Criteria</th>
                <th className="py-3.5 px-4 font-bold">Description</th>
                <th className="py-3.5 px-4 font-bold text-right">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Functional Completeness</td>
                <td className="py-4 px-4 text-xs text-slate-400">All flows working end-to-end (Signup → OTP → Login → Dashboard → Registration → Confirmation)</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">30</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Code Quality & Structure</td>
                <td className="py-4 px-4 text-xs text-slate-400">Clean folder structure (/client & /server), well-commented code, camelCase naming conventions</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">20</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">UI/UX Design & Responsiveness</td>
                <td className="py-4 px-4 text-xs text-slate-400">Modern layout, dark mode aesthetic, micro-animations, fully responsive mobile & desktop</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">20</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Authentication & Security</td>
                <td className="py-4 px-4 text-xs text-slate-400">JWT route guards, bcrypt password hashing, 10-minute OTP expiration & single-use invalidation</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">15</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Nodemailer Integration</td>
                <td className="py-4 px-4 text-xs text-slate-400">OTP verification emails and registration confirmation emails from matrucareai@gmail.com</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">10</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">README & Environment Setup</td>
                <td className="py-4 px-4 text-xs text-slate-400">Comprehensive documentation, tech stack, API specs, .env guide</td>
                <td className="py-4 px-4 text-right font-extrabold text-cyan-400">5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules & Guidelines */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          Important Guidelines
        </h2>
        <ul className="space-y-3.5 text-sm text-slate-300">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>Do <strong>NOT</strong> include candidate name or personal information in email templates.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>Always use <strong>MatruCare AI</strong> as sender name and <strong>matrucareai@gmail.com</strong> as the from address.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>All routes except Home, Login, Signup are <strong>protected routes</strong> using JWT middleware guard.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>Passwords are hashed using <strong>bcrypt</strong> before storing in MongoDB. Never store plain-text passwords.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>OTPs are time-limited (expire after 10 minutes) and invalidated after first use.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default About;
