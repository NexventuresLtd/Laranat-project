import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Target } from 'lucide-react';
import Footer from '../comps/Footer';

const team = [
  { name: 'Lan Gabriel', role: 'Founder & Creative Director', focus: 'Branding, Animation & Motion' },
  { name: 'Sauveur', role: 'Associate Creative Director & Lead Inker / Sketch Artist', focus: '' },
  { name: 'Jospine', role: 'Colorist', focus: '' },
  { name: 'Ciella', role: 'Typography Designer & Editor', focus: '' },
];

const values = [
  {
    icon: Heart,
    title: 'Story First',
    description: 'Every project starts with the narrative. We craft visuals that serve the story and connect with audiences.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  },
  {
    icon: Sparkles,
    title: 'Creative Excellence',
    description: 'From concept to final deliverable, we aim for quality that stands out and stands the test of time.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work alongside brands, authors, and organizations as partners to bring their vision to life.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
  {
    icon: Target,
    title: 'Impact Driven',
    description: 'Our work is designed to inform, inspire, and move people—whether in print, digital, or motion.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="font-noteworthy" style={{ fontFamily: 'var(--font-noteworthy)' }}>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-deep-blue) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative w-[91.666667%] mx-auto text-center">
          <motion.p
            className="text-white/90 text-base font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Who We Are
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Lanart21
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A visual storytelling studio turning ideas into clear, powerful narratives through illustration, comics, animation, and creative direction.
          </motion.p>
        </div>
      </section>

      {/* Our Story – text + image */}
      <section className="py-16 md:py-24">
        <div className="w-[91.666667%] mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-base font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-blue)' }}>
                Our Story
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--color-deep-blue)' }}
              >
                Visual storytelling at the heart of everything we do
              </h2>
              <p className="text-lg text-[var(--navbar-text)] leading-relaxed">
                <strong>Lanart21 Creative Studio</strong> is a visual storytelling studio specializing in illustration, comics, animation, and creative direction. We work with brands, organizations, and creators to turn ideas into clear, powerful visual narratives.
              </p>
              <p className="text-[var(--navbar-text)] leading-relaxed">
                Whether it’s a comic book, an animated explainer, a brand identity, or custom illustrations, we combine craft with strategy so your message reaches the right people and leaves a lasting impression.
              </p>
              <Link
                to="/services"
className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
              >
                Explore our services
              </Link>
            </motion.div>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] order-1 lg:order-2"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85"
                alt="Creative studio at work – visual storytelling"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/50 to-transparent"
                aria-hidden
              >
                <span className="text-white font-semibold text-lg">Lanart21 Creative Studio</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values with images */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'rgba(3, 169, 244, 0.04)' }}
      >
        <div className="w-[91.666667%] mx-auto ">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
              What we stand for
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--color-deep-blue)' }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                className="group rounded-2xl overflow-hidden border-2 transition-colors hover:border-[var(--color-primary-blue)] bg-white shadow-sm hover:shadow-lg"
                style={{ borderColor: 'var(--navbar-border)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-white"
                    style={{ backgroundColor: 'var(--color-primary-blue)' }}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
                    {item.title}
                  </h3>
                  <p className="text-base mt-2 text-[var(--navbar-text)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + team image */}
      <section className="py-16 md:py-24">
        <div className="w-[91.666667%] mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10]"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85"
                alt="Team collaboration – Lanart21"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-blue)]/70 to-transparent flex items-end p-8"
                aria-hidden
              >
                <p className="text-white text-lg font-semibold">Meet the people behind the stories.</p>
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-base font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent-pink)' }}>
                Our Team
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--color-deep-blue)' }}
              >
                Expert creatives who love what they do
              </h2>
              <p className="text-lg text-[var(--navbar-text)] leading-relaxed">
                From founders to colorists and typographers, our team brings together diverse skills to deliver illustration, comics, animation, and branding that tell your story with clarity and impact.
              </p>
              <a
                href="#team"
className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                Meet the team below
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team – member cards */}
      <section
        id="team"
        className="py-16 md:py-24"
        style={{
          fontFamily: 'var(--font-noteworthy)',
          backgroundColor: 'rgba(103, 51, 176, 0.04)',
        }}
      >
        <div className="w-[91.666667%] mx-auto ">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary-blue)' }}>
              Expert creatives
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              style={{ color: 'var(--color-deep-blue)' }}
            >
              Our Team
            </h2>
            <p className="text-lg text-[var(--navbar-text)]/80 max-w-2xl mx-auto">
              The people behind Lanart21 Creative Studio.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center p-6 rounded-2xl bg-white border border-[var(--navbar-border)] shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name.charAt(0)}
                </motion.div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--navbar-text)' }}>
                  {member.name}
                </h3>
                <p className="text-base font-semibold mt-1" style={{ color: 'var(--color-primary-blue)' }}>
                  {member.role}
                </p>
                {member.focus ? (
                  <p className="text-base mt-2 text-[var(--navbar-text)]/80">({member.focus})</p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
