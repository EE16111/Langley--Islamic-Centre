import React from 'react';
import { Globe, Heart, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CharityWorkSection({ onOpenDonate }) {
  const reliefPhotos = [
    {
      src: '/src/assets/bangla1-1.jpg',
      title: 'Emergency Flood Relief Distribution',
      region: 'Sylhet & Sunamganj Basin',
      desc: 'Direct distribution of staple dry food parcels and emergency water purification units to inundated villages.'
    },
    {
      src: '/src/assets/bangla2-1.jpg',
      title: 'Hand-to-Hand Direct Delivery',
      region: 'Isolated Rural Reach',
      desc: 'Langley community representatives personally verifying that rations reach elderly and vulnerable families directly.'
    },
    {
      src: '/src/assets/2-2.jpg',
      title: 'Humanitarian Care Packages',
      region: 'Emergency Crisis Aid',
      desc: 'Medical supplies, blankets, and essential sanitation provisions packed and dispatched by LIC volunteers.'
    },
    {
      src: '/src/assets/3-1.jpg',
      title: 'Civic Community Operations',
      region: 'UK & International Aid',
      desc: '100% of donated relief funds delivered with zero operational administrative overhead deducted.'
    }
  ];

  return (
    <section id="charity-work" className="py-28 relative bg-[#080b10] border-t border-[#c5a059]/15 overflow-hidden">
      {/* Background Girih Lattice */}
      <div className="absolute inset-0 bg-jali-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-arabic text-2xl text-[#c5a059] mb-2 tracking-wide">
              الإغاثة الإنسانية والصدقة الجارية
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-serif tracking-widest text-[#74c69d] bg-[#1b4931]/40 border border-[#74c69d]/30 mb-4 uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#74c69d]" />
              <span>Strict 100% Policy • Zero Admin Fee Deducted</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#f4f0e6] tracking-tight leading-tight">
              Humanitarian Disaster Relief
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans max-w-2xl leading-relaxed">
              Alongside our primary sanctuary building appeal in Langley, we operate a solemn fiduciary pledge: 100% of your disaster relief donations go directly into the hands of the destitute, the displaced, and those stricken by calamity worldwide.
            </p>
          </div>

          <button
            onClick={onOpenDonate}
            className="btn-monumental-gold px-6 py-3.5 rounded-xl text-xs font-serif font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg self-start lg:self-auto flex-shrink-0"
          >
            <Heart className="w-4 h-4 fill-[#080b10]" />
            <span>Donate to Relief Fund</span>
          </button>
        </div>

        {/* 100% Policy Fiduciary Guarantee Plaque */}
        <div className="sanctuary-plaque architectural-card p-6 sm:p-8 rounded-2xl mb-14 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#1b4931]/50 border border-[#74c69d]/40 flex items-center justify-center text-[#74c69d] flex-shrink-0">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#74c69d] font-bold">Fiduciary Trust Protocol</span>
                <span className="text-[#c5a059]">•</span>
                <span className="text-[11px] font-mono text-slate-400">UK Charity #1180443</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#f4f0e6]">
                Guaranteed 100% Charitable Donation Delivery
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Trustees absorb all transactional and bank processing fees through separate operational giftings. Every pound donated to relief reaches the beneficiary in full.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-xl bg-[#080b10] border border-[#c5a059]/30 text-xs font-serif text-[#dfb76c]">
            <CheckCircle2 className="w-4 h-4 text-[#74c69d]" />
            <span>Audited Accounts Guarantee</span>
          </div>
        </div>

        {/* Relief Projects Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reliefPhotos.map((photo, idx) => (
            <div 
              key={idx}
              className="sanctuary-plaque architectural-card rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#04060b] border-b border-[#c5a059]/15">
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/LIC-OutSide-1024x771.jpg';
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#080b10]/80 border border-[#c5a059]/30 text-[9px] font-mono text-[#dfb76c] uppercase">
                  {photo.region}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f4f0e6] mb-1.5 group-hover:text-[#dfb76c] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {photo.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-[10px] font-mono text-[#c5a059]/70">
                  <span>DISASTER AID</span>
                  <span>100% DELIVERED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
