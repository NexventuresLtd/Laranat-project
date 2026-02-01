import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { comicsData } from "../../data/comics";

interface NewReadingsProps {
  darkMode: boolean;
}

export default function NewReadings({ darkMode }: NewReadingsProps) {
  const displayComics = comicsData.slice(0, 6);

  return (
    <section
      id="new-readings"
      className={`relative z-10 py-24 ${darkMode ? "bg-slate-900/50" : "bg-slate-100/80"}`}
    >
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
              New Readings
            </h2>
            <p className={`max-w-xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Fresh comics and books—browse by category or view all in the bookstore.
            </p>
          </div>
          <Link
            to="/comics"
            className="inline-flex items-center gap-2 text-orange-500 font-bold hover:underline shrink-0"
          >
            View All <ChevronRight size={18} />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {displayComics.map((comic) => (
            <motion.div
              key={comic.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to="/comics" className="block group">
                <div
                  className={`aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] ${
                    darkMode ? "ring-1 ring-slate-700" : "ring-1 ring-slate-200"
                  }`}
                >
                  <img
                    src={comic.cover}
                    alt={comic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className={`mt-2 font-semibold text-sm truncate ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                  {comic.title}
                </p>
                <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                  {comic.author}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
