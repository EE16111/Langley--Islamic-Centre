import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Calendar, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function SZGMCPrayerWidget({ 
  prayerData, 
  nextPrayer, 
  onOpenTimetable 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  if (!prayerData || !prayerData.prayers) return null;

  const prayers = prayerData.prayers;
  const next = nextPrayer?.next || prayers[0];
  const isLight = theme === THEMES.LIGHT;
  const isAmbient = theme === THEMES.AMBIENT;

  // Bespoke line-art icons modeled after Sheikh Zayed Grand Mosque Center (SZGMC)
  const renderSZGMCIcon = (id) => {
    switch (id) {
      case 'fajr':
        return (
          // Moon + Cloud line art
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
            <path d="M7 16a3.5 3.5 0 0 1 6.5-1.5 2.5 2.5 0 0 1 3.5 2.5H7z" />
          </svg>
        );
      case 'sunrise':
        return (
          // Sun rising over horizon/water waves
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <path d="M12 2v4M4.93 7.93l2.83 2.83M19.07 7.93l-2.83 2.83" />
            <path d="M16 14a4 4 0 0 0-8 0" />
            <path d="M2 18h20M4 21h16" />
          </svg>
        );
      case 'dhuhr':
        return (
          // Full sun with radiant rays
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        );
      case 'asr':
        return (
          // Afternoon sun with concentric aura
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="12" cy="12" r="7" strokeDasharray="2 3" />
            <path d="M12 1v2M12 21v2M1 12h2M21 12h2" />
          </svg>
        );
      case 'maghrib':
        return (
          // Sun dipping into the horizon
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <path d="M17 14a5 5 0 0 0-10 0" />
            <path d="M12 4v4M12 11l-2-2M12 11l2-2" />
            <path d="M2 16h20M4 19h16M7 22h10" />
          </svg>
        );
      case 'isha':
        return (
          // Clear crescent moon
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[1.4]" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  // Silhouette Mosque vector graphic (SZGMC dome and minarets style)
  const MosqueSilhouette = () => (
    <svg className={`w-14 h-7 mx-auto transition-colors ${isLight ? 'text-[#b38728]' : 'text-[#dfb76c]'}`} viewBox="0 0 100 45" fill="currentColor">
      {/* Central Grand Dome */}
      <path d="M 50 8 C 45 8, 42 16, 42 24 L 58 24 C 58 16, 55 8, 50 8 Z" />
      <path d="M 50 4 L 50 8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="3" r="1.5" />
      {/* Side Domes */}
      <path d="M 34 16 C 30 16, 28 22, 28 26 L 40 26 C 40 22, 38 16, 34 16 Z" />
      <path d="M 66 16 C 62 16, 60 22, 60 26 L 72 26 C 72 22, 70 16, 66 16 Z" />
      {/* Minarets Left */}
      <rect x="18" y="6" width="3.5" height="28" rx="0.5" />
      <path d="M 17 6 L 19.75 1 L 22.5 6 Z" />
      {/* Minarets Right */}
      <rect x="78" y="6" width="3.5" height="28" rx="0.5" />
      <path d="M 77 6 L 79.75 1 L 82.5 6 Z" />
      {/* Base walls with arched porticos */}
      <rect x="14" y="26" width="72" height="12" />
      <path d="M 46 38 C 46 33, 54 33, 54 38 Z" fill={isLight ? '#fbf9f4' : '#080b10'} opacity="0.6" />
      <path d="M 32 38 C 32 34, 38 34, 38 38 Z" fill={isLight ? '#fbf9f4' : '#080b10'} opacity="0.6" />
      <path d="M 62 38 C 62 34, 68 34, 68 38 Z" fill={isLight ? '#fbf9f4' : '#080b10'} opacity="0.6" />
      <rect x="10" y="38" width="80" height="3" />
    </svg>
  );

  return (
    <div
      className={`fixed right-3 sm:right-6 top-20 sm:top-24 z-40 transition-all duration-500 ease-out select-none print:hidden ${
        isExpanded ? 'w-[260px] sm:w-[285px]' : 'w-[140px] sm:w-[155px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphic Container with Theme Adaptation */}
      <div 
        className={`rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
          isLight
            ? 'bg-[#ffffff]/90 text-stone-800 border-[#b38728]/40 shadow-[0_20px_50px_rgba(179,135,40,0.18)] ring-1 ring-black/5'
            : isAmbient
            ? 'bg-[#09101d]/90 text-slate-100 border-[#e2a844]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
            : 'bg-[#080b10]/90 text-[#f4f0e6] border-[#c5a059]/35 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/10'
        }`}
      >
        
        {/* Top Header Pin & Location */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 pb-2 text-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[#c5a059]">
            <MapPin className="w-3 h-3 text-[#c5a059] flex-shrink-0 animate-bounce" />
            <span>LANGLEY, SLOUGH</span>
          </div>

          <div className={`text-[10px] tracking-[0.2em] uppercase font-serif font-bold mt-0.5 ${
            isLight ? 'text-stone-700' : 'text-stone-300'
          }`}>
            PRAYER TIMINGS
          </div>

          <div className="my-1.5">
            <MosqueSilhouette />
          </div>

          <div className={`text-[8px] tracking-wider uppercase font-serif ${
            isLight ? 'text-stone-500' : 'text-stone-400'
          }`}>
            Langley Islamic Centre
          </div>
        </div>

        {/* COLLAPSED VIEW: Quick Next Prayer Preview */}
        {!isExpanded && (
          <div 
            onClick={() => setIsExpanded(true)}
            className={`px-3 pb-2.5 pt-1 text-center cursor-pointer border-t transition-colors ${
              isLight ? 'border-stone-200/80 hover:bg-stone-50/50' : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <div className={`text-[9px] uppercase tracking-wider font-mono font-bold ${
              isLight ? 'text-[#b38728]' : 'text-[#dfb76c]'
            }`}>
              NEXT: {next.name}
            </div>
            <div className={`text-sm font-mono font-black ${
              isLight ? 'text-stone-900' : 'text-white'
            }`}>
              {next.start.time12}
            </div>
            
            {/* Expand Chevron Icon */}
            <button
              className={`mt-1 w-full flex items-center justify-center transition-colors ${
                isLight ? 'text-[#b38728] hover:text-stone-900' : 'text-[#dfb76c] hover:text-white'
              }`}
              aria-label="Expand prayer timings"
            >
              <ChevronDown className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        )}

        {/* EXPANDED VIEW: Complete SZGMC Prayer Schedule */}
        {isExpanded && (
          <div className={`px-3.5 pb-3.5 pt-1 space-y-2.5 border-t ${
            isLight ? 'border-stone-200/80' : 'border-white/10'
          }`}>
            
            {/* NEXT PRAYER HERO CALLOUT */}
            <div className={`p-2.5 rounded-2xl border text-center relative overflow-hidden ${
              isLight
                ? 'bg-gradient-to-b from-[#faf5eb] to-[#f5eedb] border-[#c5a059]/40'
                : 'bg-white/5 border-white/10'
            }`}>
              <div className={`text-[9px] font-mono tracking-widest uppercase font-bold ${
                isLight ? 'text-[#8c671b]' : 'text-[#dfb76c]'
              }`}>
                NEXT PRAYER
              </div>
              <div className={`text-2xl font-mono font-black tracking-tight my-0.5 ${
                isLight ? 'text-stone-900' : 'text-white'
              }`}>
                {next.start.time12}
              </div>
              <div className={`text-xs font-serif font-bold uppercase tracking-wider ${
                isLight ? 'text-[#8c671b]' : 'text-[#dfb76c]'
              }`}>
                {next.name} • {next.arabic}
              </div>
              
              {nextPrayer?.countdown && (
                <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#1b4931]/60 text-[#74c69d] border border-[#74c69d]/30'
                }`}>
                  <Clock className="w-2.5 h-2.5" />
                  <span>
                    in {nextPrayer.countdown.hours}h {nextPrayer.countdown.mins}m
                  </span>
                </div>
              )}
            </div>

            {/* 6 PRAYER ROWS DIVIDED BY LINE SEPARATORS (SZGMC ABU DHABI STYLE) */}
            <div className={`divide-y text-xs font-mono ${
              isLight ? 'divide-stone-200/80' : 'divide-white/10'
            }`}>
              {prayers.map((p) => {
                const isNext = next.id === p.id;
                const isFriday = prayerData.isFriday && p.id === 'dhuhr';

                return (
                  <div 
                    key={p.id}
                    className={`py-1.5 px-1 flex items-center justify-between transition-colors ${
                      isNext 
                        ? isLight
                          ? 'bg-amber-100/70 rounded-xl px-2 font-bold text-stone-900 border border-amber-300/60'
                          : 'bg-white/10 rounded-xl px-2 font-bold text-[#dfb76c]'
                        : isLight 
                          ? 'text-stone-700 hover:text-stone-900' 
                          : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex-shrink-0 ${
                        isLight ? 'text-[#b38728]' : 'text-[#dfb76c]'
                      }`}>
                        {renderSZGMCIcon(p.id)}
                      </div>
                      <div>
                        <span className={`text-[11px] font-serif font-bold uppercase tracking-wider block ${
                          isLight ? 'text-stone-900' : 'text-stone-100'
                        }`}>
                          {isFriday ? 'JUMU\'AH' : p.name}
                        </span>
                        <span className={`text-[9px] font-sans block ${
                          isLight ? 'text-stone-500' : 'text-stone-400'
                        }`}>
                          {p.id === 'sunrise' ? 'Shuruq' : `Jamā'ah: ${p.jammaat ? p.jammaat.time12 : '-'}`}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xs font-mono font-bold ${
                        isLight ? 'text-stone-900' : 'text-white'
                      }`}>
                        {p.start.time12}
                      </div>
                      {isNext && (
                        <span className={`text-[8px] uppercase tracking-wider font-mono font-semibold ${
                          isLight ? 'text-emerald-700' : 'text-[#74c69d]'
                        }`}>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* QUICK ACTIONS & COLLAPSE CHEVRON */}
            <div className={`pt-2 border-t space-y-2 ${
              isLight ? 'border-stone-200/80' : 'border-white/10'
            }`}>
              <button
                onClick={() => {
                  if (onOpenTimetable) onOpenTimetable();
                }}
                className={`w-full py-1.5 px-3 rounded-xl text-[10px] font-serif font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                  isLight
                    ? 'bg-stone-100 hover:bg-[#c5a059] text-stone-800 hover:text-white border border-stone-300/80 shadow-sm'
                    : 'bg-white/10 hover:bg-[#c5a059] hover:text-[#080b10] border border-white/15'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Full Monthly Calendar</span>
                <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-70" />
              </button>

              <button
                onClick={() => setIsExpanded(false)}
                className={`w-full pt-0.5 flex items-center justify-center transition-colors ${
                  isLight ? 'text-[#b38728] hover:text-stone-900' : 'text-[#dfb76c] hover:text-white'
                }`}
                aria-label="Collapse prayer widget"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
