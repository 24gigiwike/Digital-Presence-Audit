import React, { useState } from 'react';

interface ContactKingModalProps {
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  auditScore?: number;
}

export const ContactKingModal: React.FC<ContactKingModalProps> = ({
  onClose,
  userEmail,
  userName,
  auditScore
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState('Full Website & Presence Rebuild');
  const [notes, setNotes] = useState('');

  const services = [
    'Full Website & Presence Rebuild',
    'High-Ticket Sales Funnel Architecture',
    'Luxury Branding & Portfolio Redesign',
    'Conversion Optimization Retainer',
    'Strategic Consultation Only'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-white border-2 border-[#82e3aa] rounded-3xl p-8 sm:p-12 relative shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#fbf6bc]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#82e3aa]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#42c28b] rounded-xl flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-crown text-white text-sm"></i>
            </div>
            <div>
              <span className="text-[10px] font-mono text-black font-extrabold uppercase tracking-widest block opacity-60">
                Exclusive Agency Partnership
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                Work With Web Design King
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fb7474]/10 border border-[#fb7474]/40 flex items-center justify-center text-[#fb7474] hover:bg-[#fb7474] hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-6 my-auto animate-fade-in">
            <div className="w-16 h-16 bg-[#42c28b]/20 border border-[#42c28b] rounded-full flex items-center justify-center mx-auto text-[#42c28b] shadow-sm">
              <i className="fa-solid fa-check text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black text-black">
              Strategy Request Received
            </h3>
            <p className="text-sm text-black opacity-80 max-w-md mx-auto font-normal leading-relaxed">
              Thank you, <strong className="font-bold">{userName || 'Professional'}</strong>. Web Design King's team has received your benchmark ({auditScore ? `${auditScore}/100 PTS` : 'Attached'}) and will review your digital presence within 24 hours.
            </p>
            <div className="bg-[#fbf6bc]/40 border border-[#82e3aa] rounded-2xl p-4 max-w-sm mx-auto text-xs font-mono text-black font-bold">
              Next Step: Check your inbox ({userEmail || 'registered email'}) for your calendar invitation link.
            </div>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gradient-to-r from-[#82e3aa] to-[#42c28b] text-black rounded-full text-xs uppercase tracking-widest font-black transition-all shadow-md mt-4 border border-white"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-6 pr-2 -mr-2 my-2">
            <p className="text-sm text-black opacity-80 font-normal leading-relaxed">
              Partner directly with Web Design King to eliminate conversion bottlenecks and build a dominant online presence.
            </p>

            {auditScore && (
              <div className="bg-[#81eee8]/20 border border-[#82e3aa] p-4 rounded-2xl flex items-center justify-between text-xs font-mono">
                <span className="text-black font-semibold">Attached Diagnostic Score:</span>
                <span className="text-black font-black text-sm">{auditScore} / 100 PTS</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-black mb-2.5 font-bold font-mono opacity-70">
                Select Strategic Objective
              </label>
              <div className="space-y-2">
                {services.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setInquiryType(srv)}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between font-normal ${
                      inquiryType === srv
                        ? 'bg-[#42c28b] text-black border-[#42c28b] font-bold shadow-sm'
                        : 'bg-white border-[#82e3aa]/60 text-black hover:border-[#42c28b]'
                    }`}
                  >
                    <span>{srv}</span>
                    {inquiryType === srv && <i className="fa-solid fa-check text-black"></i>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-black mb-2 font-bold font-mono opacity-70">
                Project Notes / Current URL (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your website URL, portfolio link, or timeline goals..."
                rows={3}
                className="w-full bg-white border border-[#82e3aa] rounded-xl p-4 text-xs text-black placeholder-black/30 focus:outline-none focus:border-[#42c28b] transition-all resize-none shadow-sm"
              />
            </div>

            <div className="pt-4 border-t border-[#82e3aa]/40 flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 text-xs uppercase tracking-widest text-black opacity-60 hover:opacity-100 transition-opacity font-bold font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#82e3aa] to-[#42c28b] text-black rounded-full text-xs uppercase tracking-widest font-black transition-all shadow-md hover:scale-105 flex items-center gap-2 border border-white"
              >
                <span>Request Strategy Session</span>
                <i className="fa-solid fa-arrow-right text-black"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
