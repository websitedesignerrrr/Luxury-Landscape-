import React from 'react';
import { WHY_CHOOSE_US_DATA } from '../data/landscapingData';
import { ShieldCheck, Palmtree, Clock, DollarSign, Award, Smile, Sparkles, Check } from 'lucide-react';

interface WhyChooseUsProps {
  darkMode: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ darkMode }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-emerald-400" />;
      case 'Palmtree':
        return <Palmtree className="w-8 h-8 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-8 h-8 text-emerald-400" />;
      case 'DollarSign':
        return <DollarSign className="w-8 h-8 text-emerald-400" />;
      case 'Award':
        return <Award className="w-8 h-8 text-emerald-400" />;
      case 'Smile':
        return <Smile className="w-8 h-8 text-emerald-400" />;
      default:
        return <Sparkles className="w-8 h-8 text-emerald-400" />;
    }
  };

  return (
    <section id="why-us" className={`py-24 transition-colors relative overflow-hidden ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Verdant Coast Difference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Why Florida's Top Property Owners <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">
              Trust Verdant Coast
            </span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            We set the benchmark for luxury outdoor living in Florida. Here is why luxury homeowners, HOAs, and estate developers choose us time and time again.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_DATA.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                darkMode
                  ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-white'
              }`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-inner">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Verified Florida Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
