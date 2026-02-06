import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 font-noteworthy"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        background: `linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-deep-blue) 100%)`,
      }}
    >
      <div className="w-[91.666667%] mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Start a Project
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Ready to turn your ideas into visual narratives? Get in touch.
          </p>
          <Link to="/contact">
            <motion.span
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-lg font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(238,64,168,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Get in touch
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
