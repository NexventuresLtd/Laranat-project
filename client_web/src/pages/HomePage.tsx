import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../comps/Hero';
import Contact from '../comps/Contact';
import Footer from '../comps/Footer';
import { useSiteContent } from '../context/SiteContentContext';
import { useComics } from '../context/ComicsContext';
import { Palette, BookOpen, Film, Sparkles, ImageIcon } from 'lucide-react';

/* Lanart21 decorative pattern – dots grid */
const PatternDots = () => (
  <div
    className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary-blue) 1px, transparent 0)`,
      backgroundSize: '24px 24px',
    }}
  />
);

/* Balloon-like floating shapes (Lanart21 style) */
const BalloonDeco = ({ className = '' }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`} aria-hidden>
    <div
      className="w-16 h-20 rounded-full opacity-20 animate-subtle-float"
      style={{ background: 'var(--color-accent-pink)', transform: 'rotate(-8deg)' }}
    />
    <div
      className="w-12 h-14 rounded-full opacity-15 mt-4 ml-8 animate-float"
      style={{ background: 'var(--color-primary-blue)', animationDelay: '1s' }}
    />
  </div>
);

const FALLBACK_BOOKS = [
  { id: '', color: 'var(--color-primary-blue)', tilt: 'rotate-[-6deg]' },
  { id: '', color: 'var(--color-accent-pink)', tilt: 'rotate-[4deg]' },
  { id: '', color: 'var(--color-secondary-purple)', tilt: 'rotate-[-3deg]' },
  { id: '', color: 'var(--color-deep-blue)', tilt: 'rotate-[5deg]' },
  { id: '', color: 'var(--color-primary-blue)', tilt: 'rotate-[-4deg]' },
];

const HomePage: React.FC = () => {
  const { hash } = useLocation();
  const { home } = useSiteContent();
  const { comics } = useComics();
  const displayBooks = comics.length > 0 ? comics.slice(0, 5) : null;

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <PatternDots />
      <BalloonDeco className="top-20 right-[10%] hidden lg:block" />
      <BalloonDeco className="bottom-40 left-[5%] hidden md:block scale-75" />

      {/* About teaser + CTA */}
      <section id="about" className="relative py-16 md:py-24 overflow-hidden">
        <PatternDots />
        <div className="w-[91.666667%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-base font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-blue)' }}>
                {home.aboutTeaser.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
                {home.aboutTeaser.title}
              </h2>
              <p className="text-lg text-[var(--navbar-text)] leading-relaxed">
                {home.aboutTeaser.body}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                {home.aboutTeaser.ctaText}
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
                src={home.aboutTeaser.imageUrl}
                alt="Creative studio – visual storytelling"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services teaser + CTA */}
      <section id="services" className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'rgba(3, 169, 244, 0.04)' }}>
        <PatternDots />
        <div className="w-[91.666667%] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
              {home.servicesTeaser.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              {home.servicesTeaser.title}
            </h2>
            <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto mb-8">
              {home.servicesTeaser.body}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              {home.servicesTeaser.ctaText}
            </Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: home.servicesTeaser.serviceTitles[0] ?? 'Illustration & Visual Art', icon: Palette },
              { title: home.servicesTeaser.serviceTitles[1] ?? 'Comic & Graphic Novels', icon: BookOpen },
              { title: home.servicesTeaser.serviceTitles[2] ?? 'Animation & Motion', icon: Film },
              { title: home.servicesTeaser.serviceTitles[3] ?? 'Branding & Identity', icon: Sparkles },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                className="p-6 rounded-2xl bg-white border border-[var(--navbar-border)] shadow-sm text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <s.icon size={28} className="mx-auto mb-2" style={{ color: 'var(--color-primary-blue)' }} />
                <p className="font-semibold text-base" style={{ color: 'var(--navbar-text)' }}>{s.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Books teaser + CTA – Story Boats style floating book cards */}
      <section id="books" className="relative py-16 md:py-24 overflow-hidden">
        <PatternDots />
        <div className="w-[91.666667%] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              {home.booksTeaser.title}
            </h2>
            <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto mb-8">
              {home.booksTeaser.body}
            </p>
            <Link
              to="/books"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              {home.booksTeaser.ctaText}
            </Link>
          </motion.div>

          {/* Floating books – real covers with Story Boats style bobbing animation */}
          <motion.div
            className="flex flex-wrap justify-center items-end gap-6 md:gap-10 pt-4 pb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {(displayBooks || FALLBACK_BOOKS).map((item, i) => {
              const delays = ['animate-boat-float', 'animate-boat-float-delay-1', 'animate-boat-float-delay-2', 'animate-boat-float-delay-3', 'animate-boat-float-delay-4'];
              const tilts = ['rotate-[-6deg]', 'rotate-[4deg]', 'rotate-[-3deg]', 'rotate-[5deg]', 'rotate-[-4deg]'];
              const sizes = ['w-20 md:w-24 h-28 md:h-32', 'w-24 md:w-28 h-32 md:h-36', 'w-20 md:w-24 h-28 md:h-32', 'w-24 md:w-28 h-30 md:h-34', 'w-20 md:w-24 h-28 md:h-32'];
              const delay = delays[i % delays.length];
              const tilt = displayBooks ? tilts[i % tilts.length] : (item as { tilt: string }).tilt;
              const size = sizes[i % sizes.length];
              const isRealBook = displayBooks && 'coverImage' in item;
              const cover = isRealBook ? (item as { id: string; title: string; coverImage: string }).coverImage : '';
              const bookId = isRealBook ? (item as { id: string }).id : '';
              const title = isRealBook ? (item as { title: string }).title : '';

              const card = (
                <div
                  className={`${size} ${delay} ${tilt} rounded-lg shadow-lg border-2 border-white/40 flex-shrink-0 overflow-hidden`}
                  style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: (item as { color: string }).color }}
                      aria-hidden
                    />
                  )}
                </div>
              );

              return bookId ? (
                <Link key={bookId} to={`/books/${bookId}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ ['--tw-ring-color' as string]: 'var(--color-primary-blue)' }}>
                  {card}
                </Link>
              ) : (
                <div key={i} aria-hidden>{card}</div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Portfolio teaser + CTA */}
      <section id="portfolio" className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'rgba(103, 51, 176, 0.04)' }}>
        <PatternDots />
        <div className="w-[91.666667%] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-secondary-purple)' }}>
              {home.portfolioTeaser.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              {home.portfolioTeaser.title}
            </h2>
            <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto mb-8">
              {home.portfolioTeaser.body}
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95"
              style={{ backgroundColor: 'var(--color-secondary-purple)' }}
            >
              <ImageIcon size={18} /> {home.portfolioTeaser.ctaText}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <Contact />

      <Footer />
    </>
  );
};

export default HomePage;
