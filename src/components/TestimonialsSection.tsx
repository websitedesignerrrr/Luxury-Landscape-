import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/landscapingData';
import { Sparkles, Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  darkMode: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className={`py-24 transition-colors relative ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Reviews & Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Loved By Florida's Most <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">
              Discerning Property Owners
            </span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Over 2,400+ Florida estates, golf properties, and luxury commercial developments trust Verdant Coast.
          </p>
        </div>

        {/* Testimonial Luxury Card Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className={`relative rounded-3xl border p-8 sm:p-12 shadow-2xl transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <Quote className="absolute top-6 right-8 w-16 h-16 text-emerald-500/10 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-6 text-amber-400">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-lg sm:text-2xl font-serif leading-relaxed mb-8 italic">
              "{activeTestimonial.comment}"
            </p>

            {/* Author Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800/60">
              <div className="flex items-center gap-4">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg">{activeTestimonial.name}</h4>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {activeTestimonial.role} • <span className="text-emerald-400 font-semibold">{activeTestimonial.location}</span>
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    Project: {activeTestimonial.projectType}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 transition-colors cursor-pointer"
                  title="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 transition-colors cursor-pointer"
                  title="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
