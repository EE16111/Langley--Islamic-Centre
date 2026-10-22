import React, { useState, useEffect } from 'react';
import { 
  X, 
  Compass, 
  MapPin, 
  RotateCw, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck,
  Sun,
  Navigation
} from 'lucide-react';
import { LIC_DATA } from '../data/content';

export default function QiblaModal({ isOpen, onClose }) {
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [hasCompassSupport, setHasCompassSupport] = useState(false);
  const [manualOffset, setManualOffset] = useState(0);

  // Exact Qibla Angle from Langley/Slough
  const QIBLA_BEARING = 118.9; // degrees from True North
  const DISTANCE_TO_MAKKAH_KM = 4815;
  const DISTANCE_TO_MAKKAH_MILES = 2992;

  useEffect(() => {
    if (!isOpen) return;

    const handleOrientation = (e) => {
      if (e.webkitCompassHeading !== undefined) {
        // iOS Safari provides true heading
        setDeviceHeading(e.webkitCompassHeading);
        setHasCompassSupport(true);
      } else if (e.alpha !== null) {
        // Android provides alpha
        setDeviceHeading(360 - e.alpha);
        setHasCompassSupport(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Relative needle angle based on either device heading or manual offset
  const needleRotation = (QIBLA_BEARING - (hasCompassSupport ? deviceHeading : manualOffset) + 360) % 360;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#080d19] border border-amber-500/30 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Spitfire Close Qibla Direction
              </h3>
              <p className="text-xs text-slate-400">
                Calibrated for Langley & Slough ({LIC_DATA.location.postcode})
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-center">
          
          {/* Compass Graphic */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            
            {/* Outer Dial Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 to-sky-500/10 blur-xl" />
            
            {/* Outer Compass Housing */}
            <div className="relative w-full h-full rounded-full border-2 border-slate-700 bg-slate-950/80 shadow-2xl flex items-center justify-center">
              
              {/* Degree markers */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-3 bg-slate-700 top-1 origin-bottom"
                  style={{
                    left: 'calc(50% - 2px)',
                    transform: `rotate(${i * 30}deg) translateY(6px)`
                  }}
                />
              ))}

              {/* Cardinal directions */}
              <span className="absolute top-3 font-bold text-xs text-red-400">N</span>
              <span className="absolute right-4 font-bold text-xs text-slate-400">E</span>
              <span className="absolute bottom-3 font-bold text-xs text-slate-400">S</span>
              <span className="absolute left-4 font-bold text-xs text-slate-400">W</span>

              {/* Kaaba Direction Indicator Label */}
              <div 
                className="absolute text-[10px] font-bold text-amber-300 flex flex-col items-center pointer-events-none"
                style={{
                  transform: `rotate(${QIBLA_BEARING}deg) translateY(-84px) rotate(-${QIBLA_BEARING}deg)`
                }}
              >
                <div className="w-4 h-4 rounded bg-slate-950 border border-amber-400 shadow-glow-amber flex items-center justify-center text-[8px] font-arabic text-amber-300">
                  🕋
                </div>
                <span className="mt-0.5 text-[9px] font-mono">118.9°</span>
              </div>

              {/* Rotating Compass Needle */}
              <div 
                className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out pointer-events-none"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              >
                {/* Needle Pointing to Kaaba */}
                <div className="w-2.5 h-24 bg-gradient-to-t from-transparent via-amber-400 to-amber-300 rounded-t-full shadow-glow-amber relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-b-8 border-b-amber-300" />
                </div>
                {/* Needle South end */}
                <div className="w-2 h-16 bg-gradient-to-b from-transparent to-slate-700 rounded-b-full absolute bottom-8" />
                {/* Center Pivot Pin */}
                <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-amber-400 shadow-md absolute z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
              </div>

            </div>
          </div>

          {/* Key Distance & Angle Stats */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                True Bearing
              </span>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-xl font-mono font-black text-amber-400">
                  {QIBLA_BEARING}°
                </strong>
                <span className="text-xs text-slate-400 font-medium">ESE</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                28.9° south of due East
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Distance to Makkah
              </span>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-xl font-mono font-black text-sky-400">
                  {DISTANCE_TO_MAKKAH_KM.toLocaleString()}
                </strong>
                <span className="text-xs text-slate-400 font-medium">km</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                ({DISTANCE_TO_MAKKAH_MILES.toLocaleString()} miles)
              </span>
            </div>
          </div>

          {/* Orientation Advice */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-left space-y-2">
            <strong className="text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400" />
              <span>How to find Qibla in Langley:</span>
            </strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Stand facing the morning sunrise (East), then turn approximately 29 degrees towards your right (South-East). The prayer rows inside our Spitfire Close centre are precisely aligned with this axis.
            </p>
          </div>

          {/* Compass Sensor Status / Manual Slider */}
          {!hasCompassSupport && (
            <div className="pt-2 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Manual Orientation Simulator:</span>
                <span className="text-amber-400 font-mono font-bold">{manualOffset}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={manualOffset}
                onChange={(e) => setManualOffset(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-500 block">
                Rotate slider to simulate turning your body or device.
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
