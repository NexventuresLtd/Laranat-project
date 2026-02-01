import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { comicsData, type Comic } from "../data/comics";
import { FILTER_GENRES } from "../data/categories";

interface BookstoreProps {
  darkMode: boolean;
}

function parsePrice(priceStr: string): number {
  const n = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

const RATING_OPTIONS = [
  { value: "", label: "All Ratings" },
  { value: "13+", label: "13+" },
  { value: "16+", label: "16+" },
  { value: "18+", label: "18+" },
];

function ComicCard({
  comic,
  darkMode,
  viewMode,
}: {
  comic: Comic;
  darkMode: boolean;
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <Link to="/#featured-comics" className="block">
        <motion.div
          whileHover={{ x: 4 }}
          className={`flex gap-4 p-4 rounded-xl transition-all ${
            darkMode ? "bg-slate-800/50 hover:bg-slate-800" : "bg-white hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <div className="w-20 aspect-[2/3] rounded-lg overflow-hidden shrink-0">
            <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>{comic.title}</h3>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{comic.author}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-orange-500/20 text-orange-600 dark:text-orange-400">
              {comic.genre}
            </span>
          </div>
          <div className={`font-black shrink-0 ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
            {comic.price}
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to="/#featured-comics" className="block">
      <motion.div
        whileHover={{ y: -6 }}
        className={`group rounded-2xl overflow-hidden shadow-lg transition-all ${
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
          <h3 className={`font-bold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>{comic.title}</h3>
          <p className={`text-sm truncate ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{comic.author}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400">
              {comic.genre}
            </span>
            <span className={`font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>{comic.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Bookstore({ darkMode }: BookstoreProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50);
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "price">("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAndSortedComics = useMemo(() => {
    let list = [...comicsData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)
      );
    }

    if (selectedGenres.size > 0) {
      const genreSlugs = new Set<string>(FILTER_GENRES.filter((g) => selectedGenres.has(g.id)).map((g) => g.slug));
      list = list.filter((c) => genreSlugs.has(c.genre));
    }

    list = list.filter((c) => {
      const p = parsePrice(c.price);
      return p >= priceMin && p <= priceMax;
    });

    if (minRating) {
      const order = ["13+", "16+", "18+"];
      const minIdx = order.indexOf(minRating);
      list = list.filter((c) => order.indexOf(c.ageRating) >= minIdx);
    }

    if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }

    return list;
  }, [searchQuery, selectedGenres, priceMin, priceMax, minRating, sortBy]);

  const toggleGenre = (id: string) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Page title */}
      <div className="pt-24 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-orange-500">
          Book Store
        </h1>
      </div>

      <div className="w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - Filters */}
        <aside
          className={`lg:w-72 shrink-0 rounded-2xl p-6 h-fit ${
            darkMode ? "bg-slate-800/80" : "bg-orange-100/80"
          }`}
        >
          <div className="flex items-center gap-2 text-orange-500 font-bold mb-6">
            <Filter size={20} />
            <span>Filters</span>
          </div>

          {/* Genres */}
          <div className="mb-8">
            <h3 className={`font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Genres
            </h3>
            <div className="space-y-2">
              {FILTER_GENRES.map((g) => (
                <label
                  key={g.id}
                  className={`flex items-center gap-3 cursor-pointer ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.has(g.id)}
                    onChange={() => toggleGenre(g.id)}
                    className="w-4 h-4 rounded border-slate-400 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm">{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="mb-8">
            <h3 className={`font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Price Range
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
                className={`w-20 px-3 py-2 rounded-lg text-sm border ${
                  darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
                }`}
              />
              <span className={darkMode ? "text-slate-400" : "text-slate-500"}>–</span>
              <input
                type="number"
                min={0}
                max={100}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value) || 50)}
                className={`w-20 px-3 py-2 rounded-lg text-sm border ${
                  darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Minimum rating */}
          <div>
            <h3 className={`font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Minimum Rating
            </h3>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm border ${
                darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
              }`}
            >
              {RATING_OPTIONS.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top bar: search, sort, view toggle */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-xl ${
              darkMode ? "bg-slate-800/50" : "bg-white border border-slate-200"
            }`}
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
              />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border ${
                  darkMode ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "title" | "price")}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <option value="title">Sort by Title</option>
                <option value="price">Sort by Price</option>
              </select>
              <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 ${viewMode === "grid" ? "bg-orange-500 text-white" : darkMode ? "bg-slate-800 text-slate-400" : "bg-white text-slate-500"}`}
                  title="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 ${viewMode === "list" ? "bg-orange-500 text-white" : darkMode ? "bg-slate-800 text-slate-400" : "bg-white text-slate-500"}`}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Book grid / list */}
          <AnimatePresence mode="wait">
            {filteredAndSortedComics.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-center py-12 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                No books match your filters.
              </motion.p>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {filteredAndSortedComics.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} darkMode={darkMode} viewMode="grid" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {filteredAndSortedComics.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} darkMode={darkMode} viewMode="list" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
