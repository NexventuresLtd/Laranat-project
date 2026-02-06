import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Filter, LayoutGrid, List, Search, Star } from 'lucide-react';
import { sampleComics } from '../data/comics';
import Footer from '../comps/Footer';

const PAGE_WIDTH_CLASS = 'w-[91.666667%]'; // 11/12 width

// First book as featured; next 3 for "Explore more"
const featuredBook = sampleComics[0];
const exploreMoreBooks = sampleComics.slice(1, 4);

const ALL_GENRES = Array.from(new Set(sampleComics.flatMap((c) => c.genre.split(',').map((g) => g.trim()))));

type ViewMode = 'grid' | 'list';

const BookPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Set<string>>(new Set());
  const [statusOngoing, setStatusOngoing] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(false);
  const [typeSeries, setTypeSeries] = useState(false);
  const [typeOneShot, setTypeOneShot] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'author'>('title');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const toggleGenre = (g: string) => {
    setGenres((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = sampleComics.filter((c) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.author.toLowerCase().includes(q) && !c.genre.toLowerCase().includes(q))
          return false;
      }
      if (genres.size > 0) {
        const comicGenres = c.genre.split(',').map((x) => x.trim());
        if (!comicGenres.some((g) => genres.has(g))) return false;
      }
      if (statusOngoing || statusCompleted) {
        if (statusOngoing && statusCompleted) {
          // both = any
        } else if (statusOngoing && c.status !== 'ongoing') return false;
        else if (statusCompleted && c.status !== 'completed') return false;
      }
      if (typeSeries || typeOneShot) {
        if (typeSeries && typeOneShot) {
          // both = any
        } else if (typeSeries && c.type !== 'series') return false;
        else if (typeOneShot && c.type !== 'one-shot') return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => (sortBy === 'title' ? a.title.localeCompare(b.title) : a.author.localeCompare(b.author)));
    return list;
  }, [search, genres, statusOngoing, statusCompleted, typeSeries, typeOneShot, sortBy]);

  return (
    <div className="font-noteworthy min-h-screen" style={{ fontFamily: 'var(--font-noteworthy)' }}>
      {/* Title - brand colors */}
      <div
        className="py-6 text-center border-b"
        style={{ borderColor: 'var(--navbar-border)', backgroundColor: 'var(--navbar-bg)' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
          Books & Publications
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--navbar-text)' }}>
          Filter and explore our comics and graphic novels
        </p>
      </div>

      {/* All books – first section: sidebar + grid/list */}
      <div className={`${PAGE_WIDTH_CLASS} mx-auto py-6`}>
        <h2 className="text-xl font-bold px-6 lg:px-0 mb-4" style={{ color: 'var(--color-deep-blue)' }}>
          All books
        </h2>
      </div>
      <div className={`${PAGE_WIDTH_CLASS} mx-auto flex flex-col lg:flex-row`}>
        {/* Left sidebar - Filters */}
        <aside
          className="w-full lg:w-64 flex-shrink-0 p-6 border-b lg:border-b-0 lg:border-r"
          style={{
            backgroundColor: 'var(--navbar-bg)',
            borderColor: 'var(--navbar-border)',
          }}
        >
          <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--color-primary-blue)' }}>
            <Filter size={22} />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-deep-blue)' }}>
                Genres
              </h3>
              <div className="space-y-2">
                {ALL_GENRES.map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={genres.has(g)}
                      onChange={() => toggleGenre(g)}
                      className="rounded border-2 w-4 h-4"
                      style={{ borderColor: 'var(--color-primary-blue)', accentColor: 'var(--color-accent-pink)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--navbar-text)' }}>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-deep-blue)' }}>
                Status
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statusOngoing}
                    onChange={(e) => setStatusOngoing(e.target.checked)}
                    className="rounded border-2 w-4 h-4"
                    style={{ borderColor: 'var(--color-primary-blue)', accentColor: 'var(--color-accent-pink)' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--navbar-text)' }}>Ongoing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statusCompleted}
                    onChange={(e) => setStatusCompleted(e.target.checked)}
                    className="rounded border-2 w-4 h-4"
                    style={{ borderColor: 'var(--color-primary-blue)', accentColor: 'var(--color-accent-pink)' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--navbar-text)' }}>Completed</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-deep-blue)' }}>
                Type
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeSeries}
                    onChange={(e) => setTypeSeries(e.target.checked)}
                    className="rounded border-2 w-4 h-4"
                    style={{ borderColor: 'var(--color-primary-blue)', accentColor: 'var(--color-accent-pink)' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--navbar-text)' }}>Series</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeOneShot}
                    onChange={(e) => setTypeOneShot(e.target.checked)}
                    className="rounded border-2 w-4 h-4"
                    style={{ borderColor: 'var(--color-primary-blue)', accentColor: 'var(--color-accent-pink)' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--navbar-text)' }}>One-shot</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content - filter results */}
        <main
          className="flex-1 min-w-0 p-6 md:p-8"
          style={{
            backgroundColor: 'var(--navbar-bg)',
            borderLeft: 'none',
          }}
        >
          {/* Search, sort, view toggle - brand colors */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-primary-blue)' }} />
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  borderColor: 'var(--navbar-border)',
                  color: 'var(--navbar-text)',
                  backgroundColor: 'var(--navbar-bg)',
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'author')}
                className="px-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  borderColor: 'var(--navbar-border)',
                  color: 'var(--navbar-text)',
                  backgroundColor: 'var(--navbar-bg)',
                }}
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
              </select>
              <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: 'var(--navbar-border)' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'text-white' : ''}`}
                  style={{
                    backgroundColor: viewMode === 'grid' ? 'var(--color-accent-pink)' : 'var(--navbar-bg)',
                    color: viewMode === 'grid' ? 'white' : 'var(--navbar-text)',
                  }}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'text-white' : ''}`}
                  style={{
                    backgroundColor: viewMode === 'list' ? 'var(--color-accent-pink)' : 'var(--navbar-bg)',
                    color: viewMode === 'list' ? 'white' : 'var(--navbar-text)',
                  }}
                  aria-label="List view"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Book list - two columns, portrait covers */}
          {filtered.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {filtered.map((comic, index) => (
                  <Link key={comic.id} to={`/books/${comic.id}`} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="rounded-lg border-2 overflow-hidden transition-colors group-hover:border-[var(--color-primary-blue)] flex flex-col"
                      style={{
                        borderColor: 'var(--navbar-border)',
                        backgroundColor: 'var(--navbar-bg)',
                      }}
                    >
                      <div className="aspect-[2/3] overflow-hidden flex-shrink-0">
                        <img
                          src={comic.coverImage}
                          alt={comic.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2 sm:p-3 flex flex-col flex-1 min-w-0">
                        <h3
                          className="font-bold text-xs sm:text-sm leading-tight line-clamp-2 group-hover:underline"
                          style={{ color: 'var(--color-deep-blue)' }}
                        >
                          {comic.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs mt-0.5 truncate" style={{ color: 'var(--navbar-text)' }}>
                          {comic.author}
                        </p>
                        <p className="text-[10px] sm:text-xs mt-0.5 opacity-80 line-clamp-1" style={{ color: 'var(--navbar-text)' }}>
                          {comic.genre}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white"
                            style={{ backgroundColor: 'var(--color-accent-pink)' }}
                          >
                            {comic.type === 'series' ? 'Series' : 'One-shot'}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white"
                            style={{ backgroundColor: 'var(--color-primary-blue)' }}
                          >
                            {comic.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((comic, index) => (
                  <Link key={comic.id} to={`/books/${comic.id}`} className="block group">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-4 p-4 rounded-xl border-2 transition-colors group-hover:border-[var(--color-primary-blue)]"
                      style={{
                        borderColor: 'var(--navbar-border)',
                        backgroundColor: 'var(--navbar-bg)',
                      }}
                    >
                      <div className="w-16 h-24 sm:w-20 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--navbar-border)] aspect-[2/3]">
                        <img
                          src={comic.coverImage}
                          alt={comic.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-bold text-sm truncate group-hover:underline"
                          style={{ color: 'var(--color-deep-blue)' }}
                        >
                          {comic.title}
                        </h3>
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--navbar-text)' }}>
                          {comic.author} · {comic.genre}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs font-semibold" style={{ color: 'var(--color-accent-pink)' }}>
                            {comic.type}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: 'var(--color-primary-blue)' }}>
                            {comic.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <BookOpen size={56} className="mx-auto mb-4 opacity-40" style={{ color: 'var(--color-primary-blue)' }} />
              <p className="text-lg" style={{ color: 'var(--navbar-text)' }}>No books match your filters.</p>
              <p className="text-sm mt-2" style={{ color: 'var(--navbar-text)' }}>Try changing filters or search.</p>
            </div>
          )}
        </main>
      </div>

      {/* Featured book – hero section */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: 'rgba(3, 169, 244, 0.06)' }}
      >
        <div className={`${PAGE_WIDTH_CLASS} mx-auto `}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
          >
            <Link to={`/books/${featuredBook.id}`} className="block flex-shrink-0 group">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--navbar-border)] group-hover:border-[var(--color-primary-blue)] transition-colors">
                <div className="aspect-[2/3]">
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                >
                  <Star size={14} /> Featured
                </div>
              </div>
            </Link>
            <div className="flex-1 text-center lg:text-left min-w-0">
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
                Spotlight
              </p>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3"
                style={{ color: 'var(--color-deep-blue)' }}
              >
                {featuredBook.title}
              </h2>
              <p className="text-lg" style={{ color: 'var(--navbar-text)' }}>
                {featuredBook.author}
              </p>
              <p className="mt-4 text-[var(--navbar-text)] leading-relaxed max-w-xl mx-auto lg:mx-0 line-clamp-3">
                {featuredBook.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                <span
                  className="px-2.5 py-1 rounded text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                >
                  {featuredBook.type === 'series' ? 'Series' : 'One-shot'}
                </span>
                <span
                  className="px-2.5 py-1 rounded text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                >
                  {featuredBook.status}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold text-[var(--navbar-text)] border border-[var(--navbar-border)]">
                  {featuredBook.genre}
                </span>
              </div>
              <Link
                to={`/books/${featuredBook.id}`}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                Read more <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore more – 3 books row */}
      <section className="py-10 md:py-12 border-b" style={{ borderColor: 'var(--navbar-border)' }}>
        <div className={`${PAGE_WIDTH_CLASS} mx-auto `}>
          <motion.h2
            className="text-xl md:text-2xl font-bold mb-6"
            style={{ color: 'var(--color-deep-blue)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore more
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {exploreMoreBooks.map((comic, index) => (
              <motion.div
                key={comic.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link to={`/books/${comic.id}`} className="block group">
                  <div
                    className="rounded-xl border-2 overflow-hidden transition-colors group-hover:border-[var(--color-primary-blue)]"
                    style={{
                      borderColor: 'var(--navbar-border)',
                      backgroundColor: 'var(--navbar-bg)',
                    }}
                  >
                    <div className="aspect-[2/3] overflow-hidden">
                        <img
                          src={comic.coverImage}
                          alt={comic.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3
                          className="font-bold text-base leading-tight line-clamp-2 group-hover:underline"
                          style={{ color: 'var(--color-deep-blue)' }}
                        >
                          {comic.title}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--navbar-text)' }}>
                          {comic.author}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                        <span
                          className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                          style={{ backgroundColor: 'var(--color-accent-pink)' }}
                        >
                          {comic.type === 'series' ? 'Series' : 'One-shot'}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                          style={{ backgroundColor: 'var(--color-primary-blue)' }}
                        >
                          {comic.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - brand gradient */}
      <section
        className="py-12 mt-12"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-deep-blue) 100%)',
          color: 'white',
        }}
      >
        <div className={`${PAGE_WIDTH_CLASS} mx-auto text-center`}>
          <p className="text-white/90 mb-4">More titles coming soon from Lanart21 Creative Studio.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold text-white uppercase tracking-wider"
            style={{ backgroundColor: 'var(--color-accent-pink)' }}
          >
            Get in touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPage;
