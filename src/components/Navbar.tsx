import React from 'react';
import { UserInformation } from '../types';
import { ShieldCheck, Sparkles, Layout } from 'lucide-react';

interface NavbarProps {
  userInfo: UserInformation | null;
  onNavigateHome: () => void;
  onOpenHowItWorks: () => void;
  onOpenContact: () => void;
  currentStep: 'landing' | 'user-info' | 'assessment' | 'analyzing' | 'results';
}

export const Navbar: React.FC<NavbarProps> = ({
  userInfo,
  onNavigateHome,
  onOpenHowItWorks,
  onOpenContact,
  currentStep
}) => {
  const initials = userInfo?.name
    ? userInfo.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'WK';

  const sessionId = userInfo?.name
    ? '#' + Math.abs(userInfo.name.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).substring(0,4).toUpperCase() + '-AXP'
    : '#8842-AXP';

  return (
    <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 md:px-8 bg-[#0D0D0F] z-50 shrink-0 select-none sticky top-0">
      <div 
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={onNavigateHome}
      >
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm transition-transform group-hover:scale-105 shadow-sm">
          <span className="text-[#0A0A0B] font-bold text-xs italic font-serif">WD</span>
        </div>
        <span className="font-medium tracking-tight text-xs sm:text-sm uppercase tracking-[0.18em] text-white/90">
          Web Design King <span className="text-white/40 font-light italic px-1 font-serif">|</span> Audit™
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/60">
        <button 
          onClick={onNavigateHome} 
          className={`hover:text-white transition-colors flex items-center gap-1.5 ${currentStep === 'landing' ? 'text-white font-semibold' : ''}`}
        >
          <Layout className="w-3.5 h-3.5" />
          Assessment
        </button>
        <button 
          onClick={onOpenHowItWorks} 
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Framework
        </button>
        <button 
          onClick={onOpenContact} 
          className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300/80 hover:text-amber-300 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          King Strategy
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
          ID: {sessionId}
        </span>
        <div 
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-mono tracking-wider bg-white/5 text-white/80 cursor-help"
          title={userInfo?.name ? `Active Audit: ${userInfo.name}` : 'Guest Assessor'}
        >
          {initials}
        </div>
      </div>
    </nav>
  );
};
