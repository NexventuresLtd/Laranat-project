import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
} from 'lucide-react';

const LANART_LOGO_URL = '/Image/Larnat_logo.jpg';

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'Our Services', to: '/services' },
  { name: 'Books', to: '/books' },
  { name: 'About Us', to: '/about' },
  { name: 'Contact Us', to: '/contact' },
];

const footerServices = [
  'Illustration & Visual Art',
  'Comics & Graphic Novels',
  'Animation & Motion',
  'Branding & Identity',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer
      className="relative font-noteworthy"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      {/* Top CTA strip – GoDigito-style */}
      <div
        className="relative py-8 md:py-10"
        style={{
          background: 'linear-gradient(90deg, var(--color-primary-blue), var(--color-deep-blue))',
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative w-[91.666667%] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Ready to start your project?
            </h3>
            <p className="text-white/90 text-base mt-1">
              Let's turn your ideas into visual narratives.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold uppercase tracking-wider whitespace-nowrap transition-all hover:opacity-95 hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--color-accent-pink)' }}
          >
            Get in touch <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main footer – multi-column unique layout */}
      <div
        className="relative py-16 md:py-20"
        style={{
          backgroundColor: 'var(--color-deep-blue)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary-blue), transparent)' }}
        />
        <div className="w-[91.666667%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
            {/* Brand column – spans 4 on lg */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-flex items-center gap-3 no-underline">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <img src={LANART_LOGO_URL} alt="Lanart21" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white tracking-tight block">LANART21</span>
                  <span className="text-sm font-medium tracking-widest text-white/60">CREATIVE STUDIO</span>
                </div>
              </Link>
              <p className="text-base leading-relaxed text-white/80 max-w-sm">
                A visual storytelling studio. Illustration, comics, animation, and creative direction for brands and creators.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[var(--color-primary-blue)] text-white/80 hover:text-white transition-colors"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links – 4 cols */}
            <div className="lg:col-span-3">
              <h4 className="text-base font-bold uppercase tracking-widest text-white/90 mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-base text-white/75 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="text-[var(--color-primary-blue)] group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services – 3 cols */}
            <div className="lg:col-span-3">
              <h4 className="text-base font-bold uppercase tracking-widest text-white/90 mb-5">
                Services
              </h4>
              <ul className="space-y-2">
                {footerServices.map((item) => (
                  <li key={item}>
                    <Link to="/services" className="text-base text-white/75 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter – 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-base font-bold uppercase tracking-widest text-white/90 mb-4">
                  Contact
                </h4>
                <div className="space-y-3">
                  <a href="mailto:info@lanart21.com" className="flex items-start gap-2 text-base text-white/75 hover:text-white transition-colors">
                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                    info@lanart21.com
                  </a>
                  <a href="tel:+1234567890" className="flex items-start gap-2 text-base text-white/75 hover:text-white transition-colors">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                    +1 (234) 567-890
                  </a>
                  <span className="flex items-start gap-2 text-base text-white/75">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                    Creative Studio
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold uppercase tracking-widest text-white/90 mb-3">
                  Newsletter
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 min-w-0 px-3 py-2.5 rounded-lg text-base border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent-pink)' }}
                    aria-label="Subscribe"
                  >
                    <Send size={16} />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <p className="text-base text-white/60">
              © {currentYear} <span className="font-semibold text-white/90">Lanart21 Creative Studio</span>. All rights reserved.
            </p>
            <p className="text-sm text-white/50">
              Crafting visual narratives for brands &amp; creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
