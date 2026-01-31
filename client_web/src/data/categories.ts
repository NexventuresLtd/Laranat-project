/**
 * Comic categories (genres) for navbar and bookstore filter.
 * Derived from comics data; add new genres here when expanding catalog.
 */
export const COMIC_CATEGORIES = [
  { id: "all", label: "All", slug: "" },
  { id: "fantasy", label: "Fantasy", slug: "Fantasy" },
  { id: "action", label: "Action", slug: "Action" },
  { id: "mystery", label: "Mystery", slug: "Mystery" },
  { id: "sci-fi", label: "Sci-Fi", slug: "Sci-Fi" },
] as const;

export type CategoryId = (typeof COMIC_CATEGORIES)[number]["id"];
export type GenreSlug = (typeof COMIC_CATEGORIES)[number]["slug"];
