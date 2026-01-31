export interface Comic {
  id: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  language: string;
  status: "Ongoing" | "Completed";
  cover: string;
  type: "Series" | "One-shot";
  ageRating: string;
  chapter?: number;
  price: string;
}

export const comicsData: Comic[] = [
  {
    id: 1,
    title: "Mystic Shadows",
    description:
      "A soul-stirring journey through the ethereal realms where shadows whisper ancient secrets and magic comes at a price.",
    author: "Elena Moreau",
    genre: "Fantasy",
    language: "English",
    status: "Ongoing",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop",
    type: "Series",
    ageRating: "13+",
    chapter: 24,
    price: "$24.99",
  },
  {
    id: 2,
    title: "Archangel's War",
    description:
      "An epic battle of celestial beings that reshapes the boundaries between heaven and earth. High stakes and divine intervention.",
    author: "Nalini Singh",
    genre: "Action",
    language: "English",
    status: "Completed",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    type: "Series",
    ageRating: "16+",
    chapter: 150,
    price: "$29.99",
  },
  {
    id: 3,
    title: "The Silent Patient",
    description:
      "A woman shoots her husband five times and then never speaks another word. A criminal psychotherapist is determined to uncover her motive.",
    author: "Alex Michaelides",
    genre: "Mystery",
    language: "English",
    status: "Completed",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    type: "One-shot",
    ageRating: "18+",
    price: "$22.50",
  },
  {
    id: 4,
    title: "Dune",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    language: "English",
    status: "Ongoing",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmN4MkhG7lgAXTANxXnkyE48z3oB53rPuwZA&s",
    type: "Series",
    ageRating: "13+",
    chapter: 12,
    price: "$19.99",
  },
];
