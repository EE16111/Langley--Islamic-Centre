import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Calendar as CalendarIcon, 
  Table, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Printer, 
  Clock, 
  Compass, 
  ShieldCheck, 
  Settings, 
  Share2, 
  Check, 
  CalendarPlus,
  Info
} from 'lucide-react';
import { 
  generateMonthTimetable, 
  getPrayerCMSConfig, 
  subscribePrayerCMS, 
  exportTimetableCSV, 
  exportTimetableICS,
  getPrayerTimesForDate 
} from '../services/prayerCMS';

export default function TimetableModal({ isOpen, onClose, onOpenAdmin }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(today.getMonth());
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'calendar' | 'ramadan'
  const [selectedDayDetail, setSelectedDayDetail] = useState(null);
  const [cmsConfig, setCmsConfig] = useState(getPrayerCMSConfig());
  const [copiedLink, setCopiedLink] = useState(false);

  // Subscribe to live CMS updates
  useEffect(() => {
    const unsubscribe = subscribePrayerCMS((updatedConfig) => {
      setCmsConfig(updatedConfig);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const currentMonthName = months[selectedMonthIdx];
  const schedule = generateMonthTimetable(currentYear, selectedMonthIdx, cmsConfig);

  const handlePrevMonth = () => {
    if (selectedMonthIdx === 0) {
      setSelectedMonthIdx(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setSelectedMonthIdx(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonthIdx === 11) {
      setSelectedMonthIdx(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setSelectedMonthIdx(prev => prev + 1);
    }
  };

  const handleDownloadCSV = () => {
    const csvData = exportTimetableCSV(currentYear, selectedMonthIdx, cmsConfig);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LIC_Prayer_Timetable_${currentMonthName}_${currentYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadICS = () => {
    const icsData = exportTimetableICS(currentYear, selectedMonthIdx, cmsConfig);
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LIC_Prayers_${currentMonthName}_${currentYear}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#080b10] border border-[#c5a059]/30 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[94vh]">
        
        {/* Top Header: Regent's Mosque Inspired Trust Emblem */}
        <div className="p-4 sm:p-6 border-b border-[#c5a059]/20 bg-[#0c1017] flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#dfb76c] flex-shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#dfb76c] font-bold">
                  {cmsConfig.authorityLabel}
                </span>
                <span className="text-[#c5a059]">•</span>
                <span className="text-[10px] font-mono text-[#74c69d]">Live CMS Synchronised</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4f0e6]">
                Langley Unified Prayer Timetable &amp; Calendar
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Spitfire Close Sanctuary • Lat 51.5074° N, Long -0.5422° W • UK Charity #1180443
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Quick Link to Control Centre */}
            <button
              onClick={() => { onClose(); if (onOpenAdmin) onOpenAdmin(); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif text-[#dfb76c] bg-[#1a2332]/60 hover:bg-[#1a2332] border border-[#c5a059]/30 transition-all"
              title="Open Admin Control Centre to modify times"
            >
              <Settings className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="hidden sm:inline">Admin CMS Edit</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-[#141b26] text-stone-300 hover:text-white border border-[#c5a059]/20 transition-colors"
              title="Print Timetable"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141b26] text-stone-400 hover:text-white border border-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode & Month Navigation Bar */}
        <div className="px-4 py-3 border-b border-[#c5a059]/15 bg-[#090d14] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          
          {/* Month Nav Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-[#141b26] text-[#dfb76c] hover:bg-[#1f2a3a] border border-[#c5a059]/25 transition-all"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-1 rounded-xl bg-[#141b26] border border-[#c5a059]/30 text-sm font-serif font-bold text-[#f4f0e6] min-w-[130px] text-center">
              {currentMonthName} {currentYear}
            </div>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-[#141b26] text-[#dfb76c] hover:bg-[#1f2a3a] border border-[#c5a059]/25 transition-all"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedMonthIdx(today.getMonth());
                setCurrentYear(today.getFullYear());
              }}
              className="px-2.5 py-1 text-xs font-serif rounded-lg bg-[#141b26] text-stone-400 hover:text-[#dfb76c] border border-stone-800"
            >
              Today
            </button>
          </div>

          {/* View Mode Toggle: Table View vs Calendar Grid vs Ramadan */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111722] border border-[#c5a059]/25">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-serif font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table (Regent's)</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-serif font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar Grid</span>
            </button>

            <button
              onClick={() => setViewMode('ramadan')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-serif font-bold transition-all ${
                viewMode === 'ramadan'
                  ? 'bg-[#1b4931] text-[#74c69d] border border-[#74c69d]/40 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Ramadan 1447</span>
            </button>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-serif text-stone-300 bg-[#141b26] hover:bg-[#1a2333] border border-stone-800 hover:border-[#c5a059]/40"
              title="Download CSV Spreadsheet"
            >
              <Download className="w-3 h-3 text-[#dfb76c]" />
              <span>CSV</span>
            </button>

            <button
              onClick={handleDownloadICS}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-serif text-[#dfb76c] bg-[#141b26] hover:bg-[#1a2333] border border-[#c5a059]/30"
              title="Add to Google Calendar / Apple iCal"
            >
              <CalendarPlus className="w-3 h-3 text-[#dfb76c]" />
              <span>Sync iCal</span>
            </button>
          </div>

        </div>

        {/* Live Admin CMS Notification Ticker */}
        {cmsConfig.announcement?.enabled && (
          <div className="px-4 py-2 bg-[#1b4931]/30 border-b border-[#74c69d]/20 flex items-center justify-between text-xs text-[#95d5b2] font-sans flex-shrink-0">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#74c69d] flex-shrink-0" />
              <span><strong>Notice:</strong> {cmsConfig.announcement.text}</span>
            </div>
            <span className="text-[10px] font-mono text-[#74c69d]/70 hidden sm:inline">
              LIVE BROADCAST
            </span>
          </div>
        )}

        {/* Jumu'ah Friday Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#121926] border-b border-[#c5a059]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-serif flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
            <strong className="text-[#f4f0e6]">Friday Jumu'ah Assemblies:</strong>
            <span className="text-[#dfb76c]">1st Jama'ah: Khutbah {cmsConfig.jummah?.first?.khutbahTime || '13:00'} • Salah {cmsConfig.jummah?.first?.jamaatTime || '13:15'} ({cmsConfig.jummah?.first?.khateeb || 'Imam'})</span>
            {cmsConfig.jummah?.second?.enabled && (
              <span className="text-stone-400">| 2nd Jama'ah: Khutbah {cmsConfig.jummah?.second?.khutbahTime || '14:00'} • Salah {cmsConfig.jummah?.second?.jamaatTime || '14:15'}</span>
            )}
          </div>
          <span className="text-stone-400 font-sans text-[11px]">
            Wudhu facilities open • Spitfire Close SL3 8GY
          </span>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#080b10]">
          
          {/* 1. TABLE VIEW: Regent's Park Mosque Official 15-Column Layout */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto rounded-2xl border border-[#c5a059]/20 shadow-xl bg-[#090d14]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#121824] text-[#dfb76c] font-serif border-b border-[#c5a059]/25 text-[11px]">
                    <th className="p-2.5 sm:p-3 font-bold border-r border-[#c5a059]/15">Day</th>
                    <th className="p-2.5 sm:p-3 font-bold border-r border-[#c5a059]/15">Date</th>
                    <th className="p-2.5 sm:p-3 font-bold border-r border-[#c5a059]/15">Hijri</th>
                    <th colSpan="2" className="p-2.5 text-center font-bold border-r border-[#c5a059]/15 bg-[#162030]">
                      FAJR (Dawn)
                    </th>
                    <th className="p-2.5 font-bold border-r border-[#c5a059]/15 text-center bg-[#141b26]">
                      SUNRISE
                    </th>
                    <th colSpan="2" className="p-2.5 text-center font-bold border-r border-[#c5a059]/15 bg-[#162030]">
                      ZUHR (Noon)
                    </th>
                    <th colSpan="2" className="p-2.5 text-center font-bold border-r border-[#c5a059]/15 bg-[#162030]">
                      ASR (Afternoon)
                    </th>
                    <th colSpan="2" className="p-2.5 text-center font-bold border-r border-[#c5a059]/15 bg-[#162030]">
                      MAGHRIB (Sunset)
                    </th>
                    <th colSpan="2" className="p-2.5 text-center font-bold bg-[#162030]">
                      ISHA (Night)
                    </th>
                  </tr>
                  <tr className="bg-[#0e131d] text-stone-400 font-mono text-[10px] border-b border-[#c5a059]/20">
                    <th className="p-1.5 border-r border-[#c5a059]/15"></th>
                    <th className="p-1.5 border-r border-[#c5a059]/15"></th>
                    <th className="p-1.5 border-r border-[#c5a059]/15"></th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/10">Adhan</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/15 text-[#dfb76c] font-bold">Jamā'ah</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/15">Shuruq</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/10">Adhan</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/15 text-[#dfb76c] font-bold">Jamā'ah</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/10">Adhan</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/15 text-[#dfb76c] font-bold">Jamā'ah</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/10">Sunset</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/15 text-[#dfb76c] font-bold">Jamā'ah</th>
                    <th className="p-1.5 text-center border-r border-[#c5a059]/10">Adhan</th>
                    <th className="p-1.5 text-center text-[#dfb76c] font-bold">Jamā'ah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5a059]/10 font-mono">
                  {schedule.map((row) => {
                    const isToday = row.isToday;
                    const isFriday = row.isFriday;

                    return (
                      <tr 
                        key={row.day}
                        onClick={() => setSelectedDayDetail(row)}
                        className={`cursor-pointer transition-colors ${
                          isToday 
                            ? 'bg-[#1b4931]/30 text-white font-bold ring-1 ring-inset ring-[#74c69d]' 
                            : isFriday 
                            ? 'bg-[#c5a059]/5 hover:bg-[#c5a059]/15 text-stone-200' 
                            : 'hover:bg-[#121926] text-stone-300'
                        }`}
                      >
                        <td className="p-2 sm:p-2.5 font-bold border-r border-[#c5a059]/15 text-center">
                          {isFriday ? <span className="text-[#dfb76c] font-serif">Fri</span> : row.dayName}
                        </td>
                        <td className="p-2 sm:p-2.5 font-bold border-r border-[#c5a059]/15">
                          {row.day} {currentMonthName.slice(0, 3)}
                        </td>
                        <td className="p-2 sm:p-2.5 text-stone-400 border-r border-[#c5a059]/15 text-[11px]">
                          {row.hijri.day} {row.hijri.month.slice(0, 5)}
                        </td>

                        {/* Fajr */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/10">{row.fajr.start}</td>
                        <td className="p-2 text-center font-bold text-[#dfb76c] border-r border-[#c5a059]/15 bg-[#141b26]/40">{row.fajr.jammaat}</td>

                        {/* Sunrise */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/15">{row.sunrise.start}</td>

                        {/* Zuhr */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/10">{row.dhuhr.start}</td>
                        <td className="p-2 text-center font-bold text-[#dfb76c] border-r border-[#c5a059]/15 bg-[#141b26]/40">{row.dhuhr.jammaat}</td>

                        {/* Asr */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/10">{row.asr.start}</td>
                        <td className="p-2 text-center font-bold text-[#dfb76c] border-r border-[#c5a059]/15 bg-[#141b26]/40">{row.asr.jammaat}</td>

                        {/* Maghrib */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/10">{row.maghrib.start}</td>
                        <td className="p-2 text-center font-bold text-[#dfb76c] border-r border-[#c5a059]/15 bg-[#141b26]/40">{row.maghrib.jammaat}</td>

                        {/* Isha */}
                        <td className="p-2 text-center text-stone-400 border-r border-[#c5a059]/10">{row.isha.start}</td>
                        <td className="p-2 text-center font-bold text-[#dfb76c] bg-[#141b26]/40">{row.isha.jammaat}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. CALENDAR GRID VIEW: Interactive Month Day Matrix */}
          {viewMode === 'calendar' && (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-serif font-bold text-[#dfb76c] pb-2 border-b border-[#c5a059]/20">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span className="text-[#dfb76c]">Fri (Jumu'ah)</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {schedule.map((day) => {
                  return (
                    <div
                      key={day.day}
                      onClick={() => setSelectedDayDetail(day)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                        day.isToday
                          ? 'bg-[#1b4931]/40 border-[#74c69d] shadow-lg ring-1 ring-[#74c69d]'
                          : day.isFriday
                          ? 'bg-[#1a2332]/60 border-[#c5a059]/50 hover:border-[#c5a059]'
                          : 'bg-[#0e131d] border-[#c5a059]/15 hover:border-[#c5a059]/40 hover:bg-[#121926]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-base font-serif font-bold ${day.isToday ? 'text-[#74c69d]' : 'text-[#f4f0e6]'}`}>
                          {day.day}
                        </span>
                        <span className="text-[10px] font-mono text-[#dfb76c]/80">
                          {day.hijri.day} {day.hijri.month.slice(0, 3)}
                        </span>
                      </div>

                      <div className="space-y-1 my-1.5 text-[10px] font-mono">
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Fajr Jam:</span>
                          <span className="font-bold text-[#dfb76c]">{day.fajr.jammaat}</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Zuhr Jam:</span>
                          <span className="font-bold text-white">{day.dhuhr.jammaat}</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Isha Jam:</span>
                          <span className="font-bold text-[#dfb76c]">{day.isha.jammaat}</span>
                        </div>
                      </div>

                      {day.isFriday ? (
                        <div className="mt-1 pt-1 border-t border-[#c5a059]/20 text-[9px] font-serif text-[#dfb76c] font-bold flex items-center justify-between">
                          <span>JUMU'AH</span>
                          <span>13:15</span>
                        </div>
                      ) : (
                        <div className="text-[9px] font-mono text-stone-500">
                          Sunset: {day.maghrib.start}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. RAMADAN 1447 VIEW */}
          {viewMode === 'ramadan' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl sanctuary-plaque border border-[#74c69d]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1b4931]/60 border border-[#74c69d]/50 flex items-center justify-center text-[#74c69d]">
                    <Moon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#74c69d] font-bold">
                      HOLY MONTH OF RAMADAN 1447 AH
                    </span>
                    <h4 className="text-xl font-serif font-bold text-[#f4f0e6]">
                      Spitfire Close Suhoor, Iftaar &amp; Taraweeh Sanctuary
                    </h4>
                    <p className="text-xs text-stone-300 font-sans mt-0.5 max-w-xl leading-relaxed">
                      Complimentary dates, water, and warm community Iftaar provided daily in the main hall. Isha followed immediately by 20 Rak'ah Taraweeh with completed Quran recitation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleDownloadCSV}
                    className="btn-monumental-gold px-4 py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Ramadan PDF</span>
                  </button>
                </div>
              </div>

              {/* Fasting Schedule Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#dfb76c] block mb-1">Suhoor Ends (Imsak)</span>
                  <div className="text-3xl font-mono font-bold text-white">10 Mins</div>
                  <span className="text-xs text-stone-400 mt-1 block">Before Fajr Adhan across Langley &amp; Slough.</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#dfb76c] block mb-1">Community Iftaar</span>
                  <div className="text-3xl font-mono font-bold text-[#74c69d]">At Maghrib</div>
                  <span className="text-xs text-stone-400 mt-1 block">Spitfire Close Hall open for brothers &amp; families.</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#dfb76c] block mb-1">Taraweeh Prayers</span>
                  <div className="text-3xl font-mono font-bold text-[#f4f0e6]">20 Rak'ahs</div>
                  <span className="text-xs text-stone-400 mt-1 block">Led by Huffaz graduates with Khatm al-Quran.</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Selected Day Inspect Modal / Bottom Drawer */}
        {selectedDayDetail && (
          <div className="p-4 sm:p-5 border-t border-[#c5a059]/30 bg-[#0c121d] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 text-[#dfb76c] flex items-center justify-center font-serif font-bold text-sm">
                {selectedDayDetail.day}
              </div>
              <div>
                <strong className="text-sm font-serif text-[#f4f0e6] block">
                  {selectedDayDetail.dayName}, {selectedDayDetail.day} {currentMonthName} {currentYear} • {selectedDayDetail.hijri.formatted}
                </strong>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 mt-0.5">
                  <span>Fajr: <b className="text-[#dfb76c]">{selectedDayDetail.fajr.jammaat}</b></span>
                  <span>Zuhr: <b className="text-white">{selectedDayDetail.dhuhr.jammaat}</b></span>
                  <span>Asr: <b className="text-[#dfb76c]">{selectedDayDetail.asr.jammaat}</b></span>
                  <span>Maghrib: <b className="text-white">{selectedDayDetail.maghrib.jammaat}</b></span>
                  <span>Isha: <b className="text-[#dfb76c]">{selectedDayDetail.isha.jammaat}</b></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDayDetail(null)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-xs font-serif"
              >
                Dismiss Details
              </button>
            </div>
          </div>
        )}

        {/* Footer Notes & Disclaimer */}
        <div className="p-3 sm:p-4 border-t border-[#c5a059]/15 bg-[#070a0f] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 font-sans flex-shrink-0">
          <div>
            * Unified London Prayer Timetable format modeled on London Central Mosque &amp; Islamic Cultural Centre (Regent's Park).
          </div>
          <div className="flex items-center gap-2 text-[#dfb76c] font-mono">
            <span>Admin Control Panel: <strong>Active</strong></span>
            <span>•</span>
            <span>Spitfire Close Sanctuary</span>
          </div>
        </div>

      </div>
    </div>
  );
}
