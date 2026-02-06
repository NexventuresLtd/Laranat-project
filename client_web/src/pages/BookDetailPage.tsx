import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  Tag,
  Globe,
  BarChart3,
  Layers,
  AlertCircle,
  BookOpen,
  X,
} from 'lucide-react';
import { getComicById, getPrevComicId, getNextComicId } from '../data/comics';
import Footer from '../comps/Footer';

const PAGE_WIDTH_CLASS = 'w-[91.666667%]'; // 11/12 for large desktop

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const comic = id ? getComicById(id) : undefined;
  const prevId = id ? getPrevComicId(id) : null;
  const nextId = id ? getNextComicId(id) : null;

  if (!comic) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center font-noteworthy px-4"
        style={{ fontFamily: 'var(--font-noteworthy)' }}
      >
        <BookOpen size={64} className="mb-4 opacity-40" style={{ color: 'var(--color-primary-blue)' }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
          Book not found
        </h1>
        <p className="text-[var(--navbar-text)]/80 mb-6">This comic or book doesn&apos;t exist or was removed.</p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white"
          style={{ backgroundColor: 'var(--color-primary-blue)' }}
        >
          <ArrowLeft size={20} />
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="font-noteworthy min-h-screen" style={{ fontFamily: 'var(--font-noteworthy)' }}>
      {/* Back bar - w-11/12 */}
      <div className="border-b border-[var(--navbar-border)] bg-white py-4">
        <div className={`${PAGE_WIDTH_CLASS} mx-auto flex items-center justify-between`}>
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="inline-flex items-center gap-2 text-base font-semibold transition-colors hover:opacity-80"
            style={{ color: 'var(--color-primary-blue)' }}
          >
            <ArrowLeft size={20} />
            Back to Books
          </button>
          <Link
            to="/books"
            className="p-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent-pink)', color: 'white' }}
            aria-label="Close"
          >
            <X size={22} />
          </Link>
        </div>
      </div>

      {/* Detail content: w-11/12 with Prev/Next icon buttons on sides */}
      <section className="py-8 md:py-16 relative">
        <div className={`${PAGE_WIDTH_CLASS} mx-auto relative`}>
          {/* Previous - icon only, circular, left side */}
          {prevId ? (
            <Link
              to={`/books/${prevId}`}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
              style={{ backgroundColor: 'var(--color-accent-pink)', color: 'white' }}
              aria-label="Previous book"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </Link>
          ) : (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center opacity-40 cursor-not-allowed"
              style={{ backgroundColor: 'var(--navbar-border)', color: 'var(--navbar-text)' }}
              aria-hidden
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </div>
          )}

          {/* Next - icon only, circular, right side */}
          {nextId ? (
            <Link
              to={`/books/${nextId}`}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
              style={{ backgroundColor: 'var(--color-accent-pink)', color: 'white' }}
              aria-label="Next book"
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </Link>
          ) : (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center opacity-40 cursor-not-allowed"
              style={{ backgroundColor: 'var(--navbar-border)', color: 'var(--navbar-text)' }}
              aria-hidden
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </div>
          )}

          {/* Content - padding so it doesn't sit under the nav circles on small screens */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 px-4 md:px-16 lg:px-20">
            {/* Cover */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] max-h-[500px] sticky top-24">
                <img
                  src={comic.coverImage}
                  alt={comic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 p-4 flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1.5 rounded-full text-base font-bold text-white"
                    style={{ backgroundColor: 'var(--color-accent-pink)' }}
                  >
                    {comic.type === 'series' ? 'Series' : 'One-shot'}
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                      comic.status === 'ongoing' ? 'bg-[var(--color-primary-blue)]' : 'bg-[var(--color-deep-blue)]'
                    }`}
                  >
                    {comic.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-base font-bold bg-white/95 text-[var(--navbar-text)]">
                    {comic.ageRating}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--color-deep-blue)' }}>
                  {comic.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-lg" style={{ color: 'var(--navbar-text)' }}>
                    <User size={22} style={{ color: 'var(--color-primary-blue)' }} />
                    <span className="font-semibold">Author:</span>
                    <span>{comic.author}</span>
                  </div>
                </div>

                <p className="text-lg text-[var(--navbar-text)]/90 leading-relaxed">
                  {comic.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t-2" style={{ borderColor: 'var(--navbar-border)' }}>
                <div className="flex items-start gap-3">
                  <Tag size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-blue)' }} />
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Genre</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--navbar-text)' }}>{comic.genre}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-blue)' }} />
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Language</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--navbar-text)' }}>{comic.language}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-blue)' }} />
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Status</p>
                    <p className="text-lg font-semibold capitalize" style={{ color: 'var(--navbar-text)' }}>{comic.status}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-blue)' }} />
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Type</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--navbar-text)' }}>
                      {comic.type === 'series' ? 'Series' : 'One-shot'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-blue)' }} />
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Age rating</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--navbar-text)' }}>{comic.ageRating}</p>
                  </div>
                </div>
                {comic.type === 'series' && comic.chapterOrEpisode != null && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <Layers size={24} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-secondary-purple)' }} />
                    <div>
                      <p className="text-base font-bold uppercase tracking-wider text-[var(--navbar-text)]/70">Chapters / Episodes</p>
                      <p className="text-lg font-semibold" style={{ color: 'var(--color-secondary-purple)' }}>
                        {comic.chapterOrEpisode} {comic.chapterOrEpisode === 1 ? 'chapter' : 'chapters'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                >
                  Get in touch about this title
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDetailPage;
