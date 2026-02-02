import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send
} from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Comics", href: "/comics" },
    { name: "About", href: "/about" },
  ];

  const categories = [
    "Comics",
    "Books",
    "Artists",
    "Collections",
    "New Releases",
    "Featured",
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer
      className={`relative border-t ${
        darkMode
          ? "bg-slate-950 border-slate-800/50 text-slate-300"
          : "bg-white border-slate-200 text-slate-600"
      }`}
    >
      {/* Decorative gradient line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
          darkMode
            ? "from-transparent via-orange-500/50 to-transparent"
            : "from-transparent via-orange-500/30 to-transparent"
        }`}
      />

      <div className="w-11/12 mx-auto py-16">
        {/* Main Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-6">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-xl rotate-45 transition-transform duration-500 group-hover:rotate-180 ${
                    darkMode ? "bg-orange-500" : "bg-orange-600"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-xl rotate-45 scale-75 blur-sm opacity-50 ${
                    darkMode ? "bg-orange-400" : "bg-orange-300"
                  }`}
                />
                <span className="relative z-10 font-bold text-white text-xl">L</span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={`font-bold text-lg tracking-widest ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  LANART
                </span>
                <span className="text-[0.6rem] font-medium tracking-[0.3em] text-orange-500">
                  CREATIVE
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-sm leading-relaxed ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Showcasing Creativity, Publishing Stories, Empowering Artists and Readers. Your
              gateway to endless adventures in digital storytelling.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h3
                className={`font-bold text-base ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Subscribe to Our Newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                    darkMode
                      ? "bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                  }`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className={`font-bold text-base mb-4 pb-2 border-b-2 border-orange-500 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className={`flex items-center gap-2 text-sm transition-colors hover:text-orange-500 group ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <ChevronRight
                      size={14}
                      className="text-orange-500 group-hover:translate-x-1 transition-transform"
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3
              className={`font-bold text-base mb-4 pb-2 border-b-2 border-orange-500 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <motion.a
                  key={category}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-sm transition-colors hover:text-orange-500 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {category}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3
              className={`font-bold text-base mb-4 pb-2 border-b-2 border-orange-500 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Contact Us
            </h3>
            <div className="space-y-4 mb-6">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className={`mt-0.5 flex-shrink-0 ${
                    darkMode ? "text-orange-400" : "text-orange-500"
                  }`}
                />
                <a
                  href="mailto:info@lanart21.com"
                  className={`text-sm transition-colors hover:text-orange-500 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  info@lanart21.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className={`mt-0.5 flex-shrink-0 ${
                    darkMode ? "text-orange-400" : "text-orange-500"
                  }`}
                />
                <a
                  href="tel:+1234567890"
                  className={`text-sm transition-colors hover:text-orange-500 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  +1 (234) 567-890
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className={`mt-0.5 flex-shrink-0 ${
                    darkMode ? "text-orange-400" : "text-orange-500"
                  }`}
                />
                <span
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Creative Studio, Digital World
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-lg transition-all ${
                    darkMode
                      ? "bg-slate-900/50 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400"
                      : "bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-600"
                  }`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row items-center justify-center gap-4 ${
            darkMode ? "border-slate-800/50" : "border-slate-200"
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            © {currentYear}{" "}
            <span className="text-orange-500 font-semibold">Lanart21 Creative Studio</span>. All
            rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
