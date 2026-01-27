import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";


interface NewArrivalsProps {
  darkMode: boolean;
}

export default function NewArrivals({ darkMode }: NewArrivalsProps) {
  // Motion variants for staggered children
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative z-10 py-24 bg-inherit">
      <div className="w-11/12 mx-auto">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">New Arrivals</h2>
            <p className="opacity-70">Fresh from the studio</p>
          </div>
          <button className="text-orange-500 font-bold hover:tracking-wide transition-all flex items-center gap-1">
            View All Collections <ChevronRight size={16} />
          </button>
        </div>

        {/* Grid of new arrivals */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl ${
                darkMode ? "bg-slate-900/50" : "bg-slate-100"
              }`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 z-10 opacity-90 transition-opacity group-hover:opacity-100
                ${darkMode 
                  ? "bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
                  : "bg-gradient-to-t from-white/30 via-white/10 to-transparent"
                }`} 
              />

              {/* Image */}
              <img
                src={`https://ccdn.lezhin.com/v2/comics/6509376108298240/images/tall.jpg?updated=1743737402527&width=840`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={`Cover ${i}`}
              />

              {/* Text overlay */}
              <motion.div 
                className="absolute bottom-6 left-6 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-2 drop-shadow-md">
                  Episode {i}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                  The Lost in the  Cloud: Volume {i}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
