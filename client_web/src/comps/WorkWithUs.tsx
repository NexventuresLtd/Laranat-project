import React from 'react';
import { motion } from 'framer-motion';

const WorkWithUs: React.FC = () => {
  return (
    <section
      className="py-16 md:py-24 font-noteworthy"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        backgroundColor: 'var(--color-deep-blue)',
        color: 'rgba(255,255,255,0.95)',
      }}
    >
      <div className="w-[91.666667%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-white/80 mb-4">
              Creating together
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Working with you to bring stories to life
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Lanart21 Creative Studio is a visual storytelling studio specializing in illustration, comics, animation, and creative direction. We work with brands, organizations, and creators to turn ideas into clear, powerful visual narratives.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn more
            </motion.a>
          </motion.div>
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden border-4 border-white/20 bg-white/5"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="w-full h-full flex items-center justify-center text-white/80 text-xl font-bold"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                Visual narratives
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
