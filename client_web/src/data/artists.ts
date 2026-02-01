export interface ArtistSocialLinks {
  website?: string;
  twitter?: string;
  instagram?: string;
  artstation?: string;
}

export interface Artist {
  id: number;
  name: string;
  penName: string;
  shortBio: string;
  profileImage: string;
  /** Genres or skills (e.g. Fantasy, Cover Art, Character Design) */
  genres: string[];
  /** Comic IDs from comicsData – their published works */
  comicIds: number[];
  socialLinks: ArtistSocialLinks;
}

export const artistsData: Artist[] = [
  {
    id: 1,
    name: "Elena Moreau",
    penName: "E. Moreau",
    shortBio:
      "Illustrator and comic artist. Loves fantasy, moody lighting, and character-driven stories. Published with Lanart21 since 2020.",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    genres: ["Fantasy", "Cover Art", "Character Design", "Comics"],
    comicIds: [1, 3],
    socialLinks: {
      website: "https://example.com/elenamoreau",
      twitter: "https://twitter.com/elenamoreau",
      instagram: "https://instagram.com/elenamoreau",
      artstation: "https://artstation.com/elenamoreau",
    },
  },
  {
    id: 2,
    name: "Nalini Singh",
    penName: "N. Singh",
    shortBio:
      "Action and sci-fi specialist. Key art, concept design, and sequential storytelling. Archangel's War lead artist.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    genres: ["Action", "Sci-Fi", "Key Art", "Sequential Art"],
    comicIds: [2, 4],
    socialLinks: {
      website: "https://example.com/nalinisingh",
      instagram: "https://instagram.com/nalinisingh",
      artstation: "https://artstation.com/nalinisingh",
    },
  },
  {
    id: 3,
    name: "Alex Rivera",
    penName: "A. Rivera",
    shortBio:
      "Designer and illustrator. Philosophical and dystopian themes. Typography, posters, and illustrated editions.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    genres: ["Illustration", "Typography", "Poster Design", "Dystopian"],
    comicIds: [5, 6],
    socialLinks: {
      website: "https://example.com/alexrivera",
      twitter: "https://twitter.com/alexrivera",
      instagram: "https://instagram.com/alexrivera",
    },
  },
];
