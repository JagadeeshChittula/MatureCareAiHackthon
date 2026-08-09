import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Cpu, LogOut, LayoutDashboard, Sparkles, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/60 bg-[#060913]/85 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition duration-300">
              <div className="w-full h-full bg-[#080c14] rounded-[9.5px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition">
                  MatruCare
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-black text-xl">
                  AI
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
                Hackathon Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive('/') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive('/about') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive('/contact') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5 ${
                    isActive('/dashboard') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/60 transition border border-slate-700/80 hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Signup
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 bg-[#0a0f1d]">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium ${
              isActive('/') ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium ${
              isActive('/about') ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium ${
              isActive('/contact') ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Contact
          </Link>

          {isAuthenticated ? (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive('/dashboard') ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Dashboard ({user?.fullName})
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-rose-400 hover:bg-rose-500/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-2 border-t border-slate-800">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 border border-slate-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400"
              >
                Signup Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
