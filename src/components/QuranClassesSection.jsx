import React from 'react';
import { LIC_DATA } from '../data/content';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Award,
  Scroll,
  GraduationCap
} from 'lucide-react';

export default function QuranClassesSection({ onOpenQuranModal }) {
  const qc = LIC_DATA.quranClasses;

  return (
    <section id="quran-classes" className="py-28 relative bg-[#080b10] border-t border-[#c5a059]/15 overflow-hidden">
      {/* Background Girih Lattice Watermark */}
      <div className="absolute inset-0 bg-jali-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-arabic text-2xl text-[#c5a059] mb-2 tracking-wide">
            المكتب القرآني الشريف
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-serif tracking-widest text-[#dfb76c] bg-[#1a2332]/70 border border-[#c5a059]/30 mb-4 uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Classical Maktab • Nazira &amp; Tajweed Academy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#f4f0e6] tracking-tight leading-tight">
            Sacred Quranic Literacy &amp; Character
          </h2>

          <p className="mt-4 text-base sm:text-lg font-serif italic text-[#c5a059]">
            "{qc.motto}"
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
            {qc.subtitle}. A structured, disciplined syllabus for young boys aged 7–16 under the tutelage of verified DBS-cleared Quran teachers at Spitfire Close.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#dfb76c]/70 font-mono">
            <span>+ DBS CERTIFIED INSTRUCTORS</span>
            <span>•</span>
            <span>RATIO 1:10 MAXIMUM</span>
            <span>•</span>
            <span>INDIVIDUAL TAJWEED AUDIT</span>
          </div>
        </div>

        {/* 3 Heritage Bento Plaques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Schedule Tracks */}
          <div className="sanctuary-plaque architectural-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#dfb76c] mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059] block mb-1">Schedule Options</span>
              <h3 className="text-xl font-serif font-bold text-[#f4f0e6] mb-3">Two Flexible Tracks</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Parents select one 3-day cohort track to ensure consistent pedagogical progression:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#080b10]/80 border border-[#c5a059]/20 hover:border-[#c5a059]/40 transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb76c] block mb-0.5">Cohort Alpha</span>
                  <span className="text-sm font-serif font-semibold text-[#f4f0e6]">Monday, Tuesday &amp; Wednesday</span>
                  <span className="text-[11px] block text-slate-400 mt-1">5:00 PM – 7:00 PM (1-hr allocated slots)</span>
                </div>
                <div className="p-4 rounded-xl bg-[#080b10]/80 border border-[#c5a059]/20 hover:border-[#c5a059]/40 transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb76c] block mb-0.5">Cohort Beta</span>
                  <span className="text-sm font-serif font-semibold text-[#f4f0e6]">Thursday, Friday &amp; Saturday</span>
                  <span className="text-[11px] block text-slate-400 mt-1">5:00 PM – 7:00 PM (1-hr allocated slots)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#c5a059]/15 text-xs text-slate-400 font-sans flex items-center justify-between">
              <span>Attendance Policy</span>
              <strong className="text-[#dfb76c] font-mono text-[11px]">3 Days / Week Mandatory</strong>
            </div>
          </div>

          {/* Card 2: Student Levels */}
          <div className="sanctuary-plaque architectural-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#dfb76c] mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059] block mb-1">Pedagogical Tiers</span>
              <h3 className="text-xl font-serif font-bold text-[#f4f0e6] mb-3">Diagnostic Level Bands</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Students are graded and placed according to their verified reading proficiency:
              </p>

              <div className="space-y-3">
                {qc.levels.map((lvl, idx) => (
                  <div key={lvl.name} className="p-3.5 rounded-xl bg-[#080b10]/80 border border-[#c5a059]/20 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#c5a059]/20 text-[#dfb76c] text-[10px] font-mono flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <strong className="text-xs font-serif font-semibold text-[#f4f0e6]">{lvl.name}</strong>
                      </div>
                      <span className="text-[11px] text-slate-400 block ml-7 mt-0.5">{lvl.time}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded bg-[#1a2332] text-[#dfb76c] font-mono border border-[#c5a059]/20">
                      60 Min
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#c5a059]/15 text-xs text-slate-400 font-sans flex items-center justify-between">
              <span>Class Allocation</span>
              <strong className="text-[#dfb76c] font-mono text-[11px]">Via Live Diagnostic</strong>
            </div>
          </div>

          {/* Card 3: Fee & Safeguarding */}
          <div className="sanctuary-plaque architectural-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between relative group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1b4931]/40 border border-[#74c69d]/40 flex items-center justify-center text-[#74c69d] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#74c69d] block mb-1">Monthly Tuition</span>
              <h3 className="text-xl font-serif font-bold text-[#f4f0e6] mb-2">Community Rate</h3>
              
              <div className="flex items-baseline gap-2 mb-4 p-3 rounded-xl bg-[#1b4931]/20 border border-[#74c69d]/20">
                <span className="text-4xl font-serif font-bold text-[#f4f0e6]">£40</span>
                <span className="text-xs text-slate-300">/ child per month (Standing Order)</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#74c69d] flex-shrink-0 mt-0.5" />
                  <span>Standing Order required by the 28th of each month in advance.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#74c69d] flex-shrink-0 mt-0.5" />
                  <span>Curriculum: Qaida, Nazira Tajweed, Fiqh of Salah &amp; Daily Duas.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#dfb76c] flex-shrink-0 mt-0.5" />
                  <span>Currently open for boys aged 7–16; sisters' cohort will launch upon hall expansion.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#c5a059]/15">
              <button
                onClick={onOpenQuranModal}
                className="w-full btn-monumental-gold py-3.5 px-4 rounded-xl text-xs font-serif font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Express Interest &amp; Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* 5-Step Admission Lineage */}
        <div className="sanctuary-plaque architectural-card p-8 sm:p-12 rounded-2xl relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059] block mb-1">
              Admissions Governance
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f0e6]">
              5-Step Enrolment Protocol
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Ensuring each child receives personal pastoral care and appropriate placement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {qc.steps.map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-[#080b10]/70 border border-[#c5a059]/20 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#dfb76c] font-serif font-bold text-sm mb-3">
                    0{st.step}
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#f4f0e6] mb-1.5">{st.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{st.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#c5a059]/10 text-[10px] font-mono text-[#c5a059]/60">
                  PHASE 0{st.step}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#c5a059]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 max-w-xl text-center sm:text-left leading-relaxed">
              * Note: Submission of the digital expression form initiates the pastoral review. Official admission is confirmed following the teacher diagnostic and standing order mandate setup.
            </p>
            <button
              onClick={onOpenQuranModal}
              className="btn-monumental-dark px-6 py-3 rounded-xl text-xs font-serif font-bold text-[#dfb76c] tracking-wider uppercase border border-[#c5a059]/40 hover:border-[#c5a059] flex-shrink-0 flex items-center gap-2"
            >
              <span>Launch Quran Registration Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
