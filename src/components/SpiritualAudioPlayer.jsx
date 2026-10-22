import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  Radio
} from 'lucide-react';

const AUDIO_TRACKS = [
  {
    id: 'adhan',
    title: 'Adhan (Call to Prayer)',
    reciter: 'Makkah Al-Mukarramah',
    url: '/audio/adhan.mp3',
    duration: '3:45'
  },
  {
    id: 'fatihah',
    title: 'Surah Al-Fatihah (Complete)',
    reciter: 'Mishary Rashid Alafasy',
    url: '/audio/fatihah.mp3',
    duration: '0:50'
  },
  {
    id: 'kursi',
    title: 'Ayat Al-Kursi (Throne Verse)',
    reciter: 'Mishary Rashid Alafasy',
    url: '/audio/kursi.mp3',
    duration: '1:18'
  }
];

export default function SpiritualAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked or failed:", err);
      });
    }
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.src = AUDIO_TRACKS[index].url;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-auto">
      <audio ref={audioRef} src={currentTrack.url} preload="none" />

      {/* Collapsed Pill or Expanded Player */}
      {!isExpanded ? (
        <div className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-full bg-slate-900/95 border border-sky-500/40 shadow-2xl backdrop-blur-md text-xs">
          
          {/* Animated Equalizer Waves */}
          <div className="flex items-center gap-0.5 h-4">
            <span className={`w-0.5 rounded-full bg-sky-400 ${isPlaying ? 'h-3 animate-pulse' : 'h-1.5'}`} />
            <span className={`w-0.5 rounded-full bg-cyan-400 ${isPlaying ? 'h-4 animate-bounce' : 'h-2'}`} style={{ animationDuration: '0.8s' }} />
            <span className={`w-0.5 rounded-full bg-sky-400 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1'}`} />
          </div>

          <div 
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer max-w-[140px] truncate"
          >
            <strong className="text-[11px] font-bold text-white block truncate">
              {currentTrack.title}
            </strong>
          </div>

          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-glow-cyan transition-transform active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            className="p-1 rounded-full text-slate-400 hover:text-white"
            title="Expand player"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-[#090f1e]/95 border border-sky-500/40 shadow-2xl backdrop-blur-md text-xs w-80 space-y-3">
          
          {/* Player Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-[11px]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIC Spiritual Audio</span>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Track Info */}
          <div>
            <h5 className="text-sm font-bold text-white truncate">
              {currentTrack.title}
            </h5>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {currentTrack.reciter}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-cyan transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <span className="text-[10px] text-slate-400 font-mono">
              {currentTrack.duration}
            </span>
          </div>

          {/* Track Selector List */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            {AUDIO_TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => handleTrackChange(idx)}
                className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                  currentTrackIndex === idx 
                    ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300' 
                    : 'hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="text-[11px] font-semibold block truncate">{t.title}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 flex-shrink-0">{t.duration}</span>
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
