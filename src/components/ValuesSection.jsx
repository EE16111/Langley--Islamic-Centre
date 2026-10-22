import React from 'react';
import { LIC_DATA } from '../data/content';
import { Compass, CheckCircle2 } from 'lucide-react';

export default function ValuesSection() {
  const values = LIC_DATA.values;
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return (
    <section className="py-28 relative bg-transparent border-t border-[#c5a059]/15 overflow-hidden">
      {/* Background Girih Lattice */}
      <div className="absolute inset-0 bg-jali-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-arabic text-2xl text-[#c5a059] mb-2 tracking-wide">
            ميثاق ومبادئ مركز لانغلي الإسلامي
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-serif tracking-widest text-[#dfb76c] bg-[#1a2332]/70 border border-[#c5a059]/30 mb-4 uppercase">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Foundational Charter • The 10 Principles</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#f4f0e6] tracking-tight leading-tight">
            Our Ten Sacred Commitments
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Rooted in authentic prophetic tradition, dedicated to public service, and bound by a perpetual Waqf trust for the benefit of Langley and all future generations.
          </p>
        </div>

        {/* 10 Architectural Tablets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="sanctuary-plaque architectural-card p-6 rounded-xl flex flex-col justify-between group hover:border-[#c5a059]/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-serif font-bold text-[#c5a059] tracking-widest">
                    TABLET {romanNumerals[idx] || (idx + 1)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    LIC-{(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#f4f0e6] mb-2 group-hover:text-[#dfb76c] transition-colors leading-snug">
                  {val.title}
                </h3>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-[10px] font-mono text-[#c5a059]/50">
                <span>EST. 2018</span>
                <span className="group-hover:text-[#dfb76c] transition-colors">ENDURING</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
