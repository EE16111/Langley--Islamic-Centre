import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrayerTimesSection from './components/PrayerTimesSection';
import SpitfireLocationSection from './components/SpitfireLocationSection';
import DonationSection from './components/DonationSection';
import QuranClassesSection from './components/QuranClassesSection';
import PillarsSection from './components/PillarsSection';
import CharityWorkSection from './components/CharityWorkSection';
import ValuesSection from './components/ValuesSection';
import Footer from './components/Footer';

import TimetableModal from './components/TimetableModal';
import QuranRegistrationModal from './components/QuranRegistrationModal';
import DonationModal from './components/DonationModal';
import VolunteerModal from './components/VolunteerModal';
import WaqfFloorPlanModal from './components/WaqfFloorPlanModal';
import StandingOrderGeneratorModal from './components/StandingOrderGeneratorModal';
import QiblaModal from './components/QiblaModal';
import QiblaPage from './components/QiblaPage';
import SpiritualAudioPlayer from './components/SpiritualAudioPlayer';
import AdminDashboardModal from './components/AdminDashboardModal';
import MosqueTVSignageModal from './components/MosqueTVSignageModal';
import SZGMCPrayerWidget from './components/SZGMCPrayerWidget';
import ThemeSwitcher from './components/ThemeSwitcher';
import CommunityStoriesSection from './components/CommunityStoriesSection';
import StoryViewerModal from './components/StoryViewerModal';
import { storiesData } from './data/storiesData';
import { useTheme } from './context/ThemeContext';

import { calculatePrayerTimes, getNextPrayer, subscribePrayerCMS } from './utils/prayerTimes';

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isAmbient = theme === 'ambient';

  const [asrHanafi, setAsrHanafi] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cmsVersion, setCmsVersion] = useState(0);

  // Modals state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [quranModalOpen, setQuranModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [floorPlanModalOpen, setFloorPlanModalOpen] = useState(false);
  const [standingOrderModalOpen, setStandingOrderModalOpen] = useState(false);
  const [qiblaModalOpen, setQiblaModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [tvModalOpen, setTvModalOpen] = useState(false);
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'qibla'

  const handleOpenStory = (index = 0) => {
    setActiveStoryIndex(index);
    setStoryViewerOpen(true);
  };

  const handleOpenQibla = () => {
    setViewMode('qibla');
    window.location.hash = '#qibla';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live clock updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Support URL hash routing for modals and full-page views
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#qibla') {
        setViewMode('qibla');
      } else {
        setViewMode('home');
      }
      if (hash === '#timetable' || hash === '#calendar') setTimetableModalOpen(true);
      if (hash === '#admin' || hash === '#cms') setAdminModalOpen(true);
      if (hash === '#tv') setTvModalOpen(true);
      if (hash === '#donate') setDonationModalOpen(true);
      if (hash === '#quran') setQuranModalOpen(true);
      if (hash === '#story' || hash === '#stories') {
        setActiveStoryIndex(0);
        setStoryViewerOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Listen to Admin CMS prayer updates
  useEffect(() => {
    return subscribePrayerCMS(() => {
      setCmsVersion(v => v + 1);
    });
  }, []);

  // Calculate prayer times
  const prayerData = calculatePrayerTimes(currentTime, { asrHanafi });
  const nextPrayer = getNextPrayer(prayerData.prayers, currentTime);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-400 ${
      isLight
        ? 'bg-[#fbf9f4] text-stone-900'
        : isAmbient
        ? 'bg-[#09101d] text-slate-100'
        : 'bg-[#080b10] text-slate-100'
    }`}>
      
      {/* Top Navigation */}
      <Navbar 
        nextPrayer={nextPrayer}
        onOpenDonate={() => setDonationModalOpen(true)}
        onOpenTimetable={() => setTimetableModalOpen(true)}
        onOpenQuranModal={() => setQuranModalOpen(true)}
        onOpenFloorPlan={() => setFloorPlanModalOpen(true)}
        onOpenQibla={handleOpenQibla}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenTVSignage={() => setTvModalOpen(true)}
      />

      {/* Conditional View: Dedicated Qibla Page or Main Content Sections */}
      {viewMode === 'qibla' ? (
        <main className="flex-1 pt-16">
          <QiblaPage onBack={() => { setViewMode('home'); window.location.hash = ''; }} />
        </main>
      ) : (
        <main className="flex-1">
          <Hero 
            nextPrayer={nextPrayer}
            onOpenDonate={() => setDonationModalOpen(true)}
            onOpenTimetable={() => setTimetableModalOpen(true)}
            onOpenQuranModal={() => setQuranModalOpen(true)}
            onOpenFloorPlan={() => setFloorPlanModalOpen(true)}
            onOpenStandingOrder={() => setStandingOrderModalOpen(true)}
            onOpenQibla={handleOpenQibla}
          />

          <PrayerTimesSection 
            prayerData={prayerData}
            nextPrayer={nextPrayer}
            asrHanafi={asrHanafi}
            setAsrHanafi={setAsrHanafi}
            onOpenTimetable={() => setTimetableModalOpen(true)}
            onOpenQibla={handleOpenQibla}
          />

          <SpitfireLocationSection />

          <CommunityStoriesSection 
            onOpenStory={handleOpenStory}
            onOpenDonation={() => setDonationModalOpen(true)}
            onOpenStandingOrder={() => setStandingOrderModalOpen(true)}
          />

          <DonationSection 
            onOpenFloorPlan={() => setFloorPlanModalOpen(true)}
            onOpenStandingOrder={() => setStandingOrderModalOpen(true)}
          />

          <QuranClassesSection 
            onOpenQuranModal={() => setQuranModalOpen(true)}
          />

          <PillarsSection 
            onOpenVolunteerModal={() => setVolunteerModalOpen(true)}
          />

          <CharityWorkSection 
            onOpenDonate={() => setDonationModalOpen(true)}
          />

          <ValuesSection />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onOpenDonate={() => setDonationModalOpen(true)}
        onOpenTimetable={() => setTimetableModalOpen(true)}
        onOpenQuranModal={() => setQuranModalOpen(true)}
        onOpenVolunteerModal={() => setVolunteerModalOpen(true)}
        onOpenFloorPlan={() => setFloorPlanModalOpen(true)}
        onOpenStandingOrder={() => setStandingOrderModalOpen(true)}
        onOpenQibla={() => setQiblaModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenTVSignage={() => setTvModalOpen(true)}
      />

      {/* Interactive Modals */}
      <TimetableModal 
        isOpen={timetableModalOpen}
        onClose={() => setTimetableModalOpen(false)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <QuranRegistrationModal 
        isOpen={quranModalOpen}
        onClose={() => setQuranModalOpen(false)}
      />

      <DonationModal 
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        onOpenStandingOrder={() => {
          setDonationModalOpen(false);
          setStandingOrderModalOpen(true);
        }}
      />

      <VolunteerModal 
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <WaqfFloorPlanModal 
        isOpen={floorPlanModalOpen}
        onClose={() => setFloorPlanModalOpen(false)}
        onSelectPledge={() => setFloorPlanModalOpen(false)}
      />

      <StandingOrderGeneratorModal 
        isOpen={standingOrderModalOpen}
        onClose={() => setStandingOrderModalOpen(false)}
      />

      <QiblaModal 
        isOpen={qiblaModalOpen}
        onClose={() => setQiblaModalOpen(false)}
      />

      {/* Mosques Go Digital (£99/mo) Management Suite & Signage */}
      <AdminDashboardModal 
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLaunchTVSignage={() => {
          setAdminModalOpen(false);
          setTvModalOpen(true);
        }}
      />

      <MosqueTVSignageModal 
        isOpen={tvModalOpen}
        onClose={() => setTvModalOpen(false)}
      />

      {/* Interactive 2026 Fullscreen Story Viewer Modal */}
      <StoryViewerModal 
        isOpen={storyViewerOpen}
        onClose={() => setStoryViewerOpen(false)}
        stories={storiesData}
        initialStoryIndex={activeStoryIndex}
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenStandingOrder={() => setStandingOrderModalOpen(true)}
      />

      {/* Floating Spiritual Audio Bar */}
      <SpiritualAudioPlayer />

      {/* Sheikh Zayed Grand Mosque (SZGMC) Floating Prayer Widget */}
      <SZGMCPrayerWidget 
        prayerData={prayerData}
        nextPrayer={nextPrayer}
        onOpenTimetable={() => setTimetableModalOpen(true)}
      />

      {/* Floating Theme Switcher Quick Toggle (Bottom-Left) */}
      <ThemeSwitcher variant="floating" />

    </div>
  );
}
