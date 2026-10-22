export const LIC_DATA = {
  name: "Langley Islamic Centre",
  shortName: "LIC",
  charityNumber: "1180443",
  motto: "A place of worship and Islamic education in Slough",
  tagline: "A welcoming place to learn, connect, grow and contribute together.",
  subtagline: "LIC is a community organisation rooted in faith, bringing people of all ages together through education, youth development, wellbeing, family activities, volunteering, social programmes and community initiatives.",
  
  location: {
    address: "Spitfire Close, Langley, Slough",
    postcode: "SL3 8GY",
    borough: "Slough, Berkshire",
    lat: 51.5074,
    lng: -0.5422,
    hours: "13:00 – 19:00 hrs daily",
    phone: "078 4373 2106",
    email: "info@langleyislamiccentre.co.uk",
    website: "https://langleyislamiccentre.co.uk",
    announcement: "Alhamdulillah, we have secured a deal for a permanent location for the Langley Islamic Centre at Spitfire Close, Langley, SL3 8GY. This centre will be a hub for worship, education, and community services, Insha’Allah."
  },

  bankDetails: {
    bank: "HSBC",
    accountName: "Langley Islamic Centre",
    accountNumber: "0249 4973",
    sortCode: "40-42-08"
  },

  urgentAppeal: {
    target: 800000,
    raised: 250000,
    remaining: 550000,
    percentage: 31.25,
    highlight: "So far, we have raised £250,000, and we need your support to raise the remaining £550,000 urgently.",
    ayah: {
      arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
      english: "The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears; in every ear is a hundred grains.",
      surah: "Surah Al-Baqarah: 261"
    }
  },

  donationTiers: [
    {
      id: "full-saff",
      name: "Full Saff (Row)",
      amount: 10000,
      description: "Sponsor an entire prayer row in the new masjid hall. Continuous Sadaqah Jariyah for every worshipper.",
      stripeUrl: "https://buy.stripe.com/9AQ6pW4w34cx2qcbIO",
      popular: false,
      badge: "Premier Saff"
    },
    {
      id: "half-saff",
      name: "Half Saff (Row)",
      amount: 5000,
      description: "Sponsor half a prayer row in our permanent prayer hall at Spitfire Close.",
      stripeUrl: "https://buy.stripe.com/7sI9C83rZ24pfcY008",
      popular: false,
      badge: "Major Sponsor"
    },
    {
      id: "musallah",
      name: "Donate Musalahs",
      amount: 1000,
      monthlyOption: 83.33,
      description: "Sponsor individual prayer spaces. Every Sajdah performed here will weigh heavily on your scales.",
      stripeUrl: "https://buy.stripe.com/dR629G7If9wRfcYcMR",
      popular: true,
      badge: "Most Popular"
    },
    {
      id: "family-challenge",
      name: "Family Challenge",
      amount: 500,
      monthlyOption: 41.66,
      description: "Join hands as a family to gift a permanent contribution to the house of Allah.",
      stripeUrl: "https://www.launchgood.com/communitypage/urgent_appeal_550000_required_for_masjid_in_langley#!/community/urgent_appeal_550000_required_for_masjid_in_langley/",
      isLaunchGood: true,
      popular: false,
      badge: "Family Pledge"
    },
    {
      id: "bricks",
      name: "Donate Bricks",
      amount: 100,
      description: "Build brick-by-brick. Lay the physical and spiritual foundations of the permanent centre.",
      stripeUrl: "https://buy.stripe.com/aEU6pWbYv6kFd4QbIM",
      popular: false,
      badge: "Foundation"
    },
    {
      id: "youth-challenge",
      name: "Youth Challenge",
      amount: 50,
      description: "Empower our young community members to participate directly in building their future hub.",
      stripeUrl: "https://buy.stripe.com/3csdSogeLeRbe8U4gj",
      popular: false,
      badge: "Youth Spark"
    },
    {
      id: "small-step",
      name: "Small Step Big Impact",
      amount: 20,
      description: "No amount is too small. Every pound brings us closer to securing the keys for future generations.",
      stripeUrl: "https://buy.stripe.com/eVa3dK0fN6kF6Gs28a",
      popular: false,
      badge: "Community"
    }
  ],

  // Recurring Monthly Sadaqah Jariyah Subscription Tiers (Auto Monthly Direct to HSBC)
  monthlySubscriptionTiers: [
    {
      id: "monthly-supporter",
      name: "Daily Sadaqah Club",
      amount: 10,
      frequency: "per month",
      perDay: "£0.33 / day",
      description: "Continuous daily charity that quietly builds your scales in the Akhirah automatically.",
      popular: false,
      badge: "Most Accessible",
      directDebitEligible: true
    },
    {
      id: "monthly-builder",
      name: "Community Sustainer",
      amount: 25,
      frequency: "per month",
      perDay: "£0.83 / day",
      description: "Covers monthly utilities, maintenance, and heating for the Spitfire Close permanent campus.",
      popular: false,
      badge: "Vital Support",
      directDebitEligible: true
    },
    {
      id: "monthly-quran-sponsor",
      name: "Sponsor a Quran Student",
      amount: 40,
      frequency: "per month",
      perDay: "£1.33 / day",
      description: "Directly funds tuition, books, and Tajweed teacher support for one young student at LIC.",
      popular: true,
      badge: "Education Hero",
      directDebitEligible: true
    },
    {
      id: "monthly-musalla-pledge",
      name: "1 Musalla Waqf (12-Mo Pledge)",
      amount: 83.33,
      frequency: "per month for 12 mos",
      perDay: "£2.74 / day",
      totalPledge: 1000,
      description: "Sponsor an entire permanent prayer space (£1,000 total) split into 12 effortless monthly payments.",
      popular: true,
      badge: "Waqf Endowment",
      directDebitEligible: true
    },
    {
      id: "monthly-patron",
      name: "Masjid Pillar Patron",
      amount: 100,
      frequency: "per month",
      perDay: "£3.33 / day",
      description: "High-impact monthly support accelerating mortgage payoff and building capital development.",
      popular: false,
      badge: "Pillar Patron",
      directDebitEligible: true
    }
  ],

  customDonationUrl: "https://donate.stripe.com/dR6dSoaUr7oJ1m84gg",
  launchGoodUrl: "https://www.launchgood.com/communitypage/urgent_appeal_550000_required_for_masjid_in_langley#!/community/urgent_appeal_550000_required_for_masjid_in_langley/",

  quranClasses: {
    title: "Nazira Quran & Tajweed",
    subtitle: "Helping our children build a strong foundation in Quran reading and Tajweed",
    motto: "Learn • Recite • Understand • Grow",
    monthlyFee: 40,
    standingOrderDate: "28th of previous month",
    eligibility: "Boys only (age 7 – 16). Girls' classes will be introduced at a later date.",
    note: "Hifz / Memorization is not currently offered as part of these classes.",
    sessions: [
      {
        id: "option1",
        label: "Option 1: Mon, Tue & Wed",
        days: ["Monday", "Tuesday", "Wednesday"],
        frequency: "3 days per week"
      },
      {
        id: "option2",
        label: "Option 2: Thu, Fri & Sat",
        days: ["Thursday", "Friday", "Saturday"],
        frequency: "3 days per week"
      }
    ],
    levels: [
      {
        name: "Beginner",
        time: "4:30pm – 5:30pm",
        focus: "Arabic alphabet, phonetics, Qaida, letter joining, vowel marks (Harakat) and basic pronunciation."
      },
      {
        name: "Intermediate",
        time: "5:30pm – 6:30pm",
        focus: "Fluent reading of Juz Amma, Tajweed fundamentals (Madd, Ghunnah, Qalqalah), and stop rules."
      },
      {
        name: "Advanced",
        time: "6:30pm – 7:30pm",
        focus: "Full Quran recitation with precise Makharij, advanced Tajweed mastery, and melodic recitation."
      }
    ],
    steps: [
      {
        step: 1,
        title: "Complete Registration Form",
        desc: "Provide student and parent details, preferred session (Mon-Wed or Thu-Sat), and current reading level."
      },
      {
        step: 2,
        title: "Teacher Assessment",
        desc: "The student will be assessed in-person by our qualified teacher to determine exact placement."
      },
      {
        step: 3,
        title: "Registration Confirmation",
        desc: "A place is offered based on assessment results and capacity. Submitting the form expresses interest."
      },
      {
        step: 4,
        title: "Set Up Monthly Standing Order",
        desc: "Set up a monthly Standing Order of £40 by the 28th of the previous month so fees are received in advance."
      },
      {
        step: 5,
        title: "Start Classes",
        desc: "Begin classes at the allocated timeslot with learning materials and Quran diary."
      }
    ],
    parkingRules: [
      "Use appropriate designated parking areas only",
      "Do not block resident driveways or emergency access routes",
      "Do not park on yellow lines or restricted parking bays",
      "Allow sufficient space for other parents, pedestrians and local neighbours",
      "Plan drop-off and collection in advance to avoid road congestion"
    ]
  },

  pillars: [
    {
      id: "youth",
      name: "Youth",
      icon: "Trophy",
      title: "Youth Development & Sports",
      description: "Creating a positive, welcoming and supportive environment where young people can connect, discover their potential and build lasting friendships.",
      activities: [
        "Youth Hub & Chillout Zones",
        "Sports Tournaments & Recreation",
        "One-on-One Mentoring",
        "Skills & Youth Leadership",
        "GCSE & A-Level Study Support",
        "Careers & Employability Guidance",
        "School Holiday Activity Camps"
      ],
      quote: "Helping our youth thrive in their faith, education, personal development and future careers."
    },
    {
      id: "sisters",
      name: "Women (Sisters)",
      icon: "HeartHandshake",
      title: "Sisters' Circle & Empowerment",
      description: "Creating a welcoming space where women can connect, learn, support one another and take an active, influential role in community life.",
      activities: [
        "Dedicated Sisters' Spiritual Programmes",
        "Women's Mental & Physical Well-being",
        "Learning & Professional Development",
        "Social Gatherings & Coffee Mornings",
        "Community Volunteering Drives",
        "Sisters Working Group Leadership"
      ],
      quote: "Empowering sisters to build meaningful connections and contribute skills and experience."
    },
    {
      id: "families",
      name: "Families & Children",
      icon: "Users",
      title: "Family Life & Children",
      description: "Supporting families to learn, connect and grow together within a warm, inclusive community.",
      activities: [
        "Children's Weekend Activities",
        "Community Family Fun Days",
        "Parenting Workshops & Advice",
        "Educational & Islamic Programmes",
        "Eid Family Celebrations",
        "School Holiday Explorers"
      ],
      quote: "From educational programmes to family outings, LIC helps families thrive together."
    },
    {
      id: "men",
      name: "Adults (Men)",
      icon: "Compass",
      title: "Men's Fellowship & Fitness",
      description: "Creating opportunities for men and adults to connect, stay active, and build strong community brotherhood.",
      activities: [
        "Weekly Football & Badminton Leagues",
        "Outdoor Hiking & Cycling Excursions",
        "Social Gatherings & Halaqahs",
        "Workshops & Skill Exchanges",
        "Charity Logistics Volunteering",
        "Civic Community Initiatives"
      ],
      quote: "Bringing men together to share experiences and play an active role in community welfare."
    },
    {
      id: "wellbeing",
      name: "Wellbeing & Support",
      icon: "ShieldAlert",
      title: "Pastoral Care & Mental Health",
      description: "Supporting individuals and families through life's challenges with compassion, confidentiality and practical guidance.",
      activities: [
        "Health & Wellness Awareness Clinics",
        "Faith-Sensitive Pastoral Counselling",
        "Emergency Community Support",
        "Elderly Care & Home Visit Check-ins",
        "Signposting & Legal/Welfare Advice",
        "Bereavement Support"
      ],
      quote: "A welcoming sanctuary where anyone can find comfort, guidance and support."
    },
    {
      id: "charity",
      name: "Charity & Outreach",
      icon: "Globe",
      title: "100% Donation Policy Worldwide",
      description: "Delivering 100% of your charitable contributions directly to those most in need locally in Slough and worldwide in disaster zones.",
      activities: [
        "100% Local and Global Aid Delivery",
        "Emergency Flood & Disaster Relief (e.g. Bangladesh)",
        "Winter Blankets & Food Parcels",
        "Local Slough Foodbank Partnerships",
        "Youth Volunteer Distribution Teams",
        "Water Well & Sanitation Sponsorship"
      ],
      quote: "Alongside building our masjid, we never forget our brothers and sisters facing hardship."
    }
  ],

  values: [
    { title: "Live by our faith", desc: "Grounding our lives and our work in the teachings of the Holy Qur'an, authentic Hadith and prophetic Sunnah." },
    { title: "Serve with sincerity", desc: "Putting the needs of others before ourselves, serving with deep compassion, humility, honesty and integrity." },
    { title: "Respect & value everyone", desc: "Treating all people with dignity, fairness, kindness and justice, regardless of age, background or ethnicity." },
    { title: "Build a connected community", desc: "Creating a welcoming environment where children, youth, families, women, men and elders grow together." },
    { title: "Encourage learning & growth", desc: "Championing lifelong Islamic learning, academic excellence, leadership development and practical skills." },
    { title: "Promote wellbeing & support", desc: "Standing by individuals through life's hardships, ensuring accessible guidance and compassionate care." },
    { title: "Give & volunteer", desc: "Nurturing generosity, charitable giving, selfless volunteering and active civic participation." },
    { title: "Create opportunities for all", desc: "Providing meaningful activities, sports, recreation, cultural events and programmes that unite us." },
    { title: "Lead with courage", desc: "Taking initiative, embracing positive change, and having the moral confidence to inspire and serve." },
    { title: "Be accountable to Allah", desc: "Remembering our ultimate accountability is before Allah SWT, striving to leave an enduring legacy." }
  ],

  jummah: {
    day: "Every Friday",
    khutbahTime: "13:15",
    jamaatCount: "Single Jamaat Only",
    note: "Please arrive early with Wudhu. Strictly observe parking guidelines around Spitfire Close."
  }
};
