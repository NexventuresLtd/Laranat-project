import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* Exact from instruction: BOOKS & PUBLICATIONS */
const bookItems = [
  { title: 'Comics & graphic novels', tag: 'Comics', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80' },
  { title: 'Illustrated books', tag: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80' },
  { title: 'Original visual storytelling projects', tag: 'Original', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' },
];

const Book: React.FC = () => {
  return (
    <section
      id="books"
      className="py-16 md:py-24 font-noteworthy overflow-hidden"
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
            Books & Publications
          </h2>
          <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto">
            Comics & graphic novels, illustrated books, and original visual storytelling projects.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider mt-6 transition-all hover:opacity-95"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            View all books
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {bookItems.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all duration-300"
              style={{ borderColor: 'var(--navbar-border)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                borderColor: 'var(--color-primary-blue)',
                boxShadow: '0 20px 40px rgba(3, 169, 244, 0.2)',
                y: -8,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                >
                  {item.tag}
                </span>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-20"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold" style={{ color: 'var(--navbar-text)' }}>
                  {item.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Book;
