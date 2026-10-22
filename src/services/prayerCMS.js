/**
 * Langley Islamic Centre — Dynamic Prayer CMS & Calendar Engine
 * Models Regent's Park Mosque (London Central Mosque / ICCUK) & Unified London Prayer Timetable standards.
 * Fully configurable via the Admin Control Centre without hardcoded values.
 */

const STORAGE_KEY = 'lic_prayer_cms_settings_v2';
const EVENT_NAME = 'lic-prayer-cms-updated';

// Astronomical Math Helpers
const DEG_TO_RAD = Math.PI / 180.0;
const RAD_TO_DEG = 180.0 / Math.PI;
const sinDeg = (deg) => Math.sin(deg * DEG_TO_RAD);
const cosDeg = (deg) => Math.cos(deg * DEG_TO_RAD);
const tanDeg = (deg) => Math.tan(deg * DEG_TO_RAD);
const acosDeg = (rad) => Math.acos(rad) * RAD_TO_DEG;
const asinDeg = (rad) => Math.asin(rad) * RAD_TO_DEG;
const atan2Deg = (y, x) => Math.atan2(y, x) * RAD_TO_DEG;
const fixAngle = (a) => {
  a = a - 360.0 * Math.floor(a / 360.0);
  return a < 0 ? a + 360.0 : a;
};
const fixHour = (h) => {
  h = h - 24.0 * Math.floor(h / 24.0);
  return h < 0 ? h + 24.0 : h;
};

// Default Configuration modeled on Regent's Park (London Central Mosque / ICCUK)
export const DEFAULT_PRAYER_CMS_CONFIG = {
  institution: "Langley Islamic Centre",
  authorityProfile: "regents_london_unified", // "regents_london_unified" | "custom_manual" | "astronomical"
  authorityLabel: "Regent's Park Mosque (ICCUK) / Unified London Standard",
  coordinates: {
    lat: 51.5074,
    lng: -0.5422,
    locationName: "Langley, Slough SL3 8GY"
  },
  
  // Calculation Angles & Parameters
  fajrAngle: 15.0, // London Unified standard: 15° or 18° with summer rule
  ishaAngle: 15.0,
  asrHanafi: false, // Standard Shafi/Hanbali/Maliki or Hanafi (Double shadow)
  hijriAdjustment: 0, // Days adjustment (-2 to +2) for UK Moon Sighting
  dstMode: 'auto', // 'auto' | 'standard' | 'bst'

  // Congregation (Jamā'ah) Rules:
  // Each prayer can be 'fixed' (e.g. 13:00) or 'offset' (+X minutes after Adhan)
  jamaatRules: {
    fajr: {
      mode: 'fixed',
      fixedTime: '06:15',
      offsetMinutes: 20,
      label: 'Fajr Jamā\'ah'
    },
    dhuhr: {
      mode: 'fixed',
      fixedTime: '13:00',
      offsetMinutes: 15,
      label: 'Zuhr Jamā\'ah'
    },
    asr: {
      mode: 'fixed',
      fixedTime: '16:00',
      offsetMinutes: 15,
      label: 'Asr Jamā\'ah'
    },
    maghrib: {
      mode: 'offset',
      fixedTime: '18:15',
      offsetMinutes: 5, // Sunset + 5m standard across UK
      label: 'Maghrib Jamā\'ah'
    },
    isha: {
      mode: 'fixed',
      fixedTime: '20:00',
      offsetMinutes: 15,
      label: 'Isha Jamā\'ah'
    }
  },

  // Friday Jumu'ah Specifications (Dual Congregation like Regent's Park & LIC)
  jummah: {
    dualCongregation: true,
    first: {
      bayanTime: '12:45',
      khutbahTime: '13:00',
      jamaatTime: '13:15',
      khateeb: 'Imam Abu Bakr',
      language: 'English & Arabic'
    },
    second: {
      enabled: true,
      bayanTime: '13:45',
      khutbahTime: '14:00',
      jamaatTime: '14:15',
      khateeb: 'Resident Scholar',
      language: 'English'
    },
    instructions: "Please arrive with Wudhu. Strictly park only within designated bays at Spitfire Close."
  },

  // Live Mosque Banner Announcement for Prayer Timetable
  announcement: {
    enabled: true,
    type: 'notice', // 'notice' | 'urgent' | 'eid' | 'taraweeh'
    text: "Spitfire Close Sanctuary: Please respect our neighbours and avoid double-parking during all Jamā'ah times.",
    validUntil: '2026-12-31'
  },

  // Specific Date Overrides (e.g. '2026-10-20': { fajrStart: '05:42', fajrJam: '06:15', ... })
  dateOverrides: {}
};

/**
 * Format decimal hours into standard time objects
 */
export function formatDecimalTime(decimalHour) {
  const totalMinutes = Math.round(decimalHour * 60);
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  const pad = (n) => String(n).padStart(2, '0');
  
  const time24 = `${pad(h)}:${pad(m)}`;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const time12 = `${h12}:${pad(m)} ${period}`;

  return { h, m, time24, time12, totalMinutes };
}

/**
 * Convert time string "HH:MM" (e.g. "13:00") into { h, m, time24, time12, totalMinutes }
 */
export function parseTimeString(timeStr) {
  if (!timeStr) return formatDecimalTime(12);
  const clean = timeStr.trim().replace(/\s+(AM|PM)/i, '');
  const [hStr, mStr] = clean.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;

  if (/PM/i.test(timeStr) && h < 12) h += 12;
  if (/AM/i.test(timeStr) && h === 12) h = 0;

  const pad = (n) => String(n).padStart(2, '0');
  const time24 = `${pad(h)}:${pad(m)}`;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const time12 = `${h12}:${pad(m)} ${period}`;
  const totalMinutes = h * 60 + m;

  return { h, m, time24, time12, totalMinutes };
}

/**
 * Astronomical calculations based on coordinates and angles
 */
export function calculateAstronomicalTimes(date, config) {
  const lat = config.coordinates?.lat ?? 51.5074;
  const lng = config.coordinates?.lng ?? -0.5422;
  const fajrAngle = config.fajrAngle ?? 15.0;
  const ishaAngle = config.ishaAngle ?? 15.0;
  const asrHanafi = config.asrHanafi ?? false;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian Date calculation
  let Y = year;
  let M = month;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + day + B - 1524.5;
  const D = JD - 2451545.0;

  // Solar coordinates
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sinDeg(g) + 0.020 * sinDeg(2 * g));
  const e = 23.439 - 0.00000036 * D;

  // Sun declination & Right Ascension
  const RA = fixHour(atan2Deg(cosDeg(e) * sinDeg(L), cosDeg(L)) / 15.0);
  const delta = asinDeg(sinDeg(e) * sinDeg(L));

  // Equation of Time in hours
  const EqT = q / 15.0 - RA;

  // Local solar noon in UTC hours
  const tzOffset = -date.getTimezoneOffset() / 60;
  const noonUTC = 12 + (-lng / 15.0) - EqT;
  const noonLocal = fixHour(noonUTC + tzOffset);

  function sunHourAngle(angle, isAboveNoon = false) {
    const cosHA = (sinDeg(angle) - sinDeg(lat) * sinDeg(delta)) / (cosDeg(lat) * cosDeg(delta));
    if (cosHA > 1.0) return 0;
    if (cosHA < -1.0) return 12;
    const ha = acosDeg(cosHA) / 15.0;
    return isAboveNoon ? ha : -ha;
  }

  // Fajr & Sunrise
  const fajrHA = sunHourAngle(-fajrAngle);
  const fajrTime = fixHour(noonLocal + fajrHA);

  const sunriseHA = sunHourAngle(-0.8333);
  const sunriseTime = fixHour(noonLocal + sunriseHA);

  // Sunset & Maghrib
  const sunsetHA = sunHourAngle(-0.8333, true);
  const sunsetTime = fixHour(noonLocal + sunsetHA);
  const maghribTime = sunsetTime + (2 / 60); // 2 min sunset buffer

  // Isha
  const ishaHA = sunHourAngle(-ishaAngle, true);
  let ishaTime = fixHour(noonLocal + ishaHA);
  if (Math.abs(ishaTime - maghribTime) > 3.5 || ishaTime < maghribTime) {
    ishaTime = fixHour(maghribTime + 1.33);
  }

  // Asr
  const shadowMultiplier = asrHanafi ? 2 : 1;
  const asrAltitude = acosDeg((sinDeg(lat) * sinDeg(delta) + cosDeg(lat) * cosDeg(delta)) / 
    Math.sqrt(Math.pow(shadowMultiplier + tanDeg(Math.abs(lat - delta)), 2) + 1));
  const asrAngle = 90 - atan2Deg(shadowMultiplier + tanDeg(Math.abs(lat - delta)), 1);
  const asrHA = sunHourAngle(asrAngle, true);
  const asrTime = fixHour(noonLocal + asrHA);

  return {
    fajr: formatDecimalTime(fajrTime),
    sunrise: formatDecimalTime(sunriseTime),
    dhuhr: formatDecimalTime(noonLocal),
    asr: formatDecimalTime(asrTime),
    maghrib: formatDecimalTime(maghribTime),
    isha: formatDecimalTime(ishaTime)
  };
}

/**
 * Get Islamic Hijri Date with Admin Adjustment
 */
export function getHijriDate(date = new Date(), adjustmentDays = 0) {
  const adjusted = new Date(date);
  if (adjustmentDays !== 0) {
    adjusted.setDate(adjusted.getDate() + adjustmentDays);
  }

  try {
    const formatter = new Intl.DateTimeFormat('en-GB-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(adjusted);
    const day = parts.find(p => p.type === 'day')?.value || '1';
    const month = parts.find(p => p.type === 'month')?.value || 'Muharram';
    const year = parts.find(p => p.type === 'year')?.value || '1448';
    
    return {
      day,
      month,
      year: `${year} AH`,
      formatted: `${day} ${month} ${year} AH`
    };
  } catch {
    return {
      day: '10',
      month: 'Jumada al-Ula',
      year: '1448 AH',
      formatted: '10 Jumada al-Ula 1448 AH'
    };
  }
}

/**
 * Compute the prayer times for a specific date using:
 * 1. Admin Manual Date Override (if set)
 * 2. Or Astronomical Time + Admin Jamā'ah Rules
 */
export function getPrayerTimesForDate(date = new Date(), config = getPrayerCMSConfig()) {
  const dateKey = date.toISOString().slice(0, 10);
  const override = config.dateOverrides?.[dateKey];
  const astro = calculateAstronomicalTimes(date, config);
  const isFriday = date.getDay() === 5;
  const hijri = getHijriDate(date, config.hijriAdjustment);

  // Helper to resolve Jamā'ah time for a prayer
  function resolveJamaat(prayerId, startFormatted) {
    if (override && override[`${prayerId}Jam`]) {
      return parseTimeString(override[`${prayerId}Jam`]);
    }
    const rule = config.jamaatRules?.[prayerId];
    if (!rule) return startFormatted;

    if (rule.mode === 'fixed' && rule.fixedTime) {
      return parseTimeString(rule.fixedTime);
    }

    // Offset mode: start time + rule.offsetMinutes
    const offsetMin = rule.offsetMinutes || 15;
    const newTotalMinutes = startFormatted.totalMinutes + offsetMin;
    return formatDecimalTime(newTotalMinutes / 60);
  }

  // Resolve Beginning/Adhan time
  function resolveStart(prayerId) {
    if (override && override[`${prayerId}Start`]) {
      return parseTimeString(override[`${prayerId}Start`]);
    }
    return astro[prayerId];
  }

  const fajrStart = resolveStart('fajr');
  const fajrJam = resolveJamaat('fajr', fajrStart);

  const sunriseStart = resolveStart('sunrise');

  const dhuhrStart = resolveStart('dhuhr');
  const dhuhrJam = resolveJamaat('dhuhr', dhuhrStart);

  const asrStart = resolveStart('asr');
  const asrJam = resolveJamaat('asr', asrStart);

  const maghribStart = resolveStart('maghrib');
  const maghribJam = resolveJamaat('maghrib', maghribStart);

  const ishaStart = resolveStart('isha');
  const ishaJam = resolveJamaat('isha', ishaStart);

  const prayers = [
    {
      id: "fajr",
      name: "Fajr",
      arabic: "الفجر",
      start: fajrStart,
      jammaat: fajrJam,
      icon: "Sunrise"
    },
    {
      id: "sunrise",
      name: "Sunrise",
      arabic: "الشروق",
      start: sunriseStart,
      isSilent: true,
      icon: "Sun"
    },
    {
      id: "dhuhr",
      name: "Dhuhr",
      arabic: "الظهر",
      start: dhuhrStart,
      jammaat: dhuhrJam,
      icon: "SunMedium"
    },
    {
      id: "asr",
      name: "Asr",
      arabic: "العصر",
      start: asrStart,
      jammaat: asrJam,
      icon: "SunDim"
    },
    {
      id: "maghrib",
      name: "Maghrib",
      arabic: "المغرب",
      start: maghribStart,
      jammaat: maghribJam,
      icon: "Sunset"
    },
    {
      id: "isha",
      name: "Isha",
      arabic: "العشاء",
      start: ishaStart,
      jammaat: ishaJam,
      icon: "Moon"
    }
  ];

  // Friday Jumu'ah Setup from CMS
  const jummah = {
    isFriday,
    name: "Jumu'ah",
    arabic: "صلاة الجمعة",
    first: config.jummah?.first || {
      bayanTime: '12:45',
      khutbahTime: '13:00',
      jamaatTime: '13:15',
      khateeb: 'Imam Abu Bakr',
      language: 'English & Arabic'
    },
    second: config.jummah?.second || {
      enabled: true,
      bayanTime: '13:45',
      khutbahTime: '14:00',
      jamaatTime: '14:15',
      khateeb: 'Resident Scholar',
      language: 'English'
    },
    instructions: config.jummah?.instructions
  };

  return {
    date,
    dateKey,
    hijri,
    prayers,
    jummah,
    isFriday,
    config
  };
}

/**
 * Generate full month timetable table modeled on Regent's Park (London Central Mosque / ICCUK)
 */
export function generateMonthTimetable(year, monthIdx, config = getPrayerCMSConfig()) {
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const schedule = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const curDate = new Date(year, monthIdx, d);
    const dayData = getPrayerTimesForDate(curDate, config);
    const dayName = curDate.toLocaleDateString('en-GB', { weekday: 'short' });

    schedule.push({
      day: d,
      date: curDate,
      dateKey: dayData.dateKey,
      dayName,
      isFriday: dayData.isFriday,
      isToday: new Date().toDateString() === curDate.toDateString(),
      hijri: dayData.hijri,
      fajr: {
        start: dayData.prayers[0].start.time24,
        jammaat: dayData.prayers[0].jammaat.time24
      },
      sunrise: {
        start: dayData.prayers[1].start.time24
      },
      dhuhr: {
        start: dayData.prayers[2].start.time24,
        jammaat: dayData.prayers[2].jammaat.time24
      },
      asr: {
        start: dayData.prayers[3].start.time24,
        jammaat: dayData.prayers[3].jammaat.time24
      },
      maghrib: {
        start: dayData.prayers[4].start.time24,
        jammaat: dayData.prayers[4].jammaat.time24
      },
      isha: {
        start: dayData.prayers[5].start.time24,
        jammaat: dayData.prayers[5].jammaat.time24
      },
      jummah: dayData.jummah
    });
  }

  return schedule;
}

/**
 * Calculate countdown and next prayer
 */
export function getNextPrayerFromData(prayers, currentTime = new Date()) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes() + currentTime.getSeconds() / 60;
  const activePrayers = prayers.filter(p => !p.isSilent);

  for (let i = 0; i < activePrayers.length; i++) {
    const p = activePrayers[i];
    if (p.start.totalMinutes > currentMinutes) {
      const diffMinutes = p.start.totalMinutes - currentMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const mins = Math.floor(diffMinutes % 60);
      const secs = Math.floor((diffMinutes * 60) % 60);
      return {
        next: p,
        countdown: { hours, mins, secs },
        current: i === 0 ? activePrayers[activePrayers.length - 1] : activePrayers[i - 1],
        isNextDay: false
      };
    }
  }

  // Next prayer is tomorrow's Fajr
  const first = activePrayers[0];
  const diffMinutes = (24 * 60 - currentMinutes) + first.start.totalMinutes;
  const hours = Math.floor(diffMinutes / 60);
  const mins = Math.floor(diffMinutes % 60);
  const secs = Math.floor((diffMinutes * 60) % 60);

  return {
    next: first,
    countdown: { hours, mins, secs },
    current: activePrayers[activePrayers.length - 1],
    isNextDay: true
  };
}

/**
 * LocalStorage CMS Read/Write operations
 */
export function getPrayerCMSConfig() {
  if (typeof window === 'undefined') return DEFAULT_PRAYER_CMS_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PRAYER_CMS_CONFIG;
    return { ...DEFAULT_PRAYER_CMS_CONFIG, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_PRAYER_CMS_CONFIG;
  }
}

export function savePrayerCMSConfig(newConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newConfig }));
  } catch (err) {
    console.error("Failed to save Prayer CMS configuration:", err);
  }
}

export function resetPrayerCMSConfig() {
  savePrayerCMSConfig(DEFAULT_PRAYER_CMS_CONFIG);
}

/**
 * Subscribe to CMS live updates in React components
 */
export function subscribePrayerCMS(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => callback(e.detail || getPrayerCMSConfig());
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) callback(getPrayerCMSConfig());
  });
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
}

/**
 * Export Monthly Timetable as CSV (Regent's Mosque Unified Format)
 */
export function exportTimetableCSV(year, monthIdx, config = getPrayerCMSConfig()) {
  const schedule = generateMonthTimetable(year, monthIdx, config);
  const monthName = new Date(year, monthIdx).toLocaleString('en-GB', { month: 'long' });

  let csv = `Langley Islamic Centre - ${monthName} ${year} Prayer Timetable\n`;
  csv += `Standard: Regent's Park Mosque (ICCUK) / Unified London Schedule\n`;
  csv += `Day,Date,Day of Week,Hijri Date,Fajr Beg,Fajr Jam,Sunrise,Zuhr Beg,Zuhr Jam,Asr Beg,Asr Jam,Maghrib Beg,Maghrib Jam,Isha Beg,Isha Jam\n`;

  schedule.forEach(d => {
    csv += `${d.day},${d.dateKey},${d.dayName},"${d.hijri.formatted}",${d.fajr.start},${d.fajr.jammaat},${d.sunrise.start},${d.dhuhr.start},${d.dhuhr.jammaat},${d.asr.start},${d.asr.jammaat},${d.maghrib.start},${d.maghrib.jammaat},${d.isha.start},${d.isha.jammaat}\n`;
  });

  return csv;
}

/**
 * Export iCal (.ics) format for calendar synchronization
 */
export function exportTimetableICS(year, monthIdx, config = getPrayerCMSConfig()) {
  const schedule = generateMonthTimetable(year, monthIdx, config);
  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Langley Islamic Centre//Prayer Timetable//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";

  schedule.forEach(d => {
    const pNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const pKeys = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    pKeys.forEach((key, idx) => {
      const p = d[key];
      const [h, m] = p.jammaat.split(':');
      const startObj = new Date(d.date);
      startObj.setHours(parseInt(h, 10), parseInt(m, 10), 0);
      const endObj = new Date(startObj.getTime() + 20 * 60000); // 20m duration

      const pad = (n) => String(n).padStart(2, '0');
      const dtStart = `${startObj.getFullYear()}${pad(startObj.getMonth()+1)}${pad(startObj.getDate())}T${pad(startObj.getHours())}${pad(startObj.getMinutes())}00`;
      const dtEnd = `${endObj.getFullYear()}${pad(endObj.getMonth()+1)}${pad(endObj.getDate())}${pad(endObj.getHours())}${pad(endObj.getMinutes())}00`;

      ics += "BEGIN:VEVENT\n";
      ics += `UID:lic-${d.dateKey}-${key}@langleyislamiccentre.co.uk\n`;
      ics += `SUMMARY:${pNames[idx]} Jamā'ah - Langley Islamic Centre\n`;
      ics += `DESCRIPTION:${pNames[idx]} Prayer at Spitfire Close SL3 8GY. Adhan: ${p.start}, Jamā'ah: ${p.jammaat}\n`;
      ics += `DTSTART:${dtStart}\n`;
      ics += `DTEND:${dtEnd}\n`;
      ics += "LOCATION:Spitfire Close, Langley, Slough SL3 8GY\n";
      ics += "END:VEVENT\n";
    });
  });

  ics += "END:VCALENDAR";
  return ics;
}
