import React, { useEffect } from 'react';
import { AuditReportData, RecommendationItem } from '../types';
import { Download, Sparkles, ArrowRight, CheckCircle, AlertTriangle, ShieldAlert, Cpu, Share2, Layers, Zap } from 'lucide-react';
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
    // Trigger celebratory confetti for completing the audit
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#F59E0B', '#3B82F6', '#10B981']
      });
    } catch (e) {
      // ignore if confetti fails in sandbox
    }
  }, []);

  // Compute SVG circle offset for 78 / 100 style circle
  // Radius = 120, Circumference = 2 * PI * 120 = ~753.6
  const circumference = 753.6;
  const offset = circumference - (overallScore / 100) * circumference;

  const categoriesList = [
    { name: 'Brand Clarity', key: 'brandClarity', score: categoryScores.brandClarity },
    { name: 'Trust & Credibility', key: 'trustCredibility', score: categoryScores.trustCredibility },
    { name: 'Visual Experience', key: 'visualExperience', score: categoryScores.visualExperience },
    { name: 'Conversion System', key: 'conversionSystem', score: categoryScores.conversionSystem },
    { name: 'Growth Foundation', key: 'growthFoundation', score: categoryScores.growthFoundation },
  ];

  const getTierColor = (t: string) => {
    switch(t) {
      case 'Digital Authority': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Strong Foundation': return 'text-amber-300 border-amber-400/30 bg-amber-400/10';
      case 'Hidden Potential': return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      default: return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto select-none bg-[#0A0A0B] text-white font-sans">
      {/* Main Content Layout matching exact Design HTML provided by User */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Left Column: The Hero Score */}
        <section className="w-full lg:w-[420px] flex flex-col shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center flex-1 relative overflow-hidden shadow-2xl glass-card">
            {/* Decorative Background Gradient */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
            
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-8 font-mono">
              Overall Audit Score™
            </p>
            
            <div className="relative flex items-center justify-center py-4">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                <circle 
                  cx="128" 
                  cy="128" 
                  r="120" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray="753.6" 
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="text-white transition-all duration-1500" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-8xl font-light tracking-tighter font-serif">
                  {overallScore}
                </span>
                <span className="text-white/40 text-xs tracking-widest mt-[-8px] font-mono">
                  / 100
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className={`inline-block px-4 py-1.5 rounded-full border mb-4 ${getTierColor(tier)}`}>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium font-mono">
                  {tier}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-[300px] mx-auto font-light">
                {aiInsight?.executiveSummary || `Your digital presence as a ${userInfo.profession} is ${overallScore >= 70 ? 'above market average' : 'developing'}, but key conversion friction points are preventing premium scaling.`}
              </p>
            </div>

            {/* Assessor Details Badge */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full text-left bg-white/[0.02] -mx-10 -mb-10 p-6 rounded-b-3xl">
              <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                <span className="font-mono uppercase tracking-wider">Assessed Profile:</span>
                <span className="text-amber-300 font-mono">{userInfo.mainPlatform}</span>
              </div>
              <div className="text-sm font-medium text-white truncate">{userInfo.name}</div>
              <div className="text-xs text-white/40 truncate">{userInfo.email}</div>
            </div>
          </div>
        </section>

        {/* Right Column: The Breakdown & Analysis */}
        <section className="flex-1 flex flex-col gap-6">
          
          {/* Diagnostic Breakdown Box */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl glass-card">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold font-mono">
                Diagnostic Breakdown
              </h2>
              <span className="text-xs text-white/50 font-mono">20 Pts Max / Category</span>
            </div>
            
            <div className="space-y-7">
              {categoriesList.map((cat, idx) => {
                const percent = Math.round((cat.score / 20) * 100);
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2.5">
                      <span className="text-sm sm:text-base tracking-wide font-light italic font-serif text-white/90">
                        {cat.name}
                      </span>
                      <span className="text-xs font-mono text-white/60">
                        <strong className="text-white font-medium">{cat.score}</strong> / 20
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-white transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategy Insights Box (High contrast white card matching exact Design HTML) */}
          <div className="bg-white text-[#0A0A0B] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0A0A0B]/70 font-mono">
                    Strategic Executive Diagnosis
                  </h3>
                </div>
                {aiInsight && (
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 font-bold">
                    Gemini AI Strategy Engine
                  </span>
                )}
              </div>

              <p className="text-lg sm:text-xl leading-relaxed font-light italic font-serif text-[#0A0A0B] mb-6">
                "{aiInsight?.topBottleneck ? `Primary Bottleneck Identified: ${aiInsight.topBottleneck}. ` : ''}
                {aiInsight?.strategyRoadmap || 'Your expertise is visible, but your conversion path is hidden. To attract higher-value retainer clients, we must bridge the gap between your talent and your offer presentation.'}"
              </p>

              {/* Quick Wins List */}
              {aiInsight?.quickWins && aiInsight.quickWins.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#0A0A0B]/10 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0A0A0B]/60 block font-mono">
                    ⚡ Immediate Conversion Quick Wins:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {aiInsight.quickWins.map((win, i) => (
                      <div key={i} className="bg-[#0A0A0B]/[0.03] border border-[#0A0A0B]/10 p-3.5 rounded-xl text-xs text-[#0A0A0B]/80 leading-snug">
                        <strong className="text-[#0A0A0B] block mb-1 font-mono">Win #{i+1}:</strong>
                        {win}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#0A0A0B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#0A0A0B]/60 font-medium">
                Want Web Design King to implement these fixes for you?
              </span>
              <button
                onClick={onWorkWithKing}
                className="w-full sm:w-auto px-6 py-3 bg-[#0A0A0B] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#1f1f23] transition-all shadow-md flex items-center justify-center gap-2"
              >
                Claim Strategy Session
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actionable Recommendations Engine Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 glass-card">
            <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold font-mono">
              Personalized Recommendations Engine™
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        {rec.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        rec.impact === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/10 text-white/60'
                      }`}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-1.5">{rec.title}</h4>
                    <p className="text-xs text-white/60 font-light leading-relaxed">{rec.description}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs text-white/80 flex items-start gap-2 font-light">
                    <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Action Step:</strong> {rec.actionStep}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      {/* Bottom Action Bar matching exact Design HTML footer */}
      <footer className="min-h-24 py-6 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 bg-[#0D0D0F] gap-4 shrink-0 mt-8">
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">
            Audit Complete for
          </span>
          <span className="text-sm font-medium text-white">
            {userInfo.name}, {userInfo.profession} ({userInfo.experienceLevel})
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button 
            onClick={onRetakeAudit}
            className="px-5 py-3 border border-white/15 rounded-full text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors font-mono"
          >
            Retake Audit
          </button>
          
          <button 
            onClick={onDownloadReport}
            className="px-6 py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors flex items-center gap-2 shadow-sm font-mono"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            Download Detailed Report
          </button>
          
          <button 
            onClick={onWorkWithKing}
            className="px-8 py-3.5 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-widest font-extrabold hover:bg-white/90 transition-all shadow-lg hover:scale-105 flex items-center gap-2"
          >
            Work with Web Design King
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
