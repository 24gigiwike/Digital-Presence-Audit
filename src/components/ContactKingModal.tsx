import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, CheckCircle2, Calendar, Mail, MessageSquare, PhoneCall } from 'lucide-react';

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
    <div className="fixed inset-0 bg-[#0A0A0B]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-[#0D0D0F] border border-white/15 rounded-3xl p-6 sm:p-12 relative shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Flare */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white text-[#0A0A0B] rounded flex items-center justify-center font-serif font-bold italic text-xs">
              WD
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block">
                Exclusive Agency Partnership
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Work With Web Design King
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-6 my-auto animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light text-white">
              Priority Strategy Request Received
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
              Thank you, <strong className="text-white font-medium">{userName || 'Professional'}</strong>. Web Design King's executive team has received your Audit benchmark ({auditScore ? `${auditScore}/100` : 'Attached'}) and will review your digital architecture within 24 hours.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-sm mx-auto text-xs font-mono text-amber-300">
              ⚡ Next Step: Check your inbox ({userEmail || 'registered email'}) for your calendar invitation link.
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-all shadow-md mt-4"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-6 pr-2 -mr-2 my-2">
            <p className="text-sm text-white/70 font-light leading-relaxed">
              "Your digital presence is your silent salesperson." Partner directly with Web Design King to eliminate conversion bottlenecks and build an undisputed authority brand online.
            </p>

            {auditScore && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Attached Diagnostic Score:</span>
                <span className="text-amber-300 font-bold text-sm">{auditScore} / 100 Pts</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2.5 font-medium font-mono">
                Select Strategic Objective
              </label>
              <div className="space-y-2">
                {services.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setInquiryType(srv)}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                      inquiryType === srv
                        ? 'bg-white text-[#0A0A0B] border-white font-bold shadow-md'
                        : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                    }`}
                  >
                    <span>{srv}</span>
                    {inquiryType === srv && <Sparkles className="w-3.5 h-3.5 text-[#0A0A0B]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium font-mono">
                Project Notes / Current URL (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your current website URL, portfolio link, or timeline goals..."
                rows={3}
                className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-white/25 focus:outline-none focus:border-white/40 transition-all resize-none"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-[#0A0A0B] rounded-full text-xs uppercase tracking-[0.2em] font-extrabold hover:bg-white/90 transition-all shadow-xl hover:scale-105 flex items-center gap-2"
              >
                Request Strategy Session →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
