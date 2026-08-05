import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero3DCanvas } from './components/Hero3DCanvas';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FloridaMapSection } from './components/FloridaMapSection';
import { ContactSection } from './components/ContactSection';
import { EstimateModal } from './components/EstimateModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { LightingMode } from './types';
import { Sparkles, PhoneCall } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedCity, setPreselectedCity] = useState<string | undefined>();

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimate = (serviceId?: string, cityName?: string) => {
    if (serviceId) setPreselectedServiceId(serviceId);
    if (cityName) setPreselectedCity(cityName);
    setEstimateModalOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Growing Grass & Leaves Loading Animation */}
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* 2. Glassmorphism Navigation Header */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenEstimate={() => handleOpenEstimate()}
            onNavigate={handleNavigate}
          />

          {/* 3. Full-Screen 3D Interactive Hero Canvas */}
          <div id="hero">
            <Hero3DCanvas
              lightingMode={lightingMode}
              setLightingMode={setLightingMode}
              onOpenEstimate={() => handleOpenEstimate()}
              onViewProjects={() => handleNavigate('portfolio')}
            />
          </div>

          {/* 4. Services Section */}
          <ServicesSection
            darkMode={darkMode}
            onOpenEstimateForService={(serviceId) => handleOpenEstimate(serviceId)}
          />

          {/* 5. About Us Split Layout Section */}
          <AboutSection darkMode={darkMode} />

          {/* 6. Portfolio Before & After Section */}
          <PortfolioSection
            darkMode={darkMode}
            onOpenEstimate={() => handleOpenEstimate()}
          />

          {/* 7. Why Choose Us Section */}
          <WhyChooseUs darkMode={darkMode} />

          {/* 8. Testimonials Section */}
          <TestimonialsSection darkMode={darkMode} />

          {/* 9. Interactive Florida Map Section */}
          <FloridaMapSection
            darkMode={darkMode}
            onOpenEstimateForCity={(cityName) => handleOpenEstimate(undefined, cityName)}
          />

          {/* 10. Contact Section */}
          <ContactSection darkMode={darkMode} prefilledCity={preselectedCity} />

          {/* 11. Footer */}
          <Footer
            darkMode={darkMode}
            onNavigate={handleNavigate}
            onOpenEstimate={() => handleOpenEstimate()}
          />

          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
            <button
              onClick={() => handleOpenEstimate()}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xl shadow-emerald-950/60 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Get Quote</span>
            </button>

            <a
              href="tel:8005553552"
              className="p-3 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors shadow-xl"
              title="Call Hotline"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>

          {/* 12. Instant Estimate Calculator Modal */}
          <EstimateModal
            isOpen={estimateModalOpen}
            onClose={() => setEstimateModalOpen(false)}
            preselectedServiceId={preselectedServiceId}
            preselectedCity={preselectedCity}
          />

          {/* 13. Live Chat AI Assistant Widget */}
          <LiveChatWidget
            darkMode={darkMode}
            onOpenEstimate={() => handleOpenEstimate()}
          />
        </>
      )}

    </div>
  );
}
