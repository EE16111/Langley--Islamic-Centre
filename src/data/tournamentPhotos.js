// Automatically load all tournament photos from src/assets/stories/football-cup/
const photoModules = import.meta.glob('/src/assets/stories/football-cup/*.jpg', { eager: true, import: 'default' });

export const tournamentPhotos = Object.entries(photoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    id: `photo-${index + 1}`,
    src,
    alt: `Langley Islamic Centre Charity Football Cup 2026 - Moment ${index + 1}`,
    tag: index === 0 ? 'Kickoff' : index === 19 ? 'Team Lineup' : index === 25 ? 'Trophy Presentation' : 'Match Action'
  }));
