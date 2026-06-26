import React, { useState } from 'react';
import { UserInformation } from '../types';
import { ArrowRight, UserCheck, Shield, Sparkles } from 'lucide-react';

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
      setError('Please enter your full name or agency name.');
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
    <div className="flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Decorative background flare */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">
              01
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono block">
                Step 1 of 2 • Setup
              </span>
              <h2 className="text-lg font-medium text-white tracking-tight">
                Assessor Profile Foundation
              </h2>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="text-sm text-white/70 font-light mb-8 leading-relaxed">
          Your diagnostic benchmark is calibrated specifically to your category and primary channel. This ensures your <strong className="text-white font-medium">Digital Presence Score™</strong> compares accurately to market leaders in your niche.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
                Your Full Name / Brand
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Draper"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/40 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
                Professional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. julian@studio.com"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/40 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
              Profession / Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {professions.map((prof) => (
                <button
                  key={prof}
                  type="button"
                  onClick={() => setProfession(prof)}
                  className={`px-3.5 py-3 rounded-xl border text-xs font-light text-left transition-all flex items-center justify-between ${
                    profession === prof
                      ? 'bg-white text-[#0A0A0B] border-white font-medium shadow-md'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <span>{prof}</span>
                  {profession === prof && <Sparkles className="w-3 h-3 text-[#0A0A0B]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
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
                        ? 'bg-white/20 border-white text-white font-medium'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
                Primary Presence Channel
              </label>
              <select
                value={mainPlatform}
                onChange={(e) => setMainPlatform(e.target.value)}
                className="w-full bg-[#121215] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-all cursor-pointer"
              >
                {platforms.map((plat) => (
                  <option key={plat} value={plat} className="bg-[#0A0A0B] text-white">
                    {plat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
              <Shield className="w-4 h-4 text-emerald-400/80" />
              <span>Executive Privacy Standard Active</span>
            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-white text-[#0A0A0B] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
