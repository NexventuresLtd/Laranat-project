import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

interface AboutMissionVisionProps {
  darkMode: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutMissionVision({ darkMode }: AboutMissionVisionProps) {
  return (
    <section
      className={`py-24 ${darkMode ? "bg-slate-900/50" : "bg-slate-100/80"}`}
    >
      <div className="w-11/12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Mission & Vision
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            What we stand for and where we’re headed.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`group p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 ${
              darkMode
                ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/50"
                : "bg-white border-slate-200 hover:border-orange-500/40 shadow-lg"
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-105 transition-transform">
              <Target size={26} strokeWidth={2} />
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Our Mission
            </h2>
            <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              To bring exceptional comics and illustrated books to readers everywhere
              through digital publishing that puts creators first. We build tools and
              visibility so artists can focus on their craft while reaching a global audience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`group p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 ${
              darkMode
                ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/50"
                : "bg-white border-slate-200 hover:border-orange-500/40 shadow-lg"
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-105 transition-transform">
              <Eye size={26} strokeWidth={2} />
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Our Vision
            </h2>
            <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              A world where every storyteller and artist has a fair path to publish and
              thrive. We aim to be the go-to platform for digital comics and illustrated
              books—empowering creators and delighting readers with diverse, high-quality work.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
