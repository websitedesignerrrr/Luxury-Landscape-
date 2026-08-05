import React, { useState } from 'react';
import { BEFORE_AFTER_PROJECTS } from '../data/landscapingData';
import { BeforeAfterProject } from '../types';
import { Sparkles, MapPin, SlidersHorizontal, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface PortfolioSectionProps {
  darkMode: boolean;
  onOpenEstimate: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ darkMode, onOpenEstimate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'estates' | 'hardscaping' | 'lighting' | 'commercial'>('all');
  const [activeSliderPositions, setActiveSliderPositions] = useState<{ [key: string]: number }>({
    palm_beach_resort: 50,
    naples_patio_firepit: 50,
    coral_gables_estate: 50,
    sarasota_commercial: 50,
  });

  const filteredProjects = BEFORE_AFTER_PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleSliderChange = (id: string, value: number) => {
    setActiveSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="portfolio" className={`py-24 transition-colors relative ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Before & After Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            See The <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Florida Transformations</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Drag the interactive split slider left and right to witness how we turn ordinary plots into world-class Florida resort oases.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'estates', label: 'Luxury Estates' },
            { id: 'hardscaping', label: 'Hardscapes & Travertine' },
            { id: 'lighting', label: '2700K Night Lighting' },
            { id: 'commercial', label: 'Commercial & HOA' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/40'
                  : darkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => {
            const sliderPos = activeSliderPositions[project.id] ?? 50;

            return (
              <div
                key={project.id}
                className={`rounded-3xl border overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
                  darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-xl font-extrabold">{project.title}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    Interactive 3D Compare
                  </span>
                </div>

                {/* Interactive Before & After Image Comparison Slider */}
                <div className="relative w-full h-80 rounded-2xl overflow-hidden select-none mb-6 border border-slate-700/50">
                  
                  {/* AFTER Image (Full width underneath) */}
                  <img
                    src={project.afterImage}
                    alt={`${project.title} After`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase backdrop-blur-md">
                    AFTER
                  </span>

                  {/* BEFORE Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} Before`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 text-slate-200 text-xs font-bold uppercase backdrop-blur-md">
                      BEFORE
                    </span>
                  </div>

                  {/* Slider Divider Line & Drag Handle */}
                  <div
                    className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Range Input for Touch/Mouse Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                  />
                </div>

                {/* Project Description & Statistics */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/60 mb-6">
                  {project.stats.map((s, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="block text-[10px] uppercase text-slate-400 font-semibold">{s.label}</span>
                      <span className="block text-xs font-bold text-emerald-400 truncate">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={onOpenEstimate}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-emerald-500"
                >
                  <span>Build A Similar Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
