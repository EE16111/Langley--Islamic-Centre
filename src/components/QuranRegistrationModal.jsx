import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Car, 
  Calendar, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuranRegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    age: '9',
    priorExperience: 'qaida',
    sessionTrack: 'option1', // option1 or option2
    levelPreference: 'Beginner',
    parentName: '',
    phone: '',
    email: '',
    postcode: 'SL3',
    standingOrderAgreed: false,
    parkingAgreed: false
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e) => {
    e?.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final Submit
      const newSubmission = {
        id: 'reg_' + Date.now(),
        submittedAt: new Date().toISOString(),
        studentName: formData.studentName || 'Student',
        age: formData.age || '—',
        dob: formData.dob || '—',
        priorExperience: formData.priorExperience,
        sessionTrack: formData.sessionTrack,
        parentName: formData.parentName || 'Parent / Guardian',
        phone: formData.phone || '—',
        email: formData.email || '—',
        postcode: formData.postcode || 'SL3',
        status: 'Pending Diagnostic'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('lic_quran_registrations') || '[]');
        localStorage.setItem('lic_quran_registrations', JSON.stringify([newSubmission, ...existing]));
      } catch (err) {
        console.warn("Could not save registration locally:", err);
      }

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={resetForm} />

      <div className="relative bg-[#0d1527] border border-slate-700/80 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Quran Classes Registration
              </h3>
              <p className="text-xs text-slate-400">
                Nazira &amp; Tajweed for Boys (Age 7–16) • £40/month
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {!submitted && (
          <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs">
            {['Student Info', 'Track & Level', 'Parent Details', 'Agreement'].map((title, i) => (
              <div key={title} className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  step === i + 1 
                    ? 'bg-sky-500 text-white shadow-glow-cyan' 
                    : step > i + 1 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </span>
                <span className={`hidden sm:inline font-medium ${step === i + 1 ? 'text-white' : 'text-slate-500'}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submitted ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white">Registration Expression Received!</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  Alhamdulillah! We have received your expression of interest for <strong className="text-sky-400">{formData.studentName || 'your child'}</strong>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Student:</span>
                  <strong className="text-white">{formData.studentName} (Age: {formData.age})</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Session Track:</span>
                  <strong className="text-white">
                    {formData.sessionTrack === 'option1' ? 'Mon, Tue & Wed' : 'Thu, Fri & Sat'}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Level Preference:</span>
                  <strong className="text-sky-400">{formData.levelPreference}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Monthly Fee:</span>
                  <strong className="text-emerald-400">£40 (Standing Order by 28th)</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Parent Phone:</span>
                  <strong className="text-white">{formData.phone}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 text-left max-w-md mx-auto">
                <strong>Next Step: Teacher Assessment</strong><br />
                Our Maktab coordinator will contact you via WhatsApp/Phone on <strong>{formData.phone}</strong> to schedule an initial 10-minute assessment before confirmation.
              </div>

              <button
                onClick={resetForm}
                className="w-full max-w-md py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors"
              >
                Done &amp; Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-6">
              
              {/* STEP 1: Student Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">Student Particulars</h4>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zaid Ahmed"
                      value={formData.studentName}
                      onChange={(e) => handleChange('studentName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Age (Boys 7–16) *
                      </label>
                      <select
                        value={formData.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                      >
                        {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((a) => (
                          <option key={a} value={a}>{a} years old</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current Quranic Background
                    </label>
                    <select
                      value={formData.priorExperience}
                      onChange={(e) => handleChange('priorExperience', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="none">Beginner / No previous Arabic study</option>
                      <option value="qaida">Currently on Noorani / Ahsanul Qawa'id</option>
                      <option value="juz_amma">Reading Juz Amma</option>
                      <option value="nazira">Fluent reading of Holy Quran with Tajweed</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Track & Level Preference */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">Select Preferred Days &amp; Level</h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Preferred 3-Day Track (Choose One) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => handleChange('sessionTrack', 'option1')}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          formData.sessionTrack === 'option1'
                            ? 'bg-sky-950/60 border-sky-400 text-white shadow-glow-cyan'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-sky-400 block mb-1">Option 1</span>
                        <strong className="text-sm block">Mon, Tue &amp; Wednesday</strong>
                        <span className="text-[11px] text-slate-400">3 days per week</span>
                      </div>

                      <div
                        onClick={() => handleChange('sessionTrack', 'option2')}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          formData.sessionTrack === 'option2'
                            ? 'bg-sky-950/60 border-sky-400 text-white shadow-glow-cyan'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-sky-400 block mb-1">Option 2</span>
                        <strong className="text-sm block">Thu, Fri &amp; Saturday</strong>
                        <span className="text-[11px] text-slate-400">3 days per week</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Class Level &amp; Time Slot Preference *
                    </label>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Beginner', time: '4:30pm – 5:30pm', desc: 'Alphabet, phonetics & Qaida' },
                        { name: 'Intermediate', time: '5:30pm – 6:30pm', desc: 'Juz Amma & foundational Tajweed' },
                        { name: 'Advanced', time: '6:30pm – 7:30pm', desc: 'Full Quran recitation & Makharij precision' }
                      ].map((lvl) => (
                        <div
                          key={lvl.name}
                          onClick={() => handleChange('levelPreference', lvl.name)}
                          className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                            formData.levelPreference === lvl.name
                              ? 'bg-sky-950/60 border-sky-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <strong className="text-sm block text-white">{lvl.name}</strong>
                            <span className="text-xs text-slate-400">{lvl.desc}</span>
                          </div>
                          <span className="text-xs font-bold text-sky-400">{lvl.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Parent & Emergency Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">Parent / Guardian Details</h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Ahmed"
                      value={formData.parentName}
                      onChange={(e) => handleChange('parentName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="07xxx xxxxxx"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Home Postcode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SL3 8XX"
                      value={formData.postcode}
                      onChange={(e) => handleChange('postcode', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Mandatory Agreements */}
              {step === 4 && (
                <div className="space-y-5">
                  <h4 className="text-base font-bold text-white mb-2">Terms, Standing Order &amp; Parking</h4>

                  {/* Standing Order terms */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-white block">Monthly Standing Order: £40 per child</strong>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Following assessment and place confirmation, parents agree to establish a monthly Standing Order of £40 by the <strong>28th of the previous month</strong> to ensure tuition is received in advance.
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 pt-2 border-t border-slate-800/80 cursor-pointer text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        required
                        checked={formData.standingOrderAgreed}
                        onChange={(e) => handleChange('standingOrderAgreed', e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 focus:ring-0 cursor-pointer"
                      />
                      <span>I agree to set up the £40 monthly Standing Order upon confirmation.</span>
                    </label>
                  </div>

                  {/* Parking Guidelines */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-white block">Spitfire Close Parking Code</strong>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          I agree to use designated drop-off areas, not block resident driveways, never park on yellow lines, and respect local neighbours at all times.
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 pt-2 border-t border-slate-800/80 cursor-pointer text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        required
                        checked={formData.parkingAgreed}
                        onChange={(e) => handleChange('parkingAgreed', e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 focus:ring-0 cursor-pointer"
                      />
                      <span>I agree to strictly abide by the LIC Parking Code.</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={step === 4 && (!formData.standingOrderAgreed || !formData.parkingAgreed)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 transition-all shadow-glow-cyan"
                >
                  <span>{step === 4 ? 'Confirm & Submit Expression' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
