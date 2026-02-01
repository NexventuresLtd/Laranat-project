import { motion } from "framer-motion";
import { BookOpen, Users, Sparkles } from "lucide-react";

interface AboutUniqueProps {
  darkMode: boolean;
}

const highlights = [
  {
    icon: BookOpen,
    title: "Digital publishing done right",
    description:
      "We handle distribution, storefront, and discovery so your comics and books reach readers on the web and beyond—without the traditional gatekeepers.",
  },
  {
    icon: Users,
    title: "Artist empowerment",
    description:
      "Creators keep control of their work and get fair visibility. We invest in profiles, portfolios, and tools that help artists grow their audience and income.",
  },
  {
    icon: Sparkles,
    title: "Quality & diversity",
    description:
      "From fantasy and sci-fi to literary and dystopian, we curate and support a wide range of genres and styles so readers always find something that resonates.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutUnique({ darkMode }: AboutUniqueProps) {
  return (
    <section
      className={`py-24 ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      <div className="w-11/12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4 block">
            What makes us different
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
            What makes Lanart21 unique
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Digital publishing and artist empowerment at the heart of everything we do.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/50"
                  : "bg-slate-50 border-slate-200 hover:border-orange-500/40 shadow-md"
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mb-6 shadow-lg">
                <item.icon size={28} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                {item.title}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
