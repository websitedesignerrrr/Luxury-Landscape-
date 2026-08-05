import React, { useState } from 'react';
import { FLORIDA_CITIES } from '../data/landscapingData';
import { FloridaCity } from '../types';
import { Sparkles, MapPin, Trees, CheckCircle2, ArrowRight } from 'lucide-react';

interface FloridaMapSectionProps {
  darkMode: boolean;
  onOpenEstimateForCity: (cityName: string) => void;
}

export const FloridaMapSection: React.FC<FloridaMapSectionProps> = ({
  darkMode,
  onOpenEstimateForCity,
}) => {
  const [selectedCity, setSelectedCity] = useState<FloridaCity>(FLORIDA_CITIES[0]);

  return (
    <section id="service-areas" className={`py-24 transition-colors relative ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Statewide Service Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive Florida <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Service Map</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Select any region to explore completed estate projects, soil characteristics, and recommended tropical palm species.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Florida SVG Map Graphic with Pin Hotspots */}
          <div className="lg:col-span-7 relative bg-slate-950/80 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl min-h-[460px] flex items-center justify-center overflow-hidden">
            
            {/* Background Map Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

            <div className="relative w-full max-w-lg aspect-[4/5]">
              {/* Florida Peninsula Outline */}
              <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                {/* Simplified Florida Peninsula Path */}
                <path
                  d="M 230 40 L 290 50 L 300 80 L 260 120 L 270 200 L 330 250 L 320 340 L 290 400 L 250 430 L 230 450 L 220 440 L 200 410 L 160 360 L 140 280 L 130 230 L 120 180 L 60 180 L 40 140 L 80 120 L 180 120 L 200 80 Z"
                  fill="#052e16"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="transition-all"
                />
                
                {/* Coastal Water Wave Details */}
                <path d="M 20 200 Q 60 210 100 200" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4" opacity="0.4" />
                <path d="M 310 160 Q 350 170 380 160" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4" opacity="0.4" />
              </svg>

              {/* City Pin Hotspots */}
              {FLORIDA_CITIES.map((city) => {
                const isSelected = selectedCity.id === city.id;

                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    style={{ left: `${city.xPercent}%`, top: `${city.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer transition-all duration-300`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-emerald-400 text-slate-950 scale-125 shadow-[0_0_20px_#10b981]'
                          : 'bg-emerald-950 border border-emerald-500 text-emerald-300 hover:scale-110'
                      }`}>
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>
                      
                      {/* Ripple ring */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
                      )}

                      {/* City Name Label */}
                      <span className={`absolute left-full ml-2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap border shadow-xl transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-105'
                          : 'bg-slate-900/90 text-slate-200 border-slate-700'
                      }`}>
                        {city.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Selected City Details Card */}
          <div className="lg:col-span-5">
            <div className={`p-8 rounded-3xl border shadow-2xl transition-all ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCity.region} Region</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">{selectedCity.name}</h3>
              <p className="text-xs font-semibold text-emerald-400 mb-6">{selectedCity.tagline}</p>

              <div className="space-y-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">Completed Estate Projects</span>
                  <span className="text-xl font-bold text-emerald-300">{selectedCity.completedProjects}+ Estates & Resorts</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">Soil & Microclimate Profile</span>
                  <span className="text-xs font-medium text-slate-200">{selectedCity.soilType}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block mb-2">Recommended Specimen Flora</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.recommendedPalms.map((palm, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                        <Trees className="w-3 h-3 text-emerald-400" />
                        <span>{palm}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenEstimateForCity(selectedCity.name)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Quote For {selectedCity.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
