import React, { useState } from 'react';
import { 
  Trophy, 
  Play, 
  MapPin, 
  UtensilsCrossed, 
  ExternalLink, 
  ShieldCheck, 
  Camera, 
  ChevronRight,
  Flame,
  ArrowUpRight,
  Building2,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { storiesData, sponsorDetails } from '../data/storiesData';
import { tournamentPitchPhotos, managementTourPhotos } from '../data/tournamentPhotos';

export default function CommunityStoriesSection({ 
  onOpenStory, 
  onOpenDonation,
  onOpenStandingOrder 
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState('tournament'); // 'tournament' | 'fundraising'
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [showAllPitch, setShowAllPitch] = useState(false);
  const [showAllTour, setShowAllTour] = useState(false);

  const displayedPitchPhotos = showAllPitch ? tournamentPitchPhotos : tournamentPitchPhotos.slice(0, 8);
  const displayedTourPhotos = showAllTour ? managementTourPhotos : managementTourPhotos.slice(0, 8);

  return (
    <section id="stories" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-amber-500/10 text-amber-500 border-amber-500/30">
            Community Updates & Reports
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-neutral-900' : 'text-white'
          }`}>
            Community in Action. <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">On the Pitch & on the Road.</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            Official chronicles of the Langley Islamic Centre Charity Football Cup and our management's nationwide fundraising appeals for Unit 2, Spitfire Close.
          </p>
        </div>

        {/* 1. Tappable Stories Ring Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Tap to View Story Reports
            </span>
            <span className="text-xs text-neutral-400">Interactive Visual Updates</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            {storiesData.map((story, index) => (
              <button
                key={story.id}
                onClick={() => onOpenStory(index)}
                className="group flex-shrink-0 flex flex-col items-center focus:outline-none transition-transform active:scale-95 text-center"
                aria-label={`Open story: ${story.title}`}
              >
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-400 to-amber-200 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                  <div className={`p-0.5 rounded-full ${isLight ? 'bg-white' : 'bg-neutral-950'}`}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden relative">
                      <img 
                        src={story.coverImage} 
                        alt={story.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white/80 opacity-90 group-hover:scale-115 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <span className="absolute -bottom-1 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500 text-neutral-950 shadow-md">
                    {story.badge}
                  </span>
                </div>

                <span className={`text-xs font-bold mt-2.5 max-w-[84px] sm:max-w-[100px] truncate ${
                  isLight ? 'text-neutral-900' : 'text-white'
                }`}>
                  {story.title}
                </span>
                <span className="text-[10px] text-neutral-400 max-w-[84px] sm:max-w-[100px] truncate">
                  {story.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Navigation Tabs: Ground vs Indoor Tours */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('tournament')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'tournament'
                ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 scale-105'
                : isLight
                  ? 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Football Tournament (On the Pitch)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {tournamentPitchPhotos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('fundraising')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'fundraising'
                ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20 scale-105'
                : isLight
                  ? 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Management Fundraising Drives (£550k Appeal)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {managementTourPhotos.length}
            </span>
          </button>
        </div>

        {/* TAB 1: Football Tournament (Ground & Sports Only) */}
        {activeTab === 'tournament' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Bento Cards: Tournament Overview & Biryaniwala Sponsor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Tournament Matchday Card */}
              <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col justify-between shadow-xl ${
                isLight 
                  ? 'bg-gradient-to-br from-white via-amber-50/40 to-neutral-50 border-amber-200/60' 
                  : 'bg-gradient-to-br from-neutral-900/90 via-neutral-900/70 to-emerald-950/20 border-white/10'
              }`}>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Trophy className="w-3.5 h-3.5" />
                      Charity Football Cup
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Sponsored by Biryaniwala
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight ${
                    isLight ? 'text-neutral-900' : 'text-white'
                  }`}>
                    Grassroots Youth & Community Tournament
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                    isLight ? 'text-neutral-600' : 'text-neutral-300'
                  }`}>
                    Organized by Langley Islamic Centre management on the Slough Town FC grounds. Local youth and adult squads competed in the spirit of sportsmanship, with all proceeds directly backing our permanent Waqf centre.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className={`p-3 rounded-2xl border text-center ${
                      isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
                    }`}>
                      <div className="text-xl font-black text-amber-400">Slough Town</div>
                      <div className="text-[10px] font-semibold uppercase text-neutral-400 mt-1">Ground</div>
                    </div>
                    <div className={`p-3 rounded-2xl border text-center ${
                      isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
                    }`}>
                      <div className="text-xl font-black text-emerald-400">100%</div>
                      <div className="text-[10px] font-semibold uppercase text-neutral-400 mt-1">To Waqf Fund</div>
                    </div>
                    <div className={`p-3 rounded-2xl border text-center ${
                      isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
                    }`}>
                      <div className="text-xl font-black text-amber-300">16 Teams</div>
                      <div className="text-[10px] font-semibold uppercase text-neutral-400 mt-1">Participated</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenStory(0)}
                    className="py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-emerald-400 text-neutral-950 shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Matchday Story
                  </button>
                  <button
                    onClick={() => setShowAllPitch(prev => !prev)}
                    className={`py-3 px-4 rounded-2xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                      isLight 
                        ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' 
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-amber-400" />
                    {showAllPitch ? 'Show Fewer Photos' : `View All (${tournamentPitchPhotos.length}) Pitch Photos`}
                  </button>
                </div>
              </div>

              {/* Biryaniwala Sponsor Pavilion */}
              <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col justify-between shadow-xl ${
                isLight 
                  ? 'bg-gradient-to-br from-amber-50 via-white to-amber-100/30 border-amber-300/70' 
                  : 'bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 border-amber-500/30'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-neutral-950">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      Official Event Sponsor
                    </span>
                    <span className="text-xs text-amber-400 font-semibold">Local Business</span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <UtensilsCrossed className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                        {sponsorDetails.name}
                      </h3>
                      <p className="text-xs text-amber-400 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {sponsorDetails.address}
                      </p>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    We express our sincere appreciation to <strong>Biryaniwala Slough</strong> for providing fresh catering, hot food for participants and volunteers, and essential financial sponsorship for this tournament.
                  </p>

                  <div className="space-y-2 mb-6">
                    {sponsorDetails.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-amber-400 font-bold">•</span>
                        <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={sponsorDetails.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    View Biryaniwala on Google Maps <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => onOpenStory(1)}
                    className={`w-full py-2 px-4 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-1.5 ${
                      isLight 
                        ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-amber-300' 
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                    }`}
                  >
                    Watch Biryaniwala Sponsor Story <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pitch Photos Grid (Strictly ground and sports only) */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                  <Camera className="w-4 h-4 text-amber-400" />
                  Football Ground & Matchday Photos ({tournamentPitchPhotos.length})
                </h4>
                <span className="text-xs text-neutral-400">Slough Town FC Pitch</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {displayedPitchPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    onClick={() => setLightboxPhoto(photo)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <span className="text-[10px] font-bold uppercase text-amber-400">{photo.tag}</span>
                      <span className="text-xs text-white font-medium truncate">{photo.alt}</span>
                    </div>
                  </div>
                ))}
              </div>

              {tournamentPitchPhotos.length > 8 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllPitch(prev => !prev)}
                    className={`py-2 px-5 rounded-full font-bold text-xs uppercase tracking-wider border transition-all inline-flex items-center gap-1.5 ${
                      isLight 
                        ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' 
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    {showAllPitch ? 'Show Less' : `Show All ${tournamentPitchPhotos.length} Pitch Photos`}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllPitch ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Management On Tour & Waqf Fundraising Drives (£550k Campaign) */}
        {activeTab === 'fundraising' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner Card: The £550,000 Urgent Building Appeal */}
            <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl ${
              isLight 
                ? 'bg-gradient-to-r from-emerald-50 via-white to-amber-50 border-emerald-200' 
                : 'bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950 border-emerald-500/30'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-neutral-950">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Registered Charity CIO #1180443
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Unit 2, Spitfire Close, Langley, SL3 8GY
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight ${
                    isLight ? 'text-neutral-900' : 'text-white'
                  }`}>
                    £550,000 Urgently Needed to Complete Acquisition Debt-Free
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
                    isLight ? 'text-neutral-600' : 'text-neutral-300'
                  }`}>
                    Management and volunteers in official high-vis jackets regularly travel to partner mosques, Friday Jumu'ah congregations, and community centres across London and the UK to hold appeals and collection bucket drives.
                  </p>

                  <div className="p-3.5 rounded-2xl border text-xs space-y-1 mb-2 bg-black/40 text-neutral-200 border-white/10 font-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Bank:</span>
                      <strong className="text-amber-300">HSBC Bank</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account Name:</span>
                      <strong>Langley Islamic Centre</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Sort Code:</span>
                      <strong>40-42-08</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account Number:</span>
                      <strong>02494973</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Contact / Helpline:</span>
                      <strong className="text-emerald-400">078 4373 2106</strong>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-3">
                  <button
                    onClick={onOpenDonation}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-emerald-400 text-neutral-950 shadow-md hover:brightness-110 active:scale-95 transition-all text-center"
                  >
                    Donate to £550k Building Fund
                  </button>

                  <button
                    onClick={onOpenStandingOrder}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs border text-center transition-all ${
                      isLight ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                    }`}
                  >
                    Download Standing Order Mandate
                  </button>

                  <a
                    href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5128534/contact-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-center font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center justify-center gap-1"
                  >
                    Charity Commission Official Record <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Indoor Fundraising & Appeal Delegations Photo Gallery */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                    <Users className="w-4 h-4 text-emerald-400" />
                    Management Tour & Appeal Gallery ({managementTourPhotos.length} Photos)
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Mosque visits, official appeals, collection buckets & volunteer delegations
                  </p>
                </div>
                <button
                  onClick={() => onOpenStory(2)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-neutral-950 flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Watch Tour Story
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {displayedTourPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    onClick={() => setLightboxPhoto(photo)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <span className="text-[10px] font-bold uppercase text-emerald-400">{photo.tag}</span>
                      <span className="text-xs text-white font-medium truncate">{photo.alt}</span>
                    </div>
                  </div>
                ))}
              </div>

              {managementTourPhotos.length > 8 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllTour(prev => !prev)}
                    className={`py-2 px-5 rounded-full font-bold text-xs uppercase tracking-wider border transition-all inline-flex items-center gap-1.5 ${
                      isLight 
                        ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' 
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    {showAllTour ? 'Show Less' : `Show All ${managementTourPhotos.length} Appeal Photos`}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllTour ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white"
              aria-label="Close photo"
            >
              Close ✕
            </button>
            <img 
              src={lightboxPhoto.src} 
              alt={lightboxPhoto.alt}
              className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-white/15"
            />
            <p className="text-sm text-neutral-300 mt-3 text-center">
              {lightboxPhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
