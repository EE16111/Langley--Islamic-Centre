import React from 'react';
import { LIC_DATA } from '../data/content';
import { 
  Clock, 
  Calendar, 
  Users, 
  ChevronRight, 
  Sun, 
  Sunset, 
  Sunrise, 
  Moon, 
  Compass, 
  FileText, 
  Download,
  ShieldAlert,
  Info,
  CalendarCheck
} from 'lucide-react';

export default function PrayerTimesSection({ 
  prayerData, 
  nextPrayer, 
  asrHanafi, 
  setAsrHanafi, 
  onOpenTimetable,
  onOpenQibla
}) {
  const todayStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const hijriStr = prayerData?.hijri?.formatted || '';
  const authorityLabel = prayerData?.config?.authorityLabel || "Regent's Park Mosque (ICCUK) / Unified London Standard";
  const announcement = prayerData?.config?.announcement;
  const jummah = prayerData?.jummah;

  const getPrayerIcon = (id) => {
    switch (id) {
      case 'fajr': return <Sunrise className="w-5 h-5 text-[#dfb76c]" />;
      case 'sunrise': return <Sun className="w-5 h-5 text-[#c5a059]" />;
      case 'dhuhr': return <Sun className="w-5 h-5 text-[#e6bc5c]" />;
      case 'asr': return <Sunset className="w-5 h-5 text-[#dfb76c]" />;
      case 'maghrib': return <Sunset className="w-5 h-5 text-[#e07a5f]" />;
      case 'isha': return <Moon className="w-5 h-5 text-[#9aa5b1]" />;
      default: return <Clock className="w-5 h-5 text-[#dfb76c]" />;
    }
  };

  return (
    <section id="prayer-times" className="py-24 relative bg-transparent border-t border-[#c5a059]/20 bg-jali-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Classical Architectural Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#c5a059]/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif font-semibold bg-[#162030] text-[#dfb76c] border border-[#c5a059]/30 mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>{authorityLabel}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f0e6] tracking-tight">
              Daily Prayer &amp; Jummah Schedule
            </h2>
            <div className="mt-2 text-sm sm:text-base text-stone-400 font-sans flex flex-wrap items-center gap-2">
              <span className="text-[#dfb76c] font-medium">{todayStr}</span>
              {hijriStr && (
                <>
                  <span className="text-[#c5a059]">•</span>
                  <span className="text-[#95d5b2] font-serif font-bold">{hijriStr}</span>
                </>
              )}
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 text-xs font-serif">Unit 2, Spitfire Close, Langley, SL3 8GY</span>
            </div>
          </div>

          {/* Controls: Asr School Selection & Timetable Calendars */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Asr Juristic Method Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#111722] border border-[#c5a059]/25 text-xs font-serif">
              <span className="px-3 text-stone-400 font-medium">Asr Method:</span>
              <button
                onClick={() => setAsrHanafi(false)}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  !asrHanafi 
                    ? 'bg-[#c5a059] text-[#080b10] shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Standard (Shafi'i/Maliki)
              </button>
              <button
                onClick={() => setAsrHanafi(true)}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  asrHanafi 
                    ? 'bg-[#c5a059] text-[#080b10] shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Hanafi (2x Shadow)
              </button>
            </div>

            {/* Qibla Compass Trigger */}
            <button
              onClick={onOpenQibla}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-bold text-[#dfb76c] bg-[#162030] hover:bg-[#1f2d44] border border-[#c5a059]/30 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4 text-[#dfb76c]" />
              <span>118.9° Qibla</span>
            </button>

            {/* Regent's Mosque Monthly Calendar & Timetable Trigger */}
            <button
              onClick={onOpenTimetable}
              className="btn-monumental-gold inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Monthly Timetable &amp; Calendar</span>
            </button>
          </div>
        </div>

        {/* Live Admin CMS Announcement Ticker Banner */}
        {announcement?.enabled && announcement?.text && (
          <div className="mb-8 p-4 rounded-2xl bg-[#1b4931]/30 border border-[#74c69d]/30 flex items-center justify-between gap-4 text-xs font-sans text-[#95d5b2]">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-[#74c69d] flex-shrink-0" />
              <span><strong>Mosque Notice:</strong> {announcement.text}</span>
            </div>
            <span className="text-[10px] font-mono text-[#74c69d] uppercase px-2 py-0.5 rounded bg-[#1b4931] border border-[#74c69d]/40 flex-shrink-0">
              Live Update
            </span>
          </div>
        )}

        {/* Friday Jumu'ah Dual Congregation Gilded Plaque */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl sanctuary-plaque relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center flex-shrink-0 text-[#dfb76c] shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#dfb76c] font-bold">
                    The Day of Jumu'ah • Friday Congregation
                  </span>
                  <span className="px-2 py-0.2 rounded text-[9px] font-serif font-bold uppercase bg-[#c5a059]/15 text-[#dfb76c] border border-[#c5a059]/30">
                    Spitfire Close Sanctuary
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f0e6]">
                  Friday Jummah Assemblies: 1st Jamaat {jummah?.first?.jamaatTime || '13:15'}
                  {jummah?.second?.enabled && ` & 2nd Jamaat ${jummah?.second?.jamaatTime || '14:15'}`}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1">
                  {jummah?.instructions || "Please perform Wudhu before leaving home. Adhere strictly to designated bays on Spitfire Close to maintain peace with neighbours."}
                </p>
              </div>
            </div>

            {/* Friday Timings Display Box */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 1st Assembly */}
              <div className="px-5 py-3 rounded-2xl bg-[#080b10] border border-[#c5a059]/30 text-center shadow-inner">
                <span className="text-[9px] font-serif uppercase tracking-widest text-[#c5a059] block font-bold">
                  1st Khutbah &amp; Jamaat
                </span>
                <span className="text-2xl font-mono font-black text-[#f4f0e6] block mt-0.5">
                  {jummah?.first?.jamaatTime || '13:15'}
                </span>
                <span className="text-[10px] font-sans text-stone-400 block mt-0.5">
                  Khutbah: {jummah?.first?.khutbahTime || '13:00'} ({jummah?.first?.khateeb || 'Imam'})
                </span>
              </div>

              {/* 2nd Assembly */}
              {jummah?.second?.enabled && (
                <div className="px-5 py-3 rounded-2xl bg-[#1b4931]/60 border border-[#2d6a4f] text-center shadow-md">
                  <span className="text-[9px] font-serif uppercase tracking-widest text-[#74c69d] block font-bold">
                    2nd Khutbah &amp; Jamaat
                  </span>
                  <span className="text-2xl font-mono font-black text-[#95d5b2] block mt-0.5">
                    {jummah?.second?.jamaatTime || '14:15'}
                  </span>
                  <span className="text-[10px] font-sans text-[#74c69d]/80 block mt-0.5">
                    Khutbah: {jummah?.second?.khutbahTime || '14:00'} ({jummah?.second?.khateeb || 'Scholar'})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monumental 6-Column Prayer Schedule Plaque */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {prayerData.prayers.map((prayer) => {
            const isNext = nextPrayer?.next?.id === prayer.id;
            const isCurrent = nextPrayer?.current?.id === prayer.id && !prayer.isSilent;

            return (
              <div
                key={prayer.id}
                className={`relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 ${
                  isNext
                    ? 'sanctuary-plaque border-2 border-[#dfb76c] shadow-[0_0_35px_-5px_rgba(223,183,108,0.35)] transform -translate-y-2 z-10'
                    : isCurrent
                    ? 'bg-[#14231b] border border-[#2d6a4f] shadow-lg'
                    : 'bg-[#0d121b]/80 border border-[#c5a059]/15 hover:border-[#c5a059]/35 hover:bg-[#111722]'
                }`}
              >
                {/* Active / Next Badges */}
                {isNext && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-serif font-black uppercase tracking-widest bg-[#dfb76c] text-[#080b10] shadow-md whitespace-nowrap">
                    Next Prayer Queue
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-serif font-black uppercase tracking-widest bg-[#2d6a4f] text-[#f4f0e6] shadow-md whitespace-nowrap">
                    Active Time
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-2xl bg-[#080b10]/60 border border-[#c5a059]/20">
                      {getPrayerIcon(prayer.id)}
                    </div>
                    <span className="font-arabic text-xl text-[#dfb76c] font-bold">
                      {prayer.arabic}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#f4f0e6] tracking-wide">
                    {prayer.name}
                  </h4>
                  <span className="text-[10px] font-serif uppercase tracking-wider text-stone-400">
                    {prayer.id === 'sunrise' ? 'Shuruq (Sunrise)' : 'Adhan Time'}
                  </span>
                </div>

                <div className="mt-5 pt-3 border-t border-[#c5a059]/15">
                  <div className="text-2xl font-mono font-black text-[#f4f0e6] tracking-tight">
                    {prayer.start.time12}
                  </div>

                  {prayer.jammaat && (
                    <div className="mt-1.5 flex items-center justify-between text-xs font-mono text-[#dfb76c]">
                      <span className="text-stone-400 text-[10px] font-serif uppercase tracking-wider">Iqamah:</span>
                      <span className="font-bold">{prayer.jammaat.time12}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Notice & Ramadan 1447 Preparation Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0c1017] border border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#dfb76c]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-serif font-bold text-[#f4f0e6]">
                Regent's Park Mosque (ICCUK) Format Wall Timetable &amp; 12-Month Calendar
              </h5>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                View daily and monthly schedules, print official wall posters, or export CSV and sync iCal directly to your phone.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTimetable}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-serif font-bold text-[#f4f0e6] bg-[#162030] hover:bg-[#1f2d44] border border-[#c5a059]/30 transition-all flex-shrink-0 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#dfb76c]" />
            <span>Open 12-Month Timetable &amp; Calendar</span>
          </button>
        </div>

      </div>
    </section>
  );
}
