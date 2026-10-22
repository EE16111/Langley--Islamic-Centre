import React from 'react';
import { LIC_DATA } from '../data/content';
import LicLogo from './LicLogo';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  Settings,
  Tv,
  Compass,
  FileText
} from 'lucide-react';

export default function Footer({ 
  onOpenDonate, 
  onOpenTimetable, 
  onOpenQuranModal, 
  onOpenVolunteerModal,
  onOpenFloorPlan,
  onOpenStandingOrder,
  onOpenQibla,
  onOpenAdmin,
  onOpenTVSignage
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#04060a] border-t border-[#c5a059]/20 text-slate-400 text-xs sm:text-sm pt-20 pb-12 relative overflow-hidden">
      {/* Background Girih Lattice Watermark */}
      <div className="absolute inset-0 bg-jali-pattern opacity-[0.02] pointer-events-none" />

      {/* Top gilded hairline accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sacred Trust Calligraphy Seal */}
        <div className="text-center pb-12 mb-12 border-b border-[#c5a059]/15">
          <p className="font-arabic text-xl sm:text-2xl text-[#c5a059] mb-2 tracking-widest">
            وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ هُوَ خَيْرًا وَأَعْظَمَ أَجْرًا
          </p>
          <p className="text-xs font-serif italic text-slate-400">
            "And whatever good you put forward for your souls, you will find it with Allah—it is better and greater in reward." (Surah Al-Muzzammil 73:20)
          </p>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#c5a059]/15">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 flex-shrink-0">
                <LicLogo variant="gold" className="w-full h-full" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-[#f4f0e6] block tracking-wide">
                  Langley Islamic Centre
                </span>
                <span className="text-xs font-serif text-[#c5a059] font-medium tracking-wider">
                  Permanent Waqf Sanctuary • Charity No. {LIC_DATA.charityNumber}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-sm">
              {LIC_DATA.subtagline}. Establishing an enduring freehold house of worship, Quranic education, and community support in Langley.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#1a2332]/70 text-[#dfb76c] border border-[#c5a059]/30">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Spitfire Close, Langley SL3 8GY</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#1b4931]/50 text-[#74c69d] border border-[#74c69d]/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#74c69d]" />
                <span>100% Charity Policy</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-serif font-bold text-[#dfb76c] uppercase tracking-widest">
              Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a href="#prayer-times" className="hover:text-[#dfb76c] transition-colors">Prayer Timetable</a>
              </li>
              <li>
                <a href="#spitfire-close" className="hover:text-[#dfb76c] transition-colors">Spitfire Campus</a>
              </li>
              <li>
                <a href="#donations" className="hover:text-[#dfb76c] transition-colors">£550k Waqf Appeal</a>
              </li>
              <li>
                <a href="#quran-classes" className="hover:text-[#dfb76c] transition-colors">Maktab Classes</a>
              </li>
              <li>
                <a href="#community-pillars" className="hover:text-[#dfb76c] transition-colors">Community Pillars</a>
              </li>
              <li>
                <a href="#charity-work" className="hover:text-[#dfb76c] transition-colors">100% Disaster Aid</a>
              </li>
            </ul>
          </div>

          {/* Community & Interactive Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-serif font-bold text-[#dfb76c] uppercase tracking-widest">
              Portals &amp; Tools
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button onClick={onOpenDonate} className="hover:text-[#dfb76c] transition-colors text-left flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Donate via Stripe</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenTimetable} className="hover:text-[#dfb76c] transition-colors text-left">
                  12-Month Timetable
                </button>
              </li>
              <li>
                <button onClick={onOpenFloorPlan} className="hover:text-[#74c69d] transition-colors text-left text-[#74c69d] font-serif font-semibold">
                  Waqf Musallah Map
                </button>
              </li>
              <li>
                <button onClick={onOpenStandingOrder} className="hover:text-[#dfb76c] transition-colors text-left flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#c5a059]" />
                  <span>Standing Order Mandate</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQibla} className="hover:text-[#dfb76c] transition-colors text-left flex items-center gap-1.5 text-[#dfb76c]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Qibla (118.9° ESE)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenVolunteerModal} className="hover:text-[#dfb76c] transition-colors text-left">
                  Volunteer Sign-up
                </button>
              </li>
              <li className="pt-2 border-t border-[#c5a059]/15">
                <button onClick={onOpenTVSignage} className="text-[#dfb76c] hover:text-[#f4f0e6] transition-colors text-left flex items-center gap-1.5 font-serif font-semibold">
                  <Tv className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Mosque TV Display</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-slate-400 hover:text-[#dfb76c] transition-colors text-left flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>Committee Admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-serif font-bold text-[#dfb76c] uppercase tracking-widest">
              Trust Secretariat
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
                <span>Spitfire Close, Langley, Slough, Berkshire SL3 8GY</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                <a href="tel:07843732106" className="text-[#dfb76c] hover:underline font-mono">
                  078 4373 2106
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                <a href="mailto:info@langleyislamiccentre.co.uk" className="text-[#dfb76c] hover:underline">
                  info@langleyislamiccentre.co.uk
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                <span>Sanctuary Hours: 13:00 – 19:00 hrs daily</span>
              </div>
            </div>

            {/* Official HSBC Bank Mandate Frame */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#080b10] border border-[#c5a059]/25 text-[11px] text-slate-300 font-mono">
              <strong className="text-[#dfb76c] block mb-1 font-serif text-xs">Official HSBC UK Bank Account:</strong>
              <div>Langley Islamic Centre</div>
              <div>Account: <span className="text-white font-bold">0249 4973</span></div>
              <div>Sort Code: <span className="text-white font-bold">40-42-08</span></div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-serif">
          <div>
            © {new Date().getFullYear()} Langley Islamic Centre (LIC). Registered UK Charity No. 1180443. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-sans">Serving the Langley &amp; Slough Muslim Community</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#080b10] hover:bg-[#1a2332] text-[#dfb76c] border border-[#c5a059]/30 transition-all shadow-md"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
