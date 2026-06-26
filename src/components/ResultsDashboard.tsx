import React, { useEffect } from 'react';
import { AuditReportData } from '../types';
import confetti from 'canvas-confetti';

interface ResultsDashboardProps {
  report: AuditReportData;
  onWorkWithKing: () => void;
  onDownloadReport: () => void;
  onRetakeAudit: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  report,
  onWorkWithKing,
  onDownloadReport,
  onRetakeAudit
}) => {
  const { userInfo, overallScore, categoryScores, tier, strengths, weaknesses, recommendations, aiInsight } = report;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#82e3aa', '#42c28b', '#fb7474', '#fbf6bc', '#81eee8']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const circumference = 753.6;
  const offset = circumference - (overallScore / 100) * circumference;

  const categoriesList = [
    { name: 'Brand Clarity', score: categoryScores.brandClarity },
    { name: 'Trust & Credibility', score: categoryScores.trustCredibility },
    { name: 'Visual Experience', score: categoryScores.visualExperience },
    { name: 'Conversion System', score: categoryScores.conversionSystem },
    { name: 'Growth Foundation', score: categoryScores.growthFoundation },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 flex flex-col gap-8 select-none">
      {/* Top Profile Banner */}
      <div className="w-full bg-gradient-to-r from-[#fbf6bc]/40 via-[#81eee8]/20 to-white border border-[#82e3aa] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-black font-mono font-bold opacity-60 block">
            Assessment ID: #{report.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
            {userInfo.name}'s Digital Presence Audit
          </h1>
          <p className="text-xs text-black font-normal opacity-80 mt-1">
            Channel: <strong className="font-bold">{userInfo.mainPlatform}</strong> • Category: <strong className="font-bold">{userInfo.profession}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onDownloadReport}
            className="flex-1 sm:flex-none py-3.5 px-6 rounded-full bg-white border border-[#42c28b] text-black font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-[#fbf6bc]/50 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-download text-[#42c28b]"></i>
            Download Report
          </button>
          <button
            onClick={onRetakeAudit}
            className="py-3.5 px-5 rounded-full bg-white border border-[#fb7474]/40 text-black font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-[#fb7474]/20 transition-all"
            title="Start Over"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Hero Score */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white border-2 border-[#82e3aa] rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center relative overflow-hidden shadow-xl">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#81eee8]/25 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-xs uppercase tracking-[0.25em] text-black font-mono font-extrabold mb-6 opacity-70">
              Overall Benchmark Score
            </span>
            
            <div className="relative flex items-center justify-center py-4">
              <svg className="w-56 h-56 transform -rotate-90">
                <circle cx="112" cy="112" r="100" stroke="#fbf6bc" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="112" 
                  cy="112" 
                  r="100" 
                  stroke="#42c28b" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray="628.3" 
                  strokeDashoffset={628.3 - (overallScore / 100) * 628.3}
                  strokeLinecap="round"
                  className="transition-all duration-1000" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-6xl font-black tracking-tight text-black">
                  {overallScore}
                </span>
                <span className="text-black text-xs font-mono font-bold mt-1 opacity-60">
                  / 100 PTS
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="inline-block px-5 py-2 rounded-full bg-[#82e3aa]/30 border border-[#42c28b] mb-4">
                <span className="text-xs uppercase tracking-widest font-black text-black">
                  {tier}
                </span>
              </div>
              <p className="text-xs text-black font-normal opacity-80 leading-relaxed">
                Your score reflects immediate client perception, conversion clarity, and trust triggers.
              </p>
            </div>
          </div>

          {/* Category Breakdown Card */}
          <div className="bg-white border border-[#82e3aa]/50 rounded-3xl p-8 shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-6 opacity-70 font-mono">
              Category Scores
            </h3>
            <div className="space-y-4">
              {categoriesList.map((cat, idx) => {
                const pct = Math.round((cat.score / 20) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-extrabold text-black">
                      <span>{cat.name}</span>
                      <span className="font-mono">{cat.score} / 20</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#fbf6bc]/60 rounded-full overflow-hidden border border-[#82e3aa]/40">
                      <div 
                        className="h-full bg-[#42c28b] rounded-full transition-all duration-500" 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Roadmap */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Executive Diagnostic Summary */}
          <div className="bg-gradient-to-br from-white via-[#81eee8]/10 to-[#fbf6bc]/15 border border-[#82e3aa] rounded-3xl p-8 sm:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#42c28b] flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-wand-magic-sparkles text-white text-base"></i>
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-black opacity-60 block">
                  AI Diagnostic Engine
                </span>
                <h2 className="text-xl font-black text-black tracking-tight">
                  Executive Summary
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-black font-normal leading-relaxed mb-8">
              {aiInsight?.executiveSummary || "Your digital presence demonstrates solid foundational competence, but visitors encounter friction before booking calls."}
            </p>

            <div className="p-6 rounded-2xl bg-[#fb7474]/15 border border-[#fb7474] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-black font-extrabold block mb-1">
                  Primary Conversion Bottleneck
                </span>
                <p className="text-xs sm:text-sm text-black font-medium opacity-90">
                  {aiInsight?.topBottleneck || "Lack of a singular, dominant high-ticket call to action."}
                </p>
              </div>
              <span className="px-3 py-1 bg-white border border-[#fb7474] text-black rounded-full text-[10px] font-black uppercase tracking-widest shrink-0">
                Fix Priority 1
              </span>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#42c28b]/60 rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-circle-check text-[#42c28b] text-lg"></i>
                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                  Key Strengths
                </h3>
              </div>
              <ul className="space-y-2.5">
                {strengths.length > 0 ? strengths.map((s, i) => (
                  <li key={i} className="text-xs text-black font-normal opacity-85 leading-relaxed flex items-start gap-2">
                    <span className="text-[#42c28b] font-bold">•</span>
                    <span>{s}</span>
                  </li>
                )) : (
                  <li className="text-xs text-black opacity-70">Your channel setup establishes baseline digital reach.</li>
                )}
              </ul>
            </div>

            <div className="bg-white border border-[#fb7474] rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-triangle-exclamation text-[#fb7474] text-lg"></i>
                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                  Conversion Friction
                </h3>
              </div>
              <ul className="space-y-2.5">
                {weaknesses.length > 0 ? weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-black font-normal opacity-85 leading-relaxed flex items-start gap-2">
                    <span className="text-[#fb7474] font-bold">•</span>
                    <span>{w}</span>
                  </li>
                )) : (
                  <li className="text-xs text-black opacity-70">Your messaging could be sharper for high-ticket buyers.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Action Roadmap */}
          <div className="bg-white border-2 border-[#82e3aa] rounded-3xl p-8 sm:p-10 shadow-xl">
            <h2 className="text-xl font-black text-black tracking-tight mb-8">
              Strategic Action Roadmap
            </h2>

            <div className="space-y-6">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#fbf6bc]/20 border border-[#82e3aa] hover:border-[#42c28b] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#42c28b] text-white font-mono font-bold text-xs flex items-center justify-center">
                        0{i+1}
                      </span>
                      <h4 className="text-base font-extrabold text-black">
                        {rec.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-white border border-[#42c28b] rounded-full text-black self-start sm:self-auto">
                      {rec.impact} Impact
                    </span>
                  </div>

                  <p className="text-xs text-black font-normal opacity-85 leading-relaxed mb-4">
                    {rec.description}
                  </p>

                  <div className="pt-3 border-t border-[#82e3aa]/40 flex items-start gap-2.5 text-xs font-semibold text-black">
                    <i className="fa-solid fa-arrow-right text-[#42c28b] mt-0.5"></i>
                    <span><strong className="font-black">Action Step:</strong> {rec.actionStep}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dominant Bottom CTA Card */}
          <div className="bg-gradient-to-r from-[#82e3aa] via-[#42c28b] to-[#81eee8] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-2xl border-2 border-white">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-black mb-2 opacity-75">
              Transform Your Architecture
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-4 max-w-xl">
              Want Web Design King to implement these strategic fixes for you?
            </h3>
            <p className="text-sm text-black font-normal max-w-lg mb-8 opacity-90 leading-relaxed">
              We build high-converting digital products and bespoke portfolio systems for elite creatives and agencies.
            </p>
            <button
              onClick={onWorkWithKing}
              className="py-5 px-10 rounded-full bg-white text-black font-black text-sm sm:text-base uppercase tracking-[0.18em] shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-black"
            >
              Book Executive Strategy Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
