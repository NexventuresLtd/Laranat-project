import React from 'react';
import { motion } from 'framer-motion';

/* Exact from instruction: WHO WE WORK WITH (Industries / Use cases) */
const industries = [
  'Brands & startups',
  'Publishers & authors',
  'NGOs & institutions',
  'Musicians & artists',
  'Film & media projects',
];

const Industries: React.FC = () => {
  return (
    <section
      id="industries"
      className="py-16 md:py-24 font-noteworthy"
      style={{ fontFamily: 'var(--font-noteworthy)' }}
    >
      <div className="w-[91.666667%] mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--color-deep-blue)' }}
          >
            Who We Work With
          </h2>
          <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto">
            Brands & startups, publishers & authors, NGOs & institutions, musicians & artists, film & media projects.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
        >
          {industries.map((item, index) => (
            <motion.span
              key={item}
              className="px-6 py-3 rounded-full text-base font-semibold border-2 transition-all"
              style={{
                borderColor: 'var(--color-primary-blue)',
                color: 'var(--navbar-text)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                backgroundColor: 'var(--color-primary-blue)',
                color: 'white',
                scale: 1.05,
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
