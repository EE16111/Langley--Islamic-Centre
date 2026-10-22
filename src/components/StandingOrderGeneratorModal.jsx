import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  Building, 
  ShieldCheck, 
  Calendar, 
  User, 
  FileText 
} from 'lucide-react';
import { LIC_DATA } from '../data/content';
import confetti from 'canvas-confetti';

export default function StandingOrderGeneratorModal({ isOpen, onClose }) {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('25');
  const [dayOfMonth, setDayOfMonth] = useState('1st');
  const [giftAid, setGiftAid] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Clean surname for reference
  const nameParts = donorName.trim().split(' ');
  const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1].toUpperCase() : 'DONOR';
  const cleanRef = `LIC-SO-${surname || 'DONOR'}-${amount}`;

  const copyMobileBankingBlock = () => {
    const textToCopy = `PAYEE: ${LIC_DATA.bankDetails.accountName}
BANK: ${LIC_DATA.bankDetails.bank}
SORT CODE: ${LIC_DATA.bankDetails.sortCode}
ACCOUNT NUMBER: ${LIC_DATA.bankDetails.accountNumber}
AMOUNT: £${amount} monthly (Recurring)
REFERENCE: ${cleanRef}
DATE: ${dayOfMonth} of every month`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#0a101d] border border-emerald-500/30 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Official UK Standing Order Generator
              </h3>
              <p className="text-xs text-slate-400">
                Direct Bank-to-Bank Recurring Transfer • 0% Fees • 100% to LIC
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Explainer */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>
              Setting up a standing order in your banking app (HSBC, Barclays, NatWest, Lloyds, Monzo, etc.) takes only 60 seconds and gives the masjid reliable, monthly income with zero middleman deductions.
            </span>
          </div>

          {/* Generator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Donor Name */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Mohammed Tariq"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Monthly Amount */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Monthly Amount (£)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">£</span>
                <input
                  type="number"
                  min="5"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>

            {/* Payment Day */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Payment Day
              </label>
              <select
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="1st">1st of the month</option>
                <option value="15th">15th of the month</option>
                <option value="25th">25th (Payday)</option>
                <option value="28th">28th of the month</option>
                <option value="Last Day">Last day of the month</option>
              </select>
            </div>
          </div>

          {/* Quick Amount Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">Quick Select:</span>
            {['10', '25', '40', '83.33', '100'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  amount === val 
                    ? 'bg-emerald-500 text-white shadow-sm' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                £{val}/mo {val === '83.33' ? '(Musalla)' : ''}
              </button>
            ))}
          </div>

          {/* Generated Mandate Slip Preview */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                  STANDARDISED UK BANKING STANDING ORDER
                </span>
                <strong className="text-base text-white">Langley Islamic Centre Mandate</strong>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Charity No. #{LIC_DATA.charityNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Beneficiary Name</span>
                <strong className="text-sm text-white font-mono">{LIC_DATA.bankDetails.accountName}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Bank Name</span>
                <strong className="text-sm text-white font-mono">{LIC_DATA.bankDetails.bank}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Sort Code</span>
                <strong className="text-base text-white font-mono font-black tracking-widest text-emerald-300">
                  {LIC_DATA.bankDetails.sortCode}
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Account Number</span>
                <strong className="text-base text-white font-mono font-black tracking-widest text-emerald-300">
                  {LIC_DATA.bankDetails.accountNumber}
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 sm:col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Your Payment Reference (Mandatory)</span>
                  <strong className="text-sm text-amber-300 font-mono font-bold">{cleanRef}</strong>
                </div>
                <span className="text-[10px] text-slate-400">Used by treasurer to credit your account</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs flex items-center justify-between text-emerald-300">
              <span>Standing Order Amount: <strong>£{amount} per month</strong></span>
              <span>Debited: <strong>{dayOfMonth} monthly</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyMobileBankingBlock}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted for Mobile Banking'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Mandate Slip</span>
            </button>
          </div>

          {/* Step by Step Guide */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
            <strong className="text-white block font-semibold">How to activate in your UK banking app:</strong>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open your mobile banking app (HSBC, Barclays, Lloyds, Natwest, Monzo, etc.).</li>
              <li>Go to <strong>Payments & Transfers $\rightarrow$ Standing Orders $\rightarrow$ Set up new</strong>.</li>
              <li>Click the green <strong>"Copy Formatted for Mobile Banking"</strong> button above and paste the details.</li>
              <li>Confirm the mandate. Your monthly Sadaqah Jariyah is now permanently established!</li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}
