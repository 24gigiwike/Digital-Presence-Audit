import React from 'react';

interface LandingPageProps {
  onStartAudit: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAudit }) => {
  const steps = [
    { num: "01", title: "Answer a few questions", icon: "fa-clipboard-question", desc: "Select your digital presence channels and core business goals." },
    { num: "02", title: "Receive your digital presence score", icon: "fa-gauge-high", desc: "Get an instant diagnostic benchmark score calibrated to industry leaders." },
    { num: "03", title: "Get personalized recommendations", icon: "fa-wand-magic-sparkles", desc: "Receive direct action steps to eliminate conversion friction immediately." }
  ];

  const benefits = [
    { title: "Brand clarity score", desc: "Verify if visitors understand your value proposition within 5 seconds.", icon: "fa-bullseye", accent: "#42c28b" },
    { title: "Trust evaluation", desc: "Audit your portfolio proof architecture and client credibility triggers.", icon: "fa-shield-halved", accent: "#81eee8" },
    { title: "Visual experience review", desc: "Measure container aesthetics, layout craftsmanship, and mobile speeds.", icon: "fa-layer-group", accent: "#fbf6bc" },
    { title: "Conversion analysis", desc: "Pinpoint hidden leaks stopping interested prospects from booking calls.", icon: "fa-filter-circle-dollar", accent: "#fb7474" },
    { title: "Growth recommendations", desc: "Obtain a clear roadmap designed to attract high-end retainer clients.", icon: "fa-chart-line", accent: "#42c28b" }
  ];

  const audiences = [
    { title: "Freelancers", desc: "Independent creatives ready to command high-ticket client retainers.", icon: "fa-user-tie" },
    { title: "Agencies", desc: "Boutique studios establishing dominant authority positioning online.", icon: "fa-building-columns" },
    { title: "Creators", desc: "Digital brands converting attention into sustainable business equity.", icon: "fa-bolt" },
    { title: "Entrepreneurs", desc: "Founders turning their website into a relentless 24/7 sales pipeline.", icon: "fa-briefcase" }
  ];

  return (
    <div className="w-full bg-white flex flex-col items-center select-none">
      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto px-6 pt-12 pb-24 text-center flex flex-col items-center justify-center min-h-[75vh]">
        {/* Soft Ambient Background Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[650px] h-[350px] bg-gradient-to-tr from-[#82e3aa]/25 via-[#81eee8]/20 to-[#fbf6bc]/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#42c28b]/30 bg-[#82e3aa]/20 mb-8 shadow-sm">
          <i className="fa-solid fa-circle-check text-[#42c28b] text-xs"></i>
          <span className="text-xs uppercase tracking-[0.18em] font-bold text-black">
            Free Digital Presence Audit
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black mb-6 max-w-4xl leading-[1.08]">
          Discover how strong your digital presence really is.
        </h1>

        <p className="text-lg sm:text-2xl text-black font-normal max-w-2xl leading-relaxed mb-12 opacity-90">
          Find out what is helping or hurting your ability to attract clients, build trust, and grow online.
        </p>

        {/* Primary Dominant CTA */}
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={onStartAudit}
            className="w-full py-5 px-10 rounded-full bg-gradient-to-r from-[#82e3aa] via-[#42c28b] to-[#81eee8] text-black font-black text-base sm:text-lg uppercase tracking-[0.15em] shadow-2xl shadow-[#42c28b]/40 hover:shadow-[#82e3aa]/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-white"
          >
            Start Your Free Audit
            <i className="fa-solid fa-arrow-right text-black"></i>
          </button>
          <span className="block mt-4 text-xs font-mono text-black tracking-widest uppercase opacity-75">
            Takes 3 Minutes • Instant Score • 100% Free
          </span>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white via-[#fbf6bc]/15 to-white border-t border-[#82e3aa]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-black font-bold opacity-60">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mt-2">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, i) => (
              <div key={i} className="bg-white border border-[#82e3aa]/40 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg shadow-[#82e3aa]/10 hover:border-[#42c28b] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#81eee8]/20 rounded-full blur-xl" />
                <span className="text-4xl font-black font-mono text-black mb-6 tracking-tight">
                  {st.num}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-[#82e3aa]/30 border border-[#42c28b]/20 flex items-center justify-center text-[#42c28b] text-2xl mb-6 shadow-sm">
                  <i className={`fa-solid ${st.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {st.title}
                </h3>
                <p className="text-sm text-black font-normal opacity-80 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="w-full py-24 px-6 bg-white border-t border-[#82e3aa]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-black font-bold opacity-60">
              Audit Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mt-2">
              What You Get
            </h2>
            <p className="text-black text-base mt-3 opacity-80 font-normal">
              Every section answers one question: Why should you care?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-[#fbf6bc]/20 border border-[#82e3aa]/40 rounded-3xl p-8 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#42c28b] transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#82e3aa]/50 flex items-center justify-center mb-6 text-xl shadow-sm" style={{ color: b.accent }}>
                    <i className={`fa-solid ${b.icon}`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-black opacity-80 font-normal leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#82e3aa]/30 flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>Included in Assessment</span>
                  <i className="fa-solid fa-check text-[#42c28b]"></i>
                </div>
              </div>
            ))}

            {/* Extra CTA Card in Benefits Grid */}
            <div className="bg-gradient-to-br from-[#82e3aa] to-[#81eee8] border-2 border-white rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 text-xl shadow-sm text-[#fb7474]">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <h3 className="text-xl font-black text-black mb-2">
                  Why Should I Care?
                </h3>
                <p className="text-sm text-black opacity-90 font-normal mb-6 leading-relaxed">
                  Because high-end buyers evaluate digital credibility instantly. Uncover your blind spots today.
                </p>
              </div>
              <button
                onClick={onStartAudit}
                className="w-full py-4 px-6 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all border border-[#42c28b]"
              >
                Start Audit Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white via-[#81eee8]/15 to-white border-t border-[#82e3aa]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-black font-bold opacity-60">
              Built For Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mt-2">
              Who It’s For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((aud, i) => (
              <div key={i} className="bg-white border border-[#82e3aa]/40 rounded-3xl p-8 text-center flex flex-col items-center justify-between shadow-lg hover:border-[#fb7474] hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#fbf6bc]/60 border border-[#82e3aa]/40 flex items-center justify-center text-[#42c28b] text-2xl mb-6 shadow-sm">
                  <i className={`fa-solid ${aud.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{aud.title}</h3>
                  <p className="text-xs text-black opacity-80 font-normal leading-relaxed">{aud.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-28 px-6 text-center border-t border-[#82e3aa]/40 bg-gradient-to-b from-[#82e3aa]/20 via-[#fbf6bc]/25 to-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#42c28b] flex items-center justify-center mx-auto mb-8 shadow-md">
            <i className="fa-solid fa-crown text-[#42c28b] text-2xl"></i>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black mb-6 leading-tight tracking-tight">
            Ready to understand how your brand is perceived online?
          </h2>
          <p className="text-base sm:text-lg text-black font-normal max-w-xl mx-auto mb-10 opacity-85 leading-relaxed">
            Your website is your 24/7 digital product. Stop guessing what premium clients think when they view your online presence.
          </p>

          <button
            onClick={onStartAudit}
            className="py-5 px-12 rounded-full bg-gradient-to-r from-[#42c28b] via-[#82e3aa] to-[#81eee8] text-black font-black text-base uppercase tracking-[0.18em] shadow-2xl shadow-[#42c28b]/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
          >
            Take Your Free Audit
          </button>
        </div>
      </section>
    </div>
  );
};
