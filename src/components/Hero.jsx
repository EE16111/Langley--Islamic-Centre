import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import LicLogo from './LicLogo';
import { 
  Heart, 
  MapPin, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  Layers,
  FileText,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ 
  nextPrayer, 
  onOpenDonate, 
  onOpenTimetable, 
  onOpenQuranModal,
  onOpenFloorPlan,
  onOpenStandingOrder,
  onOpenQibla
}) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [logoTheme, setLogoTheme] = useState('gold'); // 'gold' default for authentic sanctuary feel
  const [bgPhoto, setBgPhoto] = useState('mosque'); // 'mosque' | 'spitfire'

  const handleCopyBank = () => {
    const text = `Langley Islamic Centre Bank Transfer:
Bank: ${LIC_DATA.bankDetails.bank}
Account Name: ${LIC_DATA.bankDetails.accountName}
Account No: ${LIC_DATA.bankDetails.accountNumber}
Sort Code: ${LIC_DATA.bankDetails.sortCode}
Charity Reg No: 1180443`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopiedBank(false), 3000);
  };

  return (
    <section className="relative min-h-[780px] lg:min-h-[880px] flex items-center justify-center pt-36 sm:pt-40 pb-20 overflow-hidden bg-[#080b10] bg-jali-pattern">
      
      {/* Real Mosque Architectural Photographic Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bgPhoto === 'mosque' ? '/src/assets/mosque_hero_bg.jpg' : '/src/assets/SpitFireSlider.jpg'}
          alt="Mosque Architectural Sanctuary Backdrop"
          className="w-full h-full object-cover object-center scale-105 opacity-30 sm:opacity-40 transition-all duration-1000 filter brightness-90 contrast-125"
        />
        {/* Architectural Vignette: Obsidian & Deep Warm Charcoal */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b10] via-[#080b10]/90 to-[#080b10]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-transparent to-[#080b10]/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b10]/90 via-transparent to-[#080b10]" />
        {/* Subtle Antique Brass Tone Wash */}
        <div className="absolute inset-0 bg-[#3d2f13]/10 mix-blend-color" />
      </div>

      {/* Architectural Corner Registration Crosshairs (+) */}
      <div className="hidden lg:block absolute top-28 left-8 text-[11px] font-mono text-[#c5a059]/40 select-none">
        + 51.5074° N, 0.5408° W
      </div>
      <div className="hidden lg:block absolute top-28 right-8 text-[11px] font-mono text-[#c5a059]/40 select-none text-right">
        QIBLA 118.9° ESE +
      </div>

      {/* Backdrop Scene Switcher */}
      <div className="absolute top-28 right-4 sm:right-10 z-20 hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-[#0e141f]/90 border border-[#c5a059]/25 shadow-xl backdrop-blur-xl text-[10px]">
        <span className="pl-2.5 pr-1 text-[#c5a059] font-serif uppercase tracking-widest text-[9px]">Viewpoint:</span>
        <button
          onClick={() => setBgPhoto('mosque')}
          className={`px-3 py-1 rounded-full font-serif font-bold transition-all ${
            bgPhoto === 'mosque'
              ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          Grand Arches
        </button>
        <button
          onClick={() => setBgPhoto('spitfire')}
          className={`px-3 py-1 rounded-full font-serif font-bold transition-all ${
            bgPhoto === 'spitfire'
              ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          Spitfire Close
        </button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Bismillah Header Calligraphy with Gold Leaf Finish */}
        <div className="mb-4 inline-flex flex-col items-center">
          <span className="font-arabic text-3xl sm:text-4xl gold-leaf-text tracking-wide select-none drop-shadow-md">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <span className="text-[10px] sm:text-[11px] font-serif text-[#c5a059]/80 uppercase tracking-[0.25em] mt-1">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </span>
        </div>

        {/* Permanent Sanctuary Civic Trust Seal */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111722]/80 border border-[#c5a059]/30 shadow-lg backdrop-blur-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dfb76c]"></span>
          </span>
          <span className="font-serif text-xs sm:text-sm text-[#f4f0e6] font-medium tracking-wide">
            Unit 2, Spitfire Close, Langley <span className="text-[#c5a059] mx-1">•</span> Permanent Waqf Sanctuary
          </span>
          <span className="hidden md:inline-flex items-center px-2 py-0.2 rounded text-[9px] font-mono uppercase bg-[#c5a059]/15 text-[#dfb76c] border border-[#c5a059]/30">
            Charity #{LIC_DATA.charityNumber}
          </span>
        </div>

        {/* Central Architectural Emblem with Gold Leaf Border */}
        <div className="relative mb-8 flex flex-col items-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 flex items-center justify-center p-4 rounded-3xl sanctuary-plaque group transition-transform duration-500 hover:scale-[1.02]">
            <LicLogo 
              variant={logoTheme} 
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(197,160,89,0.35)]" 
              glow={true} 
            />
            {/* Theme switcher pill */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-[#0a0e16] border border-[#c5a059]/35 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setLogoTheme('gold')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold tracking-wider transition-all ${
                  logoTheme === 'gold' 
                    ? 'bg-[#c5a059] text-[#080b10] shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Gilded Antique Gold"
              >
                Gilded Gold
              </button>
              <button
                onClick={() => setLogoTheme('white')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold tracking-wider transition-all ${
                  logoTheme === 'white' 
                    ? 'bg-stone-200 text-[#080b10] shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Monochrome Alabaster"
              >
                Alabaster
              </button>
              <button
                onClick={() => setLogoTheme('original')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold tracking-wider transition-all ${
                  logoTheme === 'original' 
                    ? 'bg-sky-500 text-white shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Founding Colours"
              >
                Founding
              </button>
            </div>
          </div>
        </div>

        {/* Monumental Editorial Headlines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#f4f0e6] max-w-4xl leading-[1.08] tracking-tight">
          In the heart of Langley, <br />
          <span className="shimmer-gold italic font-normal">a sanctuary for generations.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-stone-300/90 max-w-2xl font-sans font-light leading-relaxed">
          {LIC_DATA.tagline} United in faith, learning, and service. Help us secure the remaining £550,000 to purchase our permanent home on Spitfire Close debt-free.
        </p>

        {/* Analog Sanctuary Prayer Plaque (Bespoke Handcrafted Timetable Bar) */}
        {nextPrayer && (
          <div className="mt-8 max-w-3xl w-full sanctuary-plaque p-4 sm:p-5 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Solar Position & Next Congregational Prayer */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#dfb76c] flex-shrink-0">
                  <Sun className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#c5a059] font-bold">
                      Congregational Jamaat Queue
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4f0e6] leading-none mt-1">
                    {nextPrayer.next.name} Iqamah
                  </h3>
                  <span className="text-xs text-stone-400 font-mono mt-0.5 block">
                    Adhan: {nextPrayer.next.start.time12} • Jamaat in congregation
                  </span>
                </div>
              </div>

              {/* Digital Countdown Timer */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-800/80">
                <div className="text-left sm:text-right">
                  <span className="text-[9px] font-serif uppercase tracking-widest text-stone-400 block">
                    Commences in
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-[#dfb76c] tracking-tight">
                    {String(nextPrayer.countdown.hours).padStart(2, '0')}h : {String(nextPrayer.countdown.mins).padStart(2, '0')}m : {String(nextPrayer.countdown.secs).padStart(2, '0')}s
                  </div>
                </div>

                <button
                  onClick={onOpenTimetable}
                  className="px-4 py-2.5 rounded-2xl text-xs font-serif font-bold text-[#f4f0e6] bg-[#162030] hover:bg-[#1f2d44] border border-[#c5a059]/30 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>12-Mo Timetable</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfb76c]" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Primary Bespoke Monumental CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenDonate}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-9 py-4 rounded-full btn-monumental-gold text-base uppercase tracking-wider font-bold transition-all"
          >
            <Heart className="w-4 h-4 fill-[#080b10]" />
            <span>Support £550,000 Waqf Appeal</span>
          </button>

          <button
            onClick={onOpenQuranModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-monumental-dark text-base font-serif font-semibold tracking-wide transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#dfb76c]" />
            <span>Madrasah Student Admission</span>
          </button>
        </div>

        {/* Authentic Civic & Spatial Tools Ribbon */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={onOpenFloorPlan}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-bold text-[#dfb76c] bg-[#141b27] hover:bg-[#1c2738] border border-[#c5a059]/30 shadow-sm transition-all hover:scale-105"
          >
            <Layers className="w-3.5 h-3.5 text-[#dfb76c]" />
            <span>Waqf Prayer Hall Spatial Map (96 Musallah Spots)</span>
          </button>

          <button
            onClick={onOpenStandingOrder}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-medium text-stone-300 bg-[#111722] hover:bg-[#1a2333] border border-stone-800 transition-all hover:text-white hover:scale-105"
          >
            <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Monthly Bank Standing Order Mandate</span>
          </button>

          <button
            onClick={onOpenQibla}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-medium text-stone-300 bg-[#111722] hover:bg-[#1a2333] border border-stone-800 transition-all hover:text-white hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Langley Qibla Compass (118.9° ESE)</span>
          </button>
        </div>

        {/* Official UK Charity Banking Guarantee Ledger */}
        <div className="mt-8 pt-6 border-t border-[#c5a059]/15 max-w-3xl w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0c1017]/90 border border-[#c5a059]/20 text-xs text-stone-300 shadow-xl">
            <div className="flex items-center gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-[#dfb76c] flex-shrink-0" />
              <div>
                <strong className="text-[#f4f0e6] font-serif tracking-wide block">
                  Official HSBC UK Trust Account • 100% Policy
                </strong>
                <span className="text-[11px] text-stone-400 font-mono">
                  Langley Islamic Centre • A/C: <span className="text-[#f4f0e6] font-bold">0249 4973</span> • S/C: <span className="text-[#f4f0e6] font-bold">40-42-08</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyBank}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                copiedBank
                  ? 'bg-[#1b4931] text-[#74c69d] border border-[#2d6a4f]'
                  : 'bg-[#162030] hover:bg-[#1e2d42] text-[#dfb76c] border border-[#c5a059]/30'
              }`}
            >
              {copiedBank ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Mandate Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Mandate Details</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Elegant Architectural Scroll Down Indicator */}
      <a 
        href="#prayer-times" 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#c5a059]/60 hover:text-[#dfb76c] transition-colors animate-bounce"
        aria-label="Scroll to prayer timetable"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
