import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, BookOpen, Film, Sparkles, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import Footer from '../comps/Footer';
import PageHero from '../comps/PageHero';

const SERVICE_ICONS = [Palette, BookOpen, Film, Sparkles];
const SERVICE_COLORS = ['var(--color-primary-blue)', 'var(--color-deep-blue)', 'var(--color-accent-pink)', 'var(--color-secondary-purple)'];

const ServicesPage: React.FC = () => {
  const { services } = useSiteContent();
  const serviceSections = services.sections.map((s, i) => ({
    ...s,
    icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
    color: SERVICE_COLORS[i % SERVICE_COLORS.length],
  }));

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <PageHero
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        subtitle={services.hero.subtitle}
        variant="services"
      />

      {/* Service sections with images */}
      {serviceSections.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-[rgba(3,169,244,0.04)]' : ''}`}
        >
          <div className="w-[91.666667%] mx-auto ">
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <motion.div
                className={index % 2 === 1 ? 'lg:order-2' : ''}
                initial={{ opacity: 0, x: index % 2 === 1 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] max-h-[400px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundColor: service.color }}
                  />
                  <span
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-base font-bold text-white shadow-lg"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.tag}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={index % 2 === 1 ? 'lg:order-1' : ''}
                initial={{ opacity: 0, x: index % 2 === 1 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}25`, color: service.color }}
                >
                  <service.icon size={28} strokeWidth={2} />
                </div>
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4"
                  style={{ color: 'var(--color-deep-blue)' }}
                >
                  {service.title}
                </h2>
                <p className="text-lg text-[var(--navbar-text)]/90 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA section */}
      <section
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-secondary-purple) 100%)`,
          color: 'white',
        }}
      >
        <div className="w-[91.666667%] mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to start a project?
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let&apos;s turn your ideas into clear, powerful visual narratives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
            >
              Get in touch
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
