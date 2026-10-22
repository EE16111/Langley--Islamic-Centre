import { tournamentPhotos } from './tournamentPhotos';

export const storiesData = [
  {
    id: 'football-cup',
    title: 'Charity Cup 2026',
    subtitle: 'Sponsored by Biryaniwala',
    category: 'Youth & Sports',
    badge: '🏆 RECAP',
    coverImage: tournamentPhotos[25]?.src || tournamentPhotos[0]?.src, // trophy or kickoff
    icon: 'Trophy',
    accentColor: 'from-amber-500 to-emerald-600',
    duration: 6000,
    slides: [
      {
        id: 'cup-slide-1',
        type: 'photo',
        image: tournamentPhotos[0]?.src,
        tagline: 'Grassroots Energy • One Community',
        title: 'The Annual Charity Football Cup 2026',
        description: 'Over 16 youth and adult teams from Langley, Slough, and Berkshire clashed in a spirited day of brotherhood, sportsmanship, and charity fundraising.',
        stats: [
          { label: 'Teams', value: '16+' },
          { label: 'Funds Raised', value: '£4,250+' },
          { label: 'Players', value: '120+' }
        ]
      },
      {
        id: 'cup-slide-2',
        type: 'photo',
        image: tournamentPhotos[4]?.src || tournamentPhotos[1]?.src,
        tagline: 'High Octane Action',
        title: 'Passion, Grit & Brotherhood',
        description: 'Every tackle, pass, and goal carried a shared purpose: securing our future permanent Islamic Centre and youth hub at Spitfire Close.',
        stats: [
          { label: 'Goals Scored', value: '48' },
          { label: 'Matches', value: '28' }
        ]
      },
      {
        id: 'cup-slide-3',
        type: 'sponsor',
        image: tournamentPhotos[8]?.src || tournamentPhotos[2]?.src,
        tagline: 'Official Tournament Sponsor',
        title: 'Powered & Fed by Biryaniwala',
        sponsorName: 'Biryaniwala',
        sponsorAddress: '308 High Street, Slough, SL1 1NB',
        sponsorCuisine: 'Authentic Hyderabadi & Subcontinental Specialties',
        description: 'A massive community thank you to our title sponsor, Biryaniwala. Their generous sponsorship and delicious hot food fueled every athlete and volunteer on the pitch.',
        sponsorBadge: 'Official Platinum Partner',
        sponsorLink: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough'
      },
      {
        id: 'cup-slide-4',
        type: 'photo',
        image: tournamentPhotos[23]?.src || tournamentPhotos[3]?.src,
        tagline: 'Champions of Langley',
        title: 'Trophy Presentation & Honors',
        description: 'Congratulations to our tournament winners and every player who stepped onto the pitch. Medals, trophies, and unforgettable memories made.',
        stats: [
          { label: 'Champions', value: 'Slough Stars FC' },
          { label: 'Fair Play Award', value: 'Langley Youth' }
        ]
      },
      {
        id: 'cup-slide-5',
        type: 'action',
        image: tournamentPhotos[25]?.src || tournamentPhotos[5]?.src,
        tagline: 'The Mission Continues',
        title: '100% of Proceeds to LIC Spitfire Close Waqf',
        description: 'Every penny raised goes directly to our registered charity (CIO #1180443) building project. Join the movement and help build our permanent sanctuary.',
        ctaText: 'Donate to Waqf Project',
        ctaAction: 'donate'
      }
    ]
  },
  {
    id: 'biryaniwala-spotlight',
    title: 'Sponsor Spotlight',
    subtitle: 'Biryaniwala Slough',
    category: 'Community Partner',
    badge: '🍛 PARTNER',
    coverImage: tournamentPhotos[12]?.src || tournamentPhotos[2]?.src,
    icon: 'UtensilsCrossed',
    accentColor: 'from-amber-400 to-orange-600',
    duration: 6000,
    slides: [
      {
        id: 'biryani-slide-1',
        type: 'sponsor-card',
        image: tournamentPhotos[12]?.src || tournamentPhotos[6]?.src,
        tagline: 'Local Business With A Big Heart',
        title: 'Biryaniwala: Backing Our Community',
        sponsorName: 'Biryaniwala Slough',
        sponsorAddress: '308 High Street, Slough, Berkshire, SL1 1NB',
        description: 'Biryaniwala stepped up as the headline sponsor for our youth football tournament, providing vital financial sponsorship and catering hot gourmet meals for our youth.',
        quote: '“Supporting the youth, empowering healthy sport, and strengthening the house of Allah in Langley is an honour for our business.”',
        actionLabel: 'Get Directions / Visit',
        actionUrl: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough'
      },
      {
        id: 'biryani-slide-2',
        type: 'partner-call',
        image: tournamentPhotos[16]?.src || tournamentPhotos[7]?.src,
        tagline: 'Become a Community Sponsor',
        title: 'Partner Your Business With LIC',
        description: 'Are you a local business in Langley, Slough, Windsor, or Heathrow? Sponsoring LIC events and educational initiatives places your brand in front of thousands of families while supporting a registered UK charity (#1180443).',
        ctaText: 'Partner With Us',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'management-on-tour',
    title: 'Management on Tour',
    subtitle: 'UK Waqf Fundraising Drive',
    category: 'Outreach & Missions',
    badge: '🕌 ON TOUR',
    coverImage: tournamentPhotos[20]?.src || tournamentPhotos[8]?.src,
    icon: 'MapPin',
    accentColor: 'from-emerald-400 to-teal-600',
    duration: 6000,
    slides: [
      {
        id: 'tour-slide-1',
        type: 'info',
        image: tournamentPhotos[20]?.src || tournamentPhotos[10]?.src,
        tagline: 'Spreading The Word Across The UK',
        title: 'Rallying The Ummah for Spitfire Close',
        description: 'The Langley Islamic Centre management and trustees frequently travel to partner mosques, community halls, and charity galas nationwide to raise funds for our permanent premises in Langley.',
        stats: [
          { label: 'Cities Visited', value: '8+' },
          { label: 'Mosques Partnered', value: '25+' },
          { label: 'Status', value: 'CIO #1180443' }
        ]
      },
      {
        id: 'tour-slide-2',
        type: 'timeline',
        image: tournamentPhotos[28]?.src || tournamentPhotos[14]?.src,
        tagline: 'Recent Appeal Stops',
        title: 'From Slough to London & The Midlands',
        stops: [
          { city: 'London & Heathrow Hubs', note: 'Friday Khutbah & Waqf Appeals' },
          { city: 'Birmingham & Midlands', note: 'Community Charity Dinners' },
          { city: 'Luton & Bedfordshire', note: 'Madrasah & Youth Sports Exchange' },
          { city: 'Slough & Langley', note: 'Local Business Partner Galas' }
        ],
        description: 'Every visit builds lifelong bridges of brotherhood and draws us closer to opening the doors of the full Spitfire Close complex.'
      },
      {
        id: 'tour-slide-3',
        type: 'charity-transparency',
        image: tournamentPhotos[26]?.src || tournamentPhotos[18]?.src,
        tagline: '100% Financial Accountability',
        title: 'Charity Commission Verified (1180443)',
        description: 'Langley Islamic Centre is an officially registered Charitable Incorporated Organisation (CIO) in England and Wales. All donations are accounted for with full governance and transparency.',
        charityNumber: '1180443',
        charityUrl: 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5128534/contact-information',
        facebookUrl: 'https://www.facebook.com/LangleyIslamicCentre/?locale=en_GB'
      }
    ]
  },
  {
    id: 'spitfire-vision',
    title: 'The Permanent Home',
    subtitle: 'Spitfire Close Hub',
    category: 'Future Sanctuary',
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
        tagline: 'A Multi-Generational Legacy',
        title: 'Spitfire Close, Langley, Slough SL3 8GY',
        description: 'A purpose-designed sanctuary featuring 5-daily prayer facilities, sister suites, youth recreational zones, and classrooms for Quranic recitation and memorisation.',
        stats: [
          { label: 'Capacity', value: '600+ Worshippers' },
          { label: 'Location', value: 'Spitfire Close' },
          { label: 'Postcode', value: 'SL3 8GY' }
        ]
      },
      {
        id: 'spitfire-slide-2',
        type: 'action',
        image: '/src/assets/SpitFireSlider.jpg',
        tagline: 'Leave Your Sadaqah Jariyah',
        title: 'Be A Foundation Builder Today',
        description: '“Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.” Join hundreds of families contributing to the Waqf fund.',
        ctaText: 'Set Up Standing Order',
        ctaAction: 'standingOrder'
      }
    ]
  }
];

export const sponsorDetails = {
  name: 'Biryaniwala',
  fullName: 'Biryaniwala Slough (Official Event Sponsor)',
  tagline: 'Authentic Hyderabadi & Subcontinental Cuisine',
  address: '308 High Street, Slough, Berkshire, SL1 1NB',
  role: 'Official Title Sponsor • Langley Islamic Centre Charity Football Cup 2026',
  badge: 'Official Community Partner',
  highlights: [
    'Title sponsor for youth & adult grassroots football tournament',
    'Provided catering & hot food for players, referees & volunteers',
    'Proud local Langley & Slough business actively investing in youth'
  ],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Biryaniwala+308+High+Street+Slough',
  menuHighlights: ['Hyderabadi Dum Biryani', 'Chicken 65', 'Seekh Kebabs', 'Special Catering for Community & Charity Events']
};
