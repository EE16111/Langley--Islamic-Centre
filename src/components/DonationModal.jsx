import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import { 
  X, 
  Heart, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  CreditCard,
  Building,
  RotateCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'bank'
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#0d1527] border border-slate-700/80 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <Heart className="w-5 h-5 fill-red-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Support Spitfire Close Appeal
              </h3>
              <p className="text-xs text-slate-400">
                UK Registered Charity No. {LIC_DATA.charityNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: One-Off vs Auto Monthly vs HSBC Bank */}
        <div className="p-3 sm:p-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'card'
                ? 'bg-sky-500 text-white shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>One-Off</span>
          </button>

          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'monthly'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Auto Monthly</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-sky-500 text-white shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>HSBC Bank</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'card' ? (
            <div className="space-y-4">
              {/* Gift Aid Awareness Alert */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">UK Taxpayer? Unlock +25% Extra Free</strong>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">
                    Under HMRC Gift Aid, for every £1 you donate, LIC reclaims 25p at no extra cost to you. (A £1,000 Musalla becomes £1,250!).
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Select a tier (1-Tap Apple Pay / Google Pay / Card):
                </span>
                <span className="text-[11px] text-sky-400 font-bold bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                  Stripe Certified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {LIC_DATA.donationTiers.map((tier) => (
                  <a
                    key={tier.id}
                    href={tier.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-slate-800/80 transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <strong className="text-base font-extrabold text-white group-hover:text-sky-400 transition-colors">
                        £{tier.amount.toLocaleString()}
                      </strong>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-300">{tier.name}</span>
                    {tier.amount === 1000 && (
                      <span className="mt-1.5 text-[9px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30 w-fit">
                        or £83.33/mo (12 mo)
                      </span>
                    )}
                    {tier.amount >= 500 && (
                      <span className="text-[10px] text-emerald-400 font-medium mt-1">
                        +£{(tier.amount * 0.25).toLocaleString()} Gift Aid
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Other Custom Amount */}
              <a
                href={LIC_DATA.customDonationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <span>Donate Any Other Custom Amount</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ) : activeTab === 'monthly' ? (
            <div className="space-y-4">
              {/* Recurring Giving Explainer */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
                <RotateCw className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Continuous Monthly Sadaqah Jariyah</strong>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">
                    Money is debited automatically every month via Stripe or BACS Direct Debit and deposited directly into LIC's verified HSBC account. Cancel or modify anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Choose your monthly contribution level:
                </span>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Direct to HSBC
                </span>
              </div>

              <div className="space-y-2.5">
                {LIC_DATA.monthlySubscriptionTiers.map((tier) => (
                  <a
                    key={tier.id}
                    href={LIC_DATA.customDonationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-slate-800/80 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                          £{tier.amount}/month
                        </strong>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {tier.perDay}
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 font-medium block mt-0.5">{tier.name}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{tier.description}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400 group-hover:underline">
                        Start
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Zero processing fee. 100% of your funds reach Langley Islamic Centre.</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Bank Name</span>
                    <strong className="text-sm text-white">{LIC_DATA.bankDetails.bank}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Account Name</span>
                    <strong className="text-sm text-white">{LIC_DATA.bankDetails.accountName}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Account Number</span>
                    <strong className="text-base font-mono font-bold text-white">{LIC_DATA.bankDetails.accountNumber}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy('acc', LIC_DATA.bankDetails.accountNumber)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-white text-xs font-semibold text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Sort Code</span>
                    <strong className="text-base font-mono font-bold text-white">{LIC_DATA.bankDetails.sortCode}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy('sort', LIC_DATA.bankDetails.sortCode)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-white text-xs font-semibold text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    {copiedField === 'sort' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'sort' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 text-center text-xs text-slate-400">
          May Allah accept your charity as a continuous Sadaqah Jariyah.
        </div>

      </div>
    </div>
  );
}
