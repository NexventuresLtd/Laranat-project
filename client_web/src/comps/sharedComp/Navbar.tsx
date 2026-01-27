import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ darkMode, toggleTheme }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Comics", path: "/comics" },
    { name: "About", path: "/about" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Top gradient */}
      <div
        className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-40 pointer-events-none transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "py-3 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 shadow-2xl"
              : "py-3 bg-white/80 backdrop-blur-lg border-b border-white/30 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="w-11/12 mx-auto flex items-center justify-between relative z-50">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
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
                className={`font-bold text-lg tracking-widest drop-shadow-lg ${
                  scrolled && !darkMode ? "text-slate-900" : "text-white"
                }`}
              >
                LANART
              </span>
              <span className="text-[0.6rem] font-medium tracking-[0.3em] text-orange-500 drop-shadow-md">
                CREATIVE
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group cursor-pointer py-2"
                onClick={() => navigate(item.path)}
              >
                <span
                  className={`text-sm font-semibold tracking-wide transition-colors drop-shadow-md ${
                    location.pathname === item.path
                      ? "text-orange-500"
                      : scrolled
                      ? darkMode
                        ? "text-slate-300 group-hover:text-white"
                        : "text-slate-600 group-hover:text-orange-600"
                      : "text-slate-100 group-hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300 w-0 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className={`transition-transform hover:rotate-12 ${
                scrolled && !darkMode ? "text-slate-600" : "text-white"
              }`}
            >
              {darkMode ? <Sun size={20} className="drop-shadow-md" /> : <Moon size={20} className="drop-shadow-md" />}
            </button>

            <div className="flex items-center gap-4">
              <ShoppingBag
                className={`cursor-pointer transition-transform hover:scale-110 drop-shadow-md ${
                  scrolled && !darkMode ? "text-slate-800" : "text-white"
                }`}
                size={20}
              />
              <button
                onClick={() => navigate("/signin")}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:shadow-orange-500/25 transform hover:-translate-y-0.5
                  ${darkMode || !scrolled ? "bg-white text-slate-900 hover:bg-orange-50" : "bg-slate-900 text-white hover:bg-slate-800"}
                `}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className={scrolled && !darkMode ? "text-slate-800" : "text-white"}>
              {darkMode ? <Sun size={20} className="drop-shadow-md" /> : <Moon size={20} className="drop-shadow-md" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={scrolled && !darkMode ? "text-slate-900" : "text-white"}>
              {mobileMenuOpen ? <X /> : <Menu className="drop-shadow-md" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden origin-top absolute top-full left-0 right-0 ${darkMode ? "bg-slate-950" : "bg-white"} border-t border-slate-100/10`}
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavigate(item.path)}
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
