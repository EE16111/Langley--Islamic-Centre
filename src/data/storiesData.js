import { tournamentPitchPhotos, managementTourPhotos } from './tournamentPhotos';

export const storiesData = [
  {
    id: 'football-cup',
    title: 'Charity Football Cup',
    subtitle: 'Sponsored by Biryaniwala',
    category: 'Youth & Sports',
    badge: '🏆 MATCHDAY',
    coverImage: tournamentPitchPhotos[0]?.src || '/src/assets/stories/football-cup/cup-01.jpg',
    icon: 'Trophy',
    accentColor: 'from-amber-500 to-emerald-600',
    duration: 6000,
    slides: [
      {
        id: 'cup-slide-1',
        type: 'photo',
        image: tournamentPitchPhotos[0]?.src, // Slough Town FC pitch with medals
        tagline: 'Annual Charity Football Cup',
        title: 'Grassroots Tournament on the Pitch',
        description: 'Community football tournament held on the Slough Town FC grounds, uniting local youth and adult teams in sportsmanship and fundraising for Langley Islamic Centre.',
        stats: [
          { label: 'Ground', value: 'Slough Town' },
          { label: 'Beneficiary', value: 'LIC Waqf' },
          { label: 'Teams', value: '16 Teams' }
        ]
      },
      {
        id: 'cup-slide-2',
        type: 'photo',
        image: tournamentPitchPhotos[1]?.src, // Red team on pitch
        tagline: 'Matchday Action',
        title: 'Team Spirit & Healthy Competition',
        description: 'Players competing on the grass pitch with full energy, bringing the local community together through sport and community fundraising.',
        stats: [
          { label: 'Format', value: 'Grassroots' },
          { label: 'Atmosphere', value: 'Brotherhood' }
        ]
      },
      {
        id: 'cup-slide-3',
        type: 'sponsor',
        image: tournamentPitchPhotos[7]?.src || tournamentPitchPhotos[0]?.src, // cup-20: Biryaniwala banner!
        tagline: 'Title Sponsor',
        title: 'Sponsored & Fed by Biryaniwala',
        sponsorName: 'Biryaniwala',
        sponsorAddress: '308 High Street, Slough, Berkshire, SL1 1NB',
        sponsorCuisine: 'Authentic Hyderabadi Biryani & Specialties',
        description: 'Special thanks to Biryaniwala (308 High Street, Slough) for providing hot food catering and headline sponsorship for this community sports event.',
        sponsorBadge: 'Official Tournament Sponsor',
        sponsorLink: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough'
      },
      {
        id: 'cup-slide-4',
        type: 'photo',
        image: tournamentPitchPhotos[11]?.src || tournamentPitchPhotos[0]?.src, // cup-26: Trophy ceremony
        tagline: 'Awards Presentation',
        title: 'Trophy Ceremony & Medals',
        description: 'Presentation of trophies and medals celebrating the effort, teamwork, and generosity of all participants.',
        stats: [
          { label: 'Trophies', value: 'Champions' },
          { label: 'Medals', value: 'All Teams' }
        ]
      },
      {
        id: 'cup-slide-5',
        type: 'action',
        image: tournamentPitchPhotos[2]?.src || tournamentPitchPhotos[0]?.src, // cup-04 aerial pitch
        tagline: 'Proceeds to Waqf Fund',
        title: '100% of Tournament Donations Support Spitfire Close',
        description: 'All funds collected at the tournament go directly towards the acquisition and purchase of our permanent Islamic Centre at Spitfire Close (CIO #1180443).',
        ctaText: 'Donate to Waqf Project',
        ctaAction: 'donate'
      }
    ]
  },
  {
    id: 'biryaniwala-spotlight',
    title: 'Sponsor: Biryaniwala',
    subtitle: '308 High Street, Slough',
    category: 'Local Business Partner',
    badge: '🍛 SPONSOR',
    coverImage: tournamentPitchPhotos[7]?.src || tournamentPitchPhotos[0]?.src, // cup-20 banner
    icon: 'UtensilsCrossed',
    accentColor: 'from-amber-400 to-orange-600',
    duration: 6000,
    slides: [
      {
        id: 'biryani-slide-1',
        type: 'sponsor-card',
        image: tournamentPitchPhotos[7]?.src || tournamentPitchPhotos[0]?.src,
        tagline: 'Official Event Sponsor',
        title: 'Biryaniwala (Slough)',
        sponsorName: 'Biryaniwala',
        sponsorAddress: '308 High Street, Slough, Berkshire, SL1 1NB',
        description: 'Biryaniwala generously sponsored the tournament catering, supplying fresh hot biryani and support for the athletes and volunteers throughout the day.',
        actionLabel: 'View on Google Maps',
        actionUrl: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough'
      },
      {
        id: 'biryani-slide-2',
        type: 'partner-call',
        image: tournamentPitchPhotos[1]?.src,
        tagline: 'Local Business Partnerships',
        title: 'Support Businesses That Support Our Youth',
        description: 'We encourage the community to patronise local businesses like Biryaniwala who actively support youth development and charitable work in Slough and Langley.',
        ctaText: 'Contact Management for Sponsorship',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'management-on-tour',
    title: 'Management on Tour',
    subtitle: '£550k Building Campaign',
    category: 'Fundraising Missions',
    badge: '🕌 APPEALS',
    coverImage: managementTourPhotos[3]?.src || '/src/assets/stories/football-cup/cup-07.jpg', // cup-07 banner
    icon: 'MapPin',
    accentColor: 'from-emerald-400 to-teal-600',
    duration: 6000,
    slides: [
      {
        id: 'tour-slide-1',
        type: 'info',
        image: managementTourPhotos[3]?.src, // cup-07: £550k banner with management
        tagline: 'Fundraising Across the UK',
        title: 'Management & Volunteer Delegations',
        description: 'Langley Islamic Centre trustees and volunteers frequently visit partner mosques, Friday congregations, and charity events to raise the £550,000 required for our permanent Spitfire Close building.',
        stats: [
          { label: 'Target', value: '£550,000' },
          { label: 'Status', value: 'CIO #1180443' },
          { label: 'Location', value: 'Spitfire Close' }
        ]
      },
      {
        id: 'tour-slide-2',
        type: 'photo',
        image: managementTourPhotos[4]?.src, // cup-08: Volunteer with orange charity bucket
        tagline: 'Community Collections',
        title: 'Street & Mosque Collections',
        description: 'Dedicated volunteers on the ground with official charity collection buckets, collecting donations from brothers and sisters across London, Berkshire, and partner masajid.',
        stats: [
          { label: 'Policy', value: '100% Donation' },
          { label: 'Governance', value: 'UK Charity Comm' }
        ]
      },
      {
        id: 'tour-slide-3',
        type: 'charity-transparency',
        image: managementTourPhotos[18]?.src, // cup-32: Official Charity Commission banner
        tagline: 'Official Charity Banking Details',
        title: 'HSBC Bank Account: Langley Islamic Centre',
        description: 'Registered Charitable Incorporated Organisation (CIO #1180443). Bank: HSBC | Sort Code: 40-42-08 | Account: 02494973 | Phone: 078 4373 2106.',
        charityNumber: '1180443',
        charityUrl: 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5128534/contact-information',
        facebookUrl: 'https://www.facebook.com/LangleyIslamicCentre/?locale=en_GB'
      }
    ]
  },
  {
    id: 'spitfire-vision',
    title: 'Unit 2 Spitfire Close',
    subtitle: 'Permanent Waqf Sanctuary',
    category: 'Building Project',
    badge: '🏛️ WAQF',
    coverImage: '/src/assets/LIC-OutSide-1024x771.jpg',
    icon: 'Building2',
    accentColor: 'from-amber-400 to-yellow-600',
    duration: 6000,
    slides: [
      {
        id: 'spitfire-slide-1',
        type: 'info',
        image: '/src/assets/LIC-OutSide-1024x771.jpg',
        tagline: 'Permanent Premises',
        title: 'Unit 2, Spitfire Close, Langley, SL3 8GY',
        description: 'Facilities for 5 daily prayers, Jumuah, youth education, Quran classes, and community support in Langley.',
        stats: [
          { label: 'Premises', value: 'Spitfire Close' },
          { label: 'Postcode', value: 'SL3 8GY' },
          { label: 'Target', value: '£550,000' }
        ]
      },
      {
        id: 'spitfire-slide-2',
        type: 'action',
        image: '/src/assets/SpitFireSlider.jpg',
        tagline: 'Standing Order Mandate',
        title: 'Help Make Our Masjid Debt-Free',
        description: 'Set up a regular monthly standing order directly to our HSBC charity account to support ongoing building acquisition.',
        ctaText: 'Set Up Standing Order',
        ctaAction: 'standingOrder'
      }
    ]
  }
];

export const sponsorDetails = {
  name: 'Biryaniwala',
  fullName: 'Biryaniwala Slough',
  tagline: 'Authentic Hyderabadi Biryani & Takeaway',
  address: '308 High Street, Slough, Berkshire, SL1 1NB',
  role: 'Official Title Sponsor • Charity Football Cup',
  badge: 'Official Sponsor',
  highlights: [
    'Sponsored tournament catering and hot meals for players and volunteers',
    'Local Slough independent restaurant supporting grassroots youth sports',
    'Specialises in authentic Hyderabadi Dum Biryani and catering for community events'
  ],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough'
};
