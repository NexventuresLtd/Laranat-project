import { motion } from "framer-motion";
import { LayoutGrid, Users, BookOpen, PenTool, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface OurServicesProps {
  darkMode: boolean;
}

const services = [
  {
    title: "Portfolio",
    description: "Explore our studio work and creative projects.",
    icon: LayoutGrid,
    path: "/about",
    accent: "from-orange-500 to-amber-500",
  },
  {
    title: "Artist Profiles",
    description: "Meet the artists behind Lanart21 and their work.",
    icon: Users,
    path: "/about",
    accent: "from-rose-500 to-pink-500",
  },
  {
    title: "Digital Bookstore",
    description: "Browse and buy comics and books online.",
    icon: BookOpen,
    path: "/comics",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    title: "Creative Studio",
    description: "Publishing, storytelling, and digital media.",
    icon: PenTool,
    path: "/about",
    accent: "from-violet-500 to-purple-600",
  },
];

export default function OurServices({ darkMode }: OurServicesProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
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

  return (
    <section
      className={`relative z-10 py-24 ${darkMode ? "bg-slate-900/50" : "bg-slate-100"}`}
    >
      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Our Services
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Showcasing creativity, publishing stories, empowering artists and readers.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link
                  to={service.path}
                  className={`block p-8 rounded-2xl border-2 transition-all duration-300 h-full ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10"
                      : "bg-white border-slate-200 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.accent} text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {service.description}
                  </p>
                  <span className="text-orange-500 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={16} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
