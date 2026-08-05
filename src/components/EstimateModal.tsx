import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, CheckCircle2, Calculator, Send, ArrowRight, Shield } from 'lucide-react';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedCity?: string;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedCity,
}) => {
  const [propertyType, setPropertyType] = useState<'residential' | 'estate' | 'commercial' | 'hoa'>('residential');
  const [sqft, setSqft] = useState<number>(3500);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    preselectedServiceId || 'landscape_design',
    'lighting',
    'hardscaping',
  ]);
  const [city, setCity] = useState<string>(preselectedCity || 'Palm Beach');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedServiceId && !selectedServices.includes(preselectedServiceId)) {
      setSelectedServices((prev) => [...prev, preselectedServiceId]);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Live Instant Cost Calculation Logic
  const calculateEstimate = () => {
    let base = 1500;
    if (propertyType === 'estate') base = 3500;
    if (propertyType === 'commercial') base = 5000;
    if (propertyType === 'hoa') base = 7500;

    const sqftCost = sqft * 0.85;
    let serviceTotal = 0;

    if (selectedServices.includes('landscape_design')) serviceTotal += 1499;
    if (selectedServices.includes('hardscaping')) serviceTotal += 4900;
    if (selectedServices.includes('lighting')) serviceTotal += 1800;
    if (selectedServices.includes('irrigation')) serviceTotal += 1250;
    if (selectedServices.includes('tree_care')) serviceTotal += 850;
    if (selectedServices.includes('sod')) serviceTotal += Math.round(sqft * 1.85);

    const subtotal = base + sqftCost + serviceTotal;
    const minEst = Math.round(subtotal * 0.9);
    const maxEst = Math.round(subtotal * 1.15);
    const estimatedDays = Math.max(2, Math.ceil(sqft / 2000) + selectedServices.length);

    return { minEst, maxEst, estimatedDays };
  };

  const { minEst, maxEst, estimatedDays } = calculateEstimate();

  const handleSendEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#10b981', '#34d399', '#f59e0b'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Instant 3D Cost Estimator
            </span>
            <h3 className="text-2xl font-bold">Florida Estate Quote Builder</h3>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold">Instant Quote Locked In!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your estimated range of <span className="text-emerald-400 font-bold">${minEst.toLocaleString()} – ${maxEst.toLocaleString()}</span> has been assigned to our senior Florida landscape architect.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
              Estimated Installation Timeline: <span className="text-white font-bold">{estimatedDays} Business Days</span>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendEstimate} className="space-y-6">
            
            {/* Step 1: Property Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'residential', label: 'Single Family' },
                  { id: 'estate', label: 'Luxury Estate' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'hoa', label: 'HOA Community' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      propertyType === type.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Property Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Property / Lawn Area Size
                </label>
                <span className="text-sm font-extrabold text-emerald-400">
                  {sqft.toLocaleString()} Sq Ft
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>1,000 sq ft</span>
                <span>25,000 sq ft</span>
                <span>50,000+ sq ft</span>
              </div>
            </div>

            {/* Step 3: Select Desired Services */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                3. Select Desired Services
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'landscape_design', label: '3D Master Design' },
                  { id: 'hardscaping', label: 'Travertine Pavers' },
                  { id: 'lighting', label: '2700K Night Lighting' },
                  { id: 'irrigation', label: 'Smart Drip Irrigation' },
                  { id: 'tree_care', label: 'Specimen Palms' },
                  { id: 'sod', label: 'Empire Zoysia Sod' },
                ].map((s) => {
                  const isSel = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                        isSel
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{s.label}</span>
                      {isSel && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Instant Cost Summary Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                  Estimated Florida Investment Range
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  ${minEst.toLocaleString()} – ${maxEst.toLocaleString()}
                </span>
                <span className="block text-xs text-slate-400 mt-0.5">
                  Includes Materials, Labor, Soil Prep & 1-Year Guarantee
                </span>
              </div>

              <div className="text-right sm:text-right text-xs text-emerald-300 font-mono">
                <span className="block font-bold">Est. Duration: {estimatedDays} Days</span>
                <span className="block text-[10px] text-slate-400">Itemized 3D PDF Included</span>
              </div>
            </div>

            {/* Contact Details to Lock In Quote */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="text"
                required
                placeholder="Your Full Name *"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-emerald-500"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number for 3D Proposal *"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <Sparkles className="w-5 h-5" />
              <span>Lock In My Estimate & Get 3D Render</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>No spam guarantee. Zero obligation 3D estate consultation.</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
