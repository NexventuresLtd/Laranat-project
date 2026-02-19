import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageIcon, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import Footer from '../comps/Footer';

const PortfolioPage: React.FC = () => {
  const { portfolio } = useSiteContent();

  return (
    <div className="font-noteworthy" style={{ fontFamily: 'var(--font-noteworthy)' }}>
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-deep-blue) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative w-[91.666667%] mx-auto text-center">
          <motion.p
            className="text-white/90 text-base font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {portfolio.hero.eyebrow}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {portfolio.hero.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {portfolio.hero.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="w-[91.666667%] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              {portfolio.browseHeading}
            </h2>
            <p className="text-[var(--navbar-text)] max-w-xl mx-auto">
              {portfolio.browseSubtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.categories.map((item, index) => (
              <motion.div
                key={item.title}
                className="group rounded-2xl overflow-hidden border-2 shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ borderColor: 'var(--navbar-border)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-base font-semibold">{item.count}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <ImageIcon size={20} style={{ color: 'var(--color-primary-blue)' }} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold" style={{ color: 'var(--color-deep-blue)' }}>{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold uppercase tracking-wider transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
            >
              Start a project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
