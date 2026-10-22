import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Clock, 
  Heart, 
  Tv, 
  Megaphone, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Users, 
  Download, 
  Upload, 
  RefreshCw, 
  Save, 
  Check, 
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  Lock,
  Radio,
  ExternalLink,
  Sliders,
  CheckCircle2,
  CalendarCheck,
  Plus
} from 'lucide-react';
import { LIC_DATA } from '../data/content';
import confetti from 'canvas-confetti';
import { 
  getPrayerCMSConfig, 
  savePrayerCMSConfig, 
  resetPrayerCMSConfig, 
  DEFAULT_PRAYER_CMS_CONFIG,
  exportTimetableCSV,
  getPrayerTimesForDate 
} from '../services/prayerCMS';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  onLaunchTVSignage 
}) {
  const [activeTab, setActiveTab] = useState('prayer');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Prayer CMS State
  const [cmsConfig, setCmsConfig] = useState(getPrayerCMSConfig());
  const [prayerSubTab, setPrayerSubTab] = useState('rules'); // 'rules' | 'jummah' | 'overrides' | 'standards' | 'announcements'
  const [selectedOverrideDate, setSelectedOverrideDate] = useState(new Date().toISOString().slice(0, 10));
  const [overrideForm, setOverrideForm] = useState({
    fajrStart: '',
    fajrJam: '',
    sunriseStart: '',
    dhuhrStart: '',
    dhuhrJam: '',
    asrStart: '',
    asrJam: '',
    maghribStart: '',
    maghribJam: '',
    ishaStart: '',
    ishaJam: ''
  });

  // Emergency / Community Announcement State (Global)
  const [announcement, setAnnouncement] = useState({
    active: true,
    type: 'notice',
    title: 'Spitfire Close Parking Advisory',
    message: 'Please park only in marked bays and respect our residential neighbours. Car sharing is encouraged for Jummah.',
    expiryDate: '2026-10-31'
  });

  // Madrasah Students Mock Data
  const [students, setStudents] = useState([
    { id: 1, name: 'Zayan Ahmed', age: 9, option: 'Mon, Tue & Wed', status: 'Active', feeStatus: 'Paid (SO #402)' },
    { id: 2, name: 'Hamza Malik', age: 12, option: 'Thu, Fri & Sat', status: 'Active', feeStatus: 'Paid (SO #403)' },
    { id: 3, name: 'Yusuf Khan', age: 7, option: 'Mon, Tue & Wed', status: 'Active', feeStatus: 'Paid (SO #404)' },
    { id: 4, name: 'Ibrahim Farooq', age: 14, option: 'Thu, Fri & Sat', status: 'Waitlist', feeStatus: 'Pending SO' },
    { id: 5, name: 'Ayaan Ali', age: 10, option: 'Mon, Tue & Wed', status: 'Active', feeStatus: 'Paid (SO #405)' },
  ]);

  // Recent Donations Mock Log
  const [recentDonations, setRecentDonations] = useState([
    { id: 'tx_981', donor: 'S. Hussain', amount: 1000, type: '1 Musalla Waqf', giftAid: true, method: 'Apple Pay' },
    { id: 'tx_982', donor: 'Anonymous', amount: 83.33, type: 'Monthly Musalla', giftAid: true, method: 'Direct Debit' },
    { id: 'tx_983', donor: 'Dr. M. Tariq', amount: 500, type: 'Family Challenge', giftAid: true, method: 'Card' },
    { id: 'tx_984', donor: 'Brother Bilal', amount: 100, type: 'Bricks Share', giftAid: false, method: 'Bank Transfer' },
    { id: 'tx_985', donor: 'Sister Fatima', amount: 40, type: 'Quran Student Sponsor', giftAid: true, method: 'Monthly SO' },
  ]);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      const current = getPrayerCMSConfig();
      setCmsConfig(current);
      loadDateOverride(selectedOverrideDate, current);
    }
  }, [isOpen]);

  const loadDateOverride = (dateStr, config = cmsConfig) => {
    const existing = config.dateOverrides?.[dateStr];
    if (existing) {
      setOverrideForm({
        fajrStart: existing.fajrStart || '',
        fajrJam: existing.fajrJam || '',
        sunriseStart: existing.sunriseStart || '',
        dhuhrStart: existing.dhuhrStart || '',
        dhuhrJam: existing.dhuhrJam || '',
        asrStart: existing.asrStart || '',
        asrJam: existing.asrJam || '',
        maghribStart: existing.maghribStart || '',
        maghribJam: existing.maghribJam || '',
        ishaStart: existing.ishaStart || '',
        ishaJam: existing.ishaJam || ''
      });
    } else {
      // Calculate defaults for reference
      const computed = getPrayerTimesForDate(new Date(dateStr), config);
      setOverrideForm({
        fajrStart: computed.prayers[0].start.time24,
        fajrJam: computed.prayers[0].jammaat.time24,
        sunriseStart: computed.prayers[1].start.time24,
        dhuhrStart: computed.prayers[2].start.time24,
        dhuhrJam: computed.prayers[2].jammaat.time24,
        asrStart: computed.prayers[3].start.time24,
        asrJam: computed.prayers[3].jammaat.time24,
        maghribStart: computed.prayers[4].start.time24,
        maghribJam: computed.prayers[4].jammaat.time24,
        ishaStart: computed.prayers[5].start.time24,
        ishaJam: computed.prayers[5].jammaat.time24
      });
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedOverrideDate(newDate);
    loadDateOverride(newDate, cmsConfig);
  };

  const handleSaveDateOverride = () => {
    const updated = {
      ...cmsConfig,
      dateOverrides: {
        ...(cmsConfig.dateOverrides || {}),
        [selectedOverrideDate]: { ...overrideForm }
      }
    };
    setCmsConfig(updated);
    savePrayerCMSConfig(updated);
    triggerSaveSuccess();
  };

  const handleClearDateOverride = () => {
    const copy = { ...(cmsConfig.dateOverrides || {}) };
    delete copy[selectedOverrideDate];
    const updated = { ...cmsConfig, dateOverrides: copy };
    setCmsConfig(updated);
    savePrayerCMSConfig(updated);
    loadDateOverride(selectedOverrideDate, updated);
    triggerSaveSuccess();
  };

  const handleSaveCMS = () => {
    savePrayerCMSConfig(cmsConfig);
    triggerSaveSuccess();
  };

  const handleResetToRegents = () => {
    resetPrayerCMSConfig();
    const fresh = getPrayerCMSConfig();
    setCmsConfig(fresh);
    loadDateOverride(selectedOverrideDate, fresh);
    triggerSaveSuccess();
  };

  const triggerSaveSuccess = () => {
    setSaveSuccess(true);
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportGiftAidCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Transaction ID,Donor Name,Amount,Gift Aid Eligible,Gift Aid Value (+25%),Date\n" +
      recentDonations.map(d => `${d.id},${d.donor},£${d.amount},${d.giftAid ? 'YES' : 'NO'},£${(d.amount * 0.25).toFixed(2)},2026-10-19`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HMRC_Gift_Aid_Schedule_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const navItems = [
    { id: 'prayer', label: 'Prayer & Calendar CMS', icon: Clock },
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'screen', label: 'Mosque TV Display', icon: Tv },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'donations', label: 'Donations & Gift Aid', icon: Heart },
    { id: 'madrasah', label: 'Madrasah Portal', icon: BookOpen },
    { id: 'system', label: 'Hosting & Security', icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#080b10] border border-[#c5a059]/40 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#c5a059]/20 bg-[#0c1017] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#dfb76c]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#f4f0e6]">
                  Langley Islamic Centre • Control Centre &amp; CMS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#1b4931] text-[#74c69d] border border-[#74c69d]/40">
                  Regent's Mosque Standard
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Full administrative authority over live prayer schedules, Jamā'ah congregation times, TV displays, and donations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-mono font-bold text-[#74c69d] flex items-center gap-1.5 bg-[#1b4931]/60 px-3 py-1.5 rounded-xl border border-[#74c69d]/40 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                <span>Live CMS Published!</span>
              </span>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141b26] text-stone-400 hover:text-white transition-colors border border-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#c5a059]/15 bg-[#0a0e16] p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap text-left ${
                    isActive
                      ? 'bg-[#c5a059] text-[#080b10] shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-[#141b26]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="hidden md:block mt-auto p-3 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 text-[11px] text-stone-400">
              <span className="text-[#dfb76c] font-serif font-bold block mb-1">Non-Hardcoded Engine</span>
              <span>All changes publish immediately to the homepage timetable, calendar modal, and TV screens.</span>
            </div>
          </div>

          {/* Main Workspace Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#080b10]">
            
            {/* 1. DYNAMIC PRAYER & CALENDAR CMS TAB */}
            {activeTab === 'prayer' && (
              <div className="space-y-6">
                
                {/* CMS Header & Top Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c5a059]/15">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#dfb76c] font-bold">
                        Unified London Calendar &amp; Prayer CMS
                      </span>
                      <span className="text-[#c5a059]">•</span>
                      <span className="text-[10px] font-mono text-[#74c69d]">Zero Hardcoded Values</span>
                    </div>
                    <h4 className="text-xl font-serif font-bold text-[#f4f0e6]">
                      Control Centre: Prayer Schedules &amp; Jamā'ah Times
                    </h4>
                    <p className="text-xs text-stone-400 font-sans mt-0.5">
                      Configure congregation timings, Friday assemblies, or set custom day overrides.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={handleResetToRegents}
                      className="px-3 py-2 rounded-xl text-xs font-serif text-stone-300 hover:text-white bg-[#141b26] border border-stone-800 transition-all"
                      title="Reset all settings to Regent's Park Mosque (ICCUK) standard"
                    >
                      Reset Defaults
                    </button>

                    <button
                      onClick={handleSaveCMS}
                      className="btn-monumental-gold px-4 py-2 rounded-xl text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Live Changes</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tab navigation */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0c121d] border border-[#c5a059]/25">
                  {[
                    { id: 'rules', label: 'Jamā\'ah Congregation Rules' },
                    { id: 'jummah', label: 'Friday Jumu\'ah Assemblies' },
                    { id: 'overrides', label: 'Daily Timetable Editor' },
                    { id: 'standards', label: 'Calculation & Moon Sighting' },
                    { id: 'announcements', label: 'Timetable Live Notice' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPrayerSubTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                        prayerSubTab === tab.id
                          ? 'bg-[#c5a059] text-[#080b10] shadow-sm'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* SUBTAB 1: JAMAAT RULES */}
                {prayerSubTab === 'rules' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 text-xs text-stone-300">
                      <strong>How Jamā'ah Times Work:</strong> Each prayer can either be set to a <em>Fixed Time</em> (e.g. Zuhr at 13:00, Isha at 20:00) or an <em>Offset from Adhan</em> (e.g. Maghrib sunset + 5 mins).
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((pId) => {
                        const rule = cmsConfig.jamaatRules?.[pId] || { mode: 'fixed', fixedTime: '13:00', offsetMinutes: 15 };
                        const pName = pId.charAt(0).toUpperCase() + pId.slice(1);

                        return (
                          <div key={pId} className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/25 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold text-base text-[#f4f0e6]">{pName} Jamā'ah</span>
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#162030] text-[#dfb76c] border border-[#c5a059]/20">
                                {rule.mode === 'fixed' ? 'Fixed Time' : `+${rule.offsetMinutes}m Adhan Offset`}
                              </span>
                            </div>

                            {/* Mode Switch */}
                            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#080b10] border border-stone-800 text-[11px] font-serif">
                              <button
                                onClick={() => {
                                  const updated = {
                                    ...cmsConfig,
                                    jamaatRules: {
                                      ...cmsConfig.jamaatRules,
                                      [pId]: { ...rule, mode: 'fixed' }
                                    }
                                  };
                                  setCmsConfig(updated);
                                }}
                                className={`py-1 rounded-lg font-bold transition-all ${
                                  rule.mode === 'fixed'
                                    ? 'bg-[#c5a059] text-[#080b10]'
                                    : 'text-stone-400 hover:text-white'
                                }`}
                              >
                                Fixed Clock
                              </button>
                              <button
                                onClick={() => {
                                  const updated = {
                                    ...cmsConfig,
                                    jamaatRules: {
                                      ...cmsConfig.jamaatRules,
                                      [pId]: { ...rule, mode: 'offset' }
                                    }
                                  };
                                  setCmsConfig(updated);
                                }}
                                className={`py-1 rounded-lg font-bold transition-all ${
                                  rule.mode === 'offset'
                                    ? 'bg-[#c5a059] text-[#080b10]'
                                    : 'text-stone-400 hover:text-white'
                                }`}
                              >
                                Offset Minutes
                              </button>
                            </div>

                            {/* Inputs according to mode */}
                            {rule.mode === 'fixed' ? (
                              <div>
                                <label className="text-[10px] font-serif uppercase tracking-wider text-stone-400 block mb-1">
                                  Fixed Iqamah Time (24h format):
                                </label>
                                <input
                                  type="text"
                                  value={rule.fixedTime || ''}
                                  onChange={(e) => {
                                    const updated = {
                                      ...cmsConfig,
                                      jamaatRules: {
                                        ...cmsConfig.jamaatRules,
                                        [pId]: { ...rule, fixedTime: e.target.value }
                                      }
                                    };
                                    setCmsConfig(updated);
                                  }}
                                  placeholder="e.g. 13:00"
                                  className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-[#c5a059]/30 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#dfb76c]"
                                />
                              </div>
                            ) : (
                              <div>
                                <label className="text-[10px] font-serif uppercase tracking-wider text-stone-400 block mb-1">
                                  Minutes After Adhan:
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={rule.offsetMinutes || 15}
                                    onChange={(e) => {
                                      const updated = {
                                        ...cmsConfig,
                                        jamaatRules: {
                                          ...cmsConfig.jamaatRules,
                                          [pId]: { ...rule, offsetMinutes: parseInt(e.target.value, 10) || 0 }
                                        }
                                      };
                                      setCmsConfig(updated);
                                    }}
                                    className="w-24 px-3 py-2 rounded-xl bg-[#080b10] border border-[#c5a059]/30 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#dfb76c]"
                                  />
                                  <span className="text-xs text-stone-400">minutes</span>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SUBTAB 2: JUMMAH SETUP */}
                {prayerSubTab === 'jummah' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* 1st Congregation */}
                      <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/25 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[#c5a059]/15">
                          <h5 className="font-serif font-bold text-base text-[#dfb76c]">1st Jumu'ah Assembly</h5>
                          <span className="text-[10px] font-mono text-[#74c69d]">PRIMARY</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Khutbah Time</label>
                            <input
                              type="text"
                              value={cmsConfig.jummah?.first?.khutbahTime || '13:00'}
                              onChange={(e) => {
                                const updated = {
                                  ...cmsConfig,
                                  jummah: {
                                    ...cmsConfig.jummah,
                                    first: { ...cmsConfig.jummah.first, khutbahTime: e.target.value }
                                  }
                                };
                                setCmsConfig(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Jamā'ah Time</label>
                            <input
                              type="text"
                              value={cmsConfig.jummah?.first?.jamaatTime || '13:15'}
                              onChange={(e) => {
                                const updated = {
                                  ...cmsConfig,
                                  jummah: {
                                    ...cmsConfig.jummah,
                                    first: { ...cmsConfig.jummah.first, jamaatTime: e.target.value }
                                  }
                                };
                                setCmsConfig(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm font-mono text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Khateeb / Imam</label>
                          <input
                            type="text"
                            value={cmsConfig.jummah?.first?.khateeb || 'Imam Abu Bakr'}
                            onChange={(e) => {
                              const updated = {
                                ...cmsConfig,
                                jummah: {
                                  ...cmsConfig.jummah,
                                  first: { ...cmsConfig.jummah.first, khateeb: e.target.value }
                                }
                              };
                              setCmsConfig(updated);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm text-white"
                          />
                        </div>
                      </div>

                      {/* 2nd Congregation */}
                      <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/25 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[#c5a059]/15">
                          <h5 className="font-serif font-bold text-base text-[#f4f0e6]">2nd Jumu'ah Assembly</h5>
                          <label className="flex items-center gap-1.5 text-xs text-[#dfb76c] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cmsConfig.jummah?.second?.enabled ?? true}
                              onChange={(e) => {
                                const updated = {
                                  ...cmsConfig,
                                  jummah: {
                                    ...cmsConfig.jummah,
                                    second: { ...cmsConfig.jummah.second, enabled: e.target.checked }
                                  }
                                };
                                setCmsConfig(updated);
                              }}
                              className="rounded border-stone-800 text-[#c5a059]"
                            />
                            <span>Active</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Khutbah Time</label>
                            <input
                              type="text"
                              value={cmsConfig.jummah?.second?.khutbahTime || '14:00'}
                              onChange={(e) => {
                                const updated = {
                                  ...cmsConfig,
                                  jummah: {
                                    ...cmsConfig.jummah,
                                    second: { ...cmsConfig.jummah.second, khutbahTime: e.target.value }
                                  }
                                };
                                setCmsConfig(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Jamā'ah Time</label>
                            <input
                              type="text"
                              value={cmsConfig.jummah?.second?.jamaatTime || '14:15'}
                              onChange={(e) => {
                                const updated = {
                                  ...cmsConfig,
                                  jummah: {
                                    ...cmsConfig.jummah,
                                    second: { ...cmsConfig.jummah.second, jamaatTime: e.target.value }
                                  }
                                };
                                setCmsConfig(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm font-mono text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-stone-400 block mb-1">Khateeb / Speaker</label>
                          <input
                            type="text"
                            value={cmsConfig.jummah?.second?.khateeb || 'Resident Scholar'}
                            onChange={(e) => {
                              const updated = {
                                ...cmsConfig,
                                jummah: {
                                  ...cmsConfig.jummah,
                                  second: { ...cmsConfig.jummah.second, khateeb: e.target.value }
                                }
                              };
                              setCmsConfig(updated);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm text-white"
                          />
                        </div>
                      </div>

                    </div>

                    <div>
                      <label className="text-xs font-serif uppercase text-stone-400 block mb-1">
                        Spitfire Close Parking &amp; Neighbour Guidelines Note
                      </label>
                      <textarea
                        rows={2}
                        value={cmsConfig.jummah?.instructions || ''}
                        onChange={(e) => {
                          const updated = {
                            ...cmsConfig,
                            jummah: { ...cmsConfig.jummah, instructions: e.target.value }
                          };
                          setCmsConfig(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#0e131d] border border-stone-800 text-xs text-white"
                      />
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: DAILY OVERRIDES */}
                {prayerSubTab === 'overrides' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20">
                      <div>
                        <strong className="text-sm font-serif text-[#f4f0e6] block">Direct Date Override</strong>
                        <p className="text-xs text-stone-400">Select any day to apply manual Adhan or Jamā'ah times (e.g. for special programmes or Ramadan changes).</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={selectedOverrideDate}
                          onChange={handleDateChange}
                          className="px-3 py-1.5 rounded-xl bg-[#080b10] border border-[#c5a059]/40 text-xs font-mono text-[#dfb76c]"
                        />
                      </div>
                    </div>

                    {/* Override Form Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        { key: 'fajr', label: 'Fajr', hasJam: true },
                        { key: 'sunrise', label: 'Sunrise', hasJam: false },
                        { key: 'dhuhr', label: 'Dhuhr', hasJam: true },
                        { key: 'asr', label: 'Asr', hasJam: true },
                        { key: 'maghrib', label: 'Maghrib', hasJam: true },
                        { key: 'isha', label: 'Isha', hasJam: true }
                      ].map(item => (
                        <div key={item.key} className="p-3 rounded-2xl bg-[#0e131d] border border-stone-800 space-y-2">
                          <span className="font-serif font-bold text-xs text-[#dfb76c] block">{item.label}</span>
                          <div>
                            <label className="text-[9px] uppercase text-stone-400 block">Adhan Start</label>
                            <input
                              type="text"
                              value={overrideForm[`${item.key}Start`] || ''}
                              onChange={(e) => setOverrideForm({ ...overrideForm, [`${item.key}Start`]: e.target.value })}
                              className="w-full px-2 py-1.5 rounded-lg bg-[#080b10] border border-stone-800 text-xs font-mono text-white"
                            />
                          </div>

                          {item.hasJam && (
                            <div>
                              <label className="text-[9px] uppercase text-[#dfb76c] block">Jamā'ah</label>
                              <input
                                type="text"
                                value={overrideForm[`${item.key}Jam`] || ''}
                                onChange={(e) => setOverrideForm({ ...overrideForm, [`${item.key}Jam`]: e.target.value })}
                                className="w-full px-2 py-1.5 rounded-lg bg-[#080b10] border border-[#c5a059]/30 text-xs font-mono font-bold text-[#dfb76c]"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={handleClearDateOverride}
                        className="px-4 py-2 rounded-xl text-xs font-serif text-rose-400 hover:text-rose-300 bg-rose-950/20 border border-rose-900/40"
                      >
                        Clear Override for {selectedOverrideDate}
                      </button>

                      <button
                        onClick={handleSaveDateOverride}
                        className="btn-monumental-gold px-5 py-2 rounded-xl text-xs font-serif font-bold uppercase tracking-wider"
                      >
                        Save This Day's Override
                      </button>
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: CALCULATION & STANDARDS */}
                {prayerSubTab === 'standards' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Authority Profile */}
                      <div className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 space-y-2">
                        <label className="text-xs font-serif uppercase text-[#dfb76c] block font-bold">Calculation Standard Preset</label>
                        <select
                          value={cmsConfig.authorityProfile}
                          onChange={(e) => setCmsConfig({ ...cmsConfig, authorityProfile: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-xs text-white"
                        >
                          <option value="regents_london_unified">Regent's Park Mosque (ICCUK) / Unified London Standard</option>
                          <option value="astronomical">Karachi Astronomical Twilight (18°)</option>
                          <option value="custom_manual">Custom Ephemeris &amp; Offsets</option>
                        </select>
                        <span className="text-[11px] text-stone-400 block">
                          Calibrated for Spitfire Close coordinates (51.5074° N, 0.5422° W).
                        </span>
                      </div>

                      {/* Asr Juristic Method */}
                      <div className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 space-y-2">
                        <label className="text-xs font-serif uppercase text-[#dfb76c] block font-bold">Asr Juristic Method</label>
                        <div className="grid grid-cols-2 gap-2 text-xs font-serif">
                          <button
                            onClick={() => setCmsConfig({ ...cmsConfig, asrHanafi: false })}
                            className={`py-2 rounded-xl border ${
                              !cmsConfig.asrHanafi
                                ? 'bg-[#c5a059] text-[#080b10] font-bold border-[#c5a059]'
                                : 'bg-[#080b10] text-stone-400 border-stone-800 hover:text-white'
                            }`}
                          >
                            Standard (Shafi'i/Hanbali/Maliki)
                          </button>
                          <button
                            onClick={() => setCmsConfig({ ...cmsConfig, asrHanafi: true })}
                            className={`py-2 rounded-xl border ${
                              cmsConfig.asrHanafi
                                ? 'bg-[#c5a059] text-[#080b10] font-bold border-[#c5a059]'
                                : 'bg-[#080b10] text-stone-400 border-stone-800 hover:text-white'
                            }`}
                          >
                            Hanafi (2x Shadow)
                          </button>
                        </div>
                      </div>

                      {/* Hijri Adjustment */}
                      <div className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 space-y-2">
                        <label className="text-xs font-serif uppercase text-[#dfb76c] block font-bold">
                          Islamic Hijri Moon-Sighting Offset
                        </label>
                        <div className="flex items-center gap-2">
                          {[-2, -1, 0, 1, 2].map((adj) => (
                            <button
                              key={adj}
                              onClick={() => setCmsConfig({ ...cmsConfig, hijriAdjustment: adj })}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                                cmsConfig.hijriAdjustment === adj
                                  ? 'bg-[#1b4931] text-[#74c69d] border border-[#74c69d]'
                                  : 'bg-[#080b10] text-stone-400 border border-stone-800 hover:text-white'
                              }`}
                            >
                              {adj > 0 ? `+${adj}` : adj}d
                            </button>
                          ))}
                        </div>
                        <span className="text-[11px] text-stone-400 block">
                          Adjusts the displayed Islamic date based on official UK Moon Sighting Board announcements.
                        </span>
                      </div>

                      {/* Daylight Saving Time */}
                      <div className="p-4 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 space-y-2">
                        <label className="text-xs font-serif uppercase text-[#dfb76c] block font-bold">Daylight Saving Time (BST)</label>
                        <div className="p-2.5 rounded-xl bg-[#080b10] border border-stone-800 text-xs text-stone-300">
                          Automatic UK Daylight Saving Time detection enabled. Solar ephemeris automatically shifts between GMT and BST.
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* SUBTAB 5: TIMETABLE LIVE NOTICE */}
                {prayerSubTab === 'announcements' && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#c5a059]/20 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#c5a059]/15">
                        <h5 className="font-serif font-bold text-base text-[#f4f0e6]">
                          Prayer Timetable Ticker &amp; Header Announcement
                        </h5>
                        <label className="flex items-center gap-2 text-xs text-[#dfb76c] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cmsConfig.announcement?.enabled ?? true}
                            onChange={(e) => {
                              const updated = {
                                ...cmsConfig,
                                announcement: { ...cmsConfig.announcement, enabled: e.target.checked }
                              };
                              setCmsConfig(updated);
                            }}
                            className="rounded border-stone-800 text-[#c5a059]"
                          />
                          <span>Show on Website &amp; Timetable</span>
                        </label>
                      </div>

                      <div>
                        <label className="text-xs font-serif uppercase text-stone-400 block mb-1">
                          Notice Banner Text
                        </label>
                        <textarea
                          rows={2}
                          value={cmsConfig.announcement?.text || ''}
                          onChange={(e) => {
                            const updated = {
                              ...cmsConfig,
                              announcement: { ...cmsConfig.announcement, text: e.target.value }
                            };
                            setCmsConfig(updated);
                          }}
                          placeholder="e.g. Note: From Sunday, Isha Jamaat moves to 7:45 PM."
                          className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-[#c5a059]/30 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 2. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Digital Operations Dashboard</h4>
                  <p className="text-xs text-slate-400">Real-time status of all active digital systems, giving campaigns, and prayer schedules.</p>
                </div>

                {/* Key Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Capital Appeal</span>
                    <strong className="text-2xl font-serif font-bold text-white">£250,000</strong>
                    <div className="text-[11px] text-emerald-400 font-medium mt-1">31.25% of £800k target</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Auto Monthly Donors</span>
                    <strong className="text-2xl font-serif font-bold text-white">42 Active</strong>
                    <div className="text-[11px] text-sky-400 font-medium mt-1">£2,150 / mo recurring</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Madrasah Students</span>
                    <strong className="text-2xl font-serif font-bold text-white">38 Enrolled</strong>
                    <div className="text-[11px] text-amber-400 font-medium mt-1">4 on waitlist</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Mosque TV Screen</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <strong className="text-base font-bold text-white">Online</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Main Prayer Hall TV</div>
                  </div>
                </div>

                {/* TV Signage Trigger */}
                <div className="p-5 rounded-2xl bg-[#0c121d] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#c5a059]/15 text-[#dfb76c]">
                      <Tv className="w-6 h-6" />
                    </div>
                    <div>
                      <strong className="text-white text-sm block">Launch Fullscreen Digital Mosque TV Mode</strong>
                      <p className="text-xs text-slate-300">Display live prayer countdown, Adhan clocks, Hadith of the day, and urgent appeal QR code on prayer hall screens.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { onClose(); if (onLaunchTVSignage) onLaunchTVSignage(); }}
                    className="btn-monumental-gold px-4 py-2.5 rounded-xl text-xs font-serif font-bold uppercase flex items-center gap-2 flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch TV Display</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. MOSQUE TV DISPLAY TAB */}
            {activeTab === 'screen' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Digital Signage &amp; Prayer Hall Screen Controller</h4>
                  <p className="text-xs text-slate-400">Stream high-resolution digital clocks, Jummah reminders, and mobile donation QR codes onto smart TVs.</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#0e131d] border border-[#c5a059]/25 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#dfb76c] flex items-center justify-center">
                    <Tv className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="text-base font-serif font-bold text-white">Spitfire Close Main Prayer Hall TV</h5>
                    <p className="text-xs text-slate-400 max-w-md mt-1">
                      Plug an Amazon FireStick, Chromecast, or Raspberry Pi into any HDMI TV and open this URL to display an instant, auto-refreshing mosque digital signage clock.
                    </p>
                  </div>
                  <div className="p-2.5 px-4 rounded-xl bg-[#080b10] border border-stone-800 text-xs font-mono text-[#dfb76c]">
                    https://langleyislamiccentre.co.uk/tv
                  </div>
                  <button
                    onClick={() => { onClose(); if (onLaunchTVSignage) onLaunchTVSignage(); }}
                    className="btn-monumental-gold px-5 py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open TV Fullscreen Display Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* 4. ANNOUNCEMENTS TAB */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Emergency &amp; Community Announcement Bar</h4>
                  <p className="text-xs text-slate-400">Publish urgent notices, Eid announcements, or Janaazah notices across the website banner instantly.</p>
                </div>

                <div className="p-5 rounded-3xl bg-[#0e131d] border border-stone-800 space-y-4">
                  <div>
                    <label className="text-xs font-serif uppercase text-stone-400 block mb-1">Notice Headline</label>
                    <input
                      type="text"
                      value={announcement.title}
                      onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-serif uppercase text-stone-400 block mb-1">Notice Content</label>
                    <textarea
                      rows={3}
                      value={announcement.message}
                      onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#080b10] border border-stone-800 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. DONATIONS & GIFT AID TAB */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-white">HMRC Gift Aid &amp; Donation Ledgers</h4>
                    <p className="text-xs text-slate-400">Download HMRC Gift Aid declaration schedules and review automated standing orders.</p>
                  </div>

                  <button
                    onClick={handleExportGiftAidCSV}
                    className="btn-monumental-gold px-4 py-2 rounded-xl text-xs font-serif font-bold uppercase flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export Gift Aid CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-[#0e131d]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 font-serif">
                        <th className="p-3">Donor</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Waqf Type</th>
                        <th className="p-3">Gift Aid</th>
                        <th className="p-3">Payment Rail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-stone-300">
                      {recentDonations.map((d) => (
                        <tr key={d.id} className="hover:bg-[#121926]">
                          <td className="p-3 font-medium text-white">{d.donor}</td>
                          <td className="p-3 font-mono font-bold text-[#dfb76c]">£{d.amount}</td>
                          <td className="p-3">{d.type}</td>
                          <td className="p-3">
                            {d.giftAid ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1b4931] text-[#74c69d]">
                                +25% Claimable
                              </span>
                            ) : (
                              <span className="text-stone-500">None</span>
                            )}
                          </td>
                          <td className="p-3 text-stone-400">{d.method}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. MADRASAH PORTAL TAB */}
            {activeTab === 'madrasah' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Madrasah &amp; Maktab Student Registrar</h4>
                  <p className="text-xs text-slate-400">Class rosters, attendance tracks, and standing order fee verification.</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-[#0e131d]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 font-serif">
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Age</th>
                        <th className="p-3">Cohort Option</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Fee Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-stone-300">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-[#121926]">
                          <td className="p-3 font-medium text-white">{s.name}</td>
                          <td className="p-3">{s.age} yrs</td>
                          <td className="p-3">{s.option}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1b4931] text-[#74c69d]">
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-stone-400">{s.feeStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. SYSTEM STATUS */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Hosting, Backups &amp; Security Status</h4>
                  <p className="text-xs text-slate-400">Enterprise infrastructure metrics matching Mosques Go Digital maintenance standards.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800 space-y-2">
                    <span className="text-[10px] font-serif font-bold uppercase text-stone-400">SSL &amp; Security</span>
                    <strong className="text-sm text-white block">TLS 1.3 Active</strong>
                    <p className="text-slate-400 text-[11px]">Strict HTTPS encryption with automated DDoS mitigation and firewall rules.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0e131d] border border-stone-800 space-y-2">
                    <span className="text-[10px] font-serif font-bold uppercase text-stone-400">Uptime &amp; Health Monitoring</span>
                    <strong className="text-sm text-emerald-400 block">99.98% Past 30 Days</strong>
                    <p className="text-slate-400 text-[11px]">Automated 1-minute health checks with instant committee alert triggers.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
