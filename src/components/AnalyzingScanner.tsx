import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Cpu, Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AnalyzingScannerProps {
  onComplete: () => void;
  userName?: string;
  profession?: string;
}

export const AnalyzingScanner: React.FC<AnalyzingScannerProps> = ({
  onComplete,
  userName,
  profession
}) => {
  const [step, setStep] = useState(0);

  const scanSteps = [
    { text: "Scanning portfolio conversion architecture...", time: 0 },
    { text: "Evaluating 5-second brand clarity benchmark...", time: 650 },
    { text: "Calculating high-ticket authority trust index...", time: 1300 },
    { text: "Synthesizing strategic recommendations engine...", time: 1950 },
    { text: "Finalizing Executive Audit Report™...", time: 2450 }
  ];

  useEffect(() => {
    const timers = scanSteps.map((s, idx) => 
      setTimeout(() => setStep(idx + 1), s.time)
    );

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2950);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in max-w-xl mx-auto w-full">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 sm:p-14 relative overflow-hidden backdrop-blur-2xl w-full shadow-2xl flex flex-col items-center">
        {/* Pulsing scanner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 via-white/[0.02] to-transparent animate-pulse pointer-events-none" />
        
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-white/30"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-amber-300/40"
          />
          <div className="w-12 h-12 bg-white text-[#0A0A0B] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
            <Cpu className="w-6 h-6 text-[#0A0A0B]" />
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono mb-2">
          Diagnostic Engine v2.4
        </span>
        
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-8">
          Analyzing your <span className="font-serif italic font-normal text-amber-300">digital presence...</span>
        </h2>

        {/* Steps Checkbox Stream */}
        <div className="space-y-3.5 w-full text-left max-w-sm">
          {scanSteps.map((s, idx) => {
            const isDone = step > idx;
            const isCurrent = step === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0.2, x: -10 }}
                animate={{ opacity: isDone || isCurrent ? 1 : 0.25, x: 0 }}
                className="flex items-center gap-3 text-xs sm:text-sm font-light"
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-300 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                )}
                <span className={isDone ? 'text-white/90 font-normal' : isCurrent ? 'text-amber-200 animate-pulse font-medium' : 'text-white/40'}>
                  {s.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 w-full flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>Assessor: {userName || 'Assessor'}</span>
          <span>Target: {profession || 'Digital Creator'}</span>
        </div>
      </div>
    </div>
  );
};
