import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  portfolioData,
  PORTFOLIO_CATEGORIES,
  type PortfolioItem,
  type PortfolioCategory,
} from "../data/portfolio";
import { artistsData, type Artist } from "../data/artists";

interface PortfolioProps {
  darkMode: boolean;
}

function PortfolioCard({
  item,
  darkMode,
  onViewDetails,
}: {
  item: PortfolioItem;
  darkMode: boolean;
  onViewDetails: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all ${
        darkMode ? "bg-slate-800" : "bg-white border border-slate-200"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
          >
            View details
          </button>
        </div>
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold ${
            darkMode ? "bg-slate-900/90 text-orange-400" : "bg-white/90 text-orange-600"
          }`}
        >
          {item.category}
        </span>
      </div>
      <div className={`p-4 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
        <h3
          className={`font-bold line-clamp-2 ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          {item.title}
        </h3>
        <p
          className={`text-sm line-clamp-2 mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function ArtistCard({ artist, darkMode }: { artist: Artist; darkMode: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl overflow-hidden shadow-lg transition-all ${
        darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"
      }`}
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-orange-500/50"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
              {artist.name}
            </h3>
            <p className={`text-sm italic ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              {artist.penName}
            </p>
            <p
              className={`mt-2 text-sm line-clamp-3 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              {artist.shortBio}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              {artist.genres.slice(0, 4).map((g) => (
                <span
                  key={g}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
            <Link
              to={`/artist/${artist.id}`}
              className="mt-4 inline-flex items-center gap-2 py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              <User size={18} />
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ darkMode }: PortfolioProps) {
  const [categoryFilter, setCategoryFilter] = useState<PortfolioCategory | "All">("All");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredPortfolio = useMemo(() => {
    if (categoryFilter === "All") return portfolioData;
    return portfolioData.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const selectedItem =
    selectedItemIndex !== null && filteredPortfolio[selectedItemIndex]
      ? filteredPortfolio[selectedItemIndex]
      : null;

  const handlePrev = () => {
    if (selectedItemIndex !== null && selectedItemIndex > 0)
      setSelectedItemIndex(selectedItemIndex - 1);
  };

  const handleNext = () => {
    if (
      selectedItemIndex !== null &&
      selectedItemIndex < filteredPortfolio.length - 1
    )
      setSelectedItemIndex(selectedItemIndex + 1);
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
          Portfolio
        </h1>
        <p
          className={`text-lg mb-10 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Studio projects, published comics & books, cover art, and design samples.
        </p>

        {/* Portfolio Showcase */}
        <section id="portfolio-showcase" className="mb-20">
          <h2
            className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Portfolio Showcase
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => setCategoryFilter("All")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                categoryFilter === "All"
                  ? "bg-orange-500 text-white"
                  : darkMode
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryFilter(c.label)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  categoryFilter === c.label
                    ? "bg-orange-500 text-white"
                    : darkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedItem ? (
              /* Detail view */
              <motion.div
                key="detail-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 mb-16"
              >
                {selectedItemIndex! > 0 && (
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
                  <div className="w-full md:w-1/2 aspect-[4/3]">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <span
                      className={`text-sm font-bold uppercase tracking-widest text-orange-500 mb-2`}
                    >
                      {selectedItem.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                      {selectedItem.title}
                    </h2>
                    <p
                      className={`text-lg leading-relaxed flex-1 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {selectedItem.description}
                    </p>
                    <div className="mt-8 flex items-center justify-between gap-6">
                      {selectedItem.comicId && (
                        <Link
                          to="/comics"
                          className="text-orange-500 font-bold hover:underline"
                        >
                          See in Comics →
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedItemIndex(null)}
                        className="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
                      >
                        Back to Grid
                      </button>
                    </div>
                  </div>
                </div>

                {selectedItemIndex! < filteredPortfolio.length - 1 && (
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
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPortfolio.map((item, index) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    darkMode={darkMode}
                    onViewDetails={() => setSelectedItemIndex(index)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredPortfolio.length === 0 && !selectedItem && (
            <p className={`py-12 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              No portfolio items in this category.
            </p>
          )}
        </section>

        {/* Artists Section */}
        <section id="artists" className="mb-16">
          <h2
            className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Artists
          </h2>
          <p
            className={`text-sm mb-8 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Meet the creators behind our comics and illustrations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistsData.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} darkMode={darkMode} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <Link
            to="/comics"
            className={`block p-6 md:p-8 rounded-2xl text-center transition-all ${
              darkMode
                ? "bg-slate-800/80 border border-slate-700 hover:border-orange-500/50"
                : "bg-white border-2 border-slate-200 hover:border-orange-400"
            }`}
          >
            <p
              className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Explore all comics
            </p>
            <p
              className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Browse our full comics and books collection.
            </p>
            <span className="inline-flex items-center gap-2 text-orange-500 font-bold">
              Go to Comics <ChevronRight size={18} />
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
