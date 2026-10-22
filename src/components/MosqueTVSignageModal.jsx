import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Clock, 
  Calendar, 
  Tv, 
  QrCode, 
  Sparkles, 
  Volume2, 
  HeartHandshake,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import LicLogo from './LicLogo';
import { calculatePrayerTimes, getNextPrayer, subscribePrayerCMS } from '../utils/prayerTimes';

export default function MosqueTVSignageModal({ isOpen, onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cmsVersion, setCmsVersion] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const unsubscribe = subscribePrayerCMS(() => setCmsVersion(v => v + 1));
    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const prayerData = calculatePrayerTimes(currentTime, { asrHanafi: false });
  const nextPrayer = getNextPrayer(prayerData.prayers, currentTime);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formattedTime = currentTime.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Jamaat table with Adhan & Jamaat times
  const jamaatSchedule = [
    { name: 'Fajr', arabic: 'الفجر', adhan: prayerData.prayers.fajr, jamaat: '06:15' },
    { name: 'Sunrise', arabic: 'الشروق', adhan: prayerData.prayers.sunrise, jamaat: '—' },
    { name: 'Dhuhr', arabic: 'الظهر', adhan: prayerData.prayers.dhuhr, jamaat: '13:00' },
    { name: 'Asr', arabic: 'العصر', adhan: prayerData.prayers.asr, jamaat: '16:00' },
    { name: 'Maghrib', arabic: 'المغرب', adhan: prayerData.prayers.maghrib, jamaat: 'Sunset + 5m' },
    { name: 'Isha', arabic: 'العشاء', adhan: prayerData.prayers.isha, jamaat: '19:45' },
    { name: 'Jummah', arabic: 'الجمعة', adhan: '12:45', jamaat: '13:15 & 14:00' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#040810] text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* Top Banner Bar */}
      <header className="px-8 py-5 bg-gradient-to-r from-slate-950 via-[#0a1120] to-slate-950 border-b border-emerald-500/20 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <LicLogo className="w-14 h-14 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-white font-serif">
                Langley Islamic Centre
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                Spitfire Close Sanctuary
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Unit 2, Spitfire Close, Langley, Slough SL3 8GY • Reg Charity 1180443
            </p>
          </div>
        </div>

        {/* Live Digital Clock & Hijri Date */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-4xl font-black font-mono tracking-tight text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              {formattedTime}
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-0.5">
              {formattedDate} • <span className="text-amber-300">15 Rabi' al-Awwal 1448 AH</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
              title="Close TV Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main TV Dashboard Grid */}
      <main className="flex-1 p-8 grid grid-cols-12 gap-8 items-stretch overflow-hidden">
        
        {/* Left Col: Prayer Times Matrix (8 cols) */}
        <div className="col-span-8 flex flex-col justify-between">
          
          {/* Active Prayer Alert Card */}
          <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/60 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-5 z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 animate-pulse">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Next Prayer in Queue
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  {nextPrayer?.name} Iqamah
                </h2>
                <p className="text-sm text-slate-300">
                  Please prepare for prayer • Silence all phones and devices
                </p>
              </div>
            </div>

            <div className="text-right z-10">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Time Remaining</div>
              <div className="text-4xl font-black font-mono text-emerald-300 mt-1">
                {nextPrayer?.countdown || 'Upcoming'}
              </div>
            </div>
          </div>

          {/* Daily Schedule Table Cards */}
          <div className="grid grid-cols-7 gap-3 flex-1 items-stretch">
            {jamaatSchedule.map((p) => {
              const isNext = nextPrayer?.name?.toLowerCase() === p.name.toLowerCase();
              return (
                <div 
                  key={p.name}
                  className={`rounded-2xl p-4 flex flex-col justify-between border transition-all duration-300 ${
                    isNext 
                      ? 'bg-gradient-to-b from-emerald-900/40 to-slate-900 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-105 z-10 ring-2 ring-emerald-500/30' 
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>{p.name}</span>
                      <span className="font-serif text-slate-500 text-sm">{p.arabic}</span>
                    </div>
                    {isNext && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500 text-slate-950 font-mono">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="my-auto space-y-3 py-3">
                    <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                      <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">Adhan</div>
                      <div className="text-lg font-black font-mono text-slate-200 mt-0.5">{p.adhan}</div>
                    </div>

                    <div className={`p-2 rounded-xl text-center border ${
                      isNext 
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                        : 'bg-slate-950/80 border-slate-800/80 text-amber-300'
                    }`}>
                      <div className="text-[9px] font-bold uppercase tracking-wider opacity-75">Iqamah / Jamaat</div>
                      <div className="text-lg font-black font-mono mt-0.5">{p.jamaat}</div>
                    </div>
                  </div>

                  <div className="text-[9px] text-center text-slate-500 font-medium">
                    {p.name === 'Jummah' ? '2 Khutbahs' : 'Congregational'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Marquee Ticker */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4 overflow-hidden">
            <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hadith of the Day</span>
            </span>
            <div className="text-xs text-slate-300 italic truncate font-serif">
              "Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise." — Sahih al-Bukhari 450
            </div>
          </div>

        </div>

        {/* Right Col: Instant Donation QR & Mosque Notices (4 cols) */}
        <div className="col-span-4 flex flex-col justify-between space-y-6">
          
          {/* Donation Display Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-xl text-center flex flex-col items-center justify-center flex-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Immediate Sadaqah &amp; Lillah
            </span>

            <h3 className="text-xl font-black text-white mt-3 font-serif">
              Tap or Scan to Donate
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Supports Spitfire Close mortgage buyout &amp; day-to-day sanctuary maintenance
            </p>

            {/* Generated High Contrast QR Box */}
            <div className="my-5 p-4 rounded-3xl bg-white shadow-2xl border-4 border-amber-400/40">
              <div className="w-44 h-44 bg-slate-950 rounded-2xl p-3 flex flex-col items-center justify-center relative">
                <QrCode className="w-36 h-36 text-white" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-1 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest shadow">
                    LIC PAY
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              Apple Pay • Google Pay • Standing Order
            </div>

            <div className="mt-4 text-[11px] text-slate-400">
              Bank: <strong>HSBC UK</strong> • S/C: <strong>40-42-08</strong> • A/C: <strong>0249 4973</strong>
            </div>
          </div>

          {/* Parking & Etiquette Notice */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Spitfire Close Community Parking</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Please respect our neighbours. Park only in designated bays. Do not double-park or obstruct emergency access points along Spitfire Close.
            </p>
          </div>

        </div>

      </main>

      {/* Footer System Status */}
      <footer className="px-8 py-3 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LIC Mosque TV Screen v2.4 • Syncing live with Spitfire Close Ephemeris</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Powered by Langley Islamic Centre Digital System</span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white underline font-semibold"
          >
            Exit TV Mode (ESC)
          </button>
        </div>
      </footer>

    </div>
  );
}
