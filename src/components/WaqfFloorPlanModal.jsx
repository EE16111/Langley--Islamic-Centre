import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Check, 
  ExternalLink, 
  Compass, 
  Layers, 
  ShieldCheck,
  User,
  Info
} from 'lucide-react';
import { LIC_DATA } from '../data/content';
import confetti from 'canvas-confetti';

// Generate mock prayer hall saffs (6 rows, 16 musallahs per row)
const SAFF_COUNT = 6;
const MUSALLAHS_PER_SAFF = 16;

const INITIAL_DEDICATIONS = {
  '1-1': { donor: 'Haji Mohammed & Family', memory: 'In memory of Late Parents', date: 'Oct 2026' },
  '1-2': { donor: 'Dr. A. Khan', memory: 'Sadaqah Jariyah for Children', date: 'Sep 2026' },
  '1-5': { donor: 'Slough Community Group', memory: 'For the Ummah', date: 'Aug 2026' },
  '1-8': { donor: 'Anonymous Servant of Allah', memory: 'For Allah’s Pleasure', date: 'Oct 2026' },
  '2-3': { donor: 'Ahmed & Samina', memory: 'Barakah in family home', date: 'Sep 2026' },
  '2-10': { donor: 'Farooq Family', memory: 'In memory of Marhum Grandfather', date: 'Oct 2026' },
  '3-7': { donor: 'Langley Youth Circle', memory: 'Dedicated to Youth Dawah', date: 'Oct 2026' },
  '4-12': { donor: 'Brother Bilal', memory: 'Sadaqah Jariyah', date: 'Aug 2026' },
};

export default function WaqfFloorPlanModal({ isOpen, onClose, onSelectPledge }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [dedicationName, setDedicationName] = useState('');
  const [dedicationNote, setDedicationNote] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'available' | 'dedicated'
  const [paymentMode, setPaymentMode] = useState('monthly'); // 'monthly' (£83.33) | 'one-off' (£1,000)

  if (!isOpen) return null;

  const handleSpotClick = (saffIndex, musallaIndex) => {
    const key = `${saffIndex + 1}-${musallaIndex + 1}`;
    const dedicated = INITIAL_DEDICATIONS[key];
    
    setSelectedSpot({
      saff: saffIndex + 1,
      spot: musallaIndex + 1,
      key,
      isDedicated: !!dedicated,
      data: dedicated || null
    });
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onSelectPledge) {
      onSelectPledge({
        spot: selectedSpot,
        mode: paymentMode,
        dedicationName,
        dedicationNote
      });
    }
    // Redirect to Stripe checkout
    window.open(LIC_DATA.donationTiers.find(t => t.id === 'musallah')?.stripeUrl || LIC_DATA.customDonationUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#090f1d] border border-sky-500/30 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 border border-sky-500/30 text-sky-400">
              <Layers className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Interactive Waqf Prayer Hall Map
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Spitfire Close Campus
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose a Musalla (Prayer Space) to dedicate as continuous Sadaqah Jariyah for you or a loved one.
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

        {/* Legend & Stats Banner */}
        <div className="p-3 sm:p-4 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500/80 border border-emerald-400 shadow-sm" />
              <span className="text-slate-300 font-medium">Dedicated (Sponsored)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-sky-500/40 border border-sky-400/80 shadow-sm" />
              <span className="text-slate-300 font-medium">Available (£1,000 / £83.33/mo)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-400 border border-amber-300 animate-pulse" />
              <span className="text-amber-300 font-bold">Selected</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span>Facing Qibla (118.9° ESE)</span>
            <Compass className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Main Content Area: Floor Plan + Sidebar Inspector */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          
          {/* Floor Plan Visual Canvas */}
          <div className="flex-1 flex flex-col items-center">
            
            {/* Mihrab (Imam's Prayer Niche) */}
            <div className="w-full max-w-md mb-4 flex flex-col items-center">
              <div className="w-48 h-8 rounded-t-full bg-gradient-to-b from-amber-500/30 to-amber-500/5 border-t-2 border-x-2 border-amber-400/60 flex items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1">
                  <span>Mihrab (Qibla Wall)</span>
                </span>
              </div>
              <div className="w-32 h-2 bg-amber-400/40 rounded-full blur-[2px]" />
            </div>

            {/* Prayer Saffs Container */}
            <div className="w-full max-w-3xl space-y-2.5 p-4 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-inner overflow-x-auto">
              {Array.from({ length: SAFF_COUNT }).map((_, saffIdx) => {
                const saffNumber = saffIdx + 1;
                return (
                  <div key={saffNumber} className="flex items-center gap-2 min-w-[580px]">
                    {/* Saff Label */}
                    <div className="w-16 flex-shrink-0 text-right pr-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                        Saff {saffNumber}
                      </span>
                    </div>

                    {/* Musallahs in Saff */}
                    <div className="flex-1 grid grid-cols-16 gap-1 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800/80">
                      {Array.from({ length: MUSALLAHS_PER_SAFF }).map((_, spotIdx) => {
                        const spotNumber = spotIdx + 1;
                        const key = `${saffNumber}-${spotNumber}`;
                        const isDedicated = !!INITIAL_DEDICATIONS[key];
                        const isSelected = selectedSpot?.key === key;

                        return (
                          <button
                            key={spotNumber}
                            onClick={() => handleSpotClick(saffIdx, spotIdx)}
                            title={`Saff ${saffNumber}, Musalla ${spotNumber} - ${isDedicated ? 'Dedicated' : 'Available'}`}
                            className={`h-9 rounded-lg transition-all flex flex-col items-center justify-center relative group ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 scale-105 z-10 shadow-glow-amber ring-2 ring-amber-300 font-black'
                                : isDedicated
                                ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/50'
                                : 'bg-sky-500/15 border border-sky-500/30 text-sky-200 hover:border-sky-400 hover:bg-sky-500/30'
                            }`}
                          >
                            <span className="text-[9px] font-mono leading-none">
                              {spotNumber}
                            </span>
                            {isDedicated && (
                              <Heart className="w-2 h-2 fill-emerald-400 text-emerald-400 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rear Entrance Note */}
            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Main Prayer Hall Entrance (Spitfire Close)
              </span>
            </div>
          </div>

          {/* Sidebar Inspector & Dedication Form */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
            {selectedSpot ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-sky-400 tracking-wider block">
                      Musalla Selection
                    </span>
                    <h4 className="text-lg font-black text-white">
                      Saff {selectedSpot.saff} • Space #{selectedSpot.spot}
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                    selectedSpot.isDedicated 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-sky-950 text-sky-400 border border-sky-500/30'
                  }`}>
                    {selectedSpot.isDedicated ? 'Dedicated' : 'Available'}
                  </span>
                </div>

                {selectedSpot.isDedicated ? (
                  <div className="space-y-3 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <Heart className="w-4 h-4 fill-emerald-400" />
                      <span>Dedicated Waqf Space</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Sponsored By</span>
                      <strong className="text-sm text-white">{selectedSpot.data.donor}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Intention / Dua</span>
                      <p className="text-xs text-slate-300 italic">"{selectedSpot.data.memory}"</p>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-2 border-t border-emerald-500/20">
                      Accepted as Sadaqah Jariyah in {selectedSpot.data.date}.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePledgeSubmit} className="space-y-4">
                    {/* Payment Mode Selector */}
                    <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setPaymentMode('monthly')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          paymentMode === 'monthly'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        £83.33 / mo (12 mo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode('one-off')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          paymentMode === 'one-off'
                            ? 'bg-sky-500 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        £1,000 One-Off
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Pledge Amount:</span>
                        <strong className="text-white">
                          {paymentMode === 'monthly' ? '£83.33 / month' : '£1,000 one-off'}
                        </strong>
                      </div>
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>HMRC Gift Aid Bonus:</span>
                        <strong>+£250.00 Free</strong>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                        Total value to LIC: <strong className="text-white">£1,250.00</strong>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Dedication Name / Family
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. In memory of Marhum Father / Family Name"
                        value={dedicationName}
                        onChange={(e) => setDedicationName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Special Dua / Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="May Allah make this a light in the grave..."
                        value={dedicationNote}
                        onChange={(e) => setDedicationNote(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <Heart className="w-4 h-4 text-amber-300" />
                      <span>Confirm & Dedicate Spot</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="p-4 rounded-full bg-slate-800/60 text-sky-400 mb-3">
                  <Layers className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Select Any Musalla Space
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click on any prayer space on the floor plan to view its status, sponsor it for yourself or in memory of a loved one.
                </p>
                <div className="mt-4 p-3 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-[11px] text-sky-300">
                  Every Sajdah performed on your sponsored spot earns you reward in the grave.
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 block">
                Official Charity No. 1180443 • Spitfire Close, SL3 8GY
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
