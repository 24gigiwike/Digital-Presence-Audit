import React, { useEffect, useState } from 'react';
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
    { text: "Scanning portfolio conversion structure...", time: 0 },
    { text: "Evaluating 5-second brand clarity...", time: 600 },
    { text: "Calculating high-ticket trust index...", time: 1200 },
    { text: "Synthesizing strategic recommendations...", time: 1800 },
    { text: "Finalizing Free Audit Report...", time: 2300 }
  ];

  useEffect(() => {
    const timers = scanSteps.map((s, idx) => 
      setTimeout(() => setStep(idx + 1), s.time)
    );

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto py-16 px-6 flex flex-col items-center select-none">
      <div className="bg-white border-2 border-[#82e3aa] rounded-3xl p-10 sm:p-14 relative overflow-hidden w-full shadow-2xl flex flex-col items-center">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf6bc]/30 via-[#81eee8]/10 to-transparent pointer-events-none" />
        
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#42c28b]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-[#81eee8]"
          />
          <div className="w-12 h-12 bg-gradient-to-br from-[#82e3aa] to-[#42c28b] rounded-2xl flex items-center justify-center shadow-md animate-bounce">
            <i className="fa-solid fa-microchip text-white text-xl"></i>
          </div>
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-black font-mono font-bold mb-2 opacity-60">
          Diagnostic Audit Engine™
        </span>
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black mb-8">
          Analyzing your digital presence...
        </h2>

        {/* Steps Stream */}
        <div className="space-y-4 w-full text-left max-w-sm">
          {scanSteps.map((s, idx) => {
            const isDone = step > idx;
            const isCurrent = step === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0.3, x: -10 }}
                animate={{ opacity: isDone || isCurrent ? 1 : 0.3, x: 0 }}
                className="flex items-center gap-3 text-xs sm:text-sm"
              >
                {isDone ? (
                  <i className="fa-solid fa-circle-check text-[#42c28b] text-base shrink-0"></i>
                ) : isCurrent ? (
                  <i className="fa-solid fa-spinner animate-spin text-[#fb7474] text-base shrink-0"></i>
                ) : (
                  <i className="fa-regular fa-circle text-black/20 text-base shrink-0"></i>
                )}
                <span className={isDone ? 'text-black font-bold' : isCurrent ? 'text-black font-semibold' : 'text-black opacity-40 font-normal'}>
                  {s.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-[#82e3aa]/40 w-full flex items-center justify-between text-xs font-mono text-black font-bold opacity-60">
          <span>Profile: {userName || 'Assessor'}</span>
          <span>Category: {profession || 'Digital Brand'}</span>
        </div>
      </div>
    </div>
  );
};
