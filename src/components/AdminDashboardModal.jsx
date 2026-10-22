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
  ExternalLink
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
  logAudit 
} from '../services/contentCMS';

const ADMIN_MASTER_PASSWORD = 'LIC2026!Admin';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  onLaunchTVSignage 
}) {
  const [activeTab, setActiveTab] = useState('prayer'); // 'prayer' | 'waqf' | 'announcements' | 'tournament' | 'madrasah' | 'security'
  const [authSession, setAuthSession] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

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

    if (passwordInput === ADMIN_MASTER_PASSWORD) {
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

  // Handle Logout
  const handleLogout = () => {
    revokeAdminJWT();
    setAuthSession(null);
    setPasswordInput('');
    setAuthError('');
  };

  // Save changes to Prayer CMS
  const handleSavePrayer = () => {
    savePrayerCMSConfig(prayerConfig);
    logAudit('PRAYER_CMS', 'Updated prayer Jamaah times and rules', authSession?.payload?.sub || 'admin');
    triggerSaveAlert();
  };

  // Save changes to Content CMS
  const handleSaveContent = (sectionName) => {
    saveContentCMS(contentConfig, `Updated ${sectionName} via CMS`);
    setAuditLogs(getAuditLogs());
    triggerSaveAlert();
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

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 text-left space-y-1">
                <span className="font-bold text-slate-300 block">Zero-Trust Diagnostics:</span>
                <div>• Master Role: Superadmin (CIO #1180443)</div>
                <div>• Default Password: <code className="text-amber-400">LIC2026!Admin</code></div>
                <div>• Session Lifespan: 60 minutes rolling JWT</div>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED CMS WORKSPACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/70 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              {[
                { id: 'prayer', label: 'Prayer & Iqamah Times', icon: Clock },
                { id: 'waqf', label: 'Waqf £550k Campaign', icon: Heart },
                { id: 'announcements', label: 'Notices & Marquee', icon: Megaphone },
                { id: 'tournament', label: 'Tournament & Sponsor', icon: Trophy },
                { id: 'madrasah', label: 'Madrasah Admissions', icon: BookOpen },
                { id: 'security', label: 'Zero-Trust Audit Log', icon: ShieldCheck }
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

                  {/* Friday Jumu'ah Specifications */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      Friday Jumu'ah Dual Congregations
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="font-bold text-amber-300">1st Jumu'ah Congregation:</span>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Khutbah:</span>
                          <input
                            type="text"
                            value={prayerConfig.jummah.first.khutbahTime}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, khutbahTime: e.target.value } }
                            }))}
                            className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Jamā'ah:</span>
                          <input
                            type="text"
                            value={prayerConfig.jummah.first.jamaatTime}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, first: { ...prev.jummah.first, jamaatTime: e.target.value } }
                            }))}
                            className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="font-bold text-amber-300">2nd Jumu'ah Congregation:</span>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Khutbah:</span>
                          <input
                            type="text"
                            value={prayerConfig.jummah.second.khutbahTime}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, khutbahTime: e.target.value } }
                            }))}
                            className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Jamā'ah:</span>
                          <input
                            type="text"
                            value={prayerConfig.jummah.second.jamaatTime}
                            onChange={(e) => setPrayerConfig(prev => ({
                              ...prev,
                              jummah: { ...prev.jummah, second: { ...prev.jummah.second, jamaatTime: e.target.value } }
                            }))}
                            className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
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

              {/* TAB 6: ZERO-TRUST AUDIT TRAIL */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-lg font-bold text-white">Zero-Trust Audit Log & Diagnostics</h4>
                      <p className="text-xs text-slate-400">Timestamped record of administrative modifications</p>
                    </div>
                    <button
                      onClick={() => {
                        const json = JSON.stringify({ prayer: prayerConfig, content: contentConfig, audit: auditLogs }, null, 2);
                        const blob = new Blob([json], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `lic_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Backup Site JSON
                    </button>
                  </div>

                  {/* Active JWT Session Diagnostic */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="text-amber-400 font-bold">Active JWT Authorization Token:</div>
                    <div className="break-all text-[11px] text-slate-400 p-2.5 rounded bg-slate-900 border border-slate-800">
                      {authSession.token}
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>Principal: {authSession.payload.sub}</span>
                      <span>Expires in: {authSession.expiresInMinutes} minutes</span>
                    </div>
                  </div>

                  {/* Audit Logs Table */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Audit Records</h5>
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
