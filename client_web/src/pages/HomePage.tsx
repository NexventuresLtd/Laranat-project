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
  { id: '', color: 'var(--color-accent-pink)', tilt: 'rotate-[3deg]' },
  { id: '', color: 'var(--color-secondary-purple)', tilt: 'rotate-[-5deg]' },
  { id: '', color: 'var(--color-deep-blue)', tilt: 'rotate-[2deg]' },
  { id: '', color: 'var(--color-primary-blue)', tilt: 'rotate-[-2deg]' },
  { id: '', color: 'var(--color-accent-pink)', tilt: 'rotate-[5deg]' },
];

const HomePage: React.FC = () => {
  const { hash } = useLocation();
  const { home, settings } = useSiteContent();
  const { comics } = useComics();
  /* Use all comics in the slide so the strip is long and horizontal slide is visible */
  const displayBooks = comics.length > 0 ? comics : null;

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

          {/* Books slide – horizontal strip, right to left (Story Boats style) */}
          <motion.div
            className="pt-4 pb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden w-full min-h-[12rem] md:min-h-[14rem]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}>
              <div
                className="flex flex-nowrap gap-5 md:gap-6 items-center animate-slide-books-r2l py-2"
                style={{ width: 'max-content', willChange: 'transform' }}
              >
                {[...(displayBooks || FALLBACK_BOOKS), ...(displayBooks || FALLBACK_BOOKS)].map((item, i) => {
                  const tilts = ['rotate-[-4deg]', 'rotate-[3deg]', 'rotate-[-2deg]', 'rotate-[4deg]', 'rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[-3deg]', 'rotate-[5deg]', 'rotate-[-1deg]', 'rotate-[1deg]'];
                  const tilt = displayBooks ? tilts[i % tilts.length] : (item as { tilt: string }).tilt;
                  const isRealBook = displayBooks && 'coverImage' in item;
                  const cover = isRealBook ? (item as { id: string; title: string; coverImage: string }).coverImage : '';
                  const bookId = isRealBook ? (item as { id: string }).id : '';
                  const title = isRealBook ? (item as { title: string }).title : '';

                  const card = (
                    <div
                      className={`w-28 h-40 md:w-36 md:h-52 ${tilt} rounded-lg shadow-xl border-2 border-white/50 flex-shrink-0 overflow-hidden bg-white`}
                      style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.14)' }}
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

                  const uniqueKey = bookId ? `slide-${bookId}-${i}` : `slide-fb-${i}`;
                  return bookId ? (
                    <Link key={uniqueKey} to={`/books/${bookId}`} className="block flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg" style={{ ['--tw-ring-color' as string]: 'var(--color-primary-blue)' }}>
                      {card}
                    </Link>
                  ) : (
                    <div key={uniqueKey} className="flex-shrink-0" aria-hidden>{card}</div>
                  );
                })}
              </div>
            </div>
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

      {settings.clientLogos.length > 0 && (
        <section className="py-14 md:py-18 border-y" style={{ borderColor: 'var(--navbar-border)' }}>
          <div className="w-[91.666667%] mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
                Trusted by teams
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--color-deep-blue)' }}>
                Brands and organizations we work with
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 items-stretch">
              {settings.clientLogos.map((logo, index) => (
                <motion.div
                  key={`${logo}-${index}`}
                  className="rounded-2xl border bg-white p-6 flex items-center justify-center min-h-[112px] shadow-sm"
                  style={{ borderColor: 'var(--navbar-border)' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <img src={logo} alt="" className="max-h-12 w-auto object-contain opacity-80" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <Contact />

      <Footer showTopCta={false} />
    </>
  );
};

export default HomePage;
