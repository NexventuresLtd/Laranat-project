import { motion } from "framer-motion";
import { Quote, User, BookOpen } from "lucide-react";

interface AboutTestimonialsProps {
  darkMode: boolean;
}

/** Sample testimonials for demo – clearly labeled as fictional. */
const artistQuotes = [
  {
    quote:
      "Lanart21 gave me a real home for my work. I finally have a place where readers can find my comics and I can focus on drawing instead of distribution.",
    name: "Elena M.",
    role: "Comics artist",
  },
];

const readerQuotes = [
  {
    quote:
      "Fast, clear storefront and a mix of indie and established work. This is where I go for digital comics now.",
    name: "Jordan K.",
    role: "Reader",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

function QuoteCard({
  quote,
  name,
  role,
  darkMode,
  icon: Icon,
}: {
  quote: string;
  name: string;
  role: string;
  darkMode: boolean;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`p-6 md:p-8 rounded-2xl border-2 transition-all h-full flex flex-col ${
        darkMode
          ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/40"
          : "bg-white border-slate-200 hover:border-orange-500/30 shadow-md"
      }`}
    >
      <Quote
        className={`mb-4 ${
          darkMode ? "text-orange-500/60" : "text-orange-500/70"
        }`}
        size={32}
      />

      <p
        className={`text-base md:text-lg leading-relaxed flex-1 mb-6 ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
          <Icon size={22} strokeWidth={2} />
        </div>
        <div>
          <p
            className={`font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {name}
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutTestimonials({ darkMode }: AboutTestimonialsProps) {
  return (
    <section className={`py-24 ${darkMode ? "bg-slate-950" : "bg-white"}`}>
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4 block">
            Social proof
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Testimonials
          </h2>
          <p
            className={`max-w-xl mx-auto mb-4 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            What artists and readers say about Lanart21.
          </p>
          <p
            className={`text-xs md:text-sm font-medium px-4 py-2 rounded-full inline-block ${
              darkMode
                ? "bg-amber-500/20 text-amber-400"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            Sample testimonials — for demonstration purposes only.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="space-y-6">
            <h3
              className={`text-lg font-bold flex items-center gap-2 ${
                darkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              <User size={20} /> Artist feedback
            </h3>

            {artistQuotes.map((q) => (
              <QuoteCard
                key={q.name}
                quote={q.quote}
                name={q.name}
                role={q.role}
                darkMode={darkMode}
                icon={User}
              />
            ))}
          </div>

          <div className="space-y-6">
            <h3
              className={`text-lg font-bold flex items-center gap-2 ${
                darkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              <BookOpen size={20} /> Reader experience
            </h3>

            {readerQuotes.map((q) => (
              <QuoteCard
                key={q.name}
                quote={q.quote}
                name={q.name}
                role={q.role}
                darkMode={darkMode}
                icon={BookOpen}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
