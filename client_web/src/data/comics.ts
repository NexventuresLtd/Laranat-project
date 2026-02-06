export type ComicType = 'series' | 'one-shot';
export type ComicStatus = 'ongoing' | 'completed';

export interface Comic {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  language: string;
  status: ComicStatus;
  coverImage: string;
  type: ComicType;
  ageRating: string;
  chapterOrEpisode?: number;
}

export const sampleComics: Comic[] = [
  {
    id: '1',
    title: 'Echoes of the Lost City',
    description: 'A young explorer discovers an ancient city beneath the desert and must unravel its secrets before it falls into the wrong hands. A tale of adventure, mystery, and courage.',
    author: 'Lan Gabriel',
    genre: 'Adventure, Fantasy',
    language: 'English',
    status: 'ongoing',
    coverImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80',
    type: 'series',
    ageRating: '12+',
    chapterOrEpisode: 24,
  },
  {
    id: '2',
    title: 'One Day in Tokyo',
    description: 'A single day through the eyes of five strangers whose paths cross in unexpected ways. A one-shot story about connection and coincidence.',
    author: 'Sauveur',
    genre: 'Slice of Life, Drama',
    language: 'English',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    type: 'one-shot',
    ageRating: '16+',
  },
  {
    id: '3',
    title: 'Neon Shadows',
    description: 'In a cyberpunk metropolis, a hacker and a detective form an uneasy alliance to take down a corrupt corporation. Action-packed with a noir twist.',
    author: 'Jospine',
    genre: 'Sci-Fi, Action',
    language: 'English',
    status: 'ongoing',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    type: 'series',
    ageRating: '16+',
    chapterOrEpisode: 12,
  },
  {
    id: '4',
    title: 'The Last Letter',
    description: "A widow finds a bundle of unsent letters that reveal her husband's hidden life. A standalone graphic novel about love, loss, and truth.",
    author: 'Ciella',
    genre: 'Drama, Romance',
    language: 'English',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80',
    type: 'one-shot',
    ageRating: '12+',
  },
  {
    id: '5',
    title: 'Guardians of the Grove',
    description: 'A group of young guardians must protect the last magical forest from an industrial empire. Epic fantasy with environmental themes.',
    author: 'Lanart21 Studio',
    genre: 'Fantasy, Adventure',
    language: 'English',
    status: 'ongoing',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637ebb4acffe?w=600&q=80',
    type: 'series',
    ageRating: 'All Ages',
    chapterOrEpisode: 8,
  },
  {
    id: '6',
    title: 'Midnight Run',
    description: 'A delivery driver gets tangled in a single night of chaos across the city. One-shot action comedy with a heart.',
    author: 'Sauveur',
    genre: 'Action, Comedy',
    language: 'English',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=600&q=80',
    type: 'one-shot',
    ageRating: '12+',
  },
];

export function getComicById(id: string): Comic | undefined {
  return sampleComics.find((c) => c.id === id);
}

export function getPrevComicId(currentId: string): string | null {
  const index = sampleComics.findIndex((c) => c.id === currentId);
  if (index <= 0) return null;
  return sampleComics[index - 1].id;
}

export function getNextComicId(currentId: string): string | null {
  const index = sampleComics.findIndex((c) => c.id === currentId);
  if (index < 0 || index >= sampleComics.length - 1) return null;
  return sampleComics[index + 1].id;
}
