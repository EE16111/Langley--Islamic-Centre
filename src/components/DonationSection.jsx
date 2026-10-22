import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import { 
  Heart, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  FileText, 
  RotateCw, 
  CheckCircle2, 
  Building2, 
  Users, 
  Landmark,
  BadgePercent
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationSection({ onOpenFloorPlan, onOpenStandingOrder }) {
  const [givingType, setGivingType] = useState('one-time'); // 'one-time' | 'monthly'
  const [sliderAmount, setSliderAmount] = useState(100);
  const [copiedField, setCopiedField] = useState(null);

  const appeal = LIC_DATA.urgentAppeal;

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  const getSliderImpact = (amount) => {
    if (amount >= 10000) return { title: "Complete Saff (Row) Endowment", desc: "You are funding an entire prayer row in perpetuity. Countless worshippers will pray upon this row for generations." };
    if (amount >= 5000) return { title: "Half Saff Endowment", desc: "You are funding half a row in the main prayer hall of our permanent sanctuary on Spitfire Close." };
    if (amount >= 1000) return { title: "Dedicated Musallah Prayer Space", desc: "You are sponsoring dedicated Sajdah spots for daily and Jummah prayers under the Waqf deed." };
    if (amount >= 500) return { title: "Family Challenge Waqf Sponsor", desc: "A lasting family endowment (Sadaqah Jariyah) for education and Islamic worship." };
    if (amount >= 100) return { title: "100 Foundation Bricks", desc: "Funding structural partitions, wudhu facilities, and soundproofing for the youth madrasah." };
    if (amount >= 50) return { title: "Youth Hub Sponsor", desc: "Funding learning materials, Qur'an copies, and study desks for local youth." };
    return { title: "Community Sadaqah", desc: "Every single pound counts directly towards securing the £550,000 required." };
  };

  const impact = getSliderImpact(sliderAmount);

  return (
    <section id="donations" className="py-24 relative bg-[#080b10] border-t border-[#c5a059]/20 bg-jali-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest bg-[#162030] text-[#dfb76c] border border-[#c5a059]/35 mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#dfb76c]" />
            <span>Spitfire Close Permanent Home Appeal • UK Charity #1180443</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#f4f0e6] tracking-tight leading-tight">
            Help Secure the Remaining <span className="gold-leaf-text">£550,000</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            {appeal.highlight} Our community has already raised £250,000 towards the £800,000 total. Every penny donated is an unceasing Sadaqah Jariyah for generations to come.
          </p>

          {/* Surah Al-Hadid Verse Calligraphy Plaque */}
          <div className="mt-8 p-6 sm:p-7 rounded-3xl sanctuary-plaque text-center max-w-3xl mx-auto">
            <p className="font-arabic text-2xl sm:text-3xl gold-leaf-text leading-loose">
              {appeal.ayah.arabic}
            </p>
            <p className="mt-3 text-xs sm:text-sm text-stone-300 italic font-serif">
              "{appeal.ayah.english}"
            </p>
            <span className="mt-2 inline-block text-[10px] font-serif uppercase tracking-[0.25em] text-[#dfb76c]">
              Holy Qur'an • {appeal.ayah.surah}
            </span>
          </div>
        </div>

        {/* The Spitfire Close Capital Ledger Progress Card */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl sanctuary-plaque relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-1">
                Waqf Acquisition Ledger Status
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-black text-[#f4f0e6] tracking-tight">
                  £250,000
                </span>
                <span className="text-sm sm:text-base text-stone-400 font-sans">
                  already raised of <strong className="text-[#f4f0e6] font-mono">£800,000 target</strong>
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#e07a5f] font-bold block mb-1">
                Urgent Amount Required
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-[#e07a5f] tracking-tight">
                £550,000
              </span>
            </div>
          </div>

          {/* Progress Bar Track: Antique Gold / Sacred Emerald */}
          <div className="w-full h-4 rounded-full bg-[#080b10] p-0.5 border border-[#c5a059]/30 relative overflow-hidden shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#b38728] via-[#dfb76c] to-[#74c69d] shadow-[0_0_20px_rgba(223,183,108,0.5)] transition-all duration-1000"
              style={{ width: `${appeal.percentage}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-serif">
            <span>£0 (Acquisition Started)</span>
            <span className="font-bold text-[#dfb76c]">{appeal.percentage}% Community Funded</span>
            <span>£800,000 (Freehold Deed Debt-Free)</span>
          </div>

          {/* 4 Pillars of the £550,000 Appeal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#c5a059]/15 text-left">
            <div className="p-3.5 rounded-2xl bg-[#080b10]/60 border border-[#c5a059]/20">
              <div className="flex items-center gap-2 text-[#dfb76c] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <Landmark className="w-3.5 h-3.5" />
                <span>Freehold Title</span>
              </div>
              <strong className="text-sm font-mono text-[#f4f0e6] block">£400,000</strong>
              <p className="text-[11px] text-stone-400 mt-0.5">Permanent debt-free property deed on Spitfire Close.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080b10]/60 border border-[#c5a059]/20">
              <div className="flex items-center gap-2 text-[#74c69d] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Sisters' Hall</span>
              </div>
              <strong className="text-sm font-mono text-[#f4f0e6] block">£65,000</strong>
              <p className="text-[11px] text-stone-400 mt-0.5">Dedicated private mezzanine, wudhu, and nursery.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080b10]/60 border border-[#c5a059]/20">
              <div className="flex items-center gap-2 text-[#c5a059] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Youth Madrasah</span>
              </div>
              <strong className="text-sm font-mono text-[#f4f0e6] block">£45,000</strong>
              <p className="text-[11px] text-stone-400 mt-0.5">Soundproof classrooms for 100+ local children.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080b10]/60 border border-[#c5a059]/20">
              <div className="flex items-center gap-2 text-[#dfb76c] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Wudhu &amp; Access</span>
              </div>
              <strong className="text-sm font-mono text-[#f4f0e6] block">£40,000</strong>
              <p className="text-[11px] text-stone-400 mt-0.5">Modern wudhu facilities, heating, and acoustic carpet.</p>
            </div>
          </div>
        </div>

        {/* Interactive Impact Calculator / Slider */}
        <div className="max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl sanctuary-plaque">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-serif font-bold text-[#dfb76c]">
              <Sparkles className="w-4 h-4 text-[#dfb76c]" />
              <span>Interactive Waqf Impact Calculator</span>
            </div>
            <span className="text-3xl sm:text-4xl font-mono font-black text-[#f4f0e6]">
              £{sliderAmount.toLocaleString()}
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="20"
            max="10000"
            step="10"
            value={sliderAmount}
            onChange={(e) => setSliderAmount(Number(e.target.value))}
            className="w-full h-2.5 bg-[#080b10] rounded-lg appearance-none cursor-pointer accent-[#dfb76c] mb-6 border border-[#c5a059]/25 shadow-inner"
          />

          {/* Quick Amount Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            {[20, 50, 100, 500, 1000, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => setSliderAmount(amt)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-serif font-bold transition-all ${
                  sliderAmount === amt 
                    ? 'bg-[#c5a059] text-[#080b10] shadow-md scale-105' 
                    : 'bg-[#111722] text-stone-300 hover:text-white hover:bg-[#1a2333] border border-stone-800'
                }`}
              >
                £{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Dynamic Impact Result Card */}
          <div className="p-4 rounded-2xl bg-[#080b10]/80 border border-[#c5a059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div>
              <h4 className="text-base font-serif font-bold text-[#f4f0e6] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dfb76c]" />
                {impact.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-sans mt-0.5">
                {impact.desc}
              </p>
            </div>

            <a
              href={LIC_DATA.customDonationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold text-[#080b10] btn-monumental-gold transition-all flex-shrink-0"
            >
              <span>Donate £{sliderAmount.toLocaleString()}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Spatial Floor Plan & Standing Order Mandate Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-14">
          <div 
            onClick={onOpenFloorPlan}
            className="p-5 rounded-3xl sanctuary-plaque cursor-pointer shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-[#14231b] border border-[#2d6a4f] text-[#74c69d] group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-serif font-bold uppercase text-[#74c69d] tracking-widest block">
                  Interactive Spatial Map
                </span>
                <strong className="text-base font-serif text-[#f4f0e6] block">
                  Waqf Prayer Hall Floor Plan (96 Musallah Spots)
                </strong>
                <p className="text-xs text-stone-300 mt-0.5">
                  Pick and sponsor individual Sajdah spaces (£1,000 / £83.33/mo).
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#dfb76c] group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>

          <div 
            onClick={onOpenStandingOrder}
            className="p-5 rounded-3xl sanctuary-plaque cursor-pointer shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-[#162030] border border-[#c5a059]/30 text-[#dfb76c] group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-serif font-bold uppercase text-[#dfb76c] tracking-widest block">
                  Mobile Banking Helper
                </span>
                <strong className="text-base font-serif text-[#f4f0e6] block">
                  UK Standing Order Mandate Slip
                </strong>
                <p className="text-xs text-stone-300 mt-0.5">
                  1-click copy formatted mandate for HSBC, Barclays, Monzo &amp; Lloyds.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#dfb76c] group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </div>

        {/* Giving Frequency Selector (One-Off vs Auto-Monthly) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#f4f0e6]">
              Choose Your Contribution Method
            </h3>
            <p className="text-sm text-stone-400 mt-1 max-w-xl mx-auto font-sans">
              Choose a single one-off gift or establish an automated monthly standing order straight to the Masjid's HSBC account.
            </p>

            <div className="inline-flex items-center p-1.5 rounded-full bg-[#111722] border border-[#c5a059]/25 shadow-xl mt-6">
              <button
                onClick={() => setGivingType('one-time')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                  givingType === 'one-time'
                    ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Single One-Off Donation
              </button>

              <button
                onClick={() => setGivingType('monthly')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                  givingType === 'monthly'
                    ? 'bg-[#1b4931] text-[#95d5b2] border border-[#2d6a4f]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${givingType === 'monthly' ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span>Auto-Monthly Standing Order</span>
              </button>
            </div>
          </div>

          {/* Conditional Display: One-Off vs Monthly */}
          {givingType === 'monthly' ? (
            <div>
              <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-[#14231b]/60 border border-[#2d6a4f] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#74c69d] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f4f0e6] text-sm font-serif font-bold block">
                      Automated Monthly Sadaqah Jariyah Directly to Masjid HSBC Account
                    </strong>
                    <p className="text-xs text-stone-300 font-sans mt-0.5">
                      Debited monthly via Stripe or UK Standing Order directly into Langley Islamic Centre. Cancel or adjust anytime.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-serif font-bold text-[#74c69d] bg-[#0c1c14] px-3.5 py-1.5 rounded-full border border-[#2d6a4f] flex-shrink-0">
                  +25% HMRC Gift Aid Recoverable
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {LIC_DATA.monthlySubscriptionTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 text-left ${
                      tier.popular
                        ? 'sanctuary-plaque border-2 border-[#dfb76c] shadow-lg transform -translate-y-1'
                        : 'bg-[#0d121b] border border-[#c5a059]/15 hover:border-[#c5a059]/35'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[9px] font-serif font-bold uppercase tracking-widest bg-[#c5a059] text-[#080b10]">
                        {tier.badge}
                      </span>
                    )}

                    <div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-mono font-black text-[#f4f0e6] tracking-tight">
                          £{tier.amount}
                        </span>
                        <span className="text-xs text-stone-400 font-serif">/month</span>
                      </div>

                      <div className="text-[11px] font-serif font-bold text-[#dfb76c] mb-2">
                        {tier.perDay}
                      </div>

                      <h4 className="text-base font-serif font-bold text-[#f4f0e6] mb-2">
                        {tier.name}
                      </h4>

                      <p className="text-xs text-stone-300 font-sans leading-relaxed mb-6">
                        {tier.description}
                      </p>
                    </div>

                    <div>
                      <a
                        href={LIC_DATA.customDonationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-serif font-bold transition-all ${
                          tier.popular
                            ? 'btn-monumental-gold text-[#080b10]'
                            : 'bg-[#162030] text-[#f4f0e6] hover:bg-[#1f2d44] border border-[#c5a059]/30'
                        }`}
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Commit £{tier.amount}/mo</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
              {LIC_DATA.donationTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                    tier.popular
                      ? 'sanctuary-plaque border-2 border-[#dfb76c] shadow-lg transform -translate-y-1'
                      : 'bg-[#0d121b] border border-[#c5a059]/15 hover:border-[#c5a059]/35'
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[9px] font-serif font-bold uppercase tracking-widest bg-[#c5a059] text-[#080b10]">
                      {tier.badge}
                    </span>
                  )}

                  <div>
                    <div className="text-3xl font-mono font-black text-[#f4f0e6] tracking-tight mb-1">
                      £{tier.amount.toLocaleString()}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#dfb76c] mb-2">
                      {tier.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed mb-6">
                      {tier.description}
                    </p>
                  </div>

                  <a
                    href={tier.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                      tier.popular
                        ? 'btn-monumental-gold text-[#080b10]'
                        : 'bg-[#162030] text-[#f4f0e6] hover:bg-[#1f2d44] border border-[#c5a059]/30'
                    }`}
                  >
                    <span>Dedicate £{tier.amount.toLocaleString()}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}

              {/* Custom Amount Box */}
              <div className="rounded-3xl p-6 bg-[#0a0e16] border border-dashed border-[#c5a059]/35 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-serif uppercase tracking-widest text-[#dfb76c] block mb-1">
                    Custom Gift
                  </span>
                  <h4 className="text-xl font-serif font-bold text-[#f4f0e6] mb-2">
                    Open Contribution
                  </h4>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed mb-6">
                    Contribute whatever your heart desires. Every single penny directly supports the Spitfire Close purchase deed.
                  </p>
                </div>

                <a
                  href={LIC_DATA.customDonationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs sm:text-sm font-serif font-bold text-[#dfb76c] bg-[#162030] hover:bg-[#1f2d44] border border-[#c5a059]/30 transition-all"
                >
                  <span>Choose Any Amount</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Official UK Banking Transfer Box */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl sanctuary-plaque">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#c5a059]/20 text-left">
            <div>
              <div className="flex items-center gap-2 text-[#74c69d] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Third-Party Fees • 100% Policy</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#f4f0e6]">
                Official HSBC UK Trust Details
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans mt-0.5">
                Set up a one-off transfer or monthly Standing Order directly from your mobile banking app.
              </p>
            </div>

            <div className="text-xs font-serif text-[#dfb76c] px-4 py-2 rounded-full bg-[#111722] border border-[#c5a059]/30">
              Registered Charity <strong className="text-[#f4f0e6]">#{LIC_DATA.charityNumber}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-left">
            <div className="p-4 rounded-2xl bg-[#080b10] border border-[#c5a059]/20">
              <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block mb-1">Bank</span>
              <span className="text-lg font-serif font-bold text-[#f4f0e6]">{LIC_DATA.bankDetails.bank}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080b10] border border-[#c5a059]/20">
              <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block mb-1">Account Title</span>
              <span className="text-sm font-serif font-bold text-[#f4f0e6] block truncate" title={LIC_DATA.bankDetails.accountName}>
                {LIC_DATA.bankDetails.accountName}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080b10] border border-[#c5a059]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block mb-1">Account No</span>
                <span className="text-lg font-mono font-bold text-[#dfb76c]">{LIC_DATA.bankDetails.accountNumber}</span>
              </div>
              <button
                onClick={() => handleCopy('acc', LIC_DATA.bankDetails.accountNumber)}
                className="p-2 rounded-xl bg-[#162030] hover:bg-[#1f2d44] text-[#dfb76c] transition-all border border-[#c5a059]/30"
                title="Copy Account Number"
              >
                {copiedField === 'acc' ? <Check className="w-4 h-4 text-[#74c69d]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#080b10] border border-[#c5a059]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block mb-1">Sort Code</span>
                <span className="text-lg font-mono font-bold text-[#dfb76c]">{LIC_DATA.bankDetails.sortCode}</span>
              </div>
              <button
                onClick={() => handleCopy('sort', LIC_DATA.bankDetails.sortCode)}
                className="p-2 rounded-xl bg-[#162030] hover:bg-[#1f2d44] text-[#dfb76c] transition-all border border-[#c5a059]/30"
                title="Copy Sort Code"
              >
                {copiedField === 'sort' ? <Check className="w-4 h-4 text-[#74c69d]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-stone-400 font-serif">
            Jazak Allahu Khairan. May Allah bless and multiply every contribution in this life and the next.
          </div>
        </div>

      </div>
    </section>
  );
}
