import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 pb-20 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-11/12 max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-orange-500 mb-4">
            Contact Us
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Get in touch with Lanart21. Send us a message or use the details below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-slate-200 shadow-lg"
            }`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Get in touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-orange-500" />
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Email
                  </p>
                  <a
                    href="mailto:hello@lanart21.com"
                    className={`text-orange-500 hover:underline ${darkMode ? "text-orange-400" : ""}`}
                  >
                    hello@lanart21.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-orange-500" />
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Studio
                  </p>
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    Lanart21 Creative Studio
                    <br />
                    Creative District
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-orange-500" />
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Response time
                  </p>
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    We usually reply within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-slate-200 shadow-lg"
            }`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Send a message
            </h2>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`py-8 text-center rounded-xl ${
                  darkMode ? "bg-orange-500/20 text-orange-400" : "bg-orange-50 text-orange-600"
                } font-medium`}
              >
                Thanks! Your message has been sent. We'll get back to you soon.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      darkMode
                        ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      darkMode
                        ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      darkMode
                        ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm resize-y ${
                      darkMode
                        ? "bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  Send message <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
