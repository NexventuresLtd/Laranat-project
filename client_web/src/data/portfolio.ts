export type PortfolioCategory = "Comics" | "Books" | "Illustrations";

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: PortfolioCategory;
  /** Optional: link to comic id in comicsData */
  comicId?: number;
  /** Optional: artist id for credit */
  artistId?: number;
}

export const PORTFOLIO_CATEGORIES: { id: string; label: PortfolioCategory }[] = [
  { id: "comics", label: "Comics" },
  { id: "books", label: "Books" },
  { id: "illustrations", label: "Illustrations" },
];

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Mystic Shadows – Cover & interiors",
    description:
      "Cover art and sample spreads for the fantasy series. Pencil, ink, and digital color.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop",
    category: "Comics",
    comicId: 1,
    artistId: 1,
  },
  {
    id: 2,
    title: "Archangel's War – Key art",
    description:
      "Key visual and promotional artwork for the action series. Celestial themes and dynamic composition.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    category: "Comics",
    comicId: 2,
    artistId: 2,
  },
  {
    id: 3,
    title: "The Silent Patient – Cover design",
    description:
      "Atmospheric cover design for the psychological thriller. Typography and mood-driven illustration.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    category: "Books",
    comicId: 3,
    artistId: 1,
  },
  {
    id: 4,
    title: "Dune – Concept illustrations",
    description:
      "Desert world and character concept art. Sand, scale, and atmosphere studies.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    category: "Illustrations",
    comicId: 4,
    artistId: 2,
  },
  {
    id: 5,
    title: "The Alchemist – Illustrated edition",
    description:
      "Illustrated edition spreads and decorative elements. Journey and symbolism.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    category: "Books",
    comicId: 5,
    artistId: 3,
  },
  {
    id: 6,
    title: "1984 – Propaganda-style posters",
    description:
      "In-world propaganda and poster designs. Dystopian typography and limited palette.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop",
    category: "Illustrations",
    comicId: 6,
    artistId: 3,
  },
  {
    id: 7,
    title: "Studio project – Character lineup",
    description:
      "Character design lineup for an original IP. Diverse cast and costume studies.",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop",
    category: "Illustrations",
    artistId: 1,
  },
  {
    id: 8,
    title: "Published comic – First issue sample",
    description:
      "First-issue sample pages: layout, lettering, and color. Published series sample.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop",
    category: "Comics",
    artistId: 2,
  },
  {
    id: 9,
    title: "Design samples – Brand & merch",
    description:
      "Brand assets and merchandise mockups. Logos, pins, and apparel designs.",
    image: "https://images.unsplash.com/photo-1561070791-2526d31cc5b5?q=80&w=1000&auto=format&fit=crop",
    category: "Illustrations",
    artistId: 3,
  },
];
