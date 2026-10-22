import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Play, 
  MapPin, 
  UtensilsCrossed, 
  ExternalLink, 
  HeartHandshake, 
  ShieldCheck, 
  Camera, 
  ChevronRight,
  Flame,
  Award,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { storiesData, sponsorDetails } from '../data/storiesData';
import { tournamentPhotos } from '../data/tournamentPhotos';

export default function CommunityStoriesSection({ 
  onOpenStory, 
  onOpenDonation,
  onOpenStandingOrder 
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isAmbient = theme === 'ambient';

  const [activePhotoCategory, setActivePhotoCategory] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Filter photos
  const filteredPhotos = tournamentPhotos.filter(photo => {
    if (activePhotoCategory === 'all') return true;
    if (activePhotoCategory === 'trophy') return photo.tag.includes('Trophy') || photo.tag.includes('Lineup');
    return photo.tag.includes('Action') || photo.tag.includes('Kickoff');
  });

  const displayedPhotos = showAllPhotos ? filteredPhotos : filteredPhotos.slice(0, 8);

  return (
    <section id="stories" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-amber-500/25 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border transition-all shadow-sm bg-amber-500/10 text-amber-500 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Live Chronicles & Impact Dispatches
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-neutral-900' : 'text-white'
          }`}>
            Faith in Motion. <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">Community on the Pitch.</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            From youth football cups powered by local champions to our nationwide management fundraising drives — explore interactive dispatches from the front lines of our community.
          </p>
        </div>

        {/* 1. Tappable Interactive Stories Ring Bar (Instagram / Revolut Mobile-First Style) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Tap to Watch Stories
            </span>
            <span className="text-xs text-neutral-400">Auto-advancing 2026 dispatches</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            {storiesData.map((story, index) => (
              <button
                key={story.id}
                onClick={() => onOpenStory(index)}
                className="group flex-shrink-0 flex flex-col items-center focus:outline-none transition-transform active:scale-95 text-center"
                aria-label={`Open story: ${story.title}`}
              >
                {/* Glowing Avatar Ring */}
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

                  {/* Badge */}
                  <span className="absolute -bottom-1 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500 text-neutral-950 shadow-md">
                    {story.badge}
                  </span>
                </div>

                {/* Title */}
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

        {/* 2. Bold Bento Grid Chronicles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Bento Card 1: Featured Football Tournament (7 cols) */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 group ${
            isLight 
              ? 'bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/20 border-amber-200/60' 
              : 'bg-gradient-to-br from-neutral-900/90 via-neutral-900/70 to-emerald-950/30 border-white/10'
          }`}>
            {/* Background Texture Photo */}
            <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
              <img 
                src={tournamentPhotos[25]?.src || tournamentPhotos[0]?.src} 
                alt="Tournament crowd" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Trophy className="w-3.5 h-3.5" />
                  Annual Charity Football Cup
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Sponsored by Biryaniwala
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight ${
                isLight ? 'text-neutral-900' : 'text-white'
              }`}>
                Community, Passion & Youth Empowerment on the Pitch
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 max-w-xl ${
                isLight ? 'text-neutral-600' : 'text-neutral-300'
              }`}>
                Organized by the management of Langley Islamic Centre, the Charity Football Cup brought together over 16 youth and adult teams from across Slough and Berkshire. 100% of fundraising proceeds support our permanent centre at Spitfire Close.
              </p>

              {/* Tournament Metric Chips */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className={`p-3 rounded-2xl border text-center ${
                  isLight ? 'bg-white/80 border-amber-200' : 'bg-black/40 border-white/10'
                }`}>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 leading-none">16+</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mt-1">Teams</div>
                </div>
                <div className={`p-3 rounded-2xl border text-center ${
                  isLight ? 'bg-white/80 border-amber-200' : 'bg-black/40 border-white/10'
                }`}>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 leading-none">£4,250+</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mt-1">Raised</div>
                </div>
                <div className={`p-3 rounded-2xl border text-center ${
                  isLight ? 'bg-white/80 border-amber-200' : 'bg-black/40 border-white/10'
                }`}>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 leading-none">120+</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mt-1">Players</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenStory(0)}
                className="py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-emerald-400 text-neutral-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Launch Interactive Story
              </button>
              <button
                onClick={() => setShowAllPhotos(prev => !prev)}
                className={`py-3 px-4 rounded-2xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                  isLight 
                    ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' 
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                }`}
              >
                <Camera className="w-4 h-4 text-amber-400" />
                {showAllPhotos ? 'Collapse Gallery' : 'View All 32 Photos'}
              </button>
            </div>
          </div>

          {/* Bento Card 2: Biryaniwala Sponsor Spotlight (5 cols) */}
          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 ${
            isLight 
              ? 'bg-gradient-to-br from-amber-50 via-white to-amber-100/40 border-amber-300/70' 
              : 'bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 border-amber-500/30'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-sm">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Official Title Sponsor
                </span>
                <span className="text-xs text-amber-400 font-semibold">Community Hero</span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
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
                A heartfelt tribute to <strong>Biryaniwala Slough</strong> for providing crucial financial sponsorship and delicious catering for our players, referees, and youth supporters.
              </p>

              {/* Sponsor Highlights list */}
              <div className="space-y-2 mb-6">
                {sponsorDetails.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={sponsorDetails.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                Visit / Find Biryaniwala on Google Maps <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onOpenStory(1)}
                className={`w-full py-2 px-4 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-1.5 ${
                  isLight 
                    ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-amber-300' 
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                Watch Biryaniwala Tribute Story <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>

          {/* Bento Card 3: Management on Tour / Outreach (12 cols) */}
          <div className={`lg:col-span-12 rounded-3xl p-6 sm:p-8 border relative overflow-hidden shadow-2xl ${
            isLight 
              ? 'bg-gradient-to-r from-emerald-50/60 via-white to-amber-50/40 border-emerald-200/70' 
              : 'bg-gradient-to-r from-emerald-950/30 via-neutral-900 to-neutral-900/90 border-emerald-500/20'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Compass className="w-3.5 h-3.5" />
                    Management on the Road
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Charity CIO #1180443
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight ${
                  isLight ? 'text-neutral-900' : 'text-white'
                }`}>
                  The Nationwide Waqf Fundraising Tour
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
                  isLight ? 'text-neutral-600' : 'text-neutral-300'
                }`}>
                  Our trustees and management travel across UK cities — visiting Friday congregations, partner masajid, and community charity galas to share the vision of the Spitfire Close Centre.
                </p>

                {/* Tour stops chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['London & Heathrow', 'Birmingham', 'Luton', 'Bradford', 'Slough & Windsor'].map((city, idx) => (
                    <span 
                      key={idx}
                      className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 ${
                        isLight 
                          ? 'bg-emerald-100 text-emerald-900' 
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center items-start md:items-end gap-3">
                <div className={`p-4 rounded-2xl border w-full text-left ${
                  isLight ? 'bg-white border-neutral-200' : 'bg-black/50 border-white/10'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Charity Commission Registered
                    </span>
                    <span className="font-mono">#1180443</span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">
                    Verified CIO governance for Langley Islamic Centre with full annual reporting and financial transparency.
                  </p>
                  <a
                    href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5128534/contact-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                  >
                    View Official Register Record <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex w-full gap-2">
                  <button
                    onClick={() => onOpenStory(2)}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch Tour Story
                  </button>
                  <a
                    href="https://www.facebook.com/LangleyIslamicCentre/?locale=en_GB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`py-2.5 px-4 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-1 ${
                      isLight ? 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300' : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                    }`}
                  >
                    Facebook Page <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tournament 32-Photo Interactive Masonry Showcase */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
                isLight ? 'text-neutral-900' : 'text-white'
              }`}>
                <Camera className="w-5 h-5 text-amber-400" />
                Tournament Matchday Gallery
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                  {tournamentPhotos.length} Photos
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Authentic action shots from the Charity Cup 2026 sponsored by Biryaniwala
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'trophy', label: 'Trophies & Teams' },
                { id: 'action', label: 'Pitch Action' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActivePhotoCategory(cat.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    activePhotoCategory === cat.id
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : isLight
                        ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayedPhotos.map((photo, i) => (
              <div 
                key={photo.id || i}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-[10px] font-bold uppercase text-amber-400">{photo.tag}</span>
                  <span className="text-xs text-white font-medium truncate">Tap to enlarge</span>
                </div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Toggle */}
          {filteredPhotos.length > 8 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllPhotos(prev => !prev)}
                className={`py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider border transition-all inline-flex items-center gap-2 ${
                  isLight 
                    ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 shadow-sm' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                {showAllPhotos ? 'Show Less' : `Load All ${filteredPhotos.length} Tournament Photos`}
                <ChevronRight className={`w-4 h-4 transition-transform ${showAllPhotos ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for individual photo view */}
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
