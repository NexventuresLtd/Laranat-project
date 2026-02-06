import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Footer from '../comps/Footer';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="font-noteworthy min-h-screen" style={{ fontFamily: 'var(--font-noteworthy)' }}>
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
            Get in Touch
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to turn your ideas into visual narratives? Send us a message and we’ll get back to you.
          </motion.p>
        </div>
      </section>

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
                Send a message
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

      <Footer />
    </div>
  );
};

export default ContactPage;
