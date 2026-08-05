import React from 'react';
import { Palmtree, Phone, Mail, MapPin, Sparkles, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  onNavigate: (sectionId: string) => void;
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onNavigate, onOpenEstimate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`pt-20 pb-12 border-t transition-colors relative ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      
      {/* Emergency Storm Cleanup Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-950 to-green-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                Post-Storm Rapid Response
              </span>
              <h4 className="text-xl font-extrabold text-white">Emergency Hurricane & Fallen Tree Hotline</h4>
              <p className="text-xs text-slate-400">Arborist priority dispatch available for Florida estate clients 24/7/365.</p>
            </div>
          </div>

          <a
            href="tel:8005553552"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            Call (800) 555-3552
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg">
                <Palmtree className="w-6 h-6 font-bold" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                VERDANT<span className="text-emerald-500">COAST</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 mb-6 max-w-sm">
              Florida's premier 3D luxury landscaping, hardscaping, outdoor lighting, and smart irrigation company. Transforming properties into high-end resort oases.
            </p>

            <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold">
              <Shield className="w-4 h-4" />
              <span>State Certified Florida Contractor #CBC1268940</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              {['Services', 'About Us', 'Portfolio', 'Why Us', 'Testimonials', 'Service Areas', 'Contact'].map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(id)}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Capabilities</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>3D Master Landscape Design</li>
              <li>Travertine Hardscape Patios</li>
              <li>2700K Architectural Night LED</li>
              <li>Smart Wi-Fi Drip Irrigation</li>
              <li>Specimen Royal & Bismarck Palms</li>
              <li>Empire Zoysia Sod Installation</li>
              <li>HOA & Commercial Grounds Care</li>
            </ul>
          </div>

          {/* Regional Studios */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Florida Studios</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Palm Beach Studio</li>
              <li>Naples Design Center</li>
              <li>Coral Gables Office</li>
              <li>Sarasota & Tampa Bay</li>
              <li>Orlando Central</li>
              <li>Jacksonville Studio</li>
              <li>Florida Keys Regional</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Verdant Coast Florida Landscaping LLC. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={onOpenEstimate} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Get Free Estimate
            </button>
            <button onClick={scrollToTop} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
