import React, { useState, useEffect } from 'react';
import { LIC_DATA } from '../data/content';
import LicLogo from './LicLogo';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import { 
  Menu, 
  X, 
  Heart, 
  MapPin, 
  Clock, 
  Compass, 
  Phone, 
  Layers, 
  Tv, 
  Settings, 
  ChevronRight, 
  Lock
} from 'lucide-react';

export default function Navbar({ 
  onOpenDonate, 
  onOpenTimetable, 
  onOpenQuranModal, 
  onOpenVolunteerModal, 
  onOpenFloorPlan, 
  onOpenStandingOrder,
  onOpenQibla,
  onOpenAdmin,
  onOpenTVSignage,
  nextPrayer,
  prayerWidgetOpen = false,
  onTogglePrayerWidget
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isAmbient = theme === 'ambient';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prayer Times', href: '#prayer-times' },
    { name: 'Spitfire Waqf', href: '#spitfire-close' },
    { name: 'Stories & Cup', href: '#stories' },
    { name: 'Qibla Finder', href: '#qibla' },
    { name: 'Quran Classes', href: '#quran-classes' },
    { name: 'Charity (100%)', href: '#charity-work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 select-none ${
          isLight
            ? scrolled 
              ? 'bg-[#fbf9f4]/95 backdrop-blur-xl border-b border-[#b38728]/25 shadow-sm py-2' 
              : 'bg-[#fbf9f4]/90 backdrop-blur-md border-b border-[#b38728]/15 py-2.5'
            : isAmbient
            ? scrolled
              ? 'bg-[#09101d]/95 backdrop-blur-xl border-b border-[#e2a844]/25 shadow-lg py-2'
              : 'bg-[#09101d]/90 backdrop-blur-md border-b border-[#e2a844]/20 py-2.5'
            : scrolled 
              ? 'bg-[#080b10]/95 backdrop-blur-xl border-b border-[#c5a059]/20 shadow-lg py-2' 
              : 'bg-[#080b10]/90 backdrop-blur-md border-b border-[#c5a059]/15 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo Brand */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <LicLogo variant="gold" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-serif font-bold text-sm sm:text-base tracking-tight transition-colors ${
                    isLight ? 'text-stone-900 group-hover:text-[#b38728]' : 'text-[#f4f0e6] group-hover:text-[#dfb76c]'
                  }`}>
                    Langley Islamic Centre
                  </span>
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#c5a059]/15 text-[#dfb76c] border border-[#c5a059]/30">
                    CIO #1180443
                  </span>
                </div>
                <span className={`text-[10px] font-serif hidden sm:block tracking-wide ${
                  isLight ? 'text-stone-500' : 'text-stone-400'
                }`}>
                  Unit 2 Spitfire Close, Langley, SL3 8GY
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className={`hidden lg:flex items-center gap-0.5 p-1 rounded-full backdrop-blur-md border ${
              isLight
                ? 'bg-white/90 border-[#b38728]/25 shadow-sm'
                : 'bg-[#111722]/90 border-[#c5a059]/20'
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-serif font-medium rounded-full transition-all duration-150 ${
                    isLight
                      ? 'text-stone-700 hover:text-[#b38728] hover:bg-stone-100'
                      : 'text-stone-300 hover:text-[#dfb76c] hover:bg-[#192233]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              
              {/* Quick Prayer Schedule Popover Trigger */}
              {nextPrayer && (
                <button
                  onClick={onTogglePrayerWidget}
                  className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                    prayerWidgetOpen
                      ? 'bg-[#c5a059] text-[#080b10] font-bold shadow-md'
                      : isLight
                      ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 hover:text-[#b38728] shadow-sm'
                      : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:text-[#dfb76c] hover:bg-[#1a2436]'
                  }`}
                  title="Sheikh Zayed Grand Mosque Center Prayer Timings"
                >
                  <Clock className={`w-3 h-3 ${prayerWidgetOpen ? 'text-[#080b10]' : 'text-[#dfb76c]'}`} />
                  <span>{nextPrayer?.next?.name || 'Prayer'}: {nextPrayer?.next?.start?.time12}</span>
                </button>
              )}

              {/* Admin CMS Button */}
              <button
                onClick={onOpenAdmin}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                  isLight
                    ? 'bg-white border border-stone-200 hover:border-[#b38728]/50 text-stone-700 hover:text-[#b38728] shadow-sm'
                    : 'bg-[#111722] border border-stone-800 hover:border-[#c5a059]/40 text-stone-300 hover:text-[#dfb76c] hover:bg-[#1a2436]'
                }`}
                title="Open Zero-Trust Admin CMS"
              >
                <Lock className="w-3 h-3 text-[#dfb76c]" />
                <span>Admin CMS</span>
              </button>

              {/* Theme Mode Switcher */}
              <ThemeSwitcher variant="navbar" />

              {/* Primary Waqf Appeal CTA Button */}
              <button
                onClick={onOpenDonate}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold text-[#080b10] btn-monumental-gold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-3 h-3 fill-[#080b10]" />
                <span>Waqf Appeal</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenDonate}
                className="px-3 py-1 rounded-full text-xs font-bold text-[#080b10] bg-[#dfb76c]"
              >
                Donate
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700/50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-14 right-0 bottom-0 w-72 bg-[#0c121e] border-l border-white/10 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-bold text-sm text-white">Navigation</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">#1180443</span>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenQibla(); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-300"
                >
                  <span className="flex items-center gap-2"><Compass className="w-4 h-4 text-amber-400" /> Qibla Finder (118.9°)</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-300"
                >
                  <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> Admin CMS Control</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#dfb76c] text-[#080b10] text-center"
              >
                Support £550,000 Waqf Appeal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
