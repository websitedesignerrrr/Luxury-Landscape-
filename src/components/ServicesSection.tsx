import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/landscapingData';
import { ServiceItem } from '../types';
import {
  Compass,
  Scissors,
  Droplets,
  Trees,
  Layers,
  Lightbulb,
  Sparkles,
  Building2,
  CheckCircle2,
  ArrowRight,
  X,
  PhoneCall
} from 'lucide-react';

interface ServicesSectionProps {
  darkMode: boolean;
  onOpenEstimateForService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  darkMode,
  onOpenEstimateForService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-7 h-7 text-emerald-400" />;
      case 'Scissors':
        return <Scissors className="w-7 h-7 text-emerald-400" />;
      case 'Droplets':
        return <Droplets className="w-7 h-7 text-emerald-400" />;
      case 'Trees':
        return <Trees className="w-7 h-7 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-7 h-7 text-emerald-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-7 h-7 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-7 h-7 text-emerald-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className={`py-24 transition-colors relative ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Glow Ambient Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Service Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Florida Outdoor Living & <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">
              Landscaping Services
            </span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Engineered specifically for Florida's coastal heat, sandy loam soil, and tropical storm resilience. Every service is backed by our 1-Year Workmanship Guarantee.
          </p>
        </div>

        {/* Services Grid - 3D Hover Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group relative rounded-3xl overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 shadow-slate-950/80'
                  : 'bg-white border-slate-200/80 hover:border-emerald-500 hover:shadow-xl shadow-slate-200/50'
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  {service.badge}
                </div>
              )}

              {/* Card Image Thumbnail */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-md">
                  {getIcon(service.iconName)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className={`text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-500 mb-3">
                  {service.subtitle}
                </p>
                <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Starting Rate</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {service.startingPrice}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500 flex items-center justify-center text-emerald-400 group-hover:text-slate-950 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`relative w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl p-6 sm:p-8 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Florida Service Specification
                </span>
                <h3 className="text-2xl font-bold">{selectedService.title}</h3>
              </div>
            </div>

            <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-sm font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                  {selectedService.startingPrice}
                </span>
                <span className="text-xs bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                  1-Year Plant & Labor Guarantee
                </span>
              </div>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                Key Deliverables & Florida Standards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const sId = selectedService.id;
                  setSelectedService(null);
                  onOpenEstimateForService(sId);
                }}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Free Quote For This Service</span>
              </button>

              <a
                href="tel:8005553552"
                className={`py-3.5 px-6 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 ${
                  darkMode ? 'border-slate-700 hover:border-slate-600 text-slate-200' : 'border-slate-300 hover:border-slate-400 text-slate-800'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>Call Specialist</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
