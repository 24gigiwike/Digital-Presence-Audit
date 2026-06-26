import React, { useState } from 'react';
import { Question, AuditAnswers } from '../types';
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

  const activeMicrocopy = MICROCOPY_PROMPTS[currentIndex + 1] || (
    currentIndex === 0 
      ? `Great to meet you, ${userName || 'Assessor'}. Let's measure how high-intent prospects experience your brand.`
      : null
  );

  const handleSelectChoice = (optionIdx: number) => {
    const updated = { ...answers, [currentQ.id]: optionIdx };
    setAnswers(updated);
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(updated);
      }
    }, 300);
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
    <div className="w-full max-w-4xl mx-auto py-12 px-6 flex flex-col items-center select-none">
      {/* Top Progress Header */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black font-mono font-bold opacity-60">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-black opacity-30 font-bold">•</span>
            <span className="text-xs tracking-wide font-extrabold text-black uppercase">
              {currentQ.categoryName}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-black">{progressPercent}%</span>
        </div>
        
        <div className="h-2 w-full bg-[#fbf6bc] overflow-hidden rounded-full border border-[#82e3aa]/30">
          <div 
            className="h-full bg-gradient-to-r from-[#82e3aa] to-[#42c28b] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Microcopy Banner */}
      {activeMicrocopy && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={`micro-${currentIndex}`}
          className="w-full mb-6 p-4 rounded-2xl bg-[#81eee8]/20 border border-[#82e3aa] flex items-center gap-3 shadow-sm"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-[#42c28b]"></i>
          <p className="text-xs sm:text-sm text-black font-normal leading-relaxed">
            {activeMicrocopy}
          </p>
        </motion.div>
      )}

      {/* Question Card */}
      <div className="w-full relative min-h-[380px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.25 }}
            className="bg-white border-2 border-[#82e3aa] rounded-3xl p-8 sm:p-12 shadow-xl w-full flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-black font-mono font-bold mb-2 block opacity-60">
                Diagnostic Checkpoint • 20 Pts Section
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black leading-snug mb-3">
                {currentQ.title}
              </h2>
              {currentQ.subtitle && (
                <p className="text-xs sm:text-sm text-black font-normal opacity-80 mb-8 leading-relaxed">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Options */}
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
                          ? 'bg-[#42c28b] text-black border-[#42c28b] font-extrabold shadow-md scale-[1.01]'
                          : 'bg-white border-[#82e3aa]/60 text-black font-normal hover:bg-[#fbf6bc]/30 hover:border-[#42c28b]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                          isSelected ? 'border-black bg-white text-black' : 'border-[#82e3aa] text-black bg-[#fbf6bc]/20 group-hover:border-[#42c28b]'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm sm:text-base leading-snug">{opt.label}</span>
                      </div>
                      {isSelected && <i className="fa-solid fa-check text-black text-base"></i>}
                    </button>
                  );
                })
              ) : (
                <div>
                  <div className="space-y-2.5 mb-8">
                    {currentQ.options.map((opt, idx) => {
                      const existingArr = (currentAnswer as number[]) || [];
                      const isChecked = existingArr.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggleChecklist(idx)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'bg-[#81eee8]/40 border-[#42c28b] text-black font-bold shadow-sm'
                              : 'bg-white border-[#82e3aa]/50 text-black font-normal hover:bg-[#fbf6bc]/20 hover:border-[#42c28b]'
                          }`}
                        >
                          <span className="text-sm">{opt.label}</span>
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#42c28b] border-[#42c28b] text-white' : 'border-[#82e3aa] bg-white'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check text-white text-xs"></i>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChecklist}
                      className="px-8 py-4 bg-gradient-to-r from-[#82e3aa] to-[#42c28b] text-black rounded-full text-xs uppercase tracking-widest font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white"
                    >
                      Confirm Selection
                      <i className="fa-solid fa-arrow-right text-black"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-8 pt-6 border-t border-[#82e3aa]/30 flex items-center justify-between text-xs uppercase tracking-widest text-black font-bold">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 hover:opacity-100 transition-opacity ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-70'}`}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Previous
              </button>
              
              <button
                onClick={onCancel}
                className="opacity-60 hover:opacity-100 text-[#fb7474] transition-opacity"
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
