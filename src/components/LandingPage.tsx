import React from 'react';
import { ArrowRight, Check, Sparkles, ShieldCheck, TrendingUp, Users, Award, Eye, Zap, Layers } from 'lucide-react';

interface LandingPageProps {
  onStartAudit: () => void;
  onSeeHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAudit,
  onSeeHowItWorks
}) => {
  const reportDeliverables = [
    { title: "Digital Presence Score™", desc: "Executive benchmark out of 100 points" },
    { title: "Brand Clarity Rating", desc: "5-second value proposition evaluation" },
    { title: "Trust & Credibility Score", desc: "Proof architecture and social authority check" },
    { title: "Visual Experience Review", desc: "Design polish, consistency & mobile speed" },
    { title: "Conversion Readiness", desc: "Friction analysis of your client booking funnel" },
    { title: "Growth Opportunities", desc: "Tailored strategic blueprint to scale retainers" }
  ];

  const targetPersonas = [
    {
      category: "Freelancers",
      items: ["Designers", "Developers", "Copywriters", "Marketers", "Video editors", "Creators", "Consultants"],
      icon: <Award className="w-5 h-5 text-amber-300" />
    },
    {
      category: "Agencies",
      items: ["Small creative agencies", "Digital studios", "Marketing teams", "Boutique consultancies"],
      icon: <Layers className="w-5 h-5 text-indigo-300" />
    },
    {
      category: "Entrepreneurs",
      items: ["Business owners", "Personal brands", "Startup founders", "Industry advisors"],
      icon: <TrendingUp className="w-5 h-5 text-emerald-300" />
    }
  ];

  const leakPoints = [
    "their value is unclear within the first 5 seconds",
    "their presentation feels commoditized or generic",
    "their portfolio displays screenshots instead of strategic ROI",
    "their audience does not understand their bespoke offer",
    "there is no clear, automated path for qualified leads to contact them"
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center max-w-6xl mx-auto overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 mb-8 animate-fade-in backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium text-white/90">
            Powered by Web Design King
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
          How strong is your <span className="font-serif italic font-normal text-white">digital presence?</span>
        </h1>

        <p className="text-base sm:text-xl text-white/70 max-w-3xl font-light leading-relaxed mb-12">
          Take the free <strong className="text-white font-medium">Freelancer/Agency Digital Presence Audit™</strong> and discover what is helping or hurting your ability to attract high-value clients, lucrative opportunities, and instant trust online.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onStartAudit}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Start My Free Audit
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onSeeHowItWorks}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-white/50" />
            See How It Works
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-white/40 font-mono tracking-widest uppercase">
          <span>⚡ 3-Min Assessment</span>
          <span>•</span>
          <span>🔒 100% Confidential</span>
          <span>•</span>
          <span>📊 Instant Score</span>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="border-y border-white/10 bg-[#0D0D0F] py-8 px-6 text-center">
        <p className="text-sm sm:text-base text-white/80 font-light tracking-wide max-w-3xl mx-auto font-serif italic">
          "Built for freelancers, agencies, and digital professionals who want to look as professional online as the work they deliver."
        </p>
      </section>

      {/* Brand Positioning Section */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300/80">
              Executive Reality Check
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-snug">
              "Your digital presence is your <span className="font-serif italic font-normal text-white underline decoration-white/20 underline-offset-8">silent salesperson.</span>"
            </h2>
            <p className="text-white/60 leading-relaxed font-light text-base">
              Talent alone no longer guarantees retainer contracts. In a crowded digital economy, high-ticket buyers evaluate your online footprint within seconds to verify authority.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                Why Many Talented Creators Struggle:
              </p>
              <ul className="space-y-3">
                {leakPoints.map((leak, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/75 font-light">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5 text-xs">
                      ✕
                    </div>
                    <span>{leak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
              
              <h3 className="text-xl font-medium tracking-tight text-white mb-2">
                What You Receive in Your Report
              </h3>
              <p className="text-xs text-white/50 tracking-wide uppercase font-mono mb-8">
                Executive Diagnostic Deliverables
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reportDeliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs shrink-0 mt-0.5 group-hover:bg-white group-hover:text-[#0A0A0B] transition-colors">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/90">{item.title}</h4>
                      <p className="text-xs text-white/50 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-white/60">
                  <span className="text-white font-medium">Cost:</span> $0.00 (100% Free Audit)
                </div>
                <button
                  onClick={onStartAudit}
                  className="px-6 py-2.5 bg-white text-[#0A0A0B] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-md"
                >
                  Start Audit Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Personas Section */}
      <section className="py-20 px-6 md:px-12 border-t border-white/10 bg-[#0A0A0B]/80 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40">
            Tailored Assessment Framework
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white mt-2">
            Designed for <span className="font-serif italic font-normal">Modern Digital Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targetPersonas.map((persona, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between glass-card glass-card-hover">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {persona.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-wide">{persona.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {persona.items.map((role, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-light bg-white/5 border border-white/10 text-white/75">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>Custom Benchmark</span>
                <span className="font-mono text-white/60">100 Pts Scale</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 px-6 text-center border-t border-white/10 relative overflow-hidden bg-[#0D0D0F]">
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 max-w-3xl mx-auto leading-tight">
          Ready to diagnose your <span className="font-serif italic font-normal">digital presence?</span>
        </h2>
        <p className="text-white/60 font-light max-w-xl mx-auto mb-10 text-sm sm:text-base">
          Join hundreds of freelancers and agency founders who have uncovered their hidden conversion bottlenecks.
        </p>
        <button
          onClick={onStartAudit}
          className="px-10 py-5 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-[0.25em] font-extrabold hover:bg-white/90 transition-all shadow-xl hover:scale-105"
        >
          Begin Free Assessment
        </button>
      </section>
    </div>
  );
};
