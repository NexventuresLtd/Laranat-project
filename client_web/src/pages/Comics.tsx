import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Globe,
  Star,
  Hash,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { comicsData, type Comic } from "../data/comics";
import { FILTER_GENRES } from "../data/categories";

/** Unique genres for "Browse by genre" cards (slug + label), with count from comicsData */
const GENRE_CARDS = [
  { id: "fantasy", label: "Fantasy", slug: "Fantasy" },
  { id: "action", label: "Action", slug: "Action" },
  { id: "mystery", label: "Mystery", slug: "Mystery" },
  { id: "sci-fi", label: "Science Fiction", slug: "Sci-Fi" },
  { id: "philosophical-fiction", label: "Philosophical", slug: "Philosophical Fiction" },
  { id: "dystopian", label: "Dystopian", slug: "Dystopian" },
] as const;

function getGenreCount(slug: string): number {
  return comicsData.filter((c) => c.genre === slug).length;
}

interface ComicsProps {
  darkMode: boolean;
}

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="text-orange-500">{icon}</div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

function ComicCard({
  comic,
  darkMode,
  onSelect,
}: {
  comic: Comic;
  darkMode: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all ${
        darkMode ? "bg-slate-800" : "bg-white border border-slate-200"
      }`}
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={comic.cover}
          alt={comic.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className={`p-4 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
        <h3 className={`font-bold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>
          {comic.title}
        </h3>
        <p className={`text-sm truncate ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          {comic.author}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400">
            {comic.genre}
          </span>
          <span className={`font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
            {comic.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Comics({ darkMode }: ComicsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredComics = useMemo(() => {
    let list = [...comicsData];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)
      );
    }
    if (selectedGenres.size > 0) {
      const slugs = new Set<string>(
        FILTER_GENRES.filter((g) => selectedGenres.has(g.id)).map((g) => g.slug)
      );
      list = list.filter((c) => slugs.has(c.genre));
    }
    return list;
  }, [searchQuery, selectedGenres]);

  const featuredComics = useMemo(() => filteredComics.slice(0, 6), [filteredComics]);
  const selectedComic =
    selectedIndex !== null && filteredComics[selectedIndex]
      ? filteredComics[selectedIndex]
      : null;

  const toggleGenre = (id: string) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < filteredComics.length - 1)
      setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto pt-24">
        {/* Page title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-orange-500 mb-2">
          Comics
        </h1>
        <p className={`text-lg mb-8 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          All comics and books. Filter below and click any book to view details.
        </p>

        {/* Browse by genre */}
        <section className="mb-10">
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Browse by genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {GENRE_CARDS.map((g) => {
              const count = getGenreCount(g.slug);
              const isActive = selectedGenres.has(g.id);
              return (
                <motion.button
                  key={g.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setSelectedGenres(isActive ? new Set() : new Set([g.id]))
                  }
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-orange-500 bg-orange-500/10"
                      : darkMode
                        ? "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        : "border-slate-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <span
                    className={`block font-bold truncate ${
                      isActive ? "text-orange-500" : darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {g.label}
                  </span>
                  <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {count} {count === 1 ? "book" : "books"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Filters */}
        <div
          className={`mb-10 p-4 rounded-2xl ${
            darkMode ? "bg-slate-800/50" : "bg-white border border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 text-orange-500 font-bold mb-4">
            <Filter size={18} />
            <span>Filter</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border ${
                  darkMode
                    ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_GENRES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => toggleGenre(g.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedGenres.has(g.id)
                      ? "bg-orange-500 text-white"
                      : darkMode
                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedComic ? (
            /* Detail view */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 mb-16"
            >
              {selectedIndex! > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="absolute top-1/2 left-4 -translate-y-1/2 z-50 p-3 bg-orange-500 text-white rounded-full shadow-lg"
                >
                  <ChevronLeft size={32} />
                </motion.button>
              )}

              <div className="flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden w-full md:w-4/5">
                <div className="w-full md:w-1/2 aspect-[2/3]">
                  <img
                    src={selectedComic.cover}
                    alt={selectedComic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                  <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                    {selectedComic.title}
                  </h2>
                  <p className="text-xl text-orange-500 font-medium mb-6 italic">
                    {selectedComic.author}
                  </p>
                  <p
                    className={`text-lg leading-relaxed mb-10 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {selectedComic.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <DetailItem
                      icon={<BookOpen size={20} />}
                      label="Genre"
                      value={selectedComic.genre}
                    />
                    <DetailItem
                      icon={<Globe size={20} />}
                      label="Language"
                      value={selectedComic.language}
                    />
                    <DetailItem
                      icon={<Clock size={20} />}
                      label="Status"
                      value={selectedComic.status}
                    />
                    <DetailItem
                      icon={<Star size={20} />}
                      label="Rating"
                      value={selectedComic.ageRating}
                    />
                    <DetailItem
                      icon={<Hash size={20} />}
                      label="Type"
                      value={selectedComic.type}
                    />
                    {selectedComic.type === "Series" && selectedComic.chapter != null && (
                      <DetailItem
                        icon={<Hash size={20} />}
                        label="Chapters"
                        value={String(selectedComic.chapter)}
                      />
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-6">
                    <span className="text-3xl font-black">{selectedComic.price}</span>
                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg"
                    >
                      Back to Grid
                    </button>
                  </div>
                </div>
              </div>

              {selectedIndex! < filteredComics.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute top-1/2 right-4 -translate-y-1/2 z-50 p-3 bg-orange-500 text-white rounded-full shadow-lg"
                >
                  <ChevronRight size={32} />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* All Comics grid – full list first */}
              <section className="mb-16">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  All Comics
                </h2>
                <p className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {filteredComics.length} {filteredComics.length === 1 ? "book" : "books"} – click any book to view details
                </p>
                {filteredComics.length === 0 ? (
                  <p className={`py-12 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    No comics match your filters.
                  </p>
                ) : (
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04 } },
                    }}
                  >
                    {filteredComics.map((comic, index) => (
                      <motion.div
                        key={comic.id}
                        variants={{
                          hidden: { opacity: 0, y: 16 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <ComicCard
                          comic={comic}
                          darkMode={darkMode}
                          onSelect={() => setSelectedIndex(index)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </section>

              {/* Featured Comics section – below All Comics */}
              <section>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  Featured Comics
                </h2>
                <p className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Handpicked for you
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                  {featuredComics.map((comic) => {
                    const index = filteredComics.indexOf(comic);
                    return (
                      <motion.div
                        key={`featured-${comic.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ComicCard
                          comic={comic}
                          darkMode={darkMode}
                          onSelect={() => setSelectedIndex(index)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* CTA – Book Store */}
              <section className="mt-16">
                <Link
                  to="/bookstore"
                  className={`block p-6 md:p-8 rounded-2xl text-center transition-all ${
                    darkMode
                      ? "bg-slate-800/80 border border-slate-700 hover:border-orange-500/50"
                      : "bg-white border-2 border-slate-200 hover:border-orange-400"
                  }`}
                >
                  <p className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Need more filters?
                  </p>
                  <p className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Use the Book Store to filter by price range and minimum rating.
                  </p>
                  <span className="inline-flex items-center gap-2 text-orange-500 font-bold">
                    Go to Book Store <ChevronRight size={18} />
                  </span>
                </Link>
              </section>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
