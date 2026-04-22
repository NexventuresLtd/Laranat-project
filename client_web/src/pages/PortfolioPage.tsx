import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageIcon, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import Footer from '../comps/Footer';
import PageHero from '../comps/PageHero';

const PortfolioPage: React.FC = () => {
  const { portfolio } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleWorks = useMemo(
    () =>
      activeCategory === 'All'
        ? portfolio.featuredWorks
        : portfolio.featuredWorks.filter((work) => work.category === activeCategory),
    [activeCategory, portfolio.featuredWorks]
  );

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <PageHero
        eyebrow={portfolio.hero.eyebrow}
        title={portfolio.hero.title}
        subtitle={portfolio.hero.subtitle}
        variant="portfolio"
      />

      <section className="py-16 md:py-24">
        <div className="w-[91.666667%] mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['All', ...portfolio.categories.map((item) => item.title)].map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    borderColor: active ? 'var(--color-primary-blue)' : 'var(--navbar-border)',
                    backgroundColor: active ? 'var(--color-primary-blue)' : 'white',
                    color: active ? 'white' : 'var(--navbar-text)',
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--color-deep-blue)' }}>
              Featured projects
            </h2>
            <p className="text-[var(--navbar-text)] max-w-2xl">
              Publish selected previous work here to give visitors a stronger view of the studio&apos;s range and execution quality.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {visibleWorks.map((work, index) => (
              <motion.article
                key={`${work.title}-${index}`}
                className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ borderColor: 'var(--navbar-border)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: 'var(--color-secondary-purple)' }}
                  >
                    {work.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
                    {work.title}
                  </h3>
                  <p className="mt-3 text-[var(--navbar-text)] leading-relaxed">
                    {work.summary}
                  </p>
                </div>
              </motion.article>
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

      <Footer showTopCta={false} />
    </div>
  );
};

export default PortfolioPage;
