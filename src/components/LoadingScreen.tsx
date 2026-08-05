import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden transition-opacity duration-500">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Brand Icon & Name */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Animated Growing Grass & Leaves Illustration */}
        <div className="relative w-48 h-48 mb-6 flex items-end justify-center">
          <svg className="w-full h-full text-emerald-500" viewBox="0 0 200 200" fill="none">
            {/* Ground Soil Arc */}
            <path d="M20 170 Q 100 160 180 170" stroke="#052e16" strokeWidth="8" strokeLinecap="round" />
            <path d="M20 170 Q 100 160 180 170" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

            {/* Grass Blade 1 (Left) */}
            <path
              d="M 60 170 Q 55 120 40 70"
              stroke="#22c55e"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 - (120 * progress) / 100}
            />

            {/* Grass Blade 2 (Center Left) */}
            <path
              d="M 85 170 Q 80 100 70 40"
              stroke="#4ade80"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="140"
              strokeDashoffset={140 - (140 * progress) / 100}
            />

            {/* Grass Blade 3 (Center Main) */}
            <path
              d="M 100 170 Q 105 80 100 20"
              stroke="#10b981"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="160"
              strokeDashoffset={160 - (160 * progress) / 100}
            />

            {/* Grass Blade 4 (Center Right) */}
            <path
              d="M 115 170 Q 125 100 135 45"
              stroke="#34d399"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="140"
              strokeDashoffset={140 - (140 * progress) / 100}
            />

            {/* Grass Blade 5 (Right) */}
            <path
              d="M 140 170 Q 150 125 165 75"
              stroke="#16a34a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 - (120 * progress) / 100}
            />

            {/* Growing Leaves */}
            {progress > 30 && (
              <g className="transition-all duration-500 transform origin-bottom">
                <path d="M 100 80 Q 75 60 70 85 Q 95 90 100 80" fill="#4ade80" />
                <path d="M 100 100 Q 125 80 130 105 Q 105 110 100 100" fill="#22c55e" />
              </g>
            )}

            {/* Dew Droplet */}
            {progress > 60 && (
              <circle cx="100" cy="22" r="4" fill="#67e8f9" className="animate-bounce" />
            )}
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-400">
            Verdant Coast Florida
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
          Cultivating Your Florida Oasis...
        </h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="mt-3 text-xs font-mono text-emerald-300 font-semibold">{progress}%</span>
      </div>
    </div>
  );
};
