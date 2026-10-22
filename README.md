# 🕌 Langley Islamic Centre — Digital Sanctuary Platform

[![Live Production](https://img.shields.io/badge/Production-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://langley-islamic-centre.vercel.app)
[![UK Charity](https://img.shields.io/badge/UK%20Charity%20Commission-%231180443-gold?style=for-the-badge)](https://langley-islamic-centre.vercel.app)
[![Vite](https://img.shields.io/badge/Built%20with-Vite%20%2B%20React-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A state-of-the-art, interactive, and venerable digital platform engineered for the **Langley Islamic Centre (LIC)** — Unit 2, Spitfire Close, Langley, Slough, Berkshire SL3 8GY (Registered UK Charity No. 1180443).

Establishing an enduring freehold house of worship, Quranic education, community hub, and frontline humanitarian aid.

---

## 🌐 Live Production Links

* **Main Sanctuary Website**: [https://langley-islamic-centre.vercel.app](https://langley-islamic-centre.vercel.app)
* **Regent's Mosque 12-Month Calendar & Timetable**: [https://langley-islamic-centre.vercel.app/#timetable](https://langley-islamic-centre.vercel.app/#timetable)
* **Committee Control Centre & Prayer CMS**: [https://langley-islamic-centre.vercel.app/#admin](https://langley-islamic-centre.vercel.app/#admin)
* **Mosque TV Display Mode (Prayer Hall HDMI Clocks)**: [https://langley-islamic-centre.vercel.app/#tv](https://langley-islamic-centre.vercel.app/#tv)
* **Waqf Prayer Hall Musallah Floor Plan**: [https://langley-islamic-centre.vercel.app/#floorplan](https://langley-islamic-centre.vercel.app/#floorplan)
* **118.9° Qibla Compass**: [https://langley-islamic-centre.vercel.app/#qibla](https://langley-islamic-centre.vercel.app/#qibla)

---

## 🏛️ Architectural & Aesthetic Philosophy

Departing from generic AI website generator tropes (neon gradients, floating canvas particles, identical rounded cards, SaaS pricing toggles), this platform is crafted with a **Handcrafted Architectural Sanctuary Aesthetic** inspired by venerable British and Andalusian Islamic institutions (e.g. Cambridge Central Mosque, Oxford Centre for Islamic Studies, and classical Ottoman/Andalusian Waqf trust deeds).

### 1. Sacred Materials & Color Palette
* **Deep Basalt & Obsidian Stone** (`#080b10`, `#04060a`): Pure physical stone sanctuary backdrops.
* **Antique Gilded Gold Leaf** (`#c5a059`, `#dfb76c`): Illuminated manuscript borders, calligraphy seals, and architectural hairlines.
* **Sacred Pine Emerald** (`#1b4931`, `#74c69d`): Reserved strictly for verified charity commission compliance, Gift Aid pledges, and fiduciary guarantees.
* **Alabaster Warm White** (`#f4f0e6`): Monumental, readable stone typography eliminating harsh digital glare.
* **Girih 12-Point Star Lattice Watermark (`bg-jali-pattern`)**: Authentic Islamic geometric watermark embedded directly into the layout.
* **Architectural Masonry Crosshairs (`+`)**: Blueprint registration marks on plaque corners reflecting architectural permanence.

### 2. Typographic Pairings
* **Sacred Arabic Inscriptions**: `Amiri` font with classical Quranic vocalisation (*Harakat*) and metallic gold leaf gradients (`gold-leaf-text`).
* **Monumental Display Headings**: `Cormorant Garamond` and `Cinzel` serif typefaces imparting institutional gravity.
* **Financial & Timetable Data**: `JetBrains Mono` / monospace for financial accountability and exact prayer timestamps.
* **Editorial & Body Text**: `Plus Jakarta Sans` for crisp legibility across mobile, tablet, and desktop displays.

---

## ✨ Core Interactive Features

### 1. Regent's Park Mosque (ICCUK) Unified Prayer Timetable & Monthly Calendar
Modeled on the official **Unified London Prayer Timetable (ULPT)** adopted by the London Central Mosque & Islamic Cultural Centre (Regent's Park):
* **Dual Time Columns**: Displays both **Beginning (Adhan)** and **Congregational Standing (Jamā'ah)** for Fajr, Zuhr, Asr, Maghrib, and Isha, along with Sunrise (*Shuruq*).
* **Dynamic Islamic Hijri Calendar**: Native calculation with admin moon-sighting adjustment (`-2d` to `+2d`).
* **Dual Friday Jumu'ah Assemblies**: Displays 1st and 2nd Jumu'ah schedules (Khutbah, Jamā'ah, and Khateeb info).
* **Three Flexible Views**:
  1. *Regent's 15-Column Table View*: Full monthly sheet with every day of the month.
  2. *Interactive Calendar Month Grid*: Clickable date cells with daily prayer inspection.
  3. *Ramadan 1447 Fasting Calendar*: Suhoor end (*Imsak*), daily community Iftaar at Spitfire Close, and 20 Rak'ah Taraweeh schedules.
* **Multi-Format Export**:
  * Clean print stylesheet for physical wall posters (`window.print()`).
  * Automated CSV spreadsheet export.
  * Instant iCal (`.ics`) file generation to sync directly into Google Calendar and Apple Calendar.

### 2. Zero Hardcoding: Live Admin Control Centre & Prayer CMS
Every timetable entry, congregation rule, and notice is editable in real-time via the **Admin Control Centre** (`/#admin`), without requiring code changes:
* **Jamā'ah Congregation Rules**: Configure each salah independently to use either a **Fixed Clock Time** (e.g. `13:00`, `20:00`) or an **Offset in Minutes After Adhan** (e.g. `+15m`, `+5m`).
* **Friday Jumu'ah Manager**: Enable/disable dual congregations, set Khutbah and Jamā'ah times, and assign Khateebs.
* **Specific Date Overrides**: Pick any date (`YYYY-MM-DD`) and set custom Adhan or Jamā'ah times for special events or holidays.
* **Calculation Standards & Presets**: One-click switch between *Regent's Park Mosque (ICCUK) Unified Standard* and *Karachi 18° Ephemeris*, switch Asr juristic methods (*Standard Shafi'i/Maliki* vs *Hanafi*), and toggle automatic UK Daylight Saving Time (BST/GMT).
* **Live Mosque Notice Ticker**: Broadcast emergency advisories or seasonal prayer change notices across the website and TV displays.

### 3. Spitfire Close Waqf Capital Endowment Ledger (£550,000 Appeal)
Transparent, real-time financial accountability replacing generic donation buttons:
* **4 Physical Capital Pillars**:
  1. *Freehold Sanctuary Title Debt Clearance*: £320,000
  2. *Sisters' Prayer Hall & Crèche Gallery*: £110,000
  3. *Youth Madrasah Classrooms*: £70,000
  4. *Eco-Wudhu & Ablution Facilities*: £50,000
* **Interactive Sajdah Musallah Calculator**: Calculate exact square-metre musallah spaces (£250/sqm or £21/mo automated standing order) with Gift Aid 25% uplift calculation.
* **Automated Standing Order Mandate Generator**: Generates bank-ready standing order slips with donor reference numbers.
* **Interactive SVG Waqf Musallah Floor Plan**: Interactive room-by-room architectural layout of the Spitfire Close campus.

### 4. Spitfire Close Campus Monograph & Parking Etiquette
* Photo gallery viewpoints of the exterior and interior prayer spaces.
* Spitfire Close neighbour consideration protocol with designated bay guidelines and carpooling advice.

### 5. Classical Maktab & Tajweed Pavilion
* Structured syllabus for boys aged 7–16 under DBS-certified educators.
* Flexible scheduling tracks: **Cohort Alpha** (Mon–Wed) and **Cohort Beta** (Thu–Sat).
* 3 Diagnostic Levels: Qaida Nuraniyyah, Nazira Tajweed, and Fiqh/Duas.
* Phased 5-step enrolment protocol.

### 6. 100% Direct Delivery Humanitarian Disaster Relief
* Strict fiduciary policy: Zero administrative fees deducted from charitable relief donations.
* Verified field photographic documentation from Bangladesh flood relief and humanitarian parcel distributions.

### 7. Mosque Digital TV Signage Mode (`/#tv`)
* Clean, auto-refreshing fullscreen display designed for 1080p/4K HDMI TVs powered by Amazon FireStick, Chromecast, or Raspberry Pi.
* Displays live prayer countdown, current prayer highlight, Hadith of the day, and dynamic donation QR codes.

### 8. Spiritual Audio Player & 118.9° Qibla Compass
* High-definition Quran recitations by celebrated world Qaris (Sheikh Mishary Rashid Alafasy, Sheikh Abdul Rahman Al-Sudais, etc.).
* Live Qibla Compass calibrated precisely to Spitfire Close coordinates (`118.9° ESE`).

---

## 📁 Repository & Codebase Structure

```text
langley-islamic-centre/
├── index.html                   # HTML entry point with Google Fonts (Cormorant, Cinzel, Amiri, Plus Jakarta)
├── package.json                 # Project dependencies & npm scripts
├── tailwind.config.js           # Extended architectural typography and custom sanctuary color tokens
├── vercel.json                  # Production Vercel SPA routing configuration
├── vite.config.js               # Vite bundler build settings
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Main application state, hash routing, modal managers
│   ├── index.css                # Bespoke CSS, Girih lattice pattern, gold leaf gradients, crosshairs
│   ├── assets/                  # High-resolution architectural photography, maps, relief images
│   ├── components/
│   │   ├── Navbar.jsx           # Gilded basalt navigation bar with quick tools and badges
│   │   ├── Hero.jsx             # Monumental sanctuary hero with Bismillah & analog prayer board
│   │   ├── PrayerTimesSection.jsx # 6-column prayer timetable plaque with live CMS broadcast banner
│   │   ├── SpitfireLocationSection.jsx # Spitfire Close campus monograph & photo viewpoints
│   │   ├── DonationSection.jsx  # £550k Waqf Capital Endowment ledger & Sajdah calculator
│   │   ├── QuranClassesSection.jsx # Classical Maktab & Tajweed pavilion with syllabus tracks
│   │   ├── PillarsSection.jsx   # 6 civic community monograph plaques
│   │   ├── CharityWorkSection.jsx # 100% donation guarantee & flood relief documentation
│   │   ├── ValuesSection.jsx    # 10 Sacred Commitments archival stone tablets
│   │   ├── Footer.jsx           # Secretariat ledger with Surah Al-Muzzammil calligraphy & HSBC mandate
│   │   ├── LicLogo.jsx          # Vector high-resolution emblem with theme switcher (Gold, Alabaster, Founding)
│   │   ├── TimetableModal.jsx   # Regent's Mosque 12-month calendar & timetable modal (Table/Grid/Ramadan)
│   │   ├── AdminDashboardModal.jsx # Committee Control Centre & non-hardcoded Prayer CMS
│   │   ├── MosqueTVSignageModal.jsx # Fullscreen HDMI Digital TV signage mode
│   │   ├── DonationModal.jsx    # Integrated Stripe/Apple Pay giving modal
│   │   ├── StandingOrderGeneratorModal.jsx # Standing Order mandate generator
│   │   ├── WaqfFloorPlanModal.jsx # Interactive SVG prayer hall musallah map
│   │   ├── QuranRegistrationModal.jsx # 5-step Maktab student admission wizard
│   │   ├── VolunteerModal.jsx   # Community volunteer registration modal
│   │   ├── QiblaModal.jsx       # 118.9° interactive Qibla compass
│   │   └── SpiritualAudioPlayer.jsx # Ambient high-fidelity Quran reciter player
│   ├── data/
│   │   └── content.js           # Institutional facts, charity numbers, banking details, pillar data
│   ├── services/
│   │   └── prayerCMS.js         # Reactive Prayer CMS engine, Regent's calculations, CSV/ICS exporters
│   └── utils/
│       └── prayerTimes.js       # Facade wrapper interfacing with prayerCMS
```

---

## 🛠️ Local Development & Build

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/EE16111/Langley-Mosque.git
cd Langley-Mosque

# Install dependencies
npm install

# Start local development server
npm run dev
```
Visit `http://localhost:5173` in your browser.

### Production Build & Verification
```bash
# Compile and optimize production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment & Hosting

The project is configured for deployment on **Vercel** with full client-side routing support:

```bash
# Deploy to Vercel production
npx vercel --prod
```

### Production Routing Configuration (`vercel.json`)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📜 Charity Governance & Banking Mandate

All charitable appeals and donations are governed under the oversight of the Trustees of Langley Islamic Centre:

* **Registered UK Charity Number**: `1180443`
* **Official Bank**: HSBC UK
* **Account Name**: Langley Islamic Centre
* **Account Number**: `0249 4973`
* **Sort Code**: `40-42-08`
* **Campus Address**: Unit 2, Spitfire Close, Langley, Slough, Berkshire SL3 8GY
* **Official Contact**: [info@langleyislamiccentre.co.uk](mailto:info@langleyislamiccentre.co.uk) • 078 4373 2106

---

## ⚖️ License & Intellectual Property

Copyright © 2018–2026 **Langley Islamic Centre (LIC)**. All rights reserved.  
Released under the [MIT License](LICENSE) for community benefit.
