import React, { useState } from 'react';
import { LIC_DATA } from '../data/content';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Car, 
  Compass,
  Building,
  Image as ImageIcon
} from 'lucide-react';

export default function SpitfireLocationSection() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [showParkingModal, setShowParkingModal] = useState(false);

  const photos = [
    {
      src: '/src/assets/LIC-OutSide-1024x771.jpg',
      title: 'Sanctuary Exterior & Main Gate',
      desc: 'The modern brick and timber facade of our permanent centre at Unit 2, Spitfire Close.'
    },
    {
      src: '/src/assets/SpitFireSlider.jpg',
      title: 'Permanent Waqf Premises',
      desc: 'Dedicated sanctuary serving five daily prayers, Jummah, youth education, and family services.'
    },
    {
      src: '/src/assets/SpitFireSlider2.jpg',
      title: 'Sanctuary Grounds & Approach',
      desc: 'Peaceful cul-de-sac setting in Langley, Berkshire, with dedicated pedestrian pathways.'
    },
    {
      src: '/src/assets/SpitFireFoto2.png',
      title: 'Spitfire Close Access Road',
      desc: 'Quiet neighbourhood approach road. Please maintain 10mph speed limit and preserve resident access.'
    },
    {
      src: '/src/assets/SpitFireSlider4.jpg',
      title: 'Madrasah & Multipurpose Hall',
      desc: 'Bright learning halls configured for Qur\'an recitation, Tajweed, and youth mentoring.'
    }
  ];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Spitfire Close, Langley, SL3 8GY")}`;

  return (
    <section id="spitfire-close" className="py-24 relative bg-transparent border-t border-[#c5a059]/20 bg-jali-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#c5a059]/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-widest bg-[#162030] text-[#dfb76c] border border-[#c5a059]/30 mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>Permanent Waqf Home Secured</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f0e6] tracking-tight">
              Spitfire Close Sanctuary • Langley SL3 8GY
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-300 font-sans max-w-2xl font-light leading-relaxed">
              Alhamdulillah, our permanent building is an active house of prayer, Qur'anic scholarship, sisters' assemblies, and youth welfare in the heart of Slough.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowParkingModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-serif font-bold text-[#dfb76c] bg-[#162030] hover:bg-[#1f2d44] border border-[#c5a059]/35 transition-all shadow-sm"
            >
              <Car className="w-4 h-4 text-[#dfb76c]" />
              <span>Spitfire Parking Rules</span>
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-serif font-bold text-[#080b10] btn-monumental-gold transition-all"
            >
              <Compass className="w-4 h-4 text-[#080b10]" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Architectural Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Photo Gallery (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-[#0c1017] border border-[#c5a059]/25 shadow-2xl group">
              <img 
                src={photos[activePhoto].src} 
                alt={photos[activePhoto].title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Photo Caption Plaque */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#dfb76c] mb-1 font-bold">
                  Spitfire Close Campus Viewpoint {activePhoto + 1} of {photos.length}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f0e6]">
                  {photos[activePhoto].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1 max-w-xl">
                  {photos[activePhoto].desc}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-5 gap-3">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative rounded-2xl overflow-hidden aspect-video border-2 transition-all ${
                    activePhoto === idx 
                      ? 'border-[#dfb76c] scale-95 shadow-lg' 
                      : 'border-stone-800 opacity-60 hover:opacity-100 hover:border-[#c5a059]/40'
                  }`}
                >
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Location Info & Map (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="p-6 rounded-3xl sanctuary-plaque space-y-5 text-left">
              <h3 className="text-xl font-serif font-bold text-[#f4f0e6] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#dfb76c]" />
                <span>Visiting Langley Islamic Centre</span>
              </h3>

              <div className="space-y-4 text-sm font-sans">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#080b10] border border-[#c5a059]/20 text-[#dfb76c] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block">Location</span>
                    <strong className="text-[#f4f0e6] font-serif text-base">Unit 2, Spitfire Close</strong>
                    <span className="text-stone-300 text-xs block">Langley, Slough, Berkshire, SL3 8GY</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#080b10] border border-[#c5a059]/20 text-[#dfb76c] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block">Sanctuary Hours</span>
                    <strong className="text-[#f4f0e6] font-serif text-base">{LIC_DATA.location.hours}</strong>
                    <span className="text-stone-400 text-xs block">Open daily for all five daily prayers</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#080b10] border border-[#c5a059]/20 text-[#dfb76c] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block">Telephone Enquiries</span>
                    <a href={`tel:${LIC_DATA.location.phone.replace(/\s+/g, '')}`} className="text-[#dfb76c] font-mono font-bold hover:underline">
                      {LIC_DATA.location.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#080b10] border border-[#c5a059]/20 text-[#dfb76c] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-stone-400 block">Trustee &amp; General Email</span>
                    <a href={`mailto:${LIC_DATA.location.email}`} className="text-[#dfb76c] hover:underline text-xs break-all font-mono">
                      {LIC_DATA.location.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Parking Reminder Banner */}
              <div 
                onClick={() => setShowParkingModal(true)}
                className="p-4 rounded-2xl bg-[#261e0f] border border-[#dfb76c]/40 text-[#dfb76c] flex items-center justify-between cursor-pointer hover:bg-[#332814] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-xs font-serif font-bold">
                  <AlertTriangle className="w-4 h-4 text-[#dfb76c] flex-shrink-0" />
                  <span>Mandatory Spitfire Parking Code</span>
                </div>
                <span className="text-xs font-serif underline text-[#f4f0e6]">View Code</span>
              </div>
            </div>

            {/* Static Map Graphic Card */}
            <div className="rounded-3xl overflow-hidden bg-[#0c1017] border border-[#c5a059]/20 shadow-xl relative group">
              <img 
                src="/src/assets/Map.png" 
                alt="Langley Map" 
                className="w-full h-48 object-cover filter brightness-85 group-hover:brightness-95 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-transparent to-transparent flex items-end p-4">
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-serif font-bold text-[#f4f0e6] bg-[#111722]/90 hover:bg-[#1a2333] transition-colors border border-[#c5a059]/30"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#dfb76c]" />
                  <span>Get Driving &amp; Walking Route</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Parking Guidelines Modal */}
      {showParkingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="sanctuary-plaque border border-[#c5a059]/40 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#c5a059]/20 mb-6">
              <div className="flex items-center gap-2.5 text-[#dfb76c]">
                <Car className="w-6 h-6" />
                <h3 className="text-2xl font-serif font-bold text-[#f4f0e6]">Langley Parking Code of Conduct</h3>
              </div>
              <button 
                onClick={() => setShowParkingModal(false)}
                className="p-2 rounded-xl bg-[#162030] text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm font-sans text-stone-300 mb-6 leading-relaxed">
              To be exemplary Muslim neighbours and maintain child safety, every worshipper attending Spitfire Close must strictly adhere to our parking guidelines:
            </p>

            <ul className="space-y-3 mb-8">
              {LIC_DATA.quranClasses.parkingRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-sans text-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#74c69d] flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowParkingModal(false)}
              className="w-full py-3.5 rounded-full font-serif font-bold text-[#080b10] btn-monumental-gold transition-colors text-sm"
            >
              I Understand &amp; Pledge to Comply
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
