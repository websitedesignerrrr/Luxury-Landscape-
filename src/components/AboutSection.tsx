import React from 'react';
import { STATS_DATA } from '../data/landscapingData';
import { ShieldCheck, Award, Palmtree, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section id="about" className={`py-24 transition-colors relative overflow-hidden ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Layout: Left Content & Image Grid, Right Story & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/src/assets/images/florida_luxury_estate_1785970426738.jpg"
                alt="Florida Luxury Estate Landscaping"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 backdrop-blur-md flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-emerald-400 font-bold">Florida State Certified</span>
                    <h4 className="text-sm font-extrabold">Master Commercial & Residential Contractor</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Decorative Card */}
            <div className="hidden sm:flex absolute -bottom-8 -right-8 z-20 p-5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-white shadow-2xl max-w-xs flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Palmtree className="w-5 h-5" />
                <span>100% Native Florida Flora</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specimen Royal Palms, Bismarck Palms, and Clusia privacy hedges engineered to withstand Category 5 hurricane wind loads.
              </p>
            </div>
          </div>

          {/* Right Column: About Text & Statistics Grid */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Verdant Coast Florida</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Pioneering Luxury Outdoor Living Across Florida
            </h2>

            <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Founded in Florida with a relentless commitment to design mastery and tropical agronomy, Verdant Coast creates outdoor sanctuaries that seamlessly blend architectural elegance with resilient native ecology.
            </p>

            <p className={`text-sm leading-relaxed mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              From oceanfront Palm Beach mansions to expansive Naples golf course estates and commercial resort properties in Tampa Bay, our landscape architects, certified arborists, and travertine masons deliver white-glove craftsmanship from concept to lifetime care.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Hurricane-Resilient Canopy Pruning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Smart Satellite Drip Irrigation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Natural Italian & Florida Travertine</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">2700K Low Voltage Solid Brass LEDs</span>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60">
              {STATS_DATA.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-200 leading-tight mb-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
