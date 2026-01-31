import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { comicsData, type Comic } from "../data/comics";
import { COMIC_CATEGORIES } from "../data/categories";

interface BookstoreProps {
  darkMode: boolean;
}

function ComicCard({
  comic,
  darkMode,
}: {
  comic: Comic;
  darkMode: boolean;
}) {
  return (
    <Link to="/#featured-comics">
      <motion.div
        whileHover={{ y: -8 }}
        className={`group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg transition-all ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="aspect-[2/3] overflow-hidden relative">
          <img
            src={comic.cover}
            alt={comic.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1 text-white/70 mb-1">
              <Star size={14} className="text-orange-400 fill-orange-400" />
              <span className="text-xs font-bold">{comic.title}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60 mb-2">
              <User size={14} />
              <span className="text-[10px] uppercase tracking-wider">{comic.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-black">{comic.price}</span>
              <span className="text-white/60 text-xs">{comic.genre}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Bookstore({ darkMode }: BookstoreProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const activeGenre =
    COMIC_CATEGORIES.find((c) => c.id === categoryParam)?.slug ?? "";

  const filteredComics =
    activeGenre === ""
      ? comicsData
      : comicsData.filter((c) => c.genre === activeGenre);

  const setCategory = (id: string) => {
    if (id === "all") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: id });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-orange-50/30 text-slate-900"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto pt-24">
        <h1 className="text-4xl font-black tracking-tight italic mb-4">
          Bookstore
        </h1>
        <p className={`text-lg mb-10 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Browse comics by category. Choose a type below to filter.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {COMIC_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                (cat.id === "all" && !categoryParam) || (cat.id === categoryParam)
                  ? "bg-orange-500 text-white shadow-lg"
                  : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredComics.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              No comics in this category yet.
            </motion.p>
          ) : (
            <motion.div
              key={activeGenre}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {filteredComics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} darkMode={darkMode} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
