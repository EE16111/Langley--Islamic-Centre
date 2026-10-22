import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Sun, 
  ShieldCheck, 
  ArrowLeft, 
  RotateCw, 
  Share2, 
  CheckCircle2, 
  Crosshair,
  ExternalLink,
  Info
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LIC_DATA } from '../data/content';

// Great circle formula for Qibla Bearing and Distance
function calculateQibla(lat, lon) {
  const kaabaLat = (21.422487 * Math.PI) / 180;
  const kaabaLon = (39.826206 * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;

  const y = Math.sin(kaabaLon - lambda);
  const x = Math.cos(phi) * Math.tan(kaabaLat) - Math.sin(phi) * Math.cos(kaabaLon - lambda);
  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;
  if (qiblaDeg < 0) qiblaDeg += 360;

  // Distance in km using Haversine
  const R = 6371; // Earth radius in km
  const dLat = kaabaLat - phi;
  const dLon = kaabaLon - lambda;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(phi) * Math.cos(kaabaLat) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distanceKm = Math.round(R * c);
  const distanceMiles = Math.round(distanceKm * 0.621371);

  return { bearing: Math.round(qiblaDeg * 10) / 10, distanceKm, distanceMiles };
}

export default function QiblaPage({ onBack }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Default: Langley Islamic Centre, Spitfire Close (51.5078° N, -0.5428° W)
  const [coords, setCoords] = useState({ lat: 51.5078, lon: -0.5428, place: 'Unit 2, Spitfire Close, Langley, SL3 8GY' });
  const [qiblaInfo, setQiblaInfo] = useState({ bearing: 118.9, distanceKm: 4818, distanceMiles: 2994 });
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [compassAvailable, setCompassAvailable] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [locating, setLocating] = useState(false);
  const [manualHeading, setManualHeading] = useState(0);

  // Recalculate whenever coords change
  useEffect(() => {
    setQiblaInfo(calculateQibla(coords.lat, coords.lon));
  }, [coords]);

  // Request orientation on iOS / Android
  const requestCompassPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionRequested(true);
          listenToOrientation();
        }
      } catch (err) {
        console.warn('Orientation permission denied:', err);
      }
    } else {
      setPermissionRequested(true);
      listenToOrientation();
    }
  };

  const listenToOrientation = () => {
    const handleOrientation = (e) => {
      let heading = null;
      if (e.webkitCompassHeading !== undefined) {
        heading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = 360 - e.alpha;
      }
      if (heading !== null) {
        setDeviceHeading(heading);
        setCompassAvailable(true);
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, true);
  };

  useEffect(() => {
    listenToOrientation();
  }, []);

  // Use current geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          place: 'Current GPS Coordinates'
        });
        setLocating(false);
      },
      () => {
        alert('Could not retrieve GPS location. Keeping Langley Islamic Centre coordinates.');
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const currentHeading = compassAvailable ? deviceHeading : manualHeading;
  // Needle points towards Qibla relative to top of device
  const relativeAngle = (qiblaInfo.bearing - currentHeading + 360) % 360;
  const isAligned = Math.abs(relativeAngle) < 4 || Math.abs(relativeAngle - 360) < 4;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isLight ? 'bg-[#fbf9f4] text-neutral-900' : 'bg-[#080d1a] text-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBack || (() => { window.location.hash = ''; })}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              isLight ? 'bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
              CIO #1180443
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Qibla Finder - Langley Islamic Centre',
                    text: `Qibla bearing from Langley: ${qiblaInfo.bearing}° ESE (${qiblaInfo.distanceMiles} miles to Makkah)`,
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Page link copied to clipboard!');
                }
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300"
              title="Share Qibla Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Compass className="w-4 h-4" />
            Precise Qibla Direction
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Langley Qibla Compass
          </h1>
          <p className={`text-sm sm:text-base ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
            Direct compass bearing to the Holy Kaaba in Makkah al-Mukarramah, mathematically calibrated for Unit 2 Spitfire Close and the surrounding Slough region.
          </p>
        </div>

        {/* Compass & Direction Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Compass Dial (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center">
            
            {/* Status Beacon */}
            <div className={`mb-4 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              isAligned 
                ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/40 animate-pulse' 
                : 'bg-black/40 text-neutral-400 border border-white/10'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAligned ? 'ALIGNED WITH QIBLA (FACING MAKKAH)' : 'ROTATE TO ALIGN NEEDLE TO 🕋'}</span>
            </div>

            {/* Visual Compass */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
              
              {/* Outer Ring */}
              <div className={`absolute inset-0 rounded-full border-4 shadow-2xl transition-all duration-300 ${
                isAligned 
                  ? 'border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.4)]' 
                  : isLight ? 'border-amber-300/80 bg-white shadow-xl' : 'border-amber-500/30 bg-[#0a1122]'
              }`}>
                {/* 360 Degree Ticks */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-2.5 bg-neutral-600 top-2 origin-bottom"
                    style={{
                      left: 'calc(50% - 2px)',
                      transform: `rotate(${i * 15}deg) translateY(4px)`
                    }}
                  />
                ))}

                {/* Cardinal Points */}
                <span className="absolute top-4 left-1/2 -translate-x-1/2 font-black text-sm text-red-500">N</span>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-sm text-amber-400">E</span>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-black text-sm text-neutral-400">S</span>
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-sm text-neutral-400">W</span>

                {/* Kaaba Position on Dial */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                  style={{ transform: `rotate(${qiblaInfo.bearing}deg)` }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-xl filter drop-shadow">🕋</span>
                    <span className="text-[10px] font-mono font-bold text-amber-300">118.9°</span>
                  </div>
                </div>

                {/* Rotating Needle pointing towards Kaaba */}
                <div 
                  className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
                  style={{ transform: `rotate(${relativeAngle}deg)` }}
                >
                  {/* Arrow Pointing to Qibla */}
                  <div className={`w-3 h-28 sm:h-32 rounded-t-full relative shadow-lg ${
                    isAligned 
                      ? 'bg-gradient-to-t from-emerald-600 to-emerald-300' 
                      : 'bg-gradient-to-t from-amber-600 to-amber-300'
                  }`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[12px] border-b-amber-300" />
                  </div>
                  {/* South Tail */}
                  <div className="w-2 h-20 rounded-b-full bg-neutral-600 absolute bottom-8 opacity-60" />
                  {/* Center Pivot Pin */}
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-amber-400 shadow-md absolute z-10 flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${isAligned ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  </div>
                </div>
              </div>

            </div>

            {/* Sensor Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {!compassAvailable && (
                <button
                  onClick={requestCompassPermission}
                  className="py-2 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-2 shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Enable Phone Compass Sensor
                </button>
              )}

              <button
                onClick={handleUseCurrentLocation}
                disabled={locating}
                className={`py-2 px-4 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
                  isLight ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                }`}
              >
                <Crosshair className={`w-3.5 h-3.5 text-amber-400 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Detecting GPS...' : 'Use My Current Location'}</span>
              </button>
            </div>

            {/* Manual Slider Fallback */}
            {!compassAvailable && (
              <div className="w-full max-w-xs mt-4">
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <span>Manual Simulator:</span>
                  <span className="font-mono text-amber-400 font-bold">{manualHeading}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={manualHeading}
                  onChange={(e) => setManualHeading(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg accent-amber-400 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Location & Navigation Data Cards (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Bearing Card */}
            <div className={`p-5 rounded-3xl border shadow-lg ${
              isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-amber-400">Exact Qibla Angle</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">True North</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-amber-400">{qiblaInfo.bearing}°</span>
                <span className="text-lg font-bold text-neutral-400">East-South-East (ESE)</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Approximately 28.9° south of due East.
              </p>
            </div>

            {/* Distance to Kaaba */}
            <div className={`p-5 rounded-3xl border shadow-lg ${
              isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-emerald-400">Distance to Holy Kaaba</span>
                <span className="text-xs text-neutral-400">Makkah al-Mukarramah</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-black text-emerald-400">
                  {qiblaInfo.distanceKm.toLocaleString()} km
                </span>
                <span className="text-sm font-semibold text-neutral-400">
                  ({qiblaInfo.distanceMiles.toLocaleString()} miles)
                </span>
              </div>
            </div>

            {/* Mosque Practical Alignment Guide */}
            <div className={`p-5 rounded-3xl border text-xs space-y-2.5 ${
              isLight ? 'bg-amber-50/70 border-amber-200 text-neutral-800' : 'bg-amber-950/20 border-amber-500/30 text-neutral-300'
            }`}>
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <Navigation className="w-4 h-4" />
                <span>How to Orient in Langley & Slough:</span>
              </div>
              <p className="leading-relaxed">
                1. Face directly towards the morning sunrise (due East).
              </p>
              <p className="leading-relaxed">
                2. Turn slightly to your right by approximately 29 degrees towards the South-East.
              </p>
              <p className="leading-relaxed">
                3. The musallah prayer rows inside Unit 2, Spitfire Close are permanently aligned along this 118.9° axis.
              </p>
            </div>

            {/* Current Reference Location */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block">Calculated for:</span>
                <span className="font-bold text-white block">{coords.place}</span>
                <span className="text-[10px] font-mono text-neutral-400">
                  Lat: {coords.lat.toFixed(4)}° N, Lon: {coords.lon.toFixed(4)}° W
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
