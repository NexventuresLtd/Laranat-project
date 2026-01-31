import { motion } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeCTAProps {
  darkMode: boolean;
}

export default function HomeCTA({ darkMode }: HomeCTAProps) {
  return (
    <section
      className={`relative z-10 py-24 ${darkMode ? "bg-slate-950" : "bg-slate-900"}`}
    >
      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 p-12 md:p-16 text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <BookOpen size={32} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Start reading today
                </h2>
                <p className="text-white/90 text-lg max-w-xl">
                  Create an account to unlock comics, track your progress, and get personalized recommendations.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
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
