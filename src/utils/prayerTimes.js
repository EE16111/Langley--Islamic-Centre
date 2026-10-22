/**
 * Prayer Times Compatibility Facade
 * Delegates to the unified Prayer CMS service with live Admin Control Centre settings.
 */

import { 
  getPrayerTimesForDate, 
  getNextPrayerFromData, 
  getPrayerCMSConfig,
  generateMonthTimetable,
  exportTimetableCSV,
  exportTimetableICS,
  subscribePrayerCMS
} from '../services/prayerCMS';

export function calculatePrayerTimes(date = new Date(), options = {}) {
  const currentConfig = getPrayerCMSConfig();
  const mergedConfig = {
    ...currentConfig,
    asrHanafi: options.asrHanafi !== undefined ? options.asrHanafi : currentConfig.asrHanafi
  };
  return getPrayerTimesForDate(date, mergedConfig);
}

export function getNextPrayer(prayers, currentTime = new Date()) {
  return getNextPrayerFromData(prayers, currentTime);
}

export { 
  generateMonthTimetable, 
  exportTimetableCSV, 
  exportTimetableICS, 
  subscribePrayerCMS,
  getPrayerCMSConfig
};
