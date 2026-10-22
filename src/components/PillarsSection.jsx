import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import { 
  Sparkles, 
  HeartHandshake, 
  Users, 
  Compass, 
  ShieldAlert, 
  Globe, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function PillarsSection({ onOpenVolunteerModal }) {
  const [activeTab, setActiveTab] = useState('youth');

  const pillars = LIC_DATA.pillars;
  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  const getIcon = (id) => {
    switch (id) {
      case 'youth': return <Sparkles className="w-4 h-4 text-[#dfb76c]" />;
      case 'sisters': return <HeartHandshake className="w-4 h-4 text-[#dfb76c]" />;
      case 'families': return <Users className="w-4 h-4 text-[#dfb76c]" />;
      case 'men': return <Compass className="w-4 h-4 text-[#dfb76c]" />;
      case 'wellbeing': return <ShieldAlert className="w-4 h-4 text-[#dfb76c]" />;
      case 'charity': return <Globe className="w-4 h-4 text-[#dfb76c]" />;
      default: return <Sparkles className="w-4 h-4 text-[#dfb76c]" />;
    }
  };

  return (
    <section id="community-pillars" className="py-28 relative bg-transparent border-t border-[#c5a059]/15 overflow-hidden">
      {/* Background Girih Lattice */}
      <div className="absolute inset-0 bg-jali-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-arabic text-2xl text-[#c5a059] mb-2 tracking-wide">
            أركان المجتمع والخدمة العامة
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-serif tracking-widest text-[#dfb76c] bg-[#1a2332]/70 border border-[#c5a059]/30 mb-4 uppercase">
            <Users className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Civic Foundations • Community Welfare</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#f4f0e6] tracking-tight leading-tight">
            The Six Pillars of Community Life
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Uniting generations across Berkshire through sacred education, youth sports, sisters' empowerment, family counselling, and frontline humanitarian aid.
          </p>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
          {pillars.map((pillar) => {
            const isActive = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-serif tracking-wider uppercase transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#1a2332] text-[#dfb76c] border-[#c5a059] shadow-lg shadow-black/40 scale-105'
                    : 'bg-[#080b10]/80 text-slate-400 border-[#c5a059]/20 hover:text-[#f4f0e6] hover:border-[#c5a059]/50'
                }`}
              >
                {getIcon(pillar.id)}
                <span>{pillar.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Architectural Monograph Card */}
        <div className="sanctuary-plaque architectural-card p-8 sm:p-12 rounded-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex-shrink-0">
                  {getIcon(currentPillar.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059] block">
                    {currentPillar.name} Initiatives
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f0e6]">
                    {currentPillar.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                {currentPillar.description}
              </p>

              {/* Parchment Quote Frame */}
              <div className="p-4 rounded-xl bg-[#080b10]/80 border-l-2 border-l-[#c5a059] border-y border-r border-[#c5a059]/15 italic text-xs sm:text-sm text-[#dfb76c] font-serif">
                "{currentPillar.quote}"
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={onOpenVolunteerModal}
                  className="btn-monumental-gold px-6 py-3 rounded-xl text-xs font-serif font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg"
                >
                  <span>Volunteer for {currentPillar.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  + REGISTERED CHARITY INITIATIVE
                </span>
              </div>
            </div>

            {/* Right Activity List (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-[#080b10]/90 border border-[#c5a059]/20 relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c5a059]/15">
                <h4 className="text-[11px] font-serif uppercase tracking-wider text-[#dfb76c] font-bold">
                  Active Programmes &amp; Outreaches
                </h4>
                <span className="text-[10px] font-mono text-[#c5a059]">LANGLEY SL3</span>
              </div>

              <div className="space-y-3.5">
                {currentPillar.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#74c69d] flex-shrink-0 mt-0.5" />
                    <span className="font-sans leading-snug">{act}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#c5a059]/15 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Safe Church &amp; Mosque Policy</span>
                <span className="text-[#dfb76c]">100% Volunteer Driven</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
