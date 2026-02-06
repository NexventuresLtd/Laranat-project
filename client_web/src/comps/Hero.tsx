import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden font-noteworthy -mt-[5rem] pt-[5rem]"
      style={{ fontFamily: 'var(--font-noteworthy)' }}
    >
      {/* Background image – full cover, extends behind transparent header */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=85"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.85) 0%, rgba(3, 169, 244, 0.5) 50%, rgba(103, 51, 176, 0.6) 100%)',
          }}
        />
        {/* Lanart21 subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative w-[91.666667%] mx-auto py-20 md:py-28">
        <div className="max-w-2xl">
          <motion.p
            className="text-white/90 text-base md:text-lg font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LANART21 Creative Studio
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Turn ideas into clear, powerful visual narratives
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Illustration, comics, animation & branding for brands and creators.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/contact">
              <motion.span
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold text-white uppercase tracking-wider"
                style={{ backgroundColor: 'var(--color-accent-pink)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(238,64,168,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.span>
            </Link>
            <Link to="/about">
              <motion.span
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider border-2 border-white text-white bg-transparent hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                About us
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
