import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  MessageCircle, 
  CheckCircle2, 
  Send, 
  Briefcase, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VolunteerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('volunteer'); // 'volunteer' | 'imam'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: true
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={resetAndClose} />

      <div className="relative bg-[#0d1527] border border-slate-700/80 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              {activeTab === 'volunteer' ? <HeartHandshake className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {activeTab === 'volunteer' ? 'Volunteer Registration' : 'Imam Vacancy Announcement'}
              </h3>
              <p className="text-xs text-slate-400">
                Langley Islamic Centre • Community Service
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'volunteer'
                ? 'bg-sky-500 text-white shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Volunteer Sign-up
          </button>
          <button
            onClick={() => setActiveTab('imam')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'imam'
                ? 'bg-sky-500 text-white shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Imam Vacancy Details
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'volunteer' ? (
            submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Thank You for Volunteering!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Jazak Allahu Khairan, <strong>{formData.name}</strong>. Our team will contact you for upcoming events and initiatives.
                </p>

                {/* WhatsApp Group Invite */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-left mt-4">
                  <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold mb-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>Join our WhatsApp Volunteer Group</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Stay connected directly with local organisers for daily and Friday volunteering updates.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                  >
                    <span>Connect on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={resetAndClose}
                  className="w-full mt-4 py-2.5 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors text-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07xxx xxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    How would you like to help? (Skills / Interests)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Event organising, youth mentoring, IT & media, Jummah stewarding..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 mt-0.5 cursor-pointer"
                  />
                  <span>
                    I agree that Langley Islamic Centre can use my contact details to contact me for future events and community initiatives.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all shadow-glow-cyan flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Volunteer Request</span>
                </button>
              </form>
            )
          ) : (
            /* Imam Vacancy Details */
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40">
                <span className="text-[10px] font-bold uppercase text-sky-400 block mb-1">
                  Active Vacancy
                </span>
                <h4 className="text-base font-bold text-white">
                  Imam for Langley Islamic Centre (LIC)
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Location: Spitfire Close, Langley, Slough SL3 8GY
                </p>
              </div>

              <p>
                Langley Islamic Centre (LIC), a charitable Islamic institution based in Langley, Slough, is seeking a dedicated, knowledgeable, and inspiring Imam to lead our community.
              </p>

              <div className="space-y-1.5">
                <strong className="text-white block">Key Responsibilities:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Leading daily prayers and Friday Jummah khutbah</li>
                  <li>Delivering Islamic guidance grounded in Quran and authentic Sunnah</li>
                  <li>Conducting educational sessions and youth mentoring</li>
                  <li>Providing pastoral care and spiritual counselling to community members</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <strong className="text-white block">How to Apply:</strong>
                <p className="text-xs text-slate-400">
                  Please send your CV, cover letter, and references directly to:
                </p>
                <a
                  href="mailto:info@langleyislamiccentre.co.uk?subject=Imam%20Application%20-%20Langley%20Islamic%20Centre"
                  className="inline-flex items-center gap-2 text-sky-400 font-bold hover:underline"
                >
                  info@langleyislamiccentre.co.uk
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
