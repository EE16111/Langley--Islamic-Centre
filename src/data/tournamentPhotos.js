// Automatically load all photos from src/assets/stories/football-cup/
const photoModules = import.meta.glob('/src/assets/stories/football-cup/*.jpg', { eager: true, import: 'default' });

// Pitch and sport-only photos (ground, match action, squad in jerseys, medals, Biryaniwala tournament banner)
// cup-01: Team Slough Town with medals
// cup-02: Team in red on grass pitch
// cup-04: Pitch aerial panoramic view with players
// cup-14: Match action on the pitch
// cup-16: Tournament squad play
// cup-17: Youth football match
// cup-18: On-field tournament moment
// cup-20: Biryaniwala Official Tournament Banner on the pitch
// cup-21: Player action on grass
// cup-24: Tournament competitive play
// cup-25: Pitchside awards celebration
// cup-26: Grand trophy presentation ceremony
// cup-30: Matchday ground play
const pitchIndices = [1, 2, 4, 14, 16, 17, 18, 20, 21, 24, 25, 26, 30];

// Indoor fundraising appeals, £550k building campaign, partner mosques & volunteer delegations
// cup-03: Volunteer delegation at community centre
// cup-05: Volunteer team in high-vis vests
// cup-06: Night exterior of visiting mosque appeal
// cup-07: Management team around £550k Spitfire Close banner
// cup-08: Volunteer with official charity collection bucket
// cup-09: Community indoor gathering
// cup-10: London Islamic Cultural Centre visit
// cup-11: Official Waqf campaign presentation
// cup-12: Volunteer team selfie
// cup-13: Mosque appeal delegation
// cup-15: Friday Jumu'ah appeal delegation
// cup-19: Community supporters
// cup-22: £550k Waqf Appeal official banner with QR code & bank details
// cup-23: Mosque partner visit
// cup-27: 3rd floor project & Qardh-e-Hasanah ledger
// cup-28: Ramadan debt-free masjid appeal
// cup-29: Build Your House in Jannah appeal
// cup-31: Management appeal stop
// cup-32: Charity Commission #1180443 official bank transfer banner
const tourIndices = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 19, 22, 23, 27, 28, 29, 31, 32];

const getPhotoByNum = (num) => {
  const pad = String(num).padStart(2, '0');
  const path = `/src/assets/stories/football-cup/cup-${pad}.jpg`;
  return photoModules[path] || null;
};

export const tournamentPitchPhotos = pitchIndices
  .map(num => ({
    id: `pitch-${num}`,
    src: getPhotoByNum(num),
    num,
    alt: num === 20 ? 'Biryaniwala Official Tournament Sponsor Banner' : num === 26 ? 'Charity Cup Trophy Presentation' : num === 1 ? 'Slough Town FC Pitch - Team with Medals' : `Tournament Match Action #${num}`,
    tag: num === 20 ? 'Title Sponsor' : num === 1 || num === 26 ? 'Trophy & Medals' : num === 2 || num === 4 ? 'Squads' : 'Pitch Action',
    category: 'pitch'
  }))
  .filter(p => Boolean(p.src));

export const managementTourPhotos = tourIndices
  .map(num => ({
    id: `tour-${num}`,
    src: getPhotoByNum(num),
    num,
    alt: num === 7 || num === 22 || num === 32 ? '£550k Urgent Waqf Building Appeal Banner' : num === 8 ? 'Volunteer with Charity Donation Bucket' : num === 10 ? 'London Islamic Cultural Centre Visit' : `Management Fundraising Appeal #${num}`,
    tag: num === 8 ? 'Collections' : num === 7 || num === 22 || num === 32 ? '£550k Appeal' : num === 10 || num === 6 ? 'Mosque Visits' : 'Delegation',
    category: 'tour'
  }))
  .filter(p => Boolean(p.src));

// All photos backward compatibility
export const tournamentPhotos = [...tournamentPitchPhotos, ...managementTourPhotos];
