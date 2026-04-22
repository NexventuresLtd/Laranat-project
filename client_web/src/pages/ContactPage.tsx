import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import Footer from '../comps/Footer';
import PageHero from '../comps/PageHero';

const ContactPage: React.FC = () => {
  const { contact } = useSiteContent();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <PageHero
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        subtitle={contact.hero.subtitle}
        variant="contact"
      />

      {/* ’ll */}
      {/* Form + contact info */}
      <section className="py-16 md:py-24">
        <div className="w-[91.666667%] mx-auto ">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: 'var(--color-deep-blue)' }}
              >
                {contact.formHeading}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="block text-base font-semibold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                      style={{
                        borderColor: 'var(--navbar-border)',
                        color: 'var(--navbar-text)',
                        backgroundColor: 'var(--navbar-bg)',
                      }}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-base font-semibold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                      style={{
                        borderColor: 'var(--navbar-border)',
                        color: 'var(--navbar-text)',
                        backgroundColor: 'var(--navbar-bg)',
                      }}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-base font-semibold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
                    Subject
                  </span>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      borderColor: 'var(--navbar-border)',
                      color: 'var(--navbar-text)',
                      backgroundColor: 'var(--navbar-bg)',
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="illustration">Illustration & Visual Art</option>
                    <option value="comics">Comics & Graphic Novels</option>
                    <option value="animation">Animation & Motion</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="block text-base font-semibold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-y min-h-[120px]"
                    style={{
                      borderColor: 'var(--navbar-border)',
                      color: 'var(--navbar-text)',
                      backgroundColor: 'var(--navbar-bg)',
                    }}
                  />
                </label>
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-lg"
                  style={{ backgroundColor: 'var(--color-accent-pink)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} /> Send message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: 'var(--color-deep-blue)' }}
                >
                  Contact info
                </h2>
                <p className="text-[var(--navbar-text)] leading-relaxed mb-8">
                  Have a project in mind or a question? We’d love to hear from you. Reach out via email or the form and we’ll respond as soon as we can.
                </p>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: 'var(--color-primary-blue)' }}
                  >
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="block text-base font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-deep-blue)' }}>
                      Email
                    </span>
                    <a
                      href="mailto:hello@lanart21.com"
                      className="text-[var(--navbar-text)] hover:underline"
                      style={{ color: 'var(--color-primary-blue)' }}
                    >
                      hello@lanart21.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: 'var(--color-accent-pink)' }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="block text-base font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-deep-blue)' }}>
                      Phone
                    </span>
                    <a
                      href="tel:+1234567890"
                      className="text-[var(--navbar-text)] hover:underline"
                      style={{ color: 'var(--color-primary-blue)' }}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: 'var(--color-secondary-purple)' }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="block text-base font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-deep-blue)' }}>
                      Studio
                    </span>
                    <p className="text-[var(--navbar-text)] leading-relaxed">
                      Lanart21 Creative Studio<br />
                      Your City, Country
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer showTopCta={false} />
    </div>
  );
};

export default ContactPage;
