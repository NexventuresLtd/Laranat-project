import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface AboutCTAProps {
  darkMode: boolean;
}

export default function AboutCTA({ darkMode }: AboutCTAProps) {
  return (
    <section
      className={`py-24 ${darkMode ? "bg-slate-950" : "bg-slate-100"}`}
    >
      <div className="w-11/12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 p-10 md:p-14 text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to collaborate with us?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
              Join our community, explore comics, or get in touch for creative projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold hover:bg-white/95 transition-all shadow-lg hover:scale-105"
              >
                Get Started <ChevronRight size={20} />
              </Link>
              <Link
                to="/#featured-comics"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/50 text-white font-bold hover:bg-white/10 transition-all"
              >
                Browse Comics
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
