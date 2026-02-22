import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getComicById } from '../data/comics';
import Footer from '../comps/Footer';

const WHATSAPP_NUMBER = '250782030814';
const PAGE_WIDTH_CLASS = 'w-[91.666667%]';

const BookPrintPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pagesToPrint, setPagesToPrint] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const comic = id ? getComicById(id) : undefined;

  if (!comic) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <BookOpen size={64} className="mb-4 opacity-40" style={{ color: 'var(--color-primary-blue)' }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
          Book not found
        </h1>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white mt-6"
          style={{ backgroundColor: 'var(--color-primary-blue)' }}
        >
          <ArrowLeft size={20} /> Back to Books
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      `Hi, I'd like to request a print of "${comic.title}".`,
      pagesToPrint.trim() ? `Pages I want: ${pagesToPrint.trim()}.` : null,
      `Orientation: ${orientation}.`,
      'Please send me more info.',
    ].filter(Boolean);
    const message = parts.join(' ');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="border-b py-4" style={{ borderColor: 'var(--navbar-border)' }}>
        <div className={`${PAGE_WIDTH_CLASS} mx-auto flex items-center gap-4`}>
          <button
            type="button"
            onClick={() => navigate(`/books/${comic.id}`)}
            className="inline-flex items-center gap-2 text-base font-semibold"
            style={{ color: 'var(--color-primary-blue)' }}
          >
            <ArrowLeft size={20} /> Back to book
          </button>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className={`${PAGE_WIDTH_CLASS} mx-auto max-w-xl`}>
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
            Request a print
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--navbar-text)' }}>
            Fill in the details below, then click the button to send your request via WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-2" style={{ color: 'var(--navbar-text)' }}>
                Book
              </label>
              <div
                className="px-4 py-3 rounded-xl border-2 text-base"
                style={{ borderColor: 'var(--navbar-border)', color: 'var(--navbar-text)' }}
              >
                {comic.title}
              </div>
            </div>

            <div>
              <label htmlFor="print-pages" className="block text-base font-semibold mb-2" style={{ color: 'var(--navbar-text)' }}>
                Pages to print
              </label>
              <input
                id="print-pages"
                type="text"
                value={pagesToPrint}
                onChange={(e) => setPagesToPrint(e.target.value)}
                placeholder="e.g. 1-5, 10, 12 (or leave blank for full book)"
                className="w-full px-4 py-3 rounded-xl border-2 text-base"
                style={{ borderColor: 'var(--navbar-border)' }}
              />
            </div>

            <div>
              <span className="block text-base font-semibold mb-3" style={{ color: 'var(--navbar-text)' }}>
                Orientation
              </span>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="orientation"
                    value="portrait"
                    checked={orientation === 'portrait'}
                    onChange={() => setOrientation('portrait')}
                    className="w-5 h-5"
                    style={{ accentColor: 'var(--color-primary-blue)' }}
                  />
                  <span className="text-base" style={{ color: 'var(--navbar-text)' }}>Portrait</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="orientation"
                    value="landscape"
                    checked={orientation === 'landscape'}
                    onChange={() => setOrientation('landscape')}
                    className="w-5 h-5"
                    style={{ accentColor: 'var(--color-primary-blue)' }}
                  />
                  <span className="text-base" style={{ color: 'var(--navbar-text)' }}>Landscape</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
            >
              Send via WhatsApp
            </button>
          </form>

          <p className="mt-6 text-sm" style={{ color: 'var(--navbar-text)' }}>
            You’ll be taken to WhatsApp to send your request to +250 782 030 814.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPrintPage;
