import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Globe,
  Star,
  Hash,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { comicsData, type Comic } from "../../data/comics";

interface FeaturedComicsProps {
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

const ComicCard = ({
  comic,
  darkMode,
  onSelect,
}: {
  comic: Comic;
  darkMode: boolean;
  onSelect: () => void;
}) => (
  <motion.div
    layoutId={`card-${comic.id}`}
    whileHover={{ y: -8 }}
    onClick={onSelect}
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
        </div>
      </div>
    </div>
  </motion.div>
);

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedComics({ darkMode }: FeaturedComicsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedComic = selectedIndex !== null ? comicsData[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < comicsData.length - 1)
      setSelectedIndex(selectedIndex + 1);
  };

  return (
    <section id="featured-comics" className="relative z-10 py-24 bg-inherit">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Featured Comics
            </h2>
            <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
              Handpicked for you
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedComic ? (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10"
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
                    {selectedComic.type === "Series" && (
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

              {selectedIndex! < comicsData.length - 1 && (
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {comicsData.map((comic, index) => (
                <motion.div key={comic.id} variants={cardVariants}>
                  <ComicCard
                    comic={comic}
                    darkMode={darkMode}
                    onSelect={() => setSelectedIndex(index)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
