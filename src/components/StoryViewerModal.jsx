import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Heart, 
  ExternalLink, 
  MapPin, 
  Trophy, 
  Building2, 
  Share2, 
  CheckCircle2, 
  Flame, 
  UtensilsCrossed
} from 'lucide-react';

export default function StoryViewerModal({ 
  isOpen, 
  onClose, 
  stories, 
  initialStoryIndex = 0,
  onOpenDonation,
  onOpenStandingOrder
}) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [liked, setLiked] = useState(false);

  const currentStory = stories[currentStoryIndex] || stories[0];
  const slides = currentStory?.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const slideDuration = currentStory?.duration || 6000;
  const progressIntervalRef = useRef(null);
  const touchStartTimeRef = useRef(0);

  // Sync initial story index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStoryIndex(initialStoryIndex);
      setCurrentSlideIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen, initialStoryIndex]);

  // Go to next slide or next story
  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentSlideIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentSlideIndex, slides.length, currentStoryIndex, stories.length, onClose]);

  // Go to previous slide or previous story
  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      const prevStory = stories[currentStoryIndex - 1];
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentSlideIndex(prevStory.slides.length - 1);
      setProgress(0);
    }
  }, [currentSlideIndex, currentStoryIndex, stories]);

  // Progress timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalStep = 50; // ms
    const increment = (intervalStep / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, isPaused, slideDuration, nextSlide]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextSlide, prevSlide, onClose]);

  // Floating reaction animation
  const addReaction = (emoji) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: 30 + Math.random() * 40
    };
    setReactions(prev => [...prev.slice(-10), newReaction]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);
  };

  const handlePointerDown = () => {
    touchStartTimeRef.current = Date.now();
    setIsPaused(true);
  };

  const handlePointerUp = (e) => {
    setIsPaused(false);
    const duration = Date.now() - touchStartTimeRef.current;
    
    // If it was a quick tap, determine left or right half
    if (duration < 250) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width * 0.35) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  if (!isOpen || !currentStory || !currentSlide) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={currentStory.title}
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, rgba(245, 158, 11, 0.3) 40%, transparent 70%)`
        }}
      />

      {/* Floating Reaction Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
        {reactions.map(r => (
          <span 
            key={r.id}
            className="absolute bottom-24 text-3xl animate-bounce transition-all duration-1000 ease-out select-none"
            style={{
              left: `${r.x}%`,
              animation: 'floatUp 1.8s forwards'
            }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* Close button (top right fixed) */}
      <button
        onClick={onClose}
        aria-label="Close story"
        className="absolute top-4 right-4 md:top-6 md:right-8 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-transform active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Stage Container */}
      <div 
        className="relative w-full max-w-md h-[92vh] max-h-[820px] rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-white/15 bg-neutral-950 flex flex-col select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Progress Bar Header */}
        <div className="absolute top-0 inset-x-0 z-30 pt-3 px-3.5 pb-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {/* Segmented Progress Bars */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {slides.map((s, idx) => {
              let width = '0%';
              if (idx < currentSlideIndex) width = '100%';
              else if (idx === currentSlideIndex) width = `${progress}%`;

              return (
                <div 
                  key={s.id || idx} 
                  className="flex-1 h-1.5 rounded-full bg-white/25 overflow-hidden backdrop-blur-sm"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-amber-300 via-emerald-400 to-amber-200 transition-all duration-75 ease-linear rounded-full"
                    style={{ width }}
                  />
                </div>
              );
            })}
          </div>

          {/* Story Meta Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full ring-2 ring-amber-400/80 p-0.5 overflow-hidden bg-black/50">
                <img 
                  src={currentStory.coverImage} 
                  alt={currentStory.title} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold tracking-wide leading-none">{currentStory.title}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                    {currentStory.badge}
                  </span>
                </div>
                <p className="text-[11px] text-white/70 leading-tight mt-0.5">{currentStory.subtitle}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-white/70">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPaused(p => !p); }}
                className="p-1.5 hover:text-white rounded-full bg-white/10"
                aria-label={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Main Image & Visual Layer */}
        <div className="relative flex-1 w-full bg-neutral-900 overflow-hidden">
          <img 
            src={currentSlide.image} 
            alt={currentSlide.title} 
            className="w-full h-full object-cover object-center filter brightness-[0.88] transition-transform duration-700 ease-out scale-100 hover:scale-105"
          />

          {/* Vignette / Shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />

          {/* Dynamic Content Overlay based on slide type */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end text-white">
            {/* Tagline */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
              {currentSlide.tagline}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-md mb-2">
              {currentSlide.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-neutral-200 leading-snug drop-shadow mb-3 line-clamp-3">
              {currentSlide.description}
            </p>

            {/* Sponsor Card (if type === 'sponsor' or 'sponsor-card') */}
            {(currentSlide.type === 'sponsor' || currentSlide.type === 'sponsor-card') && (
              <div 
                className="mb-3 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 backdrop-blur-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-200 leading-none">{currentSlide.sponsorName || 'Biryaniwala'}</h4>
                      <p className="text-[11px] text-amber-300/80 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {currentSlide.sponsorAddress || '308 High Street, Slough, SL1 1NB'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black">
                    SPONSOR
                  </span>
                </div>

                {currentSlide.quote && (
                  <p className="text-xs italic text-amber-100/90 border-l-2 border-amber-400/60 pl-2 my-2">
                    {currentSlide.quote}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-amber-200/70">Hyderabadi & Halal Specialties</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-white underline decoration-amber-400/50"
                  >
                    View on Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Quick Stats Grid */}
            {currentSlide.stats && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {currentSlide.stats.map((st, i) => (
                  <div key={i} className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                    <div className="text-lg font-extrabold text-amber-300 leading-none">{st.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/70 mt-1">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tour Timeline Stops */}
            {currentSlide.stops && (
              <div className="space-y-1.5 mb-3 bg-black/40 p-2.5 rounded-xl border border-white/10">
                {currentSlide.stops.map((st, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {st.city}
                    </span>
                    <span className="text-[11px] text-white/70">{st.note}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Charity Transparency Box */}
            {currentSlide.type === 'charity-transparency' && (
              <div 
                className="mb-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-emerald-300">Registered Charity CIO</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">#1180443</span>
                </div>
                <p className="text-[11px] text-emerald-100/80 mb-2">
                  Official Charity Commission for England and Wales registration. Full public governance & reporting.
                </p>
                <div className="flex gap-2">
                  <a 
                    href={currentSlide.charityUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1"
                  >
                    Verify on Register <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={currentSlide.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center gap-1"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            )}

            {/* Action CTA Button */}
            {currentSlide.ctaText && (
              <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    if (currentSlide.ctaAction === 'donate' && onOpenDonation) {
                      onClose();
                      onOpenDonation();
                    } else if (currentSlide.ctaAction === 'standingOrder' && onOpenStandingOrder) {
                      onClose();
                      onOpenStandingOrder();
                    } else if (currentSlide.ctaAction === 'contact') {
                      onClose();
                      const contactElem = document.getElementById('contact');
                      if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-neutral-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {currentSlide.ctaText}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        <div 
          className="relative z-30 p-3 bg-neutral-950/95 border-t border-white/10 flex items-center justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Reaction Emojis Bar */}
          <div className="flex items-center gap-2">
            {['🤲', '❤️', '⚽', '🔥', '🏆'].map(emoji => (
              <button
                key={emoji}
                onClick={() => addReaction(emoji)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 active:scale-125 transition-all flex items-center justify-center text-sm"
                aria-label={`React with ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Quick like / share */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLiked(l => !l);
                addReaction('❤️');
              }}
              className={`p-2 rounded-full border transition-all ${
                liked 
                  ? 'bg-rose-500 text-white border-rose-400' 
                  : 'bg-white/5 text-white/80 hover:text-white border-white/10'
              }`}
              aria-label="Like story"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${currentStory.title} - Langley Islamic Centre`,
                    text: currentSlide.title,
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  addReaction('✨');
                }
              }}
              className="p-2 rounded-full bg-white/5 text-white/80 hover:text-white border border-white/10"
              aria-label="Share story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invisible Left & Right Click Guides for Desktop Mouse Users */}
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-opacity hidden md:flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-opacity hidden md:flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          50% {
            transform: translateY(-80px) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(1.6);
          }
        }
      `}</style>
    </div>
  );
}
