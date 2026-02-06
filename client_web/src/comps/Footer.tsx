import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send,
} from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '#services' },
  { name: 'Book', href: '#books' },
  { name: 'About Us', href: '#about' },
];

const footerSections = [
  { title: 'Services', items: ['Illustration & Visual Art', 'Comics & Graphic Novels', 'Animation & Motion', 'Branding & Identity'] },
  { title: 'Who We Work With', items: ['Brands & Startups', 'Publishers & Authors', 'NGOs & Institutions', 'Film & Media'] },
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
      className="relative border-t font-noteworthy"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        backgroundColor: 'var(--color-deep-blue)',
        borderColor: 'rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary-blue), transparent)' }}
      />

      <div className="w-[91.666667%] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white/20 bg-white">
                <img src="/Image/Larnat_logo.jpg" alt="Lanart21" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">LANART21</span>
                <span className="block text-xs font-medium tracking-widest text-white/70">CREATIVE STUDIO</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              A visual storytelling studio. Illustration, comics, animation, and creative direction for brands and creators.
            </p>
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">Newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-lg font-semibold text-sm text-white flex items-center gap-2"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 pb-2 border-b-2 border-[var(--color-primary-blue)] w-fit">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
                  >
                    <ChevronRight size={14} className="text-[var(--color-primary-blue)] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Who We Work With */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-base text-white mb-4 pb-2 border-b-2 border-[var(--color-primary-blue)] w-fit">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 pb-2 border-b-2 border-[var(--color-primary-blue)] w-fit">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                <a href="mailto:info@lanart21.com" className="text-sm text-white/80 hover:text-white transition-colors">
                  info@lanart21.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                <a href="tel:+1234567890" className="text-sm text-white/80 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[var(--color-primary-blue)]" />
                <span className="text-sm text-white/80">Creative Studio</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
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
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-sm text-white/70">
            © {currentYear} <span className="font-semibold text-white">Lanart21 Creative Studio</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
