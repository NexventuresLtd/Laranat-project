import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { comicsData, type Comic } from "../data/comics";

interface ComicsProps {
  darkMode: boolean;
}

function ComicCard({ comic, darkMode }: { comic: Comic; darkMode: boolean }) {
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
    </Link>
  );
}

export default function Comics({ darkMode }: ComicsProps) {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto pt-24">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-orange-500 mb-2">
          Comics
        </h1>
        <p className={`text-lg mb-12 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          All comics and books. Browse our full collection.
        </p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {comicsData.map((comic) => (
            <motion.div
              key={comic.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ComicCard comic={comic} darkMode={darkMode} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
