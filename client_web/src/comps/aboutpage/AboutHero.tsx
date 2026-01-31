import { motion } from "framer-motion";

// Image for "Our Story" – creative studio / art vibe (replace with your own asset path if needed)
const OUR_STORY_IMAGE =
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop";

interface AboutHeroProps {
  darkMode: boolean;
}

export default function AboutHero({ darkMode }: AboutHeroProps) {
  return (
    <section
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-slate-950" : "bg-gradient-to-b from-slate-50 to-white"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.15),transparent)]" />
      <div className="w-11/12 max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-orange-500/20">
              <img
                src={OUR_STORY_IMAGE}
                alt="Lanart21 creative studio – our story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-orange-500 font-bold text-sm uppercase tracking-[0.2em] mb-4 block"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              About Lanart21
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg md:text-xl max-w-xl leading-relaxed ${
                darkMode ? "text-slate-400" : "text-slate-600"
              } ${"md:mx-0 mx-auto"}`}
            >
              A creative studio dedicated to exceptional design and digital experiences.
              We bring innovative ideas to life and empower creatives around the world.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
