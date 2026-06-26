import React from 'react';

interface NavbarProps {
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome }) => {
  return (
    <header className="w-full py-8 px-6 bg-white border-b border-[#82e3aa]/30 flex items-center justify-center select-none shrink-0">
      <div 
        onClick={onNavigateHome}
        className="cursor-pointer group flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 duration-300"
      >
        <img src="https://res.cloudinary.com/dtkluxukm/image/upload/v1781877708/8_cwwfre.png" alt="Brand Logo" className="w-20 h-20 sm:w-25 sm:h-25 object-contain" />
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-tight text-lg text-black uppercase tracking-[0.12em]">
            Audit Engine™
          </span>
          <span className="text-xs tracking-[0.2em] font-mono text-black uppercase">
            with BROADBRAND
          </span>
        </div>
      </div>
    </header>
  );
};
