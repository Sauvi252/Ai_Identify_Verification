
import React from 'react';
import { NAV_LINKS } from '../constants';
import { Page } from '../types';
import { LogoIcon } from './icons';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo, onLogout }) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigateTo('home')} className="flex items-center space-x-3 group">
          <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
            <LogoIcon className="h-6 w-6 text-emerald-400" />
          </div>
          <span className="text-2xl font-bold text-slate-100 tracking-tight">Veri<span className="text-emerald-400">Secure</span></span>
        </button>
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigateTo(link.page)}
              className={`relative text-slate-400 hover:text-emerald-300 transition-colors duration-200 font-medium pb-1 text-sm uppercase tracking-wider
                ${currentPage === link.page ? 'text-emerald-400' : ''}
              `}
            >
              {link.name}
              {currentPage === link.page && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
        <button 
            onClick={onLogout}
            className="bg-slate-800 text-slate-300 font-semibold px-5 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/50 transition-all duration-200 flex items-center space-x-2 text-sm"
        >
            <span>Sign Out</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
