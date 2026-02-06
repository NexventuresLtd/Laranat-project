import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 font-noteworthy"
      style={{ fontFamily: 'var(--font-noteworthy)' }}
    >
      <div className="w-[91.666667%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-blue)' }}>
              Who we are
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--color-deep-blue)' }}
            >
              About Us
            </h2>
            <p className="text-lg text-[var(--navbar-text)] leading-relaxed">
              We specialize in illustration, comics, animation, and creative direction—turning your ideas into clear, powerful visual narratives for brands, organizations, and creators.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              Learn more
            </Link>
          </motion.div>
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] max-h-[420px]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=85"
              alt="Creative studio – visual storytelling"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
