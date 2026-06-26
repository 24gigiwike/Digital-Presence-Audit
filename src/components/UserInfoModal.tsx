import React, { useState } from 'react';
import { UserInformation } from '../types';

interface UserInfoModalProps {
  onComplete: (info: UserInformation) => void;
  onCancel: () => void;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({
  onComplete,
  onCancel
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('Web Designer');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Experienced'>('Intermediate');
  const [mainPlatform, setMainPlatform] = useState('Website');
  const [error, setError] = useState('');

  const professions = [
    'Web Designer',
    'Developer',
    'Marketer',
    'Copywriter',
    'Freelancer',
    'Agency Owner',
    'Entrepreneur',
    'Creator',
    'Other'
  ];

  const platforms = [
    'Website',
    'Instagram',
    'LinkedIn',
    'Behance',
    'Dribbble',
    'Other'
  ];

  const experienceLevels: Array<'Beginner' | 'Intermediate' | 'Experienced'> = [
    'Beginner',
    'Intermediate',
    'Experienced'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name or brand name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid professional email address.');
      return;
    }
    setError('');
    onComplete({
      name: name.trim(),
      email: email.trim(),
      profession,
      experienceLevel,
      mainPlatform
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-6 flex flex-col items-center justify-center select-none animate-fade-in">
      <div className="w-full bg-white border border-[#82e3aa] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient flare */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#81eee8]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#82e3aa]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#82e3aa]/30 border border-[#42c28b]/30 flex items-center justify-center text-black font-mono font-bold text-sm">
              01
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-black font-mono font-bold block opacity-60">
                Step 1 of 2 • Setup
              </span>
              <h2 className="text-xl font-bold text-black tracking-tight">
                Assessor Profile Foundation
              </h2>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-xs uppercase tracking-widest text-black font-bold opacity-60 hover:opacity-100 transition-opacity"
          >
            Cancel
          </button>
        </div>

        <p className="text-sm text-black font-normal opacity-85 mb-8 leading-relaxed">
          Your diagnostic audit is calibrated specifically to your category and primary digital channel. This ensures your benchmark score compares accurately against top agency standards.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#fb7474]/20 border border-[#fb7474] text-black text-xs font-semibold flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-[#fb7474]"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-black font-bold mb-2 opacity-75">
                Your Full Name / Brand
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Draper"
                className="w-full bg-white border border-[#82e3aa] rounded-xl px-4 py-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#42c28b] focus:ring-1 focus:ring-[#42c28b] transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-black font-bold mb-2 opacity-75">
                Professional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. julian@studio.com"
                className="w-full bg-white border border-[#82e3aa] rounded-xl px-4 py-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#42c28b] focus:ring-1 focus:ring-[#42c28b] transition-all shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-black font-bold mb-2 opacity-75">
              Profession / Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {professions.map((prof) => (
                <button
                  key={prof}
                  type="button"
                  onClick={() => setProfession(prof)}
                  className={`px-3.5 py-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between font-normal ${
                    profession === prof
                      ? 'bg-[#42c28b] text-black border-[#42c28b] font-bold shadow-md'
                      : 'bg-white border-[#82e3aa]/50 text-black hover:border-[#42c28b] hover:bg-[#fbf6bc]/20'
                  }`}
                >
                  <span>{prof}</span>
                  {profession === prof && <i className="fa-solid fa-check text-black text-xs"></i>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-black font-bold mb-2 opacity-75">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {experienceLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-3 px-2 rounded-xl border text-xs text-center transition-all ${
                      experienceLevel === lvl
                        ? 'bg-[#81eee8] border-[#42c28b] text-black font-bold shadow-sm'
                        : 'bg-white border-[#82e3aa]/50 text-black hover:border-[#42c28b]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-black font-bold mb-2 opacity-75">
                Primary Presence Channel
              </label>
              <select
                value={mainPlatform}
                onChange={(e) => setMainPlatform(e.target.value)}
                className="w-full bg-white border border-[#82e3aa] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#42c28b] transition-all cursor-pointer shadow-sm"
              >
                {platforms.map((plat) => (
                  <option key={plat} value={plat} className="bg-white text-black">
                    {plat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-[#82e3aa]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-black font-mono opacity-60">
              <i className="fa-solid fa-lock text-[#42c28b]"></i>
              <span>Executive Agency Privacy Standard Active</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#82e3aa] to-[#42c28b] text-black rounded-full text-xs font-black uppercase tracking-[0.2em] hover:shadow-lg transition-all shadow-md hover:scale-105 flex items-center justify-center gap-2 border border-white"
            >
              Start Assessment
              <i className="fa-solid fa-arrow-right text-black"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
