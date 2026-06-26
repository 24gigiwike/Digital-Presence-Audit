import React, { useState } from 'react';
import { Question, AuditAnswers } from '../types';
import { ArrowRight, ArrowLeft, Check, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MICROCOPY_PROMPTS } from '../data/questions';

interface AssessmentExperienceProps {
  questions: Question[];
  onComplete: (answers: AuditAnswers) => void;
  onCancel: () => void;
  userName?: string;
}

export const AssessmentExperience: React.FC<AssessmentExperienceProps> = ({
  questions,
  onComplete,
  onCancel,
  userName
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AuditAnswers>({});
  const [direction, setDirection] = useState<number>(1);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  // Microcopy prompt trigger
  const activeMicrocopy = MICROCOPY_PROMPTS[currentIndex + 1] || (
    currentIndex === 0 
      ? `Great to meet you, ${userName || 'Assessor'}. Let's understand how people experience your brand online.`
      : null
  );

  const handleSelectChoice = (optionIdx: number) => {
    const updated = { ...answers, [currentQ.id]: optionIdx };
    setAnswers(updated);
    
    // Auto advance after short delay for single choice
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(updated);
      }
    }, 320);
  };

  const handleToggleChecklist = (optionIdx: number) => {
    const existing = (answers[currentQ.id] as number[]) || [];
    let next: number[];
    if (existing.includes(optionIdx)) {
      next = existing.filter(i => i !== optionIdx);
    } else {
      next = [...existing, optionIdx];
    }
    setAnswers({ ...answers, [currentQ.id]: next });
  };

  const handleNextChecklist = () => {
    // If nothing selected, set empty array
    const updated = {
      ...answers,
      [currentQ.id]: answers[currentQ.id] !== undefined ? answers[currentQ.id] : []
    };
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updated);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentAnswer = answers[currentQ.id];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden select-none max-w-4xl mx-auto w-full">
      {/* Top Progress Header */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-mono">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-white/20 font-light">•</span>
            <span className="text-xs tracking-wide font-light italic font-serif text-amber-300/90">
              {currentQ.categoryName}
            </span>
          </div>
          <span className="text-xs font-mono text-white/60">{progressPercent}%</span>
        </div>
        
        {/* Animated Progress Bar matching Sophisticated Dark theme */}
        <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
          <div 
            className="h-full bg-white transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Encouraging Microcopy Banner */}
      {activeMicrocopy && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={`micro-${currentIndex}`}
          className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-white/[0.07] to-white/[0.02] border border-white/10 flex items-center gap-3 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <p className="text-xs sm:text-sm text-white/85 font-light font-serif italic">
            "{activeMicrocopy}"
          </p>
        </motion.div>
      )}

      {/* Main Question Card View */}
      <div className="w-full relative min-h-[380px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl w-full flex flex-col justify-between"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono mb-2 block">
                Diagnostic Checkpoint • 20 Pts Section
              </span>
              <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-white leading-snug mb-2">
                {currentQ.title}
              </h2>
              {currentQ.subtitle && (
                <p className="text-xs sm:text-sm text-white/50 font-light mb-8 leading-relaxed">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 mt-4">
              {currentQ.type === 'choice' ? (
                currentQ.options.map((opt, idx) => {
                  const isSelected = currentAnswer === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectChoice(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-white text-[#0A0A0B] border-white font-medium shadow-lg scale-[1.01]'
                          : 'bg-white/[0.04] border-white/10 text-white/80 hover:bg-white/[0.08] hover:border-white/25 active:scale-[0.99]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-mono transition-colors ${
                          isSelected ? 'border-[#0A0A0B] bg-[#0A0A0B] text-white' : 'border-white/20 text-white/50 group-hover:border-white/50'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm sm:text-base leading-snug">{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-[#0A0A0B] shrink-0" />}
                    </button>
                  );
                })
              ) : (
                /* Checklist View */
                <div>
                  <div className="space-y-2.5 mb-8">
                    {currentQ.options.map((opt, idx) => {
                      const existingArr = (currentAnswer as number[]) || [];
                      const isChecked = existingArr.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggleChecklist(idx)}
                          className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'bg-white/[0.12] border-white/40 text-white font-medium'
                              : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <span className="text-sm">{opt.label}</span>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-white border-white text-[#0A0A0B]' : 'border-white/20 bg-transparent'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChecklist}
                      className="px-8 py-3.5 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-all shadow-md flex items-center gap-2"
                    >
                      Confirm Selection
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Nav Controls */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-widest text-white/40">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 hover:text-white transition-colors ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              
              <button
                onClick={onCancel}
                className="hover:text-rose-400 transition-colors"
              >
                Exit Audit
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
