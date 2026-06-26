import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 bg-[#fbf6bc]/30 border-t border-[#82e3aa]/30 mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0 select-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="https://res.cloudinary.com/dtkluxukm/image/upload/v1781877708/8_cwwfre.png" alt="Brand Logo" className="w-20 h-20 sm:w-25 sm:h-25 object-contain" />
          <span className="font-bold text-black tracking-tight text-sm">
            Web Design King Audit™
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/webdesignking_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-[#82e3aa] flex items-center justify-center text-[#42c28b] hover:bg-[#81eee8]/40 transition-colors shadow-sm"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram text-lg"></i>
          </a>
          <a 
            href="https://youtube.com/@webdesignkinging" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-[#82e3aa] flex items-center justify-center text-[#fb7474] hover:bg-[#fbf6bc] transition-colors shadow-sm"
            aria-label="YouTube"
          >
            <i className="fa-brands fa-youtube text-lg"></i>
          </a>
        </div>

        <div>
          <a 
            href="https://webdesignking.online" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-black hover:underline inline-flex items-center gap-2 text-sm"
          >
            <span>Official Web Design King Website</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[#42c28b] text-xs"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
