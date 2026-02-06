import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, BookOpen, Film, Sparkles } from 'lucide-react';

/* Exact from instruction: OUR SERVICES */
const services = [
  { title: 'Illustration & Visual Art', icon: Palette, color: 'var(--color-primary-blue)' },
  { title: 'Comic & Graphic Novel Production', icon: BookOpen, color: 'var(--color-deep-blue)' },
  { title: 'Animation & Motion Design', icon: Film, color: 'var(--color-accent-pink)' },
  { title: 'Branding & Visual Identity', icon: Sparkles, color: 'var(--color-secondary-purple)' },
];

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-16 md:py-24 font-noteworthy"
      style={{ fontFamily: 'var(--font-noteworthy)', backgroundColor: 'rgba(3, 169, 244, 0.04)' }}
    >
      <div className="w-[91.666667%] mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
            Features
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--color-deep-blue)' }}
          >
            Our Services
          </h2>
          <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto">
            From illustration to animation and branding—we bring your vision to life.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider mt-6 transition-all hover:opacity-95"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            Our services
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="group relative p-6 md:p-8 rounded-2xl bg-white border border-[var(--navbar-border)] shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${service.color}20`, color: service.color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <service.icon size={28} strokeWidth={2} />
              </motion.div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--navbar-text)' }}>
                {service.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
