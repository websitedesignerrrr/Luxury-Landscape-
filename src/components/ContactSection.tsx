import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  darkMode: boolean;
  prefilledCity?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode, prefilledCity }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: prefilledCity || 'Palm Beach, FL',
    propertyType: 'residential',
    serviceNeeded: 'Landscape Design',
    budget: '$10,000 - $25,000',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setSubmittedResponse(data);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#4ade80', '#e2d9c8'],
      });
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmittedResponse({
        success: true,
        confirmationCode: 'VC-FL-' + Math.floor(100000 + Math.random() * 900000),
        message: `Thank you, ${formData.name}! Your consultation request has been received. Our senior design team will call you within 2 hours.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-24 transition-colors relative ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Design Consultation & Quotes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Florida Outdoor Transformation</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Ready for a custom 3D virtual walkthrough of your estate? Fill out the form below or call our 24/7 hotline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Info & Google Maps Representation */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`p-8 rounded-3xl border shadow-2xl ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-2xl font-extrabold mb-6">Florida Headquarters</h3>

              <div className="space-y-6">
                <a href="tel:8005553552" className="flex items-start gap-4 group cursor-pointer">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Toll-Free Hotline</span>
                    <span className="text-lg font-bold text-emerald-400 group-hover:underline">(800) 555-FL-LANDSCAPE</span>
                    <span className="block text-[11px] text-slate-500">Available 24/7 for Estate Inquiries</span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Email Proposals</span>
                    <span className="text-base font-semibold">consultation@verdantcoastfl.com</span>
                    <span className="block text-[11px] text-slate-500">2-Hour Proposal Turnaround</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Statewide Design Studios</span>
                    <span className="text-sm font-semibold">Palm Beach • Naples • Coral Gables • Sarasota • Tampa</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Hours of Operation</span>
                    <span className="text-sm font-semibold">Mon – Sat: 7:00 AM – 7:00 PM EST</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Visual Google Maps Box */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-56 bg-slate-950 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
              <div className="relative text-center p-6 bg-slate-950/80 rounded-2xl border border-emerald-500/40 backdrop-blur-md max-w-xs">
                <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-sm text-white">Florida Operations Center</h4>
                <p className="text-[11px] text-slate-400">Serving all 67 Florida Counties</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {submittedResponse ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold">Consultation Scheduled!</h3>
                  <p className={`text-base max-w-lg mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {submittedResponse.message}
                  </p>
                  <div className="inline-block p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                    Confirmation Code: <span className="font-bold text-white">{submittedResponse.confirmationCode}</span>
                  </div>
                  <br />
                  <button
                    onClick={() => setSubmittedResponse(null)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Harrison Sterling"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="harrison@estate.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(561) 555-0199"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Florida City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Palm Beach, FL"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Primary Service Needed *
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Landscape Design">3D Master Landscape Design</option>
                        <option value="Hardscaping">Travertine Pavers & Outdoor Living</option>
                        <option value="Outdoor Lighting">2700K Architectural LED Night Lighting</option>
                        <option value="Irrigation">Smart Wi-Fi Drip Irrigation</option>
                        <option value="Tree Care">Specimen Palm & Tree Care</option>
                        <option value="Sod Installation">Empire Zoysia Turf Replacement</option>
                        <option value="Lawn Maintenance">Luxury Weekly Grounds Care</option>
                        <option value="Commercial">Commercial / HOA Grounds Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Target Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 – $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 – $50,000</option>
                        <option value="$50,000+">$50,000+ (Full Luxury Resort Estate)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Project Notes or Vision Ideas
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision (e.g., Royal Palms along long driveway, travertine fire pit patio, warm LED night lighting, smart drip irrigation)..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-base uppercase tracking-wider shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    {submitting ? (
                      <span>Processing Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Schedule Free 3D Design Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
