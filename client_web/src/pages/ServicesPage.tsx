import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, BookOpen, Film, Sparkles, ArrowRight } from 'lucide-react';
import Footer from '../comps/Footer';

const serviceSections = [
  {
    id: 'illustration',
    title: 'Illustration & Visual Art',
    tag: 'Visual Art',
    description: 'Custom illustrations that capture your brand and story. From character design to editorial art, we create visuals that communicate clearly and leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80',
    color: 'var(--color-primary-blue)',
    icon: Palette,
  },
  {
    id: 'comics',
    title: 'Comic & Graphic Novel Production',
    tag: 'Comics',
    description: 'Full production from script to finished pages. We handle storyboarding, penciling, inking, coloring, and lettering for comics and graphic novels that readers love.',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
    color: 'var(--color-deep-blue)',
    icon: BookOpen,
  },
  {
    id: 'animation',
    title: 'Animation & Motion Design',
    tag: 'Motion',
    description: 'Motion that brings ideas to life on screen. From explainer videos and social content to title sequences and character animation, we add movement that engages audiences.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    color: 'var(--color-accent-pink)',
    icon: Film,
  },
  {
    id: 'branding',
    title: 'Branding & Visual Identity',
    tag: 'Branding',
    description: 'Cohesive visual identity and creative direction. We help brands and projects look consistent and memorable across print, digital, and motion.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    color: 'var(--color-secondary-purple)',
    icon: Sparkles,
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="font-noteworthy" style={{ fontFamily: 'var(--font-noteworthy)' }}>
      {/* Page Hero */}
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
            What We Do
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Illustration & Visual Art, Comic & Graphic Novel Production, Animation & Motion Design, and Branding & Visual Identity.
          </motion.p>
        </div>
      </section>

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
