import React, { useState, useEffect, useRef } from 'react';
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
  TrendingUp, 
  FileSpreadsheet, 
  AlertCircle, 
  Lock, 
  KeyRound, 
  LogOut, 
  ShieldAlert, 
  Terminal, 
  FileText,
  UtensilsCrossed,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Filter,
  Eye,
  EyeOff,
  UploadCloud,
  RotateCcw,
  FileJson,
  Search,
  Plus,
  Trash2,
  Copy
} from 'lucide-react';
import { 
  getPrayerCMSConfig, 
  savePrayerCMSConfig, 
  resetPrayerCMSConfig,
  exportTimetableCSV 
} from '../services/prayerCMS';
import { 
  getContentCMS, 
  saveContentCMS, 
  resetContentCMS, 
  generateAdminJWT, 
  validateAdminJWT, 
  revokeAdminJWT, 
  getAuditLogs, 
  logAudit,
  verifyAdminPassword,
  setAdminPassword,
  exportCMSBackup,
  importCMSBackup
} from '../services/contentCMS';
import { 
  tournamentPhotos, 
  tournamentPitchPhotos, 
  managementTourPhotos 
} from '../data/tournamentPhotos';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  onLaunchTVSignage 
}) {
  const [activeTab, setActiveTab] = useState('prayer'); // 'prayer' | 'jummah' | 'waqf' | 'media' | 'announcements' | 'tournament' | 'madrasah' | 'security'
  const [authSession, setAuthSession] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState('');

  // Media Library State
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all' | 'pitch' | 'tour' | 'custom'
  const [mediaSearch, setMediaSearch] = useState('');
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCaption, setNewMediaCaption] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState('pitch');
  const [newMediaTag, setNewMediaTag] = useState('');
  const [copiedUrlId, setCopiedUrlId] = useState(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoEditTitle, setPhotoEditTitle] = useState('');
  const [photoEditCaption, setPhotoEditCaption] = useState('');
  const [photoEditTag, setPhotoEditTag] = useState('');
  const [photoEditFeatured, setPhotoEditFeatured] = useState(false);
  const [photoEditHidden, setPhotoEditHidden] = useState(false);

  // Backup & Import State
  const [importStatus, setImportStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Prayer CMS Config State
  const [prayerConfig, setPrayerConfig] = useState(getPrayerCMSConfig());
  // Enterprise Content CMS State
  const [contentConfig, setContentConfig] = useState(getContentCMS());
  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([]);

  // Check JWT session validity on open
  useEffect(() => {
    if (isOpen) {
      const auth = validateAdminJWT();
      if (auth.valid) {
        setAuthSession(auth);
        setPrayerConfig(getPrayerCMSConfig());
        setContentConfig(getContentCMS());
        setAuditLogs(getAuditLogs());
      } else {
        setAuthSession(null);
      }
    }
  }, [isOpen]);

  // Periodic JWT expiration checker
  useEffect(() => {
    if (!isOpen || !authSession) return;
    const interval = setInterval(() => {
      const auth = validateAdminJWT();
      if (!auth.valid) {
        setAuthSession(null);
        setAuthError('Session expired. Please log in again.');
      } else {
        setAuthSession(auth);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isOpen, authSession]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    if (verifyAdminPassword(passwordInput)) {
      const token = generateAdminJWT('superadmin', 'lic-trustee-admin');
      const auth = validateAdminJWT();
      setAuthSession(auth);
      setPasswordInput('');
      setPrayerConfig(getPrayerCMSConfig());
      setContentConfig(getContentCMS());
      setAuditLogs(getAuditLogs());
    } else {
      setAuthError('Invalid administrator credentials. Access denied by Zero-Trust policy.');
      logAudit('SECURITY_ALERT', 'Failed login attempt with incorrect password', 'unknown-client');
    }
  };

  // Change Admin Master Password
  const handleChangePassword = () => {
    setPasswordChangeMsg('');
    const res = setAdminPassword(newPasswordInput);
    if (res.success) {
      setPasswordChangeMsg('Master password updated successfully! Keep your new password secure.');
      setNewPasswordInput('');
      setAuditLogs(getAuditLogs());
      setTimeout(() => setPasswordChangeMsg(''), 4000);
    } else {
      setPasswordChangeMsg(res.error || 'Failed to update password');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    revokeAdminJWT();
    setAuthSession(null);
    setPasswordInput('');
    setAuthError('');
  };

  // Renew Zero-Trust Session
  const handleRenewSession = () => {
    generateAdminJWT('superadmin', authSession?.payload?.sub || 'lic-trustee-admin');
    const freshAuth = validateAdminJWT();
    setAuthSession(freshAuth);
    logAudit('AUTHENTICATION', 'Admin JWT session renewed for 60 minutes', authSession?.payload?.sub || 'admin');
    setAuditLogs(getAuditLogs());
    triggerSaveAlert();
  };

  // Save changes to Prayer CMS
  const handleSavePrayer = () => {
    savePrayerCMSConfig(prayerConfig);
    logAudit('PRAYER_CMS', 'Updated prayer Jamaah times and rules', authSession?.payload?.sub || 'admin');
    triggerSaveAlert();
  };

  // Save changes to Jumu'ah Timetable
  const handleSaveJummah = () => {
    savePrayerCMSConfig(prayerConfig);
    logAudit('JUMMAH_CMS', 'Updated Friday Jumu\'ah khutbah & jamaat timings', authSession?.payload?.sub || 'admin');
    triggerSaveAlert();
  };

  // Save changes to Content CMS
  const handleSaveContent = (sectionName) => {
    saveContentCMS(contentConfig, `Updated ${sectionName} via CMS`);
    setAuditLogs(getAuditLogs());
    triggerSaveAlert();
  };

  // Media Library photo select & edit
  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
    const override = contentConfig.mediaOverrides?.[photo.id] || {};
    setPhotoEditTitle(override.title || photo.alt || '');
    setPhotoEditCaption(override.caption || '');
    setPhotoEditTag(override.tag || photo.tag || '');
    setPhotoEditFeatured(override.isFeatured || false);
    setPhotoEditHidden(override.hidden || false);
  };

  const handleSavePhotoOverride = () => {
    if (!selectedPhoto) return;
    const currentOverrides = contentConfig.mediaOverrides || {};
    const updated = {
      ...contentConfig,
      mediaOverrides: {
        ...currentOverrides,
        [selectedPhoto.id]: {
          title: photoEditTitle,
          caption: photoEditCaption,
          tag: photoEditTag,
          isFeatured: photoEditFeatured,
          hidden: photoEditHidden,
          updatedAt: new Date().toISOString()
        }
      }
    };
    setContentConfig(updated);
    saveContentCMS(updated, `Updated media asset [${selectedPhoto.id}]`);
    setAuditLogs(getAuditLogs());
    triggerSaveAlert();
    setSelectedPhoto(null);
  };

  const handleAddCustomPhoto = (e) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;
    const newId = 'custom-' + Date.now();
    const newAsset = {
      id: newId,
      src: newMediaUrl.trim(),
      alt: newMediaTitle.trim() || 'Langley Islamic Centre Community Event',
      caption: newMediaCaption.trim() || '',
      category: newMediaCategory,
      tag: newMediaTag.trim() || (newMediaCategory === 'pitch' ? 'Tournament Match' : '£550k Appeal')
    };
    const updatedPhotos = [...(contentConfig.customPhotos || []), newAsset];
    const updatedConfig = {
      ...contentConfig,
      customPhotos: updatedPhotos
    };
    setContentConfig(updatedConfig);
    saveContentCMS(updatedConfig, `Added new media asset [${newId}]`);
    setAuditLogs(getAuditLogs());
    setShowAddMediaModal(false);
    setNewMediaUrl('');
    setNewMediaTitle('');
    setNewMediaCaption('');
    setNewMediaTag('');
    triggerSaveAlert();
  };

  const handleDeleteCustomPhoto = (photoId) => {
    if (!window.confirm("Are you sure you want to delete this custom media asset?")) return;
    const updatedPhotos = (contentConfig.customPhotos || []).filter(p => p.id !== photoId);
    const updatedOverrides = { ...(contentConfig.mediaOverrides || {}) };
    delete updatedOverrides[photoId];
    const updatedConfig = {
      ...contentConfig,
      customPhotos: updatedPhotos,
      mediaOverrides: updatedOverrides
    };
    setContentConfig(updatedConfig);
    saveContentCMS(updatedConfig, `Deleted media asset [${photoId}]`);
    setAuditLogs(getAuditLogs());
    setSelectedPhoto(null);
    triggerSaveAlert();
  };

  const handleCopyPhotoUrl = (photo) => {
    navigator.clipboard.writeText(photo.src);
    setCopiedUrlId(photo.id);
    setTimeout(() => setCopiedUrlId(null), 2500);
  };

  // 1-Click JSON Backup & Restore
  const handleExportJSON = () => {
    const jsonStr = exportCMSBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lic_enterprise_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logAudit('EXPORT', 'Downloaded full site JSON backup', authSession?.payload?.sub || 'admin');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importCMSBackup(event.target.result);
      if (res.success) {
        setImportStatus({ success: true, message: 'All website content & prayer times restored live from backup!' });
        setPrayerConfig(getPrayerCMSConfig());
        setContentConfig(getContentCMS());
        setAuditLogs(getAuditLogs());
        triggerSaveAlert();
      } else {
        setImportStatus({ success: false, message: res.error || 'Failed to import backup file.' });
      }
      setTimeout(() => setImportStatus(null), 6000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all site content and prayer calculations back to official Charity Commission #1180443 defaults?")) {
      resetPrayerCMSConfig();
      resetContentCMS();
      setPrayerConfig(getPrayerCMSConfig());
      setContentConfig(getContentCMS());
      setAuditLogs(getAuditLogs());
      triggerSaveAlert();
    }
  };

  const triggerSaveAlert = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Content Management System"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#080d19] border border-amber-500/30 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Langley Islamic Centre CMS Control Panel
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zero-Trust Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Enterprise Content Management • Charity Commission CIO #1180443
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authSession && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
                title="Terminate Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save success toast */}
        {saveSuccess && (
          <div className="bg-emerald-500 text-black px-4 py-2 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Changes verified and published to live website and Mosque TV!
            </span>
            <span className="text-[10px] uppercase font-mono">Synced</span>
          </div>
        )}

        {/* Body Content */}
        {!authSession ? (
          /* ZERO-TRUST JWT LOGIN GATE */
          <div className="p-8 sm:p-12 flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold text-white mb-2">
              Protected Admin CMS Access
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              This system is governed under a Zero-Trust policy with signed cryptographic JWT authentication. Please enter your administrator master password.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 text-left">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-emerald-400 text-neutral-950 hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                Authenticate & Issue JWT
              </button>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authorized Personnel Only</span>
                </div>
                <p className="text-slate-500 leading-normal">
                  Access is restricted to authorized Langley Islamic Centre trustees (CIO #1180443). Session tokens automatically expire after 60 minutes of inactivity. All actions are cryptographically logged.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED CMS WORKSPACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/70 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              {[
                { id: 'prayer', label: 'Daily Prayer & Iqamah', icon: Clock },
                { id: 'jummah', label: 'Friday Jumu\'ah & Khateebs', icon: Calendar },
                { id: 'waqf', label: 'Waqf £550k Campaign', icon: Heart },
                { id: 'media', label: 'Media Library & Stories', icon: ImageIcon },
                { id: 'announcements', label: 'Notices & Marquee', icon: Megaphone },
                { id: 'tournament', label: 'Tournament & Sponsor', icon: Trophy },
                { id: 'madrasah', label: 'Madrasah Admissions', icon: BookOpen },
                { id: 'security', label: 'Backup, Import & Security', icon: ShieldCheck }
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      active 
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="hidden md:block mt-auto pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
                <div>Active: <strong className="text-slate-300">{authSession.payload.sub}</strong></div>
                <div>Expires in: <strong className="text-amber-400">{authSession.expiresInMinutes}m</strong></div>
                <button
                  onClick={onLaunchTVSignage}
                  className="w-full mt-2 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Tv className="w-3.5 h-3.5 text-amber-400" />
                  Launch TV Signage
                </button>
              </div>
            </div>

            {/* Main Editor Pane */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 bg-slate-900/40">
              
              {/* TAB 1: PRAYER & IQAMAH TIMES CMS */}
              {activeTab === 'prayer' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Prayer & Congregation (Jamā'ah) Rules</h4>
                      <p className="text-xs text-slate-400">Configures live timetable, website clocks, and Mosque TV display</p>
                    </div>
                    <button
                      onClick={handleSavePrayer}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Prayer Times
                    </button>
                  </div>

                  {/* Prayer times grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map(pKey => {
                      const rule = prayerConfig.jamaatRules[pKey];
                      return (
                        <div key={pKey} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-amber-400">{rule.label}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{rule.mode}</span>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Fixed Jamā'ah Time (24h HH:MM):</label>
                            <input
                              type="text"
                              value={rule.fixedTime}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPrayerConfig(prev => ({
                                  ...prev,
                                  jamaatRules: {
                                    ...prev.jamaatRules,
                                    [pKey]: { ...prev.jamaatRules[pKey], fixedTime: val }
                                  }
                                }));
                              }}
                              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-amber-400"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: FRIDAY JUMU'AH & KHATEEBS */}
              {activeTab === 'jummah' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Friday Jumu'ah Assemblies & Khateeb Schedule</h4>
                      <p className="text-xs text-slate-400">Controls 1st & 2nd Jumu'ah times, guest speakers, topics, and sanctuary notices</p>
                    </div>
                    <button
                      onClick={handleSaveJummah}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Jumu'ah Schedule
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1st Assembly */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-amber-400 text-sm">1st Congregation Assembly</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Slot 1</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Bayan (Speech):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.first?.bayanTime || '12:45'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, bayanTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Khutbah (Arabic):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.first?.khutbahTime || '13:00'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, khutbahTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-amber-300 font-bold block mb-1">Jamā'ah Prayer:</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.first?.jamaatTime || '13:15'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, jamaatTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold text-center"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Khateeb / Speaker:</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.first?.khateeb || 'Imam Abu Bakr'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, khateeb: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Language(s):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.first?.language || 'English & Arabic'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, language: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2nd Assembly */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-emerald-400 text-sm">2nd Congregation Assembly</span>
                        <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={prayerConfig.jummah?.second?.enabled ?? true}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, enabled: e.target.checked } }
                            }))}
                            className="rounded text-emerald-500 focus:ring-0"
                          />
                          <span>Enabled</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Bayan (Speech):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.second?.bayanTime || '13:45'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, bayanTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Khutbah (Arabic):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.second?.khutbahTime || '14:00'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, khutbahTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-emerald-300 font-bold block mb-1">Jamā'ah Prayer:</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.second?.jamaatTime || '14:15'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, jamaatTime: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold text-center"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Khateeb / Speaker:</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.second?.khateeb || 'Resident Scholar'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, khateeb: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Language(s):</label>
                          <input
                            type="text"
                            value={prayerConfig.jummah?.second?.language || 'English'}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, language: e.target.value } }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrival & Parking Guidelines */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Jumu'ah Arrival & Parking Sanctuary Instructions:</label>
                    <textarea
                      rows={2}
                      value={prayerConfig.jummah?.instructions || ''}
                      onChange={(e) => setPrayerConfig(prev => ({
                        ...prev,
                        jummah: { ...prev.jummah, instructions: e.target.value }
                      }))}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: WAQF CAMPAIGN MANAGER */}
              {activeTab === 'waqf' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Waqf Building Appeal Manager</h4>
                      <p className="text-xs text-slate-400">Controls the £550,000 acquisition campaign data across the website</p>
                    </div>
                    <button
                      onClick={() => handleSaveContent('Waqf Campaign')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Waqf Data
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Target Amount (£):</label>
                      <input
                        type="number"
                        value={contentConfig.waqfCampaign.targetAmount}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          waqfCampaign: { ...prev.waqfCampaign, targetAmount: Number(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Current Funds Raised (£):</label>
                      <input
                        type="number"
                        value={contentConfig.waqfCampaign.currentRaised}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          waqfCampaign: { ...prev.waqfCampaign, currentRaised: Number(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-mono text-base font-bold"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Number of Donors:</label>
                      <input
                        type="number"
                        value={contentConfig.waqfCampaign.donorsCount}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          waqfCampaign: { ...prev.waqfCampaign, donorsCount: Number(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Campaign Status Badge:</label>
                      <input
                        type="text"
                        value={contentConfig.waqfCampaign.statusBadge}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          waqfCampaign: { ...prev.waqfCampaign, statusBadge: e.target.value }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Official Charity Bank Details</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Bank Name:</span>
                        <input
                          type="text"
                          value={contentConfig.waqfCampaign.bankDetails.bank}
                          onChange={(e) => setContentConfig(prev => ({
                            ...prev,
                            waqfCampaign: { ...prev.waqfCampaign, bankDetails: { ...prev.waqfCampaign.bankDetails, bank: e.target.value } }
                          }))}
                          className="w-full mt-1 p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 block">Sort Code:</span>
                        <input
                          type="text"
                          value={contentConfig.waqfCampaign.bankDetails.sortCode}
                          onChange={(e) => setContentConfig(prev => ({
                            ...prev,
                            waqfCampaign: { ...prev.waqfCampaign, bankDetails: { ...prev.waqfCampaign.bankDetails, sortCode: e.target.value } }
                          }))}
                          className="w-full mt-1 p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 block">Account Number:</span>
                        <input
                          type="text"
                          value={contentConfig.waqfCampaign.bankDetails.accountNumber}
                          onChange={(e) => setContentConfig(prev => ({
                            ...prev,
                            waqfCampaign: { ...prev.waqfCampaign, bankDetails: { ...prev.waqfCampaign.bankDetails, accountNumber: e.target.value } }
                          }))}
                          className="w-full mt-1 p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MEDIA LIBRARY & PHOTOS (WORDPRESS LEVEL) */}
              {activeTab === 'media' && (() => {
                const allMediaAssets = [
                  ...tournamentPhotos,
                  ...(contentConfig.customPhotos || [])
                ];

                const filteredMediaAssets = allMediaAssets.filter((photo) => {
                  const override = contentConfig.mediaOverrides?.[photo.id] || {};
                  const effectiveCategory = photo.category;

                  if (mediaFilter === 'pitch' && effectiveCategory !== 'pitch') return false;
                  if (mediaFilter === 'tour' && effectiveCategory !== 'tour') return false;
                  if (mediaFilter === 'custom' && !photo.id.startsWith('custom-')) return false;

                  if (!mediaSearch.trim()) return true;
                  const q = mediaSearch.toLowerCase();
                  const title = (override.title || photo.alt || '').toLowerCase();
                  const caption = (override.caption || photo.caption || '').toLowerCase();
                  const tag = (override.tag || photo.tag || '').toLowerCase();
                  return title.includes(q) || caption.includes(q) || tag.includes(q) || photo.id.toLowerCase().includes(q);
                });

                return (
                  <div className="space-y-5">
                    {/* Header & Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-amber-400" />
                          <span>Enterprise Media Library &amp; Asset CMS</span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          Inspect metadata, curate public visibility, and add assets ({allMediaAssets.length} total)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowAddMediaModal(true)}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow transition-all"
                        >
                          <Plus className="w-4 h-4" /> Add Media Asset
                        </button>
                      </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search photos by title, tag, or id..."
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs overflow-x-auto">
                        <button
                          onClick={() => setMediaFilter('all')}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                            mediaFilter === 'all' ? 'bg-amber-500 text-neutral-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          All ({allMediaAssets.length})
                        </button>
                        <button
                          onClick={() => setMediaFilter('pitch')}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                            mediaFilter === 'pitch' ? 'bg-amber-500 text-neutral-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Pitch ({tournamentPitchPhotos.length})
                        </button>
                        <button
                          onClick={() => setMediaFilter('tour')}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                            mediaFilter === 'tour' ? 'bg-amber-500 text-neutral-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          £550k Tour ({managementTourPhotos.length})
                        </button>
                        {(contentConfig.customPhotos || []).length > 0 && (
                          <button
                            onClick={() => setMediaFilter('custom')}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                              mediaFilter === 'custom' ? 'bg-amber-500 text-neutral-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Custom ({(contentConfig.customPhotos || []).length})
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto p-1">
                      {filteredMediaAssets.map((photo) => {
                        const override = contentConfig.mediaOverrides?.[photo.id] || {};
                        const isHidden = override.hidden;
                        const isFeatured = override.isFeatured;
                        const title = override.title || photo.alt;
                        const isCustom = photo.id.startsWith('custom-');

                        return (
                          <div
                            key={photo.id}
                            onClick={() => handleSelectPhoto(photo)}
                            className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] ${
                              isHidden
                                ? 'border-rose-900/60 opacity-50 bg-rose-950/20'
                                : isFeatured
                                ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)] bg-slate-900'
                                : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                            }`}
                          >
                            <div className="aspect-video relative overflow-hidden bg-slate-950">
                              <img
                                src={photo.src}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                  photo.category === 'pitch'
                                    ? 'bg-amber-500 text-neutral-950'
                                    : 'bg-emerald-600 text-white'
                                }`}>
                                  {photo.category === 'pitch' ? 'Pitch' : '£550k Appeal'}
                                </span>
                                {isFeatured && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400 text-black">
                                    ★ Featured
                                  </span>
                                )}
                                {isHidden && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-600 text-white">
                                    Hidden
                                  </span>
                                )}
                                {isCustom && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500 text-white">
                                    Custom
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyPhotoUrl(photo);
                                }}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Copy Image URL"
                              >
                                {copiedUrlId === photo.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <div className="p-2.5">
                              <h6 className="text-xs font-semibold text-white truncate">
                                {title}
                              </h6>
                              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block truncate">
                                ID: {photo.id} • {override.tag || photo.tag}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {filteredMediaAssets.length === 0 && (
                      <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                        No photos found matching "{mediaSearch}". Try clear your search query.
                      </div>
                    )}

                    {/* Photo Edit Inspector Modal */}
                    {selectedPhoto && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                              <h5 className="font-bold text-white text-base">Edit Media Asset: {selectedPhoto.id}</h5>
                              <span className="text-xs text-amber-400 font-mono">Category: {selectedPhoto.category === 'pitch' ? 'Pitch Match' : '£550k Delegation'}</span>
                            </div>
                            <button
                              onClick={() => setSelectedPhoto(null)}
                              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 max-h-48 relative">
                            <img
                              src={selectedPhoto.src}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleCopyPhotoUrl(selectedPhoto)}
                              className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-sm"
                            >
                              {copiedUrlId === selectedPhoto.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy Asset Path
                                </>
                              )}
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Display Title / Heading:</label>
                              <input
                                type="text"
                                value={photoEditTitle}
                                onChange={(e) => setPhotoEditTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Detailed Caption:</label>
                              <textarea
                                rows={2}
                                value={photoEditCaption}
                                onChange={(e) => setPhotoEditCaption(e.target.value)}
                                placeholder="Add story details, participant highlights..."
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Tag / Badge Label:</label>
                              <input
                                type="text"
                                value={photoEditTag}
                                onChange={(e) => setPhotoEditTag(e.target.value)}
                                placeholder="e.g. Title Sponsor, Final Trophy, £550k Appeal"
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={photoEditFeatured}
                                  onChange={(e) => setPhotoEditFeatured(e.target.checked)}
                                  className="rounded text-amber-400 focus:ring-0"
                                />
                                <span>Feature in Story Highlights</span>
                              </label>

                              <label className="flex items-center gap-2 text-xs text-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={photoEditHidden}
                                  onChange={(e) => setPhotoEditHidden(e.target.checked)}
                                  className="rounded text-rose-500 focus:ring-0"
                                />
                                <span>Hide from Public Gallery</span>
                              </label>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-slate-800 items-center justify-between">
                            {selectedPhoto.id.startsWith('custom-') ? (
                              <button
                                onClick={() => handleDeleteCustomPhoto(selectedPhoto.id)}
                                className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Asset
                              </button>
                            ) : (
                              <div />
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedPhoto(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSavePhotoOverride}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                              >
                                <Save className="w-3.5 h-3.5" /> Save Photo Metadata
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Add New Media Asset Modal */}
                    {showAddMediaModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <h5 className="font-bold text-white text-base flex items-center gap-2">
                              <Plus className="w-4 h-4 text-amber-400" />
                              <span>Add New Media Asset</span>
                            </h5>
                            <button
                              onClick={() => setShowAddMediaModal(false)}
                              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <form onSubmit={handleAddCustomPhoto} className="space-y-3">
                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL / Path: *</label>
                              <input
                                type="text"
                                required
                                placeholder="https://example.com/photo.jpg or local path"
                                value={newMediaUrl}
                                onChange={(e) => setNewMediaUrl(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Category:</label>
                                <select
                                  value={newMediaCategory}
                                  onChange={(e) => setNewMediaCategory(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                                >
                                  <option value="pitch">Football Cup / Pitch</option>
                                  <option value="tour">£550k Appeal Tour</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Tag / Badge:</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Community, Youth"
                                  value={newMediaTag}
                                  onChange={(e) => setNewMediaTag(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Title / Heading:</label>
                              <input
                                type="text"
                                placeholder="e.g. Slough Town Ground Match Kickoff"
                                value={newMediaTitle}
                                onChange={(e) => setNewMediaTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-300 block mb-1">Caption:</label>
                              <textarea
                                rows={2}
                                placeholder="Brief context or story highlight..."
                                value={newMediaCaption}
                                onChange={(e) => setNewMediaCaption(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-slate-800 justify-end">
                              <button
                                type="button"
                                onClick={() => setShowAddMediaModal(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add to Media Library
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* TAB 3: NOTICES & MARQUEE */}
              {activeTab === 'announcements' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Top Notice & Marquee Ticker</h4>
                      <p className="text-xs text-slate-400">Controls high-priority banners for Jumu'ah, Eid, Janazah, or parking</p>
                    </div>
                    <button
                      onClick={() => handleSaveContent('Notices')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Notice
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Enable Announcement Banner</span>
                      <input
                        type="checkbox"
                        checked={contentConfig.announcement.enabled}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, enabled: e.target.checked }
                        }))}
                        className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Badge Title:</label>
                      <input
                        type="text"
                        value={contentConfig.announcement.badge}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, badge: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Notice Message Text:</label>
                      <textarea
                        rows={3}
                        value={contentConfig.announcement.text}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, text: e.target.value }
                        }))}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TOURNAMENT & SPONSOR */}
              {activeTab === 'tournament' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Tournament & Biryaniwala Sponsor Settings</h4>
                      <p className="text-xs text-slate-400">Controls charity sports event details and local sponsor recognition</p>
                    </div>
                    <button
                      onClick={() => handleSaveContent('Tournament Details')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Tournament
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">Tournament Title:</label>
                        <input
                          type="text"
                          value={contentConfig.tournament.title}
                          onChange={(e) => setContentConfig(prev => ({
                            ...prev,
                            tournament: { ...prev.tournament, title: e.target.value }
                          }))}
                          className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">Ground / Venue:</label>
                        <input
                          type="text"
                          value={contentConfig.tournament.ground}
                          onChange={(e) => setContentConfig(prev => ({
                            ...prev,
                            tournament: { ...prev.tournament, ground: e.target.value }
                          }))}
                          className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <h5 className="text-xs font-bold uppercase text-amber-400 mb-2">Title Sponsor Recognition</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Sponsor Business Name:</label>
                          <input
                            type="text"
                            value={contentConfig.tournament.sponsorName}
                            onChange={(e) => setContentConfig(prev => ({
                              ...prev,
                              tournament: { ...prev.tournament, sponsorName: e.target.value }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Sponsor Address:</label>
                          <input
                            type="text"
                            value={contentConfig.tournament.sponsorAddress}
                            onChange={(e) => setContentConfig(prev => ({
                              ...prev,
                              tournament: { ...prev.tournament, sponsorAddress: e.target.value }
                            }))}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: MADRASAH ADMISSIONS */}
              {activeTab === 'madrasah' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Madrasah & Quran Admissions</h4>
                      <p className="text-xs text-slate-400">Manage student admissions and class capacity</p>
                    </div>
                    <button
                      onClick={() => handleSaveContent('Madrasah Settings')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Madrasah
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 block">Admissions Status:</span>
                      <button
                        type="button"
                        onClick={() => setContentConfig(prev => ({
                          ...prev,
                          madrasah: { ...prev.madrasah, admissionsOpen: !prev.madrasah.admissionsOpen }
                        }))}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold ${
                          contentConfig.madrasah.admissionsOpen 
                            ? 'bg-emerald-500 text-neutral-950' 
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {contentConfig.madrasah.admissionsOpen ? 'ADMISSIONS OPEN' : 'WAITLIST ONLY'}
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 block">Student Capacity:</span>
                      <input
                        type="number"
                        value={contentConfig.madrasah.capacity}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          madrasah: { ...prev.madrasah, capacity: Number(e.target.value) }
                        }))}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 block">Monthly Fee (£):</span>
                      <input
                        type="number"
                        value={contentConfig.madrasah.monthlyFee}
                        onChange={(e) => setContentConfig(prev => ({
                          ...prev,
                          madrasah: { ...prev.madrasah, monthlyFee: Number(e.target.value) }
                        }))}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: ZERO-TRUST AUDIT TRAIL & SYSTEM SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span>Security, Backup &amp; Disaster Recovery</span>
                      </h4>
                      <p className="text-xs text-slate-400">Zero-Trust JWT sessions, 1-click JSON migration, and immutable audit logs</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportJSON}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow"
                      >
                        <Download className="w-3.5 h-3.5" /> Export Site Backup (JSON)
                      </button>
                    </div>
                  </div>

                  {/* Backup / Restore Status Banner */}
                  {importStatus && (
                    <div className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border ${
                      importStatus.success
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      {importStatus.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                      <span>{importStatus.message}</span>
                    </div>
                  )}

                  {/* 1-Click Backup & Restore Suite */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Download className="w-4 h-4 text-amber-400" />
                        <span>1-Click Full Site Backup</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Export all mosque data into a single portable JSON file (Prayer timings, Jumu'ah schedules, Waqf campaign figures, Media overrides, and Audit logs).
                      </p>
                      <button
                        onClick={handleExportJSON}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <FileJson className="w-4 h-4 text-amber-400" />
                        <span>Download Full CMS Backup (.json)</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <UploadCloud className="w-4 h-4 text-emerald-400" />
                        <span>Restore Site from Backup</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Restore or migrate configuration instantly. Validates schema and applies all prayer calculations, texts, and media configurations in real time.
                      </p>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImportJSON} 
                        accept=".json,application/json" 
                        className="hidden" 
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Choose Backup File &amp; Restore Live</span>
                      </button>
                    </div>
                  </div>

                  {/* Active JWT Session Diagnostic */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold">Zero-Trust JWT Authorization Session:</span>
                      <button
                        onClick={handleRenewSession}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Renew Session (+60m)
                      </button>
                    </div>
                    <div className="break-all text-[11px] text-slate-400 p-2.5 rounded bg-slate-900 border border-slate-800">
                      {authSession.token}
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-1 font-sans">
                      <span>Principal Identity: <strong className="text-white">{authSession.payload.sub}</strong> ({authSession.payload.role})</span>
                      <span>Auto-Revokes in: <strong className="text-amber-400">{authSession.expiresInMinutes} minutes</strong></span>
                    </div>
                  </div>

                  {/* Change Administrator Password Form */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div>
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Update Administrator Master Password</span>
                      </h5>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Change the secret master password used to log in to this CMS. Only authorized trustees should know this password.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                      <input
                        type="password"
                        placeholder="Enter new master password (min 6 characters)..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                      />
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Save New Password</span>
                      </button>
                    </div>

                    {passwordChangeMsg && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{passwordChangeMsg}</span>
                      </div>
                    )}
                  </div>

                  {/* Emergency Reset to Charity Commission Defaults */}
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h6 className="text-xs font-bold text-rose-300">Reset to Verified Charity Commission Defaults</h6>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Resets all prayer offsets, charity targets, bank numbers, and text to verified CIO #1180443 defaults.
                      </p>
                    </div>
                    <button
                      onClick={handleResetDefaults}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center justify-center gap-1.5 transition-colors flex-shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  {/* Audit Logs Table */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Cryptographic Audit Records</h5>
                    <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                      {auditLogs.map((log) => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-amber-400 mr-2">[{log.category}]</span>
                            <span className="text-slate-300">{log.action}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(log.timestamp).toLocaleTimeString('en-GB')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
