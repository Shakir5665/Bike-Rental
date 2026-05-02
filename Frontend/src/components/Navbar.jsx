import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bike, User, LayoutDashboard, History } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-400">
          <Bike size={32} />
          <span>EcoRide</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/browse" 
            className={`flex items-center gap-1 transition-colors ${isActive('/browse') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
          >
            Browse
          </Link>
          {user && (
            <Link 
              to="/my-rentals" 
              className={`flex items-center gap-1 transition-colors ${isActive('/my-rentals') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
            >
              My Rentals
            </Link>
          )}
          <Link 
            to="/admin" 
            className={`flex items-center gap-1 transition-colors ${isActive('/admin') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
          >
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-slate-400">Hello, <span className="text-white font-medium">{user.name}</span></span>
              <button 
                onClick={logout}
                className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <User size={18} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
