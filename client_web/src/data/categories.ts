/**
 * Comic categories (genres) for navbar and bookstore filter.
 */
export const COMIC_CATEGORIES = [
  { id: "all", label: "All", slug: "" },
  { id: "fantasy", label: "Fantasy", slug: "Fantasy" },
  { id: "action", label: "Action", slug: "Action" },
  { id: "mystery", label: "Mystery", slug: "Mystery" },
  { id: "sci-fi", label: "Sci-Fi", slug: "Sci-Fi" },
  { id: "psychological-thriller", label: "Psychological Thriller", slug: "Mystery" },
  { id: "philosophical-fiction", label: "Philosophical Fiction", slug: "Philosophical Fiction" },
  { id: "dystopian", label: "Dystopian", slug: "Dystopian" },
] as const;

/** Genres for filter sidebar (checkbox list). slug matches comic.genre. */
export const FILTER_GENRES = [
  { id: "mystery", label: "Mystery", slug: "Mystery" },
  { id: "fantasy", label: "Fantasy", slug: "Fantasy" },
  { id: "psychological-thriller", label: "Psychological Thriller", slug: "Mystery" },
  { id: "sci-fi", label: "Science Fiction", slug: "Sci-Fi" },
  { id: "philosophical-fiction", label: "Philosophical Fiction", slug: "Philosophical Fiction" },
  { id: "dystopian", label: "Dystopian", slug: "Dystopian" },
  { id: "action", label: "Action", slug: "Action" },
] as const;

export type CategoryId = (typeof COMIC_CATEGORIES)[number]["id"];
export type GenreSlug = (typeof COMIC_CATEGORIES)[number]["slug"];
