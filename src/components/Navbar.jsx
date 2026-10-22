import React, { useState, useEffect } from 'react';
import { LIC_DATA } from '../data/content';
import LicLogo from './LicLogo';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { 
  Heart, 
  Clock, 
  MapPin, 
  BookOpen, 
  Menu, 
  X, 
  Phone, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Compass,
  Layers,
  Settings,
  Tv
} from 'lucide-react';

export default function Navbar({ 
  nextPrayer, 
  onOpenDonate, 
  onOpenTimetable, 
  onOpenQuranModal,
  onOpenFloorPlan,
  onOpenQibla,
  onOpenAdmin,
  onOpenTVSignage
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isAmbient = theme === 'ambient';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prayer Times', href: '#prayer-times' },
    { name: 'Permanent Home', href: '#spitfire-close' },
    { name: 'Stories & Cup', href: '#stories' },
    { name: 'Quran Classes', href: '#quran-classes' },
    { name: 'Community', href: '#community-pillars' },
    { name: 'Charity (100%)', href: '#charity-work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? scrolled 
              ? 'bg-[#fbf9f4]/95 backdrop-blur-2xl border-b border-[#b38728]/25 shadow-[0_4px_25px_rgba(0,0,0,0.06)] py-2.5' 
              : 'bg-[#fbf9f4]/80 backdrop-blur-xl border-b border-[#b38728]/20 py-3.5'
            : isAmbient
            ? scrolled
              ? 'bg-[#09101d]/95 backdrop-blur-2xl border-b border-[#e2a844]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2.5'
              : 'bg-[#09101d]/80 backdrop-blur-xl border-b border-[#e2a844]/20 py-3.5'
            : scrolled 
              ? 'bg-[#080b10]/95 backdrop-blur-2xl border-b border-[#c5a059]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2.5' 
              : 'bg-[#080b10]/70 backdrop-blur-xl border-b border-[#c5a059]/15 py-3.5'
        }`}
      >
        {/* Subtle antique gold top hairline beam */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#dfb76c]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand */}
            <a href="#" className="flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <LicLogo variant="gold" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(197,160,89,0.3)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`font-serif font-bold text-base sm:text-lg tracking-tight transition-colors ${
                    isLight ? 'text-stone-900 group-hover:text-[#b38728]' : 'text-[#f4f0e6] group-hover:text-[#dfb76c]'
                  }`}>
                    Langley Islamic Centre
                  </span>
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#c5a059]/15 text-[#dfb76c] border border-[#c5a059]/30">
                    Charity #{LIC_DATA.charityNumber}
                  </span>
                </div>
                <span className={`text-[11px] font-serif hidden sm:block tracking-wide ${
                  isLight ? 'text-stone-500' : 'text-stone-400'
                }`}>
                  Spitfire Close Sanctuary • Langley, Slough SL3 8GY
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full backdrop-blur-md ${
              isLight
                ? 'bg-white/80 border border-[#b38728]/30 shadow-sm'
                : 'bg-[#111722]/80 border border-[#c5a059]/20'
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-serif font-medium rounded-full transition-all duration-200 ${
                    isLight
                      ? 'text-stone-700 hover:text-[#b38728] hover:bg-stone-100'
                      : 'text-stone-300 hover:text-[#dfb76c] hover:bg-[#192233]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Quick Action Badges & CTA */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Qibla Direction Button */}
              <button
                onClick={onOpenQibla}
                className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                  isLight
                    ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 hover:text-[#b38728] shadow-sm'
                    : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:text-[#dfb76c] hover:bg-[#1a2436]'
                }`}
                title="Find Qibla Direction from Langley (118.9° ESE)"
              >
                <Compass className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>118.9° Qibla</span>
              </button>

              {/* Waqf Floor Plan Button */}
              <button
                onClick={onOpenFloorPlan}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium bg-[#14231b] border border-[#2d6a4f]/50 hover:border-[#52b788] text-[#95d5b2] hover:text-white transition-all hover:bg-[#1b3829]"
                title="Interactive Waqf Prayer Hall Floor Plan"
              >
                <Layers className="w-3.5 h-3.5 text-[#74c69d]" />
                <span>Waqf Map</span>
              </button>

              {/* Next Prayer Pill */}
              {nextPrayer && (
                <button
                  onClick={onOpenTimetable}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-medium transition-all group ${
                    isLight
                      ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 shadow-sm'
                      : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:bg-[#1a2436]'
                  }`}
                  title="Click to view 12-month timetables"
                >
                  <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
                  <span className={isLight ? 'text-stone-500' : 'text-stone-400'}>Next:</span>
                  <span className={`font-bold transition-colors ${
                    isLight ? 'text-stone-900 group-hover:text-[#b38728]' : 'text-[#f4f0e6] group-hover:text-[#dfb76c]'
                  }`}>
                    {nextPrayer.next.name} ({nextPrayer.next.start.time12})
                  </span>
                </button>
              )}

              {/* Mosque TV Screen Mode */}
              <button
                onClick={onOpenTVSignage}
                className={`hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                  isLight
                    ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 hover:text-[#b38728] shadow-sm'
                    : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:text-[#dfb76c] hover:bg-[#1a2436]'
                }`}
                title="Launch Mosque TV Fullscreen Signage Display"
              >
                <Tv className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>TV Mode</span>
              </button>

              {/* Admin Committee Portal */}
              <button
                onClick={onOpenAdmin}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                  isLight
                    ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 hover:text-[#b38728] shadow-sm'
                    : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:text-[#dfb76c] hover:bg-[#1a2436]'
                }`}
                title="Open LIC Committee Admin Portal (£99/mo Services Suite)"
              >
                <Settings className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span className="hidden xl:inline">Admin</span>
              </button>

              {/* Theme Mode Switcher */}
              <div className="hidden sm:block">
                <ThemeSwitcher variant="navbar" />
              </div>

              {/* Donate Button */}
              <button
                onClick={onOpenDonate}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-serif font-bold text-[#080b10] btn-monumental-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-3.5 h-3.5 fill-[#080b10]" />
                <span>Waqf Appeal</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenDonate}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600"
              >
                Donate
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/60 border border-slate-700/50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 w-5/6 max-w-sm bg-[#0d1527] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Charity Tag */}
              <div className="p-3 mb-3 rounded-xl bg-sky-950/40 border border-sky-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-medium text-slate-300">Registered UK Charity</span>
                </div>
                <span className="text-xs font-bold text-sky-400">#1180443</span>
              </div>

              {/* Mobile Theme Selector */}
              <div className="p-2.5 mb-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-serif text-stone-300">Theme</span>
                <ThemeSwitcher variant="navbar" />
              </div>

              {/* Next Prayer Mobile Info */}
              {nextPrayer && (
                <div 
                  onClick={() => { setMobileMenuOpen(false); onOpenTimetable(); }}
                  className="p-3.5 mb-6 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-sky-500/40"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Next Prayer</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      In {nextPrayer.countdown.hours}h {nextPrayer.countdown.mins}m
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white flex items-center justify-between">
                    <span>{nextPrayer.next.name}</span>
                    <span className="text-sky-400">{nextPrayer.next.start.time12}</span>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-sky-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-glow-cyan"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to Urgent Appeal</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuranModal(); }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Register for Quran Classes</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenTVSignage(); }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-sky-300 bg-slate-900 border border-slate-800"
                >
                  <Tv className="w-3.5 h-3.5 text-sky-400" />
                  <span>Mosque TV</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-amber-300 bg-slate-900 border border-slate-800"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Panel</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <a href="tel:07843732106" className="hover:text-white">078 4373 2106</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
