import React, { useState, useEffect } from 'react';
import { Palmtree, Phone, Sparkles, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenEstimate: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenEstimate,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'About Us', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Service Areas', id: 'service-areas' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
            <Palmtree className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <span
              className={`text-xl font-extrabold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              VERDANT<span className="text-emerald-500">COAST</span>
            </span>
            <span className="block text-[10px] tracking-[0.25em] font-semibold text-emerald-500 uppercase -mt-1">
              Florida Outdoor Living
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-medium transition-colors cursor-pointer hover:text-emerald-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-400/50'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Click to Call */}
          <a
            href="tel:8005553552"
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-emerald-600 hover:text-emerald-700'
            }`}
          >
            <Phone className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>(800) 555-FL-LANDSCAPE</span>
          </a>

          {/* Get Free Estimate CTA */}
          <button
            onClick={onOpenEstimate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Free Estimate</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border ${
              darkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-4 pb-6 mt-3 border-b shadow-2xl transition-all ${
            darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-base font-semibold py-2 px-3 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-800/40 flex flex-col gap-3">
              <a
                href="tel:8005553552"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-slate-200 font-bold text-sm border border-slate-800"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call (800) 555-FL-LANDSCAPE</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimate();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free 3D Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
