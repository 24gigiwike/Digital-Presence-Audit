import React from 'react';
import { ShieldCheck, Layers, Award, Target, Zap, ArrowRight, X } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
  onStartAudit: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  onClose,
  onStartAudit
}) => {
  const pillars = [
    {
      title: "1. Brand Clarity (20 Pts)",
      subtitle: "The 5-Second Test",
      desc: "Measures whether cold visitors instantly comprehend your niche expertise, target avatar, and executive business transformation without cognitive fatigue.",
      icon: <Target className="w-5 h-5 text-amber-300" />
    },
    {
      title: "2. Trust & Credibility (20 Pts)",
      subtitle: "Authority Architecture",
      desc: "Evaluates your proof triggers: structured case studies with hard KPIs, client rosters, verified video testimonials, and personal brand reputation.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-300" />
    },
    {
      title: "3. Visual Experience (20 Pts)",
      subtitle: "Container Polish",
      desc: "Assesses typography pairings, whitespace rhythm, cross-channel branding consistency, and lightning-fast mobile website responsiveness.",
      icon: <Award className="w-5 h-5 text-emerald-300" />
    },
    {
      title: "4. Conversion System (20 Pts)",
      subtitle: "Frictionless Capture",
      desc: "Inspects your CTA dominance, instant intake automation, calendar booking links, and service package transparency.",
      icon: <Zap className="w-5 h-5 text-sky-300" />
    },
    {
      title: "5. Growth Foundation (20 Pts)",
      subtitle: "Proprietary Sovereignty",
      desc: "Checks your authority content publishing cadence, owned email list assets, and independence from rented social media algorithms.",
      icon: <Layers className="w-5 h-5 text-purple-300" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#0A0A0B]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in select-none">
      <div className="w-full max-w-3xl bg-[#0D0D0F] border border-white/15 rounded-3xl p-6 sm:p-10 relative shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-mono text-amber-300 uppercase tracking-[0.25em] block">
              Diagnostic Methodology
            </span>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              The 100-Point Audit Framework™
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-6 pr-2 -mr-2 my-2">
          <p className="text-sm text-white/75 font-light leading-relaxed">
            Developed by <strong className="text-white font-medium">Web Design King</strong>, this diagnostic framework evaluates digital presence through the lens of high-ticket conversion psychology. Each category is weighted at 20 points, scoring your total digital footprint out of 100 benchmark points.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{p.title}</h3>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{p.subtitle}</span>
                  </div>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pt-1">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-white/50 font-mono">
            Average Freelancer Benchmark: 54/100 Pts
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-white/15 rounded-full text-xs uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors font-mono"
            >
              Close
            </button>
            <button
              onClick={() => { onClose(); onStartAudit(); }}
              className="flex-1 sm:flex-initial px-8 py-3 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Start Free Audit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
